import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
  'Cache-Control': 'public, max-age=3600, s-maxage=3600',
};

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

// Default pages if no sitemap data in database
const defaultPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/seo', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/product-discovery', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/data-enrichment', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/sem', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/conversion-optimization', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/careers', priority: '0.6', changefreq: 'monthly' },
  { path: '/case-studies', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/real-estate', priority: '0.9', changefreq: 'weekly' },
  { path: '/e-commerce', priority: '0.9', changefreq: 'weekly' },
];

const BASE_URL = 'https://stellmedia.com';

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'stellmedia.com' || parsed.hostname === 'www.stellmedia.com';
  } catch {
    return false;
  }
}

function generateSitemapXML(urls: SitemapUrl[]): string {
  const validUrls = urls.filter(url => isValidUrl(url.loc));
  
  const xmlUrls = validUrls.map(url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${escapeXml(url.lastmod)}</lastmod>
    <changefreq>${escapeXml(url.changefreq)}</changefreq>
    <priority>${escapeXml(url.priority)}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('serve-sitemap: Generating dynamic sitemap');

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch sitemap settings from database
    const { data, error } = await supabase
      .from('seo_settings')
      .select('setting_value')
      .eq('setting_key', 'sitemap_urls')
      .single();

    let urls: SitemapUrl[];

    if (error || !data?.setting_value?.urls?.length) {
      console.log('serve-sitemap: Using default pages, no database data found');
      // Use default pages
      const currentDate = new Date().toISOString();
      urls = defaultPages.map(page => ({
        loc: `${BASE_URL}${page.path}`,
        lastmod: currentDate,
        changefreq: page.changefreq,
        priority: page.priority
      }));
    } else {
      console.log('serve-sitemap: Using database sitemap data');
      urls = data.setting_value.urls;
    }

    const xml = generateSitemapXML(urls);
    console.log(`serve-sitemap: Generated sitemap with ${urls.length} URLs`);

    return new Response(xml, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('serve-sitemap: Error generating sitemap:', error);
    
    // Return default sitemap on error
    const currentDate = new Date().toISOString();
    const fallbackUrls = defaultPages.map(page => ({
      loc: `${BASE_URL}${page.path}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    }));
    
    const xml = generateSitemapXML(fallbackUrls);
    
    return new Response(xml, {
      status: 200,
      headers: corsHeaders,
    });
  }
});
