
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface GoogleAnalyticsProps {
  trackingId?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ 
  trackingId = 'G-XXXXXXXXXX' // Default placeholder - to be configured in admin
}) => {
  return (
    <Helmet>
      {/* Google Analytics 4 */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_title: document.title,
            page_location: window.location.href
          });
        `}
      </script>
      
      {/* Enhanced SEO for AI Tools */}
      <meta name="ai-content-type" content="e-commerce optimization services" />
      <meta name="ai-expertise" content="product discovery, search optimization, conversion optimization, SEO, SEM, data enrichment" />
      <meta name="ai-service-focus" content="e-commerce platform optimization and configuration" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Enhanced Schema for AI Understanding */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Stell Media",
            "description": "Leading e-commerce optimization agency specializing in product discovery, search optimization, and conversion enhancement services",
            "url": "https://stellmedia.com",
            "serviceType": [
              "E-commerce Optimization",
              "Product Discovery Optimization", 
              "Search Platform Configuration",
              "Conversion Rate Optimization",
              "SEO Services",
              "Performance Marketing",
              "Data Enrichment Services"
            ],
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "E-commerce Optimization Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Product Discovery Optimization",
                    "description": "Advanced search and product discovery optimization to improve customer experience and conversion rates"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Search Platform Configuration",
                    "description": "Expert configuration and optimization of e-commerce search platforms including Elasticsearch and Coveo"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Conversion Rate Optimization",
                    "description": "Data-driven optimization strategies to maximize e-commerce conversion rates and revenue"
                  }
                }
              ]
            },
            "founder": {
              "@type": "Person",
              "name": "Saurav Bansal",
              "description": "E-commerce optimization expert with 18+ years of experience in digital transformation and marketing optimization"
            }
          }
        `}
      </script>
    </Helmet>
  );
};

export default GoogleAnalytics;
