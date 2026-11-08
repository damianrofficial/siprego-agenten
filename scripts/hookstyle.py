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

