
-- Create page_content table to store main page metadata
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES admin_users(id)
);

-- Create page_sections table to store individual content sections
CREATE TABLE public.page_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section_type TEXT NOT NULL CHECK (section_type IN ('hero', 'text', 'list', 'features', 'testimonials', 'faq', 'services')),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_path, section_key)
);

-- Create content_versions table for version control
CREATE TABLE public.content_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  content_data JSONB NOT NULL,
  version_number INTEGER NOT NULL,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  change_description TEXT
);

-- Add Row Level Security
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage page content" ON public.page_content
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role IN ('admin', 'editor') 
    AND is_active = true
  )
);

CREATE POLICY "Admins can manage page sections" ON public.page_sections
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role IN ('admin', 'editor') 
    AND is_active = true
  )
);

CREATE POLICY "Admins can view content versions" ON public.content_versions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND role IN ('admin', 'editor') 
    AND is_active = true
  )
);

-- Insert default content for existing pages
INSERT INTO public.page_content (page_path, title, meta_title, meta_description) VALUES
('/','Home Page','Stell Media - Digital Marketing & SEO Services','Transform your digital presence with Stell Media''s expert SEO, SEM, and conversion optimization services.'),
('/about','About Page','About Stell Media - Your Digital Marketing Partner','Learn about Stell Media''s mission, values, and experienced team of digital marketing professionals.'),
('/services','Services Page','Our Digital Marketing Services | Stell Media','Discover comprehensive digital marketing services including SEO, SEM, and conversion optimization.'),
('/contact','Contact Page','Contact Stell Media - Get Your Free Consultation','Get in touch with Stell Media for expert digital marketing consultation and services.');

-- Insert default sections for home page
INSERT INTO public.page_sections (page_path, section_key, title, content, section_type, display_order) VALUES
('/','hero','Hero Section','Transform Your Business with AI-Powered Digital Solutions','hero',1),
('/','services','Services Section','Comprehensive digital marketing services designed to grow your business','services',2),
('/','testimonials','Testimonials Section','What our clients say about working with Stell Media','testimonials',3),
('/','cta','Call to Action','Ready to transform your digital presence? Let''s talk.','text',4);

-- Insert default sections for about page
INSERT INTO public.page_sections (page_path, section_key, title, content, section_type, display_order) VALUES
('/about','hero','About Hero','About Stell Media - Your Digital Marketing Partner','hero',1),
('/about','story','Our Story','We are a leading digital marketing agency specializing in AI-powered solutions','text',2),
('/about','mission','Mission & Vision','Empowering businesses to thrive in the digital landscape','text',3);

-- Insert default sections for services page
INSERT INTO public.page_sections (page_path, section_key, title, content, section_type, display_order) VALUES
('/services','hero','Services Hero','Professional Digital Marketing Services','hero',1),
('/services','services-list','Our Services','SEO Optimization, SEM Campaigns, Conversion Rate Optimization, Data Analytics','services',2),
('/services','features','Why Choose Us','Expert team, proven results, data-driven approach','features',3);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE page_content;
ALTER PUBLICATION supabase_realtime ADD TABLE page_sections;
