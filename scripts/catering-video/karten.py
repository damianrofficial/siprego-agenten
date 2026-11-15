#!/usr/bin/env python3
"""Textkarten der Catering-Anzeige als transparente PNG rendern (Playwright/Chromium).

Aufruf: python3 karten.py <plan.json> <ausgabeordner>
Jede Karte wird eng zugeschnitten gespeichert (mit Schattenrand PAD), dazu karten.json
mit Breite und Hoehe. Position und Zeit stehen im Plan und werden in schnitt.py gesetzt.
CI: Fraunces 500 (Hauptzeile), Karla (Nebenzeilen), Creme #F3F1EB, Braun #2A1A10 / #5E3F2C, Rot #B0241F.
"""
import json, sys, os
from playwright.sync_api import sync_playwright

FONTS = '/home/user/siprego-agenten/fonts'
PAD = 40  # durchsichtiger Rand um die Karte fuer den Schatten

CSS = f"""
@font-face{{font-family:Fraunces;font-style:normal;font-weight:400 600;src:url(file://{FONTS}/Fraunces-LP-normal.woff2) format('woff2')}}
@font-face{{font-family:Fraunces;font-style:italic;font-weight:400 600;src:url(file://{FONTS}/Fraunces-LP-italic.woff2) format('woff2')}}
@font-face{{font-family:Karla;font-style:normal;font-weight:400 700;src:url(file://{FONTS}/Karla-latin.woff2) format('woff2')}}
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{background:transparent}}
body{{width:1080px;font-family:Karla,sans-serif;-webkit-font-smoothing:antialiased}}
.wrap{{display:inline-block;padding:{PAD}px}}
.card{{position:relative;display:inline-block;background:#F3F1EB;border-radius:22px;padding:30px 40px 32px;
  box-shadow:0 10px 28px rgba(42,26,16,.30),0 2px 6px rgba(42,26,16,.22);overflow:hidden;text-align:center;max-width:960px}}
/* dezenter Papier-Charakter: feines Korn und ein weicher Lichtverlauf */
.card::before{{content:'';position:absolute;inset:0;border-radius:22px;
  background:linear-gradient(170deg,rgba(255,255,255,.55),rgba(255,255,255,0) 45%,rgba(118,80,60,.07));pointer-events:none}}
.card::after{{content:'';position:absolute;inset:0;border-radius:22px;opacity:.16;mix-blend-mode:multiply;pointer-events:none;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 .45  0 0 0 0 .33  0 0 0 0 .22  0 0 0 .9 0'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>")}}
.card>*{{position:relative;z-index:1}}
.h{{font-family:Fraunces,Georgia,serif;font-weight:500;letter-spacing:-.02em;line-height:1.06;color:#2A1A10;white-space:nowrap}}
.h em{{font-style:italic;color:#B0241F}}
.h b{{font-weight:500;color:#B0241F}}
.s{{font-family:Karla,sans-serif;font-weight:500;color:#5E3F2C;line-height:1.25;white-space:nowrap}}
.s b{{font-weight:700;color:#2A1A10}}
.stars{{color:#B0241F;letter-spacing:.08em}}
.num{{font-family:Fraunces,serif;font-style:italic;font-weight:500;color:#B0241F;margin-right:.28em}}
.left{{text-align:left}}
.chk{{display:flex;align-items:center;gap:16px;justify-content:flex-start}}
.chk svg{{flex:none}}
.rule{{height:2px;background:rgba(90,66,40,.22);margin:20px 0 18px}}
.btn{{display:inline-flex;align-items:center;gap:18px;background:#B0241F;color:#fff;font-family:Karla,sans-serif;font-weight:700;
  border-radius:16px;padding:26px 40px;box-shadow:0 10px 26px rgba(42,26,16,.38),0 2px 6px rgba(42,26,16,.25);white-space:nowrap}}
.arrow{{display:inline-block}}
"""

CHECK = "<svg width='40' height='40' viewBox='0 0 40 40'><circle cx='20' cy='20' r='20' fill='#B0241F'/><path d='M11 20.5l6 6 12-13' fill='none' stroke='#fff' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/></svg>"
ARROW = "<svg class='arrow' width='{s}' height='{s}' viewBox='0 0 48 48'><path d='M24 6v32M10 25l14 14 14-14' fill='none' stroke='{c}' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/></svg>"


def html(card):
    inner = card['html'].replace('{CHECK}', CHECK)
    inner = inner.replace('{ARROW_W}', ARROW.format(s=44, c='#fff')).replace('{ARROW_D}', ARROW.format(s=60, c='#B0241F'))
    if card.get('kind') == 'raw':
        body = f"<div class='wrap' id='c'>{inner}</div>"
    else:
        body = f"<div class='wrap' id='c'><div class='card'>{inner}</div></div>"
    return f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{body}</body></html>"


def main(plan_path, out):
    plan = json.load(open(plan_path))
    os.makedirs(out, exist_ok=True)
    meta = {}
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={'width': 1080, 'height': 1920}, device_scale_factor=1)
        for c in plan['karten']:
            hf = os.path.join(out, c['id'] + '.html')   # als Datei laden, sonst sperrt Chromium die lokalen Schriften
            open(hf, 'w').write(html(c))
            pg.goto('file://' + os.path.abspath(hf))
            pg.evaluate("document.fonts.ready.then(()=>1)")
            pg.wait_for_timeout(200)
            fam = pg.evaluate("[document.fonts.check('500 60px Fraunces'), document.fonts.check('500 40px Karla')]")
            assert fam[1] and (fam[0] or c.get('kind') == 'raw'), 'Schrift nicht geladen: ' + str(fam)
            el = pg.locator('#c')
            f = os.path.join(out, c['id'] + '.png')
            el.screenshot(path=f, omit_background=True)
            bb = el.bounding_box()
            meta[c['id']] = {'w': round(bb['width']), 'h': round(bb['height']), 'pad': PAD}
            print(c['id'], meta[c['id']])
        b.close()
    json.dump(meta, open(os.path.join(out, 'karten.json'), 'w'), indent=1)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
