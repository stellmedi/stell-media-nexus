import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Download, ExternalLink, Copy, Plus, Trash2, CheckCircle, Code, Table } from "lucide-react";
import { toast } from "sonner";
import { useSitemapSettings, useSaveSitemapSettings, SitemapUrl } from "@/hooks/use-seo-settings";

const EDGE_FUNCTION_URL = 'https://eorcqkxfqhgzmbobigcc.supabase.co/functions/v1/serve-sitemap';
const BASE_URL = 'https://stellmedia.com';

const defaultPages = [
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
  { path: '/faq', priority: '0.6', changefreq: 'monthly' as const },
  { path: '/real-estate', priority: '0.9', changefreq: 'weekly' as const },
  { path: '/e-commerce', priority: '0.9', changefreq: 'weekly' as const },
];

export default function SitemapManager() {
  const { data: savedSettings, isLoading } = useSitemapSettings();
  const saveMutation = useSaveSitemapSettings();
  
  const [sitemapUrls, setSitemapUrls] = useState<SitemapUrl[]>([]);
  const [lastGenerated, setLastGenerated] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newUrlPath, setNewUrlPath] = useState('');
  const [activeTab, setActiveTab] = useState<string>('visual');
  const [xmlContent, setXmlContent] = useState<string>('');
  const [xmlError, setXmlError] = useState<string>('');

  // Initialize with defaults if database is empty, or load from database
  useEffect(() => {
    if (isLoading) return;
    
    if (savedSettings?.value?.urls?.length) {
      // Load from database
      setSitemapUrls(savedSettings.value.urls);
      setLastGenerated(savedSettings.value.lastGenerated || '');
      setXmlContent(generateXmlFromUrls(savedSettings.value.urls));
    } else {
      // Initialize with defaults if database is empty
      const currentDate = new Date().toISOString();
      const defaultUrls: SitemapUrl[] = defaultPages.map(page => ({
        loc: `${BASE_URL}${page.path}`,
        lastmod: currentDate,
        changefreq: page.changefreq,
        priority: page.priority
      }));
      setSitemapUrls(defaultUrls);
      setLastGenerated(currentDate);
      setXmlContent(generateXmlFromUrls(defaultUrls));
      setHasUnsavedChanges(true); // Mark as needing save
    }
  }, [savedSettings, isLoading]);

  // Helper to generate XML from URLs array
  const generateXmlFromUrls = (urls: SitemapUrl[]) => {
    if (urls.length === 0) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    }

    const xmlUrls = urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
  };

  // Handle tab changes with sync
  const handleTabChange = (newTab: string) => {
    if (newTab === 'xml' && activeTab === 'visual') {
      // Switching to XML: regenerate XML from URLs
      setXmlContent(generateXmlFromUrls(sitemapUrls));
      setXmlError('');
    } else if (newTab === 'visual' && activeTab === 'xml') {
      // Switching to Visual: parse XML to URLs (if valid)
      const parsed = parseXMLToUrls(xmlContent);
      if (parsed) {
        setSitemapUrls(parsed);
      }
    }
    setActiveTab(newTab);
  };

  // generateSitemapXML now uses the helper
  const generateSitemapXML = () => generateXmlFromUrls(sitemapUrls);

  const parseXMLToUrls = (xml: string): SitemapUrl[] | null => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'application/xml');
      
      // Check for parsing errors
      const parseError = doc.querySelector('parsererror');
      if (parseError) {
        throw new Error('Invalid XML syntax');
      }

      const urlElements = doc.querySelectorAll('url');
      const urls: SitemapUrl[] = [];

      urlElements.forEach((urlEl) => {
        const loc = urlEl.querySelector('loc')?.textContent || '';
        const lastmod = urlEl.querySelector('lastmod')?.textContent || new Date().toISOString();
        const changefreq = urlEl.querySelector('changefreq')?.textContent as SitemapUrl['changefreq'] || 'monthly';
        const priority = urlEl.querySelector('priority')?.textContent || '0.5';

        if (loc) {
          urls.push({ loc, lastmod, changefreq, priority });
        }
      });

      return urls;
    } catch (error) {
      return null;
    }
  };

  const handleXmlChange = (value: string) => {
    setXmlContent(value);
    setHasUnsavedChanges(true);
    
    // Validate XML
    const parsed = parseXMLToUrls(value);
    if (parsed === null) {
      setXmlError('Invalid XML format. Please check your syntax.');
    } else {
      setXmlError('');
    }
  };

  const applyXmlChanges = () => {
    const parsed = parseXMLToUrls(xmlContent);
    if (parsed === null) {
      toast.error('Cannot apply changes - invalid XML format');
      return;
    }
    
    setSitemapUrls(parsed);
    setLastGenerated(new Date().toISOString());
    toast.success(`Applied ${parsed.length} URLs from XML`);
  };

  const generateSitemap = async () => {
    const currentDate = new Date().toISOString();

    const urls: SitemapUrl[] = defaultPages.map(page => ({
      loc: `${BASE_URL}${page.path}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    }));

    setSitemapUrls(urls);
    setLastGenerated(currentDate);
    setHasUnsavedChanges(true);
    toast.success('Sitemap generated - save to persist changes');
  };

  const saveToDatabase = async () => {
    let urlsToSave: SitemapUrl[];
    
    // If on XML tab, parse and validate XML first
    if (activeTab === 'xml') {
      const parsed = parseXMLToUrls(xmlContent);
      if (parsed === null) {
        toast.error('Cannot save - invalid XML format. Please fix errors before saving.');
        return;
      }
      urlsToSave = parsed;
      setSitemapUrls(parsed); // Sync state
    } else {
      urlsToSave = sitemapUrls;
    }

    try {
      await saveMutation.mutateAsync({
        urls: urlsToSave,
        lastGenerated: lastGenerated || new Date().toISOString()
      });
      setHasUnsavedChanges(false);
      toast.success('Sitemap saved to database - Edge Function will serve updated sitemap');
    } catch (error: any) {
      console.error('Error saving sitemap:', error);
      
      // Provide specific error messages
      if (error?.code === '42501' || error?.message?.includes('RLS') || error?.message?.includes('policy')) {
        toast.error('Permission denied - please ensure you are logged in as admin');
      } else if (error?.code === 'PGRST301') {
        toast.error('Session expired - please refresh and log in again');
      } else {
        toast.error(`Failed to save sitemap: ${error?.message || 'Unknown error'}`);
      }
    }
  };

  const updateUrlSettings = (index: number, field: keyof SitemapUrl, value: string) => {
    const updated = [...sitemapUrls];
    updated[index] = { ...updated[index], [field]: value };
    setSitemapUrls(updated);
    setHasUnsavedChanges(true);
  };

  const addNewUrl = () => {
    if (!newUrlPath.trim()) {
      toast.error('Please enter a URL path');
      return;
    }

    const path = newUrlPath.startsWith('/') ? newUrlPath : `/${newUrlPath}`;
    const fullUrl = `${BASE_URL}${path}`;

    if (sitemapUrls.some(url => url.loc === fullUrl)) {
      toast.error('This URL already exists in the sitemap');
      return;
    }

    const newUrl: SitemapUrl = {
      loc: fullUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.5'
    };

    setSitemapUrls([...sitemapUrls, newUrl]);
    setNewUrlPath('');
    setHasUnsavedChanges(true);
    toast.success('URL added to sitemap');
  };

  const removeUrl = (index: number) => {
    const updated = sitemapUrls.filter((_, i) => i !== index);
    setSitemapUrls(updated);
    setHasUnsavedChanges(true);
    toast.success('URL removed from sitemap');
  };

  const downloadSitemap = () => {
    const xml = activeTab === 'xml' ? xmlContent : generateSitemapXML();
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

  const copyXml = () => {
    navigator.clipboard.writeText(activeTab === 'xml' ? xmlContent : generateSitemapXML());
    toast.success('XML copied to clipboard');
  };

  const copySitemapUrl = () => {
    navigator.clipboard.writeText(EDGE_FUNCTION_URL);
    toast.success('Sitemap URL copied to clipboard');
  };

  const testSitemap = () => {
    window.open(EDGE_FUNCTION_URL, '_blank');
    toast.success('Opening live sitemap in new tab');
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>XML Sitemap Management</CardTitle>
        <CardDescription>
          Manage your website's XML sitemap. Changes are saved to the database and served dynamically via Edge Function.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Status info */}
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <strong>Dynamic Sitemap Active:</strong> Your sitemap is served dynamically at{' '}
              <code className="bg-green-100 px-1 rounded text-xs">{EDGE_FUNCTION_URL}</code>
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {sitemapUrls.length} URLs in sitemap
              </p>
              {lastGenerated && (
                <p className="text-xs text-muted-foreground">
                  Last generated: {new Date(lastGenerated).toLocaleString()}
                </p>
              )}
              {hasUnsavedChanges && (
                <Badge variant="outline" className="mt-1 text-yellow-700 border-yellow-300">
                  Unsaved Changes
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={generateSitemap}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button variant="outline" onClick={downloadSitemap}>
                <Download className="h-4 w-4 mr-2" />
                Download XML
              </Button>
              <Button variant="outline" onClick={copyXml}>
                <Copy className="h-4 w-4 mr-2" />
                Copy XML
              </Button>
              <Button 
                onClick={saveToDatabase} 
                disabled={!hasUnsavedChanges || saveMutation.isPending || (activeTab === 'xml' && !!xmlError)}
              >
                {saveMutation.isPending ? 'Saving...' : 'Save to Database'}
              </Button>
            </div>
          </div>

          {/* Live sitemap links */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Live Sitemap</h4>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={copySitemapUrl}>
                <Copy className="h-4 w-4 mr-2" />
                Copy URL
              </Button>
              <Button variant="outline" size="sm" onClick={testSitemap}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Test Sitemap
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.open('https://search.google.com/search-console', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Google Search Console
              </Button>
            </div>
          </div>

          {/* Dual-mode editor */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="visual" className="flex items-center gap-2">
                <Table className="h-4 w-4" />
                Visual Editor
              </TabsTrigger>
              <TabsTrigger value="xml" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                XML Editor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="visual" className="space-y-4 mt-4">
              {/* Add new URL */}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter path (e.g., /new-page)"
                  value={newUrlPath}
                  onChange={(e) => setNewUrlPath(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addNewUrl} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add URL
                </Button>
              </div>

              {sitemapUrls.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium">URL</th>
                          <th className="text-left py-3 px-4 font-medium">Frequency</th>
                          <th className="text-left py-3 px-4 font-medium">Priority</th>
                          <th className="text-left py-3 px-4 font-medium">Last Modified</th>
                          <th className="py-3 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {sitemapUrls.map((url, index) => (
                          <tr key={index} className="border-t">
                            <td className="py-3 px-4">
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                {url.loc.replace(BASE_URL, '')}
                              </code>
                            </td>
                            <td className="py-3 px-4">
                              <Select 
                                value={url.changefreq} 
                                onValueChange={(value) => updateUrlSettings(index, 'changefreq', value)}
                              >
                                <SelectTrigger className="w-28">
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
                                  <SelectItem value="0.4">0.4</SelectItem>
                                  <SelectItem value="0.3">0.3</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {new Date(url.lastmod).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeUrl(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {sitemapUrls.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No URLs in sitemap. Click "Regenerate" to create default sitemap.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="xml" className="space-y-4 mt-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Edit the raw XML directly. Changes are validated in real-time and saved when you click "Save to Database".
                </p>
                
                {xmlError && (
                  <Alert variant="destructive">
                    <AlertDescription>{xmlError}</AlertDescription>
                  </Alert>
                )}

                <Textarea
                  value={xmlContent}
                  onChange={(e) => handleXmlChange(e.target.value)}
                  className="min-h-[500px] font-mono text-sm"
                  placeholder="<?xml version='1.0' encoding='UTF-8'?>..."
                />
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{xmlContent.length} characters</span>
                  <span>{(xmlContent.match(/<url>/g) || []).length} URLs detected</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
