
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Save, Loader2, Globe, Share2, Twitter } from "lucide-react";
import { usePageSEO } from "@/hooks/use-page-seo";
import { useContentManager } from "@/hooks/useContentManager";

const availablePages = [
  { path: "/", name: "Home Page" },
  { path: "/about", name: "About Page" },
  { path: "/services", name: "Services Page" },
  { path: "/contact", name: "Contact Page" },
  { path: "/blog", name: "Blog Page" },
  { path: "/case-studies", name: "Case Studies Page" }
];

export default function MetaTagsManager() {
  const [selectedPage, setSelectedPage] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const { seoData, pageDefaults } = usePageSEO(selectedPage);
  const { selectedPageContent, loadPageContent, updatePageMetadata } = useContentManager();
  
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    twitterTitle: "",
    twitterDescription: ""
  });

  // Load page content when selected page changes
  useEffect(() => {
    loadPageContent(selectedPage);
  }, [selectedPage, loadPageContent]);

  // Update form data when content loads
  useEffect(() => {
    if (selectedPageContent) {
      setFormData({
        metaTitle: selectedPageContent.meta_title || pageDefaults?.metaTitle || "",
        metaDescription: selectedPageContent.meta_description || pageDefaults?.metaDescription || "",
        keywords: selectedPageContent.keywords || pageDefaults?.keywords || "",
        ogTitle: selectedPageContent.meta_title || pageDefaults?.ogTitle || "",
        ogDescription: selectedPageContent.meta_description || pageDefaults?.ogDescription || "",
        twitterTitle: selectedPageContent.meta_title || pageDefaults?.twitterTitle || "",
        twitterDescription: selectedPageContent.meta_description || pageDefaults?.twitterDescription || ""
      });
    } else if (pageDefaults) {
      // Use defaults if no content exists
      setFormData({
        metaTitle: pageDefaults.metaTitle || "",
        metaDescription: pageDefaults.metaDescription || "",
        keywords: pageDefaults.keywords || "",
        ogTitle: pageDefaults.ogTitle || "",
        ogDescription: pageDefaults.ogDescription || "",
        twitterTitle: pageDefaults.twitterTitle || "",
        twitterDescription: pageDefaults.twitterDescription || ""
      });
    }
  }, [selectedPageContent, pageDefaults]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save to the database via content manager
      const success = await updatePageMetadata(selectedPage, {
        meta_title: formData.metaTitle,
        meta_description: formData.metaDescription,
        keywords: formData.keywords
      });
      
      if (success) {
        toast.success("SEO data saved successfully");
      } else {
        toast.error("Failed to save SEO data");
      }
    } catch (error) {
      console.error("Error saving SEO data:", error);
      toast.error("Failed to save SEO data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          SEO Meta Tags & Titles
        </CardTitle>
        <CardDescription>
          Manage meta titles, descriptions, keywords, and social media tags for your pages. 
          Content editing is handled separately in the Content Management section.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="page-select">Select Page</Label>
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger>
              <SelectValue placeholder="Select a page" />
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

        <Separator />

        {/* Primary SEO Fields */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4" />
            <h3 className="text-lg font-semibold">Primary SEO Settings</h3>
          </div>
          
          <div>
            <Label htmlFor="meta-title">Meta Title *</Label>
            <Input
              id="meta-title"
              value={formData.metaTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
              placeholder="Page title for search engines (50-60 characters)"
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaTitle.length}/60 characters
            </p>
          </div>

          <div>
            <Label htmlFor="meta-description">Meta Description *</Label>
            <Textarea
              id="meta-description"
              value={formData.metaDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
              placeholder="Brief description for search engines (150-160 characters)"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaDescription.length}/160 characters
            </p>
          </div>

          <div>
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={formData.keywords}
              onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
              placeholder="Comma-separated keywords (e.g., digital marketing, SEO, real estate)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate keywords with commas
            </p>
          </div>
        </div>

        <Separator />

        {/* Open Graph (Facebook) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="h-4 w-4" />
            <h3 className="text-lg font-semibold">Open Graph (Facebook, LinkedIn)</h3>
          </div>
          
          <div>
            <Label htmlFor="og-title">Open Graph Title</Label>
            <Input
              id="og-title"
              value={formData.ogTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, ogTitle: e.target.value }))}
              placeholder="Title for social media sharing (defaults to meta title)"
            />
          </div>

          <div>
            <Label htmlFor="og-description">Open Graph Description</Label>
            <Textarea
              id="og-description"
              value={formData.ogDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, ogDescription: e.target.value }))}
              placeholder="Description for social media sharing (defaults to meta description)"
              rows={3}
            />
          </div>
        </div>

        <Separator />

        {/* Twitter Cards */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Twitter className="h-4 w-4" />
            <h3 className="text-lg font-semibold">Twitter Cards</h3>
          </div>
          
          <div>
            <Label htmlFor="twitter-title">Twitter Title</Label>
            <Input
              id="twitter-title"
              value={formData.twitterTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, twitterTitle: e.target.value }))}
              placeholder="Title for Twitter cards (defaults to meta title)"
            />
          </div>

          <div>
            <Label htmlFor="twitter-description">Twitter Description</Label>
            <Textarea
              id="twitter-description"
              value={formData.twitterDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, twitterDescription: e.target.value }))}
              placeholder="Description for Twitter cards (defaults to meta description)"
              rows={3}
            />
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-gray-500">
            * Required fields for optimal SEO performance
          </p>
          <Button onClick={handleSave} disabled={isLoading} className="min-w-[120px]">
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save SEO Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
