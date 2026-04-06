import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // ── Scroll detection ──────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Reset activeSection when route changes away from "/" ──────
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
    }
  }, [location.pathname]);

  // ── Lock body scroll when mobile menu is open ─────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Scroll to section helper ──────────────────────────────────
  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setActiveSection(id);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ── Scroll to top / go home ───────────────────────────────────
  const scrollToTop = () => {
    setMenuOpen(false);
    setActiveSection("");
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── Route flags ───────────────────────────────────────────────
  const isHome    = location.pathname === "/";
  const isBlog    = location.pathname === "/blog";
  const isContact = location.pathname === "/contact";

  // ── Active-link class helper ──────────────────────────────────
  const navLinkClass = (active: boolean) =>
    `relative font-sans text-[9.5px] tracking-[0.32em] uppercase font-semibold
     transition-all duration-300 pb-1 nav-link-line
     ${active ? "text-amber-700 active-link" : "text-stone-500 hover:text-stone-900"}`;

  return (
    <>
      {/* ── Global styles ─────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap');

        /* Animated underline for desktop nav links */
        .nav-link-line::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #b8732a, #e4a84e);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link-line:hover::after,
        .nav-link-line.active-link::after { width: 100%; }

        /* Shimmer on Contact CTA */
        .shimmer-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%);
          transform: skewX(-15deg);
          transition: left 0.6s ease;
        }
        .shimmer-btn:hover::before { left: 125%; }

        /* Mobile menu item */
        .mobile-menu-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 15px 0;
          border-bottom: 1px solid rgba(184,115,42,0.08);
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          font-weight: 500;
          color: #3a3028;
          transition: color 0.25s ease;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          cursor: pointer;
          text-align: left;
          text-decoration: none;
        }
        .mobile-menu-item:hover { color: #b8732a; }
        .mobile-menu-item .arrow {
          margin-left: auto;
          font-size: 12px;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.25s ease;
          color: #b8732a;
        }
        .mobile-menu-item:hover .arrow { opacity: 1; transform: translateX(0); }

        /* Bottom-nav active state */
        .bnav-item { display:flex; flex-direction:column; align-items:center; gap:4px; padding:6px 12px; background:none; border:none; cursor:pointer; text-decoration:none; }
        .bnav-icon { transition: color 0.25s ease; }
        .bnav-label { font-family:'Jost',sans-serif; font-size:7.5px; letter-spacing:0.22em; text-transform:uppercase; font-weight:600; transition:color 0.25s ease; }

        /* Reserve space so page content is not hidden behind bottom-nav */
        @media (max-width: 768px) {
          body { padding-bottom: 80px !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP NAVBAR  (md and above)
      ══════════════════════════════════════════════════════════ */}
      <nav
        className="hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled ? "rgba(253,251,248,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled
            ? "0 1px 0 rgba(184,115,42,0.12), 0 8px 32px rgba(0,0,0,0.06)"
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-14 flex items-center justify-between">

          {/* Left links */}
          <div className="flex items-center gap-9">
            <button
              onClick={scrollToTop}
              className={navLinkClass(isHome && activeSection === "")}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("collections")}
              className={navLinkClass(isHome && activeSection === "collections")}
            >
              Collections
            </button>
            <button
              onClick={() => scrollToSection("lookbook")}
              className={navLinkClass(isHome && activeSection === "lookbook")}
            >
              Lookbook
            </button>
          </div>

          {/* Centre logo */}
          <button
            onClick={scrollToTop}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer", margin:"0 40px" }}
          >
            <img
              src="/src/assets/yaya_logo1.png"
              alt="YAYA"
              style={{
                height: scrolled ? 48 : 64,
                width: "auto",
                objectFit: "contain",
                transition: "height 0.35s ease",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
              }}
            />
          </button>

          {/* Right links */}
          <div className="flex items-center gap-9">
            <button
              onClick={() => scrollToSection("about")}
              className={navLinkClass(isHome && activeSection === "about")}
            >
              About
            </button>
            <Link
              to="/blog"
              className={navLinkClass(isBlog)}
            >
              Journal
            </Link>

            {/* Contact CTA button */}
            <Link
              to="/contact"
              className="relative overflow-hidden shimmer-btn"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "9px 20px",
                background: isContact
                  ? "linear-gradient(135deg, #b8732a, #d4943c)"
                  : "transparent",
                border: "1px solid",
                borderColor: isContact ? "transparent" : "rgba(184,115,42,0.4)",
                color: isContact ? "#fff" : "#7a5a32",
                borderRadius: 3,
                transition: "all 0.35s ease",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseEnter={e => {
                if (!isContact) {
                  (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #b8732a, #d4943c)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                }
              }}
              onMouseLeave={e => {
                if (!isContact) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#7a5a32";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,115,42,0.4)";
                }
              }}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Gold gradient rule — only when scrolled */}
        <div style={{
          height: 1,
          marginTop: scrolled ? 12 : 0,
          background: scrolled
            ? "linear-gradient(90deg, transparent, rgba(184,115,42,0.25) 30%, rgba(184,115,42,0.5) 50%, rgba(184,115,42,0.25) 70%, transparent)"
            : "transparent",
          transition: "all 0.5s ease",
        }} />
      </nav>

      {/* ══════════════════════════════════════════════════════════
          MOBILE TOP BAR  (below md)
      ══════════════════════════════════════════════════════════ */}
      <nav
        className="md:hidden fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(253,251,248,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(184,115,42,0.15), 0 4px 24px rgba(0,0,0,0.06)"
            : "0 1px 0 rgba(184,115,42,0.08)",
          padding: "10px 0 9px",
        }}
      >
        <div className="flex items-center justify-between px-5">

          {/* Brand mark */}
          <button onClick={scrollToTop} className="flex items-center gap-2.5">
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg, #b8732a, #e4a84e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(184,115,42,0.3)",
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#fff", fontWeight: 400 }}>Y</span>
            </div>
            <div className="flex flex-col items-start">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, letterSpacing: "0.1em", color: "#1a160f", fontWeight: 400, lineHeight: 1 }}>
                YAYA
              </span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 6, letterSpacing: "0.45em", textTransform: "uppercase", color: "#9a7a52", fontWeight: 500 }}>
                Luxury Fashion
              </span>
            </div>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            style={{ padding: "8px 4px", display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end", background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{
              display: "block", width: menuOpen ? 20 : 24, height: 1.5,
              background: "#2a2018", borderRadius: 2,
              transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4.5px)" : "none",
            }} />
            <span style={{
              display: "block", width: 16, height: 1.5,
              background: "#b8732a", borderRadius: 2,
              transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "translateX(8px)" : "none",
            }} />
            <span style={{
              display: "block", width: 20, height: 1.5,
              background: "#2a2018", borderRadius: 2,
              transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
              transform: menuOpen ? "rotate(-45deg) translate(4px, -4.5px)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          MOBILE FULLSCREEN OVERLAY MENU
      ══════════════════════════════════════════════════════════ */}
      <div
        className="md:hidden fixed inset-0 z-40"
        style={{
          background: "rgba(253,251,248,0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          paddingTop: 80,
          paddingBottom: 40,
          paddingLeft: 32,
          paddingRight: 32,
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 28, height: "0.5px", background: "linear-gradient(to right, #b8732a, transparent)" }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase", color: "#b8732a", fontWeight: 500 }}>
              Navigate
            </span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontStyle: "italic", color: "#2a2018", fontWeight: 300, lineHeight: 1.2 }}>
            Where would you<br />like to go?
          </p>
        </div>

        {/* Links */}
        <div style={{ flex: 1 }}>
          {[
            { label: "Home",        action: scrollToTop,                    icon: "◆" },
            { label: "Collections", action: () => scrollToSection("collections"), icon: "◈" },
            { label: "Lookbook",    action: () => scrollToSection("lookbook"),    icon: "◉" },
            { label: "About",       action: () => scrollToSection("about"),       icon: "◇" },
          ].map(item => (
            <button key={item.label} onClick={item.action} className="mobile-menu-item">
              <span style={{ fontSize: 8, color: "#b8732a", opacity: 0.6 }}>{item.icon}</span>
              {item.label}
              <span className="arrow">→</span>
            </button>
          ))}

          {/* Journal → /blog  ✅ fixed */}
          <Link to="/blog" onClick={() => setMenuOpen(false)} className="mobile-menu-item">
            <span style={{ fontSize: 8, color: "#b8732a", opacity: 0.6 }}>◈</span>
            Journal
            <span className="arrow">→</span>
          </Link>

          {/* Contact CTA */}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              textDecoration: "none",
              marginTop: 24,
              padding: "14px 24px",
              background: "linear-gradient(135deg, #b8732a, #d4943c)",
              borderRadius: 4,
              fontFamily: "'Jost', sans-serif",
              fontSize: 10,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 8px 28px rgba(184,115,42,0.3)",
            }}
          >
            Contact Us
          </Link>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(184,115,42,0.12)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: "italic", color: "#9a7a52" }}>
            YAYA — Luxury Fashion House
          </span>
          <div style={{ display: "flex", gap: 14 }}>
            {[["IG","instagram"],["FB","facebook"],["PT","pinterest"]].map(([abbr, name]) => (
              <div key={name} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(184,115,42,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 9, color: "#b8732a" }}>{abbr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE BOTTOM NAVIGATION  (below md only)
          — hidden when overlay menu is open
      ══════════════════════════════════════════════════════════ */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-30"
        style={{
          background: "rgba(253,251,248,0.98)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 -1px 0 rgba(184,115,42,0.12), 0 -12px 40px rgba(0,0,0,0.06)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          /* Slide down when overlay menu opens so it doesn't clash */
          transform: menuOpen ? "translateY(100%)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: menuOpen ? "none" : "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", padding: "8px 4px 12px" }}>

          {/* Home */}
          <button onClick={scrollToTop} className="bnav-item">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              className="bnav-icon"
              style={{ color: isHome && !activeSection ? "#b8732a" : "#6a5a48" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 21V12h6v9" />
            </svg>
            <span className="bnav-label" style={{ color: isHome && !activeSection ? "#b8732a" : "#6a5a48" }}>Home</span>
          </button>

          {/* Collections */}
          <button onClick={() => scrollToSection("collections")} className="bnav-item">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              className="bnav-icon"
              style={{ color: activeSection === "collections" ? "#b8732a" : "#6a5a48" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 6h16M4 10h16M4 14h10M4 18h6" />
            </svg>
            <span className="bnav-label" style={{ color: activeSection === "collections" ? "#b8732a" : "#6a5a48" }}>Shop</span>
          </button>

          {/* Centre YAYA orb */}
          <button onClick={scrollToTop} className="bnav-item" style={{ marginTop: -22, position: "relative" }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "linear-gradient(135deg, #b8732a 0%, #d4943c 50%, #e4b060 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 6px 24px rgba(184,115,42,0.4), 0 2px 8px rgba(0,0,0,0.1)",
              border: "2px solid rgba(255,255,255,0.8)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#fff", fontWeight: 300, letterSpacing: 2 }}>Y</span>
            </div>
            <span style={{
              fontFamily: "'Jost', sans-serif", fontSize: 6.5, letterSpacing: "0.4em",
              textTransform: "uppercase", fontWeight: 700, color: "#b8732a",
              backgroundColor: "rgba(184,115,42,0.08)", padding: "2px 8px", borderRadius: 20,
            }}>YAYA</span>
          </button>

          {/* Journal → /blog  ✅ fixed */}
          <Link to="/blog" className="bnav-item">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              className="bnav-icon"
              style={{ color: isBlog ? "#b8732a" : "#6a5a48" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="bnav-label" style={{ color: isBlog ? "#b8732a" : "#6a5a48" }}>Journal</span>
          </Link>

          {/* Contact */}
          <Link to="/contact" className="bnav-item">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              className="bnav-icon"
              style={{ color: isContact ? "#b8732a" : "#6a5a48" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="bnav-label" style={{ color: isContact ? "#b8732a" : "#6a5a48" }}>Contact</span>
          </Link>

        </div>
      </div>
    </>
  );
};

export default Navbar;