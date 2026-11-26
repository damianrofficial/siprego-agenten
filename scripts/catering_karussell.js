// Siprego Catering: Karussell-Slides 1080x1350 im CI der Landingpage (Fraunces 500, Karla).
// Vorlage vom Musterlauf 14.11.2026. Aufruf im Arbeitsordner: node /home/user/siprego-agenten/scripts/catering_karussell.js [pakete|gaestezahl|verkostung|firmen]
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
.cover-body .h{margin-top:30px}
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

const cover = ({ img, pos = 'center', eyebrow, h, lead, photoH = 730, size = 92, gap = 70, tight = 30 }) => `
<div class="cover-photo" style="height:${photoH}px;background-image:url(${F(img)});background-position:${pos}"></div>
<div class="cover-body" style="top:${photoH + gap}px">
  <div class="eyebrow">${eyebrow}</div>
  <div class="h" style="font-size:${size}px;margin-top:${tight}px">${h}</div>
  <div class="lead" style="margin-top:${tight}px">${lead}</div>
</div>`;

const paket = ({ nr, of = 3, unit = 'pro Person, inkl. MwSt.', img, pos = 'center', name, price, rows, badge, photoH = 600, rowSize = 30 }) => `
<div class="pad">
  <div style="display:flex;align-items:center;justify-content:space-between;height:42px">
    <div class="eyebrow">Paket ${nr} von ${of}</div>${badge ? `<div class="badge">${badge}</div>` : ''}
  </div>
  <div class="photo" style="height:${photoH}px;margin-top:26px;background-image:url(${F(img)});background-position:${pos}"></div>
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:30px;margin-top:34px">
    <div class="h" style="font-size:54px;line-height:1.08;padding-bottom:6px">${name}</div>
    <div style="flex:0 0 auto;text-align:right">
      <div class="price" style="font-size:100px;font-weight:400;white-space:nowrap">${price}&nbsp;€</div>
      <div class="muted" style="font-size:25px;line-height:1.2;margin-top:6px;white-space:nowrap">${unit}</div>
    </div>
  </div>
  <div class="list nolast" style="margin-top:26px">${rows.map(r => `<div class="row" style="font-size:${rowSize}px;padding:17px 0">${check.replace('class="ck"', 'class="ck" style="margin-top:7px"')}<div>${r}</div></div>`).join('')}</div>
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
  { v: 2, html: cover({ img: 'img/5022.jpg', pos: '50% 60%', photoH: 660, size: 80, eyebrow: 'Hochzeits-Catering', h: 'Was kostet italienisches Catering für eure <em>Hochzeit</em>?', lead: 'Drei Pakete mit Festpreis pro Person.' }) },
  { v: 5, html: paket({ nr: 1, img: 'img/damian-antipasti-B.jpg', pos: '50% 50%', name: 'Antipasti &amp; Pizza', price: 75, rows: ['Antipasti-Buffet mit 7 Variationen, klassisch oder komplett vegetarisch', 'Pizza Live Cooking aus dem Steinofen, 5 Kreationen eurer Wahl'] }) },
  { v: 2, html: paket({ nr: 2, img: 'img/5849.jpg', pos: '50% 40%', name: 'Antipasti, Pizza &amp; Pasta', price: 95, badge: 'Unsere Empfehlung', rows: ['Alles aus „Antipasti &amp; Pizza“', 'Pasta im Parmesanlaib an der Live-Station: Fettuccine al Tartufo und Pasta al Limone'] }) },
  { v: 2, html: paket({ nr: 3, img: 'img/5872.jpg', pos: '50% 80%', name: 'Antipasti, Pizza, Pasta &amp; Dessert', price: 115, rows: ['Alles aus „Antipasti, Pizza &amp; Pasta“', 'Dessert nach Wahl: Tiramisu und Panna Cotta im Glas oder Cannoli Concierge'] }) },
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
  { v: 2, html: step({ nr: '3', eyebrow: 'Schritt 3 von 3', h: 'Eure finale Zahl, eine Woche vorher', lead: 'Wir fragen sie bei euch ab. Liegt sie über der Mindestanzahl, berechnen wir die Differenz mit der Schlussrechnung nach.' }) },
  { v: 2, html: `
<div class="pad">
  <div class="eyebrow">Rechenbeispiel</div>
  <div class="h" style="font-size:92px;margin-top:40px">Ein Beispiel <em>in Zahlen</em></div>
  <div class="card" style="margin-top:72px;padding:36px 52px 56px">
    ${ex('Geplante Gäste', '104')}
    ${ex('ohne 4 Kinder unter 6 Jahren', '100')}
    ${ex('10 % davon für Absagen', '10')}
    ${ex('Eure Mindestanzahl <span style="font-weight:400;color:#6D573C">(100 minus 10)</span>', '90', true)}
  </div>
  <div class="muted" style="font-size:28px;line-height:1.45;margin-top:44px">Die Zahlen sind ein Beispiel. Nennt ihr uns eine Woche vorher 94 Gäste, berechnen wir 4 Gäste mit der Schlussrechnung nach.</div>
</div>` },
  { cls: 'cta', html: cta({ h: 'Preis in 2&nbsp;Minuten berechnen', lead: 'Im Konfigurator stellt ihr euer Catering zusammen und seht euren Preis sofort.', note: ctaNote }) },
];

// ---------- Beitrag 3: Verkostung ----------
const fact = (k, v) => `<div style="display:flex;align-items:baseline;gap:30px;padding:30px 0;border-top:1px solid #DCD8CF"><div class="eyebrow" style="flex:0 0 190px;font-size:22px">${k}</div><div class="h" style="font-size:46px;line-height:1.15;letter-spacing:-.01em;color:#42301C">${v}</div></div>`;
const p3 = [
  { v: 3, html: cover({ img: 'img/ig-DAMH8ZZomrf-1.jpg', pos: '50% 62%', photoH: 850, size: 78, gap: 48, tight: 22, eyebrow: 'Bevor ihr bucht', h: 'Erst probieren, dann <em>entscheiden</em>', lead: 'Verkostung in unserer Pizzeria in Augsburg.' }) },
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

// ---------- Beitrag 4: Pakete Firmenevent (Zahlen von siprego.de/firmen-catering/, netto) ----------
const netto = 'pro Person, netto';
const tickF = tick;
const ctaNoteF = `${tickF}Bis 500+ Gäste <span style="display:inline-block;width:34px"></span>${tickF}Angebot in 48 h <span style="display:inline-block;width:34px"></span>${tickF}Zahlung auf Rechnung`;
const p4 = [
  { html: cover({ img: 'img/5021.jpg', pos: '50% 55%', photoH: 660, size: 80, eyebrow: 'Sommerfest · Weihnachtsfeier · Team-Event', h: 'Was kostet italienisches Catering für euer <em>Firmenevent</em>?', lead: 'Vier Pakete mit Festpreis pro Person.' }) },
  { v: 2, html: paket({ nr: 1, of: 4, unit: netto, img: 'img/5022.jpg', pos: '50% 50%', name: 'Pizza Live Cooking', price: 60, rows: ['5 Pizzakreationen nach Wahl aus 22', 'Bis zu 2 Pizzen à 26 cm pro Person, live aus dem mobilen Steinofen'] }) },
  { v: 4, html: paket({ nr: 2, of: 4, unit: netto, img: 'img/damian-antipasti-A.jpg', pos: '50% 50%', name: 'Antipasti &amp; Pizza', price: 75, rows: ['Alles aus „Pizza Live Cooking“', 'Antipasti-Buffet mit 7 Variationen, auch vegetarisch, dazu Pizzabrot aus dem Steinofen'] }) },
  { v: 2, html: paket({ nr: 3, of: 4, unit: netto, img: 'img/5872.jpg', pos: '50% 80%', name: 'Antipasti, Pizza &amp; Dessert', price: 95, badge: 'Bestseller', rows: ['Alles aus „Antipasti &amp; Pizza“', 'Dessert nach Wahl: Tiramisu und Panna Cotta oder Cannoli Concierge'] }) },
  { v: 2, html: paket({ nr: 4, of: 4, unit: netto, img: 'img/5849.jpg', pos: '50% 40%', name: 'Antipasti, Pizza, Trüffelpasta &amp; Dessert', price: 115, rows: ['Alles aus dem Bestseller', 'Trüffelpasta, live im Parmesanlaib geschwenkt'] }) },
  { html: `
<div class="pad">
  <div class="eyebrow">Immer dabei</div>
  <div class="h" style="font-size:96px;margin-top:40px">In <em>jedem</em> Paket</div>
  <div class="list" style="margin-top:52px">
    ${['Steinofen mit Live-Cooking', 'Bis zu 2 Pizzen à 26 cm pro Person', 'Service-Team und betreutes Buffet', 'Pavillon und Beleuchtung', 'Auf- und Abbau', 'Zahlung auf Rechnung'].map(r => `<div class="row" style="font-size:36px;padding:26px 0">${check}<div>${r}</div></div>`).join('')}
  </div>
  <div class="muted" style="font-size:28px;line-height:1.45;margin-top:40px">Preise pro Person netto, zzgl. 7 % MwSt.<br>Anfahrt bis 60 km ab Augsburg inklusive.</div>
</div>` },
  { cls: 'cta', html: cta({ h: 'Preis in 2&nbsp;Minuten berechnen', lead: 'Im Konfigurator stellt ihr euer Catering zusammen und seht euren Preis sofort.', note: ctaNoteF }) },
];

// ---------- Bausteine seit 19.11.2026 (KW48) ----------
// Titel mit Foto im Kasten (für Fotos schmaler als 1080 px, wird nie hochskaliert)
const coverInset = ({ img, pos = 'center', eyebrow, h, lead, photoH = 620, size = 80 }) => `
<div class="pad">
  <div class="photo" style="height:${photoH}px;background-image:url(${F(img)});background-position:${pos}"></div>
  <div class="eyebrow" style="margin-top:52px">${eyebrow}</div>
  <div class="h" style="font-size:${size}px;margin-top:26px">${h}</div>
  <div class="lead" style="margin-top:26px;font-size:35px">${lead}</div>
</div>`;
// Titel ohne Foto
const coverType = ({ eyebrow, h, lead, size = 118 }) => `
<div class="pad">
  <div class="eyebrow">${eyebrow}</div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:20px">
    <div style="width:72px;height:3px;background:#B0241F;margin-bottom:52px"></div>
    <div class="h" style="font-size:${size}px">${h}</div>
    <div class="lead" style="margin-top:48px;max-width:820px">${lead}</div>
    <div style="margin-top:84px;display:flex;align-items:center;gap:20px"><span class="swipe">Weiter</span>${arrow()}</div>
  </div>
</div>`;
// Große Zahl mit Einheit (z. B. 4 × 4 m), darunter Aussage
const figure = ({ eyebrow, fig, h, lead, figSize = 210, hSize = 76, extra = '' }) => `
<div class="pad">
  <div class="eyebrow">${eyebrow}</div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:50px">
    <div class="num" style="font-size:${figSize}px;margin-left:-6px;white-space:nowrap;line-height:1">${fig}</div>
    <div class="h" style="font-size:${hSize}px;margin-top:60px">${h}</div>
    <div class="lead" style="margin-top:34px;max-width:860px">${lead}</div>
    ${extra}
  </div>
</div>`;
const star = `<svg width="38" height="38" viewBox="0 0 24 24" fill="#B0241F"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>`;
const quote = ({ q, name, src, size = 62 }) => `
<div class="pad">
  <div class="eyebrow">Google-Bewertung</div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:40px">
    <div style="display:flex;gap:8px">${star.repeat(5)}</div>
    <div class="h" style="font-size:${size}px;line-height:1.2;letter-spacing:-.012em;margin-top:52px;color:#42301C">„${q}“</div>
    <div style="width:72px;height:1px;background:#76503C;margin-top:60px"></div>
    <div style="font-size:36px;font-weight:600;color:#42301C;margin-top:34px">${name}</div>
    <div class="muted" style="font-size:28px;margin-top:8px">${src}</div>
  </div>
</div>`;
const ctaStd = { cls: 'cta', html: cta({ h: 'Preis in 2&nbsp;Minuten berechnen', lead: 'Im Konfigurator stellt ihr euer Catering zusammen und seht euren Preis sofort.', note: ctaNote }) };

// ---------- Beitrag 6: Bewertungen (wörtlich und gekürzt von der Landingpage, nur Vorname) ----------
const p6 = [
  { html: coverInset({ img: 'img/5841.jpg', pos: '50% 25%', photoH: 640, eyebrow: 'Hochzeits-Catering', h: 'Was sagen <em>Brautpaare</em> über unser Catering?', lead: 'Drei Stimmen aus unseren Google-Bewertungen.' }) },
  { html: quote({ q: 'Perfektes Hochzeitscatering. Wir waren unfassbar zufrieden. Das Essen war super lecker, der Aufbau auch optisch sehr ansprechend.', name: 'Evi', src: 'Hochzeit · Google-Bewertung' }) },
  { html: quote({ q: 'Wir hatten Siprego für unsere Hochzeit im September 25 gebucht und hätten keinen besseren Caterer nehmen können.', name: 'Laura', src: 'Hochzeit im September 2025 · Google-Bewertung' }) },
  { html: quote({ q: 'Kommunikation war top, Service war top und Essen war ausgezeichnet. Man merkt, dass eine Familie mit Leidenschaft und Herz dahinter steckt.', name: 'Carl', src: 'Hochzeit im Mai · Google-Bewertung', size: 58 }) },
  ctaStd,
];

// ---------- Beitrag 7: Was braucht ihr vor Ort? (Strom nach Damian 14.11.2026) ----------
const p7 = [
  { html: cover({ img: 'img/5753.jpg', pos: '50% 22%', photoH: 680, size: 80, eyebrow: 'Gut zu wissen', h: 'Was braucht ihr <em>vor Ort</em> für euer Catering?', lead: 'Platz, Strom, Wasser und Zufahrt im Überblick.' }) },
  { html: figure({ eyebrow: 'Platz', fig: '4 × 4 m', h: 'Fläche für unsere Außenstation', lead: 'Mindestens. Hier backen, bereiten wir vor und geben aus. Mit Pasta-Station zusätzlich ca. 2&nbsp;×&nbsp;2&nbsp;m.' }) },
  { html: figure({ eyebrow: 'Strom', fig: '1 × 230 V', figSize: 190, h: 'Eine Steckdose für die Pizza-Station', lead: 'Mit Pasta-Station zusätzlich 2&nbsp;×&nbsp;230&nbsp;V (oder 1&nbsp;×&nbsp;400&nbsp;V). Das Gas bringen wir mit.' }) },
  { html: statement({ eyebrow: 'Wasser', size: 96, h: '<em>Kein</em> Wasseranschluss nötig', lead: 'Was wir brauchen, bringen wir mit.' }) },
  { html: `
<div class="pad">
  <div class="eyebrow">Zufahrt und Untergrund</div>
  <div class="h" style="font-size:84px;margin-top:40px">So kommen wir zu <em>euch</em></div>
  <div style="margin-top:52px;border-bottom:1px solid #DCD8CF">
    ${fact('Zufahrt', 'Mit Transporter (Sprintergröße) bis zur Backstation')}
    ${fact('Parken', 'Ein Parkplatz in der Nähe')}
    ${fact('Untergrund', 'Fest und eben. Wiese nur bei Trockenheit')}
    ${fact('Treppen', 'Treppen oder Rampe nur nach Absprache')}
  </div>
</div>` },
  { html: statement({ eyebrow: 'Schlechtwetter', h: 'Und wenn es <em>regnet</em>?', lead: 'Dann brauchen wir zusätzlich Platz für 2&nbsp;Tische à 2,20&nbsp;m im Innenbereich, am besten nahe der Backstation.' }) },
  ctaStd,
];

// ---------- Beitrag 8: So könnt ihr sparen (5 % bei Vollzahlung, nur bei Events in mehr als 6 Monaten) ----------
const pay = (k, v, strong) => `<div style="padding:38px 0;${strong ? '' : 'border-bottom:1px solid #DCD8CF;'}"><div class="eyebrow" style="font-size:22px;color:${strong ? '#B0241F' : '#76503C'}">${k}</div><div class="h" style="font-size:44px;line-height:1.2;letter-spacing:-.01em;color:#42301C;margin-top:18px">${v}</div></div>`;
const p8 = [
  { html: coverType({ eyebrow: 'Hochzeits-Catering', h: 'Wie könnt ihr bei eurem Catering <em>sparen</em>?', lead: 'Ein Tipp für alle, die früh planen.' }) },
  { html: figure({ eyebrow: 'Der Tipp', fig: '5 %', figSize: 330, h: 'Rabatt bei Vollzahlung', lead: 'Ihr zahlt den gesamten Betrag bei Vertragsunterschrift statt in zwei Teilen.' }) },
  { html: `
<div class="pad">
  <div class="eyebrow">Die Bedingung</div>
  <div class="h" style="font-size:84px;margin-top:40px">Euer Fest ist in <em>mehr als 6&nbsp;Monaten</em></div>
  <div class="card" style="margin-top:56px;padding:14px 52px 18px">
    ${pay('Üblich', '50&nbsp;% Anzahlung bei Vertragsunterschrift, 50&nbsp;% am Veranstaltungstag')}
    ${pay('Mit Vollzahlung', '100&nbsp;% bei Vertragsunterschrift, dafür 5&nbsp;%&nbsp;Rabatt', true)}
  </div>
  <div class="muted" style="font-size:28px;line-height:1.45;margin-top:40px">Bei Festen in weniger als 6 Monaten gilt: 80&nbsp;% Anzahlung, 20&nbsp;% am Veranstaltungstag, ohne Rabatt.</div>
</div>` },
  { html: `
<div class="pad">
  <div class="eyebrow">Rechenbeispiel</div>
  <div class="h" style="font-size:92px;margin-top:40px">Ein Beispiel <em>in Zahlen</em></div>
  <div class="card" style="margin-top:72px;padding:36px 52px 56px">
    ${ex('100 Gäste, Antipasti &amp; Pizza', '7.500 €')}
    ${ex('5 % Rabatt bei Vollzahlung', '375 €')}
    ${ex('Ihr zahlt', '7.125 €', true)}
  </div>
  <div class="muted" style="font-size:28px;line-height:1.45;margin-top:44px">Die Zahlen sind ein Beispiel: 100 Gäste mal 75 € pro Person inkl. MwSt., ohne Anfahrt.</div>
</div>` },
  ctaStd,
];

// ---------- Beitrag 9: Ablauf am Eventtag (Zeiten von der Landingpage) ----------
const p9 = [
  { html: cover({ img: 'img/5068.jpg', pos: '50% 62%', photoH: 720, size: 84, gap: 64, eyebrow: 'Euer Eventtag', h: 'Wie läuft der <em>Eventtag</em> mit uns ab?', lead: 'Vom Aufbau bis zum letzten Stück Pizza.' }) },
  { html: figure({ eyebrow: 'Vor dem Start', fig: '2 Stunden', figSize: 136, h: 'Aufbau', lead: 'Ca. 2 Stunden vor dem Start bauen wir auf. Ab dann brauchen wir Zugang zu eurer Location.' }) },
  { html: figure({ eyebrow: 'Während eures Festes', fig: '2 bis 4 Stunden', figSize: 136, h: 'Buffetzeit', lead: 'In der Regel, je nach Gästezahl und Paket. Wir backen laufend frisch und legen nach.' }) },
  { html: figure({ eyebrow: 'Danach', fig: '1 Stunde', figSize: 136, h: 'Abbau im Hintergrund', lead: 'Direkt im Anschluss, ca. 1 Stunde.' }) },
  { html: statement({ eyebrow: 'Und was übrig bleibt?', h: 'Bleibt bei <em>euch</em>', lead: 'Was am Ende übrig ist, lassen wir euch frisch verpackt da. Ideal als Snack für später.' }) },
  ctaStd,
];

// ---------- Lauf 26.11.2026 (KW49): Pizzen, Pasta im Parmesanlaib, vegan und glutenfrei, Cannoli Concierge ----------
const dish = (n, d) => `<div style="padding:32px 0;border-top:1px solid #DCD8CF"><div class="h" style="font-size:60px;color:#42301C">${n}</div><div class="muted" style="font-size:31px;line-height:1.35;margin-top:12px">${d}</div></div>`;
const dishes = ({ eyebrow, h, items }) => `
<div class="pad">
  <div class="eyebrow">${eyebrow}</div>
  <div class="h" style="font-size:84px;margin-top:40px">${h}</div>
  <div style="margin-top:48px;border-bottom:1px solid #DCD8CF">${items.map(i => dish(i[0], i[1])).join('')}</div>
</div>`;
const p10 = [
  { html: cover({ img: 'img/5020-pizza.jpg', pos: '60% 50%', photoH: 690, size: 80, eyebrow: 'Eure Pizza-Auswahl', h: 'Welche Pizzen gibt es bei eurem <em>Catering</em>?', lead: '22 Kreationen, ihr wählt 5.' }) },
  { html: figure({ eyebrow: 'So funktioniert es', fig: '5 aus 22', figSize: 200, h: 'Eure Favoriten, live aus dem Steinofen', lead: 'Ihr wählt 5 Pizzen aus aktuell 22 Kreationen. Änderungen sind bis eine Woche vor dem Event möglich.' }) },
  { html: dishes({ eyebrow: 'Besonders beliebt · 1 von 2', h: 'Unsere <em>Lieblinge</em>', items: [['Bufala', 'Büffelmozzarella, frisches Basilikum'], ['Parma', 'Luftgetrockneter Schinken, Rucola, Parmesan, Cherrytomaten'], ['Mortabella', 'Mozzarella, Mortadella, Büffelmozzarella, Basilikumpesto und Pistazien'], ['Diavolo', 'Scharfe Salsiccia, Cherrytomaten']] }) },
  { html: dishes({ eyebrow: 'Besonders beliebt · 2 von 2', h: 'Unsere <em>Lieblinge</em>', items: [['Paradiso', 'Salami, Hinterschinken, Champignons, Peperoni'], ['Pescatora', 'Meeresfrüchte, Knoblauch'], ['Capri', 'Zucchini, Auberginen, Salsiccia, Fetakäse'], ['Pepe Spinaci', 'Mozzarella, frischer Spinat, Edamer Käse, schwarzer Pfeffer']] }) },
  { html: `
<div class="pad">
  <div class="eyebrow">Dazu 14 Klassiker</div>
  <div class="h" style="font-size:84px;margin-top:40px">Von Margherita<br>bis <em>Tonno</em></div>
  <div style="margin-top:52px;display:grid;grid-template-columns:1fr 1fr;column-gap:56px">
    ${['Margherita', 'Marinara', 'Salami', 'Prosciutto', 'Funghi', 'Sofia', 'Pompei', 'Quattro Stagioni', 'Tonno', 'Zola', 'Cinque Formaggi', 'Vegetaria', 'Amalfi', 'Sucuk Supreme'].map(n => `<div class="h" style="font-size:46px;line-height:1;color:#42301C;padding:27px 0;border-top:1px solid #DCD8CF;white-space:nowrap">${n}</div>`).join('')}
  </div>
</div>` },
  { html: statement({ eyebrow: 'Sonderwünsche', size: 96, h: 'Wünsche erfüllen wir direkt am <em>Ofen</em>', lead: 'Zutaten weglassen oder eigene Kombinationen: Wünsche eurer Gäste erfüllen wir gern direkt am Ofen.' }) },
  ctaStd,
];
const p11 = [
  { html: coverInset({ img: 'img/5849.jpg', pos: '50% 32%', photoH: 640, size: 76, eyebrow: 'Live-Station', h: 'Kennt ihr schon unsere Pasta aus dem <em>Parmesanlaib</em>?', lead: 'Frisch geschwenkt, vor den Augen eurer Gäste.' }) },
  { html: statement({ eyebrow: 'Das Highlight', size: 92, h: 'Frische Pasta, live geschwenkt im <em>Parmesanlaib</em>', lead: 'An unserer Live-Station schwenken wir frische Pasta vor den Augen eurer Gäste im ausgehöhlten Parmesanlaib.' }) },
  { html: statement({ eyebrow: 'Sorte 1 von 2', h: 'Fettuccine al <em>Tartufo</em>', lead: 'Frische Pasta, im Parmesanlaib geschwenkt, verfeinert mit schwarzem Trüffel, Butter und Parmigiano Reggiano.' }) },
  { html: statement({ eyebrow: 'Sorte 2 von 2', h: 'Pasta al <em>Limone</em>', lead: 'Frische Pasta, im Parmesanlaib geschwenkt, verfeinert mit Zitronenzeste und Basilikum, Butter und Parmigiano Reggiano.' }) },
  { html: `
<div class="pad">
  <div class="eyebrow">Gut zu wissen</div>
  <div class="h" style="font-size:84px;margin-top:40px">Beide Sorten sind <em>inklusive</em></div>
  <div style="margin-top:52px;border-bottom:1px solid #DCD8CF">
    ${fact('Paket', 'Antipasti, Pizza &amp; Pasta: 95&nbsp;€ pro Person')}
    ${fact('Mit Dessert', 'Antipasti, Pizza, Pasta &amp; Dessert: 115&nbsp;€ pro Person')}
    ${fact('Geschirr', 'Bambus-Pastateller und Schälchen inklusive')}
    ${fact('Platz', 'Zusätzlich ca. 2&nbsp;×&nbsp;2&nbsp;m für die Pasta-Station')}
  </div>
  <div class="muted" style="font-size:28px;line-height:1.45;margin-top:36px">Preise pro Person inkl. MwSt.</div>
</div>` },
  ctaStd,
];
const p12 = [
  { html: coverType({ eyebrow: 'Gut zu wissen', size: 108, h: 'Was ist mit veganen und glutenfreien <em>Gästen</em>?', lead: 'Kurz erklärt, was bei uns möglich ist.' }) },
  { html: statement({ eyebrow: 'Glutenfrei', h: 'Glutenfreier Teig, <em>ohne</em> Aufpreis', lead: 'Gebacken auf einem separaten Blech, ohne Mehlkontakt.' }) },
  { html: statement({ eyebrow: 'Vegan', h: 'Veganer Käse für eure <em>Pizza</em>', lead: 'Für 4&nbsp;€ pro Person.' }) },
  { html: statement({ eyebrow: 'Vegetarisch', size: 96, h: 'Antipasti auf Wunsch komplett <em>vegetarisch</em>', lead: 'Unser Antipasti-Buffet mit sieben Variationen gibt es klassisch oder komplett vegetarisch.' }) },
  ctaStd,
];
const p13 = [
  { html: coverInset({ img: 'img/5271.jpg', pos: '50% 38%', photoH: 640, size: 78, eyebrow: 'Dessert', h: 'Kennt ihr schon unseren Cannoli <em>Concierge</em>?', lead: 'Dessert, live gefüllt, mitten unter euren Gästen.' }) },
  { html: statement({ eyebrow: 'Die Idee', size: 96, h: 'Das Dessert kommt zu euren <em>Gästen</em>', lead: 'Mit seiner mobilen Station mischt sich unser Cannoli Concierge direkt unter eure Gesellschaft. Ein persönlicher Genussmoment statt Dessertbuffet.' }) },
  { html: statement({ eyebrow: 'Frisch gefüllt', size: 92, h: 'Jedes Cannolo entsteht vor den Augen eurer <em>Gäste</em>', lead: 'Knusprig, cremig, authentisch.' }) },
  { html: step({ nr: '3', eyebrow: 'Eure Wahl', h: 'Füllungen', lead: 'Pistazie, Schokolade oder kandierte Früchte.<br>Ihr wählt eure Favoriten.' }) },
  { html: `
<div class="pad">
  <div class="eyebrow">Gut zu wissen</div>
  <div class="h" style="font-size:84px;margin-top:40px">So kommt der Cannoli Concierge zu <em>euch</em></div>
  <div style="margin-top:52px;border-bottom:1px solid #DCD8CF">
    ${fact('Paket', 'Antipasti, Pizza, Pasta &amp; Dessert: 115&nbsp;€ pro Person')}
    ${fact('Dessert', 'Nach Wahl: Cannoli Concierge oder Tiramisu und Panna Cotta im Glas')}
    ${fact('Gäste', 'Für jede Gruppengröße, bis 500+ Personen')}
  </div>
  <div class="muted" style="font-size:28px;line-height:1.45;margin-top:36px">Preis pro Person inkl. MwSt.</div>
</div>` },
  ctaStd,
];

const posts = { 'pakete': p1, 'gaestezahl': p2, 'verkostung': p3, 'firmen': p4, 'bewertung': p6, 'vorort': p7, 'sparen': p8, 'eventtag': p9, 'pizzen': p10, 'pasta': p11, 'veganglutenfrei': p12, 'cannoli': p13 };
const monat = { firmen: '2026-12', pizzen: '2026-12', pasta: '2026-12', veganglutenfrei: '2026-12', cannoli: '2026-12' };
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
      const f = path.join(D, 'out', `siprego-catering-${name}-${monat[name] || '2026-11'}-${i + 1}${s.v ? '-v' + s.v : ''}.jpg`);
      await pg.screenshot({ path: f, type: 'jpeg', quality: 93 });
      console.log(f, 'overflow', over);
    }
  }
  await b.close();
})();
