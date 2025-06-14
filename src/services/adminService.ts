
import { supabase } from "@/integrations/supabase/client";

export interface AdminUser {
  id: string;
  auth_user_id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminActivityLog {
  id: string;
  admin_user_id?: string;
  action: string;
  resource: string;
  resource_id?: string;
  details: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  admin_users?: {
    name: string;
    email: string;
  };
}

export interface AdminSetting {
  id: string;
  category: string;
  key: string;
  value: any;
  description?: string;
  is_public: boolean;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

// Admin Users Management
export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin users:', error);
    throw error;
  }

  // Type cast and ensure role is properly typed
  return (data || []).map(user => ({
    ...user,
    auth_user_id: user.auth_user_id || '',
    role: user.role as "admin" | "editor" | "viewer",
    last_login: user.last_login || undefined
  }));
};

export const updateAdminUser = async (id: string, updates: Partial<AdminUser>): Promise<AdminUser> => {
  const { data, error } = await supabase
    .from('admin_users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating admin user:', error);
    throw error;
  }

  // Type cast the returned data
  return {
    ...data,
    auth_user_id: data.auth_user_id || '',
    role: data.role as "admin" | "editor" | "viewer",
    last_login: data.last_login || undefined
  };
};

export const deleteAdminUser = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('admin_users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting admin user:', error);
    throw error;
  }
};

// Activity Logs
export const getActivityLogs = async (limit: number = 50): Promise<AdminActivityLog[]> => {
  const { data, error } = await supabase
    .from('admin_activity_logs')
    .select(`
      *,
      admin_users (
        name,
        email
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching activity logs:', error);
    throw error;
  }

  // Type cast and handle the ip_address type
  return (data || []).map(log => ({
    ...log,
    admin_user_id: log.admin_user_id || undefined,
    resource_id: log.resource_id || undefined,
    ip_address: log.ip_address ? String(log.ip_address) : undefined,
    user_agent: log.user_agent || undefined,
    admin_users: log.admin_users || undefined
  }));
};

// Admin Settings
export const getAdminSettings = async (): Promise<AdminSetting[]> => {
  const { data, error } = await supabase
    .from('admin_settings')
    .select('*')
    .order('category', { ascending: true });

  if (error) {
    console.error('Error fetching admin settings:', error);
    throw error;
  }

  return (data || []).map(setting => ({
    ...setting,
    description: setting.description || undefined,
    updated_by: setting.updated_by || undefined
  }));
};

export const updateAdminSetting = async (
  category: string, 
  key: string, 
  value: any, 
  description?: string
): Promise<AdminSetting> => {
  const { data, error } = await supabase
    .from('admin_settings')
    .upsert({
      category,
      key,
      value,
      description,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('Error updating admin setting:', error);
    throw error;
  }

  return {
    ...data,
    description: data.description || undefined,
    updated_by: data.updated_by || undefined
  };
};

// Form Submissions (Enhanced)
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

// Real-time subscriptions
export const subscribeToAdminChanges = (
  table: string,
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel(`admin_${table}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table
      },
      callback
    )
    .subscribe();

  return channel;
};
