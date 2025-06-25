
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Edit, Eye, RotateCcw, AlertCircle } from "lucide-react";

interface PageContent {
  id: string;
  pagePath: string;
  title: string;
  heroTitle?: string;
  heroDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  content: string;
  lastModified: string;
}

const availablePages = [
  { path: "/", name: "Home Page", sections: ["hero", "services", "testimonials"] },
  { path: "/about", name: "About Page", sections: ["hero", "content"] },
  { path: "/services", name: "Services Page", sections: ["hero", "services-list"] },
  { path: "/contact", name: "Contact Page", sections: ["hero", "form"] },
  { path: "/case-studies", name: "Case Studies", sections: ["hero", "case-studies-list"] },
  { path: "/blog", name: "Blog Page", sections: ["hero", "blog-list"] }
];

const EnhancedContentManager = () => {
  const [selectedPage, setSelectedPage] = useState("/");
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load page content when page selection changes
  useEffect(() => {
    loadPageContent(selectedPage);
  }, [selectedPage]);

  const loadPageContent = (pagePath: string) => {
    console.log('Loading content for page:', pagePath);
    
    // Try to load from localStorage first
    const savedContent = localStorage.getItem(`stellmedia_page_content_${pagePath}`);
    
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setPageContent(parsedContent);
        console.log('Loaded saved content:', parsedContent);
      } catch (error) {
        console.error('Error parsing saved content:', error);
        setPageContent(getDefaultPageContent(pagePath));
      }
    } else {
      setPageContent(getDefaultPageContent(pagePath));
    }
    
    setHasUnsavedChanges(false);
    setIsEditing(false);
  };

  const getDefaultPageContent = (pagePath: string): PageContent => {
    const pageDefaults: Record<string, Partial<PageContent>> = {
      "/": {
        title: "Home Page",
        heroTitle: "Transform Your Business with AI-Powered Digital Solutions",
        heroDescription: "Drive growth with our comprehensive digital marketing services for real estate and e-commerce brands.",
        content: "Welcome to Stell Media - your trusted digital growth partner.",
        metaTitle: "Stell Media | Digital Growth for Real Estate & eCommerce Brands",
        metaDescription: "Digital growth for real estate and eCommerce brands. CRM automation, lead gen, and SEO-powered product discovery by Stell Media."
      },
      "/about": {
        title: "About Us",
        heroTitle: "About Stell Media",
        heroDescription: "Your trusted digital growth partner with proven expertise in real estate and e-commerce optimization.",
        content: "Stell Media is a leading digital marketing agency specializing in real estate lead generation and e-commerce optimization.",
        metaTitle: "About Stell Media - Digital Marketing Experts",
        metaDescription: "Learn about Stell Media's expertise in digital marketing, real estate lead generation, and e-commerce optimization services."
      },
      "/services": {
        title: "Services",
        heroTitle: "Our Digital Marketing Services",
        heroDescription: "Comprehensive solutions for real estate developers and e-commerce brands to accelerate growth.",
        content: "We offer a complete suite of digital marketing services tailored for real estate and e-commerce industries.",
        metaTitle: "Digital Marketing Services | Real Estate & E-commerce",
        metaDescription: "Comprehensive digital marketing services for real estate and e-commerce. Lead generation, CRM automation, SEO, and conversion optimization."
      }
    };

    const defaults = pageDefaults[pagePath] || {};
    
    return {
      id: `page_${pagePath.replace(/\//g, '_')}`,
      pagePath,
      title: defaults.title || `Page ${pagePath}`,
      heroTitle: defaults.heroTitle || "",
      heroDescription: defaults.heroDescription || "",
      metaTitle: defaults.metaTitle || "",
      metaDescription: defaults.metaDescription || "",
      content: defaults.content || "",
      lastModified: new Date().toISOString().split('T')[0]
    };
  };

  const handleContentChange = (field: keyof PageContent, value: string) => {
    if (!pageContent) return;
    
    setPageContent(prev => prev ? { ...prev, [field]: value } : null);
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (!pageContent) return;
    
    setIsLoading(true);
    console.log('Saving content for page:', pageContent.pagePath);
    
    try {
      // Update last modified date
      const updatedContent = {
        ...pageContent,
        lastModified: new Date().toISOString().split('T')[0]
      };
      
      // Save to localStorage
      localStorage.setItem(`stellmedia_page_content_${pageContent.pagePath}`, JSON.stringify(updatedContent));
      
      // Dispatch event to update any components listening for content changes
      window.dispatchEvent(new CustomEvent('pageContentUpdated', {
        detail: { pagePath: pageContent.pagePath, content: updatedContent }
      }));
      
      setPageContent(updatedContent);
      setHasUnsavedChanges(false);
      setIsEditing(false);
      
      toast.success("Content saved successfully!", {
        description: `Changes for ${availablePages.find(p => p.path === selectedPage)?.name} have been saved and applied.`,
        duration: 3000
      });
      
      console.log('Content saved successfully:', updatedContent);
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error("Error saving content", {
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
    
    loadPageContent(selectedPage);
    toast.info("Content reset to last saved version");
  };

  const handlePageChange = (newPage: string) => {
    if (hasUnsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to switch pages?')) {
        return;
      }
    }
    setSelectedPage(newPage);
  };

  const selectedPageInfo = availablePages.find(p => p.path === selectedPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          Enhanced Content Manager
          {hasUnsavedChanges && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <AlertCircle className="h-3 w-3 mr-1" />
              Unsaved Changes
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Select a page and edit its content. Changes are saved and applied to the live website.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Page Selector */}
        <div>
          <label className="text-sm font-medium">Select Page to Edit</label>
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
          {selectedPageInfo && (
            <p className="text-sm text-gray-500 mt-1">
              Editing: {selectedPageInfo.name} - Sections: {selectedPageInfo.sections.join(", ")}
            </p>
          )}
        </div>

        {pageContent && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Content for {pageContent.title}</h3>
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Content
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Hero Title</label>
                  <Input
                    value={pageContent.heroTitle || ""}
                    onChange={(e) => handleContentChange('heroTitle', e.target.value)}
                    placeholder="Main headline for the page"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Hero Description</label>
                  <Textarea
                    value={pageContent.heroDescription || ""}
                    onChange={(e) => handleContentChange('heroDescription', e.target.value)}
                    placeholder="Subheading or description for the hero section"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Meta Title (SEO)</label>
                  <Input
                    value={pageContent.metaTitle || ""}
                    onChange={(e) => handleContentChange('metaTitle', e.target.value)}
                    placeholder="Title that appears in search results"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Meta Description (SEO)</label>
                  <Textarea
                    value={pageContent.metaDescription || ""}
                    onChange={(e) => handleContentChange('metaDescription', e.target.value)}
                    placeholder="Description that appears in search results"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Page Content</label>
                  <Textarea
                    value={pageContent.content}
                    onChange={(e) => handleContentChange('content', e.target.value)}
                    placeholder="Main content for the page"
                    className="mt-1 min-h-[200px]"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-700">Hero Title:</h4>
                  <p className="text-lg font-semibold">{pageContent.heroTitle || "Not set"}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Hero Description:</h4>
                  <p>{pageContent.heroDescription || "Not set"}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Meta Title:</h4>
                  <p className="text-sm">{pageContent.metaTitle || "Not set"}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Meta Description:</h4>
                  <p className="text-sm">{pageContent.metaDescription || "Not set"}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Content:</h4>
                  <p className="whitespace-pre-wrap">{pageContent.content || "No content set"}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset} disabled={isLoading}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              {isEditing && (
                <Button 
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges || isLoading}
                  className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
                </Button>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              Last modified: {pageContent.lastModified}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedContentManager;
