import { supabase } from "@/integrations/supabase/client";
import { PageContent, PageSection } from "./types";
import { createDefaultPageContent } from "./initialContentService";

export const getPageContent = async (pagePath: string): Promise<PageContent | null> => {
  try {
    const { data: pageData, error: pageError } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_path', pagePath)
      .single();

    if (pageError) {
      console.error('Error fetching page content:', pageError);
      
      // If no content exists, try to create default content
      if (pageError.code === 'PGRST116' && pagePath === '/') {
        console.log('No home page content found, creating default...');
        await createDefaultPageContent(pagePath);
        
        // Try to fetch again
        const { data: retryPageData, error: retryError } = await supabase
          .from('page_content')
          .select('*')
          .eq('page_path', pagePath)
          .single();
          
        if (retryError || !retryPageData) {
          return null;
        }
        
        // Get sections for the newly created page
        const { data: sectionsData } = await supabase
          .from('page_sections')
          .select('*')
          .eq('page_path', pagePath)
          .eq('is_active', true)
          .order('display_order');

        const sections: PageSection[] = (sectionsData || []).map(section => ({
          ...section,
          section_type: section.section_type as PageSection['section_type']
        }));

        return { ...retryPageData, sections };
      }
      
      return null;
    }

    const { data: sectionsData, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_path', pagePath)
      .eq('is_active', true)
      .order('display_order');

    if (sectionsError) {
      console.error('Error fetching page sections:', sectionsError);
      return null;
    }

    // Type cast the sections data to ensure proper typing
    const sections: PageSection[] = (sectionsData || []).map(section => ({
      ...section,
      section_type: section.section_type as PageSection['section_type']
    }));

    return { ...pageData, sections };
  } catch (error) {
    console.error('Error in getPageContent:', error);
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
