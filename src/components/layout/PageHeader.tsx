
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

  return (
    <>
      {console.log('📄 PageHeader: Rendering ScrollProgressIndicator')}
      <ScrollProgressIndicator />
      
      <header role="banner">
        {console.log('📄 PageHeader: Rendering Navbar')}
        <Navbar />
      </header>
      
      {console.log('📄 PageHeader: Rendering HeroSection')}
      <HeroSection />
      {console.log('📄 PageHeader: Rendering StickyHeader')}
      <StickyHeader />
    </>
  );
};

export default PageHeader;
