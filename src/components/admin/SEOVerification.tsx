
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllPageSEO } from '@/hooks/use-page-seo';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Eye } from 'lucide-react';

export default function SEOVerification() {
  const [seoData, setSeoData] = useState<any>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadSEOData = () => {
    setIsRefreshing(true);
    const data = getAllPageSEO();
    setSeoData(data);
    setLastUpdated(new Date().toLocaleTimeString());
    console.log('✅ SEOVerification: Loaded SEO data:', data);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    loadSEOData();
    
    // Listen for SEO updates with improved debugging
    const handleSEOUpdate = (e: CustomEvent) => {
      console.log('📡 SEOVerification: SEO data updated event received:', e.detail);
      setTimeout(() => loadSEOData(), 100);
    };
    
    window.addEventListener('seoDataUpdated', handleSEOUpdate as EventListener);
    
    return () => {
      window.removeEventListener('seoDataUpdated', handleSEOUpdate as EventListener);
    };
  }, []);

  const getPageStatus = (pageData: any) => {
    if (!pageData) return { 
      status: 'empty', 
      icon: XCircle, 
      color: 'bg-gray-100 text-gray-600',
      message: 'No data'
    };
    
    const hasBasicSEO = pageData.metaTitle && pageData.metaDescription;
    const hasSocialSEO = pageData.ogTitle && pageData.ogDescription;
    const hasAISEO = pageData.aiContentType || pageData.aiExpertise;
    
    if (hasBasicSEO && hasSocialSEO && hasAISEO) {
      return { 
        status: 'complete', 
        icon: CheckCircle, 
        color: 'bg-green-100 text-green-700',
        message: 'Fully configured'
      };
    } else if (hasBasicSEO && hasSocialSEO) {
      return { 
        status: 'good', 
        icon: CheckCircle, 
        color: 'bg-blue-100 text-blue-700',
        message: 'Basic + Social SEO'
      };
    } else if (hasBasicSEO) {
      return { 
        status: 'partial', 
        icon: AlertCircle, 
        color: 'bg-yellow-100 text-yellow-700',
        message: 'Basic SEO only'
      };
    } else {
      return { 
        status: 'incomplete', 
        icon: XCircle, 
        color: 'bg-red-100 text-red-700',
        message: 'Incomplete'
      };
    }
  };

  const pageList = [
    { path: '/', name: 'Home Page' },
    { path: '/about', name: 'About' },
    { path: '/services', name: 'Services' },
    { path: '/services/seo', name: 'SEO Services' },
    { path: '/services/product-discovery', name: 'Product Discovery' },
    { path: '/services/data-enrichment', name: 'Data Enrichment' },
    { path: '/services/sem', name: 'SEM Services' },
    { path: '/services/conversion-optimization', name: 'Conversion Optimization' },
    { path: '/contact', name: 'Contact' },
    { path: '/blog', name: 'Blog' },
    { path: '/careers', name: 'Careers' },
    { path: '/case-studies', name: 'Case Studies' },
    { path: '/faq', name: 'FAQ' }
  ];

  const totalPages = pageList.length;
  const configuredPages = Object.keys(seoData).length;
  const completionRate = Math.round((configuredPages / totalPages) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SEO Implementation Status</CardTitle>
            <CardDescription>
              Verify that SEO changes are properly saved and applied
              {lastUpdated && (
                <span className="block text-xs text-gray-500 mt-1">
                  Last updated: {lastUpdated}
                </span>
              )}
            </CardDescription>
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
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{configuredPages}</div>
              <div className="text-sm text-blue-600">Pages with SEO data</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{completionRate}%</div>
              <div className="text-sm text-green-600">Completion rate</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-700">{totalPages}</div>
              <div className="text-sm text-gray-600">Total pages</div>
            </div>
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
                  
                  <div className="flex items-center gap-3">
                    {pageData && (
                      <div className="text-xs text-gray-500 hidden sm:block">
                        {pageData.metaTitle ? '✓ Title' : '✗ Title'} | 
                        {pageData.metaDescription ? ' ✓ Desc' : ' ✗ Desc'} | 
                        {pageData.ogTitle ? ' ✓ OG' : ' ✗ OG'} |
                        {pageData.aiContentType ? ' ✓ AI' : ' ✗ AI'}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => window.open(page.path, '_blank')}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Preview page"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                      <Badge className={`${status.color} text-xs`}>
                        {status.message}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {Object.keys(seoData).length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-2">
                Latest SEO Data Sample (First 500 chars):
              </div>
              <pre className="text-xs text-blue-700 overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(seoData, null, 2).substring(0, 500)}...
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
