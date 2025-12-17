-- Add h1_tag column to page_content table for page-wise H1 management
ALTER TABLE public.page_content ADD COLUMN IF NOT EXISTS h1_tag TEXT;

-- Set default H1 tags for existing pages
UPDATE public.page_content SET h1_tag = 'Digital Growth for Real Estate Developers and eCommerce Brands' WHERE page_path = '/' AND h1_tag IS NULL;
UPDATE public.page_content SET h1_tag = 'About Stell Media - Your Digital Growth Partner' WHERE page_path = '/about' AND h1_tag IS NULL;
UPDATE public.page_content SET h1_tag = 'Our Services - Digital Marketing Solutions' WHERE page_path = '/services' AND h1_tag IS NULL;
UPDATE public.page_content SET h1_tag = 'Contact Us - Get in Touch' WHERE page_path = '/contact' AND h1_tag IS NULL;
UPDATE public.page_content SET h1_tag = 'Blog - Digital Marketing Insights' WHERE page_path = '/blog' AND h1_tag IS NULL;
UPDATE public.page_content SET h1_tag = 'Case Studies - Success Stories' WHERE page_path = '/case-studies' AND h1_tag IS NULL;
UPDATE public.page_content SET h1_tag = 'FAQ - Frequently Asked Questions' WHERE page_path = '/faq' AND h1_tag IS NULL;
UPDATE public.page_content SET h1_tag = 'Careers - Join Our Team' WHERE page_path = '/careers' AND h1_tag IS NULL;