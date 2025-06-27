
import React from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import UserManagement from "@/components/admin/UserManagement";
import { useAdminAuth } from "@/hooks/use-supabase-admin";

const AdminUsersPage: React.FC = () => {
  const { isAuthenticated, isLoading, adminUser } = useAdminAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (adminUser?.role !== "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <Helmet>
        <title>User Management | Stell Media Admin</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6">
          <UserManagement />
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminUsersPage;
