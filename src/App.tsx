
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Consultation from './pages/Consultation';
import Careers from './pages/Careers';
import SEOServices from './pages/services/SEO';
import ProductDiscovery from './pages/services/ProductDiscovery';
import DataEnrichment from './pages/services/DataEnrichment';
import ConversionOptimization from './pages/services/ConversionOptimization';
import SEM from './pages/services/SEM';
import Sitemap from './pages/Sitemap';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ContentManagement from './pages/admin/ContentManagement';
import EmailManagement from './pages/admin/EmailManagement';
import SettingsPage from './pages/admin/SettingsPage';
import UsersManagement from './pages/admin/UsersManagement';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import SiteSchemaMarkup from './components/SiteSchemaMarkup';
import { MetadataProvider } from './context/MetadataContext';
import { ChatProvider } from './hooks/use-chat';

function App() {
  return (
    <HelmetProvider>
      <MetadataProvider>
        <ChatProvider>
          <Router>
            <ScrollToTop />
            <SiteSchemaMarkup />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/seo" element={<SEOServices />} />
              <Route path="/services/product-discovery" element={<ProductDiscovery />} />
              <Route path="/services/data-enrichment" element={<DataEnrichment />} />
              <Route path="/services/conversion-optimization" element={<ConversionOptimization />} />
              <Route path="/services/sem" element={<SEM />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/content" element={<ContentManagement />} />
              <Route path="/admin/email" element={<EmailManagement />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/users" element={<UsersManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <SonnerToaster position="top-right" />
          </Router>
        </ChatProvider>
      </MetadataProvider>
    </HelmetProvider>
  );
}

export default App;
