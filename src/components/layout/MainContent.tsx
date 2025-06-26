
import React, { Suspense, lazy } from 'react';
import SocialProofSection from "@/components/SocialProofSection";

// Lazy load below-the-fold components
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const EnhancedTestimonials = lazy(() => import("@/components/EnhancedTestimonials"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));

// Optimized loading component with reserved space
const LoadingFallback = ({ height = "h-20" }: { height?: string }) => (
  <div className={`${height} bg-gray-50 animate-pulse prevent-shift`} aria-hidden="true" style={{ minHeight: '200px' }} />
);

interface MainContentProps {
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
}

const MainContent: React.FC<MainContentProps> = ({ faqItems }) => {
  return (
    <main role="main">
      {/* Social Proof Section */}
      <SocialProofSection />
      
      {/* Below-the-fold content with lazy loading and reserved space */}
      <Suspense fallback={<LoadingFallback />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback height="h-40" />}>
        <EnhancedTestimonials />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback height="h-40" />}>
        <ContactSection />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback height="h-40" />}>
        <FAQSection items={faqItems} />
      </Suspense>
    </main>
  );
};

export default MainContent;
