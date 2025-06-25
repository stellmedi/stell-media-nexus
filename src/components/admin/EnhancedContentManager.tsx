
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Edit, Eye, RotateCcw, AlertCircle, Plus, Trash2 } from "lucide-react";

interface PageSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'text' | 'list' | 'features';
}

interface PageContent {
  id: string;
  pagePath: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: PageSection[];
  lastModified: string;
}

const availablePages = [
  { path: "/", name: "Home Page", defaultSections: [
    { id: "hero", title: "Hero Section", content: "Transform Your Business with AI-Powered Digital Solutions", type: "hero" as const },
    { id: "services", title: "Services Section", content: "Our comprehensive digital marketing services", type: "features" as const },
    { id: "testimonials", title: "Testimonials Section", content: "What our clients say about us", type: "text" as const },
    { id: "cta", title: "Call to Action", content: "Ready to grow your business?", type: "text" as const }
  ]},
  { path: "/about", name: "About Page", defaultSections: [
    { id: "hero", title: "About Hero", content: "About Stell Media", type: "hero" as const },
    { id: "content", title: "Main Content", content: "We are a leading digital marketing agency", type: "text" as const },
    { id: "team", title: "Team Section", content: "Meet our expert team", type: "features" as const }
  ]},
  { path: "/services", name: "Services Page", defaultSections: [
    { id: "hero", title: "Services Hero", content: "Our Digital Marketing Services", type: "hero" as const },
    { id: "services-list", title: "Services List", content: "Real Estate Lead Generation, E-commerce Optimization", type: "list" as const },
    { id: "pricing", title: "Pricing Section", content: "Flexible pricing plans", type: "features" as const }
  ]},
  { path: "/contact", name: "Contact Page", defaultSections: [
    { id: "hero", title: "Contact Hero", content: "Get in Touch", type: "hero" as const },
    { id: "form", title: "Contact Form", content: "Contact form section", type: "text" as const }
  ]}
];

const EnhancedContentManager = () => {
  const [selectedPage, setSelectedPage] = useState("/");
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [originalContent, setOriginalContent] = useState<PageContent | null>(null);
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
    
    let content: PageContent;
    if (savedContent) {
      try {
        content = JSON.parse(savedContent);
        console.log('Loaded saved content:', content);
      } catch (error) {
        console.error('Error parsing saved content:', error);
        content = getDefaultPageContent(pagePath);
      }
    } else {
      content = getDefaultPageContent(pagePath);
    }
    
    setPageContent(content);
    setOriginalContent(JSON.parse(JSON.stringify(content))); // Deep copy for undo
    setHasUnsavedChanges(false);
    setIsEditing(false);
  };

  const getDefaultPageContent = (pagePath: string): PageContent => {
    const pageInfo = availablePages.find(p => p.path === pagePath);
    
    return {
      id: `page_${pagePath.replace(/\//g, '_')}`,
      pagePath,
      title: pageInfo?.name || `Page ${pagePath}`,
      metaTitle: `${pageInfo?.name || 'Page'} | Stell Media`,
      metaDescription: `${pageInfo?.name || 'Page'} description for Stell Media`,
      sections: pageInfo?.defaultSections || [],
      lastModified: new Date().toISOString().split('T')[0]
    };
  };

  const handleContentChange = (field: keyof PageContent, value: string) => {
    if (!pageContent) return;
    
    setPageContent(prev => prev ? { ...prev, [field]: value } : null);
    setHasUnsavedChanges(true);
  };

  const handleSectionChange = (sectionId: string, field: keyof PageSection, value: string) => {
    if (!pageContent) return;
    
    setPageContent(prev => {
      if (!prev) return null;
      
      const updatedSections = prev.sections.map(section => 
        section.id === sectionId 
          ? { ...section, [field]: value }
          : section
      );
      
      return { ...prev, sections: updatedSections };
    });
    setHasUnsavedChanges(true);
  };

  const addSection = () => {
    if (!pageContent) return;
    
    const newSection: PageSection = {
      id: `section_${Date.now()}`,
      title: "New Section",
      content: "Enter content here...",
      type: "text"
    };
    
    setPageContent(prev => {
      if (!prev) return null;
      return { ...prev, sections: [...prev.sections, newSection] };
    });
    setHasUnsavedChanges(true);
  };

  const removeSection = (sectionId: string) => {
    if (!pageContent) return;
    
    setPageContent(prev => {
      if (!prev) return null;
      return { 
        ...prev, 
        sections: prev.sections.filter(section => section.id !== sectionId) 
      };
    });
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
      setOriginalContent(JSON.parse(JSON.stringify(updatedContent))); // Update original for undo
      setHasUnsavedChanges(false);
      
      toast.success("Content saved successfully!", {
        description: `Changes for ${availablePages.find(p => p.path === selectedPage)?.name} have been saved.`,
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

  const handleUndo = () => {
    if (!originalContent) return;
    
    setPageContent(JSON.parse(JSON.stringify(originalContent)));
    setHasUnsavedChanges(false);
    toast.info("Changes undone - reverted to last saved version");
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
          Select a page and edit all its content sections. Changes are saved to localStorage and applied to the live website.
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
              Editing: {selectedPageInfo.name}
            </p>
          )}
        </div>

        {pageContent && (
          <div className="space-y-6">
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
              <div className="space-y-6">
                {/* Page Metadata */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Page Metadata</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Page Title</label>
                      <Input
                        value={pageContent.title || ""}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                        placeholder="Page title"
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
                  </div>
                </div>

                {/* Page Sections */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Page Sections</h4>
                    <Button onClick={addSection} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                  
                  {pageContent.sections.map((section, index) => (
                    <div key={section.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Section {index + 1}</span>
                          <Badge variant="outline">{section.type}</Badge>
                        </div>
                        <Button 
                          onClick={() => removeSection(section.id)} 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Section Title</label>
                          <Input
                            value={section.title}
                            onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                            placeholder="Section title"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Section Content</label>
                          <Textarea
                            value={section.content}
                            onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                            placeholder="Section content"
                            className="mt-1 min-h-[100px]"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Section Type</label>
                          <Select 
                            value={section.type} 
                            onValueChange={(value) => handleSectionChange(section.id, 'type', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hero">Hero</SelectItem>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="list">List</SelectItem>
                              <SelectItem value="features">Features</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                {/* Preview Mode */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Page Title:</h4>
                    <p className="text-xl font-semibold">{pageContent.title || "Not set"}</p>
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
                    <h4 className="font-medium text-gray-700">Page Sections ({pageContent.sections.length}):</h4>
                    <div className="space-y-3 mt-2">
                      {pageContent.sections.map((section, index) => (
                        <div key={section.id} className="bg-white p-3 rounded border">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">Section {index + 1}: {section.title}</span>
                            <Badge variant="outline" className="text-xs">{section.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">{section.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleUndo} 
                  disabled={isLoading || !hasUnsavedChanges}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Undo Changes
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
