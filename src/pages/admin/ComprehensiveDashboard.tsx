
import React from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/use-supabase-admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  FileText,
  Image,
  Search,
  Wand2,
  Blocks,
  Users,
  Mail,
  PenTool,
  BarChart3,
  Code,
  Database,
  Activity,
  Settings
} from "lucide-react";

// Import existing components
import SEOManager from "@/components/admin/SEOManager";
import ContentMetadataDisplay from "@/components/admin/ContentMetadataDisplay";
import SEOVerification from "@/components/admin/SEOVerification";
import GlobalSEOManager from "@/components/admin/GlobalSEOManager";

// Import new components we'll create
import ContentEditor from "@/components/admin/ContentEditor";
import MediaManager from "@/components/admin/MediaManager";
import AIPoweredSEO from "@/components/admin/AIPoweredSEO";
import PageBuilder from "@/components/admin/PageBuilder";
import BlogManager from "@/components/admin/BlogManager";
import FormManager from "@/components/admin/FormManager";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import ScriptManager from "@/components/admin/ScriptManager";
import BackupRestore from "@/components/admin/BackupRestore";
import QuickStats from "@/components/admin/QuickStats";

const ComprehensiveDashboard: React.FC = () => {
  const { isAuthenticated, isLoading, adminUser } = useAdminAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const dashboardSections = [
    {
      id: "overview",
      label: "Dashboard",
      icon: LayoutDashboard,
      component: <QuickStats />,
      permission: "viewer"
    },
    {
      id: "content",
      label: "Content",
      icon: FileText,
      component: <ContentEditor />,
      permission: "editor"
    },
    {
      id: "media",
      label: "Media",
      icon: Image,
      component: <MediaManager />,
      permission: "editor"
    },
    {
      id: "seo-basic",
      label: "SEO Settings",
      icon: Search,
      component: (
        <Tabs defaultValue="page-seo" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="page-seo">Page SEO</TabsTrigger>
            <TabsTrigger value="global-settings">Global Settings</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="page-seo" className="mt-6">
            <SEOManager />
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
      ),
      permission: "editor"
    },
    {
      id: "ai-seo",
      label: "AI SEO",
      icon: Wand2,
      component: <AIPoweredSEO />,
      permission: "editor"
    },
    {
      id: "page-builder",
      label: "Page Builder",
      icon: Blocks,
      component: <PageBuilder />,
      permission: "editor"
    },
    {
      id: "blog",
      label: "Blog",
      icon: PenTool,
      component: <BlogManager />,
      permission: "editor"
    },
    {
      id: "forms",
      label: "Forms",
      icon: Mail,
      component: <FormManager />,
      permission: "viewer"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      component: <AnalyticsDashboard />,
      permission: "viewer"
    },
    {
      id: "scripts",
      label: "Scripts",
      icon: Code,
      component: <ScriptManager />,
      permission: "admin"
    },
    {
      id: "backup",
      label: "Backup",
      icon: Database,
      component: <BackupRestore />,
      permission: "admin"
    }
  ];

  const hasPermission = (required: string) => {
    if (!adminUser) return false;
    if (adminUser.role === 'admin') return true;
    if (adminUser.role === 'editor' && ['viewer', 'editor'].includes(required)) return true;
    if (adminUser.role === 'viewer' && required === 'viewer') return true;
    return false;
  };

  const filteredSections = dashboardSections.filter(section => 
    hasPermission(section.permission)
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Stell Tech Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <AdminLayout>
        <div className="p-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Comprehensive content management system for Stell Tech Academy
            </p>
          </header>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 mb-6">
              {filteredSections.map((section) => (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id}
                  className="flex flex-col items-center gap-1 p-3"
                >
                  <section.icon className="h-4 w-4" />
                  <span className="text-xs hidden sm:block">{section.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {filteredSections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="mt-6">
                {section.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
};

export default ComprehensiveDashboard;
