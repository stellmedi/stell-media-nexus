-- Create cms-assets storage bucket for image uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cms-assets', 
  'cms-assets', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to cms-assets bucket
CREATE POLICY "Public can view cms assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'cms-assets');

-- Allow admins to upload to cms-assets bucket
CREATE POLICY "Admins can upload cms assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'cms-assets' 
  AND EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role IN ('admin', 'editor') 
    AND is_active = true
  )
);

-- Allow admins to update cms assets
CREATE POLICY "Admins can update cms assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'cms-assets' 
  AND EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role IN ('admin', 'editor') 
    AND is_active = true
  )
);

-- Allow admins to delete cms assets
CREATE POLICY "Admins can delete cms assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'cms-assets' 
  AND EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role IN ('admin', 'editor') 
    AND is_active = true
  )
);