import React, { Suspense, lazy, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import SEOAndAnalytics from "@/components/layout/SEOAndAnalytics";
import MainContent from "@/components/layout/MainContent";
import PerformanceWrapper from "@/components/layout/PerformanceWrapper";
import WhatsAppButton from "@/components/ChatButton";
import MobileSpeedOptimizer from "@/components/MobileSpeedOptimizer";
import { realEstateServiceData, eCommerceServiceData } from "@/data/schemaData";

// Lazy load footer
const Footer = lazy(() => import("@/components/Footer"));

// Enhanced loading fallback
const LoadingFallback = () => (
  <div className="h-20 bg-secondary/50 animate-pulse prevent-shift" aria-hidden="true" style={{ minHeight: '200px' }} />
);

const Index = () => {
  return (
    <PerformanceWrapper>
      <div className="min-h-screen bg-background">
        <MobileSpeedOptimizer />
        <SEOAndAnalytics 
          realEstateServiceData={realEstateServiceData}
          eCommerceServiceData={eCommerceServiceData}
        />
        
        <PageHeader />
        
        <MainContent />
        
        <Suspense fallback={<LoadingFallback />}>
          <Footer />
        </Suspense>
        
        <WhatsAppButton />
      </div>
    </PerformanceWrapper>
  );
};

export default Index;
