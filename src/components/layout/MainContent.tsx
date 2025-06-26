
import React, { Suspense, lazy, useEffect } from 'react';
import SocialProofSection from "@/components/SocialProofSection";

// Lazy load below-the-fold components
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const EnhancedTestimonials = lazy(() => import("@/components/EnhancedTestimonials"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));

// Optimized loading component with reserved space
const LoadingFallback = ({ height = "h-20" }: { height?: string }) => {
  console.log('⏳ MainContent: LoadingFallback rendered for height:', height);
  return (
    <div className={`${height} bg-gray-50 animate-pulse prevent-shift`} aria-hidden="true" style={{ minHeight: '200px' }} />
  );
};

interface MainContentProps {
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
}

const MainContent: React.FC<MainContentProps> = ({ faqItems }) => {
  useEffect(() => {
    console.log('📰 MainContent: Component mounted with faqItems:', faqItems?.length || 0);
    return () => {
      console.log('📰 MainContent: Component unmounting');
    };
  }, [faqItems]);

  console.log('📰 MainContent: Rendering MainContent');

  return (
    <main role="main">
      {console.log('📰 MainContent: Rendering SocialProofSection')}
      <SocialProofSection />
      
      {/* Below-the-fold content with lazy loading and reserved space */}
      {console.log('📰 MainContent: Rendering ServicesSection (Suspense)')}
      <Suspense fallback={<LoadingFallback />}>
        <ServicesSection />
      </Suspense>
      
      {console.log('📰 MainContent: Rendering EnhancedTestimonials (Suspense)')}
      <Suspense fallback={<LoadingFallback height="h-40" />}>
        <EnhancedTestimonials />
      </Suspense>
      
      {console.log('📰 MainContent: Rendering ContactSection (Suspense)')}
      <Suspense fallback={<LoadingFallback height="h-40" />}>
        <ContactSection />
      </Suspense>
      
      {console.log('📰 MainContent: Rendering FAQSection (Suspense)')}
      <Suspense fallback={<LoadingFallback height="h-40" />}>
        <FAQSection items={faqItems} />
      </Suspense>
    </main>
  );
};

export default MainContent;
