
import { supabase } from "@/integrations/supabase/client";

export const getContactSubmissions = async () => {
  console.log('Fetching contact submissions...');
  
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  }

  console.log('Contact submissions fetched:', data);
  return data;
};

export const saveContactSubmission = async (submission: {
  name: string;
  email: string;
  message: string;
}) => {
  console.log('Saving contact submission:', submission);
  
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([submission])
    .select()
    .single();

  if (error) {
    console.error('Error saving contact submission:', error);
    throw error;
  }

  console.log('Contact submission saved:', data);
  return data;
};

export const getConsultationSubmissions = async () => {
  console.log('Fetching consultation submissions...');
  
  const { data, error } = await supabase
    .from('consultation_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching consultation submissions:', error);
    throw error;
  }

  console.log('Consultation submissions fetched:', data);
  return data;
};

export const saveConsultationSubmission = async (submission: {
  name: string;
  email: string;
  company: string;
  message: string;
}) => {
  console.log('Saving consultation submission:', submission);
  
  const { data, error } = await supabase
    .from('consultation_submissions')
    .insert([submission])
    .select()
    .single();

  if (error) {
    console.error('Error saving consultation submission:', error);
    throw error;
  }

  console.log('Consultation submission saved:', data);
  return data;
};

export const getAdminUsers = async () => {
  console.log('Fetching admin users...');
  
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin users:', error);
    throw error;
  }

  console.log('Admin users fetched:', data);
  return data;
};
