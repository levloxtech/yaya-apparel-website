/**
 * ═══════════════════════════════════════════════════════════════════════════
 * YAYA APPAREL — COMPLETE SEO OPTIMIZATION IMPLEMENTATION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This file provides ready-to-use SEO configurations for React Helmet
 * and integration instructions for all YAYA pages.
 * 
 * Components Covered:
 * - Home/Hero Section
 * - Lookbook Section
 * - Collections Section
 * - Blog/Journal Section
 * - Contact Section
 * - Product Pages
 */

import React from 'react';
import { Helmet } from 'react-helmet';

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL SEO CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export const GLOBAL_SEO_CONFIG = {
  siteName: "YAYA Apparel",
  domain: "https://yayaapparel.com",
  siteUrl: "https://yayaapparel.com",
  logo: "https://yayaapparel.com/yaya-logo.png",
  
  // Company info
  businessName: "YAYA Apparel",
  businessType: "Fashion Retailer",
  businessPhone: "+91-9791024433",
  businessEmail: "yayaapparel05@gmail.com",
  businessAddress: "Trichy, Tamil Nadu, India",
  
  // Social Media
  socialProfiles: {
    instagram: "https://www.instagram.com/yayaapparel",
    facebook: "https://www.facebook.com/yayaapparel",
    youtube: "https://www.youtube.com/@yayaapparel",
  },
  
  // Primary brand color
  brandColor: "#b38a22",
  
  // Default image for social sharing
  defaultOGImage: "https://yayaapparel.com/og-image-default.jpg",
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE-SPECIFIC SEO METADATA
// ═══════════════════════════════════════════════════════════════════════════

export const PAGE_SEO_DATA = {
  home: {
    title: "YAYA Apparel | Premium Ethnic & Western Fashion | Home",
    description: "Shop YAYA Apparel - Premium ethnic wear, western fashion, and kids clothing. Handcrafted quality, modern design, 200+ styles, fast delivery across 50+ countries.",
    keywords: "ethnic wear, women's fashion, men's wear, kids clothing, Indian apparel, premium fashion, traditional wear, contemporary fashion",
    canonical: "https://yayaapparel.com/",
    ogImage: "https://yayaapparel.com/og-home.jpg",
    ogType: "website",
    robots: "index, follow",
  },

  lookbook: {
    title: "YAYA Lookbook | Fashion Gallery & Style Inspiration",
    description: "Explore YAYA Lookbook - A curated visual gallery of our fashion collections, styling inspiration, and trend ideas for every occasion. 200+ styles across 8 categories.",
    keywords: "fashion lookbook, style inspiration, fashion gallery, outfit ideas, clothing trends, fashion photography, style guide, YAYA collections",
    canonical: "https://yayaapparel.com/lookbook",
    ogImage: "https://yayaapparel.com/og-lookbook.jpg",
    ogType: "website",
    robots: "index, follow",
  },

  collections: {
    title: "YAYA Collections | Premium Women's, Men's & Kids Fashion",
    description: "Explore YAYA Collections - Women's wear, Western fashion, Kids clothing, Men's wear, Nightwear, and more. 200+ handcrafted styles with fast delivery in India.",
    keywords: "women's clothing, men's fashion, kids wear, ethnic wear, western wear, co-ord sets, lehenga, kurta, saree, dresses, online shopping",
    canonical: "https://yayaapparel.com/collections",
    ogImage: "https://yayaapparel.com/og-collections.jpg",
    ogType: "website",
    robots: "index, follow",
  },

  blog: {
    title: "YAYA Journal | Fashion Blog, Style Tips & Craft Stories",
    description: "Read YAYA Journal - Fashion stories, styling guides, behind-the-scenes craft, sustainability updates, and lifestyle tips from YAYA Apparel.",
    keywords: "fashion blog, style tips, fashion articles, craft stories, sustainability fashion, Indian fashion, style guides, fashion trends, jewelry styling",
    canonical: "https://yayaapparel.com/blog",
    ogImage: "https://yayaapparel.com/og-blog.jpg",
    ogType: "website",
    robots: "index, follow",
  },

  contact: {
    title: "Contact YAYA Apparel | Get in Touch - Fashion Support",
    description: "Contact YAYA Apparel for orders, collection enquiries, sizing help, and bulk orders. Email, phone, or message us. Quick response guaranteed. Trichy, Tamil Nadu, India.",
    keywords: "contact us, customer support, fashion enquiry, bulk orders, YAYA apparel contact, support email, phone number",
    canonical: "https://yayaapparel.com/contact",
    ogImage: "https://yayaapparel.com/og-contact.jpg",
    ogType: "website",
    robots: "index, follow",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY-SPECIFIC SEO DATA
// ═══════════════════════════════════════════════════════════════════════════

export const CATEGORY_SEO_DATA = {
  womens_wear: {
    title: "Women's Wear | Premium Ethnic & Western Fashion | YAYA Apparel",
    description: "Shop YAYA Women's Wear - Co-ord sets, kurtas, lehengas, sarees, western dresses, and more. Handcrafted, premium quality, affordable prices. Free delivery in India.",
    keywords: "women's clothing, ethnic wear, western wear, kurta, lehenga, saree, co-ord sets, dresses, traditional wear, contemporary fashion",
  },

  western_wear: {
    title: "Western Wear | Dresses, Tops & Fashion | YAYA Apparel",
    description: "Explore YAYA Western Wear - Dresses, tops, jeans, skirts, jackets, co-ords, and more. Premium fabrics, modern designs, affordable luxury.",
    keywords: "western wear, dresses, tops, jeans, skirts, jackets, casual wear, modern fashion, women's western fashion",
  },

  kids_boys: {
    title: "Kids Boys Fashion | Shirts, T-Shirts & Wear | YAYA Apparel",
    description: "YAYA Kids Boys Collection - Comfortable, stylish shirts, t-shirts, shorts, and more for active boys. Premium cotton, safe fabrics, 2-14 years.",
    keywords: "boys clothing, kids wear, boys shirts, kids t-shirts, boys shorts, kids fashion, children's clothing",
  },

  kids_girls: {
    title: "Kids Girls Fashion | Frocks, Lehenga & Wear | YAYA Apparel",
    description: "YAYA Kids Girls Collection - Frocks, lehengas, tops, and stylish wear for girls. Premium quality, comfortable fabrics, ethnic and modern designs.",
    keywords: "girls clothing, kids fashion, girls lehenga, kids dresses, children's wear, girls ethnic wear",
  },

  mens_wear: {
    title: "Men's Wear | Kurtas, Shirts & Fashion | YAYA Apparel",
    description: "YAYA Men's Wear - Premium kurtas, formal shirts, trousers, ethnic sets, and more. Handcrafted quality, modern cuts, sizes S to 5XL.",
    keywords: "men's clothing, men's fashion, kurta, formal shirts, trousers, ethnic wear, men's traditional wear",
  },

  nightwear: {
    title: "Nightwear | Comfortable Sleep & Lounge Wear | YAYA Apparel",
    description: "YAYA Nightwear - Night suits, sleep wear, loungewear, robes, and pajamas. Soft, breathable fabrics for comfortable sleep.",
    keywords: "nightwear, sleepwear, pajamas, lounge wear, night suits, comfortable clothing, sleep fashion",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// JSON-LD STRUCTURED DATA SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════

export const SCHEMA_MARKUP = {
  // Organization Schema
  organization: {
    "@context": "https://schema.org/",
    "@type": "Organization",
    "name": "YAYA Apparel",
    "url": "https://yayaapparel.com/",
    "logo": "https://yayaapparel.com/yaya-logo.png",
    "description": "Premium fashion house offering handcrafted ethnic wear, western fashion, and kids clothing with traditional craftsmanship and modern design.",
    "image": "https://yayaapparel.com/og-image-default.jpg",
    "sameAs": [
      "https://www.instagram.com/yayaapparel",
      "https://www.facebook.com/yayaapparel",
      "https://www.youtube.com/@yayaapparel"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+91-9791024433",
      "email": "yayaapparel05@gmail.com",
      "url": "https://yayaapparel.com/contact"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Trichy",
      "addressLocality": "Trichy",
      "addressRegion": "Tamil Nadu",
      "postalCode": "620001",
      "addressCountry": "IN"
    }
  },

  // E-Commerce Business Schema
  ecommerceBusiness: {
    "@context": "https://schema.org/",
    "@type": "ECommerceBusiness",
    "name": "YAYA Apparel",
    "url": "https://yayaapparel.com/",
    "image": "https://yayaapparel.com/yaya-logo.png",
    "description": "Online fashion retailer specializing in ethnic wear, western fashion, and kids clothing",
    "priceRange": "₹499 - ₹25000",
    "acceptedPaymentMethod": ["CreditCard", "DebitCard", "UPI", "NetBanking"],
    "areaServed": [
      {
        "@type": "Country",
        "name": "IN"
      },
      {
        "@type": "Country",
        "name": "US"
      },
      {
        "@type": "Country",
        "name": "GB"
      }
    ]
  },

  // Product Schema Template (for collections)
  productTemplate: (name: string, image: string, description: string, price: number) => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": "YAYA Apparel"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://yayaapparel.com/collections",
      "priceCurrency": "INR",
      "price": price.toString(),
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "YAYA Apparel"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  }),

  // Local Business Schema
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "YAYA Apparel",
    "image": "https://yayaapparel.com/yaya-logo.png",
    "description": "Premium fashion house with handcrafted ethnic and western wear",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Trichy",
      "addressLocality": "Trichy",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "url": "https://yayaapparel.com/",
    "telephone": "+91-9791024433",
    "email": "yayaapparel05@gmail.com",
    "priceRange": "₹499 - ₹25000",
    "sameAs": [
      "https://www.instagram.com/yayaapparel",
      "https://www.facebook.com/yayaapparel"
    ]
  },

  // Breadcrumb Schema
  breadcrumb: (items: Array<{name: string, url: string}>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }),

  // FAQ Schema
  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is YAYA Apparel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "YAYA Apparel is a premium fashion house offering handcrafted ethnic wear, western fashion, and kids clothing with traditional craftsmanship and modern design, delivered across 50+ countries."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer international shipping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, YAYA Apparel ships to 50+ countries worldwide. Contact us for international shipping details and pricing."
        }
      },
      {
        "@type": "Question",
        "name": "What is your return policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer hassle-free returns within 14 days of delivery. Items must be in original condition with tags attached."
        }
      },
      {
        "@type": "Question",
        "name": "How long does delivery take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard delivery in India takes 5-7 business days. International orders take 15-30 days depending on destination."
        }
      },
      {
        "@type": "Question",
        "name": "Do you have physical stores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We operate primarily online with our headquarters in Trichy, Tamil Nadu. Contact us for special visits or appointments."
        }
      }
    ]
  },

  // Blog Post Schema Template
  blogPostTemplate: (title: string, excerpt: string, image: string, datePublished: string, author: string) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": excerpt,
    "image": image,
    "datePublished": datePublished,
    "author": {
      "@type": "Organization",
      "name": author
    }
  }),

  // Article Schema Template
  articleTemplate: (title: string, description: string, image: string, datePublished: string) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "author": {
      "@type": "Organization",
      "name": "YAYA Apparel"
    }
  })
};

// ═══════════════════════════════════════════════════════════════════════════
// REACT HELMET WRAPPER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
  schemaMarkup?: object;
  children?: React.ReactNode;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = GLOBAL_SEO_CONFIG.defaultOGImage,
  ogType = "website",
  robots = "index, follow",
  schemaMarkup,
  children
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="theme-color" content={GLOBAL_SEO_CONFIG.brandColor} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Language & Regional */}
      <html lang="en" />
      <link rel="alternate" hrefLang="en" href="https://yayaapparel.com/" />
      <link rel="alternate" hrefLang="en-IN" href="https://yayaapparel.com/" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || GLOBAL_SEO_CONFIG.siteUrl} />
      <meta property="og:site_name" content={GLOBAL_SEO_CONFIG.siteName} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@YAYAApparel" />
      <meta name="twitter:site" content="@YAYAApparel" />

      {/* Apple/Mobile */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <link rel="apple-touch-icon" href={GLOBAL_SEO_CONFIG.logo} />

      {/* Structured Data (JSON-LD) */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}

      {/* Google Tag Manager (if using) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR_GA_ID');
        `}
      </script>

      {children}
    </Helmet>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT-SPECIFIC SEO HOOKS
// ═══════════════════════════════════════════════════════════════════════════

export const useSEO = (pageKey: keyof typeof PAGE_SEO_DATA, schemaMarkup?: object) => {
  const pageData = PAGE_SEO_DATA[pageKey];
  return {
    ...pageData,
    schemaMarkup
  };
};

// ═══════════════════════════════════════════════════════════════════════════
// USAGE EXAMPLES FOR EACH PAGE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * HOME PAGE USAGE:
 * 
 * import { SEO, useSEO, SCHEMA_MARKUP } from '@/utils/seo';
 * 
 * export default function HomePage() {
 *   const seoData = useSEO('home', SCHEMA_MARKUP.organization);
 *   
 *   return (
 *     <>
 *       <SEO {...seoData} />
 *       {/* Your page content */}
 *     </>
 *   );
 * }
 */

/**
 * LOOKBOOK PAGE USAGE:
 * 
 * import { SEO, useSEO, SCHEMA_MARKUP } from '@/utils/seo';
 * 
 * export default function LookbookSection() {
 *   const seoData = useSEO('lookbook', SCHEMA_MARKUP.ecommerceBusiness);
 *   
 *   return (
 *     <>
 *       <SEO {...seoData} />
 *       {/* Lookbook content */}
 *     </>
 *   );
 * }
 */

/**
 * COLLECTIONS PAGE USAGE:
 * 
 * import { SEO, useSEO, SCHEMA_MARKUP } from '@/utils/seo';
 * 
 * export default function CollectionsSection() {
 *   const seoData = useSEO('collections', SCHEMA_MARKUP.ecommerceBusiness);
 *   
 *   return (
 *     <>
 *       <SEO {...seoData} />
 *       {/* Collections content */}
 *     </>
 *   );
 * }
 */

/**
 * BLOG PAGE USAGE:
 * 
 * import { SEO, useSEO, SCHEMA_MARKUP } from '@/utils/seo';
 * 
 * export default function BlogPage() {
 *   const seoData = useSEO('blog', SCHEMA_MARKUP.faqPage);
 *   
 *   return (
 *     <>
 *       <SEO {...seoData} />
 *       {/* Blog content */}
 *     </>
 *   );
 * }
 */

/**
 * CONTACT PAGE USAGE:
 * 
 * import { SEO, useSEO, SCHEMA_MARKUP } from '@/utils/seo';
 * 
 * export default function Contact() {
 *   const seoData = useSEO('contact', SCHEMA_MARKUP.localBusiness);
 *   
 *   return (
 *     <>
 *       <SEO {...seoData} />
 *       {/* Contact content */}
 *     </>
 *   );
 * }
 */

/**
 * CATEGORY PAGE USAGE (e.g., Women's Wear):
 * 
 * import { SEO, CATEGORY_SEO_DATA, SCHEMA_MARKUP } from '@/utils/seo';
 * 
 * export default function WomensWearPage() {
 *   const categoryData = CATEGORY_SEO_DATA.womens_wear;
 *   
 *   return (
 *     <>
 *       <SEO 
 *         title={categoryData.title}
 *         description={categoryData.description}
 *         keywords={categoryData.keywords}
 *         canonical="https://yayaapparel.com/collections#womens_wear"
 *         schemaMarkup={SCHEMA_MARKUP.ecommerceBusiness}
 *       />
 *       {/* Category content */}
 *     </>
 *   );
 * }
 */

// ═══════════════════════════════════════════════════════════════════════════
// ROBOTS.TXT CONTENT
// ═══════════════════════════════════════════════════════════════════════════

export const ROBOTS_TXT = `
User-agent: *
Allow: /
Allow: /collections
Allow: /lookbook
Allow: /blog
Allow: /contact

Disallow: /admin
Disallow: /dashboard
Disallow: /private
Disallow: /api/
Disallow: /*?filter=
Disallow: /*?sort=
Disallow: /*?page=

Crawl-delay: 1

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

Sitemap: https://yayaapparel.com/sitemap.xml
Sitemap: https://yayaapparel.com/sitemap-collections.xml
Sitemap: https://yayaapparel.com/sitemap-blog.xml
`;

// ═══════════════════════════════════════════════════════════════════════════
// SITEMAP.XML STRUCTURE
// ═══════════════════════════════════════════════════════════════════════════

export const SITEMAP_STRUCTURE = {
  mainPages: [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/collections", changefreq: "weekly", priority: 0.95 },
    { url: "/lookbook", changefreq: "bi-weekly", priority: 0.85 },
    { url: "/blog", changefreq: "weekly", priority: 0.80 },
    { url: "/contact", changefreq: "monthly", priority: 0.75 },
  ],

  categoryPages: [
    { slug: "womens_wear", priority: 0.90 },
    { slug: "western_wear", priority: 0.85 },
    { slug: "kids_boys", priority: 0.80 },
    { slug: "kids_girls", priority: 0.80 },
    { slug: "mens_wear", priority: 0.90 },
    { slug: "nightwear", priority: 0.75 },
    { slug: "innerwear_men", priority: 0.70 },
    { slug: "innerwear_women", priority: 0.70 },
  ],

  blogPosts: [
    // Add your blog post URLs here
    // { url: "/blog/how-yaya-was-born", priority: 0.80 },
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE SEO OPTIMIZATION GUIDELINES
// ═══════════════════════════════════════════════════════════════════════════

export const IMAGE_ALT_TEXT_TEMPLATES = {
  product: (productName: string, categoryName: string) => 
    `${productName} - YAYA ${categoryName} Collection`,
  
  collection: (collectionName: string) => 
    `YAYA ${collectionName} Collection - Premium Fashion`,
  
  lookbook: (lookbookTitle: string) => 
    `YAYA Lookbook - ${lookbookTitle}`,
  
  blog: (blogTitle: string) => 
    `YAYA Blog - ${blogTitle}`,
};

// ═══════════════════════════════════════════════════════════════════════════
// PERFORMANCE OPTIMIZATION CHECKLIST
// ═══════════════════════════════════════════════════════════════════════════

export const PERFORMANCE_CHECKLIST = {
  onPage: [
    "✓ Unique meta titles (50-60 characters)",
    "✓ Unique meta descriptions (120-160 characters)",
    "✓ H1 tag on every page",
    "✓ Proper heading hierarchy (H1 > H2 > H3)",
    "✓ Alt text on all images",
    "✓ Internal linking strategy",
    "✓ Keyword optimization (1-2% density)",
    "✓ Mobile responsive design",
    "✓ Fast page load times (< 3 seconds)",
    "✓ Canonical URLs set",
  ],

  technical: [
    "✓ XML sitemap submitted to Google",
    "✓ robots.txt configured",
    "✓ SSL certificate (HTTPS)",
    "✓ Structured data (JSON-LD) markup",
    "✓ Mobile-friendly design",
    "✓ Core Web Vitals optimized",
    "✓ Proper 301 redirects",
    "✓ No broken links",
    "✓ Clean URLs (no parameters)",
    "✓ Server response time < 200ms",
  ],

  content: [
    "✓ High-quality original content",
    "✓ Regular blog updates (2-4 per month)",
    "✓ Comprehensive guides",
    "✓ User intent matching",
    "✓ FAQ content",
    "✓ Long-form content (1500+ words)",
    "✓ Keyword variation & LSI keywords",
    "✓ Internal linking within content",
    "✓ Readability score > 60",
    "✓ Mobile-friendly content",
  ],

  monitoring: [
    "✓ Google Search Console setup",
    "✓ Google Analytics 4 tracking",
    "✓ Google My Business optimization",
    "✓ Weekly ranking tracking",
    "✓ Monthly traffic analysis",
    "✓ Quarterly backlink audit",
    "✓ Content performance review",
    "✓ CTR & impression tracking",
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// KEYWORD STRATEGY
// ═══════════════════════════════════════════════════════════════════════════

export const KEYWORD_STRATEGY = {
  brand: [
    "YAYA Apparel",
    "YAYA Fashion",
    "YAYA Collections",
  ],

  primary: [
    "ethnic wear India",
    "premium fashion",
    "women's fashion",
    "kids clothing",
    "men's wear",
    "western wear",
    "traditional clothing",
    "Indian fashion online",
  ],

  secondary: [
    "co-ord sets online",
    "sarees online",
    "lehenga designs",
    "kurta sets",
    "Indian dresses",
    "traditional wear",
    "fusion fashion",
    "kids fashion online",
  ],

  longTail: [
    "premium ethnic wear for women",
    "handcrafted kids clothing online",
    "modern fusion collection for families",
    "affordable luxury apparel India",
    "sustainable ethnic fashion",
    "contemporary traditional wear",
    "best ethnic wear brands India",
  ],

  location: [
    "fashion Tamil Nadu",
    "ethnic wear Trichy",
    "kids clothing India",
    "fashion brands India",
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// SOCIAL MEDIA SEO & HASHTAGS
// ═══════════════════════════════════════════════════════════════════════════

export const SOCIAL_MEDIA_STRATEGY = {
  instagram: {
    handle: "@yayaapparel",
    bioKeywords: "Premium Ethnic & Western Fashion | Kids Wear | Handcrafted Quality",
    hashtags: [
      "#YAYAApparel",
      "#EthnicWear",
      "#PremiumFashion",
      "#TraditionalCraft",
      "#IndianFashion",
      "#WomensFashion",
      "#KidsFashion",
      "#FashionDesigner",
      "#HandcraftedQuality",
      "#ModernFusion",
      "#FashionBlogger",
      "#StyleInspiration",
    ]
  },

  facebook: {
    handle: "yayaapparel",
    description: "Premium ethnic wear, western fashion, and kids clothing with traditional craftsmanship",
  },

  youtube: {
    handle: "@yayaapparel",
    keywords: [
      "YAYA Apparel",
      "ethnic wear styling",
      "fashion haul",
      "behind the scenes",
      "craft stories",
      "fashion tutorial",
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT ALL CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════

export default {
  GLOBAL_SEO_CONFIG,
  PAGE_SEO_DATA,
  CATEGORY_SEO_DATA,
  SCHEMA_MARKUP,
  SEO,
  useSEO,
  ROBOTS_TXT,
  SITEMAP_STRUCTURE,
  IMAGE_ALT_TEXT_TEMPLATES,
  PERFORMANCE_CHECKLIST,
  KEYWORD_STRATEGY,
  SOCIAL_MEDIA_STRATEGY,
};
