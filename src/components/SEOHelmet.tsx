
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
  defaultOgImage = '/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png',
  children
}: SEOHelmetProps) {
  const { seoData, isLoading, pageDefaults } = usePageSEO(pagePath);

  // Load global config
  const [globalConfig, setGlobalConfig] = React.useState<any>({});
  
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('stellmedia_global_seo_config');
      if (saved) {
        setGlobalConfig(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading global SEO config:', error);
    }
  }, []);

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
  const ogImage = seoData?.ogImage || pageDefaults?.ogImage || globalConfig.defaultOgImage || defaultOgImage;
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
      
      {/* Global Analytics Tags */}
      {globalConfig?.googleAnalyticsId && (
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
      {globalConfig?.googleTagManagerId && (
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
      
      {/* Search Console Verification */}
      {globalConfig?.googleSearchConsoleVerification && (
        <meta name="google-site-verification" content={globalConfig.googleSearchConsoleVerification} />
      )}
      
      {/* Bing Webmaster Verification */}
      {globalConfig?.bingWebmasterVerification && (
        <meta name="msvalidate.01" content={globalConfig.bingWebmasterVerification} />
      )}
      
      {/* Facebook Domain Verification */}
      {globalConfig?.facebookDomainVerification && (
        <meta name="facebook-domain-verification" content={globalConfig.facebookDomainVerification} />
      )}
    </Helmet>
  );
}
