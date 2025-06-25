import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import SiteSchemaMarkup from './components/SiteSchemaMarkup';
import GoogleAnalytics from './components/GoogleAnalytics';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import FAQPage from './pages/FAQPage';
import CareersPage from './pages/CareersPage';
import ServiceSEOPage from './pages/ServiceSEOPage';
import ServiceProductDiscoveryPage from './pages/ServiceProductDiscoveryPage';
import ServiceDataEnrichmentPage from './pages/ServiceDataEnrichmentPage';
import ServiceSEMPage from './pages/ServiceSEMPage';
import ServiceConversionOptimizationPage from './pages/ServiceConversionOptimizationPage';
import RealEstatePage from './pages/RealEstatePage';
import ECommercePage from './pages/ECommercePage';
import ConsultationPage from './pages/ConsultationPage';
import AdminPage from './pages/admin/AdminPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EnhancedContentPage from './pages/admin/EnhancedContentPage';
import SEOManagerPage from './pages/admin/SEOManagerPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ContentProvider } from "@/contexts/ContentContext";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
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
              
              {/* Admin Routes - Secure these properly! */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/content" element={<EnhancedContentPage />} />
              <Route path="/admin/seo" element={<SEOManagerPage />} />
            </Routes>
          </ContentProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
