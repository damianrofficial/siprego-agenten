#!/usr/bin/env python3
"""Schnitt der Catering-Anzeige nach plan.json: jeder Schnitt liegt auf einem Schlag der Musik.

Aufruf (im Ordner catering-video):  python3 scripts/schnitt.py [scripts/plan.json]
Vorher: python3 scripts/takt.py work/audio44.wav work/beats.json  und  python3 scripts/karten.py scripts/plan.json work/karten
Varianten (anderer Hook, andere Texte): plan.json kopieren, "karten" bzw. "szenen" aendern, karten.py und schnitt.py neu starten.
"""
import json, subprocess, sys, os
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
plan = json.load(open(sys.argv[1] if len(sys.argv) > 1 else os.path.join(BASE, 'scripts/plan.json')))
beats = json.load(open(os.path.join(BASE, 'work/beats.json')))['beats']
kmeta = json.load(open(os.path.join(BASE, 'work/karten/karten.json')))
FPS = plan['fps']; A0 = plan['audio_start']
src = os.path.join(BASE, plan['quelle'])
bt = lambda k: beats[k]['einsatz']                      # gemessener Einsatz des Schlags in der Quelle
cf = lambda k: 0 if k == 0 else round((bt(k) - A0) * FPS)   # Bild im fertigen Video; Schlag 0 = Videoanfang
end_frame = round((bt(plan['letzter_schlag']) - A0 + plan['nachlauf_s']) * FPS)
total = end_frame / FPS

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: print(r.stderr[-3000:]); sys.exit(1)

seg_dir = os.path.join(BASE, 'work/seg'); os.makedirs(seg_dir, exist_ok=True)
sz = plan['szenen']; table = []; files = []
for i, s in enumerate(sz):
    start = cf(s['schlag']); stop = cf(sz[i + 1]['schlag']) if i + 1 < len(sz) else end_frame
    n = stop - start; have = s['f1'] - s['f0'] + 1
    if have > n: s = dict(s, f1=s['f0'] + n - 1); have = n   # nie schneller als das Original, nur kuerzen
    fac = n / have
    z = s.get('zoom', 1.0)
    vf = [f"trim=start_frame={s['f0']}:end_frame={s['f1'] + 1}", f"setpts=(PTS-STARTPTS)*{fac:.6f}"]
    if z != 1.0:
        vf.append(f"crop=w=trunc(iw/{z}/2)*2:h=trunc(ih/{z}/2)*2:x=(iw-ow)*{s['ax']}:y=(ih-oh)*{s['ay']}")
    vf.append("scale=1080:1920:flags=lanczos,setsar=1")
    if s.get('mci') and fac > 1.02:
        vf.append(f"minterpolate=fps={FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1:scd=none")
    else:
        vf.append(f"fps={FPS}")
    vf.append(f"tpad=stop_mode=clone:stop_duration=1,trim=end_frame={n},setpts=PTS-STARTPTS")
    out = os.path.join(seg_dir, s['id'] + '.mp4')
    key = json.dumps([s, n]); kf = out + '.key'
    if not (os.path.exists(out) and os.path.exists(kf) and open(kf).read() == key):
        run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-an', '-vf', ','.join(vf), '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', str(FPS), '-frames:v', str(n), out])
        open(kf, 'w').write(key)
    got = int(subprocess.check_output(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v', '-show_entries', 'stream=nb_read_frames', '-of', 'csv=p=0', out]).split()[0])
    assert got == n, (s['id'], got, n)
    files.append(out)
    b = beats[s['schlag']]
    table.append({'szene': s['id'], 'was': s['was'], 'schlag': s['schlag'], 'bild': start, 'zeit_s': round(start / FPS, 3), 'laenge_s': round(n / FPS, 3),
                  'schlag_im_video_s': round(bt(s['schlag']) - A0, 3), 'abweichung_ms': round((start / FPS - (bt(s['schlag']) - A0)) * 1000, 1),
                  'abweichung_raster_ms': round((start / FPS - (b['raster'] - A0)) * 1000, 1), 'abweichung_bass_ms': round((start / FPS - (b['bass'] - A0)) * 1000, 1),
                  'quelle_s': f"{s['f0'] / 30:.2f} bis {(s['f1'] + 1) / 30:.2f}", 'tempo': round(1 / fac, 2), 'zoom': z})

# Filtergraph: Szenen aneinander, Abdunkeln, Karten mit Pop, Ton
inp = []; fc = []
for f in files: inp += ['-i', f]
nv = len(files)
fc.append(''.join(f'[{i}:v]' for i in range(nv)) + f'concat=n={nv}:v=1:a=0[v0]')
last = 'v0'; idx = nv
d = plan.get('abdunkeln')
if d:
    t0 = cf(d['von_schlag']) / FPS
    inp += ['-f', 'lavfi', '-t', f'{total}', '-i', f"color=c=black@{d['staerke']}:s=1080x1920:r={FPS},format=rgba"]
    fc.append(f"[{idx}:v]fade=t=in:st={t0:.4f}:d=0.25:alpha=1[dk];[{last}][dk]overlay=0:0:enable='gte(t,{t0:.4f})'[vd]")
    last = 'vd'; idx += 1
for c in plan['karten']:
    m = kmeta[c['id']]
    t0 = cf(c['von_schlag']) / FPS + c.get('verzug_s', 0)
    t1 = cf(c['bis_schlag']) / FPS if c['bis_schlag'] <= plan['letzter_schlag'] else total + 1
    inp += ['-loop', '1', '-framerate', str(FPS), '-t', f'{total}', '-i', os.path.join(BASE, 'work/karten', c['id'] + '.png')]
    P = f"clip((t-{t0 - 1 / FPS:.4f})/0.17,0,1)"                      # Pop: 0,17 s, von 86 % mit leichtem Ueberschwingen auf 100 %
    S = f"(1+0.035*sin(PI*{P})-0.14*pow(1-{P},3))"
    yoff = f"+7*sin(2*PI*(t-{t0:.4f})/{beats[1]['raster'] - beats[0]['raster']:.4f})" if c.get('wippen') else ''
    fd = f"fade=t=in:st={t0 - 2 / FPS:.4f}:d={4 / FPS:.4f}:alpha=1," if t0 > 0.1 else ''   # Karte am Videoanfang steht sofort
    fc.append(f"[{idx}:v]format=rgba,{fd}scale=w='trunc(iw*{S}/2)*2':h='trunc(ih*{S}/2)*2':eval=frame[c{idx}];"
              f"[{last}][c{idx}]overlay=x='{c['cx']}-w/2':y='{c['cy']}-h/2{yoff}':eval=frame:enable='between(t,{t0:.4f},{t1 - 0.5 / FPS:.4f})'[v{idx}]")
    last = f'v{idx}'; idx += 1
inp += ['-i', src]
fo = total - plan['ausblenden_s']
fc.append(f"[{idx}:a]atrim=start={A0}:duration={total:.4f},asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.012,afade=t=out:st={fo:.4f}:d={plan['ausblenden_s']},volume={plan.get('audio_gain_db', 0)}dB,alimiter=limit=0.89:level=disabled[a]")
out = os.path.join(BASE, plan['ausgabe'])
run(['ffmpeg', '-v', 'error', '-y'] + inp + ['-filter_complex', ';'.join(fc), '-map', f'[{last}]', '-map', '[a]', '-frames:v', str(end_frame),
     '-c:v', 'libx264', '-profile:v', 'high', '-crf', '17', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-r', str(FPS), '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-movflags', '+faststart', '-t', f'{total:.4f}', out])
json.dump({'gesamt_s': total, 'bilder': end_frame, 'schnitte': table,
           'karten': [{'id': c['id'], 'ein_s': round(cf(c['von_schlag']) / FPS + c.get('verzug_s', 0), 3)} for c in plan['karten']]},
          open(os.path.join(BASE, 'work/schnitt-tabelle.json'), 'w'), indent=1, ensure_ascii=False)
print(f"fertig: {out}  {total:.3f} s, {end_frame} Bilder")
print('Szene        Schlag  Zeit    Laenge  Schlag im Video  Abw. ms (Einsatz / Raster / Bass)  Tempo Zoom  Quelle')
for r in table:
    print(f"{r['szene']:<12} {r['schlag']:>4}  {r['zeit_s']:>6.3f}  {r['laenge_s']:>5.3f}  {r['schlag_im_video_s']:>8.3f}        {r['abweichung_ms']:>6.1f} / {r['abweichung_raster_ms']:>6.1f} / {r['abweichung_bass_ms']:>6.1f}        {r['tempo']:<5} {r['zoom']:<4}  {r['quelle_s']}")
