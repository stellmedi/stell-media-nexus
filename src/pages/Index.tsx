
import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";

// Critical above-the-fold components (loaded immediately)
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";

// Lazy load below-the-fold components
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ClientLogos = lazy(() => import("@/components/ClientLogos"));
const EnhancedTestimonials = lazy(() => import("@/components/EnhancedTestimonials"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const faqItems = [
    {
      question: "What makes your product discovery optimization different?",
      answer: "We combine advanced technology with deep e-commerce expertise. Our approach includes technical search platform optimization (Elasticsearch, Coveo), data enrichment, and performance optimization that goes beyond basic consulting to deliver measurable results."
    },
    {
      question: "How quickly can we see results from optimization?",
      answer: "Most clients see initial improvements within 2-4 weeks of implementation. Significant conversion rate improvements typically occur within 6-8 weeks as the optimization strategies take full effect and data collection provides insights for further refinement."
    },
    {
      question: "Do you work with specific e-commerce platforms?",
      answer: "Yes, we have extensive experience with major platforms including Shopify Plus, Magento Commerce, WooCommerce, BigCommerce, and custom solutions. Our optimization strategies are platform-agnostic and focus on the underlying search and discovery technologies."
    },
    {
      question: "What's included in your search platform optimization service?",
      answer: "Our service includes complete search platform configuration, relevance tuning, faceted navigation optimization, synonym management, search analytics setup, A/B testing implementation, and ongoing performance monitoring with monthly optimization reports."
    },
    {
      question: "How do you measure the success of optimization campaigns?",
      answer: "We track key metrics including search conversion rates, click-through rates, revenue per search, zero-result search reduction, average order value improvements, and overall site conversion rate increases. All metrics are provided in detailed monthly reports."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Stell Media - E-commerce Product Discovery & Search Optimization Experts</title>
        <meta name="description" content="Leading e-commerce optimization agency specializing in product discovery, search platform configuration, and conversion optimization. Boost your online store's performance with expert optimization services." />
        <meta name="keywords" content="ecommerce optimization, product discovery, search optimization, conversion rate optimization, elasticsearch optimization, coveo configuration, shopify optimization" />
        <link rel="canonical" href="https://stellmedia.com" />
        
        {/* Critical CSS inlined for LCP optimization */}
        <style>{`
          .hero-section { 
            background: linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%);
            min-height: 90vh;
            display: flex;
            align-items: center;
          }
          .navbar {
            position: sticky;
            top: 0;
            z-index: 50;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
          }
        `}</style>
      </Helmet>
      
      <GoogleAnalytics />
      <SiteSchemaMarkup />
      
      {/* Critical above-the-fold content */}
      <Navbar />
      <HeroSection />
      
      {/* Below-the-fold content with lazy loading */}
      <Suspense fallback={<div className="h-20 bg-gray-50 animate-pulse" />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 bg-white animate-pulse" />}>
        <ClientLogos />
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
