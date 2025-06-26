
import React from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StickyHeader from "@/components/StickyHeader";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";

const PageHeader = () => {
  return (
    <>
      <ScrollProgressIndicator />
      
      <header role="banner">
        <Navbar />
      </header>
      
      <HeroSection />
      <StickyHeader />
    </>
  );
};

export default PageHeader;
