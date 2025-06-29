
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGlobalSEO } from '@/hooks/use-global-seo';

const GoogleAnalytics: React.FC = () => {
  const { config, isLoading } = useGlobalSEO();

  console.log('GoogleAnalytics: Config loaded:', config);
  console.log('GoogleAnalytics: Loading state:', isLoading);

  // Use the new tracking ID you provided, fallback to config if available
  const trackingId = config.googleAnalyticsId || 'G-8MK59B7JZV';

  return (
    <Helmet>
      {/* Google tag (gtag.js) */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </script>
      
      {/* Google Search Console Verification */}
      {config.googleSearchConsoleVerification && (
        <meta name="google-site-verification" content={config.googleSearchConsoleVerification} />
      )}
      
      {/* Google Tag Manager */}
      {config.googleTagManagerId && (
        <>
          <script>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${config.googleTagManagerId}');
            `}
          </script>
        </>
      )}

      {/* Bing Webmaster Verification */}
      {config.bingWebmasterVerification && (
        <meta name="msvalidate.01" content={config.bingWebmasterVerification} />
      )}
      
      {/* Facebook Domain Verification */}
      {config.facebookDomainVerification && (
        <meta name="facebook-domain-verification" content={config.facebookDomainVerification} />
      )}

      {/* Enhanced Schema for Better Understanding */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Stell Media",
            "description": "Leading e-commerce optimization agency specializing in product discovery, search optimization, and conversion enhancement services",
            "url": "https://stellmedia.com",
            "logo": "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
            "image": "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
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
