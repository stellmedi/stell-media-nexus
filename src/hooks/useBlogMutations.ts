import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author?: string;
  category?: string;
  image_url?: string;
  is_published?: boolean;
  published_at?: string;
}

export const useBlogMutations = () => {
  const queryClient = useQueryClient();

  const createBlogPost = useMutation({
    mutationFn: async (input: BlogPostInput) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          ...input,
          published_at: input.is_published ? new Date().toISOString() : null,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create blog post: ${error.message}`);
    },
  });

  const updateBlogPost = useMutation({
    mutationFn: async ({ id, ...input }: BlogPostInput & { id: string }) => {
      const updateData: any = { ...input, updated_at: new Date().toISOString() };
      
      // Set published_at when publishing for the first time
      if (input.is_published && !input.published_at) {
        updateData.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update blog post: ${error.message}`);
    },
  });

  const deleteBlogPost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete blog post: ${error.message}`);
    },
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const updateData: any = { 
        is_published,
        updated_at: new Date().toISOString(),
      };
      
      if (is_published) {
        updateData.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success(data.is_published ? 'Blog post published' : 'Blog post unpublished');
    },
    onError: (error) => {
      toast.error(`Failed to update publish status: ${error.message}`);
    },
  });

  return {
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    togglePublish,
  };
};
