import { useState } from "react";

// --- Types ---
interface Category {
  id: string;
  label: string;
}

interface StyleItem {
  id: string;
  name: string;
  image: string;
}

interface CollectionData {
  [key: string]: StyleItem[];
}

// --- Constants ---
const INITIAL_VISIBLE = 12; // 6 cols × 2 rows on desktop
const LOAD_MORE_COUNT = 12; // how many more to load per click

// --- Data ---
const categories: Category[] = [
  { id: "womens_wear",     label: "Women's Wear" },
  { id: "western_wear",    label: "Western Wear" },
  { id: "kids_boys",       label: "Kids — Boys" },
  { id: "kids_girls",      label: "Kids — Girls" },
  { id: "mens_wear",       label: "Men's Wear" },
  { id: "nightwear",       label: "Nightwear" },
  { id: "innerwear_men",   label: "Innerwear — Men" },
  { id: "innerwear_women", label: "Innerwear — Women" },
];

const collections: CollectionData = {
  womens_wear: [
    { id: "coord_sets",      name: "Co-ord Sets",    image: "https://i.pinimg.com/1200x/dc/7d/26/dc7d26499b1a013e90c445deb4a70a34.jpg" },
    { id: "long_kurta",      name: "Long Kurta",     image: "https://i.pinimg.com/736x/ec/2d/70/ec2d70288dc5d34d913e7c6cd5123dab.jpg" },
    { id: "short_kurta",     name: "Short Kurta",    image: "https://i.pinimg.com/736x/d1/52/81/d15281894634d2079815cc1f03758f15.jpg" },
    { id: "bottom",          name: "Bottom",         image: "https://i.pinimg.com/1200x/49/f6/65/49f665c2a09556c6191145a913b3bc1f.jpg" },
    { id: "chudithar",       name: "Chudithar",      image: "https://i.pinimg.com/736x/79/e5/ce/79e5ce7904c38b554e758bb421b736ba.jpg" },
    { id: "palazzo",         name: "Palazzo",        image: "https://i.pinimg.com/1200x/f5/88/c4/f588c47bb3d21eb899eea8430eb9e61c.jpg" },
    { id: "cigarette_pants", name: "Cigarette Pants",image: "https://i.pinimg.com/736x/e5/66/22/e566225675219f472fba8a429f21bf70.jpg" },
    { id: "dupatta",         name: "Dupatta",        image: "https://i.pinimg.com/1200x/4b/b3/19/4bb3196e5f3bc6300d187ab61c70843e.jpg" },
    { id: "saree",           name: "Saree",          image: "https://i.pinimg.com/736x/de/eb/b3/deebb34ade30763c56b428160ec90c6c.jpg" },
    { id: "lehenga",         name: "Lehenga",        image: "https://i.pinimg.com/736x/ec/5b/69/ec5b691dcfd7cff36f8afe213f1a14f2.jpg" },
    { id: "anarkali",        name: "Anarkali",       image: "https://i.pinimg.com/736x/85/ed/1a/85ed1aafdd659b3fc988ddb8eebe9a56.jpg" },
    { id: "suit_set",        name: "Suit Set",       image: "https://i.pinimg.com/736x/04/19/84/04198442c4206f9351a72792a2ca64fa.jpg" },
    // revealed after Show More
    { id: "maxi_dress",      name: "Maxi Dress",     image: "https://i.pinimg.com/736x/c9/d1/b2/c9d1b24af5bcb97fcf6a944921792fe6.jpg" },
    { id: "sharara",         name: "Sharara",        image: "https://i.pinimg.com/736x/52/27/20/52272072d38f330090505fc1e975df8e.jpg" },
    { id: "kaftan",          name: "Kaftan",         image: "https://i.pinimg.com/736x/09/dc/2d/09dc2d2c9150e7061bb8f0e7c3f8735d.jpg" },
  ],
  western_wear: [
    { id: "tops",      name: "Tops",      image: "https://i.pinimg.com/736x/8d/1d/7c/8d1d7c8e51ce6eb662b9fbc75e8c46f8.jpg" },
    { id: "dresses",   name: "Dresses",   image: "https://i.pinimg.com/1200x/a5/a2/ee/a5a2eeee59d575de9e0a068a9d7a5b46.jpg" },
    { id: "jeans",     name: "Jeans",     image: "https://i.pinimg.com/736x/99/a7/8f/99a78f497112db3f9435b4b2e908ee9b.jpg" },
    { id: "skirts",    name: "Skirts",    image: "https://i.pinimg.com/736x/c5/b3/e4/c5b3e4f6de05344b7e70b2aa8dc4cfd1.jpg" },
    { id: "jackets",   name: "Jackets",   image: "https://i.pinimg.com/736x/e5/d4/38/e5d4385d765d0cc7d605288572ee5b32.jpg" },
    { id: "co_ords",   name: "Co-ords",   image: "https://i.pinimg.com/736x/d3/03/7d/d3037de6abf56f6c7df13a75c20563dc.jpg" },
    { id: "blazers_w", name: "Blazers",   image: "https://i.pinimg.com/736x/6e/d3/5d/6ed35d223caa744d06fd9a3d4b6d56af.jpg" },
    { id: "shorts_w",  name: "Shorts",    image: "https://i.pinimg.com/736x/29/3f/a9/293fa9757d2a81a449114ca7b44ea305.jpg" },
    { id: "jumpsuits", name: "Jumpsuits", image: "https://i.pinimg.com/736x/fb/bf/36/fbbf36eafe831220173c803e06a13249.jpg" },
    { id: "trousers_w",name: "Trousers",  image: "https://i.pinimg.com/1200x/bc/87/91/bc8791d7f16036b38328abacac87ca37.jpg" },
    { id: "crop_tops", name: "Crop Tops", image: "https://i.pinimg.com/736x/7c/77/3b/7c773baf0b663f129f2efb1102d6443f.jpg" },
    { id: "shrugs",    name: "Shrugs",    image: "https://i.pinimg.com/736x/d2/5f/0f/d25f0f6c02d1cacaea8798ca5b0e0d67.jpg" },
    { id: "tunics",    name: "Tunics",    image: "https://i.pinimg.com/736x/6b/02/9a/6b029a62d000be0b530611cef00e58a5.jpg" },
  ],
  kids_boys: [
    { id: "shirts_b",   name: "Shirts",   image: "https://i.pinimg.com/736x/ac/c2/0a/acc20a551da6b2309e42365b735c2fd5.jpg" },
    { id: "tshirts_b",  name: "T-Shirts", image: "https://i.pinimg.com/1200x/3a/d8/27/3ad827ff19dc639030610437be867cdf.jpg" },
    { id: "shorts_b",   name: "Shorts",   image: "https://i.pinimg.com/1200x/cb/16/87/cb16875a570029cbab3331a578fbdbdf.jpg" },
    { id: "trousers_b", name: "Trousers", image: "https://i.pinimg.com/1200x/81/d8/73/81d873cc81c0cc106dd36ca1589fc613.jpg" },
    { id: "kurta_b",    name: "Kurta",    image: "https://i.pinimg.com/736x/63/82/ce/6382ce20e8528854427ac9ed83163100.jpg" },
    { id: "jeans_b",    name: "Jeans",    image: "https://i.pinimg.com/1200x/fc/4d/69/fc4d69d2e58160a8d8d296b4105c9449.jpg" },
  ],
  kids_girls: [
    { id: "frocks",     name: "Frocks",   image: "https://i.pinimg.com/736x/1b/8b/90/1b8b901e346e990ad7086bb9a8190c7f.jpg" },
    { id: "lehenga_g",  name: "Lehenga",  image: "https://i.pinimg.com/736x/63/38/b4/6338b44f3ca6a03b036e7a90016ec552.jpg" },
    { id: "tops_g",     name: "Tops",     image: "https://i.pinimg.com/736x/8d/0c/08/8d0c08028cc9fe22bda7fefaf4f671cd.jpg" },
    { id: "skirts_g",   name: "Skirts",   image: "https://i.pinimg.com/736x/e5/78/ea/e578ea978d7d6fcb57139eb198f00b96.jpg" },
    { id: "kurta_g",    name: "Kurta",    image: "https://i.pinimg.com/1200x/4e/59/a2/4e59a27664362e459f2815ddfce7e207.jpg" },
    { id: "jumpsuit_g", name: "Jumpsuit", image: "https://i.pinimg.com/736x/30/f4/00/30f400e91c6bdac204386a232355b5bf.jpg" },
  ],
  mens_wear: [
    { id: "kurta_m",       name: "Kurta",        image: "https://i.pinimg.com/736x/1c/d3/e9/1cd3e9127b00a4fa8584c31beb20aaa2.jpg" },
    { id: "formal_shirts", name: "Formal Shirts", image: "https://i.pinimg.com/736x/ae/1a/2e/ae1a2e1c96027c5f2904a1ae35c4eabc.jpg" },
    { id: "trousers_m",    name: "Trousers",      image: "https://i.pinimg.com/736x/ba/86/7b/ba867b94aa8438d30d934173fd0ba194.jpg" },
    { id: "dhoti",         name: "Dhoti",         image: "https://i.pinimg.com/736x/28/9c/7f/289c7f0e2417891f2c57dd50fd8884df.jpg" },
    { id: "blazers_m",     name: "Blazers",       image: "https://i.pinimg.com/736x/46/fa/b9/46fab91c8597b9965436fcb073503a15.jpg" },
    { id: "jeans_m",       name: "Jeans",         image: "https://i.pinimg.com/736x/43/aa/8b/43aa8bab7578e639c59cf509ce7fbd24.jpg" },
    { id: "tshirts_m",     name: "T-Shirts",      image: "https://i.pinimg.com/1200x/15/03/31/1503313ff7961b9feb0520a114042a63.jpg" },
    { id: "ethnic_set",    name: "Ethnic Set",    image: "https://i.pinimg.com/736x/2a/e3/d5/2ae3d50151b86148835ac39e134dc218.jpg" },
  ],
  nightwear: [
    { id: "night_suit",   name: "Night Suit",   image: "https://i.pinimg.com/1200x/eb/b3/b9/ebb3b97b1bdaeeb9f06faaaa0cc48aba.jpg" },
    { id: "sleep_shorts", name: "Sleep Shorts", image: "https://i.pinimg.com/1200x/7f/1b/6f/7f1b6f7de586a80c25139d4eacd1a01a.jpg" },
    { id: "nighty",       name: "Nighty",       image: "https://i.pinimg.com/1200x/fd/b7/45/fdb745758617abcd75b7cbbb6a65386f.jpg" },
    { id: "robe",         name: "Robe",         image: "https://i.pinimg.com/736x/2a/a1/2d/2aa12dea0238ca75c414010ab538a8cb.jpg" },
    { id: "pyjama_set",   name: "Pyjama Set",   image: "https://i.pinimg.com/1200x/41/c2/78/41c278f984587110ef3a9978fe47950c.jpg" },
    { id: "lounge_wear",  name: "Lounge Wear",  image: "https://i.pinimg.com/736x/c5/f5/67/c5f5679c953d065e197621b1f6946ab5.jpg" },
  ],
  innerwear_men: [
    { id: "vest_m",   name: "Vest",   image: "https://i.pinimg.com/1200x/81/a4/06/81a406770951c3a1123732d02748ca8e.jpg" },
    { id: "briefs_m", name: "Briefs", image: "https://i.pinimg.com/1200x/d3/6a/26/d36a262d87af1f48efdc32c1e59e24f3.jpg" },
    { id: "boxers_m", name: "Boxers", image: "https://i.pinimg.com/736x/9c/c3/44/9cc3444a27d108df5315808338bb8bbf.jpg" },
    { id: "trunks_m", name: "Trunks", image: "https://i.pinimg.com/736x/30/6b/dc/306bdc6595b90af7962425b670cf6355.jpg" },
  ],
  innerwear_women: [
    { id: "bra_w",       name: "Bra",       image: "https://i.pinimg.com/1200x/1f/b0/91/1fb09124cc600b90ddf59595f6cb055f.jpg" },
    { id: "panties_w",   name: "Panties",   image: "https://i.pinimg.com/736x/e9/f8/ac/e9f8ac63064bb1cb7313dd638fb62265.jpg" },
    { id: "camisole_w",  name: "Camisole",  image: "https://i.pinimg.com/1200x/98/ef/6d/98ef6d1e0fc3cc76360b03257e64c0d7.jpg" },
    { id: "shapewear_w", name: "Shapewear", image: "https://i.pinimg.com/1200x/f0/82/ce/f082ce59326a0aba4f0eb3130dfe5670.jpg" },
  ],
};

// --- Component ---
export default function CollectionsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("womens_wear");
  const [hoveredItem, setHoveredItem]       = useState<string | null>(null);
  const [visibleCount, setVisibleCount]     = useState<number>(INITIAL_VISIBLE);

  const activeLabel  = categories.find((c) => c.id === activeCategory)?.label ?? "";
  const allItems     = collections[activeCategory] ?? [];
  const styleCount   = allItems.length;
  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore      = visibleCount < allItems.length;
  const isExpanded   = visibleCount > INITIAL_VISIBLE;

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setVisibleCount(INITIAL_VISIBLE); // reset on tab switch
  };

  return (
    <section id="collections" className="collections-section">

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h2 className="collections-heading">Collections</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "14px" }}>
          <span style={{ display: "block", width: "40px", height: "1px", background: "#B8965A" }} />
          <span style={{ display: "block", width: "6px", height: "6px", borderRadius: "50%", background: "#B8965A" }} />
          <span style={{ display: "block", width: "40px", height: "1px", background: "#B8965A" }} />
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="category-pills">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`pill-btn ${isActive ? "pill-active" : ""}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── Section Title Row ── */}
      <div className="section-title-row">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ display: "block", width: "4px", height: "24px", background: "#B8965A", borderRadius: "2px" }} />
          <h3 className="section-label">{activeLabel}</h3>
        </div>
        <span className="style-count-badge">{styleCount} Styles</span>
      </div>

      {/* ── Grid ── */}
      <div className="collections-grid">
        {visibleItems.map((item) => {
          const isHovered = hoveredItem === item.id;
          return (
            <div
              key={item.id}
              className="collection-card"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                boxShadow: isHovered ? "0 16px 40px rgba(90,60,20,0.18)" : "0 4px 16px rgba(90,60,20,0.07)",
                transform: isHovered ? "translateY(-4px) scale(1.015)" : "translateY(0) scale(1)",
              }}
            >
              {/* Image */}
              <div className="card-image-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img"
                  style={{ transform: isHovered ? "scale(1.07)" : "scale(1)" }}
                />
                <div className="card-overlay" style={{ opacity: isHovered ? 1 : 0 }}>
                  <span className="explore-label">Explore</span>
                </div>
              </div>
              {/* Label */}
              <div
                className="card-label-wrap"
                style={{ borderTop: isHovered ? "2px solid #B8965A" : "2px solid transparent" }}
              >
                <p
                  className="card-label-text"
                  style={{ color: isHovered ? "#B8965A" : "#2C2018" }}
                >
                  {item.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Show More / Show Less ── */}
      {allItems.length > INITIAL_VISIBLE && (
        <div className="show-more-row">
          {hasMore && (
            <button className="show-more-btn" onClick={() => setVisibleCount((v) => v + LOAD_MORE_COUNT)}>
              Show More
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: "8px", verticalAlign: "middle" }}>
                <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {!hasMore && isExpanded && (
            <button className="show-more-btn show-less-btn" onClick={() => setVisibleCount(INITIAL_VISIBLE)}>
              Show Less
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: "8px", verticalAlign: "middle" }}>
                <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}

      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@500;600;700&display=swap');

        .collections-section {
          background: #F5F0E8;
          min-height: 100vh;
          padding: 64px 48px 80px;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .collections-heading {
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 400;
          letter-spacing: 0.02em;
          color: #1A1410;
          margin: 0;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        /* ── Pills ── */
        .category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 52px;
        }
        .pill-btn {
          padding: 10px 22px;
          border-radius: 999px;
          border: 1.5px solid #C8B89A;
          background: transparent;
          color: #5A4A3A;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.22s ease;
          outline: none;
        }
        .pill-btn:hover { background: #EDE3D3; }
        .pill-active {
          background: #B8965A !important;
          color: #fff !important;
          border-color: #B8965A !important;
        }

        /* ── Title row ── */
        .section-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }
        .section-label {
          margin: 0;
          font-size: 1.45rem;
          font-weight: 400;
          font-style: italic;
          color: #1A1410;
          font-family: 'Cormorant Garamond', Georgia, serif;
          letter-spacing: 0.02em;
        }
        .style-count-badge {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8A7A6A;
          font-family: 'Montserrat', sans-serif;
          border: 1.5px solid #C8B89A;
          border-radius: 999px;
          padding: 5px 14px;
        }

        /* ── Grid — Desktop: 6 cols × 2 rows ── */
        .collections-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
        }

        /* ── Grid — Tablet: 3 cols ── */
        @media (max-width: 1100px) {
          .collections-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }

        /* ── Grid — Mobile: 2 cols × 4 rows ── */
        @media (max-width: 640px) {
          .collections-section { padding: 40px 16px 60px; }
          .collections-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .pill-btn { padding: 8px 14px; font-size: 0.65rem; }
          .section-label { font-size: 1.2rem; }
        }

        /* ── Card ── */
        .collection-card {
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: #EDE3D3;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .card-image-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3/4;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26,20,10,0.28);
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .explore-label {
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: 'Montserrat', sans-serif;
          border-bottom: 1.5px solid #B8965A;
          padding-bottom: 3px;
        }
        .card-label-wrap {
          padding: 14px 18px 16px;
          background: #fff;
          transition: border-color 0.25s ease;
        }
        .card-label-text {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 400;
          font-family: 'Cormorant Garamond', Georgia, serif;
          letter-spacing: 0.03em;
          transition: color 0.25s ease;
        }

        /* ── Show More ── */
        .show-more-row {
          display: flex;
          justify-content: center;
          margin-top: 44px;
        }
        .show-more-btn {
          display: inline-flex;
          align-items: center;
          padding: 13px 40px;
          border-radius: 999px;
          border: 1.5px solid #B8965A;
          background: transparent;
          color: #B8965A;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.25s ease;
          outline: none;
        }
        .show-more-btn:hover { background: #B8965A; color: #fff; }
        .show-less-btn { border-color: #8A7A6A; color: #8A7A6A; }
        .show-less-btn:hover { background: #8A7A6A; color: #fff; }
      `}</style>
    </section>
  );
}