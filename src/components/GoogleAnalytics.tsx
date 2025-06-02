
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGlobalSEO } from '@/hooks/use-global-seo';

const GoogleAnalytics: React.FC = () => {
  const { config, isLoading } = useGlobalSEO();

  console.log('GoogleAnalytics: Config loaded:', config);
  console.log('GoogleAnalytics: Loading state:', isLoading);

  // Don't render if loading or no tracking ID
  if (isLoading || !config.googleAnalyticsId) {
    return null;
  }

  return (
    <Helmet>
      {/* Google Analytics 4 */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.googleAnalyticsId}', {
            page_title: document.title,
            page_location: window.location.href
          });
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

      {/* AI SEO Meta Tags */}
      {config.enableAISEO && (
        <>
          <meta name="ai-content-type" content="e-commerce optimization services" />
          <meta name="ai-expertise" content="product discovery, search optimization, conversion optimization, SEO, SEM, data enrichment" />
          <meta name="ai-service-focus" content="e-commerce platform optimization and configuration" />
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />
          
          {/* AI Crawler Instructions */}
          {config.aiCrawlerInstructions && (
            <meta name="ai-crawler-instructions" content={config.aiCrawlerInstructions} />
          )}
          
          {/* AI Platform Specific Meta Tags */}
          {config.chatgptOptimization && (
            <>
              <meta name="chatgpt-crawl" content="allowed" />
              <meta name="openai-crawl" content="allowed" />
            </>
          )}
          
          {config.perplexityOptimization && (
            <meta name="perplexity-crawl" content="allowed" />
          )}
        </>
      )}

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
