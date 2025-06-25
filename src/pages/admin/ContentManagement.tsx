import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/use-supabase-admin";
import { getAllPageSEO } from "@/hooks/use-page-seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { FileText, Eye, Edit, Plus, Search, Filter } from "lucide-react";

interface ContentMetadata {
  id: string;
  title: string;
  description: string;
  path: string;
  type: 'page' | 'blog' | 'service';
  status: 'published' | 'draft';
  lastModified: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

const availablePages = [
  { path: "/", name: "Home Page", type: 'page' as const },
  { path: "/about", name: "About Page", type: 'page' as const },
  { path: "/services", name: "Services Page", type: 'service' as const },
  { path: "/services/seo", name: "SEO Services", type: 'service' as const },
  { path: "/services/product-discovery", name: "Product Discovery", type: 'service' as const },
  { path: "/services/data-enrichment", name: "Data Enrichment", type: 'service' as const },
  { path: "/services/sem", name: "SEM Services", type: 'service' as const },
  { path: "/services/conversion-optimization", name: "Conversion Optimization", type: 'service' as const },
  { path: "/blog", name: "Blog Page", type: 'blog' as const },
  { path: "/contact", name: "Contact Page", type: 'page' as const },
  { path: "/careers", name: "Careers Page", type: 'page' as const },
  { path: "/case-studies", name: "Case Studies", type: 'page' as const },
  { path: "/faq", name: "FAQ Page", type: 'page' as const }
];

const mockMetadata: ContentMetadata[] = [
  {
    id: "1",
    title: "Home Page",
    description: "Main landing page showcasing Stell Media's services",
    path: "/",
    type: "page",
    status: "published",
    lastModified: "2024-01-15",
    metaTitle: "Stell Media - Digital Marketing & SEO Services",
    metaDescription: "Transform your digital presence with Stell Media's expert SEO, SEM, and conversion optimization services.",
    keywords: "digital marketing, SEO, SEM, conversion optimization"
  },
  {
    id: "2", 
    title: "About Page",
    description: "Company information and team details",
    path: "/about",
    type: "page",
    status: "published",
    lastModified: "2024-01-10",
    metaTitle: "About Stell Media - Your Digital Marketing Partner",
    metaDescription: "Learn about Stell Media's mission, values, and experienced team of digital marketing professionals.",
    keywords: "about stell media, digital marketing team, company"
  }
];

export default function ContentManagement() {
  const { isAuthenticated, isLoading, adminUser } = useAdminAuth();
  
  const [contentData, setContentData] = useState<ContentMetadata[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentMetadata | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'page' | 'blog' | 'service'>('all');

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const getMetadata = (): ContentMetadata[] => {
    console.log('ContentManagement: Loading metadata with real SEO data...');
    const seoData = getAllPageSEO();
    console.log('ContentManagement: Retrieved SEO data:', seoData);
    
    const content: ContentMetadata[] = availablePages.map((page, index) => {
      const pageSEO = seoData[page.path];
      const mockItem = mockMetadata.find(m => m.path === page.path);
      
      return {
        id: String(index + 1),
        title: page.name,
        description: pageSEO?.metaDescription || mockItem?.description || `Default description for ${page.name}`,
        path: page.path,
        type: page.type,
        status: (pageSEO ? 'published' : 'draft') as 'published' | 'draft',
        lastModified: pageSEO ? 'Recently updated' : mockItem?.lastModified || 'No SEO data',
        metaTitle: pageSEO?.metaTitle || mockItem?.metaTitle,
        metaDescription: pageSEO?.metaDescription || mockItem?.metaDescription,
        keywords: pageSEO?.keywords || mockItem?.keywords
      };
    });
    
    console.log('ContentManagement: Generated content metadata:', content);
    return content;
  };

  const loadContentData = () => {
    const metadata = getMetadata();
    setContentData(metadata);
  };

  useEffect(() => {
    loadContentData();

    // Listen for SEO data updates
    const handleSEODataUpdated = () => {
      console.log('ContentManagement: SEO data updated, reloading content data');
      loadContentData();
    };

    window.addEventListener('seoDataUpdated', handleSEODataUpdated);
    
    return () => {
      window.removeEventListener('seoDataUpdated', handleSEODataUpdated);
    };
  }, []);

  const openMetadataPreview = (content: ContentMetadata) => {
    console.log('ContentManagement: Opening metadata preview for:', content.path);
    setSelectedContent(content);
    setPreviewOpen(true);
  };

  const handleEditContent = (content: ContentMetadata) => {
    console.log('ContentManagement: Editing content for:', content.path);
    // Navigate to SEO management with the specific page selected
    window.location.href = `/admin/seo?page=${encodeURIComponent(content.path)}`;
  };

  const handleCreateNew = () => {
    toast.info("Create new content feature coming soon!");
  };

  const filteredContent = contentData.filter(content => 
    filterType === 'all' || content.type === filterType
  );

  return (
    <>
      <Helmet>
        <title>Content Management | Stell Media Admin</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6">
          <header className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
                <p className="text-gray-600">Manage and edit website content and metadata</p>
              </div>
              <Button onClick={handleCreateNew} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New
              </Button>
            </div>
          </header>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Filter by type:</span>
            </div>
            <div className="flex gap-2">
              {(['all', 'page', 'blog', 'service'] as const).map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Content Overview
              </CardTitle>
              <CardDescription>
                Manage content metadata and SEO settings for all pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContent.map((content) => (
                  <div key={content.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{content.title}</h3>
                        <p className="text-sm text-gray-600">{content.path}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={content.type === 'page' ? 'default' : content.type === 'service' ? 'secondary' : 'outline'}>
                          {content.type}
                        </Badge>
                        <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                          {content.status}
                        </Badge>
                        <button 
                          onClick={() => openMetadataPreview(content)}
                          className="p-2 hover:bg-gray-100 rounded"
                          title="Preview metadata"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditContent(content)}
                          className="p-2 hover:bg-gray-100 rounded"
                          title="Edit content"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {content.metaTitle || content.metaDescription ? (
                      <div className="space-y-2 bg-green-50 p-3 rounded">
                        {content.metaTitle && (
                          <p className="text-sm"><strong>Meta Title:</strong> {content.metaTitle}</p>
                        )}
                        {content.metaDescription && (
                          <p className="text-sm"><strong>Meta Description:</strong> {content.metaDescription}</p>
                        )}
                        {content.keywords && (
                          <p className="text-sm"><strong>Keywords:</strong> {content.keywords}</p>
                        )}
                      </div>
                    ) : (
                      <div className="bg-yellow-50 p-3 rounded">
                        <p className="text-sm text-yellow-800">No SEO metadata configured</p>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500">Last modified: {content.lastModified}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Content Metadata Preview</DialogTitle>
                <DialogDescription>
                  Preview how this content appears in search engines and social media
                </DialogDescription>
              </DialogHeader>
              
              {selectedContent && (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <h3 className="text-lg font-medium text-blue-900 mb-2">Search Engine Preview</h3>
                    <div className="space-y-1">
                      <p className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                        {selectedContent.metaTitle || selectedContent.title}
                      </p>
                      <p className="text-green-700 text-sm">
                        https://stellmedia.com{selectedContent.path}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {selectedContent.metaDescription || selectedContent.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Page Path</label>
                      <p className="text-sm text-gray-900">{selectedContent.path}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Content Type</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedContent.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <Badge variant={selectedContent.status === 'published' ? 'default' : 'secondary'}>
                        {selectedContent.status}
                      </Badge>
                    </div>
                    {selectedContent.keywords && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Keywords</label>
                        <p className="text-sm text-gray-900">{selectedContent.keywords}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </>
  );
}
