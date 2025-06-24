
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3,
  FileText,
  Image,
  Search,
  Layout,
  BookOpen,
  Mail,
  TrendingUp,
  Code,
  Database,
  Shield,
  Building2,
  ShoppingCart
} from "lucide-react";
import QuickStats from '@/components/admin/QuickStats';
import ContentEditor from '@/components/admin/ContentEditor';
import MediaManager from '@/components/admin/MediaManager';
import AIPoweredSEO from '@/components/admin/AIPoweredSEO';
import PageBuilder from '@/components/admin/PageBuilder';
import BlogManager from '@/components/admin/BlogManager';
import FormManager from '@/components/admin/FormManager';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import ScriptManager from '@/components/admin/ScriptManager';
import BackupRestore from '@/components/admin/BackupRestore';
import QAudit from '@/components/admin/QAudit';

const ComprehensiveDashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('overview');

  const modules = [
    {
      id: 'overview',
      title: 'Analytics Overview',
      icon: BarChart3,
      component: <QuickStats />
    },
    {
      id: 'content',
      title: 'Content Management',
      icon: FileText,
      component: <ContentEditor />
    },
    {
      id: 'media',
      title: 'Media Library',
      icon: Image,
      component: <MediaManager />
    },
    {
      id: 'seo',
      title: 'SEO Tools',
      icon: Search,
      component: <AIPoweredSEO />
    },
    {
      id: 'page-builder',
      title: 'Page Builder',
      icon: Layout,
      component: <PageBuilder />
    },
    {
      id: 'blog',
      title: 'Blog Posts',
      icon: BookOpen,
      component: <BlogManager />
    },
    {
      id: 'forms',
      title: 'Form Submissions',
      icon: Mail,
      component: <FormManager />
    },
    {
      id: 'analytics',
      title: 'Performance Analytics',
      icon: TrendingUp,
      component: <AnalyticsDashboard />
    },
    {
      id: 'scripts',
      title: 'Script Manager',
      icon: Code,
      component: <ScriptManager />
    },
    {
      id: 'backup',
      title: 'Backup & Restore',
      icon: Database,
      component: <BackupRestore />
    },
    {
      id: 'qa-audit',
      title: 'Quality Audit',
      icon: Shield,
      component: <QAudit />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Stell Media Management Console</h2>
        <p className="text-gray-600 mt-2">Comprehensive tools for managing your digital marketing platform</p>
      </div>

      {/* Service Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Building2 className="h-5 w-5" />
              Real Estate Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700">Lead generation, CRM automation, and virtual tours for real estate developers</p>
          </CardContent>
        </Card>
        
        <Card className="border border-purple-200 bg-purple-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <ShoppingCart className="h-5 w-5" />
              E-commerce Solutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700">Product discovery, catalog optimization, and performance marketing</p>
          </CardContent>
        </Card>
        
        <Card className="border border-green-200 bg-green-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <TrendingUp className="h-5 w-5" />
              Growth Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700">Performance tracking, conversion optimization, and ROI analysis</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeModule} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 xl:grid-cols-11 gap-1">
          {modules.map((module) => (
            <TabsTrigger 
              key={module.id} 
              value={module.id}
              className="flex items-center gap-1 text-xs px-2 py-2"
            >
              <module.icon className="h-3 w-3" />
              <span className="hidden sm:inline">{module.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {modules.map((module) => (
          <TabsContent key={module.id} value={module.id} className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <module.icon className="h-5 w-5" />
                  {module.title}
                </CardTitle>
                <CardDescription>
                  Manage {module.title.toLowerCase()} for your digital marketing platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {module.component}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ComprehensiveDashboard;
