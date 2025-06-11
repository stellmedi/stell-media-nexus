
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ClientLogos from "@/components/ClientLogos";
import EnhancedTestimonials from "@/components/EnhancedTestimonials";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/ChatButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";
import SupabaseTest from "@/components/SupabaseTest";

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
      </Helmet>
      
      <GoogleAnalytics />
      <SiteSchemaMarkup />
      
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ClientLogos />
      <EnhancedTestimonials />
      <ContactSection />
      <FAQSection items={faqItems} />
      
      {/* Supabase Test Section - Remove this after testing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Database Connection Test</h2>
          <p className="text-center text-gray-600 mb-8">
            This section is for testing Supabase connectivity. Remove it after confirming everything works.
          </p>
          <SupabaseTest />
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
