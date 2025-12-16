-- Create seo_settings table for storing SEO configuration
CREATE TABLE public.seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

-- Public can read public settings (for frontend caching)
CREATE POLICY "Public can read public seo settings" ON public.seo_settings
  FOR SELECT USING (is_public = true);

-- Admins can manage all settings
CREATE POLICY "Admins can manage seo settings" ON public.seo_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE auth_user_id = auth.uid() 
      AND role IN ('admin', 'editor') 
      AND is_active = true
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_seo_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_seo_settings_updated_at
  BEFORE UPDATE ON public.seo_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_seo_settings_updated_at();

-- Insert default settings
INSERT INTO public.seo_settings (setting_key, setting_value, is_public) VALUES
  ('robots_txt', '{"content": "User-agent: *\nAllow: /\n\nSitemap: https://eorcqkxfqhgzmbobigcc.supabase.co/functions/v1/serve-sitemap\n\nDisallow: /admin/\nDisallow: /private/"}', false),
  ('sitemap_urls', '{"urls": [], "lastGenerated": null}', true),
  ('global_meta', '{"defaultOgImage": "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png", "siteName": "Stell Media"}', true)
ON CONFLICT (setting_key) DO NOTHING;