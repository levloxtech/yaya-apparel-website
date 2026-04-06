import React from 'react';
import { Helmet } from 'react-helmet';

// Global Configuration
export const GLOBAL_SEO_CONFIG = {
  siteName: "YAYA Apparel",
  domain: "https://yayaapparel.com",
  siteUrl: "https://yayaapparel.com",
  logo: "https://yayaapparel.com/yaya-logo.png",
  businessName: "YAYA Apparel",
  businessType: "Fashion Retailer",
  businessPhone: "+91-9791024433",
  businessEmail: "yayaapparel05@gmail.com",
  businessAddress: "Trichy, Tamil Nadu, India",
  socialProfiles: {
    instagram: "https://www.instagram.com/yayaapparel",
    facebook: "https://www.facebook.com/yayaapparel",
    youtube: "https://www.youtube.com/@yayaapparel",
  },
  brandColor: "#b38a22",
  defaultOGImage: "https://yayaapparel.com/og-image-default.jpg",
};

// Page-Specific SEO Data
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
    keywords: "fashion blog, style tips, fashion articles, craft stories, sustainability fashion, Indian fashion, style guides, fashion trends",
    canonical: "https://yayaapparel.com/blog",
    ogImage: "https://yayaapparel.com/og-blog.jpg",
    ogType: "website",
    robots: "index, follow",
  },

  contact: {
    title: "Contact YAYA Apparel | Get in Touch - Fashion Support",
    description: "Contact YAYA Apparel for orders, collection enquiries, sizing help, and bulk orders. Email, phone, or message us. Quick response guaranteed.",
    keywords: "contact us, customer support, fashion enquiry, bulk orders, YAYA apparel contact, support email, phone number",
    canonical: "https://yayaapparel.com/contact",
    ogImage: "https://yayaapparel.com/og-contact.jpg",
    ogType: "website",
    robots: "index, follow",
  },
};

// Category SEO Data
export const CATEGORY_SEO_DATA = {
  womens_wear: {
    title: "Women's Wear | Premium Ethnic & Western Fashion | YAYA Apparel",
    description: "Shop YAYA Women's Wear - Co-ord sets, kurtas, lehengas, sarees, western dresses, and more. Handcrafted, premium quality, affordable prices.",
    keywords: "women's clothing, ethnic wear, western wear, kurta, lehenga, saree, co-ord sets, dresses, traditional wear",
  },
  western_wear: {
    title: "Western Wear | Dresses, Tops & Fashion | YAYA Apparel",
    description: "Explore YAYA Western Wear - Dresses, tops, jeans, skirts, jackets, co-ords, and more. Premium fabrics, modern designs, affordable luxury.",
    keywords: "western wear, dresses, tops, jeans, skirts, jackets, casual wear, modern fashion",
  },
  kids_boys: {
    title: "Kids Boys Fashion | Shirts, T-Shirts & Wear | YAYA Apparel",
    description: "YAYA Kids Boys Collection - Comfortable, stylish shirts, t-shirts, shorts, and more for active boys. Premium cotton, safe fabrics.",
    keywords: "boys clothing, kids wear, boys shirts, kids t-shirts, boys shorts, kids fashion",
  },
  kids_girls: {
    title: "Kids Girls Fashion | Frocks, Lehenga & Wear | YAYA Apparel",
    description: "YAYA Kids Girls Collection - Frocks, lehengas, tops, and stylish wear for girls. Premium quality, comfortable fabrics, ethnic and modern designs.",
    keywords: "girls clothing, kids fashion, girls lehenga, kids dresses, children's wear",
  },
  mens_wear: {
    title: "Men's Wear | Kurtas, Shirts & Fashion | YAYA Apparel",
    description: "YAYA Men's Wear - Premium kurtas, formal shirts, trousers, ethnic sets, and more. Handcrafted quality, modern cuts.",
    keywords: "men's clothing, men's fashion, kurta, formal shirts, trousers, ethnic wear",
  },
  nightwear: {
    title: "Nightwear | Comfortable Sleep & Lounge Wear | YAYA Apparel",
    description: "YAYA Nightwear - Night suits, sleep wear, loungewear, robes, and pajamas. Soft, breathable fabrics for comfortable sleep.",
    keywords: "nightwear, sleepwear, pajamas, lounge wear, night suits, comfortable clothing",
  },
};

// JSON-LD Structured Data
export const SCHEMA_MARKUP = {
  organization: {
    "@context": "https://schema.org/",
    "@type": "Organization",
    "name": "YAYA Apparel",
    "url": "https://yayaapparel.com/",
    "logo": "https://yayaapparel.com/yaya-logo.png",
    "description": "Premium fashion house offering handcrafted ethnic wear, western fashion, and kids clothing",
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
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Trichy",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    }
  },

  ecommerceBusiness: {
    "@context": "https://schema.org/",
    "@type": "ECommerceBusiness",
    "name": "YAYA Apparel",
    "url": "https://yayaapparel.com/",
    "description": "Online fashion retailer specializing in ethnic wear, western fashion, and kids clothing",
    "priceRange": "₹499 - ₹25000",
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "YAYA Apparel",
    "description": "Premium fashion house with handcrafted ethnic and western wear",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Trichy",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "url": "https://yayaapparel.com/",
    "telephone": "+91-9791024433",
    "email": "yayaapparel05@gmail.com",
  },

  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is YAYA Apparel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "YAYA Apparel is a premium fashion house offering handcrafted ethnic wear, western fashion, and kids clothing with traditional craftsmanship and modern design."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer international shipping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, YAYA Apparel ships to 50+ countries worldwide. Contact us for international shipping details."
        }
      },
      {
        "@type": "Question",
        "name": "What is your return policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer hassle-free returns within 14 days of delivery. Items must be in original condition with tags attached."
        }
      }
    ]
  }
};

// SEO Component
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
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="theme-color" content={GLOBAL_SEO_CONFIG.brandColor} />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      <html lang="en" />
      <link rel="alternate" hrefLang="en" href="https://yayaapparel.com/" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || GLOBAL_SEO_CONFIG.siteUrl} />
      <meta property="og:site_name" content={GLOBAL_SEO_CONFIG.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="apple-touch-icon" href={GLOBAL_SEO_CONFIG.logo} />

      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}

      {children}
    </Helmet>
  );
};

// Hook
export const useSEO = (pageKey: keyof typeof PAGE_SEO_DATA, schemaMarkup?: object) => {
  const pageData = PAGE_SEO_DATA[pageKey];
  return {
    ...pageData,
    schemaMarkup
  };
};

export default {
  GLOBAL_SEO_CONFIG,
  PAGE_SEO_DATA,
  CATEGORY_SEO_DATA,
  SCHEMA_MARKUP,
  SEO,
  useSEO,
};
