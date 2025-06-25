
import React from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/use-supabase-admin";
import SEOManagement from "@/components/admin/SEOManagement";

export default function SEOManagementPage() {
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
        <title>SEO Management | Stell Media Admin</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
            <p className="text-gray-600">Manage website SEO settings and optimization</p>
          </header>
          
          <SEOManagement />
        </div>
      </AdminLayout>
    </>
  );
}
