
import React from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import SEOManager from "@/components/admin/SEOManager";
import ContentMetadataDisplay from "@/components/admin/ContentMetadataDisplay";
import SEOVerification from "@/components/admin/SEOVerification";
import GlobalSEOManager from "@/components/admin/GlobalSEOManager";
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
            <p className="text-gray-600">Manage SEO metadata, analytics, and global settings</p>
          </header>
          
          <Tabs defaultValue="seo-manager" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="seo-manager">Page SEO</TabsTrigger>
              <TabsTrigger value="global-settings">Global Settings</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="content-overview">Overview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="seo-manager" className="mt-6">
              <SEOManager />
            </TabsContent>
            
            <TabsContent value="global-settings" className="mt-6">
              <GlobalSEOManager />
            </TabsContent>
            
            <TabsContent value="verification" className="mt-6">
              <SEOVerification />
            </TabsContent>
            
            <TabsContent value="content-overview" className="mt-6">
              <ContentMetadataDisplay />
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
};

export default SEOManagement;
