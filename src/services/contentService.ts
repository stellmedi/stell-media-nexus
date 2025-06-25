
import { supabase } from "@/integrations/supabase/client";

export interface PageContent {
  id: string;
  page_path: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  updated_by?: string;
  sections: PageSection[];
}

export interface PageSection {
  id: string;
  page_path: string;
  section_key: string;
  title: string;
  content: string;
  section_type: 'hero' | 'text' | 'list' | 'features' | 'testimonials' | 'faq' | 'services';
  display_order: number;
  is_active: boolean;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface ContentVersion {
  id: string;
  page_path: string;
  content_data: any;
  version_number: number;
  created_by?: string;
  created_at: string;
  change_description?: string;
}

// Page Content Operations
export const getPageContent = async (pagePath: string): Promise<PageContent | null> => {
  try {
    const { data: pageData, error: pageError } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_path', pagePath)
      .single();

    if (pageError) {
      console.error('Error fetching page content:', pageError);
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

    return { ...pageData, sections: sectionsData || [] };
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

    // Group sections by page path
    const sectionsByPath = sectionsData.reduce((acc, section) => {
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

// Section Operations
export const updatePageSection = async (
  sectionId: string,
  updates: Partial<PageSection>
): Promise<PageSection | null> => {
  try {
    const { data, error } = await supabase
      .from('page_sections')
      .update({
        title: updates.title,
        content: updates.content,
        section_type: updates.section_type,
        display_order: updates.display_order,
        is_active: updates.is_active,
        metadata: updates.metadata,
        updated_at: new Date().toISOString()
      })
      .eq('id', sectionId)
      .select()
      .single();

    if (error) {
      console.error('Error updating page section:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updatePageSection:', error);
    return null;
  }
};

export const addPageSection = async (
  pagePath: string,
  section: Omit<PageSection, 'id' | 'created_at' | 'updated_at'>
): Promise<PageSection | null> => {
  try {
    const { data, error } = await supabase
      .from('page_sections')
      .insert({
        page_path: pagePath,
        section_key: section.section_key,
        title: section.title,
        content: section.content,
        section_type: section.section_type,
        display_order: section.display_order,
        is_active: section.is_active,
        metadata: section.metadata || {}
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding page section:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in addPageSection:', error);
    return null;
  }
};

export const deletePageSection = async (sectionId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('page_sections')
      .update({ is_active: false })
      .eq('id', sectionId);

    if (error) {
      console.error('Error deleting page section:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePageSection:', error);
    return false;
  }
};

// Version Control
export const saveContentVersion = async (
  pagePath: string,
  contentData: any,
  changeDescription?: string
): Promise<ContentVersion | null> => {
  try {
    // Get current version number
    const { data: versions, error: versionError } = await supabase
      .from('content_versions')
      .select('version_number')
      .eq('page_path', pagePath)
      .order('version_number', { ascending: false })
      .limit(1);

    if (versionError) {
      console.error('Error fetching version history:', versionError);
      return null;
    }

    const nextVersion = versions && versions.length > 0 ? versions[0].version_number + 1 : 1;

    const { data, error } = await supabase
      .from('content_versions')
      .insert({
        page_path: pagePath,
        content_data: contentData,
        version_number: nextVersion,
        change_description: changeDescription || `Version ${nextVersion}`
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving content version:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in saveContentVersion:', error);
    return null;
  }
};

// Real-time subscriptions
export const subscribeToContentChanges = (
  pagePath: string,
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel(`content_changes_${pagePath}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'page_content',
        filter: `page_path=eq.${pagePath}`
      },
      callback
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'page_sections',
        filter: `page_path=eq.${pagePath}`
      },
      callback
    )
    .subscribe();

  return channel;
};

export const unsubscribeFromContentChanges = (channel: any) => {
  if (channel) {
    supabase.removeChannel(channel);
  }
};
