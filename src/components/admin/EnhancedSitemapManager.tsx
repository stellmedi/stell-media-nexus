
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, Download, ExternalLink, Copy, Upload, FileText } from "lucide-react";
import { toast } from "sonner";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export default function EnhancedSitemapManager() {
  const [sitemapUrls, setSitemapUrls] = useState<SitemapUrl[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    loadSitemap();
  }, []);

  const loadSitemap = () => {
    try {
      const saved = localStorage.getItem('stellmedia_sitemap');
      if (saved) {
        const data = JSON.parse(saved);
        setSitemapUrls(data.urls || []);
        setLastGenerated(data.lastGenerated || '');
      }
    } catch (error) {
      console.error('Error loading sitemap:', error);
    }
  };

  const generateSitemap = async () => {
    setIsGenerating(true);
    
    try {
      const pages = [
        { path: '/', priority: '1.0', changefreq: 'weekly' as const },
        { path: '/about', priority: '0.8', changefreq: 'monthly' as const },
        { path: '/services', priority: '0.9', changefreq: 'weekly' as const },
        { path: '/services/seo', priority: '0.9', changefreq: 'weekly' as const },
        { path: '/services/product-discovery', priority: '0.9', changefreq: 'weekly' as const },
        { path: '/services/data-enrichment', priority: '0.9', changefreq: 'weekly' as const },
        { path: '/services/sem', priority: '0.9', changefreq: 'weekly' as const },
        { path: '/services/conversion-optimization', priority: '0.9', changefreq: 'weekly' as const },
        { path: '/contact', priority: '0.7', changefreq: 'monthly' as const },
        { path: '/blog', priority: '0.8', changefreq: 'daily' as const },
        { path: '/careers', priority: '0.6', changefreq: 'monthly' as const },
        { path: '/case-studies', priority: '0.8', changefreq: 'weekly' as const },
        { path: '/faq', priority: '0.6', changefreq: 'monthly' as const }
      ];

      const currentDate = new Date().toISOString();
      const baseUrl = 'https://stellmedia.com';

      const urls: SitemapUrl[] = pages.map(page => ({
        loc: `${baseUrl}${page.path}`,
        lastmod: currentDate,
        changefreq: page.changefreq,
        priority: page.priority
      }));

      const sitemapData = {
        urls,
        lastGenerated: currentDate
      };

      localStorage.setItem('stellmedia_sitemap', JSON.stringify(sitemapData));
      setSitemapUrls(urls);
      setLastGenerated(currentDate);

      window.dispatchEvent(new CustomEvent('sitemapUpdated', {
        detail: sitemapData
      }));

      toast.success('Sitemap generated successfully');
    } catch (error) {
      console.error('Error generating sitemap:', error);
      toast.error('Failed to generate sitemap');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateUrlSettings = (index: number, field: keyof SitemapUrl, value: string) => {
    const updated = [...sitemapUrls];
    updated[index] = { ...updated[index], [field]: value };
    setSitemapUrls(updated);

    const sitemapData = {
      urls: updated,
      lastGenerated
    };
    localStorage.setItem('stellmedia_sitemap', JSON.stringify(sitemapData));
    toast.success('Sitemap updated');
  };

  const downloadSitemap = () => {
    const xml = generateSitemapXML();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Sitemap downloaded');
  };

  const generateSitemapXML = () => {
    const xmlUrls = sitemapUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/xml') {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const xmlContent = e.target?.result as string;
          parseSitemapXML(xmlContent);
        } catch (error) {
          toast.error('Failed to parse XML file');
        }
      };
      reader.readAsText(file);
    } else {
      toast.error('Please upload a valid XML file');
    }
  };

  const parseSitemapXML = (xmlContent: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'application/xml');
      const urls = xmlDoc.getElementsByTagName('url');
      
      const parsedUrls: SitemapUrl[] = [];
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const loc = url.getElementsByTagName('loc')[0]?.textContent || '';
        const lastmod = url.getElementsByTagName('lastmod')[0]?.textContent || new Date().toISOString();
        const changefreq = url.getElementsByTagName('changefreq')[0]?.textContent || 'weekly';
        const priority = url.getElementsByTagName('priority')[0]?.textContent || '0.5';
        
        if (loc) {
          parsedUrls.push({
            loc,
            lastmod,
            changefreq: changefreq as SitemapUrl['changefreq'],
            priority
          });
        }
      }
      
      const sitemapData = {
        urls: parsedUrls,
        lastGenerated: new Date().toISOString()
      };
      
      localStorage.setItem('stellmedia_sitemap', JSON.stringify(sitemapData));
      setSitemapUrls(parsedUrls);
      setLastGenerated(sitemapData.lastGenerated);
      
      toast.success(`Uploaded sitemap with ${parsedUrls.length} URLs`);
    } catch (error) {
      toast.error('Failed to parse sitemap XML');
    }
  };

  const copySitemapUrl = () => {
    const sitemapUrl = 'https://stellmedia.com/sitemap.xml';
    navigator.clipboard.writeText(sitemapUrl);
    toast.success('Sitemap URL copied to clipboard');
  };

  const openSearchConsole = () => {
    window.open('https://search.google.com/search-console', '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enhanced XML Sitemap Management</CardTitle>
        <CardDescription>
          Generate, edit, upload, and manage your website's XML sitemap with full control
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                {sitemapUrls.length} URLs in sitemap
              </p>
              {lastGenerated && (
                <p className="text-xs text-gray-500">
                  Last generated: {new Date(lastGenerated).toLocaleString()}
                </p>
              )}
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={generateSitemap} disabled={isGenerating}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Generating...' : 'Generate Sitemap'}
              </Button>
              <Button variant="outline" onClick={downloadSitemap} disabled={sitemapUrls.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Download XML
              </Button>
            </div>
          </div>

          {/* Upload New Sitemap */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Upload New Sitemap</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="sitemap-upload">Upload XML Sitemap File</Label>
                <Input
                  id="sitemap-upload"
                  type="file"
                  accept=".xml,application/xml"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
              </div>
              {uploadedFile && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <FileText className="h-4 w-4" />
                  <span>Uploaded: {uploadedFile.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Manual submission instructions */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Submit to Search Engines</h4>
            <p className="text-sm text-blue-800 mb-3">
              Submit your sitemap manually through search console tools:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={copySitemapUrl}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Sitemap URL
                </Button>
                <code className="text-xs bg-white px-2 py-1 rounded border">
                  https://stellmedia.com/sitemap.xml
                </code>
              </div>
              <Button variant="outline" size="sm" onClick={openSearchConsole}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Google Search Console
              </Button>
            </div>
          </div>

          {sitemapUrls.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">URL</th>
                      <th className="text-left py-3 px-4 font-medium">Change Frequency</th>
                      <th className="text-left py-3 px-4 font-medium">Priority</th>
                      <th className="text-left py-3 px-4 font-medium">Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sitemapUrls.map((url, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-3 px-4">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {url.loc}
                          </code>
                        </td>
                        <td className="py-3 px-4">
                          <Select 
                            value={url.changefreq} 
                            onValueChange={(value) => updateUrlSettings(index, 'changefreq', value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="always">Always</SelectItem>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <Select 
                            value={url.priority} 
                            onValueChange={(value) => updateUrlSettings(index, 'priority', value)}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1.0">1.0</SelectItem>
                              <SelectItem value="0.9">0.9</SelectItem>
                              <SelectItem value="0.8">0.8</SelectItem>
                              <SelectItem value="0.7">0.7</SelectItem>
                              <SelectItem value="0.6">0.6</SelectItem>
                              <SelectItem value="0.5">0.5</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {new Date(url.lastmod).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
