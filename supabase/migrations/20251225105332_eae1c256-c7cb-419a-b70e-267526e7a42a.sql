-- Create helper function that checks for admin OR editor role
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role IN ('admin', 'editor')
    AND is_active = true
  );
$$;

-- Update blog_posts RLS policy
DROP POLICY IF EXISTS "Admins can manage posts" ON blog_posts;
CREATE POLICY "Admins and editors can manage posts" ON blog_posts
FOR ALL USING (is_admin_or_editor());

-- Update case_studies RLS policy
DROP POLICY IF EXISTS "Admins can manage case studies" ON case_studies;
CREATE POLICY "Admins and editors can manage case studies" ON case_studies
FOR ALL USING (is_admin_or_editor());

-- Update services RLS policy
DROP POLICY IF EXISTS "Admins can manage services" ON services;
CREATE POLICY "Admins and editors can manage services" ON services
FOR ALL USING (is_admin_or_editor());

-- Update faq_items RLS policy
DROP POLICY IF EXISTS "Admins can manage FAQs" ON faq_items;
CREATE POLICY "Admins and editors can manage FAQs" ON faq_items
FOR ALL USING (is_admin_or_editor());

-- Update testimonials RLS policy
DROP POLICY IF EXISTS "Admins can manage testimonials" ON testimonials;
CREATE POLICY "Admins and editors can manage testimonials" ON testimonials
FOR ALL USING (is_admin_or_editor());

-- Update client_logos RLS policy
DROP POLICY IF EXISTS "Admins can manage client logos" ON client_logos;
CREATE POLICY "Admins and editors can manage client logos" ON client_logos
FOR ALL USING (is_admin_or_editor());