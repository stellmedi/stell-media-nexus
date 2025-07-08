
import React from 'react';
import { Helmet } from "react-helmet-async";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";
import SchemaMarkup from "@/components/SchemaMarkup";
import SEOHelmet from "@/components/SEOHelmet";
import XMLSitemap from "@/components/XMLSitemap";
import MobileOptimization from "@/components/MobileOptimization";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

interface SEOAndAnalyticsProps {
  realEstateServiceData: any;
  eCommerceServiceData: any;
}

const SEOAndAnalytics: React.FC<SEOAndAnalyticsProps> = ({
  realEstateServiceData,
  eCommerceServiceData
}) => {
  return (
    <>
      <Helmet>
        {/* Optimized font preloading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          as="style"
          onLoad={() => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
            document.head.appendChild(link);
          }}
        />
        
        {/* Critical CSS for immediate rendering */}
        <style type="text/css">{`
          .hero-section { 
            background: linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%); 
            min-height: 70vh; 
            display: flex; 
            align-items: center; 
            contain: layout style paint;
          }
          .navbar { 
            position: sticky; 
            top: 0; 
            z-index: 50; 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(10px); 
            height: 64px;
            contain: layout style paint;
          }
          .btn-primary { 
            background: #4f46e5; 
            color: white; 
            padding: 0.75rem 1.5rem; 
            border-radius: 0.5rem; 
            transition: background-color 0.2s; 
            min-width: 120px;
            height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .btn-primary:hover { background: #4338ca; }
          img { height: auto; max-width: 100%; }
          
          @media (max-width: 768px) {
            .hero-section { 
              min-height: 60vh; 
              padding: 2rem 1rem; 
            }
            .navbar { 
              height: 56px; 
            }
          }
        `}</style>
        
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Cache control */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </Helmet>
      
      <SEOHelmet
        pagePath="/"
        defaultTitle="Stell Media | Digital Growth for Real Estate & eCommerce Brands - Lead generation, CRM automation & product findability—done right."
        defaultDescription="Digital growth for real estate and eCommerce brands. CRM automation, lead gen, and SEO-powered product discovery by Stell Media."
        defaultKeywords="digital growth partner, real estate lead generation, ecommerce optimization, CRM automation, product discovery, performance marketing, catalog SEO"
      />
      
      <GoogleAnalytics />
      <SiteSchemaMarkup />
      <LocalBusinessSchema />
      <XMLSitemap />
      <SchemaMarkup type="service" data={realEstateServiceData} />
      <SchemaMarkup type="service" data={eCommerceServiceData} />
      <MobileOptimization />
    </>
  );
};

export default SEOAndAnalytics;
