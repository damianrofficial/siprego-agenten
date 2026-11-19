# Unterzeilen der Catering-Statics (Layout catering3/4/5, 1080x1350) neu setzen.
# Die Vorlage dieser Statics gibt es nicht als Skript; dieses Skript loescht das Band der zwei Unterzeilen
# im fertigen Bild und schreibt beide Zeilen neu (Figtree 30, Gewicht 500, Farbe MUTED), sonst bleibt das Bild gleich.
# Kalibriert am 19.11.2026 gegen siprego-ad-catering3-steinofen-2026-11-feed.jpg (Abweichung nur JPEG-Rauschen).
# Nur fuer das 4:5-Format mit Headline-Unterkante bei y 1066. Aufruf:
#   python3 catering_static_unterzeile.py FIGTREE.ttf BASISBILD AUSGABE "Zeile 1" "Zeile 2"
import sys
from PIL import Image, ImageDraw, ImageFont
CREAM=(243,241,235); MUTED=(107,90,76)
font,src,out,l1,l2=sys.argv[1:6]
f=ImageFont.truetype(font,30); f.set_variation_by_axes([500])
im=Image.open(src).convert('RGB'); assert im.size==(1080,1350)
d=ImageDraw.Draw(im); d.rectangle([0,1071,1080,1185],fill=CREAM)
for i,t in enumerate((l1,l2)):
    w=d.textlength(t,font=f); assert 64+w<=1014,(t,w)
    d.text((64,1078+43*i),t,font=f,fill=MUTED)
im.save(out,quality=95,subsampling=0)
