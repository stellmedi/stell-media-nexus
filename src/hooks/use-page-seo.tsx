
import { useEffect, useState } from 'react';

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
}

interface PageSEOData {
  [pagePath: string]: SEOData;
}

export function usePageSEO(pagePath: string) {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSEOData = () => {
      console.log('usePageSEO: Loading SEO data for page:', pagePath);
      try {
        const savedSEOData = localStorage.getItem('stellmedia_page_seo');
        if (savedSEOData) {
          const parsedData: PageSEOData = JSON.parse(savedSEOData);
          console.log('usePageSEO: All saved SEO data:', parsedData);
          if (parsedData[pagePath]) {
            console.log('usePageSEO: Found SEO data for page:', pagePath, parsedData[pagePath]);
            setSeoData(parsedData[pagePath]);
          } else {
            console.log('usePageSEO: No SEO data found for page:', pagePath);
            setSeoData(null);
          }
        } else {
          console.log('usePageSEO: No SEO data in localStorage');
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
    const handleStorageChange = () => {
      console.log('usePageSEO: Storage change detected, reloading data for page:', pagePath);
      loadSEOData();
    };

    // Listen for custom seoDataUpdated event for same-tab updates
    const handleSEODataUpdated = () => {
      console.log('usePageSEO: Custom seoDataUpdated event detected, reloading data for page:', pagePath);
      loadSEOData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('seoDataUpdated', handleSEODataUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('seoDataUpdated', handleSEODataUpdated);
    };
  }, [pagePath]);

  return { seoData, isLoading };
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
