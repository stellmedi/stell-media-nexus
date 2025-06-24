
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Globe } from "lucide-react";
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

export default function CanonicalManager() {
  const [selectedPage, setSelectedPage] = useState("/");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { seoData, isLoading: dataLoading, pageDefaults } = usePageSEO(selectedPage);

  useEffect(() => {
    if (!dataLoading) {
      const defaultCanonical = `https://stellmedia.com${selectedPage === '/' ? '' : selectedPage}`;
      setCanonicalUrl(seoData?.canonicalUrl || defaultCanonical);
      setHasUnsavedChanges(false);
    }
  }, [selectedPage, seoData, dataLoading]);

  const handleCanonicalChange = (value: string) => {
    setCanonicalUrl(value);
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
      const currentData = seoData || {
        metaTitle: pageDefaults?.metaTitle || "",
        metaDescription: pageDefaults?.metaDescription || "",
        keywords: pageDefaults?.keywords || "",
        ogTitle: pageDefaults?.metaTitle || "",
        ogDescription: pageDefaults?.metaDescription || "",
        ogImage: pageDefaults?.ogImage || "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
        twitterTitle: pageDefaults?.metaTitle || "",
        twitterDescription: pageDefaults?.metaDescription || "",
        twitterImage: pageDefaults?.ogImage || "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
        robotsIndex: true,
        robotsFollow: true,
        schemaType: "WebPage",
        schemaData: ""
      };
      
      const updatedData = {
        ...currentData,
        canonicalUrl
      };
      
      const success = saveSEOData(selectedPage, updatedData);
      
      if (success) {
        setHasUnsavedChanges(false);
        toast.success("Canonical URL saved successfully!");
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving canonical URL:', error);
      toast.error("Error saving canonical URL");
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefault = () => {
    const defaultCanonical = `https://stellmedia.com${selectedPage === '/' ? '' : selectedPage}`;
    setCanonicalUrl(defaultCanonical);
    setHasUnsavedChanges(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Canonical URLs
          {hasUnsavedChanges && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Unsaved Changes
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Set preferred URLs for your pages to avoid duplicate content issues
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

        <div>
          <Label htmlFor="canonical-url">Canonical URL</Label>
          <Input
            id="canonical-url"
            value={canonicalUrl}
            onChange={(e) => handleCanonicalChange(e.target.value)}
            placeholder="https://stellmedia.com/page-url"
            className="mt-1"
          />
          <p className="text-sm text-gray-500 mt-1">
            The preferred URL for this page content
          </p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={resetToDefault}>
            Reset to Default
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
