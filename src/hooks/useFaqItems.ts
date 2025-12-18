import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface FaqItem {
  id: string;
  page_path: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export const useFaqItems = (pagePath: string = '/') => {
  return useQuery({
    queryKey: ['faq-items', pagePath],
    queryFn: async (): Promise<FaqItem[]> => {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .eq('page_path', pagePath)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching FAQ items:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAllFaqItems = () => {
  return useQuery({
    queryKey: ['faq-items-all'],
    queryFn: async (): Promise<FaqItem[]> => {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching all FAQ items:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
