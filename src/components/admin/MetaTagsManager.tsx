
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Loader2, Globe, Share2, Twitter, RefreshCw } from "lucide-react";
import { usePageSEO } from "@/hooks/use-page-seo";
import { useContentManager } from "@/hooks/useContentManager";

const availablePages = [
  { path: "/", name: "Home Page" },
  { path: "/about", name: "About Page" },
  { path: "/services", name: "Services Page" },
  { path: "/contact", name: "Contact Page" },
  { path: "/blog", name: "Blog Page" },
  { path: "/case-studies", name: "Case Studies Page" },
  { path: "/faq", name: "FAQ Page" },
  { path: "/careers", name: "Careers Page" }
];

export default function MetaTagsManager() {
  const [selectedPage, setSelectedPage] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { seoData, pageDefaults } = usePageSEO(selectedPage);
  const { selectedPageContent, loadPageContent, updatePageMetadata } = useContentManager();
  
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    canonicalUrl: "",
    robotsIndex: true,
    robotsFollow: true
  });

  // Load page content when selected page changes
  useEffect(() => {
    const loadContent = async () => {
      setIsRefreshing(true);
      try {
        await loadPageContent(selectedPage);
      } finally {
        setIsRefreshing(false);
      }
    };
    loadContent();
  }, [selectedPage, loadPageContent]);

  // Update form data when content loads
  useEffect(() => {
    if (selectedPageContent) {
      setFormData({
        metaTitle: selectedPageContent.meta_title || "",
        metaDescription: selectedPageContent.meta_description || "",
        keywords: selectedPageContent.keywords || "",
        ogTitle: selectedPageContent.og_title || selectedPageContent.meta_title || "",
        ogDescription: selectedPageContent.og_description || selectedPageContent.meta_description || "",
        ogImage: selectedPageContent.og_image || "",
        twitterTitle: selectedPageContent.twitter_title || selectedPageContent.meta_title || "",
        twitterDescription: selectedPageContent.twitter_description || selectedPageContent.meta_description || "",
        twitterImage: selectedPageContent.twitter_image || "",
        canonicalUrl: selectedPageContent.canonical_url || "",
        robotsIndex: selectedPageContent.robots_index ?? true,
        robotsFollow: selectedPageContent.robots_follow ?? true
      });
    } else if (pageDefaults) {
      // Use defaults if no content exists
      setFormData({
        metaTitle: pageDefaults.metaTitle || "",
        metaDescription: pageDefaults.metaDescription || "",
        keywords: pageDefaults.keywords || "",
        ogTitle: pageDefaults.ogTitle || "",
        ogDescription: pageDefaults.ogDescription || "",
        ogImage: "",
        twitterTitle: pageDefaults.twitterTitle || "",
        twitterDescription: pageDefaults.twitterDescription || "",
        twitterImage: "",
        canonicalUrl: "",
        robotsIndex: true,
        robotsFollow: true
      });
    }
  }, [selectedPageContent, pageDefaults]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save all SEO fields to the database
      const success = await updatePageMetadata(selectedPage, {
        meta_title: formData.metaTitle,
        meta_description: formData.metaDescription,
        keywords: formData.keywords,
        og_title: formData.ogTitle,
        og_description: formData.ogDescription,
        og_image: formData.ogImage,
        twitter_title: formData.twitterTitle,
        twitter_description: formData.twitterDescription,
        twitter_image: formData.twitterImage,
        canonical_url: formData.canonicalUrl,
        robots_index: formData.robotsIndex,
        robots_follow: formData.robotsFollow
      });
      
      if (success) {
        toast.success("All SEO settings saved successfully!");
      } else {
        toast.error("Failed to save SEO settings - please try again");
      }
    } catch (error) {
      console.error("Error saving SEO data:", error);
      toast.error("Failed to save SEO settings - please check your connection");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadPageContent(selectedPage);
      toast.success("SEO data refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh SEO data");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              SEO Meta Tags & Titles
            </CardTitle>
            <CardDescription>
              Manage all SEO settings including meta tags, Open Graph, Twitter Cards, and technical SEO. 
              Changes are saved immediately to the database.
            </CardDescription>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm" disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
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
          </div>

          <div>
            <Label htmlFor="canonical-url">Canonical URL</Label>
            <Input
              id="canonical-url"
              value={formData.canonicalUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
              placeholder="https://stellmedia.com/page-path"
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="robots-index"
                checked={formData.robotsIndex}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, robotsIndex: checked }))}
              />
              <Label htmlFor="robots-index">Allow Search Engine Indexing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="robots-follow"
                checked={formData.robotsFollow}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, robotsFollow: checked }))}
              />
              <Label htmlFor="robots-follow">Allow Following Links</Label>
            </div>
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

          <div>
            <Label htmlFor="og-image">Open Graph Image URL</Label>
            <Input
              id="og-image"
              value={formData.ogImage}
              onChange={(e) => setFormData(prev => ({ ...prev, ogImage: e.target.value }))}
              placeholder="https://stellmedia.com/images/og-image.jpg"
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

          <div>
            <Label htmlFor="twitter-image">Twitter Image URL</Label>
            <Input
              id="twitter-image"
              value={formData.twitterImage}
              onChange={(e) => setFormData(prev => ({ ...prev, twitterImage: e.target.value }))}
              placeholder="https://stellmedia.com/images/twitter-image.jpg"
            />
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-gray-500">
            * Required fields for optimal SEO performance. All changes are saved to the database.
          </p>
          <Button onClick={handleSave} disabled={isLoading || isRefreshing} className="min-w-[120px]">
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save All SEO Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
