
import { supabase } from "@/integrations/supabase/client";
import { PageSection } from "./types";

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

    return {
      ...data,
      section_type: data.section_type as PageSection['section_type']
    };
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

    return {
      ...data,
      section_type: data.section_type as PageSection['section_type']
    };
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
