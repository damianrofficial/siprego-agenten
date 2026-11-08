# Siprego Social-Design (Statics, Ads, Karussells)

Stand: 03.11.2026. Von Damian festgelegt: Alle Bilder und Werbemittel richten sich nach dem Design von siprego.de und den Flyern (Claude Design, "Siprego Flyer Stadtbergen", https://claude.ai/artifact/61jJgizRRwTYXxq3NdFxdy). Dieses Dokument ersetzt die alte Static-Regel (Rot #da1718, Inter, rote Balken auf Foto). Alte Statics in dem Stil nicht mehr bauen.

## Look in einem Satz

Viel Creme, wenig Elemente, eine fette Headline mit einem roten Wort und Punkt, ein freigestelltes Produkt mit weichem Schatten, Preis groß in Rot. Wie die Startseite von siprego.de.

## Farben (aus siprego.de und Flyer)

- Creme Hintergrund: #F3F1EB (Website), Flyer-Rückseite #FFF8F6
- Dunkelbraun Text und dunkle Flächen: #2A1A10
- Rot Akzent, Buttons, rotes Headline-Wort, Preis: #A6201C
- Hellrot für ein rotes Wort auf Dunkelbraun: #D9382F
- Grau-Braun Fließtext, Nebeninfo: #6B5A4C
- Linien, Karten-Rand: #D9CFC2
- Helles Creme (Bildplatzhalter, Label auf Dunkel): #E6E1D6
- Weiß für Karten auf Creme: #FFFFFF
- Rosa-Akzent auf Dunkelbraun (nur Website, Zeile 2 der Teig-Headline): #E7B9B4
- Nicht verwenden: das alte Social-Rot #da1718, Schwarz, Gelb, Verläufe.

## Schrift

- Headline: Bricolage Grotesque, Weight 800, Optical Size 96. Eng gesetzt (Letter-Spacing minus 2 %), Zeilenhöhe 0,96. Groß- und Kleinschreibung wie ein Satz, immer mit Punkt am Ende. Ein Wort oder die letzte Zeile in Rot. Höchstens 6 Wörter, 2 Zeilen.
  Beispiele von Website und Flyer: "Home of Arancini." / "48 Stunden Teig. Gebacken auf Stein. Ein Biss Neapel." / "Wir liefern nach Stadtbergen." / "Dein erster Arancino geht aufs Haus." / "Mortabella. Vollendet."
- Label über der Headline: Figtree 700, Versalien, Letter-Spacing 4 px bei 26 px, Rot. Beispiele: "PIZZERIA · AUGSBURG-PFERSEE", "NEU IM SHOP", "FIRMEN-CATERING", "NEU · MITTWOCH BIS FREITAG, 11 BIS 15:30".
- Fließtext und Nebeninfo: Figtree 500, Grau-Braun.
- Preis: Bricolage Grotesque 800 in Rot, darunter eine Zeile Figtree 500 Grau-Braun mit dem Inhalt ("Pizza Piccola, 1 Arancino, 1 Softdrink").
- Fußzeile: dünne Linie #D9CFC2, links "siprego.de" in Figtree 700 Braun, rechts "10 % günstiger als auf Lieferando" in Figtree 600 Rot.
- Keine Lacquer, keine Inter, keine Schreibschrift in Statics. Lacquer bleibt nur für Reel-Hooks (siehe social-hook-stil.md, dort steht, wann überhaupt).
- Schriften holen: Bricolage https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/BricolageGrotesque%5Bopsz%2Cwdth%2Cwght%5D.ttf , Figtree https://raw.githubusercontent.com/google/fonts/main/ofl/figtree/Figtree%5Bwght%5D.ttf . In Pillow mit set_variation_by_axes([96, 800, 100]) bzw. ([700]).

## Logo

- Logomark rund in Rot mit weißem Zeichen: https://siprego.de/wp-content/uploads/2021/01/cropped-siprego-logomark-circ.png (512 px). Auf Statics oben rechts, 88 bis 96 px bei 1080 px Breite. Auf Fotos als rundes Badge in die Ecke mit 24 px Abstand.
- Wortmarke hell (für dunkle Flächen): https://siprego.de/wp-content/uploads/siprego/home/siprego-logo-hell.png und https://siprego.de/wp-content/uploads/2021/01/siprego-logo-vertical-white.png
- Logo nie als Text setzen.

## Zwei Layouts (Skript brand_static.py, liegt im Scratchpad des Agenten und ist unten dokumentiert)

1. Hero-Static (freigestelltes Produkt): Creme-Fläche, oben links Label und Headline, oben rechts Logomark, Mitte freigestelltes Produkt (900 px breit bei 1080) mit weichem Ellipsen-Schatten (Braun, Alpha 90, Blur 28), unten links Preis 104 px und Inhaltszeile, Fußzeile. Vorbild: Hero auf siprego.de. Beispiel: siprego-ad-mittagsmenue-2026-11.jpg (https://siprego.de/wp-content/uploads/2026/11/siprego-ad-mittagsmenue-2026-11.jpg).
2. Karten-Static (Foto nicht freigestellt): Foto oben mit 28 px Eckenradius (wie die Produktkarten "Gerade beliebt"), 64 px Rand, Logomark-Badge im Foto oben rechts, darunter auf Creme Label, Headline (96 px), Unterzeile, Fußzeile. Beispiel: siprego-weihnachtsfeier-catering-2026-11-05-v2.jpg.

Formate: Feed 1080x1350, Ad quadratisch 1080x1080 (Headline 104 px, Produkt 780 px), Story 1080x1920 (Headline 128 px, Produkt 980 px, Preis bei y 1500). Keine Adresse im Bild. Keine Streichpreise. Ein Bild, ein Produkt, eine Aussage.

## Freigestellte Produkte (echte Fotos, transparent)

- Pizza Mortabella komplett: https://siprego.de/wp-content/uploads/siprego/pizza-hero/assembled.webp (1280 px, RGBA, viel Rand, mit getbbox() beschneiden)
- Pizza-Boden ohne Belag: https://siprego.de/wp-content/uploads/siprego/pizza-hero/base.webp
- Einzelzutaten (für Karussells): sauce.webp, mortadella.webp, burrata.webp, pesto.webp, pistachio.webp, basil.webp im selben Ordner
- Weitere Freisteller fehlen (Arancini, Bufala Verde, Diavolo, Antipasti). Wunsch an Damian: Produkt von oben auf neutralem Grund fotografieren, der Agent stellt frei (rembg) oder Damian liefert PNG.

## Karussells (Produkt-Fakten, Dough diary)

- Slide 1: Headline-Static ohne Produkt oder mit Produkt (Hero-Layout), z. B. "Was steckt im Arancino."
- Slides 2 bis 5: je ein Foto als Karte (Karten-Layout) mit einer Zeile Fakt in Bricolage 72 px, z. B. "Safranreis." / "Ragù vom Rind." / "48 Stunden Teig."
- Letzte Slide: Preis und Fußzeile.
- Dough diary bleibt Damians Serie (echte Fotos vom Versuch, Caption mit Zahlen wie 68 % Wasser), der Agent legt sie nur an, wenn Damian Fotos und Text liefert.

## Static-Ads (Meta Ads)

- Jedes Produkt-Static wird in drei Formaten gebaut und in die Mediathek geladen (Dateiname siprego-ad-PRODUKT-JJJJ-MM-feed.jpg, -square.jpg, -story.jpg), damit Damian sie direkt in Meta Ads verwenden kann.
- Ad-Headline nennt das Angebot, nicht den Laden: "Mittagspause. Gelöst." statt "Siprego Pfersee".
- Ad-Text (Caption) kurz: Hook, 3 Zeilen Inhalt, Preis, Zeitfenster, "Bestellen auf siprego.de, 10 % günstiger als auf Lieferando".

## Skript brand_static.py (Pillow)

```python
from PIL import Image, ImageDraw, ImageFont, ImageFilter
FD="./"  # Ordner mit fonts/Bricolage.ttf, fonts/Figtree.ttf, site/cropped-siprego-logomark-circ.png
CREAM=(243,241,235); BROWN=(42,26,16); RED=(166,32,28); MUTED=(107,90,76); LINE=(217,207,194)
def bric(size,wght=800):
    f=ImageFont.truetype(FD+"fonts/Bricolage.ttf",size); f.set_variation_by_axes([96,wght,100]); return f
def fig(size,wght=500):
    f=ImageFont.truetype(FD+"fonts/Figtree.ttf",size); f.set_variation_by_axes([wght]); return f
def tracked(d,xy,text,font,fill,tracking=0):
    x,y=xy
    for c in text: d.text((x,y),c,font=font,fill=fill); x+=d.textlength(c,font=font)+tracking
def headline(d,x,y,lines,size=118,ls=-0.02,lh=0.96):
    f=bric(size)
    for i,l in enumerate(lines):
        col=RED if i==len(lines)-1 else BROWN; cx=x
        for c in l: d.text((cx,y),c,font=f,fill=col); cx+=d.textlength(c,font=f)+size*ls
        y+=int(size*lh)
    return y
def logomark(size=96):
    return Image.open(FD+"site/cropped-siprego-logomark-circ.png").convert("RGBA").resize((size,size),Image.LANCZOS)
def shadow_ellipse(c,cx,cy,w,h,alpha=90):
    sh=Image.new("RGBA",c.size,(0,0,0,0)); ImageDraw.Draw(sh).ellipse([cx-w//2,cy-h//2,cx+w//2,cy+h//2],fill=(42,26,16,alpha))
    c.alpha_composite(sh.filter(ImageFilter.GaussianBlur(28)))
def footer(d,y,W=1080):
    d.line([(64,y),(W-64,y)],fill=LINE,width=2); d.text((64,y+22),"siprego.de",font=fig(28,700),fill=BROWN)
    t="10 % günstiger als auf Lieferando"; f=fig(26,600); d.text((W-64-d.textlength(t,font=f),y+24),t,font=f,fill=RED)
def hero_static(label,lines,cutout,price,desc,out,W=1080,H=1350,cut_w=900,cut_y=400):
    c=Image.new("RGBA",(W,H),CREAM+(255,)); d=ImageDraw.Draw(c); c.alpha_composite(logomark(96),(W-160,56))
    tracked(d,(64,76),label.upper(),fig(26,700),RED,4); headline(d,58,120,lines)
    cut=Image.open(cutout).convert("RGBA"); cut=cut.crop(cut.getbbox()); cut=cut.resize((cut_w,int(cut.height*cut_w/cut.width)),Image.LANCZOS)
    shadow_ellipse(c,W//2,cut_y+cut.height+30,int(cut_w*0.8),90); c.alpha_composite(cut,((W-cut_w)//2,cut_y)); d=ImageDraw.Draw(c)
    d.text((64,H-300),price,font=bric(104),fill=RED); d.text((64,H-182),desc,font=fig(34),fill=MUTED); footer(d,H-120,W)
    c.convert("RGB").save(out,quality=93)
def card_static(label,lines,photo,sub,out,W=1080,H=1350,photo_h=760,focus=0.5):
    c=Image.new("RGBA",(W,H),CREAM+(255,)); im=Image.open(photo).convert("RGB"); pw=W-128
    s=max(pw/im.width,photo_h/im.height); im=im.resize((int(im.width*s)+1,int(im.height*s)+1),Image.LANCZOS)
    x0=(im.width-pw)//2; y0=int((im.height-photo_h)*focus); im=im.crop((x0,y0,x0+pw,y0+photo_h))
    m=Image.new("L",(pw,photo_h),0); ImageDraw.Draw(m).rounded_rectangle([0,0,pw-1,photo_h-1],radius=28,fill=255); c.paste(im,(64,64),m)
    c.alpha_composite(logomark(88),(64+pw-112,88)); d=ImageDraw.Draw(c); ty=64+photo_h+48
    tracked(d,(64,ty),label.upper(),fig(26,700),RED,4); y=headline(d,58,ty+44,lines,size=96)
    d.text((64,y+12),sub,font=fig(32),fill=MUTED); footer(d,H-120,W); c.convert("RGB").save(out,quality=93)
```

Aufruf: hero_static("Neu · Mittwoch bis Freitag, 11 bis 15:30", ["Mittagspause.","Gelöst."], "site/assembled.webp", "16,90 €", "Pizza Piccola, 1 Arancino, 1 Softdrink", "out/ad.jpg")
