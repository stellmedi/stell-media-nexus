
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
      try {
        const savedSEOData = localStorage.getItem('stellmedia_page_seo');
        if (savedSEOData) {
          const parsedData: PageSEOData = JSON.parse(savedSEOData);
          if (parsedData[pagePath]) {
            setSeoData(parsedData[pagePath]);
          }
        }
      } catch (error) {
        console.error('Error loading SEO data for page:', pagePath, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSEOData();

    // Listen for storage changes to update when SEO data is modified in admin
    const handleStorageChange = () => {
      loadSEOData();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pagePath]);

  return { seoData, isLoading };
}

export function getAllPageSEO(): PageSEOData {
  try {
    const savedSEOData = localStorage.getItem('stellmedia_page_seo');
    return savedSEOData ? JSON.parse(savedSEOData) : {};
  } catch (error) {
    console.error('Error loading all SEO data:', error);
    return {};
  }
}
