import { supabase } from "@/integrations/supabase/client";
import { PageContent, PageSection } from "./types";
import { createDefaultPageContent } from "./initialContentService";

export const getPageContent = async (pagePath: string): Promise<PageContent | null> => {
  console.log(`🔍 pageContentService: Starting getPageContent for ${pagePath}`);
  
  try {
    console.log(`📡 pageContentService: Querying page_content table for ${pagePath}`);
    const { data: pageData, error: pageError } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_path', pagePath)
      .single();

    if (pageError) {
      console.error('❌ pageContentService: Error fetching page content:', pageError);
      
      // If no content exists, try to create default content
      if (pageError.code === 'PGRST116' && pagePath === '/') {
        console.log('🏗️ pageContentService: No home page content found, creating default...');
        await createDefaultPageContent(pagePath);
        
        // Try to fetch again
        console.log('🔄 pageContentService: Retrying fetch after creating default content...');
        const { data: retryPageData, error: retryError } = await supabase
          .from('page_content')
          .select('*')
          .eq('page_path', pagePath)
          .single();
          
        if (retryError || !retryPageData) {
          console.error('❌ pageContentService: Retry failed:', retryError);
          return null;
        }
        
        console.log('✅ pageContentService: Successfully fetched after creating default:', retryPageData);
        
        // Get sections for the newly created page
        console.log('📡 pageContentService: Fetching sections for newly created page...');
        const { data: sectionsData } = await supabase
          .from('page_sections')
          .select('*')
          .eq('page_path', pagePath)
          .eq('is_active', true)
          .order('display_order');

        console.log('📄 pageContentService: Sections data:', sectionsData);

        const sections: PageSection[] = (sectionsData || []).map(section => ({
          ...section,
          section_type: section.section_type as PageSection['section_type']
        }));

        const result = { ...retryPageData, sections };
        console.log('🎯 pageContentService: Final result with sections:', result);
        return result;
      }
      
      return null;
    }

    console.log('✅ pageContentService: Successfully fetched page data:', pageData);

    console.log('📡 pageContentService: Fetching sections...');
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_path', pagePath)
      .eq('is_active', true)
      .order('display_order');

    if (sectionsError) {
      console.error('❌ pageContentService: Error fetching page sections:', sectionsError);
      return null;
    }

    console.log('📄 pageContentService: Sections data:', sectionsData);

    // Type cast the sections data to ensure proper typing
    const sections: PageSection[] = (sectionsData || []).map(section => ({
      ...section,
      section_type: section.section_type as PageSection['section_type']
    }));

    const finalResult = { ...pageData, sections };
    console.log('🎯 pageContentService: Final complete result:', finalResult);
    return finalResult;
  } catch (error) {
    console.error('💥 pageContentService: Unexpected error in getPageContent:', error);
    return null;
  }
};

export const getAllPageContent = async (): Promise<PageContent[]> => {
  try {
    const { data: pageData, error: pageError } = await supabase
      .from('page_content')
      .select('*')
      .order('page_path');

    if (pageError) {
      console.error('Error fetching all page content:', pageError);
      return [];
    }

    const { data: sectionsData, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('is_active', true)
      .order('page_path, display_order');

    if (sectionsError) {
      console.error('Error fetching all sections:', sectionsError);
      return pageData.map(page => ({ ...page, sections: [] }));
    }

    // Type cast the sections data to ensure proper typing
    const typedSections: PageSection[] = (sectionsData || []).map(section => ({
      ...section,
      section_type: section.section_type as PageSection['section_type']
    }));

    // Group sections by page path
    const sectionsByPath = typedSections.reduce((acc, section) => {
      if (!acc[section.page_path]) {
        acc[section.page_path] = [];
      }
      acc[section.page_path].push(section);
      return acc;
    }, {} as Record<string, PageSection[]>);

    return pageData.map(page => ({
      ...page,
      sections: sectionsByPath[page.page_path] || []
    }));
  } catch (error) {
    console.error('Error in getAllPageContent:', error);
    return [];
  }
};

export const updatePageContent = async (
  pagePath: string,
  updates: Partial<PageContent>
): Promise<PageContent | null> => {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .update({
        title: updates.title,
        meta_title: updates.meta_title,
        meta_description: updates.meta_description,
        keywords: updates.keywords,
        og_title: updates.og_title,
        og_description: updates.og_description,
        og_image: updates.og_image,
        twitter_title: updates.twitter_title,
        twitter_description: updates.twitter_description,
        twitter_image: updates.twitter_image,
        canonical_url: updates.canonical_url,
        robots_index: updates.robots_index,
        robots_follow: updates.robots_follow,
        is_published: updates.is_published,
        updated_at: new Date().toISOString()
      })
      .eq('page_path', pagePath)
      .select()
      .single();

    if (error) {
      console.error('Error updating page content:', error);
      throw error;
    }

    return await getPageContent(pagePath);
  } catch (error) {
    console.error('Error in updatePageContent:', error);
    return null;
  }
};
