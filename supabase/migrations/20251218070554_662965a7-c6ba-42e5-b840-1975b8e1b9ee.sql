-- Add missing RLS policies for admin tables

-- Enable RLS on tables that don't have policies
ALTER TABLE public.admin_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Security definer function to check admin status (already exists but ensure search_path is set)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  );
$$;

-- RLS Policies for admin_permissions
CREATE POLICY "Only admins can view permissions"
ON public.admin_permissions
FOR SELECT
USING (public.is_admin_user());

CREATE POLICY "Only admins can manage permissions"
ON public.admin_permissions
FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- RLS Policies for admin_roles
CREATE POLICY "Only admins can view roles"
ON public.admin_roles
FOR SELECT
USING (public.is_admin_user());

CREATE POLICY "Only admins can manage roles"
ON public.admin_roles
FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- RLS Policies for admin_sessions
CREATE POLICY "Users can view their own sessions"
ON public.admin_sessions
FOR SELECT
USING (
  admin_user_id IN (
    SELECT id FROM admin_users WHERE auth_user_id = auth.uid()
  )
);

CREATE POLICY "Users can manage their own sessions"
ON public.admin_sessions
FOR ALL
USING (
  admin_user_id IN (
    SELECT id FROM admin_users WHERE auth_user_id = auth.uid()
  )
)
WITH CHECK (
  admin_user_id IN (
    SELECT id FROM admin_users WHERE auth_user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage all sessions"
ON public.admin_sessions
FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Update handle_new_admin_user function with explicit search_path
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;

-- Update log_admin_activity function with explicit search_path
CREATE OR REPLACE FUNCTION public.log_admin_activity(p_action text, p_resource text, p_resource_id text DEFAULT NULL::text, p_details jsonb DEFAULT '{}'::jsonb)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;