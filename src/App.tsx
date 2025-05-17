
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

// Service pages
import ProductDiscovery from "./pages/services/ProductDiscovery";
import DataEnrichment from "./pages/services/DataEnrichment";
import SEO from "./pages/services/SEO";
import SEM from "./pages/services/SEM";
import ConversionOptimization from "./pages/services/ConversionOptimization";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/case-studies" element={<Services />} /> {/* Temporarily point to Services until a dedicated page is created */}
          
          {/* Service pages */}
          <Route path="/services/product-discovery" element={<ProductDiscovery />} />
          <Route path="/services/data-enrichment" element={<DataEnrichment />} />
          <Route path="/services/seo" element={<SEO />} />
          <Route path="/services/sem" element={<SEM />} />
          <Route path="/services/conversion-optimization" element={<ConversionOptimization />} />
          
          {/* Blog post pages - would normally have dedicated pages */}
          <Route path="/blog/:postId" element={<Blog />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
