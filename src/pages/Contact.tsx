import { useState, useEffect, useRef } from "react";

// ── Scroll hook ───────────────────────────────────────────────────────────
const useInView = (threshold = 0.10) => {
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
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    ...style,
  }}>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────
const Contact = () => {
  const hero = useInView(0.05);
  const body = useInView(0.08);

  const [form,    setForm]    = useState({ name:"", email:"", phone:"", message:"" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState("");

  // ✨ Premium Unified Palette ✨
  const RICH_GOLD  = "#b38a22"; 
  const DARK_STONE = "#2c2820"; 
  const DARK       = "#18160f"; 
  const MUTED      = "#5a5248";
  const BG_CREAM   = "#faf9f6";
  const BG2        = "#f2efe8";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      // Call backend to send email via Resend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });

      // Reset after 3 seconds
      setTimeout(() => {
        setSent(false);
      }, 3000);

    } catch (err) {
      console.error('Form error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
      setSending(false);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${focused === field ? RICH_GOLD : "rgba(179,138,34,0.28)"}`,
    padding: "10px 0",
    fontFamily: "'Jost',sans-serif",
    fontSize: "15px",
    fontWeight: 400,
    color: DARK,
    outline: "none",
    transition: "border-color 0.3s ease",
    display: "block",
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Jost',sans-serif",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.42em",
    textTransform: "uppercase",
    color: MUTED,
    display: "block",
    marginBottom: 8,
  };

  return (
    <main style={{ minHeight:"100vh", background:BG_CREAM, paddingTop:96, paddingBottom:80, fontFamily:"'Jost',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

      <style>{`
        @keyframes ct-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .ct-gold {
          background: linear-gradient(90deg, ${RICH_GOLD} 0%, #e8c87a 45%, ${RICH_GOLD} 90%);
          background-size: 400px 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ct-shimmer 3.5s ease-in-out infinite;
        }
        @keyframes ct-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ct-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ct-spin 0.7s linear infinite;
          display: inline-block;
        }
        .ct-info-card {
          background: #fff;
          border: 1px solid rgba(179,138,34,0.15);
          border-radius: 14px;
          padding: 22px 24px;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .ct-info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 34px rgba(179,138,34,0.10), 0 3px 10px rgba(0,0,0,0.05);
          border-color: rgba(179,138,34,0.35);
        }
        input::placeholder, textarea::placeholder { color: rgba(90,82,72,0.38); }
        .error-message {
          color: #d32f2f;
          background: #ffebee;
          border: 1px solid #ef5350;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
        }
        .success-message {
          color: #1b5e20;
          background: #e8f5e9;
          border: 1px solid #4caf50;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
        }

        @media (max-width: 767px) {
          .ct-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .ct-info-grid { grid-template-columns: 1fr !important; }
          .ct-px { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      {/* ── Ambient glow ── */}
      <div style={{ position:"fixed", top:0, left:"50%", transform:"translateX(-50%)", width:"80vw", height:"50vh", borderRadius:"50%", background:`radial-gradient(circle,rgba(179,138,34,0.06) 0%,transparent 70%)`, pointerEvents:"none", zIndex:0 }}/>

      {/* ══════════════════════════════════════════
          HERO HEADER
      ══════════════════════════════════════════ */}
      <div ref={hero.ref} className="ct-px" style={{ textAlign:"center", padding:"0 48px 56px", position:"relative", zIndex:1 }}>

        {/* Watermark */}
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", pointerEvents:"none" }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(60px,14vw,180px)", fontWeight:300, color:`rgba(179,138,34,0.04)`, letterSpacing:"-0.02em", userSelect:"none", whiteSpace:"nowrap" }}>
            CONTACT
          </span>
        </div>

        <div style={{ position:"relative", zIndex:1 }}>
          <FadeSlide inView={hero.inView} delay={0}>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.55em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:16 }}>
              Get In Touch
            </span>
          </FadeSlide>

          <FadeSlide inView={hero.inView} delay={80}>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,6.5vw,72px)", fontWeight:400, color:DARK, letterSpacing:"-0.01em", lineHeight:1.08, marginBottom:16 }}>
              We'd love to{" "}
              <span className="ct-gold" style={{ fontWeight:600 }}>hear from you</span>
            </h1>
          </FadeSlide>

          <FadeSlide inView={hero.inView} delay={200}>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:400, color:DARK_STONE, maxWidth:480, margin:"0 auto 28px", lineHeight:1.85 }}>
              Have a question about our collections, brands, or orders? Reach out and our team will get back to you promptly.
            </p>
          </FadeSlide>

          {/* Gold divider */}
          <FadeSlide inView={hero.inView} delay={280}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
              <div style={{ width:44, height:1, background:`linear-gradient(to right,transparent,${RICH_GOLD})` }}/>
              <div style={{ width:5, height:5, borderRadius:"50%", background:RICH_GOLD, boxShadow:`0 0 7px rgba(179,138,34,0.5)` }}/>
              <div style={{ width:44, height:1, background:`linear-gradient(to left,transparent,${RICH_GOLD})` }}/>
            </div>
          </FadeSlide>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BODY — INFO + FORM
      ══════════════════════════════════════════ */}
      <div
        ref={body.ref}
        className="ct-px"
        style={{ maxWidth:1140, margin:"0 auto", padding:"0 48px", position:"relative", zIndex:1 }}
      >
        {/* ── Contact info cards ── */}
        <FadeSlide inView={body.inView} delay={0} style={{ marginBottom:40 }}>
          <div
            className="ct-info-grid"
            style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}
          >
            {/* Email */}
            <div className="ct-info-card">
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:`rgba(179,138,34,0.12)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={RICH_GOLD} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.38em", textTransform:"uppercase", color:RICH_GOLD }}>
                  Email Us
                </span>
              </div>
              <a
                href="mailto:yayaapparel05@gmail.com"
                style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:500, color:DARK, textDecoration:"none", letterSpacing:"0.02em", display:"block", marginBottom:4, transition:"color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.color = RICH_GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = DARK)}
              >
                yayaapparel05@gmail.com
              </a>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"13px", fontWeight:400, color:MUTED }}>
                We reply within 24 hours
              </p>
            </div>

            {/* Phone */}
            <div className="ct-info-card">
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:`rgba(179,138,34,0.12)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={RICH_GOLD} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.09 1.18 2 2 0 012.08 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.2 7.74a16 16 0 006.06 6.06l1.1-1.1a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.94v1.98z"/>
                  </svg>
                </div>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.38em", textTransform:"uppercase", color:RICH_GOLD }}>
                  Call Us
                </span>
              </div>
              <a
                href="tel:+919791024433"
                style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:500, color:DARK, textDecoration:"none", letterSpacing:"0.04em", display:"block", marginBottom:4, transition:"color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.color = RICH_GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = DARK)}
              >
                +91 97910 24433
              </a>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"13px", fontWeight:400, color:MUTED }}>
                Mon – Sat, 10:00 AM – 7:00 PM
              </p>
            </div>

            {/* Location */}
            <div className="ct-info-card">
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:`rgba(179,138,34,0.12)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={RICH_GOLD} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.38em", textTransform:"uppercase", color:RICH_GOLD }}>
                  Visit Us
                </span>
              </div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:500, color:DARK, marginBottom:4, lineHeight:1.4 }}>
                Trichy, Tamil Nadu
              </p>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"13px", fontWeight:400, color:MUTED }}>
                India's premium fashion destination
              </p>
            </div>
          </div>
        </FadeSlide>

        {/* ── Main two-column: message + form ── */}
        <div
          className="ct-grid"
          style={{ display:"grid", gridTemplateColumns:"0.9fr 1.1fr", gap:52, alignItems:"flex-start" }}
        >
          {/* Left — message block */}
          <FadeSlide inView={body.inView} delay={100}>
            <div>
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.50em", textTransform:"uppercase", color:RICH_GOLD, display:"block", marginBottom:14 }}>
                YAYA Apparel
              </span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3.2vw,36px)", fontWeight:500, color:DARK, letterSpacing:"-0.01em", lineHeight:1.25, marginBottom:18 }}>
                Your fashion questions, answered.
              </h2>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:400, color:DARK_STONE, lineHeight:1.88, marginBottom:28 }}>
                Whether you're looking for a specific collection, need help with sizing, want to know about available brands, or have a bulk order enquiry — we're here to help.
              </p>

              {/* Quick contact options */}
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[
                  { label:"Collection Enquiry", desc:"Ask about specific items or categories" },
                  { label:"Brand Information",  desc:"Know which brands we carry at our store" },
                  { label:"Order & Delivery",   desc:"Track orders or enquire about delivery" },
                  { label:"Bulk Orders",         desc:"Special pricing for bulk purchases"     },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display:"flex", alignItems:"flex-start", gap:12,
                      padding:"12px 16px",
                      background:BG2,
                      borderRadius:10,
                      border:`1px solid rgba(179,138,34,0.15)`,
                      transition:"border-color 0.25s ease, background 0.25s ease",
                      cursor:"default",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(179,138,34,0.4)";
                      (e.currentTarget as HTMLDivElement).style.background = "#fff";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(179,138,34,0.15)";
                      (e.currentTarget as HTMLDivElement).style.background = BG2;
                    }}
                  >
                    <div style={{ width:6, height:6, borderRadius:"50%", background:RICH_GOLD, flexShrink:0, marginTop:5, boxShadow:`0 0 5px rgba(179,138,34,0.5)` }}/>
                    <div>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"12px", fontWeight:600, color:DARK, marginBottom:2 }}>{item.label}</div>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"12px", fontWeight:400, color:MUTED }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeSlide>

          {/* Right — form ── */}
          <FadeSlide inView={body.inView} delay={180}>
            <div
              style={{
                background:"#fff",
                border:`1px solid rgba(179,138,34,0.2)`,
                borderRadius:18,
                padding:"36px 36px 32px",
                boxShadow:"0 8px 32px rgba(0,0,0,0.05)",
              }}
            >
              {sent ? (
                /* Success state */
                <div style={{ textAlign:"center", padding:"32px 0" }}>
                  <div style={{ width:56, height:56, borderRadius:"50%", background:`rgba(179,138,34,0.12)`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={RICH_GOLD} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  </div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:600, color:DARK, marginBottom:10 }}>Message Sent!</h3>
                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:400, color:MUTED, lineHeight:1.8, marginBottom:24 }}>
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name:"", email:"", phone:"", message:"" }); }}
                    style={{ fontFamily:"'Jost',sans-serif", fontSize:"10px", fontWeight:600, letterSpacing:"0.28em", textTransform:"uppercase", padding:"10px 28px", background:"transparent", color:DARK, border:`1.5px solid ${DARK}`, borderRadius:6, cursor:"pointer", transition:"all 0.28s ease" }}
                    onMouseEnter={e => { const b=e.currentTarget; b.style.background=DARK; b.style.color="#fff"; }}
                    onMouseLeave={e => { const b=e.currentTarget; b.style.background="transparent"; b.style.color=DARK; }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:24 }}>

                  <div style={{ textAlign:"center", marginBottom:4 }}>
                    <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:"0.48em", textTransform:"uppercase", color:RICH_GOLD }}>
                      Send a Message
                    </span>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="error-message">
                      ⚠️ {error}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name:e.target.value }))}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("name")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email:e.target.value }))}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("email")}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone:e.target.value }))}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("phone")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message:e.target.value }))}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("message"), resize:"none" } as React.CSSProperties}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      fontFamily:"'Jost',sans-serif",
                      fontSize:"11px",
                      fontWeight:700,
                      letterSpacing:"0.28em",
                      textTransform:"uppercase",
                      padding:"16px 32px",
                      background: sending ? `rgba(24,22,15,0.6)` : DARK,
                      color:"#fff",
                      border:"none",
                      borderRadius:7,
                      cursor: sending ? "not-allowed" : "pointer",
                      boxShadow:`0 10px 28px rgba(0,0,0,0.15)`,
                      transition:"all 0.3s ease",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      gap:10,
                    }}
                    onMouseEnter={e => { if(!sending){ const b=e.currentTarget; b.style.transform="scale(1.02) translateY(-1px)"; b.style.boxShadow="0 14px 36px rgba(0,0,0,0.25)"; b.style.background="#000"; }}}
                    onMouseLeave={e => { if(!sending){ const b=e.currentTarget; b.style.transform="scale(1)"; b.style.boxShadow="0 10px 28px rgba(0,0,0,0.15)"; b.style.background=DARK; }}}
                  >
                    {sending ? (
                      <><span className="ct-spinner"/><span>Sending...</span></>
                    ) : (
                      "Send Message →"
                    )}
                  </button>

                </form>
              )}
            </div>
          </FadeSlide>
        </div>
      </div>

      {/* ── Bottom gold strip ── */}
      <div style={{ marginTop:64, background:`rgba(179,138,34,0.08)`, borderTop:`1px solid rgba(179,138,34,0.15)`, padding:"28px 48px", textAlign:"center" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:32, flexWrap:"wrap" }}>
          <a href="mailto:yayaapparel05@gmail.com" style={{ fontFamily:"'Jost',sans-serif", fontSize:"12px", fontWeight:500, letterSpacing:"0.18em", color:DARK_STONE, textDecoration:"none", transition:"color 0.25s" }}
            onMouseEnter={e => (e.currentTarget.style.color = RICH_GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = DARK_STONE)}
          >
            yayaapparel05@gmail.com
          </a>
          <div style={{ width:4, height:4, borderRadius:"50%", background:`rgba(179,138,34,0.5)` }}/>
          <a href="tel:+919791024433" style={{ fontFamily:"'Jost',sans-serif", fontSize:"12px", fontWeight:500, letterSpacing:"0.18em", color:DARK_STONE, textDecoration:"none", transition:"color 0.25s" }}
            onMouseEnter={e => (e.currentTarget.style.color = RICH_GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = DARK_STONE)}
          >
            +91 97910 24433
          </a>
          <div style={{ width:4, height:4, borderRadius:"50%", background:`rgba(179,138,34,0.5)` }}/>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"12px", fontWeight:500, letterSpacing:"0.18em", color:DARK_STONE }}>
            Trichy, Tamil Nadu
          </span>
        </div>
      </div>
    </main>
  );
};

export default Contact;