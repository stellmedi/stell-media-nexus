import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageSEO } from '@/hooks/use-page-seo';
import { useGlobalMetaSettings } from '@/hooks/use-seo-settings';

interface GlobalConfig {
  siteName?: string;
  defaultOgImage?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  googleSearchConsoleVerification?: string;
  bingWebmasterVerification?: string;
  facebookDomainVerification?: string;
}

interface SEOHelmetProps {
  pagePath: string;
  children?: React.ReactNode;
}

export default function SEOHelmet({ pagePath, children }: SEOHelmetProps) {
  const { seoData, isLoading } = usePageSEO(pagePath);
  const { data: globalMetaSettings } = useGlobalMetaSettings();

  // Global config from database with type safety
  const globalConfig: GlobalConfig = React.useMemo(() => {
    return (globalMetaSettings?.value as GlobalConfig) || {};
  }, [globalMetaSettings]);

  // Minimal fallbacks
  const siteName = globalConfig.siteName || 'Stell Media';
  const defaultOgImage = '/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png';

  // Show minimal loading state
  if (isLoading) {
    return (
      <Helmet>
        <title>{siteName}</title>
        {children}
      </Helmet>
    );
  }

  // Priority: Database values first, minimal fallbacks only
  const metaTitle = seoData?.metaTitle || siteName;
  const metaDescription = seoData?.metaDescription || '';
  const keywords = seoData?.keywords || '';
  const canonicalUrl = seoData?.canonicalUrl || `https://stellmedia.com${pagePath === '/' ? '' : pagePath}`;
  const ogTitle = seoData?.ogTitle || metaTitle;
  const ogDescription = seoData?.ogDescription || metaDescription;
  const ogImage = seoData?.ogImage || globalConfig.defaultOgImage || defaultOgImage;
  const twitterTitle = seoData?.twitterTitle || ogTitle;
  const twitterDescription = seoData?.twitterDescription || ogDescription;
  const twitterImage = seoData?.twitterImage || ogImage;

  // Generate robots content
  const robotsContent = [];
  if (seoData?.robotsIndex === false) robotsContent.push('noindex');
  if (seoData?.robotsFollow === false) robotsContent.push('nofollow');
  const robots = robotsContent.length > 0 ? robotsContent.join(', ') : undefined;

  // Ensure absolute URLs for social sharing
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `https://stellmedia.com${ogImage}`;
  const absoluteTwitterImage = twitterImage.startsWith('http') ? twitterImage : `https://stellmedia.com${twitterImage}`;

  return (
    <Helmet>
      {metaTitle && <title>{metaTitle}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {robots && <meta name="robots" content={robots} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@StellMedia" />
      <meta name="twitter:title" content={twitterTitle} />
      {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
      <meta name="twitter:image" content={absoluteTwitterImage} />
      
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
      
      {/* Global Analytics Tags */}
      {globalConfig.googleAnalyticsId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${globalConfig.googleAnalyticsId}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${globalConfig.googleAnalyticsId}');
            `}
          </script>
        </>
      )}
      
      {/* Google Tag Manager */}
      {globalConfig.googleTagManagerId && (
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${globalConfig.googleTagManagerId}');
          `}
        </script>
      )}
      
      {/* Verification Tags */}
      {globalConfig.googleSearchConsoleVerification && (
        <meta name="google-site-verification" content={globalConfig.googleSearchConsoleVerification} />
      )}
      {globalConfig.bingWebmasterVerification && (
        <meta name="msvalidate.01" content={globalConfig.bingWebmasterVerification} />
      )}
      {globalConfig.facebookDomainVerification && (
        <meta name="facebook-domain-verification" content={globalConfig.facebookDomainVerification} />
      )}
    </Helmet>
  );
}
