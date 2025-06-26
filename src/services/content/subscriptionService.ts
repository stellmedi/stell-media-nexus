
import { supabase } from "@/integrations/supabase/client";

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
