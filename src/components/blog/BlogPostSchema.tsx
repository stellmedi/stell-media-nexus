
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
}

const BlogPostSchema: React.FC<BlogPostSchemaProps> = ({ 
  title, 
  description, 
  image, 
  datePublished, 
  dateModified = datePublished, 
  authorName, 
  url 
}) => {
  const articleData = {
    title,
    description,
    image: [image],
    datePublished,
    dateModified,
    authorName,
    url
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
