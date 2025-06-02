
import { useEffect, useState } from 'react';
import { getPageDefaults } from '@/config/seoDefaults';

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaType: string;
  schemaData: string;
  // AI SEO fields
  aiContentType: string;
  aiExpertise: string;
  aiServiceFocus: string;
  aiTargetAudience: string;
  aiContentFormat: string;
  aiCrawlerInstructions: string;
  enablePerplexityOptimization: boolean;
  enableChatGPTOptimization: boolean;
}

interface PageSEOData {
  [pagePath: string]: SEOData;
}

export function usePageSEO(pagePath: string) {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageDefaults, setPageDefaults] = useState<any>(null);

  useEffect(() => {
    const loadSEOData = () => {
      console.log('usePageSEO: Loading SEO data for page:', pagePath);
      
      // Get page defaults first
      const defaults = getPageDefaults(pagePath);
      setPageDefaults(defaults);
      console.log('usePageSEO: Page defaults:', defaults);

      try {
        const savedSEOData = localStorage.getItem('stellmedia_page_seo');
        if (savedSEOData) {
          const parsedData: PageSEOData = JSON.parse(savedSEOData);
          console.log('usePageSEO: All saved SEO data:', parsedData);
          if (parsedData[pagePath]) {
            console.log('usePageSEO: Found saved SEO data for page:', pagePath, parsedData[pagePath]);
            setSeoData(parsedData[pagePath]);
          } else {
            console.log('usePageSEO: No saved SEO data for page, will use defaults:', pagePath);
            setSeoData(null);
          }
        } else {
          console.log('usePageSEO: No SEO data in localStorage, will use defaults');
          setSeoData(null);
        }
      } catch (error) {
        console.error('usePageSEO: Error loading SEO data for page:', pagePath, error);
        setSeoData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadSEOData();

    // Listen for storage changes to update when SEO data is modified in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'stellmedia_page_seo') {
        console.log('usePageSEO: Storage change detected for SEO data, reloading for page:', pagePath);
        loadSEOData();
      }
    };

    // Listen for custom seoDataUpdated event for same-tab updates
    const handleSEODataUpdated = (e: CustomEvent) => {
      console.log('usePageSEO: Custom seoDataUpdated event detected, reloading data for page:', pagePath);
      console.log('usePageSEO: Event details:', e.detail);
      loadSEOData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('seoDataUpdated', handleSEODataUpdated as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('seoDataUpdated', handleSEODataUpdated as EventListener);
    };
  }, [pagePath]);

  return { seoData, isLoading, pageDefaults };
}

export function getAllPageSEO(): PageSEOData {
  try {
    const savedSEOData = localStorage.getItem('stellmedia_page_seo');
    const data = savedSEOData ? JSON.parse(savedSEOData) : {};
    console.log('getAllPageSEO: Retrieved all SEO data:', data);
    return data;
  } catch (error) {
    console.error('getAllPageSEO: Error loading all SEO data:', error);
    return {};
  }
}

// Helper function to save SEO data (for use outside of SEOManager if needed)
export function saveSEOData(pagePath: string, seoData: SEOData): boolean {
  try {
    console.log('saveSEOData: Saving SEO data for page:', pagePath, seoData);
    
    const existingData = getAllPageSEO();
    const updatedData = {
      ...existingData,
      [pagePath]: seoData
    };
    
    localStorage.setItem('stellmedia_page_seo', JSON.stringify(updatedData));
    
    // Dispatch custom event to notify all usePageSEO hooks
    const seoUpdateEvent = new CustomEvent('seoDataUpdated', {
      detail: { updatedPage: pagePath, seoData }
    });
    window.dispatchEvent(seoUpdateEvent);
    
    console.log('saveSEOData: Successfully saved and dispatched event for page:', pagePath);
    return true;
  } catch (error) {
    console.error('saveSEOData: Error saving SEO data:', error);
    return false;
  }
}
