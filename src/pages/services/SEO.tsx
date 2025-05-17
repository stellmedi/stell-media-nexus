
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHeroSection from "@/components/seo/SEOHeroSection";
import SEOFeaturesSection from "@/components/seo/SEOFeaturesSection";
import SEOProcessSection from "@/components/seo/SEOProcessSection";
import SEOCTASection from "@/components/seo/SEOCTASection";
import SEONewsletterSection from "@/components/seo/SEONewsletterSection";

const SEOServices = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <main>
        <SEOHeroSection />
        <SEOFeaturesSection />
        <SEOProcessSection />
        <SEOCTASection />
        <SEONewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default SEOServices;
