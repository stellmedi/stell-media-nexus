
import { supabase } from "@/integrations/supabase/client";
import { ContentVersion } from "./types";

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
