import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Premium Color Palette ─────────────────────────────────────────────────
const RICH_GOLD  = "#b38a22"; 
const DARK_STONE = "#2c2820"; 
const DARK       = "#18160f"; 
const MUTED      = "#5a5248";
const BG_CREAM   = "#faf9f6";

const posts = [
  {
    id: 1,
    category: "Our Story",
    tag: "About YAYA",
    title: "How YAYA Was Born — A Vision for Family Fashion",
    excerpt:
      "YAYA began with a simple belief: every family deserves to look elegant without compromise. Founded in the heart of Tamil Nadu, our journey started with a single collection of handcrafted ethnic wear and has grown into a premium fashion house serving customers across 50+ countries.",
    body: `YAYA was founded with one vision — to make premium-quality fashion accessible to every family. We believe that clothing is more than fabric; it is identity, culture, and confidence stitched together.

Our founders, deeply rooted in the rich textile traditions of Tamil Nadu, set out to bridge the gap between traditional craftsmanship and modern aesthetics. Every YAYA garment is a celebration of that heritage — intricate embroidery meets contemporary silhouette, premium fabrics meet affordable pricing.

Today, YAYA offers collections across Women's Wear, Men's Wear, Kids' Fashion, Western Wear, and Nightwear — each piece thoughtfully designed for the modern family.`,
    date: "March 15, 2026",
    readTime: "4 min read",
    image: "https://i.pinimg.com/1200x/b5/64/71/b5647131fd0a6d6d2a47062bd3c6e116.jpg",
    featured: true,
  },
  {
    id: 2,
    category: "Collections",
    tag: "Women's Wear",
    title: "The Art of Traditional Ethnic Wear — Our Heritage Collection",
    excerpt:
      "From handwoven sarees to embroidered lehengas, our Traditional Collection is a tribute to India's rich textile heritage. Each piece tells a story of craftsmanship passed down through generations.",
    body: `India's textile heritage is one of the world's richest — and at YAYA, we are proud custodians of that legacy. Our Heritage Collection draws inspiration from centuries-old weaving traditions, bringing them forward with modern design sensibilities.

Each saree in our collection is sourced from master weavers across South India. The embroidery on our lehengas is done by hand, often taking several days to complete a single garment. We believe in fair wages for artisans and sustainable sourcing of all our raw materials.

When you wear a YAYA ethnic piece, you are not just wearing clothing — you are wearing a story.`,
    date: "February 28, 2026",
    readTime: "5 min read",
    image: "https://i.pinimg.com/736x/d1/58/8f/d1588ff61985214474195694c913ec8e.jpg",
    featured: false,
  },
  {
    id: 3,
    category: "Style Guide",
    tag: "Fashion Tips",
    title: "How to Style Co-ord Sets for Every Occasion",
    excerpt:
      "Co-ord sets have become the defining fashion statement of the decade. Here is how to style YAYA co-ord sets from a casual brunch to a festive celebration — all with one versatile outfit.",
    body: `The co-ord set is the modern woman's best friend. Effortlessly stylish, endlessly versatile, and undeniably chic — it is the outfit that works for virtually every occasion when styled right.

At YAYA, our co-ord sets are designed with this versatility in mind. The fabrics breathe well in India's climate, the cuts are flattering across body types, and the colours are curated seasonally.

For a casual daytime look, pair your co-ord set with white sneakers and minimal jewellery. For an evening event, switch to block heels and statement earrings. For a festive occasion, add a dupatta in a complementary colour and traditional footwear.

The secret to a great co-ord look is confidence — and our quality ensures you feel it.`,
    date: "February 10, 2026",
    readTime: "3 min read",
    image: "https://i.pinimg.com/736x/7f/93/27/7f9327dbda0de810adacff0cdcd941e1.jpg",
    featured: false,
  },
  {
    id: 4,
    category: "Kids Fashion",
    tag: "Kids Wear",
    title: "Dressing Your Kids Right — Comfort Meets Style at YAYA",
    excerpt:
      "Children deserve clothing that moves with them, breathes with them, and lets them be exactly who they are. YAYA Kids' Wear is designed with the active, curious, joyful child in mind.",
    body: `At YAYA, we believe children's fashion should never compromise on comfort. Our Kids' Wear collection is made from soft, breathable fabrics — primarily cotton and cotton blends — that are gentle on young skin.

We offer separate collections for boys and girls, each with age-appropriate styles that still look fashionable. From casual t-shirts and joggers to ethnic sets perfect for festivals, our kids' range covers every occasion.

Our sizing runs from 2 years to 14 years, with generous cuts that accommodate growth spurts. Parents tell us their children actually want to wear YAYA — because the clothes are not just good-looking, they are genuinely comfortable.

That is the YAYA kids promise: style that moves as fast as they do.`,
    date: "January 22, 2026",
    readTime: "4 min read",
    image: "https://i.pinimg.com/736x/2c/44/20/2c44204b64cc218962d7747f18d4e17d.jpg",
    featured: false,
  },
  {
    id: 5,
    category: "Sustainability",
    tag: "Our Values",
    title: "YAYA's Commitment to Sustainable Fashion",
    excerpt:
      "Fashion should not cost the earth — literally. YAYA is committed to ethical sourcing, fair wages for artisans, and sustainable production practices that protect our planet for future generations.",
    body: `Sustainability is not a trend for us — it is a core value baked into everything we do at YAYA.

We source our fabrics from certified suppliers who follow ethical labour practices. We pay our artisans fair wages and provide them with safe working conditions. We use natural dyes wherever possible and are actively working to reduce our water consumption in production.

Our packaging is 100% recyclable. We have eliminated single-use plastics from all our shipments. And with every order above ₹5,000, we plant a tree through our partnership with a reforestation initiative in Tamil Nadu.

We know sustainable fashion is a journey, not a destination. We are committed to being honest about where we are today and transparent about where we are headed.`,
    date: "January 5, 2026",
    readTime: "6 min read",
    image: "https://i.pinimg.com/1200x/72/20/02/722002e741dad09aa5cf5b978d012670.jpg",
    featured: false,
  },
  {
    id: 6,
    category: "Men's Fashion",
    tag: "Men's Wear",
    title: "The Modern Man's Wardrobe — YAYA Men's Collection 2026",
    excerpt:
      "Gone are the days when men's fashion meant choosing between comfort and style. YAYA Men's 2026 Collection offers both — sharp tailored shirts, premium trousers, casual wear, and ethnic sets.",
    body: `The modern man deserves clothing that matches his complexity — sharp for the boardroom, relaxed for the weekend, traditional for festivals, and casual for everything in between.

YAYA Men's 2026 Collection is built around this philosophy. Our shirts come in formal, semi-formal, and casual cuts — all with premium fabric that stays crisp through a long day. Our trousers are tailored for the Indian body type, with generous room and a clean silhouette.

For the festive season, our ethnic sets — kurta-pyjama and sherwani collections — are crafted with the same attention to detail as our women's heritage range.

Our bestsellers this season include the linen palazzo-cut trousers, the printed casual shirts, and the cotton-silk festive kurtas. All available in sizes S to 5XL.`,
    date: "December 18, 2025",
    readTime: "4 min read",
    image: "https://i.pinimg.com/736x/14/ba/63/14ba636acbb50049e8ea7af30e88580b.jpg",
    featured: false,
  },
];

const categories = ["All", "Our Story", "Collections", "Style Guide", "Kids Fashion", "Sustainability", "Men's Fashion"];

const BlogPage = () => {
  const [selected,  setSelected]  = useState("All");
  const [expanded,  setExpanded]  = useState<number | null>(null);
  const [visible,   setVisible]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setVisible(true), 60);
  }, []);

  const filtered = selected === "All" ? posts : posts.filter(p => p.category === selected);
  const featured = posts.find(p => p.featured);
  const rest     = filtered.filter(p => !p.featured || selected !== "All");

  return (
    <div style={{ minHeight:"100vh", background:BG_CREAM, fontFamily:"'Jost',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

      {/* ── Hero header ── */}
      <div style={{
        paddingTop: 120,
        paddingBottom: 60,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.55em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:14 }}>
          YAYA Stories
        </span>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(38px,5vw,64px)", fontWeight:500, color:DARK, letterSpacing:"-0.01em", lineHeight:1.1, marginBottom:18 }}>
          Fashion, Heritage &amp; Craft
        </h1>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:20 }}>
          <div style={{ width:40, height:"1px", background:`linear-gradient(to right,transparent,${RICH_GOLD})` }}/>
          <div style={{ width:5, height:5, borderRadius:"50%", background:RICH_GOLD }}/>
          <div style={{ width:40, height:"1px", background:`linear-gradient(to left,transparent,${RICH_GOLD})` }}/>
        </div>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:400, color:MUTED, maxWidth:520, margin:"0 auto", lineHeight:1.8 }}>
          Stories from our world — the people behind the stitches, the collections that define us, and the values that drive us.
        </p>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px 80px" }}>

        {/* ── Category filter ── */}
        <div style={{
          display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center",
          marginBottom:52,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.15s",
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              style={{
                fontFamily:"'Jost',sans-serif",
                fontSize:"9.5px",
                fontWeight:600,
                letterSpacing:"0.24em",
                textTransform:"uppercase",
                padding:"8px 20px",
                borderRadius:"30px",
                border: selected===cat ? "none" : `1.5px solid rgba(179,138,34,0.3)`,
                background: selected===cat ? RICH_GOLD : "transparent",
                color: selected===cat ? "#fff" : MUTED,
                cursor:"pointer",
                transition:"all 0.25s ease",
                boxShadow: selected===cat ? `0 6px 20px rgba(179,138,34,0.3)` : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Featured post (only on "All") ── */}
        {selected === "All" && featured && (
          <div
            className="blog-card" 
            style={{
              display:"flex",
              flexDirection: "row",
              alignItems: "stretch",
              minHeight: "360px",
              background:"#fff",
              borderRadius:18,
              overflow:"hidden",
              boxShadow:"0 12px 48px rgba(0,0,0,0.08)",
              marginBottom:52,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition:"opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              cursor:"pointer",
            }}
            onClick={() => setExpanded(expanded === featured.id ? null : featured.id)}
          >
            {/* Image Wrapper */}
            <div className="blog-img" style={{ flex: 1, position:"relative", overflow:"hidden" }}>
              <img
                src={featured.image}
                alt={featured.title}
                /* ✨ The absolute fix! This forces the image to respect the text box height! ✨ */
                style={{ position: "absolute", inset: 0, width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{ position:"absolute", top:20, left:20 }}>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"8px", fontWeight:700, letterSpacing:"0.3em", textTransform:"uppercase", color:"#fff", background:`rgba(179,138,34,0.9)`, padding:"5px 14px", borderRadius:"20px" }}>
                  Featured
                </span>
              </div>
            </div>

            {/* Content Wrapper */}
            <div className="blog-content" style={{ flex: 1, padding:"60px 48px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.38em", textTransform:"uppercase", color:RICH_GOLD, marginBottom:14 }}>
                {featured.tag}
              </div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,3vw,34px)", fontWeight:600, color:DARK, lineHeight:1.25, marginBottom:16 }}>
                {featured.title}
              </h2>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:400, color:MUTED, lineHeight:1.85, marginBottom:24 }}>
                {featured.excerpt}
              </p>

              {/* Expanded body */}
              {expanded === featured.id && (
                <div style={{ marginBottom:24, borderTop:`1px solid rgba(179,138,34,0.15)`, paddingTop:20 }}>
                  {featured.body.split("\n\n").map((para, i) => (
                    <p key={i} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontStyle:"italic", fontWeight:400, color:DARK_STONE, lineHeight:1.6, marginBottom:16 }}>
                      {para}
                    </p>
                  ))}
                </div>
              )}

              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto" }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"10px", fontWeight:500, color:MUTED, letterSpacing:"0.06em" }}>
                  {featured.date} · {featured.readTime}
                </div>
                <button style={{ fontFamily:"'Jost',sans-serif", fontSize:"9.5px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:RICH_GOLD, background:"none", border:"none", cursor:"pointer" }}>
                  {expanded === featured.id ? "Show Less ↑" : "Read More →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Alternating Editorial Post rows ── */}
        <div style={{
          display:"flex",
          flexDirection:"column",
          gap: 48, 
        }}>
          {rest.map((post, idx) => (
            <article
              className="blog-card"
              key={post.id}
              style={{
                display: "flex",
                flexDirection: idx % 2 === 0 ? "row-reverse" : "row",
                alignItems: "stretch",
                minHeight: "320px", 
                background:"#fff",
                borderRadius:14,
                overflow:"hidden",
                boxShadow:"0 4px 20px rgba(0,0,0,0.05)",
                cursor:"pointer",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${idx * 0.08 + 0.3}s, transform 0.5s ease ${idx * 0.08 + 0.3}s, box-shadow 0.3s ease`,
              }}
              onClick={() => setExpanded(expanded === post.id ? null : post.id)}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)"; }}
            >
              {/* Image Wrapper */}
              <div className="blog-img" style={{ flex: 1, position:"relative", overflow:"hidden" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  /* ✨ Absolute position forces it to fit the text box perfectly! ✨ */
                  style={{ position: "absolute", inset: 0, width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s ease" }}
                />
                <div style={{ position:"absolute", top:14, left:14 }}>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"8px", fontWeight:700, letterSpacing:"0.28em", textTransform:"uppercase", color:RICH_GOLD, background:"rgba(255,255,255,0.95)", padding:"4px 12px", borderRadius:"20px" }}>
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Content Wrapper */}
              <div className="blog-content" style={{ flex: 1, padding:"40px 48px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(22px,2vw,28px)", fontWeight:600, color:DARK, lineHeight:1.2, marginBottom:14 }}>
                  {post.title}
                </h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:400, color:MUTED, lineHeight:1.7, marginBottom:20 }}>
                  {post.excerpt}
                </p>

                {/* Expanded body */}
                {expanded === post.id && (
                  <div style={{ borderTop:`1px solid rgba(179,138,34,0.15)`, paddingTop:20, marginBottom:20 }}>
                    {post.body.split("\n\n").map((para, i) => (
                      <p key={i} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontStyle:"italic", color:DARK_STONE, lineHeight:1.6, marginBottom:14 }}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto" }}>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"10px", color:MUTED, letterSpacing:"0.04em" }}>
                    {post.date} · {post.readTime}
                  </span>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9.5px", fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:RICH_GOLD }}>
                    {expanded === post.id ? "Less ↑" : "Read →"}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ textAlign:"center", marginTop:72, paddingTop:52, borderTop:`1px solid rgba(179,138,34,0.15)` }}>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", letterSpacing:"0.5em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:12 }}>
            Ready to shop?
          </span>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3.5vw,36px)", fontWeight:500, color:DARK, marginBottom:16, lineHeight:1.2 }}>
            Explore Our Collections
          </h3>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:400, color:MUTED, maxWidth:420, margin:"0 auto 28px", lineHeight:1.8 }}>
            Premium ethnic wear, western fashion, and kids' clothing — all in one place, delivered to your door.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{ 
              fontFamily:"'Jost',sans-serif", fontSize:"11px", fontWeight:700, letterSpacing:"0.24em", 
              textTransform:"uppercase", padding:"15px 40px", border:"none", borderRadius:"6px", 
              background: DARK, 
              color:"#fff", cursor:"pointer", 
              boxShadow:"0 10px 28px rgba(0,0,0,0.15)", 
              transition:"all 0.3s ease" 
            }}
            onMouseEnter={e => { const b=e.currentTarget; b.style.transform="scale(1.04) translateY(-2px)"; b.style.boxShadow="0 14px 36px rgba(0,0,0,0.25)"; }}
            onMouseLeave={e => { const b=e.currentTarget; b.style.transform="scale(1)"; b.style.boxShadow="0 10px 28px rgba(0,0,0,0.15)"; }}
          >
            Shop YAYA Collections
          </button>
        </div>
      </div>

      {/* Mobile responsive: Forces the absolute images to have space on phones! */}
      <style>{`
        @media (max-width: 767px) {
          .blog-card { flex-direction: column !important; }
          .blog-img { height: 280px !important; min-height: 280px !important; flex: none !important; }
          .blog-content { padding: 30px 24px !important; }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;