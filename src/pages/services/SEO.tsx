
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHeroSection from "@/components/seo/SEOHeroSection";
import SEOFeaturesSection from "@/components/seo/SEOFeaturesSection";
import SEOProcessSection from "@/components/seo/SEOProcessSection";
import SEOCTASection from "@/components/seo/SEOCTASection";
import SEONewsletterSection from "@/components/seo/SEONewsletterSection";
import SEOFAQSection from "@/components/seo/SEOFAQSection";

const SEOServices = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Expert SEO Services for E-commerce | Stell Media</title>
        <meta 
          name="description" 
          content="Boost your e-commerce visibility with Stell Media's data-driven SEO strategies. Improve rankings, increase organic traffic, and maximize ROI."
        />
        <meta name="keywords" content="e-commerce SEO, product catalog optimization, technical SEO, organic traffic, search ranking improvement" />
        <link rel="canonical" href="https://stellmedia.com/services/seo" />
      </Helmet>
      <Navbar />
      <main>
        <SEOHeroSection />
        <SEOFeaturesSection />
        <SEOProcessSection />
        <SEOFAQSection />
        <SEOCTASection />
        <SEONewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default SEOServices;
