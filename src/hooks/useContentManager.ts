
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  PageContent,
  PageSection,
  getPageContent,
  getAllPageContent,
  updatePageContent,
  updatePageSection,
  addPageSection,
  deletePageSection,
  saveContentVersion,
  subscribeToContentChanges,
  unsubscribeFromContentChanges
} from '@/services/contentService';

export const useContentManager = () => {
  const [allPageContent, setAllPageContent] = useState<PageContent[]>([]);
  const [selectedPageContent, setSelectedPageContent] = useState<PageContent | null>(null);
  const [originalContent, setOriginalContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load all page content
  const loadAllPageContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const content = await getAllPageContent();
      setAllPageContent(content);
      console.log('Loaded all page content:', content);
    } catch (error) {
      console.error('Error loading page content:', error);
      toast.error('Failed to load content');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load specific page content
  const loadPageContent = useCallback(async (pagePath: string) => {
    setIsLoading(true);
    try {
      const content = await getPageContent(pagePath);
      if (content) {
        setSelectedPageContent(content);
        setOriginalContent(JSON.parse(JSON.stringify(content))); // Deep copy
        setHasUnsavedChanges(false);
        console.log('Loaded page content for', pagePath, ':', content);
      } else {
        toast.error('Page content not found');
      }
    } catch (error) {
      console.error('Error loading page content:', error);
      toast.error('Failed to load page content');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update page metadata
  const updatePageMetadata = useCallback(async (
    pagePath: string,
    updates: Partial<PageContent>
  ) => {
    try {
      const updatedContent = await updatePageContent(pagePath, updates);
      if (updatedContent) {
        setSelectedPageContent(updatedContent);
        
        // Update in allPageContent as well
        setAllPageContent(prev => 
          prev.map(page => 
            page.page_path === pagePath ? updatedContent : page
          )
        );
        
        toast.success('Page metadata updated successfully');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating page metadata:', error);
      toast.error('Failed to update page metadata');
      return false;
    }
  }, []);

  // Update section
  const updateSection = useCallback(async (
    sectionId: string,
    updates: Partial<PageSection>
  ) => {
    try {
      const updatedSection = await updatePageSection(sectionId, updates);
      if (updatedSection && selectedPageContent) {
        const updatedContent = {
          ...selectedPageContent,
          sections: selectedPageContent.sections.map(section =>
            section.id === sectionId ? updatedSection : section
          )
        };
        setSelectedPageContent(updatedContent);
        setHasUnsavedChanges(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating section:', error);
      toast.error('Failed to update section');
      return false;
    }
  }, [selectedPageContent]);

  // Add new section
  const addSection = useCallback(async (
    pagePath: string,
    sectionData: Omit<PageSection, 'id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      const newSection = await addPageSection(pagePath, sectionData);
      if (newSection && selectedPageContent) {
        const updatedContent = {
          ...selectedPageContent,
          sections: [...selectedPageContent.sections, newSection].sort(
            (a, b) => a.display_order - b.display_order
          )
        };
        setSelectedPageContent(updatedContent);
        setHasUnsavedChanges(true);
        toast.success('Section added successfully');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding section:', error);
      toast.error('Failed to add section');
      return false;
    }
  }, [selectedPageContent]);

  // Remove section
  const removeSection = useCallback(async (sectionId: string) => {
    try {
      const success = await deletePageSection(sectionId);
      if (success && selectedPageContent) {
        const updatedContent = {
          ...selectedPageContent,
          sections: selectedPageContent.sections.filter(
            section => section.id !== sectionId
          )
        };
        setSelectedPageContent(updatedContent);
        setHasUnsavedChanges(true);
        toast.success('Section removed successfully');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing section:', error);
      toast.error('Failed to remove section');
      return false;
    }
  }, [selectedPageContent]);

  // Save changes and create version
  const saveChanges = useCallback(async (changeDescription?: string) => {
    if (!selectedPageContent) return false;

    setIsLoading(true);
    try {
      // Save version
      await saveContentVersion(
        selectedPageContent.page_path,
        selectedPageContent,
        changeDescription
      );

      // Update original content
      setOriginalContent(JSON.parse(JSON.stringify(selectedPageContent)));
      setHasUnsavedChanges(false);

      // Dispatch event for other components to update
      window.dispatchEvent(new CustomEvent('contentUpdated', {
        detail: { 
          pagePath: selectedPageContent.page_path, 
          content: selectedPageContent 
        }
      }));

      toast.success('Changes saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to save changes');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedPageContent]);

  // Undo changes
  const undoChanges = useCallback(() => {
    if (originalContent) {
      setSelectedPageContent(JSON.parse(JSON.stringify(originalContent)));
      setHasUnsavedChanges(false);
      toast.info('Changes undone');
    }
  }, [originalContent]);

  // Real-time subscription
  useEffect(() => {
    if (selectedPageContent) {
      const channel = subscribeToContentChanges(
        selectedPageContent.page_path,
        (payload) => {
          console.log('Real-time content update:', payload);
          // Reload content if changed by another user
          loadPageContent(selectedPageContent.page_path);
        }
      );

      return () => {
        unsubscribeFromContentChanges(channel);
      };
    }
  }, [selectedPageContent, loadPageContent]);

  // Initial load
  useEffect(() => {
    loadAllPageContent();
  }, [loadAllPageContent]);

  return {
    allPageContent,
    selectedPageContent,
    originalContent,
    isLoading,
    hasUnsavedChanges,
    loadAllPageContent,
    loadPageContent,
    updatePageMetadata,
    updateSection,
    addSection,
    removeSection,
    saveChanges,
    undoChanges
  };
};
