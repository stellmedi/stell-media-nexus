import React, { useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { initEmailJS, isEmailJSConfigured } from "@/utils/emailService";
import { AdminAuthProvider } from "@/hooks/use-supabase-admin";
import { ChatProvider } from "@/hooks/use-chat";
import { AuthProvider } from "@/hooks/use-auth";

// Critical components (loaded immediately)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";

// Lazy load non-critical components
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Consultation = lazy(() => import("./pages/Consultation"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const Careers = lazy(() => import("./pages/Careers"));
const FAQ = lazy(() => import("./pages/FAQ"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const UsersManagement = lazy(() => import("./pages/admin/UsersManagement"));
const ActivityLogs = lazy(() => import("./pages/admin/ActivityLogs"));
const ContentManagement = lazy(() => import("./pages/admin/ContentManagement"));
const EmailManagement = lazy(() => import("./pages/admin/EmailManagement"));
const SettingsPage = lazy(() => import("@/pages/admin/SettingsPage"));
const SEOManagement = lazy(() => import("@/pages/admin/SEOManagement"));
const CaseStudies = lazy(() => import("@/pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("@/pages/CaseStudyDetail"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));

// Service pages
const ProductDiscovery = lazy(() => import("@/pages/services/ProductDiscovery"));
const DataEnrichment = lazy(() => import("@/pages/services/DataEnrichment"));
const SEO = lazy(() => import("@/pages/services/SEO"));
const SEM = lazy(() => import("@/pages/services/SEM"));
const ConversionOptimization = lazy(() => import("@/pages/services/ConversionOptimization"));

// Lazy load WhatsApp button for non-critical functionality
const WhatsAppButton = lazy(() => import("@/components/ChatButton"));

// Add new lazy loaded components
const RealEstate = lazy(() => import("@/pages/RealEstate"));
const ECommerce = lazy(() => import("@/pages/ECommerce"));

// Defer CSS import to reduce render-blocking
import("./styles/grid-pattern.css");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading component for suspense fallbacks
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
);

const AppContent = () => {
  // Initialize EmailJS and log configuration status
  useEffect(() => {
    // Defer EmailJS initialization to avoid blocking initial render
    const initializeEmailJS = () => {
      console.log("App: Initializing EmailJS...");
      
      if (isEmailJSConfigured()) {
        initEmailJS();
        console.log("App: EmailJS initialized successfully");
      } else {
        console.warn(
          "App: EmailJS credentials missing. Please configure SERVICE_ID, TEMPLATE_ID, and USER_ID in src/utils/emailService.ts"
        );
      }
    };

    // Defer initialization until after initial render
    const timer = setTimeout(initializeEmailJS, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/faq" element={<FAQ />} />

          {/* New sub-brand routes */}
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/ecommerce" element={<ECommerce />} />

          {/* Legal and sitemap */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* Case Studies */}
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:studyId" element={<CaseStudyDetail />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UsersManagement />} />
          <Route path="/admin/activity" element={<ActivityLogs />} />
          <Route path="/admin/content" element={<ContentManagement />} />
          <Route path="/admin/seo" element={<SEOManagement />} />
          <Route path="/admin/emails" element={<EmailManagement />} />
          <Route path="/admin/settings" element={<SettingsPage />} />

          {/* Service pages */}
          <Route path="/services/product-discovery" element={<ProductDiscovery />} />
          <Route path="/services/data-enrichment" element={<DataEnrichment />} />
          <Route path="/services/seo" element={<SEO />} />
          <Route path="/services/sem" element={<SEM />} />
          <Route path="/services/conversion-optimization" element={<ConversionOptimization />} />
          <Route path="/services/search-migration" element={<ProductDiscovery />} />
          <Route path="/services/marketpulse" element={<DataEnrichment />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <ChatProvider>
              <TooltipProvider>
                <SiteSchemaMarkup />
                <Toaster />
                <Sonner position="bottom-right" expand={true} closeButton />
                <AppContent />
              </TooltipProvider>
            </ChatProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
