import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  image_url: string | null;
  rating: number | null;
  display_order: number;
  is_active: boolean;
  page_path: string;
  created_at: string;
  updated_at: string;
}

export const useTestimonials = (pagePath?: string) => {
  return useQuery({
    queryKey: ['testimonials', pagePath],
    queryFn: async (): Promise<Testimonial[]> => {
      let query = supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (pagePath) {
        query = query.eq('page_path', pagePath);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials', 'all'],
    queryFn: async (): Promise<Testimonial[]> => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching all testimonials:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
