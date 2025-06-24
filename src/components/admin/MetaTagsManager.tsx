
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, RotateCcw, Search } from "lucide-react";
import { usePageSEO, saveSEOData } from "@/hooks/use-page-seo";

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

export default function MetaTagsManager() {
  const [selectedPage, setSelectedPage] = useState("/");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { seoData, isLoading: dataLoading, pageDefaults } = usePageSEO(selectedPage);

  useEffect(() => {
    if (!dataLoading) {
      if (seoData) {
        setMetaTitle(seoData.metaTitle || "");
        setMetaDescription(seoData.metaDescription || "");
        setKeywords(seoData.keywords || "");
      } else if (pageDefaults) {
        setMetaTitle(pageDefaults.metaTitle || "");
        setMetaDescription(pageDefaults.metaDescription || "");
        setKeywords(pageDefaults.keywords || "");
      } else {
        setMetaTitle("");
        setMetaDescription("");
        setKeywords("");
      }
      setHasUnsavedChanges(false);
    }
  }, [selectedPage, seoData, pageDefaults, dataLoading]);

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'title') setMetaTitle(value);
    if (field === 'description') setMetaDescription(value);
    if (field === 'keywords') setKeywords(value);
    setHasUnsavedChanges(true);
  };

  const handlePageChange = (newPage: string) => {
    if (hasUnsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to switch pages?')) {
        return;
      }
    }
    setSelectedPage(newPage);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const seoDataToSave = {
        metaTitle,
        metaDescription,
        canonicalUrl: `https://stellmedia.com${selectedPage === '/' ? '' : selectedPage}`,
        keywords,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
        ogImage: pageDefaults?.ogImage || "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
        twitterTitle: metaTitle,
        twitterDescription: metaDescription,
        twitterImage: pageDefaults?.ogImage || "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
        robotsIndex: true,
        robotsFollow: true,
        schemaType: "WebPage",
        schemaData: ""
      };
      
      const success = saveSEOData(selectedPage, seoDataToSave);
      
      if (success) {
        setHasUnsavedChanges(false);
        toast.success("Meta tags saved successfully!");
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving meta tags:', error);
      toast.error("Error saving meta tags");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (pageDefaults) {
      setMetaTitle(pageDefaults.metaTitle || "");
      setMetaDescription(pageDefaults.metaDescription || "");
      setKeywords(pageDefaults.keywords || "");
    } else {
      setMetaTitle("");
      setMetaDescription("");
      setKeywords("");
    }
    setHasUnsavedChanges(false);
    toast.info("Fields reset to defaults");
  };

  const getCharacterCount = (text: string, limit: number) => {
    const color = text.length > limit ? 'text-red-500' : text.length > limit * 0.9 ? 'text-yellow-500' : 'text-green-500';
    return (
      <span className={`text-sm ${color}`}>
        {text.length}/{limit}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Meta Tags & Titles
          {hasUnsavedChanges && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Unsaved Changes
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Edit meta titles, descriptions, and keywords for individual pages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
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
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="meta-title">Meta Title</Label>
            <div className="relative">
              <Input
                id="meta-title"
                value={metaTitle}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="Enter the page title that appears in search results"
                className="pr-20 mt-1"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getCharacterCount(metaTitle, 60)}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Optimal length: 50-60 characters
            </p>
          </div>

          <div>
            <Label htmlFor="meta-description">Meta Description</Label>
            <div className="relative">
              <Textarea
                id="meta-description"
                value={metaDescription}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Enter the description that appears under the title in search results"
                className="min-h-[100px] pr-20 mt-1"
              />
              <div className="absolute right-3 bottom-3">
                {getCharacterCount(metaDescription, 160)}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Optimal length: 140-160 characters
            </p>
          </div>

          <div>
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => handleFieldChange('keywords', e.target.value)}
              placeholder="e-commerce, SEO, optimization, digital marketing"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Comma-separated keywords relevant to this page
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={handleReset} disabled={isLoading}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isLoading}
            className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
