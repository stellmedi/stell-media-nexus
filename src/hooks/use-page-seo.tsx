import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Zod schema for SEO data validation
export const seoDataSchema = z.object({
  metaTitle: z.string().max(60, "Title should be under 60 characters for optimal SEO").optional().nullable(),
  metaDescription: z.string().max(160, "Description should be under 160 characters for optimal SEO").optional().nullable(),
  keywords: z.string().max(500, "Keywords should be under 500 characters").optional().nullable(),
  h1Tag: z.string().max(100, "H1 should be under 100 characters").optional().nullable(),
  canonicalUrl: z.string().url("Invalid canonical URL").optional().nullable().or(z.literal('')),
  ogTitle: z.string().max(60, "OG title should be under 60 characters").optional().nullable(),
  ogDescription: z.string().max(160, "OG description should be under 160 characters").optional().nullable(),
  ogImage: z.string().optional().nullable(),
  twitterTitle: z.string().max(60, "Twitter title should be under 60 characters").optional().nullable(),
  twitterDescription: z.string().max(160, "Twitter description should be under 160 characters").optional().nullable(),
  twitterImage: z.string().optional().nullable(),
  robotsIndex: z.boolean().optional().nullable(),
  robotsFollow: z.boolean().optional().nullable(),
  schemaType: z.string().optional().nullable(),
  schemaData: z.string().optional().nullable(),
});

export type SEOData = z.infer<typeof seoDataSchema>;

interface PageSEOResult {
  seoData: SEOData | null;
  isLoading: boolean;
  error: Error | null;
}

// Fetch function for SEO data - fetches ALL 13 fields
async function fetchPageSEO(pagePath: string): Promise<SEOData | null> {
  const { data, error } = await supabase
    .from('page_content')
    .select(`
      meta_title,
      meta_description,
      keywords,
      h1_tag,
      canonical_url,
      og_title,
      og_description,
      og_image,
      twitter_title,
      twitter_description,
      twitter_image,
      robots_index,
      robots_follow
    `)
    .eq('page_path', pagePath)
    .maybeSingle();

  if (error) {
    console.error('Error fetching page SEO:', error);
    throw error;
  }

  if (!data) {
    return null;
  }

  // Map database fields to SEO data structure
  return {
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    keywords: data.keywords,
    h1Tag: data.h1_tag,
    canonicalUrl: data.canonical_url || `https://stellmedia.com${pagePath === '/' ? '' : pagePath}`,
    ogTitle: data.og_title || data.meta_title,
    ogDescription: data.og_description || data.meta_description,
    ogImage: data.og_image,
    twitterTitle: data.twitter_title || data.meta_title,
    twitterDescription: data.twitter_description || data.meta_description,
    twitterImage: data.twitter_image,
    robotsIndex: data.robots_index ?? true,
    robotsFollow: data.robots_follow ?? true,
    schemaType: 'WebPage',
    schemaData: null,
  };
}

// TanStack Query hook for fetching SEO data with caching
export function usePageSEO(pagePath: string): PageSEOResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ['page-seo', pagePath],
    queryFn: () => fetchPageSEO(pagePath),
    staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    seoData: data ?? null,
    isLoading,
    error: error as Error | null,
  };
}

// Save SEO data with validation
interface SaveSEOResult {
  success: boolean;
  error?: string;
  validationErrors?: z.ZodError;
}

async function savePageSEO(pagePath: string, seoData: Partial<SEOData>): Promise<SaveSEOResult> {
  // Validate input data
  const validationResult = seoDataSchema.partial().safeParse(seoData);
  
  if (!validationResult.success) {
    return {
      success: false,
      error: 'Validation failed',
      validationErrors: validationResult.error,
    };
  }

  const validatedData = validationResult.data;

  try {
    const { error } = await supabase
      .from('page_content')
      .upsert({
        page_path: pagePath,
        meta_title: validatedData.metaTitle,
        meta_description: validatedData.metaDescription,
        keywords: validatedData.keywords,
        h1_tag: validatedData.h1Tag,
        canonical_url: validatedData.canonicalUrl,
        og_title: validatedData.ogTitle,
        og_description: validatedData.ogDescription,
        og_image: validatedData.ogImage,
        twitter_title: validatedData.twitterTitle,
        twitter_description: validatedData.twitterDescription,
        twitter_image: validatedData.twitterImage,
        robots_index: validatedData.robotsIndex,
        robots_follow: validatedData.robotsFollow,
        title: validatedData.metaTitle || 'Untitled Page',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'page_path',
      });

    if (error) {
      console.error('Error saving SEO data:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

// Mutation hook for saving SEO data
export function useSavePageSEO() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pagePath, seoData }: { pagePath: string; seoData: Partial<SEOData> }) =>
      savePageSEO(pagePath, seoData),
    onSuccess: (_, variables) => {
      // Invalidate the cache for this page's SEO data
      queryClient.invalidateQueries({ queryKey: ['page-seo', variables.pagePath] });
    },
  });
}

// Get all SEO data from database (for admin purposes)
export async function getAllPageSEO(): Promise<Record<string, SEOData>> {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select(`
        page_path,
        meta_title,
        meta_description,
        keywords,
        h1_tag,
        canonical_url,
        og_title,
        og_description,
        og_image,
        twitter_title,
        twitter_description,
        twitter_image,
        robots_index,
        robots_follow
      `);

    if (error) {
      console.error('Error loading all SEO data:', error);
      return {};
    }

    const seoData: Record<string, SEOData> = {};
    data?.forEach(page => {
      seoData[page.page_path] = {
        metaTitle: page.meta_title,
        metaDescription: page.meta_description,
        keywords: page.keywords,
        h1Tag: page.h1_tag,
        canonicalUrl: page.canonical_url || `https://stellmedia.com${page.page_path === '/' ? '' : page.page_path}`,
        ogTitle: page.og_title || page.meta_title,
        ogDescription: page.og_description || page.meta_description,
        ogImage: page.og_image,
        twitterTitle: page.twitter_title || page.meta_title,
        twitterDescription: page.twitter_description || page.meta_description,
        twitterImage: page.twitter_image,
        robotsIndex: page.robots_index ?? true,
        robotsFollow: page.robots_follow ?? true,
        schemaType: 'WebPage',
        schemaData: null,
      };
    });

    return seoData;
  } catch (error) {
    console.error('Error loading all SEO data:', error);
    return {};
  }
}

// Delete SEO data (reset to null)
export async function deleteSEOData(pagePath: string): Promise<SaveSEOResult> {
  try {
    const { error } = await supabase
      .from('page_content')
      .update({
        meta_title: null,
        meta_description: null,
        keywords: null,
        h1_tag: null,
        canonical_url: null,
        og_title: null,
        og_description: null,
        og_image: null,
        twitter_title: null,
        twitter_description: null,
        twitter_image: null,
      })
      .eq('page_path', pagePath);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}
