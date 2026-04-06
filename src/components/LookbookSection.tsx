import { useEffect, useRef, useState } from "react";

// ── Premium Color Palette ─────────────────────────────────────────────────
const RICH_GOLD  = "#b38a22"; // Deeper, warmer gold
const DARK_STONE = "#2c2820"; // Grounded, expensive dark tone
const BG_CREAM   = "#faf9f6";

// ── Scroll-triggered hook ─────────────────────────────────────────────────
const useInView = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const FadeSlide = ({ children, inView, delay = 0, style = {} }:
  { children: React.ReactNode; inView: boolean; delay?: number; style?: React.CSSProperties }) => (
  <div style={{
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    ...style,
  }}>
    {children}
  </div>
);

// ── 20 gallery images — fashion from Unsplash ────────────────────────────
const row1Images = [
  { img: "https://i.pinimg.com/736x/b8/b6/aa/b8b6aa0667011708fd8d474ce3bd04fe.jpg", label: "Long Kurta" },
  { img: "https://i.pinimg.com/736x/2d/cc/59/2dcc595152fb5fc2830b60e87c2e345b.jpg", label: "Co-ord Sets" },
  { img: "https://i.pinimg.com/736x/49/5a/6d/495a6d703326200d4b9c74fd2145e1e2.jpg", label: "Chudithar" },
  { img: "https://i.pinimg.com/736x/45/be/b8/45beb8526bb917834473f65dba24a802.jpg", label: "Dresses" },
  { img: "https://i.pinimg.com/736x/93/80/b6/9380b633daaf532b2f699e1f78c5c85f.jpg", label: "Palazzo" },
  { img: "https://i.pinimg.com/1200x/af/c6/88/afc688001683a776358194f1bdd1bee3.jpg", label: "Men's Shirts" },
  { img: "https://i.pinimg.com/736x/94/e8/ae/94e8ae6c7bbc270131bfc0ddc7141908.jpg", label: "Bottom Wear" },
  { img: "https://i.pinimg.com/1200x/be/a0/97/bea097f127ccc41a4253a9f1df7a3c76.jpg", label: "Kids — Boys" },
  { img: "https://i.pinimg.com/736x/14/db/ef/14dbef3255205cf02fcefaad487b1d97.jpg", label: "Tunic" },
  { img: "https://i.pinimg.com/1200x/61/de/06/61de06183cda50e9970cbd8b065f2893.jpg", label: "Cigarette Pants" },
];

const row2Images = [
  { img: "https://i.pinimg.com/736x/48/75/83/4875836154de1cb7f7bfab0419698132.jpg", label: "Tops" },
  { img: "https://i.pinimg.com/736x/6d/d0/5d/6dd05dd3d40bd976134b9ba43c9a8550.jpg", label: "Men's T-Shirts" },
  { img: "https://i.pinimg.com/736x/71/31/11/713111594151ddf329204a1c018df961.jpg", label: "denim" },
  { img: "https://i.pinimg.com/736x/66/ba/3d/66ba3df5e1c55c56d33de6aaf9c7f27c.jpg", label: "Cotton Wear" },
  { img: "https://i.pinimg.com/1200x/1a/e4/97/1ae497c9efe15aadbcb0b1f4bfa4f74f.jpg", label: "Skirt" },
  { img: "https://i.pinimg.com/1200x/fa/c4/13/fac41383247c03a6a2669413b2d75845.jpg", label: "Trousers" },
  { img: "https://i.pinimg.com/1200x/d0/45/96/d045969f8e72ba06147f9292c29e4a32.jpg", label: "Joggers" },
  { img: "https://i.pinimg.com/1200x/e3/12/2d/e3122d8eb1e08c3738e86a0f5f246b8d.jpg", label: "Dupatta" },
  { img: "https://i.pinimg.com/736x/96/d3/b6/96d3b6fbf4f97cf945e1841813200b07.jpg", label: "Short Kurta" },
  { img: "https://i.pinimg.com/736x/de/11/64/de11646eb149e81814d1628a1592f3fb.jpg", label: "Shorts" },
];

// ── Single gallery card ───────────────────────────────────────────────────
const GalleryCard = ({ item }: { item: { img: string; label: string } }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 200,
        height: 260,
        borderRadius: 14,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        border: `1px solid rgba(179,138,34,0.12)`,
        background: "#edeae2",
        transform: hovered ? "scale(1.04) translateY(-4px)" : "scale(1) translateY(0)",
        boxShadow: hovered
          ? `0 18px 44px rgba(179,138,34,0.20), 0 6px 16px rgba(0,0,0,0.10)`
          : `0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(179,138,34,0.08)`,
        transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease",
      }}
    >
      <img
        src={item.img}
        alt={item.label}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
        }}
      />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(18,16,10,0.7) 0%, transparent 55%)",
        opacity: hovered ? 1 : 0.5,
        transition: "opacity 0.32s ease",
      }}/>
      {/* Label */}
      <div style={{
        position: "absolute",
        bottom: 12,
        left: 12,
        right: 12,
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 14,
          fontWeight: 500,
          color: "#fff",
          letterSpacing: "0.06em",
          lineHeight: 1,
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition: "transform 0.3s ease",
        }}>
          {item.label}
        </p>
      </div>
      {/* Gold dot on hover */}
      <div style={{
        position: "absolute",
        top: 10,
        right: 10,
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: RICH_GOLD,
        boxShadow: `0 2px 8px rgba(179,138,34,0.7)`,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1)" : "scale(0)",
        transition: "all 0.28s cubic-bezier(.34,1.56,.64,1)",
      }}/>
    </div>
  );
};

// ── Auto-scroll row ───────────────────────────────────────────────────────
const ScrollRow = ({
  items,
  direction = "left",
}: {
  items: { img: string; label: string }[];
  direction?: "left" | "right";
}) => {
  const trackRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const posRef    = useRef(0);
  const pausedRef = useRef(false);

  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  const cardW   = 200 + 16; // width + gap

  useEffect(() => {
    const totalW = items.length * cardW;
    const step   = direction === "left" ? -0.5 : 0.5;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += step;
        // Reset loop
        if (direction === "left"  && posRef.current <= -totalW) posRef.current += totalW;
        if (direction === "right" && posRef.current >= 0)        posRef.current -= totalW;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    // start offset for right row
    if (direction === "right") posRef.current = -(items.length * cardW) / 2;

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, items.length, cardW]);

  return (
    <div
      style={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 16,
          width: "max-content",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <GalleryCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
const LookbookSection = () => {
  const header = useInView(0.1);
  const rows   = useInView(0.08);
  const bottom = useInView(0.15);

  return (
    <section
      id="lookbook"
      style={{
        background: BG_CREAM,
        padding: "88px 0 96px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

      <style>{`
        @keyframes shimmerLine {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .lb-gold-shimmer {
          background: linear-gradient(90deg, ${RICH_GOLD} 0%, #e8c87a 45%, ${RICH_GOLD} 90%);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerLine 3.5s ease-in-out infinite;
        }
        @keyframes lbMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .lb-marquee-track {
          animation: lbMarquee 22s linear infinite;
          display: flex;
          width: max-content;
        }
        .lb-marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Ambient blobs */}
      <div style={{ position:"absolute", top:-80, right:-80, width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle,rgba(179,138,34,0.07) 0%,transparent 70%)`, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:-60, left:-60, width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,rgba(179,138,34,0.05) 0%,transparent 70%)`, pointerEvents:"none" }}/>

      {/* ── Header ── */}
      <div ref={header.ref} style={{ textAlign:"center", marginBottom:52, padding:"0 24px" }}>

        <FadeSlide inView={header.inView} delay={0}>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.55em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:14 }}>
            Visual Stories
          </span>
        </FadeSlide>

        <FadeSlide inView={header.inView} delay={100}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(40px,6vw,72px)", fontWeight:400, color:"#18160f", letterSpacing:"-0.01em", lineHeight:1.05, marginBottom:18 }}>
            Our Lookbook
          </h2>
        </FadeSlide>

        {/* Gold divider */}
        <FadeSlide inView={header.inView} delay={200}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:20 }}>
            <div style={{ width:48, height:"1px", background:`linear-gradient(to right,transparent,${RICH_GOLD})` }}/>
            <div style={{ width:5, height:5, borderRadius:"50%", background:RICH_GOLD, boxShadow:`0 0 8px rgba(179,138,34,0.5)` }}/>
            <div style={{ width:48, height:"1px", background:`linear-gradient(to left,transparent,${RICH_GOLD})` }}/>
          </div>
        </FadeSlide>

        <FadeSlide inView={header.inView} delay={280}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:400, fontStyle:"italic", color:DARK_STONE, maxWidth:480, margin:"0 auto", lineHeight:1.8 }}>
            A curated gallery of our finest collections — from traditional ethnic wear to modern everyday fashion, for every family.
          </p>
        </FadeSlide>

        {/* Stats strip */}
        <FadeSlide inView={header.inView} delay={380}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:40, marginTop:36, flexWrap:"wrap" }}>
            {[
              { n:"200+", label:"Styles" },
              { n:"8",    label:"Categories" },
              { n:"50+",  label:"Collections" },
              { n:"12+",  label:"Years of Craft" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(22px,3vw,30px)", fontWeight:500, color:RICH_GOLD, lineHeight:1 }}>{s.n}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:500, letterSpacing:"0.28em", textTransform:"uppercase", color:DARK_STONE, marginTop:5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeSlide>
      </div>

      {/* ── Thin gold line ── */}
      <div style={{ height:"1px", background:`linear-gradient(to right,transparent 0%,rgba(179,138,34,0.25) 30%,rgba(179,138,34,0.25) 70%,transparent 100%)`, marginBottom:48 }}/>

      {/* ── Auto-scrolling gallery rows ── */}
      <div ref={rows.ref}>
        <FadeSlide inView={rows.inView} delay={0}>
          {/* Row 1 — scrolls left */}
          <div style={{ marginBottom:16 }}>
            <ScrollRow items={row1Images} direction="left" />
          </div>
          {/* Row 2 — scrolls right (opposite direction) */}
          <div>
            <ScrollRow items={row2Images} direction="right" />
          </div>
        </FadeSlide>
      </div>

      {/* ── Thin gold line ── */}
      <div style={{ height:"1px", background:`linear-gradient(to right,transparent 0%,rgba(179,138,34,0.25) 30%,rgba(179,138,34,0.25) 70%,transparent 100%)`, marginTop:48, marginBottom:52 }}/>

      {/* ── Marquee text strip ── */}
      <div style={{ overflow:"hidden", marginBottom:52 }}>
        <div className="lb-marquee-track">
          {[...Array(2)].map((_, k) => (
            <div key={k} style={{ display:"flex" }}>
              {["Women's Wear","Western Wear","Kids Fashion","Men's Wear","Nightwear","Innerwear","Co-ord Sets","Ethnic Wear","Palazzo","Dupatta","Fusion Collection"].map((t, i) => (
                <span key={i} style={{ fontFamily:"'Jost',sans-serif", fontSize:"10px", fontWeight:600, letterSpacing:"0.38em", textTransform:"uppercase", color:RICH_GOLD, padding:"0 40px", whiteSpace:"nowrap", opacity:0.8 }}>
                  {t} <span style={{ opacity:0.4, marginLeft:40 }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div ref={bottom.ref} style={{ textAlign:"center", padding:"0 24px" }}>
        <FadeSlide inView={bottom.inView} delay={0}>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.55em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:14 }}>
            Ready to shop?
          </span>
        </FadeSlide>

        <FadeSlide inView={bottom.inView} delay={100}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,4vw,44px)", fontWeight:400, color:"#18160f", letterSpacing:"-0.01em", marginBottom:14, lineHeight:1.1 }}>
            Every look is{" "}
            <span className="lb-gold-shimmer">available to shop</span>
          </h3>
        </FadeSlide>

        <FadeSlide inView={bottom.inView} delay={200}>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:500, color:DARK_STONE, maxWidth:380, margin:"0 auto 32px", lineHeight:1.8 }}>
            Premium quality, honest pricing, and fast delivery — delivered to your door across India.
          </p>
        </FadeSlide>

        <FadeSlide inView={bottom.inView} delay={300}>
          <button
            style={{
              fontFamily:"'Jost',sans-serif", fontSize:"11px", fontWeight:700, letterSpacing:"0.28em",
              textTransform:"uppercase", padding:"15px 44px",
              background: DARK_STONE, /* Changed to an elegant, high-contrast dark stone */
              color: "#fff", border:"none", borderRadius:6, cursor:"pointer",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              transition:"all 0.3s ease",
            }}
            onMouseEnter={e => { const b=e.currentTarget; b.style.transform="scale(1.04) translateY(-2px)"; b.style.boxShadow="0 14px 38px rgba(0,0,0,0.25)"; b.style.background="#18160f"; }}
            onMouseLeave={e => { const b=e.currentTarget; b.style.transform="scale(1)"; b.style.boxShadow="0 10px 30px rgba(0,0,0,0.15)"; b.style.background=DARK_STONE; }}
            onClick={() => document.getElementById("collections")?.scrollIntoView({ behavior:"smooth" })}
          >
            Explore Collections
          </button>
        </FadeSlide>
      </div>
    </section>
  );
};

export default LookbookSection;