
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
  const articleData = {
    title,
    description,
    image,
    datePublished,
    dateModified,
    authorName,
    url,
    keywords,
    articleBody,
    articleSection
  };

  // Breadcrumb data
  const breadcrumbData = [
    { name: "Home", url: "https://stellmediaglobal.com/" },
    { name: "Blog", url: "https://stellmediaglobal.com/blog" },
    { name: title, url }
  ];

  return (
    <>
      <SchemaMarkup type="article" data={articleData} />
      <SchemaMarkup type="breadcrumb" data={breadcrumbData} />
    </>
  );
};

export default BlogPostSchema;
