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
import { Search, Globe, Share2, Save, RotateCcw, Trash2, AlertCircle, CheckCircle } from "lucide-react";
import { usePageSEO, saveSEOData, deleteSEOData } from "@/hooks/use-page-seo";

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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<string | null>(null);
  
  // Use the hook to get SEO data for the selected page
  const { seoData: pageSEOData, isLoading: dataLoading, pageDefaults, saveError } = usePageSEO(selectedPage);

  useEffect(() => {
    if (!dataLoading) {
      console.log('🔄 SEOManager: Updating state for page:', selectedPage);
      console.log('📊 SEOManager: Page SEO data:', pageSEOData);
      console.log('📋 SEOManager: Page defaults:', pageDefaults);
      
      if (pageSEOData) {
        console.log('✅ SEOManager: Using saved SEO data');
        setSeoData(pageSEOData);
      } else if (pageDefaults) {
        console.log('📋 SEOManager: Using page defaults');
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
        console.log('⚠️ SEOManager: Using default values');
        setSeoData({
          ...defaultSEOData,
          canonicalUrl: `https://stellmedia.com${selectedPage === '/' ? '' : selectedPage}`
        });
      }
      setHasUnsavedChanges(false);
    }
  }, [selectedPage, pageSEOData, pageDefaults, dataLoading]);

  const handleInputChange = (field: keyof SEOData, value: string | boolean) => {
    console.log('📝 SEOManager: Field changed:', field, 'new value:', value);
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handlePageChange = (newPage: string) => {
    if (hasUnsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to switch pages?')) {
        return;
      }
    }
    console.log('🔄 SEOManager: Page changed from', selectedPage, 'to', newPage);
    setSelectedPage(newPage);
    setHasUnsavedChanges(false);
    setLastSaveTime(null);
  };

  const handleSave = async () => {
    console.log('💾 SEOManager: Starting save operation for page:', selectedPage);
    console.log('📝 SEOManager: Data to save:', seoData);
    
    setIsLoading(true);
    
    try {
      // Validate required fields before saving
      if (!seoData.metaTitle.trim()) {
        toast.error("Meta title is required", {
          description: "Please enter a meta title before saving.",
          duration: 3000
        });
        setIsLoading(false);
        return;
      }

      if (!seoData.metaDescription.trim()) {
        toast.error("Meta description is required", {
          description: "Please enter a meta description before saving.",
          duration: 3000
        });
        setIsLoading(false);
        return;
      }

      const result = saveSEOData(selectedPage, seoData);
      
      if (result.success) {
        setHasUnsavedChanges(false);
        setLastSaveTime(new Date().toLocaleTimeString());
        
        toast.success("SEO settings saved successfully!", {
          description: `Meta data for ${availablePages.find(p => p.path === selectedPage)?.name} has been updated and applied to the live page.`,
          duration: 3000
        });
        console.log('✅ SEOManager: Save completed successfully');
        
        // Trigger page refresh to apply changes immediately
        window.dispatchEvent(new CustomEvent('seoDataUpdated', {
          detail: { page: selectedPage, data: seoData }
        }));
      } else {
        throw new Error(result.error || 'Save operation failed');
      }
    } catch (error) {
      console.error('🚨 SEOManager: Error saving SEO settings:', error);
      toast.error("Error saving SEO settings", {
        description: error instanceof Error ? error.message : "Please try again. Check the console for more details.",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (hasUnsavedChanges && !confirm('Are you sure you want to reset? This will lose your unsaved changes.')) {
      return;
    }
    
    console.log('🔄 SEOManager: Resetting SEO data for page:', selectedPage);
    if (pageDefaults) {
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
      setHasUnsavedChanges(false);
      toast.info("SEO fields reset to page defaults");
    } else {
      setSeoData({
        ...defaultSEOData,
        canonicalUrl: `https://stellmedia.com${selectedPage === '/' ? '' : selectedPage}`
      });
      setHasUnsavedChanges(false);
      toast.info("SEO fields reset to default values");
    }
    setLastSaveTime(null);
  };

  const handleDeleteSavedData = () => {
    if (!pageSEOData) {
      toast.info("No saved data to delete for this page");
      return;
    }
    
    if (!confirm('Are you sure you want to delete the saved SEO data for this page? This will revert to using page defaults.')) {
      return;
    }
    
    console.log('🗑️ SEOManager: Deleting saved SEO data for page:', selectedPage);
    const result = deleteSEOData(selectedPage);
    
    if (result.success) {
      setLastSaveTime(null);
      toast.success("Saved SEO data deleted successfully");
    } else {
      toast.error("Failed to delete saved SEO data", {
        description: result.error || "Unknown error occurred"
      });
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
            SEO Page Manager
            {hasUnsavedChanges && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                <AlertCircle className="h-3 w-3 mr-1" />
                Unsaved Changes
              </Badge>
            )}
            {lastSaveTime && !hasUnsavedChanges && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Saved at {lastSaveTime}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Edit meta titles, descriptions, and SEO settings for individual pages. Changes are saved and applied to the live website.
            {saveError && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                Error: {saveError}
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="page-select">Select Page to Edit</Label>
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
            
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {dataLoading && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Loading...
                </Badge>
              )}
              {isCustomized && !dataLoading && (
                <Badge variant="default" className="bg-green-100 text-green-700">
                  ✓ Custom SEO Data Saved
                </Badge>
              )}
              {isUsingDefaults && !dataLoading && (
                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                  Using Default Values
                </Badge>
              )}
              {hasUnsavedChanges && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Unsaved Changes
                </Badge>
              )}
            </div>
          </div>

          <Tabs defaultValue="meta" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="meta">Meta Tags</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
            </TabsList>

            <TabsContent value="meta" className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Important: Meta Tags Editor</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Edit meta titles and descriptions here. Changes are automatically saved and applied to the live website when you click "Save Changes".
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Meta Title *</h3>
                  <div className="relative">
                    <Input
                      value={seoData.metaTitle}
                      onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                      placeholder="Enter the page title that appears in search results"
                      className="pr-20"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getCharacterCount(seoData.metaTitle, 60)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This appears as the clickable headline in search results. Optimal length: 50-60 characters.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Meta Description *</h3>
                  <div className="relative">
                    <Textarea
                      value={seoData.metaDescription}
                      onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                      placeholder="Enter the description that appears under the title in search results"
                      className="min-h-[100px] pr-20"
                      required
                    />
                    <div className="absolute right-3 bottom-3">
                      {getCharacterCount(seoData.metaDescription, 160)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This appears as the description snippet in search results. Optimal length: 140-160 characters.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Keywords</h3>
                  <Input
                    value={seoData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    placeholder="digital marketing, SEO services, lead generation"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Comma-separated keywords relevant to this page content.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Canonical URL</h3>
                  <Input
                    value={seoData.canonicalUrl}
                    onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                    placeholder="https://stellmedia.com/page-url"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    The preferred URL for this page content. Leave blank to use the default URL.
                  </p>
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
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="LocalBusiness">LocalBusiness</SelectItem>
                      <SelectItem value="Organization">Organization</SelectItem>
                      <SelectItem value="FAQ">FAQ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="schema-data">Schema JSON Data</Label>
                  <Textarea
                    id="schema-data"
                    value={seoData.schemaData}
                    onChange={(e) => handleInputChange('schemaData', e.target.value)}
                    placeholder='{"name": "Your Business", "description": "Your description"}'
                    className="mt-1 min-h-[120px] font-mono text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter JSON data for structured markup (without @context and @type)
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center pt-6 border-t">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset} disabled={isLoading}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              {isCustomized && (
                <Button variant="outline" onClick={handleDeleteSavedData} disabled={isLoading}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Saved Data
                </Button>
              )}
            </div>
            <Button 
              onClick={handleSave}
              disabled={!hasUnsavedChanges || isLoading || !seoData.metaTitle.trim() || !seoData.metaDescription.trim()}
              className={hasUnsavedChanges && seoData.metaTitle.trim() && seoData.metaDescription.trim() ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
