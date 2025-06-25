
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Edit, Eye, RotateCcw, AlertCircle, Loader2 } from "lucide-react";
import { useContentManager } from "@/hooks/useContentManager";
import PageSelector from "./content/PageSelector";
import PageMetadataEditor from "./content/PageMetadataEditor";
import SectionsManager from "./content/SectionsManager";
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

  // Load page content when page selection changes
  useEffect(() => {
    if (selectedPage) {
      console.log('Loading page content for:', selectedPage);
      loadPageContent(selectedPage);
    }
  }, [selectedPage, loadPageContent]);

  const handleContentChange = async (field: string, value: string) => {
    if (!selectedPageContent) {
      console.warn('No selected page content to update');
      return;
    }
    
    console.log('Updating page metadata:', field, value);
    const updates = { [field]: value } as any;
    await updatePageMetadata(selectedPageContent.page_path, updates);
  };

  const handleSectionChange = async (sectionId: string, field: string, value: string) => {
    console.log('Updating section:', sectionId, field, value);
    const updates = { [field]: value } as any;
    await updateSection(sectionId, updates);
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
    
    await addSection(selectedPageContent.page_path, newSection);
  };

  const handleRemoveSection = async (sectionId: string) => {
    console.log('Removing section:', sectionId);
    await removeSection(sectionId);
  };

  const handleSave = async () => {
    console.log('Saving changes...');
    const success = await saveChanges("Manual save from enhanced content manager");
    if (success) {
      setIsEditing(false);
      toast.success('Content saved successfully');
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
    setIsEditing(false); // Reset editing mode when changing pages
  };

  if (isLoading && !selectedPageContent) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading content...</span>
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
          Select a page and edit all its content sections. Changes are saved to the database and applied to the live website.
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
              <h3 className="text-lg font-semibold">Content for {selectedPageContent.title || 'Selected Page'}</h3>
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
                  pageContent={{
                    id: selectedPageContent.id,
                    pagePath: selectedPageContent.page_path,
                    title: selectedPageContent.title,
                    metaTitle: selectedPageContent.meta_title,
                    metaDescription: selectedPageContent.meta_description
                  }}
                  onContentChange={handleContentChange}
                />
                
                <SectionsManager
                  sections={selectedPageContent.sections.map(section => ({
                    id: section.id,
                    title: section.title,
                    content: section.content,
                    type: section.section_type
                  }))}
                  onSectionChange={handleSectionChange}
                  onAddSection={handleAddSection}
                  onRemoveSection={handleRemoveSection}
                />
              </div>
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
                  onClick={undoChanges} 
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
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
                </Button>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              Last modified: {new Date(selectedPageContent.updated_at).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {isLoading ? 'Loading page content...' : 'No content found for this page. Content will be created automatically when you start editing.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedContentManager;
