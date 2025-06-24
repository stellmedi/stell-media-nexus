
import React from 'react';
import { Helmet } from 'react-helmet-async';

const XMLSitemap: React.FC = () => {
  const baseUrl = 'https://stellmedia.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: currentDate },
    { url: '/about', priority: '0.9', changefreq: 'monthly', lastmod: currentDate },
    { url: '/services', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/real-estate', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/ecommerce', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/services/seo', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/services/product-discovery', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/services/data-enrichment', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/services/sem', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/services/conversion-optimization', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/case-studies', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/blog', priority: '0.7', changefreq: 'daily', lastmod: currentDate },
    { url: '/contact', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
    { url: '/consultation', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
    { url: '/careers', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
    { url: '/faq', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly', lastmod: currentDate },
    { url: '/terms', priority: '0.5', changefreq: 'yearly', lastmod: currentDate },
    { url: '/sitemap', priority: '0.5', changefreq: 'monthly', lastmod: currentDate }
  ];

  const generateSitemapXML = () => {
    const urlElements = pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  };

  // Generate sitemap and make it available at /sitemap.xml
  React.useEffect(() => {
    const sitemap = generateSitemapXML();
    
    // Create a blob URL for the sitemap
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Store sitemap data for potential download or submission
    if (typeof window !== 'undefined') {
      (window as any).sitemapXML = sitemap;
      (window as any).sitemapPages = pages;
    }
    
    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <Helmet>
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
};

export default XMLSitemap;
