import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { CaseStudy } from "./useCaseStudies";

type CaseStudyInsert = {
  slug: string;
  title: string;
  description: string;
  category?: string | null;
  image?: string | null;
  client?: string | null;
  results?: Array<{ metric: string; label: string }>;
  challenge?: string | null;
  solution?: string | null;
  implementation?: string[];
  testimonial?: {
    quote?: string;
    author?: string;
    role?: string;
    company?: string;
  } | null;
  is_published?: boolean;
  display_order?: number;
};

type CaseStudyUpdate = Partial<CaseStudyInsert>;

export const useCaseStudiesMutations = () => {
  const queryClient = useQueryClient();

  const createCaseStudy = useMutation({
    mutationFn: async (data: CaseStudyInsert) => {
      const { data: result, error } = await supabase
        .from("case_studies")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["case-studies-all"] });
      toast.success("Case study created successfully");
    },
    onError: (error: Error) => {
      console.error("Error creating case study:", error);
      toast.error("Failed to create case study");
    },
  });

  const updateCaseStudy = useMutation({
    mutationFn: async ({ id, ...data }: CaseStudyUpdate & { id: string }) => {
      const { data: result, error } = await supabase
        .from("case_studies")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["case-studies-all"] });
      toast.success("Case study updated successfully");
    },
    onError: (error: Error) => {
      console.error("Error updating case study:", error);
      toast.error("Failed to update case study");
    },
  });

  const deleteCaseStudy = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("case_studies")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["case-studies-all"] });
      toast.success("Case study deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Error deleting case study:", error);
      toast.error("Failed to delete case study");
    },
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { data: result, error } = await supabase
        .from("case_studies")
        .update({ is_published })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["case-studies-all"] });
      toast.success(variables.is_published ? "Case study published" : "Case study unpublished");
    },
    onError: (error: Error) => {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update publish status");
    },
  });

  return {
    createCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    togglePublish,
  };
};
