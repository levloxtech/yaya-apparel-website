import { useState, useCallback, useEffect } from "react";
import familyTraditional from "@/assets/famil-traditional.png";
import familyModern from "@/assets/family-modern.png";
import familyCasual from "@/assets/family-casual.jpg";

type Category = "traditional" | "modern" | "casual";

const categories: { key: Category; label: string; dressType: string }[] = [
  { key: "traditional", label: "Heritage Elegance", dressType: "Traditional Dress" },
  { key: "modern", label: "Contemporary Edge", dressType: "Modern Dress" },
  { key: "casual", label: "Effortless Style", dressType: "Fusion Dress" },
];

const images: Record<Category, string> = {
  traditional: familyTraditional,
  modern: familyModern,
  casual: familyCasual,
};

const businessDescriptions: Record<Category, string> = {
  traditional: "Handcrafted luxury pieces celebrating timeless heritage with intricate embroidery and premium fabrics.",
  modern: "Contemporary silhouettes designed for the visionary. Sharp lines meet innovative design.",
  casual: "Premium everyday elegance combining comfort with sophisticated style for modern families.",
};

const headings: Record<Category, [string, string]> = {
  traditional: ["Rose", "Heritage"],
  modern: ["Silk", "Studio"],
  casual: ["Linen", "Stories"],
};

// Bright floating product images
const floatingImages = [
  { id: "f1", src: "https://i.pinimg.com/736x/14/58/93/14589328e5df052261012b661f2afadb.jpg", style: { width: 140, height: 180, top: "5%", left: "2%" }, rot: "-6deg" },
  { id: "f2", src: "https://i.pinimg.com/1200x/53/03/93/530393321789ba3f41d429d30e8c03e6.jpg", style: { width: 130, height: 170, top: "12%", left: "18%" }, rot: "4deg" },
  { id: "f3", src: "https://i.pinimg.com/1200x/9b/6a/75/9b6a75c9b010079179e9f09ab8e147f8.jpg", style: { width: 135, height: 175, top: "10%", right: "18%" }, rot: "-5deg" },
  { id: "f4", src: "https://i.pinimg.com/736x/9c/7d/1c/9c7d1c00243e9ecb1e9aa2fc0aeed5c5.jpg", style: { width: 125, height: 165, top: "8%", right: "2%" }, rot: "5deg" },
  { id: "f5", src: "https://i.pinimg.com/1200x/c2/d7/e1/c2d7e19ef943ed64edf09468c372a4b2.jpg", style: { width: 138, height: 178, bottom: "12%", left: "1%" }, rot: "3deg" },
  { id: "f6", src: "https://i.pinimg.com/736x/51/a5/47/51a547607992e94ddf756fb940e9a165.jpg", style: { width: 132, height: 172, bottom: "10%", right: "1%" }, rot: "-4deg" },
  { id: "f7", src: "https://i.pinimg.com/1200x/dd/3d/42/dd3d428eab538e751c2580de55c6897e.jpg", style: { width: 110, height: 150, bottom: "40%", left: "8%" }, rot: "-3deg" },
  { id: "f8", src: "https://i.pinimg.com/736x/4f/f7/c3/4ff7c390d75bc5d4ab33ac70bf3be5b6.jpg", style: { width: 118, height: 158, bottom: "42%", right: "8%" }, rot: "4deg" },
];

// Letter reveal animation
const LetterReveal = ({
  text,
  className,
  delay = 0,
  triggerKey,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  triggerKey: string;
  style?: React.CSSProperties;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60 + delay);
    return () => clearTimeout(t);
  }, [triggerKey, delay]);

  return (
    <span className={className} style={{ display: "block", ...style }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) skewY(0deg)" : "translateY(36px) skewY(3deg)",
            transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${i * 40 + delay}ms, transform 0.6s cubic-bezier(.22,1,.36,1) ${i * 40 + delay}ms`,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
};

// Fade up animation
const FadeUp = ({
  children,
  delay = 0,
  triggerKey,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  triggerKey: string;
  style?: React.CSSProperties;
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 80 + delay);
    return () => clearTimeout(t);
  }, [triggerKey, delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const HeroSection = () => {
  const [active, setActive] = useState<Category>("traditional");
  const [transitioning, setTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-scroll categories
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const idx = categories.findIndex((c) => c.key === prev);
        return categories[(idx + 1) % categories.length].key;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const accentColors: Record<Category, string> = {
    traditional: "#c8a96e",
    modern: "#8b7ec8",
    casual: "#6ea8c8",
  };

  const accent = accentColors[active];

  const accentRgba = (alpha: number) => {
    const map: Record<Category, string> = {
      traditional: `rgba(200,169,110,${alpha})`,
      modern: `rgba(139,126,200,${alpha})`,
      casual: `rgba(110,168,200,${alpha})`,
    };
    return map[active];
  };

  const [headLeft, headRight] = headings[active];
  const dressLabel = categories.find((c) => c.key === active)?.dressType;

  const switchCategory = useCallback(
    (cat: Category) => {
      if (cat === active || transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setActive(cat);
        setTimeout(() => setTransitioning(false), 60);
      }, 280);
    },
    [active, transitioning]
  );

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
        background: "#faf9f6",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes floatA {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.02); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0) scale(0.98); }
          50% { transform: translateY(-18px) scale(1.03); }
        }
        
        @keyframes slideInText {
          0% { transform: translateX(-100%) skewX(10deg); opacity: 0; }
          100% { transform: translateX(0) skewX(0deg); opacity: 1; }
        }
        
        @keyframes floatBg {
          0%, 100% { transform: translateY(0) rotate(-2deg) scale(1); }
          25% { transform: translateY(-30px) rotate(-1deg) scale(1.02); }
          50% { transform: translateY(-60px) rotate(0deg) scale(1.03); }
          75% { transform: translateY(-30px) rotate(1deg) scale(1.02); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); }
        }

        @keyframes shimmerLine {
          0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; }
        }

        .float-img {
          position: absolute;
          opacity: 0.85;
          filter: brightness(1.25) contrast(1.15) saturate(1.2);
          border-radius: 16px;
          overflow: hidden;
          pointer-events: none;
          z-index: 2;
          box-shadow: 0 16px 48px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          backdrop-filter: none;
          border: 1.5px solid rgba(255,255,255,0.4);
        }

        .float-img:hover {
          opacity: 1;
          filter: brightness(1.35) contrast(1.2) saturate(1.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          transform: scale(1.05);
        }

        .float-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .bg-text-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 95%;
          max-width: 1400px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .bg-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(150px, 25vw, 400px);
          font-weight: 300;
          letter-spacing: -0.02em;
          color: rgba(200,169,110,0.12);
          line-height: 1;
          text-transform: uppercase;
          animation: floatBg 12s ease-in-out infinite;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .float-img {
            opacity: 0.8 !important;
            box-shadow: 0 12px 36px rgba(0,0,0,0.18) !important;
          }

          .float-img:hover {
            opacity: 0.95 !important;
            box-shadow: 0 16px 48px rgba(0,0,0,0.22) !important;
          }

          .bg-text {
            font-size: clamp(80px, 18vw, 200px) !important;
            color: rgba(200,169,110,0.15) !important;
          }

          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 20px 16px !important;
          }

          .hero-left-panel, .hero-right-panel {
            display: none !important;
          }

          .hero-center-section {
            padding: 0 !important;
          }

          .hero-heading {
            font-size: clamp(48px, 12vw, 80px) !important;
          }

          .hero-description {
            font-size: 14px !important;
          }

          .hero-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }

          .hero-button {
            width: 100% !important;
            padding: 12px 24px !important;
          }

          .hero-dots {
            gap: 8px !important;
          }

          .dress-label {
            font-size: 11px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-heading {
            font-size: clamp(36px, 10vw, 64px) !important;
          }

          .hero-description {
            font-size: 13px !important;
          }

          .bg-text {
            font-size: clamp(60px, 15vw, 140px) !important;
          }
        }
      `}</style>

      {/* ── Grid texture ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
          zIndex: 0,
        }}
      />

      {/* ── YAYA Background Text Animation ── */}
      <div className="bg-text-container">
        <div className="bg-text" style={{ color: accentRgba(0.12), transition: "color 0.9s ease" }}>
          YAYA
        </div>
      </div>

      {/* ── Ambient color blobs ── */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "5%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          pointerEvents: "none",
          background: `radial-gradient(circle, ${accentRgba(0.1)} 0%, transparent 70%)`,
          transition: "background 0.9s ease",
          zIndex: 0,
          animation: "floatBg 18s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "5%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          pointerEvents: "none",
          background: `radial-gradient(circle, ${accentRgba(0.08)} 0%, transparent 70%)`,
          transition: "background 0.9s ease",
          zIndex: 0,
          animation: "floatBg 20s ease-in-out infinite 1s",
        }}
      />

      {/* ── Bright Floating Product Images (Always Visible) ── */}
      {floatingImages.map((item, idx) => (
        <div
          key={item.id}
          className="float-img"
          style={{
            ...item.style,
            transform: `rotate(${item.rot})`,
            animation: idx % 3 === 0 ? "floatA 8s ease-in-out infinite" : idx % 3 === 1 ? "floatB 9s ease-in-out infinite 0.5s" : "floatC 7.5s ease-in-out infinite 1s",
          }}
        >
          <img src={item.src} alt="" />
        </div>
      ))}

      {/* ── Content wrapper ── */}
      <div style={{ position: "relative", zIndex: 10, minHeight: "100svh", display: "flex", flexDirection: "column" }}>

        {/* ── Main Grid: Desktop Layout ── */}
        {!isMobile ? (
          <div
            className="hero-grid"
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr 1fr",
              gap: 32,
              alignItems: "center",
              padding: "40px 32px",
              maxWidth: "1600px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            {/* ── LEFT PANEL ── */}
            <div
              className="hero-left-panel"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                alignItems: "flex-end",
                paddingRight: 24,
              }}
            >
              <FadeUp delay={0} triggerKey={active}>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: accent,
                      marginBottom: 12,
                      transition: "color 0.6s",
                    }}
                  >
                    {dressLabel}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 26,
                      fontWeight: 400,
                      color: "#18160f",
                      fontStyle: "italic",
                      marginBottom: 16,
                    }}
                  >
                    {categories.find((c) => c.key === active)?.label}
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={80} triggerKey={active}>
                <div
                  style={{
                    borderRight: `2px solid ${accent}`,
                    paddingRight: 18,
                    transition: "border-color 0.6s",
                  }}
                >
                  <p
                    className="hero-description"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: "#2e2b25",
                      fontWeight: 300,
                      maxWidth: "240px",
                      textAlign: "right",
                    }}
                  >
                    {businessDescriptions[active]}
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={200} triggerKey={active}>
                <div
                  style={{
                    padding: "16px 20px",
                    border: `1.5px solid ${accent}`,
                    borderRadius: 8,
                    background: accentRgba(0.08),
                    transition: "all 0.6s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: accent,
                      marginBottom: 8,
                      transition: "color 0.6s",
                    }}
                  >
                    Featured Collection
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20,
                      fontWeight: 400,
                      color: "#18160f",
                    }}
                  >
                    YAYA {categories.find((c) => c.key === active)?.label}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* ── CENTER IMAGE ── */}
            <FadeUp delay={300} triggerKey={active}>
              <div
                className="hero-center-section"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(400px, 70vh, 700px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                {/* Dress Label at top */}
                <div
                  className="dress-label"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: accent,
                    marginBottom: 12,
                    transition: "color 0.6s",
                  }}
                >
                  {dressLabel}
                </div>

                {/* Glow effect */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    height: "85%",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${accentRgba(0.22)} 0%, transparent 80%)`,
                    transition: "background 0.8s",
                    zIndex: 1,
                  }}
                />

                {/* Main image */}
                <img
                  key={active}
                  src={images[active]}
                  alt={`${active} fashion`}
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                    objectPosition: "bottom",
                    position: "relative",
                    zIndex: 2,
                    maxWidth: "100%",
                    opacity: transitioning ? 0 : 1,
                    transform: transitioning ? "scale(0.88) translateY(16px)" : "scale(1) translateY(0)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                    filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.2))",
                  }}
                />
              </div>
            </FadeUp>

            {/* ── RIGHT PANEL ── */}
            <div
              className="hero-right-panel"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                alignItems: "flex-start",
                paddingLeft: 24,
              }}
            >
              <FadeUp delay={0} triggerKey={active}>
                <div>
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: accent,
                      marginBottom: 12,
                      transition: "color 0.6s",
                    }}
                  >
                    YAYA Brand
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 26,
                      fontWeight: 400,
                      color: "#18160f",
                      fontStyle: "italic",
                    }}
                  >
                    Premium Quality
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={80} triggerKey={active}>
                <div
                  style={{
                    borderLeft: `2px solid ${accent}`,
                    paddingLeft: 18,
                    transition: "border-color 0.6s",
                  }}
                >
                  <p
                    className="hero-description"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: "#2e2b25",
                      fontWeight: 300,
                      maxWidth: "240px",
                    }}
                  >
                    Every piece crafted with precision, passion, and the finest materials for families who value elegance.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={200} triggerKey={active}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { num: "200+", label: "Styles" },
                    { num: "50+", label: "Countries" },
                  ].map((stat) => (
                    <div key={stat.num}>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 28,
                          fontWeight: 300,
                          color: accent,
                          lineHeight: 1,
                          transition: "color 0.6s",
                        }}
                      >
                        {stat.num}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "9px",
                          fontWeight: 400,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "#6a6258",
                          marginTop: 6,
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        ) : (
          // MOBILE LAYOUT
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 16px",
              gap: 16,
            }}
          >
            {/* Mobile Dress Label */}
            <FadeUp delay={0} triggerKey={active}>
              <div
                className="dress-label"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: accent,
                  transition: "color 0.6s",
                }}
              >
                {dressLabel}
              </div>
            </FadeUp>

            {/* Mobile Heading */}
            <div style={{ textAlign: "center", lineHeight: 0.9, width: "100%" }}>
              <h1
                className="hero-heading"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(48px, 12vw, 80px)",
                  fontWeight: 300,
                  color: "#18160f",
                  letterSpacing: "-0.01em",
                }}
              >
                <LetterReveal text={headLeft} triggerKey={active} delay={0} />
              </h1>
              <h2
                className="hero-heading"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(48px, 12vw, 80px)",
                  fontWeight: 300,
                  color: accent,
                  letterSpacing: "-0.01em",
                  transition: "color 0.6s",
                }}
              >
                <LetterReveal text={headRight} triggerKey={active} delay={100} />
              </h2>
            </div>

            {/* Mobile Image */}
            <FadeUp delay={200} triggerKey={active}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(300px, 50vh, 500px)",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  marginTop: 12,
                }}
              >
                {/* Glow effect */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    height: "85%",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${accentRgba(0.22)} 0%, transparent 80%)`,
                    zIndex: 1,
                  }}
                />

                {/* Mobile main image */}
                <img
                  key={active}
                  src={images[active]}
                  alt={`${active} fashion`}
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                    objectPosition: "bottom",
                    position: "relative",
                    zIndex: 2,
                    maxWidth: "100%",
                    opacity: transitioning ? 0 : 1,
                    transform: transitioning ? "scale(0.88) translateY(12px)" : "scale(1) translateY(0)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                    filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.15))",
                  }}
                />
              </div>
            </FadeUp>

            {/* Mobile Description */}
            <FadeUp delay={300} triggerKey={active}>
              <p
                className="hero-description"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#2e2b25",
                  fontWeight: 300,
                  textAlign: "center",
                  maxWidth: "100%",
                }}
              >
                {businessDescriptions[active]}
              </p>
            </FadeUp>

            {/* Mobile Info Card */}
            <FadeUp delay={400} triggerKey={active}>
              <div
                style={{
                  padding: "14px 18px",
                  border: `1.5px solid ${accent}`,
                  borderRadius: 8,
                  background: accentRgba(0.08),
                  textAlign: "center",
                  transition: "all 0.6s ease",
                  width: "100%",
                  maxWidth: "280px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "8px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: accent,
                    marginBottom: 6,
                    transition: "color 0.6s",
                  }}
                >
                  YAYA {dressLabel}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 18,
                    fontWeight: 400,
                    color: "#18160f",
                  }}
                >
                  {categories.find((c) => c.key === active)?.label}
                </div>
              </div>
            </FadeUp>
          </div>
        )}

        {/* ── CTA & Controls ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            padding: "30px 40px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <FadeUp delay={400} triggerKey={active}>
            <div
              className="hero-buttons"
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                width: isMobile ? "100%" : "auto",
              }}
            >
              <button
                className="hero-button"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: isMobile ? "10px" : "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: isMobile ? "12px 24px" : "14px 36px",
                  border: "none",
                  borderRadius: "6px",
                  background: accent,
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.35s",
                  boxShadow: `0 12px 32px ${accentRgba(0.3)}`,
                  width: isMobile ? "100%" : "auto",
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
                    (e.target as HTMLButtonElement).style.boxShadow = `0 16px 48px ${accentRgba(0.4)}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    (e.target as HTMLButtonElement).style.transform = "scale(1)";
                    (e.target as HTMLButtonElement).style.boxShadow = `0 12px 32px ${accentRgba(0.3)}`;
                  }
                }}
              >
                Explore Collection
              </button>
              <button
                className="hero-button"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: isMobile ? "10px" : "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: isMobile ? "12px 24px" : "12px 28px",
                  border: `1.5px solid ${accent}`,
                  borderRadius: "6px",
                  background: "transparent",
                  color: accent,
                  cursor: "pointer",
                  transition: "all 0.35s",
                  width: isMobile ? "100%" : "auto",
                }}
                onClick={() => {
                  const idx = categories.findIndex((c) => c.key === active);
                  switchCategory(categories[(idx + 1) % categories.length].key);
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    (e.target as HTMLButtonElement).style.transform = "scale(1)";
                  }
                }}
              >
                Next Look →
              </button>
            </div>
          </FadeUp>

          {/* Category Dots */}
          <div className="hero-dots" style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => switchCategory(cat.key)}
                style={{
                  width: active === cat.key ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background: active === cat.key ? accent : "#d4c8b8",
                  cursor: "pointer",
                  transition: "all 0.45s ease",
                  padding: 0,
                  animation: active === cat.key ? "pulse 2s ease-in-out infinite" : "none",
                  boxShadow: active === cat.key ? `0 4px 16px ${accentRgba(0.4)}` : "none",
                }}
                aria-label={`Go to ${cat.label}`}
              />
            ))}
          </div>

          {/* Brand Title */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: accent,
              transition: "color 0.6s",
            }}
          >
            YAYA Premium Collection
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;