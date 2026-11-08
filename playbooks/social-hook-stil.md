# Siprego Hook-Stil für Reels

Stand: 03.11.2026. STATUS: Nur noch Ausnahme. Seit der Instagram-Analyse vom 03.11.2026 sind Reels standardmäßig roh (ein Clip, Originalton, keine Musik, kein Text-Hook), siehe Social-Playbook "Ausrichtung ab 03.11.2026". Die Agent-Reels mit Hook und Musik lagen bei median 1.290 Reichweite, die Ungeschnitten-Clips ohne Hook bei 2.040. Dieser Hook-Stil wird nur noch verwendet für Listen-Reels (Umfragen, Nummern-Badges) oder wenn Damian es für ein bestimmtes Reel ausdrücklich will.

Ursprünglich 17.10.2026 von Damian festgelegt. Regeln unten gelten unverändert, wenn ein Hook verwendet wird.

## Regeln

- Der Text-Hook kommt in den ersten 3 Sekunden: eine Frage oder kurze Aussage, höchstens 6 Wörter, auf 2 Zeilen verteilt. Danach blendet er aus (Einblenden 0,15 s, Ausblenden ab 2,7 s über 0,5 s). Kein Text über die ganze Länge.
- Schrift: Lacquer (Google Fonts, frei nutzbar, von Damian gewählt am 17.10.2026). Lacquer setzt alles in Großbuchstaben, Umlaute und ß sind enthalten. Größe 120 px bei 1080 px Breite. Hinweis: Das J sieht aus wie ein Y, Hooks mit J vermeiden.
- Stil: Füllung Creme #FFF3CD, dicke dunkelbraune Kontur #3A200E, 3D-Schatten nach rechts unten in Braun, Text um 8 Grad gedreht (fällt nach rechts ab), weißer geschwungener Pfeil rechts unter dem Text, der auf das Motiv zeigt.
- Position: Mitte des Textblocks bei y = 430 bis 560 (von 1920). Nicht ins untere Drittel (Instagram-Bedienelemente) und nicht über das Hauptmotiv (Käsefaden, Pizza). Pfeil darf das Fragezeichen nicht berühren. Vorher ein Standbild mit Overlay rendern und ansehen.
- Titelbild in Metricool: videoCoverMilliseconds 1000 (Bild mit Hook).
- Damian liefert manchmal fertige CapCut-Videos mit Musik. Dann den Hook im selben Stil per ffmpeg drüberlegen, Ton unverändert lassen (-c:a copy).

## Schrift holen

mkdir -p fonts && curl -sSL -o fonts/Lacquer-Regular.ttf "https://raw.githubusercontent.com/google/fonts/main/ofl/lacquer/Lacquer-Regular.ttf"

## Skript (hookstyle.py)

Aufruf: python3 hookstyle.py "Wie lang wird|der Käsefaden?" Lacquer-Regular.ttf hook.png  (ergibt ein transparentes 1080x1920-PNG mit Standardgröße). Für Größe und Position: from hookstyle import render; render(["Zeile 1","Zeile 2"], "Lacquer-Regular.ttf", size=120, cy=430).save("hook.png")

```python
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, sys
FD="./fonts/"  # Ordner mit Lacquer-Regular.ttf
CREAM=(255,243,205,255); BROWN=(58,32,14,255)
def load(name,size):
    f=ImageFont.truetype(FD+name,size)
    if name.startswith("Grandstander"):
        try: f.set_variation_by_name("Black")
        except Exception: pass
    return f
def render(lines, fontname, size=118, angle=-8, arrow=True, W=1080, H=1920, cy=560):
    font=load(fontname,size)
    pad=60; lh=int(size*1.08)
    tmp=ImageDraw.Draw(Image.new("RGBA",(1,1)))
    tw=max(tmp.textlength(l,font=font) for l in lines)
    bw=int(tw+2*pad); bh=int(lh*len(lines)+2*pad)
    layer=Image.new("RGBA",(bw,bh),(0,0,0,0)); d=ImageDraw.Draw(layer)
    sw=max(6,size//14); off=max(6,size//13)
    for i,l in enumerate(lines):
        w=d.textlength(l,font=font); x=(bw-w)/2; y=pad+i*lh
        # 3D Schatten: mehrfach versetzt
        for k in range(off,0,-1):
            d.text((x+k*0.6,y+k),l,font=font,fill=BROWN,stroke_width=sw,stroke_fill=BROWN)
        d.text((x,y),l,font=font,fill=CREAM,stroke_width=sw,stroke_fill=BROWN)
    layer=layer.rotate(angle, resample=Image.BICUBIC, expand=True)
    out=Image.new("RGBA",(W,H),(0,0,0,0))
    out.alpha_composite(layer,(int((W-layer.width)/2),int(cy-layer.height/2)))
    if arrow:
        a=Image.new("RGBA",(W,H),(0,0,0,0)); ad=ImageDraw.Draw(a)
        # geschwungener Pfeil rechts unter dem Text, nach unten zeigend
        x0=W*0.82; y0=cy+layer.height*0.50
        pts=[]
        for t in [i/30 for i in range(31)]:
            x=x0+60*math.sin(t*math.pi*0.9); y=y0+t*170
            pts.append((x,y))
        for wdt,col in [(16,(0,0,0,90)),(11,(255,255,255,255))]:
            ad.line(pts,fill=col,width=wdt,joint="curve")
        ex,ey=pts[-1]; px,py=pts[-4]
        ang=math.atan2(ey-py,ex-px)
        for s in (2.5,-2.5):
            hx=ex-46*math.cos(ang+s*0.2); hy=ey-46*math.sin(ang+s*0.2)
            ad.line([(hx,hy),(ex,ey)],fill=(255,255,255,255),width=11)
        out.alpha_composite(a)
    return out
if __name__=="__main__":
    lines=sys.argv[1].split("|"); font=sys.argv[2]; outp=sys.argv[3]
    render(lines,font).save(outp)

```

## Overlay auf das Video (ffmpeg)

ffmpeg -i reel.mp4 -loop 1 -t 3.2 -i hook.png -filter_complex "[1:v]format=rgba,fade=t=in:st=0:d=0.15:alpha=1,fade=t=out:st=2.7:d=0.5:alpha=1[t];[0:v][t]overlay=0:0:eof_action=pass[v]" -map "[v]" -map 0:a -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -profile:v high -r 30 -c:a copy -movflags +faststart reel-hook.mp4

Beispiel: https://siprego.de/wp-content/uploads/2026/10/siprego-arancini-kaesefaden-2026-10-18-reel-v4.mp4

## Nummern-Badges (Listen-Reels wie "Welche nimmst du zuerst?")

- Roter Kreis #A6201C (Website-Rot, seit 03.11.2026 statt #da1718), Radius 74 px, Kontur Braun #3A200E 6 px, weicher Schatten. Position links unten bei (140, 1430).
- Zahl in Lacquer 104 px, Creme. Lacquer hat schiefe Schriftmetriken, deshalb NICHT anchor="mm" verwenden (sitzt zu tief). Stattdessen die echte Glyphenbox nehmen: l,t,r,b = d.textbbox((0,0),zahl,font=f); d.text((cx-(l+r)/2, cy-(t+b)/2), zahl, ...). Das Label genauso vertikal über textbbox zentrieren. Fehler vom 19.10.2026, zweimal korrigiert.
- Label rechts daneben in Lacquer 84 px, anchor="lm", gleicher Creme-Braun-Stil wie der Hook.
- Vor dem Upload ein Standbild mit crop auf den Badge rendern und ansehen.

## Raw-Reel ohne Hook (Standard seit 03.11.2026)

ffmpeg -ss START -t DAUER -i clip.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart reel.mp4 ; Originalton bleibt in voller Lautstärke, keine Musik, keine Verlangsamung, höchstens zwei Schnitte. Caption im Ungeschnitten-Stil: "Ungeschnitten #7" plus ein Satz, Kontakt, 3 Hashtags.
