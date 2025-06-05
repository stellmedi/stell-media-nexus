
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

const Index = () => {
  const faqItems = [
    {
      question: "What e-commerce optimization solutions do you offer?",
      answer: "We provide comprehensive optimization solutions including product discovery optimization, search algorithm enhancement, data enrichment, and conversion rate optimization specifically designed for e-commerce platforms."
    },
    {
      question: "How can optimization improve my e-commerce search functionality?",
      answer: "Our optimization solutions enhance search by implementing advanced algorithms that understand user intent, provide personalized recommendations, and improve product discoverability through enhanced search and optimization techniques."
    },
    {
      question: "What's included in your SEO services for e-commerce?",
      answer: "Our SEO services include technical optimization, product page optimization, category structure improvement, schema markup implementation, and content strategy specifically tailored for e-commerce platforms."
    },
    {
      question: "How do you measure the success of optimization implementations?",
      answer: "We track key metrics including conversion rates, search result relevance, user engagement, cart abandonment reduction, and overall revenue impact to measure the effectiveness of our optimization solutions."
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
        defaultTitle="Stell Media | E-commerce Optimization & Data Solutions"
        defaultDescription="Transform your e-commerce business with Stell Media's optimization solutions. Expert SEO, product discovery, data enrichment, and conversion optimization services."
        defaultKeywords="e-commerce optimization, product discovery, SEO services, data enrichment, conversion optimization, search algorithms, optimization techniques"
        defaultOgImage="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
      />
      
      <SiteSchemaMarkup />
      <Navbar />
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
