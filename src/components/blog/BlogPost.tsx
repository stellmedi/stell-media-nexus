
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
  
  return (
    <article className="max-w-3xl mx-auto">
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
      />

      {/* Blog post content */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img 
          src={image} 
          alt={`${title} - Featured image showing content related to ${categories.join(' and ')}`} 
          className="w-full h-64 object-cover" 
        />
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            {categories.map((category, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                {category}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          
          <div className="flex items-center mb-6">
            {author.image && (
              <img 
                src={author.image} 
                alt={`${author.name} - Author profile photo`} 
                className="w-10 h-10 rounded-full mr-3" 
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{author.name}</p>
              <p className="text-gray-500 text-sm">
                Published on {new Date(publishDate).toLocaleDateString()}
                {modifiedDate && modifiedDate !== publishDate && 
                  ` • Updated on ${new Date(modifiedDate).toLocaleDateString()}`
                }
              </p>
            </div>
          </div>
          
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
