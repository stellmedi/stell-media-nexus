
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { initEmailJS } from "@/utils/emailService";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SiteSchemaMarkup from "./components/SiteSchemaMarkup";
import ScrollToTop from "./components/ScrollToTop";

// Service pages
import ProductDiscovery from "./pages/services/ProductDiscovery";
import DataEnrichment from "./pages/services/DataEnrichment";
import SEO from "./pages/services/SEO";
import SEM from "./pages/services/SEM";
import ConversionOptimization from "./pages/services/ConversionOptimization";

const queryClient = new QueryClient();

const App = () => {
  // Initialize EmailJS when the app starts
  useEffect(() => {
    initEmailJS();
    
    // Display a warning if EmailJS isn't properly configured
    if (!process.env.EMAILJS_SERVICE_ID && !process.env.EMAILJS_PUBLIC_KEY) {
      console.warn(
        "EmailJS environment variables not detected. " +
        "Please set up EmailJS credentials in environment variables or directly in emailService.ts file."
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HelmetProvider>
          <SiteSchemaMarkup />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPostPage />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/case-studies" element={<Services />} /> {/* Temporarily point to Services until a dedicated page is created */}
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Service pages */}
              <Route path="/services/product-discovery" element={<ProductDiscovery />} />
              <Route path="/services/data-enrichment" element={<DataEnrichment />} />
              <Route path="/services/seo" element={<SEO />} />
              <Route path="/services/sem" element={<SEM />} />
              <Route path="/services/conversion-optimization" element={<ConversionOptimization />} />
              <Route path="/services/search-migration" element={<ProductDiscovery />} /> {/* Temporarily point to ProductDiscovery until a dedicated page is created */}
              <Route path="/services/marketpulse" element={<DataEnrichment />} /> {/* Temporarily point to DataEnrichment until a dedicated page is created */}
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
