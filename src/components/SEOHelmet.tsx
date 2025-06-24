
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageSEO } from '@/hooks/use-page-seo';
import { useGlobalSEO } from '@/hooks/use-global-seo';

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
  defaultOgImage = '/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png',
  children
}: SEOHelmetProps) {
  const { seoData, isLoading, pageDefaults } = usePageSEO(pagePath);
  const { config: globalConfig } = useGlobalSEO();

  console.log('SEOHelmet: Rendering for page:', pagePath);
  console.log('SEOHelmet: Saved SEO data:', seoData);
  console.log('SEOHelmet: Page defaults:', pageDefaults);
  console.log('SEOHelmet: Loading state:', isLoading);
  console.log('SEOHelmet: Global config:', globalConfig);

  // Show loading state briefly to prevent hydration issues
  if (isLoading) {
    return (
      <Helmet>
        {(defaultTitle || pageDefaults?.metaTitle) && <title>{defaultTitle || pageDefaults?.metaTitle}</title>}
        {(defaultDescription || pageDefaults?.metaDescription) && <meta name="description" content={defaultDescription || pageDefaults?.metaDescription} />}
        {children}
      </Helmet>
    );
  }

  // Priority: saved data > page defaults > component props
  const metaTitle = seoData?.metaTitle || pageDefaults?.metaTitle || defaultTitle;
  const metaDescription = seoData?.metaDescription || pageDefaults?.metaDescription || defaultDescription;
  const keywords = seoData?.keywords || pageDefaults?.keywords || defaultKeywords;
  const canonicalUrl = seoData?.canonicalUrl || `https://stellmedia.com${pagePath === '/' ? '' : pagePath}`;
  const ogTitle = seoData?.ogTitle || metaTitle;
  const ogDescription = seoData?.ogDescription || metaDescription;
  const ogImage = seoData?.ogImage || pageDefaults?.ogImage || defaultOgImage;
  const twitterTitle = seoData?.twitterTitle || ogTitle;
  const twitterDescription = seoData?.twitterDescription || ogDescription;
  const twitterImage = seoData?.twitterImage || ogImage;

  // AI SEO fields
  const aiContentType = seoData?.aiContentType || pageDefaults?.aiContentType;
  const aiExpertise = seoData?.aiExpertise || pageDefaults?.aiExpertise;
  const aiServiceFocus = seoData?.aiServiceFocus || pageDefaults?.aiServiceFocus;
  const aiTargetAudience = seoData?.aiTargetAudience || pageDefaults?.aiTargetAudience;
  const aiContentFormat = seoData?.aiContentFormat || pageDefaults?.aiContentFormat;
  const aiCrawlerInstructions = seoData?.aiCrawlerInstructions || globalConfig?.aiCrawlerInstructions;

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
    twitterImage,
    aiContentType,
    aiExpertise,
    aiServiceFocus,
    aiTargetAudience,
    aiContentFormat
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
      
      {/* AI SEO Meta Tags */}
      {globalConfig?.enableAISEO && (
        <>
          {aiContentType && <meta name="ai-content-type" content={aiContentType} />}
          {aiExpertise && <meta name="ai-expertise" content={aiExpertise} />}
          {aiServiceFocus && <meta name="ai-service-focus" content={aiServiceFocus} />}
          {aiTargetAudience && <meta name="ai-target-audience" content={aiTargetAudience} />}
          {aiContentFormat && <meta name="ai-content-format" content={aiContentFormat} />}
          {aiCrawlerInstructions && <meta name="ai-crawler-instructions" content={aiCrawlerInstructions} />}
          
          {/* AI Platform Specific Meta Tags */}
          {(seoData?.enableChatGPTOptimization !== false && globalConfig?.chatgptOptimization) && (
            <>
              <meta name="chatgpt-crawl" content="allowed" />
              <meta name="openai-crawl" content="allowed" />
            </>
          )}
          
          {(seoData?.enablePerplexityOptimization !== false && globalConfig?.perplexityOptimization) && (
            <meta name="perplexity-crawl" content="allowed" />
          )}
        </>
      )}
      
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
