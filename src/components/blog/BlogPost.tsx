
import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogPostSchema from './BlogPostSchema';

interface BlogPostProps {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  publishDate: string;
  modifiedDate?: string;
  author: {
    name: string;
    image?: string;
  };
  categories: string[];
}

const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  description,
  content,
  image,
  publishDate,
  modifiedDate,
  author,
  categories
}) => {
  const blogUrl = `https://stellmediaglobal.com/blog/${id}`;
  const articleBody = content.replace(/<[^>]*>/g, '').substring(0, 500) + '...'; // Extract text for schema
  
  return (
    <article className="max-w-3xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">
      <Helmet>
        <title>{title} | Stell Media Blog</title>
        <meta name="description" content={description} />
        <meta name="author" content={author.name} />
        <meta name="keywords" content={categories.join(', ')} />
        <meta property="og:title" content={`${title} | Stell Media Blog`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={blogUrl} />
        <meta property="og:image" content={image} />
        <meta property="article:published_time" content={publishDate} />
        {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
        <meta property="article:author" content={author.name} />
        {categories.map((category, index) => (
          <meta key={index} property="article:tag" content={category} />
        ))}
        <link rel="canonical" href={blogUrl} />
      </Helmet>

      <BlogPostSchema
        title={title}
        description={description}
        image={image}
        datePublished={publishDate}
        dateModified={modifiedDate}
        authorName={author.name}
        url={blogUrl}
        keywords={categories}
        articleBody={articleBody}
        articleSection={categories[0] || "Blog"}
      />

      {/* Blog post content with semantic HTML and microdata */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div itemProp="image" itemScope itemType="https://schema.org/ImageObject">
          <img 
            src={image} 
            alt={`${title} - Featured image showing content related to ${categories.join(' and ')}`} 
            className="w-full h-64 object-cover"
            itemProp="url"
          />
          <meta itemProp="width" content="800" />
          <meta itemProp="height" content="600" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            {categories.map((category, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded" itemProp="keywords">
                {category}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4" itemProp="headline">{title}</h1>
          
          <div className="flex items-center mb-6">
            <div itemProp="author" itemScope itemType="https://schema.org/Person">
              {author.image && (
                <img 
                  src={author.image} 
                  alt={`${author.name} - Author profile photo`} 
                  className="w-10 h-10 rounded-full mr-3" 
                  itemProp="image"
                />
              )}
              <div>
                <p className="font-medium text-gray-900" itemProp="name">{author.name}</p>
                <p className="text-gray-500 text-sm">
                  <meta itemProp="datePublished" content={publishDate} />
                  Published on <time dateTime={publishDate}>{new Date(publishDate).toLocaleDateString()}</time>
                  {modifiedDate && modifiedDate !== publishDate && (
                    <>
                      <meta itemProp="dateModified" content={modifiedDate} />
                      {` • Updated on `}
                      <time dateTime={modifiedDate}>{new Date(modifiedDate).toLocaleDateString()}</time>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: content }} />

          {/* Structured machine-readable section */}
          <div className="hidden" aria-hidden="true">
            <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
              <span itemProp="name">Stell Media</span>
              <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                <meta itemProp="url" content="https://stellmediaglobal.com/logo.png" />
                <meta itemProp="width" content="600" />
                <meta itemProp="height" content="60" />
              </span>
            </span>
            <meta itemProp="mainEntityOfPage" content={blogUrl} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
