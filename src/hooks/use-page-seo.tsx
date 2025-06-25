
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
}

interface PageSEOData {
  [pagePath: string]: SEOData;
}

export function usePageSEO(pagePath: string) {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageDefaults, setPageDefaults] = useState<any>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const loadSEOData = () => {
      console.log('🔄 usePageSEO: Loading SEO data for page:', pagePath);
      
      // Get page defaults first
      const defaults = getPageDefaults(pagePath);
      setPageDefaults(defaults);
      console.log('📋 usePageSEO: Page defaults:', defaults);

      try {
        const savedSEOData = localStorage.getItem('stellmedia_page_seo');
        console.log('💾 usePageSEO: Raw localStorage data:', savedSEOData);
        
        if (savedSEOData) {
          const parsedData: PageSEOData = JSON.parse(savedSEOData);
          console.log('📊 usePageSEO: All saved SEO data:', parsedData);
          
          if (parsedData[pagePath]) {
            console.log('✅ usePageSEO: Found saved SEO data for page:', pagePath, parsedData[pagePath]);
            setSeoData(parsedData[pagePath]);
          } else {
            console.log('⚠️ usePageSEO: No saved SEO data for page, will use defaults:', pagePath);
            setSeoData(null);
          }
        } else {
          console.log('❌ usePageSEO: No SEO data in localStorage, will use defaults');
          setSeoData(null);
        }
        setSaveError(null);
      } catch (error) {
        console.error('🚨 usePageSEO: Error loading SEO data for page:', pagePath, error);
        setSeoData(null);
        setSaveError(`Failed to load SEO data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadSEOData();

    // Listen for storage changes to update when SEO data is modified in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'stellmedia_page_seo') {
        console.log('🔄 usePageSEO: Storage change detected for SEO data, reloading for page:', pagePath);
        loadSEOData();
      }
    };

    // Listen for custom seoDataUpdated event for same-tab updates
    const handleSEODataUpdated = (e: CustomEvent) => {
      console.log('🔄 usePageSEO: Custom seoDataUpdated event detected, reloading data for page:', pagePath);
      console.log('📝 usePageSEO: Event details:', e.detail);
      // Force reload data to ensure we have the latest
      setTimeout(() => loadSEOData(), 100);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('seoDataUpdated', handleSEODataUpdated as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('seoDataUpdated', handleSEODataUpdated as EventListener);
    };
  }, [pagePath]);

  return { seoData, isLoading, pageDefaults, saveError };
}

export function getAllPageSEO(): PageSEOData {
  try {
    const savedSEOData = localStorage.getItem('stellmedia_page_seo');
    const data = savedSEOData ? JSON.parse(savedSEOData) : {};
    console.log('📖 getAllPageSEO: Retrieved all SEO data:', data);
    return data;
  } catch (error) {
    console.error('🚨 getAllPageSEO: Error loading all SEO data:', error);
    return {};
  }
}

// Enhanced save function with better error handling and validation
export function saveSEOData(pagePath: string, seoData: SEOData): { success: boolean; error?: string } {
  try {
    console.log('💾 [SAVE START] Saving SEO data for page:', pagePath);
    console.log('📝 [SAVE DATA]:', JSON.stringify(seoData, null, 2));
    
    // Validate required fields
    if (!seoData.metaTitle?.trim()) {
      console.warn('⚠️ [SAVE WARNING] Meta title is empty');
    }
    if (!seoData.metaDescription?.trim()) {
      console.warn('⚠️ [SAVE WARNING] Meta description is empty');
    }
    
    // Test localStorage availability
    if (!window.localStorage) {
      throw new Error('localStorage is not available');
    }
    
    const existingData = getAllPageSEO();
    const updatedData = {
      ...existingData,
      [pagePath]: { 
        ...seoData,
        // Ensure all required fields are present
        metaTitle: seoData.metaTitle || '',
        metaDescription: seoData.metaDescription || '',
        canonicalUrl: seoData.canonicalUrl || `https://stellmedia.com${pagePath === '/' ? '' : pagePath}`,
        keywords: seoData.keywords || '',
        ogTitle: seoData.ogTitle || seoData.metaTitle || '',
        ogDescription: seoData.ogDescription || seoData.metaDescription || '',
        ogImage: seoData.ogImage || '',
        twitterTitle: seoData.twitterTitle || seoData.metaTitle || '',
        twitterDescription: seoData.twitterDescription || seoData.metaDescription || '',
        twitterImage: seoData.twitterImage || seoData.ogImage || '',
        robotsIndex: seoData.robotsIndex !== undefined ? seoData.robotsIndex : true,
        robotsFollow: seoData.robotsFollow !== undefined ? seoData.robotsFollow : true,
        schemaType: seoData.schemaType || 'WebPage',
        schemaData: seoData.schemaData || ''
      }
    };
    
    // Save to localStorage with error handling
    const serializedData = JSON.stringify(updatedData);
    localStorage.setItem('stellmedia_page_seo', serializedData);
    console.log('✅ [SAVE SUCCESS] Data saved to localStorage');
    
    // Verify the save worked by reading it back
    const verifyData = localStorage.getItem('stellmedia_page_seo');
    if (!verifyData) {
      throw new Error('Failed to verify save - data not found after saving');
    }
    
    try {
      const parsedVerify = JSON.parse(verifyData);
      if (!parsedVerify[pagePath]) {
        throw new Error('Failed to verify save - page data not found after saving');
      }
      console.log('✅ [SAVE VERIFIED] Data successfully verified in localStorage');
    } catch (verifyError) {
      throw new Error(`Failed to verify save - invalid JSON: ${verifyError instanceof Error ? verifyError.message : 'Unknown error'}`);
    }
    
    // Dispatch update event
    const seoUpdateEvent = new CustomEvent('seoDataUpdated', {
      detail: { 
        updatedPage: pagePath, 
        seoData: { ...seoData }, 
        timestamp: Date.now(),
        action: 'save'
      }
    });
    window.dispatchEvent(seoUpdateEvent);
    console.log('📡 [SAVE EVENT] Update event dispatched for page:', pagePath);
    
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('🚨 [SAVE ERROR] Error saving SEO data:', errorMessage, error);
    return { success: false, error: errorMessage };
  }
}

// Helper function to delete SEO data for a specific page
export function deleteSEOData(pagePath: string): { success: boolean; error?: string } {
  try {
    console.log('🗑️ deleteSEOData: Deleting SEO data for page:', pagePath);
    
    const existingData = getAllPageSEO();
    if (!existingData[pagePath]) {
      console.log('⚠️ deleteSEOData: No data found for page:', pagePath);
      return { success: true }; // Nothing to delete
    }
    
    delete existingData[pagePath];
    
    const serializedData = JSON.stringify(existingData);
    localStorage.setItem('stellmedia_page_seo', serializedData);
    
    // Dispatch custom event to notify all usePageSEO hooks
    const seoUpdateEvent = new CustomEvent('seoDataUpdated', {
      detail: { 
        updatedPage: pagePath, 
        deleted: true, 
        timestamp: Date.now(),
        action: 'delete'
      }
    });
    window.dispatchEvent(seoUpdateEvent);
    
    console.log('✅ deleteSEOData: Successfully deleted SEO data for page:', pagePath);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('🚨 deleteSEOData: Error deleting SEO data:', errorMessage, error);
    return { success: false, error: errorMessage };
  }
}
