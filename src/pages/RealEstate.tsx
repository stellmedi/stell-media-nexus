
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RealEstateHero from "@/components/real-estate/RealEstateHero";
import RealEstateServices from "@/components/real-estate/RealEstateServices";
import ECommerceServices from "@/components/real-estate/ECommerceServices";
import BenefitsSection from "@/components/real-estate/BenefitsSection";
import TestimonialsSection from "@/components/real-estate/TestimonialsSection";
import CTASection from "@/components/real-estate/CTASection";

const RealEstate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Helmet>
        <title>Real Estate Digital Solutions | Lead Generation & CRM | Stell Media</title>
        <meta name="description" content="Comprehensive real estate digital solutions including virtual tours, CRM automation, lead generation, and 3D visualization services for property developers." />
        <meta name="keywords" content="real estate digital marketing, property lead generation, real estate CRM, virtual tours, 3D visualization" />
        <link rel="canonical" href="https://stellmedia.com/real-estate" />
      </Helmet>

      <Navbar />
      <main className="mobile-hero-spacing">
        <RealEstateHero />
      <RealEstateServices />
      <ECommerceServices />
      <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default RealEstate;
