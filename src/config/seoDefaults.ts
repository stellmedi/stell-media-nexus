
export interface PageSEODefaults {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export interface GlobalSEOConfig {
  googleAnalyticsId: string;
  googleSearchConsoleVerification: string;
  googleTagManagerId: string;
  bingWebmasterVerification: string;
  facebookDomainVerification: string;
}

export const seoDefaults: Record<string, PageSEODefaults> = {
  "/": {
    metaTitle: "Stell Media | E-commerce Optimization & Product Discovery Experts",
    metaDescription: "Transform your e-commerce platform with Stell Media's AI-powered product discovery, search optimization, and conversion enhancement services. Boost sales with data-driven solutions.",
    keywords: "e-commerce optimization, product discovery, search optimization, conversion optimization, AI-powered solutions, data enrichment",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "Stell Media | E-commerce Optimization & Product Discovery Experts",
    ogDescription: "Transform your e-commerce platform with Stell Media's AI-powered product discovery, search optimization, and conversion enhancement services. Boost sales with data-driven solutions.",
    twitterTitle: "Stell Media | E-commerce Optimization & Product Discovery Experts",
    twitterDescription: "Transform your e-commerce platform with Stell Media's AI-powered product discovery, search optimization, and conversion enhancement services. Boost sales with data-driven solutions.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/about": {
    metaTitle: "About Stell Media | E-commerce Optimization Experts",
    metaDescription: "Learn about Stell Media's mission to transform e-commerce through innovative product discovery and optimization solutions. Meet our expert team.",
    keywords: "about stell media, e-commerce experts, product discovery team, optimization specialists",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "About Stell Media | E-commerce Optimization Experts",
    ogDescription: "Learn about Stell Media's mission to transform e-commerce through innovative product discovery and optimization solutions. Meet our expert team.",
    twitterTitle: "About Stell Media | E-commerce Optimization Experts",
    twitterDescription: "Learn about Stell Media's mission to transform e-commerce through innovative product discovery and optimization solutions. Meet our expert team.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/services": {
    metaTitle: "E-commerce Services | Product Discovery & Optimization | Stell Media",
    metaDescription: "Explore Stell Media's comprehensive e-commerce services: product discovery, search optimization, data enrichment, SEO, and conversion optimization.",
    keywords: "e-commerce services, product discovery services, search optimization, data enrichment, SEO services, conversion optimization",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "E-commerce Services | Product Discovery & Optimization | Stell Media",
    ogDescription: "Explore Stell Media's comprehensive e-commerce services: product discovery, search optimization, data enrichment, SEO, and conversion optimization.",
    twitterTitle: "E-commerce Services | Product Discovery & Optimization | Stell Media",
    twitterDescription: "Explore Stell Media's comprehensive e-commerce services: product discovery, search optimization, data enrichment, SEO, and conversion optimization.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/services/seo": {
    metaTitle: "Expert E-commerce SEO Services | Data-Driven Results | Stell Media",
    metaDescription: "Boost your e-commerce visibility with Stell Media's data-driven SEO strategies. Our technical expertise improves rankings, increases organic traffic, and maximizes ROI for large product catalogs.",
    keywords: "e-commerce SEO, product catalog optimization, technical SEO, organic traffic, search ranking improvement, structured data, schema markup, e-commerce visibility",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "Expert E-commerce SEO Services | Data-Driven Results | Stell Media",
    ogDescription: "Boost your e-commerce visibility with Stell Media's data-driven SEO strategies. Our technical expertise improves rankings, increases organic traffic, and maximizes ROI for large product catalogs.",
    twitterTitle: "Expert E-commerce SEO Services | Data-Driven Results | Stell Media",
    twitterDescription: "Boost your e-commerce visibility with Stell Media's data-driven SEO strategies. Our technical expertise improves rankings, increases organic traffic, and maximizes ROI for large product catalogs.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/services/product-discovery": {
    metaTitle: "Product Discovery Optimization | AI-Powered Search Solutions | Stell Media",
    metaDescription: "Enhance customer experience with AI-powered product discovery solutions. Improve search relevance, increase conversions, and boost customer satisfaction.",
    keywords: "product discovery, AI search, search optimization, product recommendations, customer experience, e-commerce search",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "Product Discovery Optimization | AI-Powered Search Solutions | Stell Media",
    ogDescription: "Enhance customer experience with AI-powered product discovery solutions. Improve search relevance, increase conversions, and boost customer satisfaction.",
    twitterTitle: "Product Discovery Optimization | AI-Powered Search Solutions | Stell Media",
    twitterDescription: "Enhance customer experience with AI-powered product discovery solutions. Improve search relevance, increase conversions, and boost customer satisfaction.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/services/data-enrichment": {
    metaTitle: "Data Enrichment Services | Product Data Optimization | Stell Media",
    metaDescription: "Improve your product data quality with Stell Media's data enrichment services. Enhance product descriptions, attributes, and metadata for better performance.",
    keywords: "data enrichment, product data quality, data optimization, product attributes, metadata enhancement",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "Data Enrichment Services | Product Data Optimization | Stell Media",
    ogDescription: "Improve your product data quality with Stell Media's data enrichment services. Enhance product descriptions, attributes, and metadata for better performance.",
    twitterTitle: "Data Enrichment Services | Product Data Optimization | Stell Media",
    twitterDescription: "Improve your product data quality with Stell Media's data enrichment services. Enhance product descriptions, attributes, and metadata for better performance.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/services/sem": {
    metaTitle: "SEM Services | Search Engine Marketing | Stell Media",
    metaDescription: "Maximize your e-commerce ROI with strategic SEM campaigns. Expert management of Google Ads, Bing Ads, and shopping campaigns for optimal performance.",
    keywords: "SEM services, search engine marketing, Google Ads, Bing Ads, shopping campaigns, paid search",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "SEM Services | Search Engine Marketing | Stell Media",
    ogDescription: "Maximize your e-commerce ROI with strategic SEM campaigns. Expert management of Google Ads, Bing Ads, and shopping campaigns for optimal performance.",
    twitterTitle: "SEM Services | Search Engine Marketing | Stell Media",
    twitterDescription: "Maximize your e-commerce ROI with strategic SEM campaigns. Expert management of Google Ads, Bing Ads, and shopping campaigns for optimal performance.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/services/conversion-optimization": {
    metaTitle: "Conversion Rate Optimization | CRO Services | Stell Media",
    metaDescription: "Increase your e-commerce conversion rates with data-driven CRO strategies. A/B testing, user experience optimization, and performance analytics.",
    keywords: "conversion rate optimization, CRO services, A/B testing, user experience optimization, conversion analytics",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "Conversion Rate Optimization | CRO Services | Stell Media",
    ogDescription: "Increase your e-commerce conversion rates with data-driven CRO strategies. A/B testing, user experience optimization, and performance analytics.",
    twitterTitle: "Conversion Rate Optimization | CRO Services | Stell Media",
    twitterDescription: "Increase your e-commerce conversion rates with data-driven CRO strategies. A/B testing, user experience optimization, and performance analytics.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/blog": {
    metaTitle: "E-commerce Blog | Optimization Tips & Insights | Stell Media",
    metaDescription: "Stay updated with the latest e-commerce optimization trends, tips, and insights from Stell Media's experts. Learn about product discovery, SEO, and conversion strategies.",
    keywords: "e-commerce blog, optimization tips, product discovery insights, SEO strategies, conversion optimization",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "E-commerce Blog | Optimization Tips & Insights | Stell Media",
    ogDescription: "Stay updated with the latest e-commerce optimization trends, tips, and insights from Stell Media's experts. Learn about product discovery, SEO, and conversion strategies.",
    twitterTitle: "E-commerce Blog | Optimization Tips & Insights | Stell Media",
    twitterDescription: "Stay updated with the latest e-commerce optimization trends, tips, and insights from Stell Media's experts. Learn about product discovery, SEO, and conversion strategies.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/contact": {
    metaTitle: "Contact Stell Media | E-commerce Optimization Consultation",
    metaDescription: "Get in touch with Stell Media for expert e-commerce optimization consultation. Let's discuss how we can improve your product discovery and conversion rates.",
    keywords: "contact stell media, e-commerce consultation, optimization consultation, product discovery help",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "Contact Stell Media | E-commerce Optimization Consultation",
    ogDescription: "Get in touch with Stell Media for expert e-commerce optimization consultation. Let's discuss how we can improve your product discovery and conversion rates.",
    twitterTitle: "Contact Stell Media | E-commerce Optimization Consultation",
    twitterDescription: "Get in touch with Stell Media for expert e-commerce optimization consultation. Let's discuss how we can improve your product discovery and conversion rates.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/careers": {
    metaTitle: "Careers at Stell Media | Join Our E-commerce Optimization Team",
    metaDescription: "Join Stell Media's team of e-commerce optimization experts. Explore career opportunities in product discovery, SEO, data science, and more.",
    keywords: "stell media careers, e-commerce jobs, optimization specialist jobs, product discovery careers",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "Careers at Stell Media | Join Our E-commerce Optimization Team",
    ogDescription: "Join Stell Media's team of e-commerce optimization experts. Explore career opportunities in product discovery, SEO, data science, and more.",
    twitterTitle: "Careers at Stell Media | Join Our E-commerce Optimization Team",
    twitterDescription: "Join Stell Media's team of e-commerce optimization experts. Explore career opportunities in product discovery, SEO, data science, and more.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/case-studies": {
    metaTitle: "Case Studies | E-commerce Success Stories | Stell Media",
    metaDescription: "Explore real-world examples of how Stell Media has helped e-commerce businesses improve their product discovery, SEO, and conversion rates.",
    keywords: "case studies, e-commerce success stories, optimization results, product discovery case studies",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "Case Studies | E-commerce Success Stories | Stell Media",
    ogDescription: "Explore real-world examples of how Stell Media has helped e-commerce businesses improve their product discovery, SEO, and conversion rates.",
    twitterTitle: "Case Studies | E-commerce Success Stories | Stell Media",
    twitterDescription: "Explore real-world examples of how Stell Media has helped e-commerce businesses improve their product discovery, SEO, and conversion rates.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  },
  "/faq": {
    metaTitle: "FAQ | E-commerce Optimization Questions | Stell Media",
    metaDescription: "Find answers to frequently asked questions about Stell Media's e-commerce optimization services, product discovery, SEO, and conversion strategies.",
    keywords: "FAQ, e-commerce optimization questions, product discovery FAQ, SEO questions",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    ogTitle: "FAQ | E-commerce Optimization Questions | Stell Media",
    ogDescription: "Find answers to frequently asked questions about Stell Media's e-commerce optimization services, product discovery, SEO, and conversion strategies.",
    twitterTitle: "FAQ | E-commerce Optimization Questions | Stell Media",
    twitterDescription: "Find answers to frequently asked questions about Stell Media's e-commerce optimization services, product discovery, SEO, and conversion strategies.",
    twitterImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
  }
};

export function getPageDefaults(pagePath: string): PageSEODefaults | null {
  return seoDefaults[pagePath] || null;
}

export function getGlobalSEOConfig(): GlobalSEOConfig {
  try {
    const savedConfig = localStorage.getItem('stellmedia_global_seo');
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
  } catch (error) {
    console.error('Error loading global SEO config:', error);
  }
  
  // Return defaults if no saved config
  return {
    googleAnalyticsId: '',
    googleSearchConsoleVerification: '',
    googleTagManagerId: '',
    bingWebmasterVerification: '',
    facebookDomainVerification: ''
  };
}

export function saveGlobalSEOConfig(config: GlobalSEOConfig): boolean {
  try {
    localStorage.setItem('stellmedia_global_seo', JSON.stringify(config));
    
    // Dispatch custom event to notify components
    const configUpdateEvent = new CustomEvent('globalSEOConfigUpdated', {
      detail: config
    });
    window.dispatchEvent(configUpdateEvent);
    
    return true;
  } catch (error) {
    console.error('Error saving global SEO config:', error);
    return false;
  }
}
