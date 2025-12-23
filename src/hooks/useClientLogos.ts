import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  alt_text: string | null;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useClientLogos = () => {
  return useQuery({
    queryKey: ['client-logos'],
    queryFn: async (): Promise<ClientLogo[]> => {
      const { data, error } = await supabase
        .from('client_logos')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching client logos:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllClientLogos = () => {
  return useQuery({
    queryKey: ['client-logos', 'all'],
    queryFn: async (): Promise<ClientLogo[]> => {
      const { data, error } = await supabase
        .from('client_logos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching all client logos:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
