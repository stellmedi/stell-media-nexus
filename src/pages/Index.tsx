
import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";

// Critical above-the-fold components (loaded immediately)
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";
import SchemaMarkup from "@/components/SchemaMarkup";
import WhatsAppButton from "@/components/ChatButton";
import SEOHelmet from "@/components/SEOHelmet";
import XMLSitemap from "@/components/XMLSitemap";
import StickyHeader from "@/components/StickyHeader";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import SocialProofSection from "@/components/SocialProofSection";

// Lazy load below-the-fold components with loading fallbacks
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const EnhancedTestimonials = lazy(() => import("@/components/EnhancedTestimonials"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Optimized loading component
const LoadingFallback = ({ height = "h-20" }: { height?: string }) => (
  <div className={`${height} bg-gray-50 animate-pulse`} aria-hidden="true" />
);

const Index = () => {
  const faqItems = [
    {
      question: "How do you help real estate developers with lead generation?",
      answer: "We provide comprehensive lead generation solutions including automated marketing funnels, CRM integration, landing page optimization, and multi-channel campaigns specifically designed for real estate developers and projects."
    },
    {
      question: "What makes your e-commerce optimization different?",
      answer: "We combine advanced technology with deep e-commerce expertise. Our approach includes product discovery optimization, catalog SEO, performance marketing, and data enrichment that goes beyond basic consulting to deliver measurable results."
    },
    {
      question: "Do you work with both real estate and e-commerce clients?",
      answer: "Yes, we're uniquely positioned as a digital growth partner serving both verticals. Our real estate division focuses on lead generation and CRM automation, while our e-commerce division specializes in product discovery and performance marketing."
    },
    {
      question: "How quickly can we see results from your services?",
      answer: "Most clients see initial improvements within 2-4 weeks of implementation. Significant conversion rate improvements typically occur within 6-8 weeks as the optimization strategies take full effect and data collection provides insights for further refinement."
    },
    {
      question: "What platforms and technologies do you work with?",
      answer: "For real estate: CRM platforms, marketing automation tools, lead management systems. For e-commerce: Shopify Plus, Magento, WooCommerce, BigCommerce, Elasticsearch, Coveo, and custom solutions. Our strategies are platform-agnostic and focus on results."
    }
  ];

  // Schema data for service clusters
  const realEstateServiceData = {
    "@context": "https://schema.org",
    "@type": "RealEstateService",
    "name": "Real Estate Digital Marketing Services",
    "description": "Comprehensive lead generation, automation, and CRM services for real estate developers",
    "provider": {
      "@type": "Organization",
      "name": "Stell Media",
      "url": "https://stellmedia.com"
    },
    "serviceType": "Real Estate Lead Generation",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lead Generation",
            "description": "Automated lead generation systems for real estate developers"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM Integration",
            "description": "Custom CRM solutions and automation for real estate sales teams"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Automation",
            "description": "Automated marketing campaigns and nurturing sequences"
          }
        }
      ]
    }
  };

  const eCommerceServiceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-commerce Optimization Services",
    "description": "Product discovery management, catalog SEO, and performance marketing for e-commerce brands",
    "provider": {
      "@type": "Organization",
      "name": "Stell Media",
      "url": "https://stellmedia.com"
    },
    "serviceType": "E-commerce Optimization",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "E-commerce Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Product Discovery Management",
            "description": "Advanced product discovery optimization and search enhancement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Catalog SEO",
            "description": "Strategic SEO optimization for large product catalogs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Marketing",
            "description": "Data-driven performance marketing campaigns for e-commerce growth"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        {/* Critical CSS inlined for faster LCP */}
        <style type="text/css">{`
          /* Critical above-the-fold styles */
          .hero-section { background: linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%); min-height: 90vh; display: flex; align-items: center; position: relative; }
          .navbar { position: sticky; top: 0; z-index: 50; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #e5e7eb; }
          .btn-primary { background: #4f46e5; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; transition: background-color 0.2s; }
          .btn-primary:hover { background: #4338ca; }
        `}</style>
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
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
      <ScrollProgressIndicator />
      
      {/* Service Cluster Schema Markup */}
      <SchemaMarkup type="service" data={realEstateServiceData} />
      <SchemaMarkup type="service" data={eCommerceServiceData} />
      
      {/* Critical above-the-fold content */}
      <header role="banner">
        <Navbar />
      </header>
      
      <main role="main">
        <HeroSection />
        
        {/* Sticky Header with CTA */}
        <StickyHeader />
        
        {/* Social Proof Section */}
        <SocialProofSection />
        
        {/* Below-the-fold content with lazy loading and accessibility */}
        <Suspense fallback={<LoadingFallback />}>
          <ServicesSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback height="h-40" />}>
          <EnhancedTestimonials />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback height="h-40" />}>
          <ContactSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback height="h-40" />}>
          <FAQSection items={faqItems} />
        </Suspense>
      </main>
      
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
