
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

// Enhanced loading fallback with debugging
const LoadingFallback = () => {
  console.log('🔄 Index: Loading fallback rendered');
  return (
    <div className="h-20 bg-gray-50 animate-pulse prevent-shift" aria-hidden="true" style={{ minHeight: '200px' }} />
  );
};

const Index = () => {
  console.log('🏠 Index: HomePage component rendering');
  
  useEffect(() => {
    console.log('🏠 Index: Page loaded and mounted');
    console.log('🏠 Index: realEstateServiceData:', realEstateServiceData);
    console.log('🏠 Index: eCommerceServiceData:', eCommerceServiceData);
    console.log('🏠 Index: faqItems:', faqItems);
  }, []);

  try {
    console.log('🔄 Index: Rendering page components');
    
    return (
      <PerformanceWrapper>
        <div className="min-h-screen bg-white">
          <SEOAndAnalytics 
            realEstateServiceData={realEstateServiceData}
            eCommerceServiceData={eCommerceServiceData}
          />
          
          <PageHeader />
          
          <MainContent faqItems={faqItems} />
          
          <Suspense fallback={<LoadingFallback />}>
            <Footer />
          </Suspense>
          
          <WhatsAppButton />
        </div>
      </PerformanceWrapper>
    );
  } catch (error) {
    console.error('❌ Index: Error rendering HomePage:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-red-600 mb-4">Page Load Error</h1>
          <p className="text-gray-700">The homepage failed to load. Check console for details.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
};

export default Index;
