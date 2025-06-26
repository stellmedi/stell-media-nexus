
-- Add RLS policy for page_content table to allow public SELECT access to published content
CREATE POLICY "Public can view published content" ON public.page_content
FOR SELECT USING (is_published = true);

-- Add RLS policy for page_sections table to allow public SELECT access to active sections
CREATE POLICY "Public can view active sections" ON public.page_sections
FOR SELECT USING (is_active = true);
