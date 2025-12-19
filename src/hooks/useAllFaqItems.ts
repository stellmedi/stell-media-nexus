import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  page_path: string;
  display_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
}

// Hook for admin panel - fetches ALL FAQ items (active and inactive)
export const useAllFaqItems = () => {
  return useQuery({
    queryKey: ['faq-items', 'all'],
    queryFn: async (): Promise<FaqItem[]> => {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .order('page_path', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching FAQ items:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
