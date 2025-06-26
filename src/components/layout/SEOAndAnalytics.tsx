
import React from 'react';
import { Helmet } from "react-helmet-async";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";
import SchemaMarkup from "@/components/SchemaMarkup";
import SEOHelmet from "@/components/SEOHelmet";
import XMLSitemap from "@/components/XMLSitemap";

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
        {/* Critical CSS inlined for faster LCP */}
        <style type="text/css">{`
          /* Critical above-the-fold styles optimized for LCP */
          .hero-section { 
            background: linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%); 
            min-height: 90vh; 
            display: flex; 
            align-items: center; 
            position: relative; 
            contain: layout style paint;
            aspect-ratio: 16/9;
          }
          .navbar { 
            position: sticky; 
            top: 0; 
            z-index: 50; 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(10px); 
            border-bottom: 1px solid #e5e7eb; 
            height: 64px;
            contain: layout style paint;
          }
          .btn-primary { 
            background: #4f46e5; 
            color: white; 
            padding: 0.75rem 1.5rem; 
            border-radius: 0.5rem; 
            border: none; 
            cursor: pointer; 
            transition: background-color 0.2s; 
            min-width: 120px;
            height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .btn-primary:hover { background: #4338ca; }
          img:not([width]):not([height]) { aspect-ratio: 16/9; object-fit: cover; }
        `}</style>
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
        
        {/* Cache control for static assets */}
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
      <XMLSitemap />
      <SchemaMarkup type="service" data={realEstateServiceData} />
      <SchemaMarkup type="service" data={eCommerceServiceData} />
    </>
  );
};

export default SEOAndAnalytics;
