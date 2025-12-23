import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string | null;
  image: string | null;
  client: string | null;
  results: Array<{ metric: string; label: string }>;
  challenge: string | null;
  solution: string | null;
  implementation: string[];
  testimonial: {
    quote?: string;
    author?: string;
    role?: string;
    company?: string;
  } | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useCaseStudies = () => {
  return useQuery({
    queryKey: ["case-studies"],
    queryFn: async (): Promise<CaseStudy[]> => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching case studies:", error);
        throw error;
      }

      return (data || []).map((study) => ({
        ...study,
        results: Array.isArray(study.results) ? study.results : [],
        implementation: Array.isArray(study.implementation) ? study.implementation : [],
        testimonial: study.testimonial && typeof study.testimonial === 'object' ? study.testimonial : null,
      })) as CaseStudy[];
    },
  });
};

export const useAllCaseStudies = () => {
  return useQuery({
    queryKey: ["case-studies-all"],
    queryFn: async (): Promise<CaseStudy[]> => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching all case studies:", error);
        throw error;
      }

      return (data || []).map((study) => ({
        ...study,
        results: Array.isArray(study.results) ? study.results : [],
        implementation: Array.isArray(study.implementation) ? study.implementation : [],
        testimonial: study.testimonial && typeof study.testimonial === 'object' ? study.testimonial : null,
      })) as CaseStudy[];
    },
  });
};
