import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface FaqItemInput {
  question: string;
  answer: string;
  page_path?: string;
  display_order?: number;
  is_active?: boolean;
}

export const useFaqMutations = () => {
  const queryClient = useQueryClient();

  const createFaq = useMutation({
    mutationFn: async (input: FaqItemInput) => {
      const { data, error } = await supabase
        .from('faq_items')
        .insert([{
          question: input.question,
          answer: input.answer,
          page_path: input.page_path || '/',
          display_order: input.display_order || 0,
          is_active: input.is_active !== false,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      toast.success('FAQ item created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create FAQ: ${error.message}`);
    },
  });

  const updateFaq = useMutation({
    mutationFn: async ({ id, ...input }: FaqItemInput & { id: string }) => {
      const { data, error } = await supabase
        .from('faq_items')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      toast.success('FAQ item updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update FAQ: ${error.message}`);
    },
  });

  const deleteFaq = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('faq_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      toast.success('FAQ item deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete FAQ: ${error.message}`);
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { data, error } = await supabase
        .from('faq_items')
        .update({ is_active })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      toast.success(data.is_active ? 'FAQ item activated' : 'FAQ item deactivated');
    },
    onError: (error) => {
      toast.error(`Failed to update FAQ status: ${error.message}`);
    },
  });

  const reorderFaqs = useMutation({
    mutationFn: async (faqs: { id: string; display_order: number }[]) => {
      const updates = faqs.map(faq => 
        supabase
          .from('faq_items')
          .update({ display_order: faq.display_order })
          .eq('id', faq.id)
      );

      const results = await Promise.all(updates);
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error('Failed to reorder some FAQ items');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      toast.success('FAQ items reordered');
    },
    onError: (error) => {
      toast.error(`Failed to reorder FAQs: ${error.message}`);
    },
  });

  return {
    createFaq,
    updateFaq,
    deleteFaq,
    toggleActive,
    reorderFaqs,
  };
};
