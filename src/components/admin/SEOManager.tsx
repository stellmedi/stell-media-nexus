import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Globe, FileText, Share2, Code, BarChart3, Info } from "lucide-react";
import { usePageSEO, saveSEOData } from "@/hooks/use-page-seo";

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaType: string;
  schemaData: string;
}

const defaultSEOData: SEOData = {
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  keywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "WebPage",
  schemaData: ""
};

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

export default function SEOManager() {
  const [selectedPage, setSelectedPage] = useState("/");
  const [seoData, setSeoData] = useState<SEOData>(defaultSEOData);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use the hook to get SEO data for the selected page
  const { seoData: pageSEOData, isLoading: dataLoading, pageDefaults } = usePageSEO(selectedPage);

  // Update local state when page changes or data loads
  useEffect(() => {
    console.log('SEOManager: useEffect triggered for page:', selectedPage);
    console.log('SEOManager: Page SEO data:', pageSEOData);
    console.log('SEOManager: Page defaults:', pageDefaults);
    console.log('SEOManager: Data loading state:', dataLoading);
    
    if (!dataLoading) {
      if (pageSEOData) {
        console.log('SEOManager: Setting existing saved SEO data for page:', selectedPage);
        setSeoData(pageSEOData);
      } else if (pageDefaults) {
        console.log('SEOManager: Setting page defaults for page:', selectedPage);
        // Use page defaults as starting point
        setSeoData({
          metaTitle: pageDefaults.metaTitle || "",
          metaDescription: pageDefaults.metaDescription || "",
          canonicalUrl: `https://stellmedia.com${selectedPage === '/' ? '' : selectedPage}`,
          keywords: pageDefaults.keywords || "",
          ogTitle: pageDefaults.metaTitle || "",
          ogDescription: pageDefaults.metaDescription || "",
          ogImage: pageDefaults.ogImage || "",
          twitterTitle: pageDefaults.metaTitle || "",
          twitterDescription: pageDefaults.metaDescription || "",
          twitterImage: pageDefaults.ogImage || "",
          robotsIndex: true,
          robotsFollow: true,
          schemaType: "WebPage",
          schemaData: ""
        });
      } else {
        console.log('SEOManager: No data or defaults, setting empty defaults for page:', selectedPage);
        // Set defaults with page-specific canonical URL
        setSeoData({
          ...defaultSEOData,
          canonicalUrl: `https://stellmedia.com${selectedPage === '/' ? '' : selectedPage}`
        });
      }
    }
  }, [selectedPage, pageSEOData, pageDefaults, dataLoading]);

  const handleInputChange = (field: keyof SEOData, value: string | boolean) => {
    console.log('SEOManager: Field changed:', field, 'new value:', value);
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePageChange = (newPage: string) => {
    console.log('SEOManager: Page changed from', selectedPage, 'to', newPage);
    setSelectedPage(newPage);
  };

  const handleSave = () => {
    console.log('SEOManager: Saving SEO data for page:', selectedPage);
    console.log('SEOManager: Current seoData:', seoData);
    setIsLoading(true);
    
    try {
      const success = saveSEOData(selectedPage, seoData);
      
      if (success) {
        toast.success("SEO settings saved successfully!", {
          description: `SEO data for ${availablePages.find(p => p.path === selectedPage)?.name} has been updated.`
        });
      } else {
        throw new Error('Failed to save SEO data');
      }
    } catch (error) {
      console.error('SEOManager: Error saving SEO settings:', error);
      toast.error("Error saving SEO settings", {
        description: "Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    console.log('SEOManager: Resetting SEO data for page:', selectedPage);
    if (pageDefaults) {
      // Reset to page defaults
      setSeoData({
        metaTitle: pageDefaults.metaTitle || "",
        metaDescription: pageDefaults.metaDescription || "",
        canonicalUrl: `https://stellmedia.com${selectedPage === '/' ? '' : selectedPage}`,
        keywords: pageDefaults.keywords || "",
        ogTitle: pageDefaults.metaTitle || "",
        ogDescription: pageDefaults.metaDescription || "",
        ogImage: pageDefaults.ogImage || "",
        twitterTitle: pageDefaults.metaTitle || "",
        twitterDescription: pageDefaults.metaDescription || "",
        twitterImage: pageDefaults.ogImage || "",
        robotsIndex: true,
        robotsFollow: true,
        schemaType: "WebPage",
        schemaData: ""
      });
      toast.info("SEO fields reset to page defaults");
    } else {
      setSeoData({
        ...defaultSEOData,
        canonicalUrl: `https://stellmedia.com${selectedPage === '/' ? '' : selectedPage}`
      });
      toast.info("SEO fields reset to default values");
    }
  };

  const getCharacterCount = (text: string, limit: number) => {
    const color = text.length > limit ? 'text-red-500' : text.length > limit * 0.9 ? 'text-yellow-500' : 'text-green-500';
    return (
      <span className={`text-sm ${color}`}>
        {text.length}/{limit}
      </span>
    );
  };

  const isUsingDefaults = !pageSEOData && pageDefaults;
  const isCustomized = !!pageSEOData;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO Management
          </CardTitle>
          <CardDescription>
            Manage SEO metadata for all pages on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="page-select">Select Page</Label>
            <Select value={selectedPage} onValueChange={handlePageChange}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Choose a page to edit" />
              </SelectTrigger>
              <SelectContent>
                {availablePages.map((page) => (
                  <SelectItem key={page.path} value={page.path}>
                    {page.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Status indicators */}
            <div className="mt-2 flex items-center gap-2">
              {dataLoading && (
                <p className="text-sm text-gray-500">Loading SEO data...</p>
              )}
              {isCustomized && !dataLoading && (
                <Badge variant="default" className="bg-blue-100 text-blue-700">
                  <Info className="h-3 w-3 mr-1" />
                  Custom SEO data saved
                </Badge>
              )}
              {isUsingDefaults && !dataLoading && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Using page defaults
                </Badge>
              )}
              {!pageDefaults && !pageSEOData && !dataLoading && (
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  No defaults configured
                </Badge>
              )}
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic SEO</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <div className="relative">
                    <Input
                      id="meta-title"
                      value={seoData.metaTitle}
                      onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                      placeholder="Enter page title for search engines"
                      className="mt-1"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getCharacterCount(seoData.metaTitle, 60)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Optimal length: 50-60 characters</p>
                </div>

                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <div className="relative">
                    <Textarea
                      id="meta-description"
                      value={seoData.metaDescription}
                      onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                      placeholder="Enter page description for search engines"
                      className="mt-1 min-h-[80px]"
                    />
                    <div className="absolute right-3 bottom-3">
                      {getCharacterCount(seoData.metaDescription, 160)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Optimal length: 140-160 characters</p>
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={seoData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Comma-separated keywords</p>
                </div>

                <div>
                  <Label htmlFor="canonical-url">Canonical URL</Label>
                  <Input
                    id="canonical-url"
                    value={seoData.canonicalUrl}
                    onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                    placeholder="https://stellmedia.com/page-url"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Leave blank to use default URL</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Open Graph (Facebook, LinkedIn)
                  </h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="og-title">OG Title</Label>
                      <Input
                        id="og-title"
                        value={seoData.ogTitle}
                        onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                        placeholder="Title for social sharing (leave blank to use meta title)"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="og-description">OG Description</Label>
                      <Textarea
                        id="og-description"
                        value={seoData.ogDescription}
                        onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                        placeholder="Description for social sharing"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="og-image">OG Image URL</Label>
                      <Input
                        id="og-image"
                        value={seoData.ogImage}
                        onChange={(e) => handleInputChange('ogImage', e.target.value)}
                        placeholder="https://stellmedia.com/image.jpg"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Twitter Card</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="twitter-title">Twitter Title</Label>
                      <Input
                        id="twitter-title"
                        value={seoData.twitterTitle}
                        onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                        placeholder="Title for Twitter sharing"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter-description">Twitter Description</Label>
                      <Textarea
                        id="twitter-description"
                        value={seoData.twitterDescription}
                        onChange={(e) => handleInputChange('twitterDescription', e.target.value)}
                        placeholder="Description for Twitter sharing"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter-image">Twitter Image URL</Label>
                      <Input
                        id="twitter-image"
                        value={seoData.twitterImage}
                        onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                        placeholder="https://stellmedia.com/twitter-image.jpg"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Robots Meta Tags
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="robots-index"
                        checked={seoData.robotsIndex}
                        onChange={(e) => handleInputChange('robotsIndex', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="robots-index">Allow search engines to index this page</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="robots-follow"
                        checked={seoData.robotsFollow}
                        onChange={(e) => handleInputChange('robotsFollow', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="robots-follow">Allow search engines to follow links on this page</Label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schema" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="schema-type">Schema Type</Label>
                  <Select value={seoData.schemaType} onValueChange={(value) => handleInputChange('schemaType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WebPage">WebPage</SelectItem>
                      <SelectItem value="Article">Article</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="LocalBusiness">LocalBusiness</SelectItem>
                      <SelectItem value="Organization">Organization</SelectItem>
                      <SelectItem value="FAQ">FAQ</SelectItem>
                      <SelectItem value="HowTo">HowTo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="schema-data">Schema Data (JSON)</Label>
                  <Textarea
                    id="schema-data"
                    value={seoData.schemaData}
                    onChange={(e) => handleInputChange('schemaData', e.target.value)}
                    placeholder='{"name": "Page Name", "description": "Page description"}'
                    className="mt-1 min-h-[120px] font-mono text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">Additional schema properties in JSON format</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <Button variant="outline" onClick={handleReset}>
              {pageDefaults ? "Reset to Page Defaults" : "Reset to Empty"}
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => window.open(selectedPage, '_blank')}>
                Preview Page
              </Button>
              <Button onClick={handleSave} disabled={isLoading || dataLoading}>
                {isLoading ? "Saving..." : "Save SEO Settings"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
