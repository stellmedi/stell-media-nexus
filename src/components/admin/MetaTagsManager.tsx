
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";
import { usePageSEO } from "@/hooks/use-page-seo";

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
  const { seoData, saveSEOData } = usePageSEO(selectedPage);
  
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    twitterTitle: "",
    twitterDescription: ""
  });

  useEffect(() => {
    if (seoData) {
      setFormData({
        metaTitle: seoData.metaTitle || "",
        metaDescription: seoData.metaDescription || "",
        keywords: seoData.keywords || "",
        ogTitle: seoData.ogTitle || "",
        ogDescription: seoData.ogDescription || "",
        twitterTitle: seoData.twitterTitle || "",
        twitterDescription: seoData.twitterDescription || ""
      });
    }
  }, [seoData]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await saveSEOData(formData);
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
        <CardTitle>Meta Tags & Titles</CardTitle>
        <CardDescription>
          Manage meta titles, descriptions, and social media tags for your pages
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

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="meta-title">Meta Title</Label>
            <Input
              id="meta-title"
              value={formData.metaTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
              placeholder="Page title for search engines"
            />
          </div>

          <div>
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea
              id="meta-description"
              value={formData.metaDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
              placeholder="Brief description for search engines"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={formData.keywords}
              onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
              placeholder="Comma-separated keywords"
            />
          </div>

          <div>
            <Label htmlFor="og-title">Open Graph Title</Label>
            <Input
              id="og-title"
              value={formData.ogTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, ogTitle: e.target.value }))}
              placeholder="Title for social media sharing"
            />
          </div>

          <div>
            <Label htmlFor="og-description">Open Graph Description</Label>
            <Textarea
              id="og-description"
              value={formData.ogDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, ogDescription: e.target.value }))}
              placeholder="Description for social media sharing"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="twitter-title">Twitter Title</Label>
            <Input
              id="twitter-title"
              value={formData.twitterTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, twitterTitle: e.target.value }))}
              placeholder="Title for Twitter cards"
            />
          </div>

          <div>
            <Label htmlFor="twitter-description">Twitter Description</Label>
            <Textarea
              id="twitter-description"
              value={formData.twitterDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, twitterDescription: e.target.value }))}
              placeholder="Description for Twitter cards"
              rows={3}
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save SEO Settings
        </Button>
      </CardContent>
    </Card>
  );
}
