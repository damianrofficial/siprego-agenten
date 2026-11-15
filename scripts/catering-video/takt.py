#!/usr/bin/env python3
"""Takt der Tonspur bestimmen. Aufruf: python3 takt.py <audio.wav 44100 mono> <beats.json>
Musik im 12/8-Gefuehl: Puls (Achtel-Triole) rund 0,298 s, Schlag = 3 Pulse rund 0,895 s (67 BPM).
Schreibt je Schlag: Rasterzeit (lineare Anpassung), gemessener Einsatz (Spitze der Onset-Kurve, alle Baender)
und gemessener Bass-Einsatz (unter 200 Hz)."""
import sys, json, numpy as np, librosa
y, sr = librosa.load(sys.argv[1], sr=44100, mono=True)
hop = 64
S = np.abs(librosa.stft(y, n_fft=2048, hop_length=hop))
f = librosa.fft_frequencies(sr=sr, n_fft=2048)
ts = np.arange(S.shape[1]) * hop / sr
k = np.hanning(9); k /= k.sum()
fu = np.convolve(librosa.onset.onset_strength(S=librosa.amplitude_to_db(S), sr=sr, hop_length=hop), k, 'same')
low = S[f < 200].sum(0); lo = np.convolve(np.maximum(0, np.diff(low, prepend=low[0])), k, 'same')
# grobe Suche Puls und Phase
t22 = ts; best = (0, 0, 0)
for p in np.arange(0.280, 0.320, 0.0002):
    for ph in np.arange(0, p, 0.004):
        s = np.interp(np.arange(ph, ts[-1], p), ts, fu).mean()
        if s > best[0]: best = (s, p, ph)
_, p, ph = best
rows = []
for i in range(int((ts[-1] - ph) / p) + 1):
    g = ph + i * p; w = (ts > g - 0.07) & (ts < g + 0.07)
    rows.append((i, ts[w][np.argmax(fu[w])], ts[w][np.argmax(lo[w])], float(lo[w].max())))
I = np.array([r[0] for r in rows]); TF = np.array([r[1] for r in rows])
m = np.ones(len(I), bool)
for _ in range(3):
    a, b = np.polyfit(I[m], TF[m], 1); m &= abs(TF - (a * I + b)) < 0.03
# Schlag-Phase: die der drei Pulsklassen mit dem staerksten Bass
ls = np.array([r[3] for r in rows]); off = int(np.argmax([ls[I % 3 == j].mean() for j in range(3)]))
beats = []
for r in rows:
    if r[0] % 3 == off:
        beats.append({'k': len(beats), 'raster': round(a * r[0] + b, 4), 'einsatz': round(float(r[1]), 4), 'bass': round(float(r[2]), 4), 'bass_staerke': round(r[3], 1)})
res = TF[m] - (a * I[m] + b)
out = {'puls_s': round(a, 5), 'schlag_s': round(3 * a, 5), 'bpm': round(60 / (3 * a), 2), 'streuung_ms': round(float(res.std() * 1000), 1), 'pulse_im_fit': int(m.sum()), 'pulse_gesamt': len(I), 'beats': beats}
json.dump(out, open(sys.argv[2], 'w'), indent=1)
print({k: v for k, v in out.items() if k != 'beats'})
for x in beats: print(x)
