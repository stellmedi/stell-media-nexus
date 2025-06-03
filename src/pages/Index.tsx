
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import EnhancedTestimonials from "@/components/EnhancedTestimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import ClientLogos from "@/components/ClientLogos";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";
import SEOHelmet from "@/components/SEOHelmet";
import StickyHeader from "@/components/StickyHeader";

const Index = () => {
  const faqItems = [
    {
      question: "What e-commerce AI solutions do you offer?",
      answer: "We provide comprehensive AI-powered solutions including product discovery optimization, search algorithm enhancement, data enrichment, and conversion rate optimization specifically designed for e-commerce platforms."
    },
    {
      question: "How can AI improve my e-commerce search functionality?",
      answer: "Our AI solutions enhance search by implementing advanced algorithms that understand user intent, provide personalized recommendations, and improve product discoverability through semantic search and machine learning."
    },
    {
      question: "What's included in your SEO services for e-commerce?",
      answer: "Our SEO services include technical optimization, product page optimization, category structure improvement, schema markup implementation, and content strategy specifically tailored for e-commerce platforms."
    },
    {
      question: "How do you measure the success of AI implementations?",
      answer: "We track key metrics including conversion rates, search result relevance, user engagement, cart abandonment reduction, and overall revenue impact to measure the effectiveness of our AI solutions."
    },
    {
      question: "Can you integrate with existing e-commerce platforms?",
      answer: "Yes, our solutions are designed to integrate seamlessly with major e-commerce platforms including Shopify, WooCommerce, Magento, and custom-built systems."
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-50">
      <SEOHelmet 
        pagePath="/"
        defaultTitle="Stell Media | E-commerce AI & Data Solutions"
        defaultDescription="Transform your e-commerce business with Stell Media's AI-powered solutions. Expert SEO, product discovery, data enrichment, and conversion optimization services."
        defaultKeywords="e-commerce AI, product discovery, SEO services, data enrichment, conversion optimization, search algorithms, machine learning"
        defaultOgImage="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
      />
      
      <SiteSchemaMarkup />
      <Navbar />
      <StickyHeader />
      <main>
        <HeroSection />
        <ClientLogos />
        <ServicesSection />
        <EnhancedTestimonials />
        <FAQSection items={faqItems} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
