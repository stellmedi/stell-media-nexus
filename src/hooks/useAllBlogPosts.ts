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
  is_published: boolean | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Hook for admin panel - fetches ALL posts (published and drafts)
export const useAllBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts', 'all'],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      return data || [];
    },
    staleTime: 1 * 60 * 1000, // 1 minute for admin
    gcTime: 5 * 60 * 1000,
  });
};
