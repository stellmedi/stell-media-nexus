import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface UseBlogPostsOptions {
  category?: string;
  limit?: number;
}

export const useBlogPosts = (options: UseBlogPostsOptions = {}) => {
  const { category, limit } = options;

  return useQuery({
    queryKey: ['blog-posts', category, limit],
    queryFn: async (): Promise<BlogPost[]> => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async (): Promise<BlogPost | null> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching blog post:', error);
        throw error;
      }

      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!slug,
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('is_published', true)
        .not('category', 'is', null);

      if (error) {
        console.error('Error fetching blog categories:', error);
        throw error;
      }

      const categories = [...new Set(data?.map(p => p.category).filter(Boolean) as string[])];
      return ['All', ...categories];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
