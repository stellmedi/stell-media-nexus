
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Edit, Eye, RotateCcw, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { useContentManager } from "@/hooks/useContentManager";
import PageSelector from "./content/PageSelector";
import FullPageEditor from "./content/FullPageEditor";
import ContentPreview from "./content/ContentPreview";

const availablePages = [
  { path: "/", name: "Home Page" },
  { path: "/about", name: "About Page" },
  { path: "/services", name: "Services Page" },
  { path: "/contact", name: "Contact Page" },
  { path: "/blog", name: "Blog Page" },
  { path: "/case-studies", name: "Case Studies Page" },
  { path: "/careers", name: "Careers Page" },
  { path: "/faq", name: "FAQ Page" }
];

const EnhancedContentManager = () => {
  const [selectedPage, setSelectedPage] = useState("/");
  const [isEditing, setIsEditing] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const {
    allPageContent,
    selectedPageContent,
    isLoading,
    hasUnsavedChanges,
    loadPageContent,
    updatePageMetadata,
    updateSection,
    addSection,
    removeSection,
    saveChanges,
    undoChanges
  } = useContentManager();

  // Force load content on component mount and page changes with better error handling
  useEffect(() => {
    console.log('EnhancedContentManager: Loading page content for:', selectedPage);
    const loadContent = async () => {
      try {
        await loadPageContent(selectedPage);
      } catch (error) {
        console.error('Error loading page content:', error);
        toast.error('Failed to load page content');
      } finally {
        setIsInitialLoad(false);
      }
    };
    
    if (selectedPage) {
      loadContent();
    }
  }, [selectedPage, loadPageContent]);

  // Debug logging with better state tracking
  useEffect(() => {
    console.log('EnhancedContentManager State Update:', {
      selectedPage,
      selectedPageContent: selectedPageContent ? {
        id: selectedPageContent.id,
        title: selectedPageContent.title,
        sectionsCount: selectedPageContent.sections?.length || 0
      } : null,
      isLoading,
      isInitialLoad,
      hasUnsavedChanges
    });
  }, [selectedPageContent, isLoading, isInitialLoad, hasUnsavedChanges, selectedPage]);

  const handlePageTitleChange = async (title: string) => {
    if (!selectedPageContent) {
      console.warn('No selected page content to update');
      toast.error('No page selected');
      return;
    }
    
    console.log('Updating page title:', title);
    const success = await updatePageMetadata(selectedPageContent.page_path, { title });
    if (success) {
      toast.success('Page title updated');
    }
  };

  const handleSectionChange = async (sectionId: string, field: string, value: string) => {
    console.log('Updating section:', sectionId, field, value);
    const updates = { [field]: value } as any;
    const success = await updateSection(sectionId, updates);
    if (success) {
      toast.success('Section updated');
    }
  };

  const handleAddSection = async () => {
    if (!selectedPageContent) {
      toast.error('No page selected');
      return;
    }
    
    console.log('Adding new section to:', selectedPageContent.page_path);
    const newSection = {
      page_path: selectedPageContent.page_path,
      section_key: `section_${Date.now()}`,
      title: "New Section",
      content: "Enter content here...",
      section_type: "text" as const,
      display_order: selectedPageContent.sections.length + 1,
      is_active: true,
      metadata: {}
    };
    
    const success = await addSection(selectedPageContent.page_path, newSection);
    if (!success) {
      toast.error('Failed to add section');
    }
  };

  const handleRemoveSection = async (sectionId: string) => {
    console.log('Removing section:', sectionId);
    const success = await removeSection(sectionId);
    if (!success) {
      toast.error('Failed to remove section');
    }
  };

  const handleSave = async () => {
    console.log('Saving changes...');
    const success = await saveChanges("Manual save from enhanced content manager");
    if (success) {
      setIsEditing(false);
      toast.success('Content saved successfully');
    } else {
      toast.error('Failed to save changes');
    }
  };

  const handlePageChange = (newPage: string) => {
    if (hasUnsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to switch pages?')) {
        return;
      }
    }
    console.log('Changing page from', selectedPage, 'to', newPage);
    setSelectedPage(newPage);
    setIsEditing(false);
    setIsInitialLoad(true);
  };

  const handleUndo = () => {
    undoChanges();
    toast.info('Changes undone');
  };

  const handleRefreshContent = async () => {
    console.log('Refreshing content for:', selectedPage);
    setIsInitialLoad(true);
    try {
      await loadPageContent(selectedPage);
      toast.success('Content refreshed');
    } catch (error) {
      console.error('Error refreshing content:', error);
      toast.error('Failed to refresh content');
    } finally {
      setIsInitialLoad(false);
    }
  };

  // Show loading state for initial load
  if (isInitialLoad && isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading content from database...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          Select a page and edit all its content sections. SEO settings are managed separately in the SEO section.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PageSelector
          availablePages={availablePages}
          selectedPage={selectedPage}
          onPageChange={handlePageChange}
        />

        {selectedPageContent ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Content for {selectedPageContent.title || availablePages.find(p => p.path === selectedPage)?.name || 'Selected Page'}
              </h3>
              <div className="flex gap-2">
                <Button onClick={handleRefreshContent} variant="outline" size="sm" disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
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
              <FullPageEditor
                pageContent={selectedPageContent}
                onPageTitleChange={handlePageTitleChange}
                onSectionChange={handleSectionChange}
                onAddSection={handleAddSection}
                onRemoveSection={handleRemoveSection}
                onSave={handleSave}
                hasUnsavedChanges={hasUnsavedChanges}
                isLoading={isLoading}
              />
            ) : (
              <ContentPreview 
                pageContent={{
                  id: selectedPageContent.id,
                  pagePath: selectedPageContent.page_path,
                  title: selectedPageContent.title,
                  metaTitle: selectedPageContent.meta_title,
                  metaDescription: selectedPageContent.meta_description,
                  sections: selectedPageContent.sections.map(section => ({
                    id: section.id,
                    title: section.title,
                    content: section.content,
                    type: section.section_type
                  })),
                  lastModified: selectedPageContent.updated_at.split('T')[0]
                }}
              />
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
            </div>
            
            <div className="text-sm text-gray-500">
              Last modified: {new Date(selectedPageContent.updated_at).toLocaleDateString()}
              {selectedPageContent.sections && (
                <span className="ml-4">
                  Sections: {selectedPageContent.sections.length}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Found</h3>
              <p className="text-gray-500 mb-4">
                {isLoading ? 'Loading page content...' : 'No content found for this page. Content will be created automatically when you start editing.'}
              </p>
              {!isLoading && (
                <Button onClick={handleRefreshContent} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reload Content
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedContentManager;
