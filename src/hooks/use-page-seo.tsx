
import { useEffect, useState } from 'react';
import { getPageDefaults } from '@/config/seoDefaults';
import { supabase } from '@/integrations/supabase/client';

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

export function usePageSEO(pagePath: string) {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageDefaults, setPageDefaults] = useState<any>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const loadSEOData = async () => {
      console.log('🔄 usePageSEO: Loading SEO data for page:', pagePath);
      
      // Get page defaults first
      const defaults = getPageDefaults(pagePath);
      setPageDefaults(defaults);
      console.log('📋 usePageSEO: Page defaults:', defaults);

      try {
        // Load from database instead of localStorage
        const { data: pageContent, error } = await supabase
          .from('page_content')
          .select('meta_title, meta_description, keywords')
          .eq('page_path', pagePath)
          .maybeSingle();

        if (error) {
          console.error('🚨 usePageSEO: Error loading from database:', error);
          setSeoData(null);
          setSaveError(`Failed to load SEO data: ${error.message}`);
        } else if (pageContent) {
          console.log('✅ usePageSEO: Found database SEO data for page:', pagePath, pageContent);
          const dbSeoData: SEOData = {
            metaTitle: pageContent.meta_title || defaults?.metaTitle || '',
            metaDescription: pageContent.meta_description || defaults?.metaDescription || '',
            keywords: pageContent.keywords || defaults?.keywords || '',
            canonicalUrl: `https://stellmedia.com${pagePath === '/' ? '' : pagePath}`,
            ogTitle: pageContent.meta_title || defaults?.ogTitle || '',
            ogDescription: pageContent.meta_description || defaults?.ogDescription || '',
            ogImage: defaults?.ogImage || '',
            twitterTitle: pageContent.meta_title || defaults?.twitterTitle || '',
            twitterDescription: pageContent.meta_description || defaults?.twitterDescription || '',
            twitterImage: defaults?.twitterImage || '',
            robotsIndex: true,
            robotsFollow: true,
            schemaType: 'WebPage',
            schemaData: ''
          };
          setSeoData(dbSeoData);
        } else {
          console.log('⚠️ usePageSEO: No database SEO data for page, using defaults:', pagePath);
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
  }, [pagePath]);

  return { seoData, isLoading, pageDefaults, saveError };
}

// Get all SEO data from database
export async function getAllPageSEO() {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('page_path, meta_title, meta_description, keywords');

    if (error) {
      console.error('🚨 getAllPageSEO: Error loading all SEO data:', error);
      return {};
    }

    const seoData: any = {};
    data?.forEach(page => {
      seoData[page.page_path] = {
        metaTitle: page.meta_title || '',
        metaDescription: page.meta_description || '',
        keywords: page.keywords || '',
        canonicalUrl: `https://stellmedia.com${page.page_path === '/' ? '' : page.page_path}`,
        ogTitle: page.meta_title || '',
        ogDescription: page.meta_description || '',
        ogImage: '',
        twitterTitle: page.meta_title || '',
        twitterDescription: page.meta_description || '',
        twitterImage: '',
        robotsIndex: true,
        robotsFollow: true,
        schemaType: 'WebPage',
        schemaData: ''
      };
    });

    console.log('📖 getAllPageSEO: Retrieved all SEO data from database:', seoData);
    return seoData;
  } catch (error) {
    console.error('🚨 getAllPageSEO: Error loading all SEO data:', error);
    return {};
  }
}

// Save SEO data to database
export async function saveSEOData(pagePath: string, seoData: SEOData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('💾 [SAVE START] Saving SEO data to database for page:', pagePath);
    console.log('📝 [SAVE DATA]:', JSON.stringify(seoData, null, 2));
    
    // Update the page_content table
    const { data, error } = await supabase
      .from('page_content')
      .upsert({
        page_path: pagePath,
        meta_title: seoData.metaTitle,
        meta_description: seoData.metaDescription,
        keywords: seoData.keywords,
        title: seoData.metaTitle, // Use meta title as page title if not set
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'page_path'
      });

    if (error) {
      console.error('🚨 [SAVE ERROR] Error saving SEO data to database:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ [SAVE SUCCESS] SEO data saved to database');
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('🚨 [SAVE ERROR] Error saving SEO data:', errorMessage, error);
    return { success: false, error: errorMessage };
  }
}

// Delete SEO data from database
export async function deleteSEOData(pagePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🗑️ deleteSEOData: Deleting SEO data for page:', pagePath);
    
    const { error } = await supabase
      .from('page_content')
      .update({
        meta_title: null,
        meta_description: null,
        keywords: null
      })
      .eq('page_path', pagePath);

    if (error) {
      console.error('🚨 deleteSEOData: Error deleting SEO data:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ deleteSEOData: Successfully deleted SEO data for page:', pagePath);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('🚨 deleteSEOData: Error deleting SEO data:', errorMessage, error);
    return { success: false, error: errorMessage };
  }
}
