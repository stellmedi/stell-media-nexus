
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllPageSEO } from '@/hooks/use-page-seo';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function SEOVerification() {
  const [seoData, setSeoData] = useState<any>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadSEOData = () => {
    setIsRefreshing(true);
    const data = getAllPageSEO();
    setSeoData(data);
    console.log('SEOVerification: Loaded SEO data:', data);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    loadSEOData();
    
    // Listen for SEO updates
    const handleSEOUpdate = () => {
      console.log('SEOVerification: SEO data updated, refreshing...');
      loadSEOData();
    };
    
    window.addEventListener('seoDataUpdated', handleSEOUpdate);
    
    return () => {
      window.removeEventListener('seoDataUpdated', handleSEOUpdate);
    };
  }, []);

  const getPageStatus = (pageData: any) => {
    if (!pageData) return { status: 'empty', icon: XCircle, color: 'bg-gray-100 text-gray-600' };
    
    const hasBasicSEO = pageData.metaTitle && pageData.metaDescription;
    const hasSocialSEO = pageData.ogTitle && pageData.ogDescription;
    
    if (hasBasicSEO && hasSocialSEO) {
      return { status: 'complete', icon: CheckCircle, color: 'bg-green-100 text-green-700' };
    } else if (hasBasicSEO) {
      return { status: 'partial', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-700' };
    } else {
      return { status: 'incomplete', icon: XCircle, color: 'bg-red-100 text-red-700' };
    }
  };

  const pageList = [
    { path: '/', name: 'Home Page' },
    { path: '/about', name: 'About' },
    { path: '/services', name: 'Services' },
    { path: '/contact', name: 'Contact' },
    { path: '/blog', name: 'Blog' },
    { path: '/careers', name: 'Careers' }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SEO Implementation Status</CardTitle>
            <CardDescription>Verify that SEO changes are properly saved and applied</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadSEOData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Total pages with SEO data: <strong>{Object.keys(seoData).length}</strong>
          </div>
          
          <div className="grid gap-3">
            {pageList.map((page) => {
              const pageData = seoData[page.path];
              const status = getPageStatus(pageData);
              const StatusIcon = status.icon;
              
              return (
                <div key={page.path} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <StatusIcon className="h-5 w-5 text-current" />
                    <div>
                      <div className="font-medium">{page.name}</div>
                      <div className="text-sm text-gray-500">{page.path}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {pageData && (
                      <div className="text-xs text-gray-500">
                        {pageData.metaTitle ? '✓ Title' : '✗ Title'} | 
                        {pageData.metaDescription ? ' ✓ Desc' : ' ✗ Desc'} | 
                        {pageData.ogTitle ? ' ✓ OG' : ' ✗ OG'}
                      </div>
                    )}
                    <Badge className={status.color}>
                      {status.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
          
          {Object.keys(seoData).length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Latest SEO Data Preview:</div>
              <pre className="text-xs text-blue-700 mt-1 overflow-x-auto">
                {JSON.stringify(seoData, null, 2).substring(0, 300)}...
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
