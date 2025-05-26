
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
      <main>
        <HeroSection />
        <ClientLogos />
        <ServicesSection />
        <EnhancedTestimonials />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
