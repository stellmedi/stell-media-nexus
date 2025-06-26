
import React, { Suspense, lazy } from "react";
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
const LoadingFallback = () => (
  <div className="h-20 bg-gray-50 animate-pulse prevent-shift" aria-hidden="true" style={{ minHeight: '200px' }} />
);

const Index = () => {
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
};

export default Index;
