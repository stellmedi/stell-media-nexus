
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPageSEO } from "@/hooks/use-page-seo";
import { Eye, Edit, FileText } from "lucide-react";

interface ContentMetadata {
  title: string;
  description: string;
  lastModified: string;
  status: 'published' | 'draft';
  path: string;
  seoData?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

const availablePages = [
  { path: "/", name: "Home Page" },
  { path: "/about", name: "About Page" },
  { path: "/services", name: "Services Page" },
  { path: "/services/seo", name: "SEO Services" },
  { path: "/services/product-discovery", name: "Product Discovery" },
  { path: "/services/data-enrichment", name: "Data Enrichment" },
  { path: "/services/sem", name: "SEM Services" },
  { path: "/services/conversion-optimization", name: "Conversion Optimization" },
  { path: "/blog", name: "Blog Page" },
  { path: "/contact", name: "Contact Page" },
  { path: "/careers", name: "Careers Page" },
  { path: "/case-studies", name: "Case Studies" },
  { path: "/faq", name: "FAQ Page" }
];

export default function ContentMetadataDisplay() {
  const [contentData, setContentData] = useState<ContentMetadata[]>([]);

  const loadContentData = () => {
    console.log('ContentMetadataDisplay: Loading content data...');
    const seoData = getAllPageSEO();
    console.log('ContentMetadataDisplay: Retrieved SEO data:', seoData);
    
    const content: ContentMetadata[] = availablePages.map(page => {
      const pageSEO = seoData[page.path];
      return {
        title: page.name,
        description: pageSEO?.metaDescription || `Default description for ${page.name}`,
        lastModified: pageSEO ? 'Recently updated' : 'No SEO data',
        status: (pageSEO ? 'published' : 'draft') as 'published' | 'draft',
        path: page.path,
        seoData: pageSEO ? {
          metaTitle: pageSEO.metaTitle,
          metaDescription: pageSEO.metaDescription,
          keywords: pageSEO.keywords
        } : undefined
      };
    });
    
    setContentData(content);
  };

  useEffect(() => {
    loadContentData();

    // Listen for SEO data updates
    const handleSEODataUpdated = () => {
      console.log('ContentMetadataDisplay: SEO data updated, reloading content data');
      loadContentData();
    };

    window.addEventListener('seoDataUpdated', handleSEODataUpdated);
    
    return () => {
      window.removeEventListener('seoDataUpdated', handleSEODataUpdated);
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Content Overview
          </CardTitle>
          <CardDescription>
            View and manage content metadata across all pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentData.map((content) => (
              <div key={content.path} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{content.title}</h3>
                    <p className="text-sm text-gray-600">{content.path}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                      {content.status}
                    </Badge>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {content.seoData ? (
                  <div className="space-y-2 bg-green-50 p-3 rounded">
                    <p className="text-sm"><strong>Meta Title:</strong> {content.seoData.metaTitle}</p>
                    <p className="text-sm"><strong>Meta Description:</strong> {content.seoData.metaDescription}</p>
                    {content.seoData.keywords && (
                      <p className="text-sm"><strong>Keywords:</strong> {content.seoData.keywords}</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-3 rounded">
                    <p className="text-sm text-yellow-800">No SEO data configured for this page</p>
                  </div>
                )}
                
                <p className="text-xs text-gray-500">Last modified: {content.lastModified}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
