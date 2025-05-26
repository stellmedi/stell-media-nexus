
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import SEOManager from "@/components/admin/SEOManager";

const SEOManagement: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("stell_admin_authenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
      toast.error("Authentication required", {
        description: "Please login to access the admin dashboard"
      });
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>SEO Management | Stell Media Admin</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
            <p className="text-gray-600">Manage SEO metadata for all website pages</p>
          </header>
          
          <SEOManager />
        </div>
      </AdminLayout>
    </>
  );
};

export default SEOManagement;
