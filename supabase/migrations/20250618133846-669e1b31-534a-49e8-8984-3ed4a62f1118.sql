
-- Update the user role from 'viewer' to 'admin' for info@stellmedia.com
UPDATE admin_users 
SET role = 'admin' 
WHERE email = 'info@stellmedia.com';

-- Drop the problematic RLS policies that are causing infinite recursion
DROP POLICY IF EXISTS "Admin users can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admin users can manage admin users" ON admin_users;

-- Create a security definer function to check admin role without recursion
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  );
$$;

-- Create non-recursive RLS policies using the security definer function
CREATE POLICY "Users can view their own admin profile" 
  ON admin_users 
  FOR SELECT 
  USING (auth_user_id = auth.uid());

CREATE POLICY "Admin users can view all profiles" 
  ON admin_users 
  FOR SELECT 
  USING (public.is_admin_user());

CREATE POLICY "Admin users can manage all profiles" 
  ON admin_users 
  FOR ALL 
  USING (public.is_admin_user());

-- Verify the changes
SELECT id, name, email, role, is_active, auth_user_id 
FROM admin_users 
WHERE email = 'info@stellmedia.com';
