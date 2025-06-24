
import React from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import SEOManager from "@/components/admin/SEOManager";
import ContentMetadataDisplay from "@/components/admin/ContentMetadataDisplay";
import SEOVerification from "@/components/admin/SEOVerification";
import GlobalSEOManager from "@/components/admin/GlobalSEOManager";
import AIPoweredSEO from "@/components/admin/AIPoweredSEO";
import RedirectManager from "@/components/admin/RedirectManager";
import RobotsManager from "@/components/admin/RobotsManager";
import SitemapManager from "@/components/admin/SitemapManager";
import MetaTemplateManager from "@/components/admin/MetaTemplateManager";
import { useAdminAuth } from "@/hooks/use-supabase-admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SEOManagement: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <Helmet>
        <title>SEO Management | Stell Media Admin</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
            <p className="text-gray-600">Complete SEO management suite for your website</p>
          </header>
          
          <Tabs defaultValue="seo-manager" className="w-full">
            <TabsList className="grid w-full grid-cols-9 text-xs">
              <TabsTrigger value="seo-manager">Page SEO</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="redirects">Redirects</TabsTrigger>
              <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
              <TabsTrigger value="robots">Robots.txt</TabsTrigger>
              <TabsTrigger value="ai-seo">AI SEO</TabsTrigger>
              <TabsTrigger value="global-settings">Global</TabsTrigger>
              <TabsTrigger value="verification">Verify</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="seo-manager" className="mt-6">
              <SEOManager />
            </TabsContent>
            
            <TabsContent value="templates" className="mt-6">
              <MetaTemplateManager />
            </TabsContent>
            
            <TabsContent value="redirects" className="mt-6">
              <RedirectManager />
            </TabsContent>
            
            <TabsContent value="sitemap" className="mt-6">
              <SitemapManager />
            </TabsContent>
            
            <TabsContent value="robots" className="mt-6">
              <RobotsManager />
            </TabsContent>
            
            <TabsContent value="ai-seo" className="mt-6">
              <AIPoweredSEO />
            </TabsContent>
            
            <TabsContent value="global-settings" className="mt-6">
              <GlobalSEOManager />
            </TabsContent>
            
            <TabsContent value="verification" className="mt-6">
              <SEOVerification />
            </TabsContent>
            
            <TabsContent value="overview" className="mt-6">
              <ContentMetadataDisplay />
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
};

export default SEOManagement;
