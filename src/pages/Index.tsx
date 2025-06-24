
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
import SocialShareButtons from "@/components/SocialShareButtons";
import XMLSitemap from "@/components/XMLSitemap";
import StickyHeader from "@/components/StickyHeader";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import SocialProofSection from "@/components/SocialProofSection";

// Lazy load below-the-fold components
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const EnhancedTestimonials = lazy(() => import("@/components/EnhancedTestimonials"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));

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
      <Navbar />
      <HeroSection />
      
      {/* Sticky Header with CTA */}
      <StickyHeader />
      
      {/* Social Proof Section */}
      <SocialProofSection />
      
      {/* Social Share Buttons - Added to homepage */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <SocialShareButtons 
            title="Stell Media - Digital Growth Partner"
            description="Transform your business with our proven digital solutions for real estate and e-commerce"
            className="bg-white p-4 rounded-lg shadow-sm border"
          />
        </div>
      </div>
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
      
      {/* Below-the-fold content with lazy loading */}
      <Suspense fallback={<div className="h-20 bg-gray-50 animate-pulse" />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse" />}>
        <EnhancedTestimonials />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-white animate-pulse" />}>
        <ContactSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse" />}>
        <FAQSection items={faqItems} />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 bg-white animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
