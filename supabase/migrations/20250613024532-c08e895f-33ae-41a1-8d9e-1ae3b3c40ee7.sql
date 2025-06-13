
-- Phase 1: Admin Users & Authentication Tables
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES public.admin_users(id) ON DELETE CASCADE NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Phase 2: Admin Roles & Permissions
CREATE TABLE public.admin_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.admin_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(resource, action)
);

-- Phase 3: Admin Activity & Audit Logs
CREATE TABLE public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Phase 5: Admin Configuration Settings
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  updated_by UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(category, key)
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users (only admins can manage users)
CREATE POLICY "Admin users can view all admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.auth_user_id = auth.uid() AND au.role = 'admin' AND au.is_active = true
    )
  );

CREATE POLICY "Admin users can manage admin users" 
  ON public.admin_users 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.auth_user_id = auth.uid() AND au.role = 'admin' AND au.is_active = true
    )
  );

-- RLS Policies for admin_activity_logs (read-only for admins/editors)
CREATE POLICY "Admins and editors can view activity logs" 
  ON public.admin_activity_logs 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.auth_user_id = auth.uid() 
      AND au.role IN ('admin', 'editor') 
      AND au.is_active = true
    )
  );

CREATE POLICY "System can insert activity logs" 
  ON public.admin_activity_logs 
  FOR INSERT 
  WITH CHECK (true);

-- RLS Policies for admin_settings
CREATE POLICY "Admins can manage all settings" 
  ON public.admin_settings 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.auth_user_id = auth.uid() AND au.role = 'admin' AND au.is_active = true
    )
  );

CREATE POLICY "Editors can view public settings" 
  ON public.admin_settings 
  FOR SELECT 
  USING (
    is_public = true OR
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.auth_user_id = auth.uid() 
      AND au.role IN ('admin', 'editor') 
      AND au.is_active = true
    )
  );

-- Insert default admin roles
INSERT INTO public.admin_roles (name, description, permissions) VALUES
('admin', 'Full system access', '{"all": true}'),
('editor', 'Content management access', '{"content": ["read", "write"], "users": ["read"], "settings": ["read"]}'),
('viewer', 'Read-only access', '{"content": ["read"], "users": ["read"], "settings": ["read"]}');

-- Insert default permissions
INSERT INTO public.admin_permissions (resource, action, description) VALUES
('users', 'read', 'View user information'),
('users', 'write', 'Create and edit users'),
('users', 'delete', 'Delete users'),
('content', 'read', 'View content'),
('content', 'write', 'Create and edit content'),
('content', 'delete', 'Delete content'),
('settings', 'read', 'View settings'),
('settings', 'write', 'Modify settings'),
('analytics', 'read', 'View analytics');

-- Insert default admin settings
INSERT INTO public.admin_settings (category, key, value, description, is_public) VALUES
('site', 'name', '"Stell Media"', 'Website name', true),
('site', 'description', '"Digital Marketing and AI Solutions"', 'Website description', true),
('email', 'from_address', '"admin@stellmedia.com"', 'Default from email address', false),
('analytics', 'google_analytics_id', '""', 'Google Analytics tracking ID', false);

-- Enable real-time updates
ALTER TABLE public.admin_users REPLICA IDENTITY FULL;
ALTER TABLE public.admin_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.admin_activity_logs REPLICA IDENTITY FULL;
ALTER TABLE public.admin_settings REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_activity_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_settings;

-- Function to automatically create admin_user profile when auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only create admin_user if email ends with @stellmedia.com or is the default admin
  IF NEW.email LIKE '%@stellmedia.com' OR NEW.email = 'admin@stellmedia.com' THEN
    INSERT INTO public.admin_users (auth_user_id, name, email, role)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1)),
      NEW.email,
      CASE 
        WHEN NEW.email = 'admin@stellmedia.com' THEN 'admin'
        ELSE 'viewer'
      END
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to create admin_user profile automatically
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- Function to log admin activities
CREATE OR REPLACE FUNCTION public.log_admin_activity(
  p_action TEXT,
  p_resource TEXT,
  p_resource_id TEXT DEFAULT NULL,
  p_details JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  admin_user_id UUID;
  log_id UUID;
BEGIN
  -- Get admin user ID from auth.uid()
  SELECT id INTO admin_user_id 
  FROM public.admin_users 
  WHERE auth_user_id = auth.uid();
  
  -- Insert activity log
  INSERT INTO public.admin_activity_logs (
    admin_user_id, action, resource, resource_id, details
  ) VALUES (
    admin_user_id, p_action, p_resource, p_resource_id, p_details
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;
