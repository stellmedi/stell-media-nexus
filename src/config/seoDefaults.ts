export interface PageSEODefaults {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  // AI SEO specific fields
  aiContentType?: string;
  aiExpertise?: string;
  aiServiceFocus?: string;
  aiTargetAudience?: string;
  aiContentFormat?: string;
}

export interface GlobalSEOConfig {
  googleAnalyticsId: string;
  googleSearchConsoleVerification: string;
  googleTagManagerId: string;
  // AI SEO global settings
  enableAISEO: boolean;
  aiCrawlerInstructions: string;
  perplexityOptimization: boolean;
  chatgptOptimization: boolean;
}

export const seoDefaults: Record<string, PageSEODefaults> = {
  "/": {
    metaTitle: "Stell Media | E-commerce Optimization & Product Discovery Experts",
    metaDescription: "Transform your e-commerce platform with Stell Media's AI-powered product discovery, search optimization, and conversion enhancement services. Boost sales with data-driven solutions.",
    keywords: "e-commerce optimization, product discovery, search optimization, conversion optimization, AI-powered solutions, data enrichment",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "e-commerce optimization services",
    aiExpertise: "product discovery, search optimization, conversion optimization, SEO, SEM, data enrichment",
    aiServiceFocus: "e-commerce platform optimization and configuration",
    aiTargetAudience: "e-commerce businesses, online retailers, digital marketers",
    aiContentFormat: "service landing page"
  },
  "/about": {
    metaTitle: "About Stell Media | E-commerce Optimization Experts",
    metaDescription: "Learn about Stell Media's mission to transform e-commerce through innovative product discovery and optimization solutions. Meet our expert team.",
    keywords: "about stell media, e-commerce experts, product discovery team, optimization specialists",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "company information",
    aiExpertise: "e-commerce optimization, team expertise, company mission",
    aiServiceFocus: "company background and team credentials",
    aiTargetAudience: "potential clients, partners, job seekers",
    aiContentFormat: "about page"
  },
  "/services": {
    metaTitle: "E-commerce Services | Product Discovery & Optimization | Stell Media",
    metaDescription: "Explore Stell Media's comprehensive e-commerce services: product discovery, search optimization, data enrichment, SEO, and conversion optimization.",
    keywords: "e-commerce services, product discovery services, search optimization, data enrichment, SEO services, conversion optimization",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "service catalog",
    aiExpertise: "comprehensive e-commerce optimization services",
    aiServiceFocus: "full-service e-commerce optimization offerings",
    aiTargetAudience: "e-commerce businesses seeking optimization services",
    aiContentFormat: "services overview page"
  },
  "/services/seo": {
    metaTitle: "Expert E-commerce SEO Services | Data-Driven Results | Stell Media",
    metaDescription: "Boost your e-commerce visibility with Stell Media's data-driven SEO strategies. Our technical expertise improves rankings, increases organic traffic, and maximizes ROI for large product catalogs.",
    keywords: "e-commerce SEO, product catalog optimization, technical SEO, organic traffic, search ranking improvement, structured data, schema markup, e-commerce visibility",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "SEO services",
    aiExpertise: "e-commerce SEO, technical SEO, product catalog optimization, structured data",
    aiServiceFocus: "search engine optimization for e-commerce platforms",
    aiTargetAudience: "e-commerce businesses seeking SEO improvement",
    aiContentFormat: "service detail page"
  },
  "/services/product-discovery": {
    metaTitle: "Product Discovery Optimization | AI-Powered Search Solutions | Stell Media",
    metaDescription: "Enhance customer experience with AI-powered product discovery solutions. Improve search relevance, increase conversions, and boost customer satisfaction.",
    keywords: "product discovery, AI search, search optimization, product recommendations, customer experience, e-commerce search",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "product discovery services",
    aiExpertise: "AI-powered search, product discovery optimization, search relevance",
    aiServiceFocus: "enhancing product findability and customer experience",
    aiTargetAudience: "e-commerce businesses with large product catalogs",
    aiContentFormat: "service detail page"
  },
  "/services/data-enrichment": {
    metaTitle: "Data Enrichment Services | Product Data Optimization | Stell Media",
    metaDescription: "Improve your product data quality with Stell Media's data enrichment services. Enhance product descriptions, attributes, and metadata for better performance.",
    keywords: "data enrichment, product data quality, data optimization, product attributes, metadata enhancement",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "data enrichment services",
    aiExpertise: "product data optimization, metadata enhancement, data quality improvement",
    aiServiceFocus: "improving product data quality and structure",
    aiTargetAudience: "e-commerce businesses with poor product data quality",
    aiContentFormat: "service detail page"
  },
  "/services/sem": {
    metaTitle: "SEM Services | Search Engine Marketing | Stell Media",
    metaDescription: "Maximize your e-commerce ROI with strategic SEM campaigns. Expert management of Google Ads, Bing Ads, and shopping campaigns for optimal performance.",
    keywords: "SEM services, search engine marketing, Google Ads, Bing Ads, shopping campaigns, paid search",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "search engine marketing services",
    aiExpertise: "paid search, Google Ads, Bing Ads, shopping campaigns, SEM strategy",
    aiServiceFocus: "maximizing ROI through strategic paid search campaigns",
    aiTargetAudience: "e-commerce businesses seeking paid search optimization",
    aiContentFormat: "service detail page"
  },
  "/services/conversion-optimization": {
    metaTitle: "Conversion Rate Optimization | CRO Services | Stell Media",
    metaDescription: "Increase your e-commerce conversion rates with data-driven CRO strategies. A/B testing, user experience optimization, and performance analytics.",
    keywords: "conversion rate optimization, CRO services, A/B testing, user experience optimization, conversion analytics",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "conversion optimization services",
    aiExpertise: "conversion rate optimization, A/B testing, user experience optimization",
    aiServiceFocus: "increasing conversion rates through data-driven optimization",
    aiTargetAudience: "e-commerce businesses with low conversion rates",
    aiContentFormat: "service detail page"
  },
  "/blog": {
    metaTitle: "E-commerce Blog | Optimization Tips & Insights | Stell Media",
    metaDescription: "Stay updated with the latest e-commerce optimization trends, tips, and insights from Stell Media's experts. Learn about product discovery, SEO, and conversion strategies.",
    keywords: "e-commerce blog, optimization tips, product discovery insights, SEO strategies, conversion optimization",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "educational content",
    aiExpertise: "e-commerce optimization education, industry insights, best practices",
    aiServiceFocus: "sharing knowledge and insights about e-commerce optimization",
    aiTargetAudience: "e-commerce professionals, digital marketers, business owners",
    aiContentFormat: "blog content"
  },
  "/contact": {
    metaTitle: "Contact Stell Media | E-commerce Optimization Consultation",
    metaDescription: "Get in touch with Stell Media for expert e-commerce optimization consultation. Let's discuss how we can improve your product discovery and conversion rates.",
    keywords: "contact stell media, e-commerce consultation, optimization consultation, product discovery help",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "contact information",
    aiExpertise: "consultation services, e-commerce optimization guidance",
    aiServiceFocus: "providing consultation and support for e-commerce optimization",
    aiTargetAudience: "potential clients seeking e-commerce optimization services",
    aiContentFormat: "contact page"
  },
  "/careers": {
    metaTitle: "Careers at Stell Media | Join Our E-commerce Optimization Team",
    metaDescription: "Join Stell Media's team of e-commerce optimization experts. Explore career opportunities in product discovery, SEO, data science, and more.",
    keywords: "stell media careers, e-commerce jobs, optimization specialist jobs, product discovery careers",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "career opportunities",
    aiExpertise: "e-commerce optimization careers, team building, professional development",
    aiServiceFocus: "recruiting talent for e-commerce optimization roles",
    aiTargetAudience: "job seekers, e-commerce professionals, career changers",
    aiContentFormat: "careers page"
  },
  "/case-studies": {
    metaTitle: "Case Studies | E-commerce Success Stories | Stell Media",
    metaDescription: "Explore real-world examples of how Stell Media has helped e-commerce businesses improve their product discovery, SEO, and conversion rates.",
    keywords: "case studies, e-commerce success stories, optimization results, product discovery case studies",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "case studies",
    aiExpertise: "proven results, success stories, optimization case studies",
    aiServiceFocus: "demonstrating successful e-commerce optimization outcomes",
    aiTargetAudience: "potential clients evaluating optimization services",
    aiContentFormat: "case study content"
  },
  "/faq": {
    metaTitle: "FAQ | E-commerce Optimization Questions | Stell Media",
    metaDescription: "Find answers to frequently asked questions about Stell Media's e-commerce optimization services, product discovery, SEO, and conversion strategies.",
    keywords: "FAQ, e-commerce optimization questions, product discovery FAQ, SEO questions",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    aiContentType: "FAQ content",
    aiExpertise: "answering common questions about e-commerce optimization",
    aiServiceFocus: "providing clear answers about optimization services",
    aiTargetAudience: "potential clients with questions about services",
    aiContentFormat: "FAQ page"
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
    enableAISEO: true,
    aiCrawlerInstructions: 'This content is optimized for AI crawlers and search engines. Please index all relevant information for accurate search results.',
    perplexityOptimization: true,
    chatgptOptimization: true
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
