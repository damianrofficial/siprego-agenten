// Siprego Catering: Karussell-Slides 1080x1350 im CI der Landingpage (Fraunces 500, Karla).
// Vorlage vom Musterlauf 14.11.2026. Aufruf im Arbeitsordner: node /home/user/siprego-agenten/scripts/catering_karussell.js [pakete|gaestezahl|verkostung]
// Der Arbeitsordner braucht img/ (Fotos als <Mediathek-ID>.jpg, Logo als img/logo-circ.png), Ausgabe nach out/.
// Neue Beiträge: unten ein weiteres Slide-Array anlegen (Bausteine cover, paket, step, statement, cta) und in posts eintragen.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const D = process.cwd();
const FONTS = path.join(__dirname, '..', 'fonts');
const F = p => 'file://' + (p.startsWith('fonts/') ? path.join(FONTS, p.slice(6)) : path.join(D, p));

const css = `
@font-face{font-family:Fraunces;font-style:normal;font-weight:400 600;src:url(${F('fonts/Fraunces-LP-normal.woff2')}) format('woff2')}
@font-face{font-family:Fraunces;font-style:italic;font-weight:400 600;src:url(${F('fonts/Fraunces-LP-italic.woff2')}) format('woff2')}
@font-face{font-family:Karla;font-style:normal;font-weight:400 700;src:url(${F('fonts/Karla-latin.woff2')}) format('woff2')}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px}
body{background:#F3F1EB;color:#42301C;font-family:Karla,sans-serif;-webkit-font-smoothing:antialiased;position:relative;overflow:hidden}
.pad{position:absolute;left:88px;right:88px;top:88px;bottom:150px;display:flex;flex-direction:column}
.eyebrow{font-weight:600;font-size:23px;letter-spacing:.17em;text-transform:uppercase;color:#76503C;line-height:1}
.h{font-family:Fraunces,Georgia,serif;font-weight:500;letter-spacing:-.02em;color:#5E3F2C;line-height:1.03}
.h em{font-style:italic;color:#B0241F}
.lead{font-size:37px;line-height:1.45;color:#4D3823}
.muted{color:#6D573C}
.rule{height:1px;background:#DCD8CF;width:100%}
.foot{position:absolute;left:88px;right:88px;bottom:60px;height:56px;display:flex;align-items:center;justify-content:space-between;font-size:24px;color:#6D573C;letter-spacing:.02em}
.foot .l{display:flex;align-items:center;gap:16px;font-weight:500;color:#5E3F2C}
.foot img{width:44px;height:44px;display:block}
.foot .n{font-family:Fraunces,serif;font-weight:500;font-size:25px;letter-spacing:.04em}
.footline{position:absolute;left:88px;right:88px;bottom:138px;height:1px;background:#DCD8CF}
.swipe{font-size:24px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#76503C}
/* Titel */
.cover-photo{position:absolute;left:0;top:0;width:1080px;height:730px;background-size:cover}
.cover-body{position:absolute;left:88px;right:88px;top:800px;bottom:150px;display:flex;flex-direction:column}
.cover-body .h{font-size:92px;margin-top:30px}
.cover-body .lead{margin-top:30px;font-size:35px}
/* Paket */
.photo{width:100%;border-radius:18px;background-size:cover;background-position:center}
.badge{display:inline-block;background:#B0241F;color:#fff;font-weight:600;font-size:21px;letter-spacing:.14em;text-transform:uppercase;padding:11px 22px 10px;border-radius:999px;line-height:1}
.price{font-family:Fraunces,serif;font-weight:500;color:#42301C;letter-spacing:-.02em;line-height:1}
.list{display:flex;flex-direction:column}
.list .row{display:flex;gap:22px;align-items:flex-start;padding:21px 0;border-top:1px solid #DCD8CF;font-size:33px;line-height:1.35;color:#4D3823}
.list .row:last-child{border-bottom:1px solid #DCD8CF}
.list.nolast .row:last-child{border-bottom:0}
.ck{flex:0 0 auto;width:26px;height:26px;margin-top:9px}
/* Schritte */
.num{font-family:Fraunces,serif;font-weight:500;font-style:italic;color:#B0241F;line-height:.9;letter-spacing:-.03em}
.card{background:#fff;border:1px solid rgba(90,66,40,.22);border-radius:18px}
/* CTA */
body.cta{background:linear-gradient(165deg,#B0241F 0%,#801511 100%);color:#F3F1EB}
.cta .h{color:#F3F1EB}
.cta .lead{color:rgba(250,246,240,.88)}
.btn{display:inline-flex;align-items:center;gap:14px;background:#F3F1EB;color:#5A4228;font-weight:600;font-size:34px;border-radius:12px;padding:30px 46px;line-height:1}
.cta .foot,.cta .foot .l{color:rgba(250,246,240,.85)}
.cta .footline{background:rgba(250,246,240,.28)}
`;

const check = `<svg class="ck" viewBox="0 0 24 24" fill="none" stroke="#B0241F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5.2 5.2L20 6.8"/></svg>`;
const arrow = (c = '#76503C', w = 34) => `<svg width="${w}" height="${Math.round(w * 0.6)}" viewBox="0 0 40 24" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h35M27 3l10 9-10 9"/></svg>`;

const foot = (i, n, light) => `<div class="footline"></div><div class="foot"><div class="l"><img src="${F('img/logo-circ.png')}"${light ? ' style="box-shadow:0 0 0 2px rgba(250,246,240,.9);border-radius:50%"' : ''}><span>Siprego Catering</span></div><div class="n">${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}</div></div>`;

const cover = ({ img, pos = 'center', eyebrow, h, lead }) => `
<div class="cover-photo" style="background-image:url(${F(img)});background-position:${pos}"></div>
<div class="cover-body">
  <div class="eyebrow">${eyebrow}</div>
  <div class="h">${h}</div>
  <div class="lead">${lead}</div>
</div>`;

const paket = ({ nr, img, pos = 'center', name, price, rows, badge }) => `
<div class="pad">
  <div style="display:flex;align-items:center;justify-content:space-between;height:42px">
    <div class="eyebrow">Paket ${nr} von 3</div>${badge ? `<div class="badge">${badge}</div>` : ''}
  </div>
  <div class="photo" style="height:384px;margin-top:30px;background-image:url(${F(img)});background-position:${pos}"></div>
  <div class="h" style="font-size:62px;margin-top:44px">${name}</div>
  <div style="display:flex;align-items:flex-end;gap:28px;margin-top:22px">
    <div class="price" style="font-size:150px;font-weight:400">${price}&nbsp;€</div>
    <div class="muted" style="font-size:30px;line-height:1.3;padding-bottom:20px">pro Person,<br>inkl. MwSt.</div>
  </div>
  <div class="list nolast" style="margin-top:38px">${rows.map(r => `<div class="row">${check}<div>${r}</div></div>`).join('')}</div>
</div>`;

const step = ({ nr, eyebrow, h, lead, extra = '' }) => `
<div class="pad">
  <div class="eyebrow">${eyebrow}</div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:50px">
    <div class="num" style="font-size:300px;margin-left:-10px">${nr}</div>
    <div class="h" style="font-size:86px;margin-top:56px">${h}</div>
    <div class="lead" style="margin-top:36px;max-width:820px">${lead}</div>
    ${extra}
  </div>
</div>`;

const statement = ({ eyebrow, h, lead, size = 104, extra = '' }) => `
<div class="pad">
  <div class="eyebrow">${eyebrow}</div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:40px">
    <div style="width:72px;height:3px;background:#B0241F;margin-bottom:46px"></div>
    <div class="h" style="font-size:${size}px">${h}</div>
    <div class="lead" style="margin-top:44px;max-width:840px">${lead}</div>
    ${extra}
  </div>
</div>`;

const cta = ({ eyebrow = 'Euer nächster Schritt', h, lead, note }) => `
<div class="pad">
  <div class="eyebrow" style="color:rgba(250,246,240,.8)">${eyebrow}</div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:30px">
    <div class="h" style="font-size:104px">${h}</div>
    <div class="lead" style="margin-top:44px;max-width:820px">${lead}</div>
    <div style="margin-top:64px"><div class="btn">Link im Profil ${arrow('#B0241F', 38)}</div></div>
    <div style="margin-top:56px;font-size:27px;color:rgba(250,246,240,.78);letter-spacing:.01em">${note}</div>
  </div>
</div>`;

const tick = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(250,246,240,.9)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:8px"><path d="M4 12.5l5.2 5.2L20 6.8"/></svg>`;
const ctaNote = `${tick}140+ Paare <span style="display:inline-block;width:34px"></span>${tick}Antwort in 48 h <span style="display:inline-block;width:34px"></span>${tick}Unverbindlich`;

// ---------- Beitrag 1: Pakete ----------
const p1 = [
  { html: cover({ img: 'img/5022.jpg', pos: '50% 62%', eyebrow: 'Hochzeit · Privatfeier · Firmenevent', h: 'Drei Pakete mit <em>Festpreis</em> pro Person', lead: 'Italienisches Catering, live vor euren Gästen.' }) },
  { html: paket({ nr: 1, img: 'img/5268.jpg', pos: '50% 62%', name: 'Antipasti &amp; Pizza', price: 75, rows: ['Antipasti-Buffet mit 7 Variationen, klassisch oder komplett vegetarisch', 'Pizza Live Cooking aus dem Steinofen, 5 Kreationen eurer Wahl'] }) },
  { html: paket({ nr: 2, img: 'img/5849.jpg', pos: '50% 38%', name: 'Antipasti, Pizza &amp; Pasta', price: 95, badge: 'Unsere Empfehlung', rows: ['Alles aus „Antipasti &amp; Pizza“', 'Pasta im Parmesanlaib an der Live-Station: Fettuccine al Tartufo und Pasta al Limone'] }) },
  { html: paket({ nr: 3, img: 'img/5872.jpg', pos: '50% 70%', name: 'Antipasti, Pizza, Pasta &amp; Dessert', price: 115, rows: ['Alles aus „Antipasti, Pizza &amp; Pasta“', 'Dessert nach Wahl: Tiramisu und Panna Cotta im Glas oder Cannoli Concierge'] }) },
  { html: `
<div class="pad">
  <div class="eyebrow">Immer dabei</div>
  <div class="h" style="font-size:96px;margin-top:40px">In <em>jedem</em> Paket</div>
  <div class="list" style="margin-top:52px">
    ${['Steinofen mit Live-Cooking', 'Bis zu 2 Pizzen à 26 cm pro Person', '5 Kreationen eurer Wahl aus 22', 'Pizzabrot und Mitternachtssnack', 'Betreutes Buffet mit Service-Team', 'Pavillon und Beleuchtung', 'Auf- und Abbau'].map(r => `<div class="row" style="font-size:36px;padding:24px 0">${check}<div>${r}</div></div>`).join('')}
  </div>
  <div class="muted" style="font-size:28px;line-height:1.45;margin-top:40px">Preise inkl. MwSt. Anfahrt bis 25 km ab Augsburg inklusive.<br>Nur Pizza Live Cooking: 60 € pro Person.</div>
</div>` },
  { cls: 'cta', html: cta({ h: 'Preis in 2&nbsp;Minuten berechnen', lead: 'Im Konfigurator stellt ihr euer Catering zusammen und seht euren Preis sofort.', note: ctaNote }) },
];

// ---------- Beitrag 2: Gästezahl ----------
const ex = (label, val, strong) => `<div style="display:flex;align-items:baseline;justify-content:space-between;padding:${strong ? '46px 0 0' : '38px 0'};${strong ? '' : 'border-bottom:1px solid #DCD8CF;'}"><div style="font-size:${strong ? 36 : 34}px;color:${strong ? '#42301C' : '#4D3823'};font-weight:${strong ? 600 : 400}">${label}</div><div class="price" style="font-size:${strong ? 96 : 54}px;color:${strong ? '#B0241F' : '#42301C'}">${val}</div></div>`;
const p2 = [
  { html: cover({ img: 'img/5066.jpg', pos: '50% 70%', eyebrow: 'Gut zu wissen', h: 'Wie kalkulieren wir die <em>Gästezahl</em>?', lead: 'Drei Schritte und ein Rechenbeispiel.' }) },
  { html: step({ nr: '1', eyebrow: 'Schritt 1 von 3', h: 'Eure geplante Gästezahl', lead: 'Kinder unter 6 Jahren zählen nicht mit.' }) },
  { html: step({ nr: '2', eyebrow: 'Schritt 2 von 3', h: 'Minus 10&nbsp;%', lead: 'Für Krankheit und kurzfristige Absagen. Das Ergebnis ist eure Mindestanzahl.' }) },
  { html: step({ nr: '3', eyebrow: 'Schritt 3 von 3', h: 'Die finale Zahl, eine Woche vorher', lead: 'Liegt sie über der Mindestanzahl, berechnen wir die Differenz mit der Schlussrechnung nach.' }) },
  { html: `
<div class="pad">
  <div class="eyebrow">Rechenbeispiel</div>
  <div class="h" style="font-size:92px;margin-top:40px">Ein Beispiel <em>in Zahlen</em></div>
  <div class="card" style="margin-top:72px;padding:36px 52px 56px">
    ${ex('Geplante Gäste', '104')}
    ${ex('ohne 4 Kinder unter 6 Jahren', '100')}
    ${ex('10 % davon für Absagen', '10')}
    ${ex('Eure Mindestanzahl <span style="font-weight:400;color:#6D573C">(100 minus 10)</span>', '90', true)}
  </div>
  <div class="muted" style="font-size:28px;line-height:1.45;margin-top:44px">Die Zahlen sind ein Beispiel. Kommen am Ende 94 Gäste, berechnen wir 4 Gäste mit der Schlussrechnung nach.</div>
</div>` },
  { cls: 'cta', html: cta({ h: 'Preis in 2&nbsp;Minuten berechnen', lead: 'Im Konfigurator stellt ihr euer Catering zusammen und seht euren Preis sofort.', note: ctaNote }) },
];

// ---------- Beitrag 3: Verkostung ----------
const fact = (k, v) => `<div style="display:flex;align-items:baseline;gap:30px;padding:30px 0;border-top:1px solid #DCD8CF"><div class="eyebrow" style="flex:0 0 190px;font-size:22px">${k}</div><div class="h" style="font-size:46px;line-height:1.15;letter-spacing:-.01em;color:#42301C">${v}</div></div>`;
const p3 = [
  { html: cover({ img: 'img/5062.jpg', pos: '50% 100%', eyebrow: 'Bevor ihr bucht', h: 'Erst probieren, dann <em>entscheiden</em>', lead: 'Verkostung in unserer Pizzeria in Augsburg.' }) },
  { html: `
<div class="pad">
  <div class="eyebrow">Die Verkostung</div>
  <div class="h" style="font-size:84px;margin-top:40px">Ihr probiert, wofür ihr euch <em>interessiert</em></div>
  <div style="margin-top:52px;border-bottom:1px solid #DCD8CF">
    ${fact('Was', 'Euer Wunschpaket, von Antipasti bis Dessert')}
    ${fact('Wo', 'In unserer Pizzeria in Augsburg')}
    ${fact('Dauer', 'ca. 90 Minuten')}
    ${fact('Wann', 'Nach dem ersten Angebot')}
    ${fact('Wichtig', 'Unverbindlich, keine Buchungspflicht')}
  </div>
</div>` },
  { html: statement({ eyebrow: 'Was kostet das?', h: 'Ihr zahlt, was es euch <em>wert</em> war', lead: 'Das Geld geht an unser Team.' }) },
  { html: statement({ eyebrow: 'Der Weg ist euch zu weit?', h: 'Videoberatung in 20 bis 30&nbsp;Minuten', size: 96, lead: 'Alle Fragen zu eurem Fest, ohne Anfahrt.' }) },
  { cls: 'cta', html: cta({ eyebrow: 'So kommt ihr zur Verkostung', h: 'Erst anfragen, dann probieren', lead: 'Preis in 2 Minuten berechnen. Nach eurem Angebot vereinbaren wir die Verkostung.', note: ctaNote }) },
];

const posts = { 'pakete': p1, 'gaestezahl': p2, 'verkostung': p3 };
(async () => {
  const only = process.argv[2];
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  fs.mkdirSync(path.join(D, 'out'), { recursive: true });
  for (const [name, slides] of Object.entries(posts)) {
    if (only && only !== name) continue;
    for (let i = 0; i < slides.length; i++) {
      const s = slides[i];
      const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${css}</style></head><body class="${s.cls || ''}">${s.html}${foot(i + 1, slides.length, s.cls === 'cta')}</body></html>`;
      const hp = path.join(D, 'out', `${name}-${i + 1}.html`);
      fs.writeFileSync(hp, html);
      await pg.goto('file://' + hp);
      await pg.evaluate(() => document.fonts.ready);
      await pg.waitForTimeout(250);
      const over = await pg.evaluate(() => { const p = document.querySelector('.pad,.cover-body'); return p ? p.scrollHeight - p.clientHeight : 0; });
      const f = path.join(D, 'out', `siprego-catering-${name}-2026-11-${i + 1}.jpg`);
      await pg.screenshot({ path: f, type: 'jpeg', quality: 93 });
      console.log(f, 'overflow', over);
    }
  }
  await b.close();
})();
