
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StickyHeader from "@/components/StickyHeader";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";

const PageHeader = () => {
  useEffect(() => {
    console.log('📄 PageHeader: Component mounted');
    return () => {
      console.log('📄 PageHeader: Component unmounting'); 
    };
  }, []);

  console.log('📄 PageHeader: Rendering PageHeader');
  
  // Debug logs before JSX
  console.log('📄 PageHeader: About to render ScrollProgressIndicator');
  console.log('📄 PageHeader: About to render Navbar');
  console.log('📄 PageHeader: About to render HeroSection');
  console.log('📄 PageHeader: About to render StickyHeader');

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
