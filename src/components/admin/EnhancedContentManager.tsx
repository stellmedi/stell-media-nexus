
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Edit, Eye, RotateCcw, AlertCircle } from "lucide-react";
import PageSelector from "./content/PageSelector";
import PageMetadataEditor from "./content/PageMetadataEditor";
import SectionsManager from "./content/SectionsManager";
import ContentPreview from "./content/ContentPreview";

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
    
    try {
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
    } catch (error) {
      console.error('Error loading page content:', error);
      toast.error("Error loading page content");
    }
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
        <PageSelector
          availablePages={availablePages}
          selectedPage={selectedPage}
          onPageChange={handlePageChange}
        />

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
                <PageMetadataEditor
                  pageContent={pageContent}
                  onContentChange={handleContentChange}
                />
                
                <SectionsManager
                  sections={pageContent.sections}
                  onSectionChange={handleSectionChange}
                  onAddSection={addSection}
                  onRemoveSection={removeSection}
                />
              </div>
            ) : (
              <ContentPreview pageContent={pageContent} />
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
