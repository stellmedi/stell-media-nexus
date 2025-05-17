
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SiteSchemaMarkup: React.FC = () => {
  const schemas = [
    // Organization schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Stell Media",
      "url": "https://stellmediaglobal.com",
      "logo": "https://stellmediaglobal.com/logo.png", // Replace with actual logo URL
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
    },
    
    // Website schema with search action
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Stell Media",
      "url": "https://stellmediaglobal.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://stellmediaglobal.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    
    // Software Application schema
    {
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
