
import React, { Suspense, lazy, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import SEOAndAnalytics from "@/components/layout/SEOAndAnalytics";
import MainContent from "@/components/layout/MainContent";
import PerformanceWrapper from "@/components/layout/PerformanceWrapper";
import WhatsAppButton from "@/components/ChatButton";
import { realEstateServiceData, eCommerceServiceData } from "@/data/schemaData";
import { faqItems } from "@/data/faqData";

// Lazy load footer
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback for footer
const LoadingFallback = () => {
  console.log('🔄 Index: Footer loading fallback rendered');
  return (
    <div className="h-20 bg-gray-50 animate-pulse prevent-shift" aria-hidden="true" style={{ minHeight: '200px' }} />
  );
};

const Index = () => {
  useEffect(() => {
    console.log('🏠 Index: Component mounted and rendered');
    console.log('📍 Index: Current route is /', window.location.pathname);
    
    // Check if all required data is available
    console.log('📊 Index: realEstateServiceData:', realEstateServiceData ? 'Available' : 'Missing');
    console.log('📊 Index: eCommerceServiceData:', eCommerceServiceData ? 'Available' : 'Missing'); 
    console.log('📊 Index: faqItems:', faqItems ? `${faqItems.length} items` : 'Missing');
    
    return () => {
      console.log('🏠 Index: Component unmounting');
    };
  }, []);

  console.log('🏠 Index: Rendering Index page');

  return (
    <PerformanceWrapper>
      <div className="min-h-screen bg-white">
        {console.log('🔧 Index: Rendering SEOAndAnalytics')}
        <SEOAndAnalytics 
          realEstateServiceData={realEstateServiceData}
          eCommerceServiceData={eCommerceServiceData}
        />
        
        {console.log('🔧 Index: Rendering PageHeader')}
        <PageHeader />
        
        {console.log('🔧 Index: Rendering MainContent')}
        <MainContent faqItems={faqItems} />
        
        {console.log('🔧 Index: Rendering Footer (Suspense)')}
        <Suspense fallback={<LoadingFallback />}>
          <Footer />
        </Suspense>
        
        {console.log('🔧 Index: Rendering WhatsAppButton')}
        <WhatsAppButton />
      </div>
    </PerformanceWrapper>
  );
};

export default Index;
