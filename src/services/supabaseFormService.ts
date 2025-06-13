
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

// Temporarily using any to bypass TypeScript issues until types are synced
export const saveContactSubmission = async (data: ContactSubmission) => {
  try {
    console.log('Attempting to save contact submission:', data);
    const { data: result, error } = await (supabase as any)
      .from('contact_submissions')
      .insert([data])
      .select();
      
    if (error) {
      console.error('Error saving contact submission:', error);
      throw error;
    }
    
    console.log('Contact submission saved successfully:', result);
    return result[0];
  } catch (error) {
    console.error('Failed to save contact submission:', error);
    throw error;
  }
};

export const saveConsultationSubmission = async (data: ConsultationSubmission) => {
  try {
    console.log('Attempting to save consultation submission:', data);
    const { data: result, error } = await (supabase as any)
      .from('consultation_submissions')
      .insert([data])
      .select();
      
    if (error) {
      console.error('Error saving consultation submission:', error);
      throw error;
    }
    
    console.log('Consultation submission saved successfully:', result);
    return result[0];
  } catch (error) {
    console.error('Failed to save consultation submission:', error);
    throw error;
  }
};

export const getContactSubmissions = async () => {
  try {
    console.log('Fetching contact submissions...');
    const { data, error } = await (supabase as any)
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching contact submissions:', error);
      throw error;
    }
    
    console.log('Contact submissions fetched:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch contact submissions:', error);
    throw error;
  }
};

export const getConsultationSubmissions = async () => {
  try {
    console.log('Fetching consultation submissions...');
    const { data, error } = await (supabase as any)
      .from('consultation_submissions')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching consultation submissions:', error);
      throw error;
    }
    
    console.log('Consultation submissions fetched:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch consultation submissions:', error);
    throw error;
  }
};
