import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export interface SitemapSettings {
  urls: SitemapUrl[];
  lastGenerated: string | null;
}

export interface RobotsTxtSettings {
  content: string;
}

export interface GlobalMetaSettings {
  defaultOgImage: string;
  siteName: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  googleSearchConsoleVerification?: string;
  bingWebmasterVerification?: string;
  facebookDomainVerification?: string;
}

// Fetch a specific SEO setting
export function useSEOSetting<T>(settingKey: string) {
  return useQuery({
    queryKey: ['seo-settings', settingKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('setting_value, updated_at')
        .eq('setting_key', settingKey)
        .single();
      
      if (error) {
        console.error(`Error fetching SEO setting ${settingKey}:`, error);
        return null;
      }
      
      return {
        value: data.setting_value as T,
        updatedAt: data.updated_at
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Fetch sitemap settings
export function useSitemapSettings() {
  return useSEOSetting<SitemapSettings>('sitemap_urls');
}

// Fetch robots.txt settings
export function useRobotsTxtSettings() {
  return useSEOSetting<RobotsTxtSettings>('robots_txt');
}

// Fetch global meta settings
export function useGlobalMetaSettings() {
  return useSEOSetting<GlobalMetaSettings>('global_meta');
}

// Save SEO setting mutation
export function useSaveSEOSetting() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ settingKey, settingValue }: { settingKey: string; settingValue: any }) => {
      const { data, error } = await supabase
        .from('seo_settings')
        .upsert({
          setting_key: settingKey,
          setting_value: settingValue,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['seo-settings', variables.settingKey] });
    }
  });
}

// Save sitemap settings
export function useSaveSitemapSettings() {
  const saveMutation = useSaveSEOSetting();
  
  return {
    ...saveMutation,
    mutate: (settings: SitemapSettings) => {
      saveMutation.mutate({ settingKey: 'sitemap_urls', settingValue: settings });
    },
    mutateAsync: (settings: SitemapSettings) => {
      return saveMutation.mutateAsync({ settingKey: 'sitemap_urls', settingValue: settings });
    }
  };
}

// Save robots.txt settings
export function useSaveRobotsTxtSettings() {
  const saveMutation = useSaveSEOSetting();
  
  return {
    ...saveMutation,
    mutate: (settings: RobotsTxtSettings) => {
      saveMutation.mutate({ settingKey: 'robots_txt', settingValue: settings });
    },
    mutateAsync: (settings: RobotsTxtSettings) => {
      return saveMutation.mutateAsync({ settingKey: 'robots_txt', settingValue: settings });
    }
  };
}

// Save global meta settings
export function useSaveGlobalMetaSettings() {
  const saveMutation = useSaveSEOSetting();
  
  return {
    ...saveMutation,
    mutate: (settings: GlobalMetaSettings) => {
      saveMutation.mutate({ settingKey: 'global_meta', settingValue: settings });
    },
    mutateAsync: (settings: GlobalMetaSettings) => {
      return saveMutation.mutateAsync({ settingKey: 'global_meta', settingValue: settings });
    }
  };
}
