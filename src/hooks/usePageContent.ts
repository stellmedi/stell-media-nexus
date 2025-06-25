
import { useState, useEffect } from 'react';
import { getPageContent, PageContent } from '@/services/contentService';

export const usePageContent = (pagePath: string) => {
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`usePageContent: Loading content for ${pagePath}`);
        const pageContent = await getPageContent(pagePath);
        console.log(`usePageContent: Loaded content:`, pageContent);
        setContent(pageContent);
      } catch (err) {
        console.error('Error loading page content:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();

    // Listen for content updates from admin panel
    const handleContentUpdate = (event: CustomEvent) => {
      console.log('usePageContent: Received content update event:', event.detail);
      if (event.detail.pagePath === pagePath) {
        console.log('usePageContent: Updating content for matching page');
        setContent(event.detail.content);
      }
    };

    // Listen for content import completion
    const handleContentImport = () => {
      console.log('usePageContent: Content import detected, reloading...');
      loadContent();
    };

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);
    window.addEventListener('contentImported', handleContentImport as EventListener);
    
    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
      window.removeEventListener('contentImported', handleContentImport as EventListener);
    };
  }, [pagePath]);

  const getSection = (sectionKey: string) => {
    const section = content?.sections.find(section => section.section_key === sectionKey);
    console.log(`usePageContent: Getting section ${sectionKey}:`, section);
    return section;
  };

  return {
    content,
    isLoading,
    error,
    getSection
  };
};
