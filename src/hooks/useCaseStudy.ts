import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CaseStudy } from "./useCaseStudies";

export const useCaseStudy = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["case-study", slug],
    queryFn: async (): Promise<CaseStudy | null> => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows returned
          return null;
        }
        console.error("Error fetching case study:", error);
        throw error;
      }

      if (!data) return null;

      return {
        ...data,
        results: Array.isArray(data.results) ? data.results : [],
        implementation: Array.isArray(data.implementation) ? data.implementation : [],
        testimonial: data.testimonial && typeof data.testimonial === 'object' ? data.testimonial : null,
      } as CaseStudy;
    },
    enabled: !!slug,
  });
};
