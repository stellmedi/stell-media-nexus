import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Search, 
  Target, 
  ShoppingCart, 
  Building2, 
  TrendingUp, 
  BarChart3,
  type LucideIcon 
} from 'lucide-react';

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon_name: string | null;
  link: string | null;
  gradient_from: string | null;
  gradient_to: string | null;
  border_color: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ServiceWithIcon extends ServiceData {
  icon: LucideIcon;
  gradient: string;
  borderColor: string;
}

const iconMap: Record<string, LucideIcon> = {
  Search,
  Target,
  ShoppingCart,
  Building2,
  TrendingUp,
  BarChart3,
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<ServiceWithIcon[]> => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }

      return (data || []).map(service => ({
        ...service,
        icon: iconMap[service.icon_name || 'Search'] || Search,
        gradient: `from-${service.gradient_from || 'blue-500'} to-${service.gradient_to || 'blue-600'}`,
        borderColor: service.border_color || 'border-blue-200 hover:border-blue-400',
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
