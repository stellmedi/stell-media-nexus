
import { useState, useEffect } from 'react';
import { getPageContent, PageContent } from '@/services/contentService';

export const usePageContent = (pagePath: string) => {
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      console.log(`🔍 usePageContent: Starting to load content for ${pagePath}`);
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`📡 usePageContent: Calling getPageContent for ${pagePath}`);
        const pageContent = await getPageContent(pagePath);
        console.log(`✅ usePageContent: Successfully loaded content:`, pageContent);
        
        if (!pageContent) {
          console.warn(`⚠️ usePageContent: No content returned for ${pagePath}`);
        } else {
          console.log(`📄 usePageContent: Content has ${pageContent.sections?.length || 0} sections`);
          console.log(`🏷️ usePageContent: Content title: "${pageContent.title}"`);
          console.log(`📝 usePageContent: Content published: ${pageContent.is_published}`);
        }
        
        setContent(pageContent);
      } catch (err) {
        console.error('❌ usePageContent: Error loading page content:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        console.log(`🏁 usePageContent: Finished loading content for ${pagePath}`);
        setIsLoading(false);
      }
    };

    loadContent();

    // Listen for content updates from admin panel
    const handleContentUpdate = (event: CustomEvent) => {
      console.log('🔄 usePageContent: Received content update event:', event.detail);
      if (event.detail.pagePath === pagePath) {
        console.log('✨ usePageContent: Updating content for matching page');
        setContent(event.detail.content);
      }
    };

    // Listen for content import completion
    const handleContentImport = () => {
      console.log('📥 usePageContent: Content import detected, reloading...');
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
    console.log(`🔍 usePageContent: Getting section "${sectionKey}":`, section);
    return section;
  };

  console.log(`📊 usePageContent: Current state - loading: ${isLoading}, error: ${error}, hasContent: ${!!content}`);

  return {
    content,
    isLoading,
    error,
    getSection
  };
};
