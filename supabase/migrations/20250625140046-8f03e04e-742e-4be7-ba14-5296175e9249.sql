
-- Phase 1: Extend page_content table with missing SEO columns
ALTER TABLE public.page_content 
ADD COLUMN IF NOT EXISTS og_title TEXT,
ADD COLUMN IF NOT EXISTS og_description TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT,
ADD COLUMN IF NOT EXISTS twitter_title TEXT,
ADD COLUMN IF NOT EXISTS twitter_description TEXT,
ADD COLUMN IF NOT EXISTS twitter_image TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS robots_index BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS robots_follow BOOLEAN DEFAULT true;

-- Phase 2: Insert missing pages into page_content table
INSERT INTO public.page_content (page_path, title, meta_title, meta_description, is_published)
VALUES 
  ('/blog', 'Blog', 'Stell Media Blog - Digital Marketing Insights', 'Stay updated with the latest digital marketing trends, SEO tips, and industry insights from Stell Media experts.', true),
  ('/case-studies', 'Case Studies', 'Success Stories - Stell Media Case Studies', 'Discover how Stell Media has helped businesses achieve digital transformation through our comprehensive case studies.', true),
  ('/faq', 'FAQ', 'Frequently Asked Questions - Stell Media', 'Find answers to common questions about our digital marketing services, SEO strategies, and business solutions.', true),
  ('/careers', 'Careers', 'Join Our Team - Stell Media Careers', 'Explore exciting career opportunities at Stell Media and join our team of digital marketing professionals.', true)
ON CONFLICT (page_path) DO NOTHING;

-- Phase 3: Add default sections for pages that have none or very few
INSERT INTO public.page_sections (page_path, section_key, title, content, section_type, display_order, is_active)
VALUES 
  ('/contact', 'contact_hero', 'Get In Touch', 'Contact us for your digital marketing needs', 'hero', 1, true),
  ('/contact', 'contact_form', 'Contact Information', 'Reach out to us through our contact form or direct channels', 'text', 2, true),
  ('/blog', 'blog_hero', 'Our Blog', 'Stay updated with digital marketing insights and industry trends', 'hero', 1, true),
  ('/blog', 'blog_content', 'Latest Posts', 'Discover our latest articles on SEO, digital marketing, and business growth', 'text', 2, true),
  ('/case-studies', 'case_studies_hero', 'Success Stories', 'Real results from our digital marketing campaigns', 'hero', 1, true),
  ('/case-studies', 'case_studies_content', 'Our Portfolio', 'Explore detailed case studies showcasing our client success stories', 'text', 2, true),
  ('/faq', 'faq_hero', 'Frequently Asked Questions', 'Find answers to common questions about our services', 'hero', 1, true),
  ('/faq', 'faq_content', 'Questions & Answers', 'Common questions about our digital marketing services and processes', 'faq', 2, true),
  ('/careers', 'careers_hero', 'Join Our Team', 'Build your career in digital marketing with Stell Media', 'hero', 1, true),
  ('/careers', 'careers_content', 'Open Positions', 'Explore exciting opportunities to join our growing team', 'text', 2, true)
ON CONFLICT (page_path, section_key) DO NOTHING;

-- Phase 4: Update existing pages with proper SEO defaults where missing
UPDATE public.page_content 
SET 
  canonical_url = CASE 
    WHEN page_path = '/' THEN 'https://stellmedia.com'
    ELSE 'https://stellmedia.com' || page_path
  END,
  robots_index = true,
  robots_follow = true
WHERE canonical_url IS NULL;
