import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Settings,
  Users,
  Bell
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

interface DashboardModule {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  component: React.ReactNode;
}

const ComprehensiveDashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('overview');

  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const modules = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
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
      title: 'Media Manager',
      icon: Image,
      component: <MediaManager />
    },
    {
      id: 'seo',
      title: 'SEO Settings',
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
      title: 'Blog Management',
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
      title: 'Analytics',
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
      title: 'QA Audit',
      icon: Shield,
      component: <QAudit />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Comprehensive Dashboard</h2>
        <p className="text-gray-600">Manage all aspects of your website</p>
      </div>

      <Tabs defaultValue={activeModule} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {modules.map((module) => (
            <TabsTrigger key={module.id} value={module.id}>
              <module.icon className="h-4 w-4 mr-2" />
              {module.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {modules.map((module) => (
          <TabsContent key={module.id} value={module.id} className="space-y-4">
            {module.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ComprehensiveDashboard;
