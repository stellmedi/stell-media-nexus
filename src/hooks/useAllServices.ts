import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon_name: string | null;
  link: string | null;
  gradient_from: string | null;
  gradient_to: string | null;
  border_color: string | null;
  display_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
}

// Hook for admin panel - fetches ALL services (active and inactive)
export const useAllServices = () => {
  return useQuery({
    queryKey: ['services', 'all'],
    queryFn: async (): Promise<Service[]> => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
