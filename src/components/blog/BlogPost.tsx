
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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

// Map of categories to their corresponding service pages
const categoryServiceMap: Record<string, string> = {
  'SEO': '/services/seo',
  'Product Discovery': '/services/product-discovery',
  'Data Enrichment': '/services/data-enrichment',
  'SEM': '/services/sem',
  'Conversion Optimization': '/services/conversion-optimization',
  'E-commerce': '/services',
  'Search': '/services/product-discovery',
};

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
  // Extract text for schema without truncating the display content
  const articleBody = content.replace(/<[^>]*>/g, '').substring(0, 500) + '...';
  
  // Get related service page links based on categories
  const relatedServiceLinks = categories
    .filter(category => categoryServiceMap[category])
    .map(category => ({
      name: category,
      link: categoryServiceMap[category]
    }));
  
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
          {/* Topic Categories with Links - ENHANCED */}
          <div className="flex items-center gap-2 mb-4">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={categoryServiceMap[category] || '/blog'} 
                className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded hover:bg-indigo-200 transition-colors" 
                itemProp="keywords"
              >
                {category}
              </Link>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4" itemProp="headline">{title}</h1>
          
          {/* Author with Link to About Page - ENHANCED */}
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
                <Link to="/about" className="font-medium text-gray-900 hover:text-indigo-700" itemProp="name">
                  {author.name}
                </Link>
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

          {/* Related Services Section - NEW */}
          {relatedServiceLinks.length > 0 && (
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold mb-3">Related Services</h3>
              <div className="flex flex-wrap gap-2">
                {relatedServiceLinks.map((service, index) => (
                  <Link 
                    key={index}
                    to={service.link}
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md text-sm hover:bg-indigo-100 transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Call to Action - NEW */}
          <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">Need help with {categories[0] || 'digital optimization'}?</h3>
            <p className="text-gray-600 mb-3">
              Our team of experts can help you implement these strategies and achieve measurable results.
            </p>
            <Link 
              to="/consultation" 
              className="inline-flex items-center text-indigo-700 font-medium hover:text-indigo-900"
            >
              Book a free consultation <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {/* Explore More Section - NEW */}
          <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
            <Link 
              to="/blog" 
              className="text-indigo-600 hover:text-indigo-800"
            >
              ← Back to all articles
            </Link>
            <Link 
              to="/case-studies" 
              className="text-indigo-600 hover:text-indigo-800"
            >
              Browse case studies →
            </Link>
          </div>

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
