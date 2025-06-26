
// Schema data for service clusters
export const realEstateServiceData = {
  "@context": "https://schema.org",
  "@type": "RealEstateService",
  "name": "Real Estate Digital Marketing Services",
  "description": "Comprehensive lead generation, automation, and CRM services for real estate developers",
  "provider": {
    "@type": "Organization",
    "name": "Stell Media",
    "url": "https://stellmedia.com"
  },
  "serviceType": "Real Estate Lead Generation",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Real Estate Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Lead Generation",
          "description": "Automated lead generation systems for real estate developers"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "CRM Integration",
          "description": "Custom CRM solutions and automation for real estate sales teams"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Marketing Automation",
          "description": "Automated marketing campaigns and nurturing sequences"
        }
      }
    ]
  }
};

export const eCommerceServiceData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "E-commerce Optimization Services",
  "description": "Product discovery management, catalog SEO, and performance marketing for e-commerce brands",
  "provider": {
    "@type": "Organization",
    "name": "Stell Media",
    "url": "https://stellmedia.com"
  },
  "serviceType": "E-commerce Optimization",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "E-commerce Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Discovery Management",
          "description": "Advanced product discovery optimization and search enhancement"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Catalog SEO",
          "description": "Strategic SEO optimization for large product catalogs"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Performance Marketing",
          "description": "Data-driven performance marketing campaigns for e-commerce growth"
        }
      }
    ]
  }
};
