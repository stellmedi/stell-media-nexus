
import { supabase } from "@/integrations/supabase/client";

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export interface ConsultationSubmission {
  name: string;
  email: string;
  company: string;
  message: string;
}

export const saveContactSubmission = async (data: ContactSubmission) => {
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([data])
    .select();
    
  if (error) {
    console.error('Error saving contact submission:', error);
    throw error;
  }
  
  return result[0];
};

export const saveConsultationSubmission = async (data: ConsultationSubmission) => {
  const { data: result, error } = await supabase
    .from('consultation_submissions')
    .insert([data])
    .select();
    
  if (error) {
    console.error('Error saving consultation submission:', error);
    throw error;
  }
  
  return result[0];
};

export const getContactSubmissions = async () => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  }
  
  return data;
};

export const getConsultationSubmissions = async () => {
  const { data, error } = await supabase
    .from('consultation_submissions')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching consultation submissions:', error);
    throw error;
  }
  
  return data;
};
