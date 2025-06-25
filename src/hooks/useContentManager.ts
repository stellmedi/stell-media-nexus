
import { useState, useEffect, useCallback, useRef } from 'react';
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
  
  // Use refs to track current values and prevent stale closures
  const currentPageRef = useRef<string>('');
  const subscriptionRef = useRef<any>(null);

  // Load specific page content with better error handling and loading state management
  const loadPageContent = useCallback(async (pagePath: string) => {
    console.log('useContentManager: Loading content for', pagePath);
    currentPageRef.current = pagePath;
    setIsLoading(true);
    
    try {
      const content = await getPageContent(pagePath);
      
      // Only update state if this is still the current page (prevent race conditions)
      if (currentPageRef.current === pagePath) {
        if (content) {
          console.log('useContentManager: Content loaded successfully:', content);
          setSelectedPageContent(content);
          setOriginalContent(JSON.parse(JSON.stringify(content))); // Deep copy
          setHasUnsavedChanges(false);
        } else {
          console.warn('useContentManager: No content found for', pagePath);
          setSelectedPageContent(null);
          setOriginalContent(null);
          setHasUnsavedChanges(false);
        }
      }
    } catch (error) {
      console.error('useContentManager: Error loading page content:', error);
      if (currentPageRef.current === pagePath) {
        toast.error('Failed to load page content');
        setSelectedPageContent(null);
        setOriginalContent(null);
      }
    } finally {
      if (currentPageRef.current === pagePath) {
        setIsLoading(false);
      }
    }
  }, []);

  // Load all page content
  const loadAllPageContent = useCallback(async () => {
    try {
      const content = await getAllPageContent();
      setAllPageContent(content);
      console.log('useContentManager: Loaded all page content:', content);
    } catch (error) {
      console.error('useContentManager: Error loading all page content:', error);
      toast.error('Failed to load content');
    }
  }, []);

  // Update page metadata with optimistic updates
  const updatePageMetadata = useCallback(async (
    pagePath: string,
    updates: Partial<PageContent>
  ) => {
    if (!selectedPageContent || selectedPageContent.page_path !== pagePath) {
      console.warn('useContentManager: No matching page content to update');
      return false;
    }

    // Optimistic update
    const optimisticContent = { ...selectedPageContent, ...updates };
    setSelectedPageContent(optimisticContent);
    setHasUnsavedChanges(true);

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
        
        return true;
      } else {
        // Revert optimistic update on failure
        setSelectedPageContent(selectedPageContent);
        toast.error('Failed to update page metadata');
        return false;
      }
    } catch (error) {
      console.error('useContentManager: Error updating page metadata:', error);
      // Revert optimistic update on error
      setSelectedPageContent(selectedPageContent);
      toast.error('Failed to update page metadata');
      return false;
    }
  }, [selectedPageContent]);

  // Update section with better error handling
  const updateSection = useCallback(async (
    sectionId: string,
    updates: Partial<PageSection>
  ) => {
    if (!selectedPageContent) {
      console.warn('useContentManager: No selected page content for section update');
      return false;
    }

    try {
      const updatedSection = await updatePageSection(sectionId, updates);
      if (updatedSection) {
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
      console.error('useContentManager: Error updating section:', error);
      toast.error('Failed to update section');
      return false;
    }
  }, [selectedPageContent]);

  // Add new section
  const addSection = useCallback(async (
    pagePath: string,
    sectionData: Omit<PageSection, 'id' | 'created_at' | 'updated_at'>
  ) => {
    if (!selectedPageContent || selectedPageContent.page_path !== pagePath) {
      console.warn('useContentManager: No matching page content for new section');
      return false;
    }

    try {
      const newSection = await addPageSection(pagePath, sectionData);
      if (newSection) {
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
      console.error('useContentManager: Error adding section:', error);
      toast.error('Failed to add section');
      return false;
    }
  }, [selectedPageContent]);

  // Remove section
  const removeSection = useCallback(async (sectionId: string) => {
    if (!selectedPageContent) {
      console.warn('useContentManager: No selected page content for section removal');
      return false;
    }

    try {
      const success = await deletePageSection(sectionId);
      if (success) {
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
      console.error('useContentManager: Error removing section:', error);
      toast.error('Failed to remove section');
      return false;
    }
  }, [selectedPageContent]);

  // Save changes and create version
  const saveChanges = useCallback(async (changeDescription?: string) => {
    if (!selectedPageContent) {
      console.warn('useContentManager: No content to save');
      return false;
    }

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

      return true;
    } catch (error) {
      console.error('useContentManager: Error saving changes:', error);
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
    }
  }, [originalContent]);

  // Real-time subscription with cleanup
  useEffect(() => {
    if (selectedPageContent) {
      // Clean up previous subscription
      if (subscriptionRef.current) {
        unsubscribeFromContentChanges(subscriptionRef.current);
      }

      const channel = subscribeToContentChanges(
        selectedPageContent.page_path,
        (payload) => {
          console.log('useContentManager: Real-time content update:', payload);
          // Only reload if this page is still selected
          if (currentPageRef.current === selectedPageContent.page_path) {
            loadPageContent(selectedPageContent.page_path);
          }
        }
      );

      subscriptionRef.current = channel;

      return () => {
        if (subscriptionRef.current) {
          unsubscribeFromContentChanges(subscriptionRef.current);
          subscriptionRef.current = null;
        }
      };
    }
  }, [selectedPageContent?.page_path, loadPageContent]);

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
