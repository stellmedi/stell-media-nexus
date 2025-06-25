
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
        const pageContent = await getPageContent(pagePath);
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
      if (event.detail.pagePath === pagePath) {
        setContent(event.detail.content);
      }
    };

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
    };
  }, [pagePath]);

  const getSection = (sectionKey: string) => {
    return content?.sections.find(section => section.section_key === sectionKey);
  };

  return {
    content,
    isLoading,
    error,
    getSection
  };
};
