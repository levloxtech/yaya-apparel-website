import { useState, useCallback, useEffect } from "react";
import modernWomen      from "@/assets/modern-women.png";
import traditionalWoman from "@/assets/traditional-woman.png";
import mensCasual       from "@/assets/mens-casual.png";
import mensFormal       from "@/assets/mens-formal.png";
import kidsWare         from "@/assets/kids-ware.png";
import kidsModern       from "@/assets/kid-modern.png";

type Category = "traditional" | "modern" | "casual";

const categories: { key: Category; label: string; dressType: string; sub: string }[] = [
  { key: "traditional", label: "Heritage Elegance", dressType: "Traditional", sub: "Timeless craftsmanship" },
  { key: "modern",      label: "Contemporary Edge", dressType: "Modern",       sub: "Sharp. Bold. Refined."  },
  { key: "casual",      label: "Effortless Style",  dressType: "Fusion",       sub: "Comfort meets luxury"   },
];

const heroImages: Record<Category, string[]> = {
  traditional: [traditionalWoman, kidsWare],
  modern:      [modernWomen,      kidsModern],
  casual:      [mensCasual,       mensFormal],
};

const desc: Record<Category, string> = {
  traditional: "Handcrafted luxury pieces celebrating timeless heritage with intricate embroidery and premium fabrics.",
  modern:      "Contemporary silhouettes for the visionary. Sharp lines meet innovative design and bold character.",
  casual:      "Premium everyday elegance — comfort woven with sophisticated style for the modern family.",
};

const headings: Record<Category, [string, string]> = {
  traditional: ["Ethnic",  "Wear"],
  modern:      ["Modern",  "Style"],
  casual:      ["Casual",  "Fusion"],
};

// Desktop floats (unchanged)
const desktopFloats = [
  { id:"f1",  src:"https://i.pinimg.com/736x/a7/9d/f9/a79df9064a5eaa1f4eaffa470af7a15d.jpg", pos:{ top:"6%",    left:"0.5%"  }, w:112, h:148, rot:"-7deg", anim:"fA", del:"0s",   z:2 },
  { id:"f2",  src:"https://i.pinimg.com/1200x/53/03/93/530393321789ba3f41d429d30e8c03e6.jpg",pos:{ top:"32%",   left:"5%"    }, w:96,  h:128, rot:"5deg",  anim:"fB", del:"1.2s", z:2 },
  { id:"f3",  src:"https://i.pinimg.com/736x/e9/f5/a4/e9f5a48be54e852c995bc614bf314c3d.jpg",pos:{ top:"58%",   left:"0.5%"  }, w:104, h:138, rot:"-4deg", anim:"fC", del:"0.4s", z:2 },
  { id:"f4",  src:"https://i.pinimg.com/736x/3d/a4/af/3da4af947dc96ead8578dc90dcb29e52.jpg", pos:{ top:"78%",   left:"6%"    }, w:90,  h:120, rot:"6deg",  anim:"fA", del:"2s",   z:2 },
  { id:"f5",  src:"https://i.pinimg.com/736x/86/67/90/866790ba772a525955be08a7a98a4b64.jpg",pos:{ bottom:"2%", left:"1%"    }, w:106, h:142, rot:"-3deg", anim:"fB", del:"0.8s", z:2 },
  { id:"f6",  src:"https://i.pinimg.com/736x/51/a5/47/51a547607992e94ddf756fb940e9a165.jpg", pos:{ top:"5%",    right:"0.5%" }, w:114, h:152, rot:"6deg",  anim:"fC", del:"0.3s", z:2 },
  { id:"f7",  src:"https://i.pinimg.com/1200x/dd/3d/42/dd3d428eab538e751c2580de55c6897e.jpg",pos:{ top:"30%",   right:"5%"   }, w:96,  h:128, rot:"-5deg", anim:"fA", del:"1.5s", z:2 },
  { id:"f8",  src:"https://i.pinimg.com/736x/f2/84/f3/f284f3d3cc05b770d318dc7b2ae8327b.jpg", pos:{ top:"55%",   right:"0.5%" }, w:104, h:138, rot:"4deg",  anim:"fB", del:"0.7s", z:2 },
  { id:"f9",  src:"https://i.pinimg.com/736x/14/58/93/14589328e5df052261012b661f2afadb.jpg", pos:{ top:"75%",   right:"5%"   }, w:90,  h:120, rot:"-6deg", anim:"fC", del:"1.8s", z:2 },
  { id:"f10", src:"https://i.pinimg.com/1200x/53/03/93/530393321789ba3f41d429d30e8c03e6.jpg",pos:{ bottom:"2%", right:"1%"   }, w:108, h:144, rot:"3deg",  anim:"fA", del:"1s",   z:2 },
  { id:"f11", src:"https://i.pinimg.com/1200x/e5/fd/9f/e5fd9f0f3ba73d8166b1eeba1534a122.jpg",pos:{ top:"20%",   left:"14%"   }, w:74,  h:98,  rot:"-3deg", anim:"fB", del:"2.4s", z:0 },
  { id:"f12", src:"https://i.pinimg.com/736x/9c/7d/1c/9c7d1c00243e9ecb1e9aa2fc0aeed5c5.jpg", pos:{ bottom:"22%",left:"13%"  }, w:70,  h:92,  rot:"4deg",  anim:"fC", del:"1.6s", z:0 },
  { id:"f13", src:"https://i.pinimg.com/1200x/c2/d7/e1/c2d7e19ef943ed64edf09468c372a4b2.jpg",pos:{ top:"19%",   right:"13%"  }, w:78,  h:102, rot:"3deg",  anim:"fA", del:"2.1s", z:0 },
  { id:"f14", src:"https://i.pinimg.com/736x/7f/c1/b5/7fc1b51bf520e0d827fc22ff850d9e60.jpg", pos:{ bottom:"21%",right:"12%"  }, w:72,  h:96,  rot:"-4deg", anim:"fB", del:"0.9s", z:0 },
];

// Mobile floats — 6 images evenly placed: 3 left, 3 right
const mobileFloats = [
  // LEFT COLUMN — top / mid / bottom
  {
    id: "mf1",
    src: "https://i.pinimg.com/736x/a7/9d/f9/a79df9064a5eaa1f4eaffa470af7a15d.jpg",
    style: { top: "4%", left: "0px" },
    w: 72, h: 96, rot: "-6deg", anim: "fA", del: "0s",
  },
  {
    id: "mf2",
    src: "https://i.pinimg.com/736x/e9/f5/a4/e9f5a48be54e852c995bc614bf314c3d.jpg",
    style: { top: "38%", left: "0px" },
    w: 68, h: 90, rot: "4deg", anim: "fB", del: "0.9s",
  },
  {
    id: "mf3",
    src: "https://i.pinimg.com/736x/86/67/90/866790ba772a525955be08a7a98a4b64.jpg",
    style: { bottom: "6%", left: "0px" },
    w: 70, h: 94, rot: "-3deg", anim: "fC", del: "1.6s",
  },
  // RIGHT COLUMN — top / mid / bottom
  {
    id: "mf4",
    src: "https://i.pinimg.com/736x/51/a5/47/51a547607992e94ddf756fb940e9a165.jpg",
    style: { top: "4%", right: "0px" },
    w: 72, h: 96, rot: "6deg", anim: "fC", del: "0.4s",
  },
  {
    id: "mf5",
    src: "https://i.pinimg.com/736x/f2/84/f3/f284f3d3cc05b770d318dc7b2ae8327b.jpg",
    style: { top: "38%", right: "0px" },
    w: 68, h: 90, rot: "-5deg", anim: "fA", del: "1.3s",
  },
  {
    id: "mf6",
    src: "https://i.pinimg.com/1200x/53/03/93/530393321789ba3f41d429d30e8c03e6.jpg",
    style: { bottom: "6%", right: "0px" },
    w: 70, h: 94, rot: "3deg", anim: "fB", del: "2s",
  },
];

const LetterReveal = ({ text, delay=0, trigger, cls, style }:
  { text:string; delay?:number; trigger:string; cls?:string; style?:React.CSSProperties }) => {
  const [v, setV] = useState(false);
  useEffect(() => { setV(false); const t=setTimeout(()=>setV(true),50+delay); return ()=>clearTimeout(t); }, [trigger, delay]);
  return (
    <span className={cls} style={{ display:"block",...style }}>
      {text.split("").map((c,i)=>(
        <span key={i} style={{ display:"inline-block", opacity:v?1:0, transform:v?"translateY(0) skewY(0)":"translateY(36px) skewY(4deg)", transition:`opacity .6s cubic-bezier(.22,1,.36,1) ${i*36+delay}ms,transform .6s cubic-bezier(.22,1,.36,1) ${i*36+delay}ms` }}>
          {c===" "?"\u00A0":c}
        </span>
      ))}
    </span>
  );
};

const FadeUp = ({ children, delay=0, trigger, style }:
  { children:React.ReactNode; delay?:number; trigger:string; style?:React.CSSProperties }) => {
  const [v, setV] = useState(false);
  useEffect(() => { setV(false); const t=setTimeout(()=>setV(true),60+delay); return ()=>clearTimeout(t); }, [trigger, delay]);
  return <div style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(20px)", transition:`opacity .56s ease ${delay}ms,transform .56s ease ${delay}ms`,...style }}>{children}</div>;
};

export default function HeroSection() {
  const [active, setActive] = useState<Category>("traditional");
  const [trans,  setTrans]  = useState(false);
  const [mobile, setMobile] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(p => { const i=categories.findIndex(c=>c.key===p); return categories[(i+1)%categories.length].key; });
      setImgIdx(p=>(p+1)%2);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const ACS: Record<Category,string> = { traditional:"#d69e11", modern:"#403481", casual:"#2481a3" };
  const ac = ACS[active];
  const rgba = (a:number): string => ({
    traditional:`rgba(184,148,58,${a})`,
    modern:`rgba(123,108,196,${a})`,
    casual:`rgba(62,156,196,${a})`,
  }[active] as string);

  const [hl, hr] = headings[active];
  const cat      = categories.find(c=>c.key===active)!;
  const heroImg  = heroImages[active][imgIdx%2];

  const go = useCallback((c: Category) => {
    if (c===active||trans) return;
    setTrans(true); setImgIdx(0);
    setTimeout(()=>{ setActive(c); setTimeout(()=>setTrans(false),60); }, 280);
  }, [active, trans]);

  return (
    <section style={{ position:"relative", minHeight:"100svh", width:"100%", overflow:"hidden", background:"#f4f1ec" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes fA{0%,100%{transform:var(--r) translateY(0) scale(1)}50%{transform:var(--r) translateY(-15px) scale(1.02)}}
        @keyframes fB{0%,100%{transform:var(--r) translateY(0)}50%{transform:var(--r) translateY(-11px)}}
        @keyframes fC{0%,100%{transform:var(--r) translateY(0) scale(.98)}50%{transform:var(--r) translateY(-18px) scale(1.02)}}
        @keyframes yd{0%,100%{transform:translate(-50%,-50%) rotate(-.6deg) scale(1)}50%{transform:translate(-50%,-50%) rotate(.6deg) scale(1.025)}}
        @keyframes ys{0%{background-position:-300% center}100%{background-position:300% center}}
        @keyframes gp{0%,100%{opacity:.44;transform:translateX(-50%) scale(1)}50%{opacity:.74;transform:translateX(-50%) scale(1.06)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}

        .fi{position:absolute;pointer-events:none;overflow:hidden;border-radius:16px}
        .fi img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block;filter:brightness(1.05) saturate(1.1)}

        .yb{
          position:absolute;top:50%;left:50%;
          font-family:'Playfair Display',serif;
          font-size:clamp(140px,21vw,380px);
          font-weight:300;letter-spacing:-0.02em;line-height:1;
          text-transform:uppercase;white-space:nowrap;
          pointer-events:none;user-select:none;z-index:1;
          background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.07) 25%,transparent 45%,rgba(255,255,255,.1) 65%,transparent 85%),var(--yc,rgba(184,148,58,.11));
          background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-size:200% auto;
          animation:yd 20s ease-in-out infinite,ys 11s linear infinite;
        }
        .grain{position:absolute;inset:0;pointer-events:none;z-index:3;opacity:.02;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px}

        .side-pill{
          position:absolute;
          top:50%;left:-56px;
          transform:translateY(-50%) rotate(-90deg);
          font-family:'Jost',sans-serif;
          font-size:9px;font-weight:700;letter-spacing:.38em;
          text-transform:uppercase;white-space:nowrap;
          padding:5px 14px;border-radius:20px;
          backdrop-filter:blur(6px);
          z-index:6;pointer-events:none;
        }

        @media(max-width:767px){
          .sp{display:none!important}
          .yb{font-size:clamp(60px,15vw,120px)!important}
        }
      `}</style>

      <div className="grain"/>
      <div className="yb" style={{ ["--yc" as string]:rgba(.11) } as React.CSSProperties}>YAYA</div>

      {/* Blobs */}
      <div style={{ position:"absolute",top:"-12%",right:"1%",width:860,height:860,borderRadius:"50%",pointerEvents:"none",background:`radial-gradient(circle,${rgba(.09)} 0%,transparent 65%)`,transition:"background 1s",zIndex:0 }}/>
      <div style={{ position:"absolute",bottom:"-10%",left:"0",width:700,height:700,borderRadius:"50%",pointerEvents:"none",background:`radial-gradient(circle,${rgba(.07)} 0%,transparent 65%)`,transition:"background 1s",zIndex:0 }}/>
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:`linear-gradient(rgba(0,0,0,.008) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.008) 1px,transparent 1px)`,backgroundSize:"80px 80px" }}/>

      {/* ── DESKTOP FLOATS ── */}
      {!mobile && (
        <>
          {desktopFloats.filter(f=>f.z===0).map(f=>(
            <div key={f.id} className="fi" style={{ ...f.pos,width:f.w,height:f.h,["--r" as string]:`rotate(${f.rot})`,zIndex:0,animation:`${f.anim} ${f.anim==="fA"?"9":f.anim==="fB"?"10.5":"8"}s ease-in-out infinite ${f.del}`,opacity:.28,filter:"drop-shadow(0 8px 18px rgba(0,0,0,.09))" } as React.CSSProperties}>
              <img src={f.src} alt=""/>
            </div>
          ))}
          {desktopFloats.filter(f=>f.z===2).map(f=>(
            <div key={f.id} className="fi" style={{ ...f.pos,width:f.w,height:f.h,["--r" as string]:`rotate(${f.rot})`,zIndex:2,animation:`${f.anim} ${f.anim==="fA"?"8.5":f.anim==="fB"?"10":"7.8"}s ease-in-out infinite ${f.del}`,opacity:["f1","f5","f6","f10"].includes(f.id)?0.88:0.72,filter:`drop-shadow(0 ${f.w>100?18:10}px ${f.w>100?38:22}px rgba(0,0,0,.16))` } as React.CSSProperties}>
              <img src={f.src} alt=""/>
            </div>
          ))}
        </>
      )}

      {/* ── MOBILE FLOATS — 3 left, 3 right, evenly spaced ── */}
      {mobile && mobileFloats.map(f=>(
        <div
          key={f.id}
          className="fi"
          style={{
            ...f.style,
            width: f.w,
            height: f.h,
            ["--r" as string]: `rotate(${f.rot})`,
            zIndex: 2,
            animation: `${f.anim} ${f.anim==="fA"?"8.5":f.anim==="fB"?"10":"7.8"}s ease-in-out infinite ${f.del}`,
            opacity: 0.75,
            filter: "drop-shadow(0 10px 24px rgba(0,0,0,.14))",
          } as React.CSSProperties}
        >
          <img src={f.src} alt=""/>
        </div>
      ))}

      {/* ══ CONTENT z:10 ══ */}
      <div style={{ position:"relative", zIndex:10, minHeight:"100svh", display:"flex", flexDirection:"column" }}>

        {/* ── DESKTOP ── */}
        {!mobile ? (
          <div style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1.8fr 1fr",
            gap: 0,
            alignItems: "stretch",
            padding: "0 13%",
            width: "100%",
            minHeight: "100svh",
          }}>

            {/* LEFT PANEL */}
            <div className="sp" style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:24, alignItems:"flex-end", paddingRight:32, paddingTop:60 }}>
              <FadeUp delay={0} trigger={active}>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Jost',sans-serif",fontSize:"9.5px",fontWeight:700,letterSpacing:".44em",textTransform:"uppercase",color:ac,marginBottom:10,transition:"color .7s" }}>
                    {cat.dressType} Collection
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:600,color:"#0d0b08",lineHeight:1.18,marginBottom:7 }}>
                    {cat.label}
                  </div>
                  <div style={{ fontFamily:"'Jost',sans-serif",fontSize:"11px",fontWeight:300,letterSpacing:".1em",color:"#8a7f6e" }}>
                    {cat.sub}
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={120} trigger={active}>
                <div style={{ display:"flex",gap:14,alignItems:"flex-start",justifyContent:"flex-end" }}>
                  <p style={{ fontFamily:"'Playfair Display',serif",fontSize:15,lineHeight:1.88,color:"#2c2820",fontWeight:400,maxWidth:"210px",textAlign:"right",fontStyle:"italic" }}>
                    {desc[active]}
                  </p>
                  <div style={{ width:"2px",minHeight:"80px",background:`linear-gradient(to bottom,${ac},${rgba(.18)})`,borderRadius:2,flexShrink:0,marginTop:4 }}/>
                </div>
              </FadeUp>

              <FadeUp delay={240} trigger={active}>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Jost',sans-serif",fontSize:"8.5px",fontWeight:700,letterSpacing:".36em",textTransform:"uppercase",color:rgba(.55),marginBottom:8 }}>
                    Featured Collection
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:600,color:"#0d0b08" }}>
                    YAYA {cat.label}
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={340} trigger={active}>
                <div style={{ display:"flex",flexDirection:"column",gap:12,alignItems:"flex-end",marginTop:8 }}>
                  {[{n:"200+",l:"Styles"},{n:"50+",l:"Countries"},{n:"12+",l:"Years"}].map(s=>(
                    <div key={s.n} style={{ display:"flex",alignItems:"baseline",gap:7,justifyContent:"flex-end" }}>
                      <span style={{ fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:ac,lineHeight:1,transition:"color .7s" }}>{s.n}</span>
                      <span style={{ fontFamily:"'Jost',sans-serif",fontSize:"9px",fontWeight:500,letterSpacing:".18em",textTransform:"uppercase",color:"#8a7f6e" }}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* CENTER */}
            <div style={{ position:"relative", width:"100%", height:"100svh", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
              <div className="side-pill" style={{ color:ac, background:rgba(.10), border:`1px solid ${rgba(.20)}`, transition:"color .7s,background .7s,border-color .7s" }}>
                {cat.dressType}
              </div>
              <div style={{ position:"absolute",bottom:"2%",left:"50%",width:"55%",height:"40%",borderRadius:"50%",background:`radial-gradient(ellipse,${rgba(.32)} 0%,transparent 68%)`,transition:"background .9s",zIndex:1,animation:"gp 4s ease-in-out infinite" }}/>
              <div style={{ position:"absolute",bottom:"-2%",left:"50%",transform:"translateX(-50%)",width:"88%",height:"52%",borderRadius:"50%",background:`radial-gradient(ellipse,${rgba(.08)} 0%,transparent 65%)`,transition:"background .9s",zIndex:1 }}/>
              <div style={{ position:"absolute",bottom:"4%",left:"50%",transform:"translateX(-50%)",width:"42%",height:"5px",borderRadius:"50%",background:`radial-gradient(ellipse,${rgba(.35)} 0%,transparent 70%)`,filter:"blur(5px)",zIndex:1,transition:"background .9s" }}/>
              <img
                key={`${active}-${imgIdx}`}
                src={heroImg}
                alt={active}
                style={{ height:"85%",width:"auto",objectFit:"contain",objectPosition:"bottom",position:"relative",zIndex:5,maxWidth:"100%",opacity:trans?0:1,transform:trans?"scale(.87) translateY(18px)":"scale(1) translateY(0)",transition:"opacity .38s ease,transform .38s ease",filter:`drop-shadow(0 30px 60px rgba(0,0,0,.22)) drop-shadow(0 0 34px ${rgba(.16)})` }}
              />
            </div>

            {/* RIGHT PANEL */}
            <div className="sp" style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:24, alignItems:"flex-start", paddingLeft:32, paddingTop:60 }}>
              <FadeUp delay={0} trigger={active}>
                <div>
                  <div style={{ fontFamily:"'Jost',sans-serif",fontSize:"9.5px",fontWeight:700,letterSpacing:".44em",textTransform:"uppercase",color:ac,marginBottom:10,transition:"color .7s" }}>
                    YAYA APPAREL
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:600,color:"#0d0b08",lineHeight:1.18 }}>
                    Premium Quality
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={120} trigger={active}>
                <div style={{ display:"flex",gap:14,alignItems:"flex-start" }}>
                  <div style={{ width:"2px",minHeight:"80px",background:`linear-gradient(to bottom,${ac},${rgba(.18)})`,borderRadius:2,flexShrink:0,marginTop:4 }}/>
                  <p style={{ fontFamily:"'Playfair Display',serif",fontSize:15,lineHeight:1.88,color:"#2c2820",fontWeight:400,maxWidth:"210px",fontStyle:"italic" }}>
                    Every piece crafted with precision, passion, and the finest materials for families who value elegance.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={260} trigger={active}>
                <div style={{ display:"flex",flexDirection:"column",gap:10,width:"100%" }}>
                  <button
                    style={{ fontFamily:"'Jost',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",padding:"13px 28px",border:"none",borderRadius:"6px",background:`linear-gradient(135deg,${ac},${rgba(.78)})`,color:"#fff",cursor:"pointer",transition:"all .3s",boxShadow:`0 10px 28px ${rgba(.28)}`,textAlign:"center" }}
                    onMouseEnter={e=>{ const b=e.currentTarget; b.style.transform="scale(1.03) translateY(-2px)"; b.style.boxShadow=`0 14px 36px ${rgba(.40)}`; }}
                    onMouseLeave={e=>{ const b=e.currentTarget; b.style.transform="scale(1)"; b.style.boxShadow=`0 10px 28px ${rgba(.28)}`; }}
                  >
                    Explore Collection
                  </button>
                  <button
                    style={{ fontFamily:"'Jost',sans-serif",fontSize:"11px",fontWeight:600,letterSpacing:".22em",textTransform:"uppercase",padding:"11px 28px",border:`1.5px solid ${ac}`,borderRadius:"6px",background:"transparent",color:ac,cursor:"pointer",transition:"all .3s",textAlign:"center" }}
                    onClick={()=>{ const i=categories.findIndex(c=>c.key===active); go(categories[(i+1)%categories.length].key); }}
                    onMouseEnter={e=>{ const b=e.currentTarget; b.style.transform="scale(1.02)"; b.style.background=rgba(.08); }}
                    onMouseLeave={e=>{ const b=e.currentTarget; b.style.transform="scale(1)"; b.style.background="transparent"; }}
                  >
                    Next Look →
                  </button>
                </div>
              </FadeUp>

              <FadeUp delay={340} trigger={active}>
                <div style={{ display:"flex",gap:9 }}>
                  {categories.map(c=>(
                    <button
                      key={c.key}
                      onClick={()=>go(c.key)}
                      style={{ width:active===c.key?26:7,height:7,borderRadius:4,border:"none",background:active===c.key?ac:"#ccc0aa",cursor:"pointer",transition:"all .4s ease",padding:0,animation:active===c.key?"pulse 2s ease-in-out infinite":"none",boxShadow:active===c.key?`0 3px 10px ${rgba(.36)}`:"none" }}
                      aria-label={c.label}
                    />
                  ))}
                </div>
              </FadeUp>

              <span style={{ fontFamily:"'Jost',sans-serif",fontSize:"10px",fontWeight:500,letterSpacing:".38em",textTransform:"uppercase",color:rgba(.90),transition:"color .7s",marginTop:4 }}>
                YAYA Premium Collection
              </span>
            </div>
          </div>

        ) : (
          /* ── MOBILE ── */
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // Horizontal padding accounts for the float columns (72px wide) + a small gap
            paddingLeft: 80,
            paddingRight: 80,
            paddingTop: 20,
            paddingBottom: 0,
            minHeight: "100svh",
          }}>

            {/* Category label + dots */}
            <div style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
              <FadeUp delay={0} trigger={active}>
                <div>
                  <div style={{ fontFamily:"'Jost',sans-serif",fontSize:"9px",fontWeight:700,letterSpacing:".44em",textTransform:"uppercase",color:ac,marginBottom:3,transition:"color .7s" }}>
                    {cat.dressType}
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:600,color:"#0d0b08",lineHeight:1.1 }}>
                    {cat.label}
                  </div>
                </div>
              </FadeUp>
              <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                {categories.map(c=>(
                  <button key={c.key} onClick={()=>go(c.key)} style={{ width:active===c.key?22:7,height:7,borderRadius:4,border:"none",background:active===c.key?ac:"#ccc0aa",cursor:"pointer",transition:"all .4s ease",padding:0,boxShadow:active===c.key?`0 3px 10px ${rgba(.36)}`:"none" }} aria-label={c.label}/>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div style={{ position:"relative",width:"100%",flex:1,minHeight:"48vh",maxHeight:"58vh",display:"flex",alignItems:"flex-end",justifyContent:"center" }}>
              <div style={{ position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"80%",height:"55%",borderRadius:"50%",background:`radial-gradient(ellipse,${rgba(.26)} 0%,transparent 70%)`,zIndex:1,animation:"gp 4s ease-in-out infinite" }}/>
              <img
                key={`${active}-${imgIdx}-m`}
                src={heroImg}
                alt={active}
                style={{ height:"100%",width:"auto",objectFit:"contain",objectPosition:"bottom",position:"relative",zIndex:2,maxWidth:"100%",opacity:trans?0:1,transform:trans?"scale(.88) translateY(14px)":"scale(1) translateY(0)",transition:"opacity .38s ease,transform .38s ease",filter:`drop-shadow(0 14px 32px rgba(0,0,0,.17)) drop-shadow(0 0 22px ${rgba(.13)})` }}
              />
            </div>

            {/* Heading */}
            <div style={{ textAlign:"center",lineHeight:.9,width:"100%",marginTop:10,marginBottom:8 }}>
              <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,9vw,56px)",fontWeight:700,color:"#0d0b08",letterSpacing:"-0.02em" }}>
                <LetterReveal text={hl} delay={0} trigger={active}/>
              </h1>
              <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,9vw,56px)",fontWeight:700,color:ac,letterSpacing:"-0.02em",transition:"color .7s" }}>
                <LetterReveal text={hr} delay={110} trigger={active}/>
              </h2>
            </div>

            {/* Description */}
            <FadeUp delay={180} trigger={active} style={{ width:"100%",marginBottom:12 }}>
              <p style={{ fontFamily:"'Playfair Display',serif",fontSize:12.5,lineHeight:1.65,color:"#2c2820",fontWeight:400,textAlign:"center",fontStyle:"italic" }}>
                {desc[active]}
              </p>
            </FadeUp>

            {/* Buttons */}
            <FadeUp delay={260} trigger={active} style={{ width:"100%",marginBottom:16 }}>
              <div style={{ display:"flex",flexDirection:"column",gap:9,width:"100%" }}>
                <button style={{ fontFamily:"'Jost',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",padding:"12px 20px",border:"none",borderRadius:"6px",background:`linear-gradient(135deg,${ac},${rgba(.78)})`,color:"#fff",cursor:"pointer",transition:"all .3s",boxShadow:`0 10px 26px ${rgba(.26)}` }}>
                  Explore Collection
                </button>
                <button
                  style={{ fontFamily:"'Jost',sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:".22em",textTransform:"uppercase",padding:"10px 20px",border:`1.5px solid ${ac}`,borderRadius:"6px",background:"transparent",color:ac,cursor:"pointer",transition:"all .3s" }}
                  onClick={()=>{ const i=categories.findIndex(c=>c.key===active); go(categories[(i+1)%categories.length].key); }}
                >
                  Next Look →
                </button>
              </div>
            </FadeUp>

            <span style={{ fontFamily:"'Jost',sans-serif",fontSize:"9px",fontWeight:500,letterSpacing:".36em",textTransform:"uppercase",color:rgba(.90),marginBottom:16 }}>
              YAYA Premium Collection
            </span>
          </div>
        )}
      </div>
    </section>
  );
}