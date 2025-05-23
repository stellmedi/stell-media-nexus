
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SiteSchemaMarkup: React.FC = () => {
  const websiteUrl = "https://stellmedia.com"; // Consistent URL across all schema
  
  const schemas = [
    // Organization schema with comprehensive contact info
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${websiteUrl}/#organization`,
      "name": "Stell Media",
      "url": websiteUrl,
      "logo": {
        "@type": "ImageObject",
        "@id": `${websiteUrl}/#logo`,
        "url": `${websiteUrl}/logo.png`,
        "contentUrl": `${websiteUrl}/logo.png`,
        "width": "600",
        "height": "60"
      },
      "image": `${websiteUrl}/logo.png`,
      "sameAs": [
        "https://www.facebook.com/StellMedia",
        "https://twitter.com/StellMedia",
        "https://www.linkedin.com/company/stellmedia",
        "https://www.instagram.com/stellmedia/"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+919877100369",
          "contactType": "customer service",
          "email": "contact@stellmedia.com",
          "availableLanguage": "English",
          "contactOption": "TollFree",
          "areaServed": "Worldwide"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+919877100369",
          "contactType": "technical support",
          "email": "support@stellmedia.com",
          "availableLanguage": "English",
          "areaServed": "Worldwide"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Digital Avenue",
        "addressLocality": "Tech City",
        "addressRegion": "CA",
        "postalCode": "90210",
        "addressCountry": "US"
      },
      "founder": {
        "@type": "Person",
        "name": "Jane Smith",
        "jobTitle": "CEO and Founder"
      },
      "foundingDate": "2012-01-01",
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
      "@id": `${websiteUrl}/#website`,
      "url": websiteUrl,
      "name": "Stell Media",
      "description": "E-Commerce Product Discovery Experts",
      "publisher": {
        "@id": `${websiteUrl}/#organization`
      },
      "inLanguage": "en-US",
      "copyrightYear": "2023",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${websiteUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        {
          "@type": "ReadAction",
          "target": {
            "@type": "EntryPoint", 
            "urlTemplate": `${websiteUrl}/blog`
          }
        },
        {
          "@type": "ViewAction",
          "target": {
            "@type": "EntryPoint", 
            "urlTemplate": `${websiteUrl}/services`
          }
        }
      ]
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
