
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMetadata } from '../context/MetadataContext';
import { useLocation } from 'react-router-dom';

interface SEOMetadataProps {
  path?: string;
  overrides?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: string;
  };
}

const SEOMetadata: React.FC<SEOMetadataProps> = ({ path: propPath, overrides = {} }) => {
  const location = useLocation();
  const { currentPageMetadata, normalizeUrl, setCurrentPage } = useMetadata();
  
  // Use either the provided path or the current location path
  const currentPath = propPath || location.pathname;
  
  // Set current page in context when component mounts or path changes
  useEffect(() => {
    setCurrentPage(currentPath);
  }, [currentPath, setCurrentPage]);

  // Use current page metadata from context or defaults
  const metadata = currentPageMetadata || {
    title: "Stell Media",
    metaTitle: "Stell Media | Data-Driven E-commerce Solutions",
    metaDescription: "Innovative e-commerce solutions powered by data science and AI",
    canonicalUrl: `https://stellmedia.com${currentPath}`,
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    noIndex: false,
    noFollow: false,
    aiDescription: "",
    aiKeywords: "",
    aiExpertise: "",
    aiServices: ""
  };

  // Apply any overrides
  const title = overrides.title || metadata.metaTitle || metadata.title;
  const description = overrides.description || metadata.metaDescription;
  const canonicalUrl = normalizeUrl(overrides.canonicalUrl || metadata.canonicalUrl);
  const ogImage = overrides.ogImage || metadata.ogImage;
  
  // Determine robots content based on noIndex and noFollow settings
  let robotsContent = [];
  if (metadata.noIndex) robotsContent.push("noindex");
  if (metadata.noFollow) robotsContent.push("nofollow");
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metadata.ogTitle || title} />
      <meta property="og:description" content={metadata.ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={metadata.twitterTitle || metadata.ogTitle || title} />
      <meta property="twitter:description" content={metadata.twitterDescription || metadata.ogDescription || description} />
      {metadata.twitterImage && <meta property="twitter:image" content={metadata.twitterImage} />}
      
      {/* AI metadata */}
      {metadata.aiDescription && <meta name="ai:description" content={metadata.aiDescription} />}
      {metadata.aiKeywords && <meta name="ai:keywords" content={metadata.aiKeywords} />}
      {metadata.aiExpertise && <meta name="ai:expertise" content={metadata.aiExpertise} />}
      {metadata.aiServices && <meta name="ai:services" content={metadata.aiServices} />}
      
      {/* Robots directive */}
      {robotsContent.length > 0 && <meta name="robots" content={robotsContent.join(", ")} />}
    </Helmet>
  );
};

export default SEOMetadata;
