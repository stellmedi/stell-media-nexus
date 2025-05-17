
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type: 'organization' | 'website' | 'service' | 'software' | 'breadcrumb' | 'article';
  data?: any;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type, data }) => {
  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://stellmediaglobal.com/#organization",
    "name": "Stell Media",
    "url": "https://stellmediaglobal.com",
    "logo": {
      "@type": "ImageObject",
      "@id": "https://stellmediaglobal.com/#logo",
      "url": "https://stellmediaglobal.com/logo.png", // Replace with actual logo URL
      "width": "600",
      "height": "60"
    },
    "sameAs": [
      "https://www.facebook.com/StellMedia",
      "https://twitter.com/StellMedia",
      "https://www.linkedin.com/company/stellmedia",
      "https://www.instagram.com/stellmedia/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567", // Replace with actual phone number
      "contactType": "customer service",
      "email": "contact@stellmediaglobal.com", // Replace with actual email
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Digital Avenue", // Replace with actual address
      "addressLocality": "Tech City",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    }
  };

  // Website schema with search action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://stellmediaglobal.com/#website",
    "name": "Stell Media",
    "url": "https://stellmediaglobal.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://stellmediaglobal.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Service schema (dynamic based on provided data)
  const serviceSchema = data ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://stellmediaglobal.com/services/${data.serviceType?.toLowerCase().replace(/\s+/g, '-') || 'default'}`,
    "serviceType": data.serviceType || "Digital Marketing Service",
    "name": data.name || "Stell Media Services",
    "provider": {
      "@type": "Organization",
      "@id": "https://stellmediaglobal.com/#organization"
    },
    "description": data.description || "Professional digital marketing services for e-commerce businesses.",
    "areaServed": data.areaServed || "Worldwide",
    "audience": {
      "@type": "Audience",
      "audienceType": "E-commerce Businesses"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": data.services || [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Services",
            "description": "Improve organic visibility with data-driven SEO strategies tailored for e-commerce.",
            "url": "https://stellmediaglobal.com/services/seo"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEM Services",
            "description": "Drive measurable traffic through AI-optimized search marketing campaigns.",
            "url": "https://stellmediaglobal.com/services/sem"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Marketing",
            "description": "Strategic performance marketing to improve ROAS and reduce customer acquisition costs.",
            "url": "https://stellmediaglobal.com/services/performance-marketing"
          }
        }
      ]
    }
  } : null;

  // Software Application schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DataFixer Pro",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "price": "299.00",
      "priceCurrency": "USD"
    },
    "description": "DataFixer Pro is Stell Media's proprietary tool for automated data cleansing and e-commerce product data enrichment.",
    "softwareVersion": "2.5",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "125"
    }
  };

  // Breadcrumb schema
  const breadcrumbSchema = data ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": data.map((item: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  // Article schema
  const articleSchema = data ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title || "Article Title",
    "name": data.title || "Article Title",
    "description": data.description || "Article description text goes here",
    "image": data.image ? [data.image] : ["https://stellmediaglobal.com/article-image.jpg"],
    "datePublished": data.datePublished || "2023-01-01T08:00:00+08:00",
    "dateModified": data.dateModified || "2023-01-01T08:00:00+08:00",
    "author": {
      "@type": "Person",
      "name": data.authorName || "John Doe"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://stellmediaglobal.com/#organization",
      "name": "Stell Media",
      "logo": {
        "@type": "ImageObject",
        "url": "https://stellmediaglobal.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url || "https://stellmediaglobal.com/blog/article-url"
    },
    "keywords": data.keywords || ["e-commerce", "product discovery", "SEO"],
    "articleBody": data.articleBody || "",
    "articleSection": data.articleSection || "Blog"
  } : null;

  const getSchemaByType = () => {
    switch (type) {
      case 'organization':
        return organizationSchema;
      case 'website':
        return websiteSchema;
      case 'service':
        return serviceSchema;
      case 'software':
        return softwareSchema;
      case 'breadcrumb':
        return breadcrumbSchema;
      case 'article':
        return articleSchema;
      default:
        return {};
    }
  };

  const schema = getSchemaByType();
  
  // Don't render anything if no schema or invalid schema type
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;
