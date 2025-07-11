
import React from 'react';
import SchemaMarkup from '@/components/SchemaMarkup';

interface BlogPostSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
  keywords?: string[];
  articleBody?: string;
  articleSection?: string;
}

const BlogPostSchema: React.FC<BlogPostSchemaProps> = ({ 
  title, 
  description, 
  image, 
  datePublished, 
  dateModified = datePublished, 
  authorName, 
  url,
  keywords = [],
  articleBody = "",
  articleSection = "Blog"
}) => {
  // Enhanced article data with more extensive properties
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorName,
      url: 'https://stellmedia.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stell Media',
      logo: {
        '@type': 'ImageObject',
        url: '/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png'
      },
      url: 'https://stellmedia.com'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: keywords.join(', '),
    articleBody,
    articleSection,
    // Add more specific metadata
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Blog',
      name: 'Stell Media Blog',
      url: 'https://stellmedia.com/blog'
    }
  };

  // Enhanced breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "https://stellmedia.com/" },
    { name: "Blog", url: "https://stellmedia.com/blog" }
  ];
  
  // Add category to breadcrumb if available
  if (keywords.length > 0) {
    breadcrumbItems.push({ 
      name: keywords[0], 
      url: `https://stellmedia.com/blog?category=${encodeURIComponent(keywords[0])}` 
    });
  }
  
  // Add current page to breadcrumb
  breadcrumbItems.push({ name: title, url });
  
  return (
    <>
      <SchemaMarkup type="article" data={articleData} />
      <SchemaMarkup type="breadcrumb" data={breadcrumbItems} />
    </>
  );
};

export default BlogPostSchema;
