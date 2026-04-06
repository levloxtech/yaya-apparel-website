import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, ShoppingBag, BookOpen, Info, Mail } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
    }
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    setActiveSection("");
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isHome = location.pathname === "/";
  const isBlog = location.pathname === "/blog";
  const isContact = location.pathname === "/contact";

  const mobileNavItems = [
    { label: "Home", icon: Home, action: scrollToTop, active: isHome && activeSection === "" },
    { label: "Shop", icon: ShoppingBag, action: () => scrollToSection("collections"), active: isHome && activeSection === "collections" },
    { label: "Journal", icon: BookOpen, action: () => navigate("/blog"), active: isBlog },
    { label: "About", icon: Info, action: () => scrollToSection("about"), active: isHome && activeSection === "about" },
    { label: "Contact", icon: Mail, action: () => navigate("/contact"), active: isContact },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
        }

        .nav-link {
          position: relative;
          font-size: 13px;
          font-weight: 500;
          color: #2a2a2a;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.25s ease;
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'Poppins', sans-serif;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #a8434a;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #a8434a;
          font-weight: 600;
        }

        .nav-link:hover {
          color: #a8434a;
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 8px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          color: #999;
          transition: all 0.25s ease;
          flex: 1;
          font-size: 10px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
        }

        .bottom-nav-item.active {
          color: #a8434a;
        }

        .bottom-nav-item svg {
          width: 20px;
          height: 20px;
          stroke-width: 1.8;
          transition: all 0.25s ease;
        }

        .bottom-nav-item.active svg {
          stroke-width: 2.2;
        }

        @media (max-width: 768px) {
          body {
            padding-bottom: 80px;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP NAVBAR
      ══════════════════════════════════════════════════════════ */}
      <nav
        className="hidden md:block fixed top-0 left-0 right-0 z-50"
        style={{
          padding: scrolled ? "10px 0" : "14px 0",
          background: scrolled 
            ? "rgba(255, 255, 255, 0.93)" 
            : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled 
            ? "0 1px 8px rgba(0, 0, 0, 0.06)" 
            : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 flex items-center justify-between gap-8">

          {/* Logo Section */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 focus:outline-none flex-shrink-0"
            style={{ minWidth: "fit-content" }}
          >
            <img
              src="public/yaya_logo1.png"
              alt="YAYA Apparel"
              style={{
                height: scrolled ? 38 : 42,
                width: "auto",
                objectFit: "contain",
                transition: "height 0.25s ease",
              }}
            />
            <div className="flex flex-col items-start leading-tight">
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#2a2a2a",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                YAYA
              </span>
              <span
                style={{
                  fontSize: 8,
                  color: "#a8434a",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  marginTop: 2,
                }}
              >
                APPAREL
              </span>
            </div>
          </button>

          {/* Center Navigation */}
          <div className="flex items-center gap-10 flex-1 justify-center">
            <button
              onClick={scrollToTop}
              className={`nav-link ${isHome && activeSection === "" ? "active" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("collections")}
              className={`nav-link ${isHome && activeSection === "collections" ? "active" : ""}`}
            >
              Collections
            </button>
            <button
              onClick={() => scrollToSection("lookbook")}
              className={`nav-link ${isHome && activeSection === "lookbook" ? "active" : ""}`}
            >
              Lookbook
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`nav-link ${isHome && activeSection === "about" ? "active" : ""}`}
            >
              About
            </button>
            <Link to="/blog" className={`nav-link ${isBlog ? "active" : ""}`}>
              Journal
            </Link>
          </div>

          {/* Contact Button */}
          <button
            onClick={() => navigate("/contact")}
            style={{
              padding: "7px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: isContact ? "#fff" : "#a8434a",
              background: isContact ? "#a8434a" : "transparent",
              border: `1px solid #a8434a`,
              borderRadius: "3px",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.25s ease",
              display: "inline-block",
              textTransform: "capitalize",
              letterSpacing: "0.02em",
              flex: "0 0 auto",
            }}
            onMouseEnter={(e) => {
              if (!isContact) {
                (e.currentTarget as HTMLElement).style.background = "#a8434a";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (!isContact) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#a8434a";
              }
            }}
          >
            Contact
          </button>
        </div>

        {/* Divider */}
        {scrolled && (
          <div
            style={{
              height: 0.5,
              marginTop: 10,
              background: "rgba(168, 67, 74, 0.1)",
            }}
          />
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════════
          MOBILE TOP BAR (LOGO ONLY - NO HAMBURGER)
      ══════════════════════════════════════════════════════════ */}
      <nav
        className="md:hidden fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(255, 255, 255, 0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 1px 6px rgba(0, 0, 0, 0.05)" : "none",
          padding: "10px 0 8px",
          transition: "all 0.25s ease",
        }}
      >
        <div className="flex items-center justify-between px-5">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 focus:outline-none"
          >
            <img
              src="public/yaya_logo1.png"
              alt="YAYA Apparel"
              style={{
                height: 30,
                width: "auto",
                objectFit: "contain",
              }}
            />
            <div className="flex flex-col items-start leading-tight">
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#2a2a2a",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                YAYA
              </span>
              <span
                style={{
                  fontSize: 7,
                  color: "#a8434a",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  marginTop: 1,
                }}
              >
                APPAREL
              </span>
            </div>
          </button>

          {/* Empty space on right - no hamburger */}
          <div style={{ width: 44 }} />
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          MOBILE BOTTOM NAVIGATION (ONLY NAVIGATION)
      ══════════════════════════════════════════════════════════ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 -1px 8px rgba(0, 0, 0, 0.05)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "8px 0 12px",
          }}
        >
          {mobileNavItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.action}
                className={`bottom-nav-item ${item.active ? "active" : ""}`}
              >
                <IconComponent />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Add padding for fixed navbar */}
      <style>{`
        @media (min-width: 768px) {
          body {
            padding-top: 60px;
          }
        }
        @media (max-width: 768px) {
          body {
            padding-top: 48px;
            padding-bottom: 80px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;