
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import SiteSchemaMarkup from './components/SiteSchemaMarkup';
import GoogleAnalytics from './components/GoogleAnalytics';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import HomePage from './pages/Index';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import ContactPage from './pages/Contact';
import BlogPage from './pages/Blog';
import CaseStudiesPage from './pages/CaseStudies';
import FAQPage from './pages/FAQ';
import CareersPage from './pages/Careers';
import ServiceSEOPage from './pages/services/SEO';
import ServiceProductDiscoveryPage from './pages/services/ProductDiscovery';
import ServiceDataEnrichmentPage from './pages/services/DataEnrichment';
import ServiceSEMPage from './pages/services/SEM';
import ServiceConversionOptimizationPage from './pages/services/ConversionOptimization';
import RealEstatePage from './pages/RealEstate';
import ECommercePage from './pages/ECommerce';
import ConsultationPage from './pages/Consultation';
import AdminPage from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EnhancedContentPage from './pages/admin/EnhancedContentPage';
import SEOManagerPage from './pages/admin/SEOManagementPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContentProvider } from "@/contexts/ContentContext";
import { AdminAuthProvider } from "@/hooks/use-supabase-admin";

const queryClient = new QueryClient();

function App() {
  console.log("🚀 App: Application starting up");
  
  // Add error boundary logging
  window.addEventListener('error', (event) => {
    console.error('🔥 Global Error:', event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('🔥 Unhandled Promise Rejection:', event.reason);
  });

  console.log("🚀 App: Rendering core components");

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AdminAuthProvider>
            <ContentProvider>
              <Toaster />
              <ScrollToTop />
              <SiteSchemaMarkup />
              <GoogleAnalytics />
              <ScrollProgressIndicator />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/services/seo" element={<ServiceSEOPage />} />
                <Route path="/services/product-discovery" element={<ServiceProductDiscoveryPage />} />
                <Route path="/services/data-enrichment" element={<ServiceDataEnrichmentPage />} />
                <Route path="/services/sem" element={<ServiceSEMPage />} />
                <Route path="/services/conversion-optimization" element={<ServiceConversionOptimizationPage />} />
                <Route path="/real-estate" element={<RealEstatePage />} />
                <Route path="/ecommerce" element={<ECommercePage />} />
                <Route path="/consultation" element={<ConsultationPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/content" element={<EnhancedContentPage />} />
                <Route path="/admin/seo" element={<SEOManagerPage />} />
              </Routes>
            </ContentProvider>
          </AdminAuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
