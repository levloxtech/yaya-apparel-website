import { useEffect, useRef, useState } from "react";

// ── Scroll hook ───────────────────────────────────────────────────────────
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

// ── Fade slide ────────────────────────────────────────────────────────────
const FadeSlide = ({ children, inView, delay = 0, style = {} }:
  { children: React.ReactNode; inView: boolean; delay?: number; style?: React.CSSProperties }) => (
  <div style={{
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.62s ease ${delay}ms, transform 0.62s ease ${delay}ms`,
    ...style,
  }}>
    {children}
  </div>
);

// ── Gold divider ──────────────────────────────────────────────────────────
const GoldDivider = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
    <div style={{ width:44, height:1, background:"linear-gradient(to right,transparent,#b38a22)" }}/>
    <div style={{ width:5, height:5, borderRadius:"50%", background:"#b38a22", boxShadow:"0 0 7px rgba(179,138,34,0.5)" }}/>
    <div style={{ width:44, height:1, background:"linear-gradient(to left,transparent,#b38a22)" }}/>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────
const AboutSection = () => {
  const hero   = useInView(0.08);
  const intro  = useInView(0.10);
  const cats   = useInView(0.10);
  const brands = useInView(0.10);
  const vals   = useInView(0.10);
  const team   = useInView(0.10);

  // Updated Premium Color Palette
  const RICH_GOLD = "#b38a22"; // Deeper, warmer gold that POPS against beige
  const CHERRY    = "#4a0b1b"; // Used strictly as a minimal accent!
  const DARK      = "#18160f";
  const MID       = "#2c2820"; 
  const MUTED     = "#5a5248";
  const BG        = "#faf9f6";
  const BG2       = "#f2efe8";

  // Fashion categories
  // Fashion categories (Replaced emojis with sleek numbers!)
  const categories = [
    { num:"01.", label:"Women's Wear",       desc:"Ethnic, western & fusion wear for every occasion" },
    { num:"02.", label:"Men's Wear",          desc:"Shirts, trousers, jeans, ethnic sets & more"      },
    { num:"03.", label:"Kids — Girls",        desc:"Kurtas, dresses, palazzo, sets & everyday styles" },
    { num:"04.", label:"Kids — Boys",         desc:"Shirts, jeans, joggers, ethnic sets & casuals"    },
    { num:"05.", label:"Nightwear",           desc:"Nighty & night suits for the whole family"        },
    { num:"06.", label:"Innerwear & Basics",  desc:"Premium cotton innerwear for men & women"         },
    { num:"07.", label:"Traditional & Ethnic",desc:"Sarees, lehengas, chudithar & zari collections"  },
    { num:"08.", label:"Western Wear",        desc:"Tops, tunics, dresses & shirts for modern living" },
  ];

  // Value cards
  const values = [
    {
      num:"01", title:"Premium Quality",
      body:"Every garment at YAYA Apparel is carefully selected for fabric quality, finish, and durability. We partner only with trusted manufacturers and premium brands.",
      img:"https://i.pinimg.com/1200x/39/db/c1/39dbc14f1f06c0bb5c64f7ad26edea66.jpg",
    },
    {
      num:"02", title:"All Brands Under One Roof",
      body:"YAYA Apparel is your one-stop fashion mall. Find top clothing brands across every category — ethnic, western, kids, and nightwear — all in a single place.",
      img:"https://i.pinimg.com/736x/42/54/31/4254314810c899dad37d2583ee8a3d2d.jpg",
    },
    {
      num:"03", title:"For Every Family",
      body:"From toddlers to grandparents, YAYA Apparel has something for everyone. Shop matching family sets, festive collections, and everyday essentials together.",
      img:"https://i.pinimg.com/736x/75/a8/bb/75a8bb9c8aba13bb3bcc14b8aa0ad31b.jpg",
    },
  ];

  // Team cards - Quiet Luxury Copy
  const teamCards = [
    {
      role:"Our Mission",
      name:"Rooted in Trichy",
      desc:"Dedicated to crafting garments where uncompromising quality meets effortless comfort. We design with purpose, offering ethically conscious fashion that empowers you.",
    },
    {
      role:"Where We Are",
      name:"Trichy, Tamil Nadu",
      desc:"Rooted in the heart of Tamil Nadu, YAYA Apparel brings the finest fabrics and brands to families across Trichy and beyond.",
    },
    {
      role:"Our Vision",
      name:"Accessible Luxury",
      desc:"To inspire unwavering confidence through beautifully crafted apparel, cementing our legacy as Trichy’s most trusted and beloved fashion destination.",
    },
  ];

  return (
    <section
      id="about"
      style={{ background:BG, color:DARK, fontFamily:"'Jost',sans-serif", overflow:"hidden" }}
      itemScope
      itemType="https://schema.org/Store"
    >
      {/* SEO meta */}
      <meta itemProp="name" content="YAYA Apparel — Premium Fashion Mall"/>
      <meta itemProp="description" content="YAYA Apparel is a premium fashion mall in Trichy offering clothing for men, women, kids and the whole family. Shop ethnic wear, western wear, nightwear, innerwear and top brands all under one roof."/>
      <meta itemProp="address" content="Trichy, Tamil Nadu, India"/>
      <meta itemProp="priceRange" content="₹₹"/>

      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

      <style>{`
        @keyframes ab-mq {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ab-marquee { animation: ab-mq 24s linear infinite; display:flex; width:max-content; }
        .ab-marquee:hover { animation-play-state: paused; }

        /* Category pill card */
       .ab-cat-card {
          background: #fff;
          border: 1px solid rgba(179,138,34,0.15);
          border-radius: 14px;
          padding: 20px 20px 18px;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          cursor: default;
          /* ✨ THE FIX FOR UNEVEN CARDS ✨ */
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .ab-cat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 36px rgba(179,138,34,0.12), 0 3px 10px rgba(0,0,0,0.05);
          border-color: ${RICH_GOLD};
        }

        /* Value card */
        .ab-val-card {
          background: #fff;
          border: 1px solid rgba(179,138,34,0.15);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .ab-val-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 44px rgba(179,138,34,0.12), 0 4px 14px rgba(0,0,0,0.05);
          border-color: ${RICH_GOLD};
        }
        .ab-val-img { transition: transform 0.6s cubic-bezier(.22,1,.36,1); }
        .ab-val-card:hover .ab-val-img { transform: scale(1.055); }

        /* Team card */
        .ab-team-card {
          border-left: 2px solid rgba(179,138,34,0.3);
          padding-left: 20px;
          transition: border-color 0.28s ease;
        }
        .ab-team-card:hover { border-color: ${RICH_GOLD}; }

        /* Mobile */
        @media (max-width: 767px) {
          .ab-two   { grid-template-columns: 1fr !important; gap: 28px !important; }
          .ab-three { grid-template-columns: 1fr !important; }
          .ab-four  { grid-template-columns: repeat(2,1fr) !important; }
          .ab-px    { padding-left: 20px !important; padding-right: 20px !important; }
          .ab-hero-h1 { font-size: clamp(38px,10vw,60px) !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <div
        ref={hero.ref}
        className="ab-px"
        style={{ padding:"72px 48px 56px", textAlign:"center", position:"relative", overflow:"hidden" }}
      >
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", pointerEvents:"none" }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(80px,18vw,220px)", fontWeight:300, color:"rgba(179,138,34,0.04)", letterSpacing:"-0.02em", userSelect:"none", whiteSpace:"nowrap" }}>
            YAYA
          </span>
        </div>

        <div style={{ position:"relative", zIndex:1, maxWidth:680, margin:"0 auto" }}>
          <FadeSlide inView={hero.inView} delay={0}>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.55em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:16 }}>
              About YAYA Apparel
            </span>
          </FadeSlide>

          <FadeSlide inView={hero.inView} delay={80}>
            <h1
              className="ab-hero-h1"
              style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(38px,6.5vw,70px)", fontWeight:400, color:DARK, letterSpacing:"-0.01em", lineHeight:1.1, marginBottom:18 }}
              itemProp="name"
            >
              Trichy, Tamil Nadu's {" "}
              <span style={{ fontWeight:600 ,color:RICH_GOLD}}>
                Premier Fashion Mall
              </span>
            </h1>
          </FadeSlide>

          <FadeSlide inView={hero.inView} delay={200}>
            <p
              style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:500, lineHeight:1.88, color:MID, marginBottom:26 }}
              itemProp="description"
            >
              YAYA Apparel is a one-stop fashion destination for the whole family — offering premium clothing brands across women's wear, men's wear, kids' fashion, ethnic wear, western wear, nightwear, and innerwear. Everything your family needs, all under one roof.
            </p>
          </FadeSlide>

          <FadeSlide inView={hero.inView} delay={300}>
            <GoldDivider/>
          </FadeSlide>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          2. INTRO — Who We Are 
      ══════════════════════════════════════════════ */}
      <div
        ref={intro.ref}
        className="ab-px"
        style={{ background:BG2, padding:"52px 48px" }}
      >
        <div style={{ position:"absolute", pointerEvents:"none" }}/>
        <div
          className="ab-two"
          style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}
        >
          <FadeSlide inView={intro.inView} delay={0}>
            <div>
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"11px", fontWeight:700, letterSpacing:"0.50em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:14 }}>
                Who We Are
              </span>
              <h2
                style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3.2vw,38px)", fontWeight:500, color:DARK, letterSpacing:"-0.01em", lineHeight:1.2, marginBottom:16 }}
              >
                Your Family's Complete Fashion Destination
              </h2>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:500, lineHeight:1.9, color:MID, marginBottom:16 }}>
                At <strong style={{ fontWeight:600, color:DARK }}>YAYA Apparel</strong>, we believe every family deserves access to premium-quality clothing without compromise. As a full-service fashion mall based in <strong style={{ fontWeight:600, color:DARK }}>Trichy, Tamil Nadu</strong>, we curate the finest brands and collections across every fashion category.
              </p>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:500, lineHeight:1.9, color:MID, marginBottom:20 }}>
                From handcrafted <strong style={{ fontWeight:600, color:"#2c2820" }}>traditional ethnic wear</strong> and embroidered sarees to modern western dresses, co-ord sets, kids' clothing, nightwear, and innerwear — YAYA Apparel is where families shop for every occasion, every season, and every stage of life.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  "200+ premium clothing styles across all categories",
                  "Top brands for men, women, kids & the whole family",
                  "Traditional ethnic wear & modern western fashion",
                  "Fast delivery across Tamil Nadu and India",
                ].map((point, i) => (
                  <FadeSlide key={i} inView={intro.inView} delay={200 + i * 70}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:11 }}>
                      <div style={{ width:6, height:6, borderRadius:"50%", background:RICH_GOLD, flexShrink:0, marginTop:5 }}/>
                      <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"13px", fontWeight:500, color:MID, lineHeight:1.6 }}>{point}</span>
                    </div>
                  </FadeSlide>
                ))}
              </div>
            </div>
          </FadeSlide>

          <FadeSlide inView={intro.inView} delay={160}>
            <div style={{ borderRadius:18, overflow:"hidden", position:"relative", aspectRatio:"4/5", boxShadow:"0 20px 56px rgba(0,0,0,0.10)" }}>
              <img
                src="https://i.pinimg.com/1200x/e4/bb/9b/e4bb9b25dd14dcbd93f5771a3a97c7b9.jpg"
                alt="YAYA Apparel premium fashion for the whole family"
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                loading="lazy"
              />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(18,16,10,0.42) 0%,transparent 55%)" }}/>
              <div style={{ position:"absolute", bottom:20, left:20 }}>
                {/* 🍒 The subtle pop of Cherry! 🍒 */}
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"8.5px", fontWeight:700, letterSpacing:"0.32em", textTransform:"uppercase", color:"#fff", background:RICH_GOLD, padding:"6px 16px", borderRadius:"20px" }}>
                  Premium Collections
                </span>
              </div>
            </div>
          </FadeSlide>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          3. MARQUEE
      ══════════════════════════════════════════════ */}
      <div style={{ background:RICH_GOLD, padding:"13px 0", overflow:"hidden" }}>
        <div className="ab-marquee">
          {[...Array(2)].map((_,k) => (
            <div key={k} style={{ display:"flex" }}>
              {["Women's Wear","Men's Fashion","Kids Clothing","Ethnic Wear","Western Wear","Nightwear","Innerwear","Top Brands","Family Fashion","Trichy"].map((t,i) => (
                <span key={i} style={{ fontFamily:"'Jost',sans-serif", fontSize:"10px", fontWeight:700, letterSpacing:"0.36em", textTransform:"uppercase", color:"#fff", padding:"0 38px", whiteSpace:"nowrap" }}>
                  {t} <span style={{ opacity:0.4, marginLeft:38 }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          4. CATEGORIES GRID 
      ══════════════════════════════════════════════ */}
      <div
        ref={cats.ref}
        className="ab-px"
        style={{ padding:"64px 48px 56px", maxWidth:1240, margin:"0 auto" }}
      >
        <FadeSlide inView={cats.inView} delay={0} style={{ textAlign:"center", marginBottom:36 }}>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.52em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:12 }}>
            Shop by Category
          </span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3.5vw,40px)", fontWeight:600, color:DARK, letterSpacing:"-0.01em", marginBottom:10 }}>
            Fashion for Everyone
          </h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:500, color:MID, maxWidth:520, margin:"0 auto" }}>
            From traditional ethnic sarees to modern western dresses — YAYA Apparel covers every style and every age group.
          </p>
        </FadeSlide>

        <div
          className="ab-four"
          style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}
        >
          {categories.map((cat, i) => (
            <FadeSlide key={i} inView={cats.inView} delay={i * 55}>
              <div className="ab-cat-card">
               {/* The new editorial number instead of the emoji */}
<div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontStyle:"italic", color:RICH_GOLD, marginBottom:8 }}>
  {cat.num}
</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:600, color:DARK, marginBottom:6, lineHeight:1.2 }}>
                  {cat.label}
                </h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:500, color:MUTED, lineHeight:1.7 }}>
                  {cat.desc}
                </p>
              </div>
            </FadeSlide>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          5. VALUE CARDS
      ══════════════════════════════════════════════ */}
      <div
        ref={vals.ref}
        className="ab-px"
        style={{ background:BG2, padding:"56px 48px 52px" }}
      >
        <div style={{ maxWidth:1240, margin:"0 auto" }}>
          <FadeSlide inView={vals.inView} delay={0} style={{ textAlign:"center", marginBottom:36 }}>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.52em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:12 }}>
              Why Choose YAYA Apparel
            </span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3.5vw,40px)", fontWeight:600, color:DARK, letterSpacing:"-0.01em" }}>
              What makes us different
            </h2>
          </FadeSlide>

          <div className="ab-three" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
            {values.map((v, i) => (
              <FadeSlide key={i} inView={vals.inView} delay={i * 90}>
                <div className="ab-val-card">
                  <div style={{ height:190, overflow:"hidden" }}>
                    <img
                      src={v.img}
                      alt={v.title}
                      className="ab-val-img"
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding:"20px 22px 24px" }}>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"10px", fontWeight:700, letterSpacing:"0.4em", color:RICH_GOLD, marginBottom:8 }}>
                      {v.num}
                    </div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:DARK, marginBottom:8, lineHeight:1.2 }}>
                      {v.title}
                    </h3>
                    <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:500, lineHeight:1.82, color:MID }}>
                      {v.body}
                    </p>
                  </div>
                </div>
              </FadeSlide>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          6. TEAM / ABOUT CARDS
      ══════════════════════════════════════════════ */}
      <div
        ref={team.ref}
        className="ab-px"
        style={{ padding:"56px 48px 64px", maxWidth:1200, margin:"0 auto" }}
      >
        <FadeSlide inView={team.inView} delay={0} style={{ textAlign:"center", marginBottom:36 }}>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.52em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:12 }}>
            Our Store
          </span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3.5vw,40px)", fontWeight:600, color:DARK, letterSpacing:"-0.01em" }}>
            Built for every Indian family
          </h2>
        </FadeSlide>

        <div className="ab-three" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
          {teamCards.map((t, i) => (
            <FadeSlide key={i} inView={team.inView} delay={i * 90}>
              <div className="ab-team-card">
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"8.5px", fontWeight:700, letterSpacing:"0.4em", textTransform:"uppercase", color:RICH_GOLD, marginBottom:8 }}>
                  {t.role}
                </div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:600, color:DARK, marginBottom:10, lineHeight:1.25 }}>
                  {t.name}
                </h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:500, lineHeight:1.85, color:MID }}>
                  {t.desc}
                </p>
              </div>
            </FadeSlide>
          ))}
        </div>

        {/* SEO hidden content — rich keyword text for search engines */}
        <div style={{ display:"none" }} aria-hidden="true">
          <p>YAYA Apparel is the best clothing store in Trichy Tamil Nadu offering premium fashion for men women and kids. Shop sarees lehengas ethnic wear kurta sets chudithar palazzo cigarette pants western dresses tops shirts jeans joggers kids clothing nightwear innerwear and more. YAYA Apparel stocks top clothing brands and offers family fashion at affordable prices. Online shopping delivery available across India. Women's fashion men's fashion kids fashion ethnic Indian wear western wear all available at YAYA Apparel Trichy.</p>
        </div>
      </div>

      {/* ── JSON-LD structured data for SEO ── */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ClothingStore",
        "name": "YAYA Apparel",
        "description": "Premium fashion mall in Trichy offering clothing for men, women, kids and the whole family. Shop ethnic wear, western wear, nightwear, innerwear and top brands.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Trichy",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "url": "https://yayaapparel.com",
        "priceRange": "₹₹",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "YAYA Apparel Collections",
          "itemListElement": [
            "Women's Wear","Men's Wear","Kids Girls Wear","Kids Boys Wear",
            "Ethnic Wear","Western Wear","Nightwear","Innerwear"
          ].map((cat, i) => ({
            "@type": "Offer",
            "position": i + 1,
            "itemOffered": { "@type": "Product", "name": cat }
          }))
        }
      })}</script>
    </section>
  );
};

export default AboutSection;