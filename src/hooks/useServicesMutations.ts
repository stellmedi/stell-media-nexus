import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ServiceInput {
  title: string;
  slug: string;
  description: string;
  icon_name?: string;
  link?: string;
  gradient_from?: string;
  gradient_to?: string;
  border_color?: string;
  display_order?: number;
  is_active?: boolean;
}

export const useServicesMutations = () => {
  const queryClient = useQueryClient();

  const createService = useMutation({
    mutationFn: async (input: ServiceInput) => {
      const { data, error } = await supabase
        .from('services')
        .insert([{
          ...input,
          is_active: input.is_active !== false,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create service: ${error.message}`);
    },
  });

  const updateService = useMutation({
    mutationFn: async ({ id, ...input }: ServiceInput & { id: string }) => {
      const { data, error } = await supabase
        .from('services')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update service: ${error.message}`);
    },
  });

  const deleteService = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete service: ${error.message}`);
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { data, error } = await supabase
        .from('services')
        .update({ is_active })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success(data.is_active ? 'Service activated' : 'Service deactivated');
    },
    onError: (error) => {
      toast.error(`Failed to update service status: ${error.message}`);
    },
  });

  const reorderServices = useMutation({
    mutationFn: async (services: { id: string; display_order: number }[]) => {
      const updates = services.map(service => 
        supabase
          .from('services')
          .update({ display_order: service.display_order })
          .eq('id', service.id)
      );

      const results = await Promise.all(updates);
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error('Failed to reorder some services');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Services reordered');
    },
    onError: (error) => {
      toast.error(`Failed to reorder services: ${error.message}`);
    },
  });

  return {
    createService,
    updateService,
    deleteService,
    toggleActive,
    reorderServices,
  };
};
