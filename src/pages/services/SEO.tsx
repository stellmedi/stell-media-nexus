
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
import SchemaMarkup from "@/components/SchemaMarkup";

const SEOServices = () => {
  // SEO Service Schema data
  const seoServiceData = {
    serviceType: "SEO Service",
    name: "E-commerce SEO Services",
    description: "Boost your e-commerce visibility with Stell Media's data-driven SEO strategies. Improve rankings, increase organic traffic, and maximize ROI.",
    areaServed: "Global",
    services: [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technical SEO Audits",
          "description": "Comprehensive analysis of your e-commerce site structure, crawlability, and indexation.",
          "url": "https://stellmediaglobal.com/services/seo#technical"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Page Optimization",
          "description": "Automated optimization of product pages for better search visibility.",
          "url": "https://stellmediaglobal.com/services/seo#product-pages"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Schema Markup Implementation",
          "description": "Structured data implementation to enhance rich snippets in search results.",
          "url": "https://stellmediaglobal.com/services/seo#schema"
        }
      }
    ]
  };

  // Breadcrumb data
  const breadcrumbData = [
    { name: "Home", url: "https://stellmediaglobal.com/" },
    { name: "Services", url: "https://stellmediaglobal.com/services" },
    { name: "SEO Services", url: "https://stellmediaglobal.com/services/seo" }
  ];

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
      
      {/* Schema markup for this page */}
      <SchemaMarkup type="service" data={seoServiceData} />
      <SchemaMarkup type="breadcrumb" data={breadcrumbData} />
      
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
