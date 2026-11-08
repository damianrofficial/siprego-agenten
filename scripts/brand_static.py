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
