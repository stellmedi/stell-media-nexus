
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
import LeadGeneration from './pages/services/LeadGeneration';
import ThreeDVisualization from './pages/services/ThreeDVisualization';
import CRMLeadManagement from './pages/services/CRMLeadManagement';
import Creative from './pages/services/Creative';
import CatalogSEO from './pages/services/CatalogSEO';
import EcommercePerformanceMarketing from './pages/services/EcommercePerformanceMarketing';
import RealEstatePage from './pages/RealEstate';
import ECommercePage from './pages/ECommerce';
import ConsultationPage from './pages/Consultation';
import AdminPage from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EnhancedContentPage from './pages/admin/EnhancedContentPage';
import SEOManagerPage from './pages/admin/SEOManagementPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import NotFound from './pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContentProvider } from "@/contexts/ContentContext";
import { AdminAuthProvider } from "@/hooks/use-supabase-admin";

const queryClient = new QueryClient();

function App() {
  console.log('🏠 App: Component rendering started');
  
  try {
    console.log('🔄 App: Setting up providers and router');
    
    return (
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AdminAuthProvider>
              <ContentProvider>
                <Toaster position="bottom-center" richColors closeButton />
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
                  <Route path="/services/lead-generation" element={<LeadGeneration />} />
                  <Route path="/services/3d-visualization" element={<ThreeDVisualization />} />
                  <Route path="/services/crm-lead-management" element={<CRMLeadManagement />} />
                  <Route path="/services/creative" element={<Creative />} />
                  <Route path="/services/catalog-seo" element={<CatalogSEO />} />
                  <Route path="/services/ecommerce-performance-marketing" element={<EcommercePerformanceMarketing />} />
                  <Route path="/real-estate" element={<RealEstatePage />} />
                  <Route path="/ecommerce" element={<ECommercePage />} />
                  <Route path="/consultation" element={<ConsultationPage />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/content" element={<EnhancedContentPage />} />
                  <Route path="/admin/seo" element={<SEOManagerPage />} />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  
                  {/* 404 Catch-all Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ContentProvider>
            </AdminAuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    );
  } catch (error) {
    console.error('❌ App: Error in component render:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-xl font-bold text-red-600 mb-4">Application Error</h1>
          <p className="text-gray-700 mb-4">The application failed to load. Check the console for details.</p>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

export default App;
