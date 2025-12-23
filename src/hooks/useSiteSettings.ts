import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: Json;
  category: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export const useSiteSettings = (category?: string) => {
  return useQuery({
    queryKey: ['site-settings', category],
    queryFn: async (): Promise<SiteSetting[]> => {
      let query = supabase
        .from('site_settings')
        .select('*')
        .eq('is_public', true);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching site settings:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSiteSetting = (key: string) => {
  return useQuery({
    queryKey: ['site-setting', key],
    queryFn: async (): Promise<SiteSetting | null> => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('setting_key', key)
        .eq('is_public', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        console.error('Error fetching site setting:', error);
        throw error;
      }

      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings', 'all'],
    queryFn: async (): Promise<SiteSetting[]> => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.error('Error fetching all site settings:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useUpdateSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<SiteSetting> }) => {
      const { data, error } = await supabase
        .from('site_settings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      queryClient.invalidateQueries({ queryKey: ['site-setting'] });
    },
  });
};
