import { supabase } from "@/integrations/supabase/client";
import { getPageTemplate, getAllPagePaths, PageTemplate } from "@/content/pageTemplates";
import { toast } from "sonner";

/**
 * Ensures a page has content in the database.
 * Creates page_content and page_sections from template if they don't exist.
 * Never overwrites existing content.
 */
export async function ensurePageInitialized(pagePath: string): Promise<boolean> {
  try {
    const template = getPageTemplate(pagePath);
    if (!template) {
      console.warn(`No template found for page: ${pagePath}`);
      return false;
    }

    // Check if page_content exists
    const { data: existingContent, error: contentError } = await supabase
      .from('page_content')
      .select('id')
      .eq('page_path', pagePath)
      .single();

    if (contentError && contentError.code !== 'PGRST116') {
      console.error('Error checking page content:', contentError);
      return false;
    }

    // Create page_content if it doesn't exist
    if (!existingContent) {
      const { error: insertError } = await supabase
        .from('page_content')
        .insert({
          page_path: pagePath,
          title: template.title,
          meta_title: template.meta_title,
          meta_description: template.meta_description,
          is_published: true
        });

      if (insertError) {
        console.error('Error creating page content:', insertError);
        return false;
      }
    }

    // Get existing sections for this page
    const { data: existingSections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('section_key')
      .eq('page_path', pagePath)
      .eq('is_active', true);

    if (sectionsError) {
      console.error('Error checking page sections:', sectionsError);
      return false;
    }

    const existingKeys = new Set((existingSections || []).map(s => s.section_key));

    // Insert missing sections from template
    const sectionsToInsert = template.sections
      .filter(section => !existingKeys.has(section.section_key))
      .map(section => ({
        page_path: pagePath,
        section_key: section.section_key,
        title: section.title,
        content: section.content,
        section_type: section.section_type,
        display_order: section.display_order,
        metadata: section.metadata || {},
        is_active: true
      }));

    if (sectionsToInsert.length > 0) {
      const { error: insertSectionsError } = await supabase
        .from('page_sections')
        .insert(sectionsToInsert);

      if (insertSectionsError) {
        console.error('Error creating page sections:', insertSectionsError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error initializing page:', error);
    return false;
  }
}

/**
 * Initialize all pages from templates
 */
export async function initializeAllPages(): Promise<{ success: number; failed: number }> {
  const pagePaths = getAllPagePaths();
  let success = 0;
  let failed = 0;

  for (const path of pagePaths) {
    const result = await ensurePageInitialized(path);
    if (result) {
      success++;
    } else {
      failed++;
    }
  }

  return { success, failed };
}

/**
 * Get missing pages that need initialization
 */
export async function getMissingPages(): Promise<string[]> {
  const allPaths = getAllPagePaths();
  
  const { data: existingPages, error } = await supabase
    .from('page_content')
    .select('page_path');

  if (error) {
    console.error('Error fetching existing pages:', error);
    return allPaths;
  }

  const existingPaths = new Set((existingPages || []).map(p => p.page_path));
  return allPaths.filter(path => !existingPaths.has(path));
}

/**
 * Get pages with missing sections
 */
export async function getPagesWithMissingSections(): Promise<{ path: string; missing: string[] }[]> {
  const allPaths = getAllPagePaths();
  const result: { path: string; missing: string[] }[] = [];

  const { data: existingSections, error } = await supabase
    .from('page_sections')
    .select('page_path, section_key')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching existing sections:', error);
    return result;
  }

  // Group sections by page
  const sectionsByPage: Record<string, Set<string>> = {};
  (existingSections || []).forEach(section => {
    if (!sectionsByPage[section.page_path]) {
      sectionsByPage[section.page_path] = new Set();
    }
    sectionsByPage[section.page_path].add(section.section_key);
  });

  // Check each template for missing sections
  for (const path of allPaths) {
    const template = getPageTemplate(path);
    if (!template) continue;

    const existingKeys = sectionsByPage[path] || new Set();
    const missingKeys = template.sections
      .map(s => s.section_key)
      .filter(key => !existingKeys.has(key));

    if (missingKeys.length > 0) {
      result.push({ path, missing: missingKeys });
    }
  }

  return result;
}
