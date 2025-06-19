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
import { Search, Globe, FileText, Share2, Code, BarChart3, Info, Bot, Brain, Save, RotateCcw } from "lucide-react";
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
  // AI SEO fields
  aiContentType: string;
  aiExpertise: string;
  aiServiceFocus: string;
  aiTargetAudience: string;
  aiContentFormat: string;
  aiCrawlerInstructions: string;
  enablePerplexityOptimization: boolean;
  enableChatGPTOptimization: boolean;
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
  schemaData: "",
  // AI SEO defaults
  aiContentType: "",
  aiExpertise: "",
  aiServiceFocus: "",
  aiTargetAudience: "",
  aiContentFormat: "",
  aiCrawlerInstructions: "",
  enablePerplexityOptimization: true,
  enableChatGPTOptimization: true
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
  
  // Use the hook to get SEO data for the selected page
  const { seoData: pageSEOData, isLoading: dataLoading, pageDefaults } = usePageSEO(selectedPage);

  // Simplified state update logic
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
          schemaData: "",
          aiContentType: pageDefaults.aiContentType || "",
          aiExpertise: pageDefaults.aiExpertise || "",
          aiServiceFocus: pageDefaults.aiServiceFocus || "",
          aiTargetAudience: pageDefaults.aiTargetAudience || "",
          aiContentFormat: pageDefaults.aiContentFormat || "",
          aiCrawlerInstructions: "",
          enablePerplexityOptimization: true,
          enableChatGPTOptimization: true
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
  };

  const handleSave = async () => {
    console.log('💾 SEOManager: Starting save operation for page:', selectedPage);
    console.log('📝 SEOManager: Data to save:', seoData);
    
    setIsLoading(true);
    
    try {
      const success = saveSEOData(selectedPage, seoData);
      
      if (success) {
        setHasUnsavedChanges(false);
        toast.success("SEO settings saved successfully!", {
          description: `SEO data for ${availablePages.find(p => p.path === selectedPage)?.name} has been updated.`,
          duration: 3000
        });
        console.log('✅ SEOManager: Save completed successfully');
      } else {
        throw new Error('saveSEOData returned false');
      }
    } catch (error) {
      console.error('🚨 SEOManager: Error saving SEO settings:', error);
      toast.error("Error saving SEO settings", {
        description: "Please try again. Check the console for more details.",
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
        schemaData: "",
        aiContentType: pageDefaults.aiContentType || "",
        aiExpertise: pageDefaults.aiExpertise || "",
        aiServiceFocus: pageDefaults.aiServiceFocus || "",
        aiTargetAudience: pageDefaults.aiTargetAudience || "",
        aiContentFormat: pageDefaults.aiContentFormat || "",
        aiCrawlerInstructions: "",
        enablePerplexityOptimization: true,
        enableChatGPTOptimization: true
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
    const success = deleteSEOData(selectedPage);
    
    if (success) {
      toast.success("Saved SEO data deleted successfully");
    } else {
      toast.error("Failed to delete saved SEO data");
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
            {hasUnsavedChanges && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Unsaved Changes
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Manage SEO metadata for all pages on your website, including AI SEO optimization
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
            
            <div className="mt-2 flex items-center gap-2 flex-wrap">
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
              {hasUnsavedChanges && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Has unsaved changes
                </Badge>
              )}
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic SEO</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="ai-seo">AI SEO</TabsTrigger>
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

            <TabsContent value="ai-seo" className="space-y-4">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    AI Search Engine Optimization
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Optimize your content for AI-powered search engines like ChatGPT, Perplexity, and other AI crawlers.
                  </p>
                  
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="ai-content-type">AI Content Type</Label>
                      <Input
                        id="ai-content-type"
                        value={seoData.aiContentType}
                        onChange={(e) => handleInputChange('aiContentType', e.target.value)}
                        placeholder="e.g., e-commerce services, educational content, product information"
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">Help AI understand what type of content this is</p>
                    </div>

                    <div>
                      <Label htmlFor="ai-expertise">AI Expertise Areas</Label>
                      <Input
                        id="ai-expertise"
                        value={seoData.aiExpertise}
                        onChange={(e) => handleInputChange('aiExpertise', e.target.value)}
                        placeholder="e.g., SEO, e-commerce optimization, product discovery"
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">Comma-separated list of expertise areas</p>
                    </div>

                    <div>
                      <Label htmlFor="ai-service-focus">AI Service Focus</Label>
                      <Input
                        id="ai-service-focus"
                        value={seoData.aiServiceFocus}
                        onChange={(e) => handleInputChange('aiServiceFocus', e.target.value)}
                        placeholder="e.g., improving conversion rates, optimizing product discovery"
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">What specific problems does this content solve?</p>
                    </div>

                    <div>
                      <Label htmlFor="ai-target-audience">AI Target Audience</Label>
                      <Input
                        id="ai-target-audience"
                        value={seoData.aiTargetAudience}
                        onChange={(e) => handleInputChange('aiTargetAudience', e.target.value)}
                        placeholder="e.g., e-commerce businesses, digital marketers, online retailers"
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">Who is this content intended for?</p>
                    </div>

                    <div>
                      <Label htmlFor="ai-content-format">AI Content Format</Label>
                      <Select value={seoData.aiContentFormat} onValueChange={(value) => handleInputChange('aiContentFormat', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select content format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="service landing page">Service Landing Page</SelectItem>
                          <SelectItem value="about page">About Page</SelectItem>
                          <SelectItem value="service detail page">Service Detail Page</SelectItem>
                          <SelectItem value="blog content">Blog Content</SelectItem>
                          <SelectItem value="case study content">Case Study Content</SelectItem>
                          <SelectItem value="FAQ page">FAQ Page</SelectItem>
                          <SelectItem value="contact page">Contact Page</SelectItem>
                          <SelectItem value="careers page">Careers Page</SelectItem>
                          <SelectItem value="educational content">Educational Content</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500 mt-1">Type of content format for AI understanding</p>
                    </div>

                    <div>
                      <Label htmlFor="ai-crawler-instructions">AI Crawler Instructions</Label>
                      <Textarea
                        id="ai-crawler-instructions"
                        value={seoData.aiCrawlerInstructions}
                        onChange={(e) => handleInputChange('aiCrawlerInstructions', e.target.value)}
                        placeholder="Special instructions for AI crawlers about how to interpret this content"
                        className="mt-1 min-h-[80px]"
                      />
                      <p className="text-sm text-gray-500 mt-1">Specific instructions for AI search engines</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Platform Optimization
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="enable-perplexity"
                        checked={seoData.enablePerplexityOptimization}
                        onChange={(e) => handleInputChange('enablePerplexityOptimization', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="enable-perplexity">Enable Perplexity AI optimization</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="enable-chatgpt"
                        checked={seoData.enableChatGPTOptimization}
                        onChange={(e) => handleInputChange('enableChatGPTOptimization', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="enable-chatgpt">Enable ChatGPT optimization</Label>
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
            <div className="space-x-2">
              <Button variant="outline" onClick={handleReset} disabled={isLoading || dataLoading}>
                <RotateCcw className="h-4 w-4 mr-1" />
                {pageDefaults ? "Reset to Page Defaults" : "Reset to Empty"}
              </Button>
              {isCustomized && (
                <Button variant="outline" onClick={handleDeleteSavedData} disabled={isLoading || dataLoading}>
                  Delete Saved Data
                </Button>
              )}
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => window.open(selectedPage, '_blank')}>
                Preview Page
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isLoading || dataLoading || !hasUnsavedChanges}
                className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <Save className="h-4 w-4 mr-1" />
                {isLoading ? "Saving..." : hasUnsavedChanges ? "Save Changes" : "Saved"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
