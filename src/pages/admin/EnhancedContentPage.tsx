
import React from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/use-supabase-admin";
import EnhancedContentManager from "@/components/admin/EnhancedContentManager";

export default function EnhancedContentPage() {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Content Management | Stell Media Admin</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-600">Manage website content with live database integration</p>
          </header>
          
          <EnhancedContentManager />
        </div>
      </AdminLayout>
    </>
  );
}
