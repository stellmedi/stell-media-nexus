
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageSEO } from '@/hooks/use-page-seo';

interface SEOHelmetProps {
  pagePath: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultKeywords?: string;
  defaultOgImage?: string;
  children?: React.ReactNode;
}

export default function SEOHelmet({
  pagePath,
  defaultTitle = '',
  defaultDescription = '',
  defaultKeywords = '',
  defaultOgImage = '',
  children
}: SEOHelmetProps) {
  const { seoData, isLoading } = usePageSEO(pagePath);

  console.log('SEOHelmet: Rendering for page:', pagePath);
  console.log('SEOHelmet: Saved SEO data:', seoData);
  console.log('SEOHelmet: Loading state:', isLoading);
  console.log('SEOHelmet: Default values:', { defaultTitle, defaultDescription, defaultKeywords, defaultOgImage });

  // Show loading state briefly to prevent hydration issues
  if (isLoading) {
    return (
      <Helmet>
        {defaultTitle && <title>{defaultTitle}</title>}
        {defaultDescription && <meta name="description" content={defaultDescription} />}
        {children}
      </Helmet>
    );
  }

  // Use saved SEO data if available, otherwise fall back to defaults
  const metaTitle = seoData?.metaTitle || defaultTitle;
  const metaDescription = seoData?.metaDescription || defaultDescription;
  const keywords = seoData?.keywords || defaultKeywords;
  const canonicalUrl = seoData?.canonicalUrl || `https://stellmedia.com${pagePath === '/' ? '' : pagePath}`;
  const ogTitle = seoData?.ogTitle || metaTitle;
  const ogDescription = seoData?.ogDescription || metaDescription;
  const ogImage = seoData?.ogImage || defaultOgImage;
  const twitterTitle = seoData?.twitterTitle || ogTitle;
  const twitterDescription = seoData?.twitterDescription || ogDescription;
  const twitterImage = seoData?.twitterImage || ogImage;

  console.log('SEOHelmet: Final values being used:', {
    metaTitle,
    metaDescription,
    keywords,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage
  });

  // Generate robots content
  const robotsContent = [];
  if (seoData?.robotsIndex === false) robotsContent.push('noindex');
  if (seoData?.robotsFollow === false) robotsContent.push('nofollow');
  const robots = robotsContent.length > 0 ? robotsContent.join(', ') : undefined;

  return (
    <Helmet>
      {metaTitle && <title>{metaTitle}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {robots && <meta name="robots" content={robots} />}
      
      {/* Open Graph */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
      {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      
      {/* Additional custom meta tags from children */}
      {children}
      
      {/* Schema markup if provided */}
      {seoData?.schemaData && seoData.schemaType && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": seoData.schemaType,
            ...JSON.parse(seoData.schemaData)
          })}
        </script>
      )}
    </Helmet>
  );
}
