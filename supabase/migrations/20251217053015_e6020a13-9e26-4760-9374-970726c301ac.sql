-- Fix robots.txt typo: serve-sitemapNowchanged -> serve-sitemap
UPDATE seo_settings 
SET setting_value = jsonb_build_object(
  'content', 'User-agent: *
Allow: /

Sitemap: https://eorcqkxfqhgzmbobigcc.supabase.co/functions/v1/serve-sitemap

Disallow: /admin/
Disallow: /private/'
),
updated_at = now()
WHERE setting_key = 'robots_txt';