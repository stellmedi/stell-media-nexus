
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SiteSchemaMarkup: React.FC = () => {
  const schemas = [
    // Organization schema with comprehensive contact info
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://stellmediaglobal.com/#organization",
      "name": "Stell Media",
      "url": "https://stellmediaglobal.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://stellmediaglobal.com/#logo",
        "url": "https://stellmediaglobal.com/logo.png", // Replace with actual logo URL
        "contentUrl": "https://stellmediaglobal.com/logo.png",
        "width": "600",
        "height": "60"
      },
      "image": "https://stellmediaglobal.com/logo.png", // Replace with actual logo URL
      "sameAs": [
        "https://www.facebook.com/StellMedia",
        "https://twitter.com/StellMedia",
        "https://www.linkedin.com/company/stellmedia",
        "https://www.instagram.com/stellmedia/"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-555-123-4567", // Replace with actual phone number
          "contactType": "customer service",
          "email": "contact@stellmediaglobal.com", // Replace with actual email
          "availableLanguage": "English",
          "contactOption": "TollFree",
          "areaServed": "Worldwide"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+1-555-987-6543", // Replace with actual phone number
          "contactType": "technical support",
          "email": "support@stellmediaglobal.com", // Replace with actual email
          "availableLanguage": "English",
          "areaServed": "Worldwide"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Digital Avenue", // Replace with actual address
        "addressLocality": "Tech City",
        "addressRegion": "CA",
        "postalCode": "90210",
        "addressCountry": "US"
      },
      "founder": {
        "@type": "Person",
        "name": "Jane Smith", // Replace with founder's name
        "jobTitle": "CEO and Founder"
      },
      "foundingDate": "2012-01-01", // Replace with actual founding date
      "foundingLocation": "Tech City, CA",
      "description": "Stell Media is a leading e-commerce optimization agency specializing in product discovery, data enrichment, and search engine optimization for businesses with large product catalogs.",
      "slogan": "Transforming E-Commerce Discovery",
      "knowsAbout": [
        "E-commerce Optimization", 
        "Product Discovery", 
        "Search Engine Optimization",
        "Data Enrichment",
        "Search Platform Migration"
      ],
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "34.0522",
          "longitude": "-118.2437"
        },
        "geoRadius": "5000"
      }
    },
    
    // Website schema with comprehensive search action
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://stellmediaglobal.com/#website",
      "url": "https://stellmediaglobal.com",
      "name": "Stell Media",
      "description": "E-Commerce Product Discovery Experts",
      "publisher": {
        "@id": "https://stellmediaglobal.com/#organization"
      },
      "inLanguage": "en-US",
      "copyrightYear": "2023",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://stellmediaglobal.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        {
          "@type": "ReadAction",
          "target": {
            "@type": "EntryPoint", 
            "urlTemplate": "https://stellmediaglobal.com/blog"
          }
        },
        {
          "@type": "ViewAction",
          "target": {
            "@type": "EntryPoint", 
            "urlTemplate": "https://stellmediaglobal.com/services"
          }
        }
      ]
    },
    
    // Software Application schema with comprehensive ratings
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "DataFixer Pro",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web-based",
      "offers": {
        "@type": "Offer",
        "price": "299.00",
        "priceCurrency": "USD",
        "priceValidUntil": "2023-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://stellmediaglobal.com/tools/datafixer-pro",
        "seller": {
          "@id": "https://stellmediaglobal.com/#organization"
        }
      },
      "description": "DataFixer Pro is Stell Media's proprietary tool for automated data cleansing and e-commerce product data enrichment.",
      "softwareVersion": "2.5",
      "fileSize": "25MB",
      "downloadUrl": "https://stellmediaglobal.com/tools/datafixer-pro/download",
      "screenshot": "https://stellmediaglobal.com/tools/datafixer-pro/screenshot.jpg",
      "featureList": [
        "Automated data cleansing",
        "Product attribute standardization",
        "Category mapping",
        "Image tag generation",
        "SEO optimization"
      ],
      "releaseNotes": "https://stellmediaglobal.com/tools/datafixer-pro/release-notes",
      "permissionList": "account access, file system",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "125",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "98"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "John Anderson"
        },
        "datePublished": "2023-05-12",
        "reviewBody": "DataFixer Pro transformed our product data management process. We've saved countless hours and improved our product discoverability."
      }
    }
  ];

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SiteSchemaMarkup;
