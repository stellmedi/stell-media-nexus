
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
