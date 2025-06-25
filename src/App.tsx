
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { ContentProvider } from "@/contexts/ContentContext";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import CaseStudies from "@/pages/CaseStudies";
import NotFound from "@/pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import UsersManagement from "@/pages/admin/UsersManagement";
import ContentManagementPage from "@/pages/admin/ContentManagement";
import EmailManagement from "@/pages/admin/EmailManagement";
import SettingsPage from "@/pages/admin/SettingsPage";
import { AdminAuthProvider } from "@/hooks/use-supabase-admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <ContentProvider>
        <HelmetProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UsersManagement />} />
                  <Route path="/admin/content" element={<ContentManagementPage />} />
                  <Route path="/admin/email" element={<EmailManagement />} />
                  <Route path="/admin/settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </HelmetProvider>
      </ContentProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
