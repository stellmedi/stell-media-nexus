
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { initEmailJS, isEmailJSConfigured } from "@/utils/emailService";
import { AuthProvider } from "@/hooks/use-auth";
import { ChatProvider } from "@/hooks/use-chat";
import WhatsAppButton from "@/components/ChatButton";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Consultation from "./pages/Consultation";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import EmailManagement from "./pages/admin/EmailManagement";
import SettingsPage from "./pages/admin/SettingsPage";
import SEOManagement from "./pages/admin/SEOManagement";
import SiteSchemaMarkup from "./components/SiteSchemaMarkup";
import ScrollToTop from "./components/ScrollToTop";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Sitemap from "./pages/Sitemap";

// Service pages
import ProductDiscovery from "./pages/services/ProductDiscovery";
import DataEnrichment from "./pages/services/DataEnrichment";
import SEO from "./pages/services/SEO";
import SEM from "./pages/services/SEM";
import ConversionOptimization from "./pages/services/ConversionOptimization";

// Add CSS for the grid pattern
import "./styles/grid-pattern.css";

const queryClient = new QueryClient();

const App = () => {
  // Initialize EmailJS when the app starts
  useEffect(() => {
    initEmailJS();
    
    // Display a warning if EmailJS isn't properly configured
    if (!isEmailJSConfigured()) {
      console.warn(
        "EmailJS environment variables not detected. " +
        "Please set up EmailJS credentials in environment variables or directly in emailService.ts file."
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <HelmetProvider>
            <ChatProvider>
              <SiteSchemaMarkup />
              <Toaster />
              <Sonner position="bottom-right" expand={true} closeButton />
              <BrowserRouter>
                <ScrollToTop />
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
                  
                  {/* Legal and sitemap pages */}
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  
                  {/* Case Studies routes */}
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:studyId" element={<CaseStudyDetail />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UsersManagement />} />
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
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <WhatsAppButton />
              </BrowserRouter>
            </ChatProvider>
          </HelmetProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
