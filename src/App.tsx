
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AdminAuthProvider } from "@/hooks/use-supabase-admin";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const RealEstate = lazy(() => import("./pages/RealEstate"));
const ECommerce = lazy(() => import("./pages/ECommerce"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Consultation = lazy(() => import("./pages/Consultation"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Careers = lazy(() => import("./pages/Careers"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Service pages
const SEO = lazy(() => import("./pages/services/SEO"));
const SEM = lazy(() => import("./pages/services/SEM"));
const ProductDiscovery = lazy(() => import("./pages/services/ProductDiscovery"));
const DataEnrichment = lazy(() => import("./pages/services/DataEnrichment"));
const ConversionOptimization = lazy(() => import("./pages/services/ConversionOptimization"));
const VirtualTours = lazy(() => import("./pages/services/VirtualTours"));
const ThreeDVisualization = lazy(() => import("./pages/services/ThreeDVisualization"));
const CRMLeadManagement = lazy(() => import("./pages/services/CRMLeadManagement"));
const LeadGeneration = lazy(() => import("./pages/services/LeadGeneration"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ComprehensiveDashboard = lazy(() => import("./pages/admin/ComprehensiveDashboard"));
const ContentManagement = lazy(() => import("./pages/admin/ContentManagement"));
const SEOManagement = lazy(() => import("./pages/admin/SEOManagement"));
const EmailManagement = lazy(() => import("./pages/admin/EmailManagement"));
const UsersManagement = lazy(() => import("./pages/admin/UsersManagement"));
const SettingsPage = lazy(() => import("./pages/admin/SettingsPage"));
const ActivityLogs = lazy(() => import("./pages/admin/ActivityLogs"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/real-estate" element={<RealEstate />} />
              <Route path="/ecommerce" element={<ECommerce />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/sitemap" element={<Sitemap />} />
              
              {/* Service pages */}
              <Route path="/services/seo" element={<SEO />} />
              <Route path="/services/sem" element={<SEM />} />
              <Route path="/services/product-discovery" element={<ProductDiscovery />} />
              <Route path="/services/data-enrichment" element={<DataEnrichment />} />
              <Route path="/services/conversion-optimization" element={<ConversionOptimization />} />
              <Route path="/services/virtual-tours" element={<VirtualTours />} />
              <Route path="/services/3d-visualization" element={<ThreeDVisualization />} />
              <Route path="/services/crm-lead-management" element={<CRMLeadManagement />} />
              <Route path="/services/lead-generation" element={<LeadGeneration />} />
              
              {/* Admin routes wrapped with AdminAuthProvider */}
              <Route path="/admin/*" element={
                <AdminAuthProvider>
                  <Routes>
                    <Route path="login" element={<AdminLogin />} />
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="dashboard" element={<ComprehensiveDashboard />} />
                    <Route path="content" element={<ContentManagement />} />
                    <Route path="seo" element={<SEOManagement />} />
                    <Route path="email" element={<EmailManagement />} />
                    <Route path="users" element={<UsersManagement />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="logs" element={<ActivityLogs />} />
                  </Routes>
                </AdminAuthProvider>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
