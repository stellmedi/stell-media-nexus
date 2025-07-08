import React from 'react';
import { Helmet } from 'react-helmet-async';

const LocalBusinessSchema: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Stell Media",
    "description": "Digital growth partner specializing in real estate and e-commerce solutions worldwide.",
    "url": "https://stellmedia.com",
    "logo": "https://stellmedia.com/lovable-uploads/96e2b26f-1803-4e30-b44f-8ebce6c60b7f.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chandigarh City Center, VIP Road, Zirakpur",
      "addressLocality": "SAS Nagar (Mohali)",
      "addressRegion": "Punjab",
      "addressCountry": "India"
    },
    "telephone": "+91 98771 00369",
    "email": "contact@stellmedia.com",
    "foundingDate": "2023",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Real Estate Lead Generation",
            "description": "CRM automation and lead generation for real estate developers"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Product Discovery",
            "description": "SEO-powered product findability and performance marketing"
          }
        }
      ]
    },
    "sameAs": [
      "https://linkedin.com/company/stellmedia",
      "https://twitter.com/stellmedia"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;