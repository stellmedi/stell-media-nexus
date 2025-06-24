import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, User, ArrowLeft, CalendarIcon } from 'lucide-react';
import BlogPostSchema from './BlogPostSchema';
import SocialShareButtons from '@/components/SocialShareButtons';

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
  url: string; // Added the missing url property to the interface
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
  'Marketpulse': '/services/data-enrichment',
  'Performance Marketing': '/services/sem',
};

// Related blog posts based on category for topic clusters
const relatedPostsByCategory: Record<string, Array<{id: string, title: string, excerpt: string, category: string}>> = {
  'SEO': [
    {id: 'seo-best-practices', title: 'SEO Best Practices for E-commerce', excerpt: 'Learn the essential SEO strategies for online stores to improve visibility.', category: 'SEO'},
    {id: 'technical-seo-guide', title: 'Technical SEO Guide for Large Catalogs', excerpt: 'How to optimize site architecture for better indexing of large product collections.', category: 'SEO'},
    {id: 'local-seo-strategies', title: 'Local SEO Strategies for Retailers', excerpt: 'Optimize your online presence to attract nearby customers to your physical stores.', category: 'SEO'}
  ],
  'Product Discovery': [
    {id: 'ai-search-algorithms', title: 'AI-Powered Search Algorithms', excerpt: 'How machine learning is revolutionizing e-commerce search functionality.', category: 'Product Discovery'},
    {id: 'faceted-navigation', title: 'Faceted Navigation Best Practices', excerpt: 'Design effective filtering systems for complex product catalogs.', category: 'Product Discovery'},
    {id: 'search-ux-optimization', title: 'Search UX Optimization', excerpt: 'Improve the search experience to reduce abandonment and increase conversions.', category: 'Product Discovery'}
  ],
  'Data Enrichment': [
    {id: 'product-data-quality', title: 'Improving Product Data Quality', excerpt: 'Strategies for cleansing and enhancing your product information.', category: 'Data Enrichment'},
    {id: 'automated-data-enrichment', title: 'Automated Data Enrichment Tools', excerpt: 'Tools and processes for scaling your data enrichment efforts.', category: 'Data Enrichment'},
    {id: 'pim-implementation', title: 'PIM Implementation Guide', excerpt: 'How to successfully implement a Product Information Management system.', category: 'Data Enrichment'}
  ],
  'SEM': [
    {id: 'sem-strategies', title: 'SEM Strategies for E-commerce', excerpt: 'Paid search tactics that drive qualified traffic and high ROAS.', category: 'SEM'},
    {id: 'google-shopping-optimization', title: 'Google Shopping Optimization', excerpt: 'Maximize visibility and conversions in Google Shopping campaigns.', category: 'SEM'},
    {id: 'ppc-automation', title: 'PPC Automation Techniques', excerpt: 'Using automation to improve efficiency and performance of paid campaigns.', category: 'SEM'}
  ],
  'Conversion Optimization': [
    {id: 'cro-techniques', title: 'CRO Techniques for E-commerce', excerpt: 'Proven methods to increase your site conversion rate.', category: 'Conversion Optimization'},
    {id: 'ab-testing-guide', title: 'A/B Testing Guide', excerpt: 'How to set up and run effective split tests on your e-commerce site.', category: 'Conversion Optimization'},
    {id: 'checkout-optimization', title: 'Checkout Optimization', excerpt: 'Reduce cart abandonment and streamline the purchase process.', category: 'Conversion Optimization'}
  ],
  'E-commerce': [
    {id: 'ecommerce-trends', title: 'E-commerce Trends for 2024', excerpt: 'Stay ahead of the curve with these emerging e-commerce trends.', category: 'E-commerce'},
    {id: 'mobile-ecommerce', title: 'Mobile E-commerce Optimization', excerpt: 'Strategies for delivering exceptional mobile shopping experiences.', category: 'E-commerce'},
    {id: 'omnichannel-retail', title: 'Omnichannel Retail Strategies', excerpt: 'Create seamless shopping experiences across all customer touchpoints.', category: 'E-commerce'}
  ]
};

// Related case studies by category
const relatedCaseStudiesByCategory: Record<string, Array<{id: string, title: string, description: string}>> = {
  'SEO': [
    {id: 'amazon-marketplace', title: 'Amazon Marketplace Optimization', description: 'Complete overhaul of product listing and SEO strategy resulted in 62% increase in organic visibility.'},
    {id: 'electronics-search', title: 'Advanced Electronics Search Optimization', description: 'Strategic algorithms implementation to increase search conversion by 42%.'}
  ],
  'Product Discovery': [
    {id: 'electronics-search', title: 'Advanced Electronics Search Optimization', description: 'How we improved product discovery for a major electronics retailer.'},
    {id: 'search-platform-migration', title: 'Search Platform Migration Success', description: 'Our algorithm optimization during migration from Elastic Search to Coveo.'}
  ],
  'Data Enrichment': [
    {id: 'amazon-marketplace', title: 'Amazon Marketplace Optimization', description: 'How enhanced product data improved listing quality and conversions.'},
    {id: 'performance-marketing', title: 'Performance Marketing Campaign', description: 'Strategic performance marketing with enriched product data.'}
  ],
  'SEM': [
    {id: 'performance-marketing', title: 'Performance Marketing Campaign', description: 'Strategic performance marketing for an online retailer with 85% ROAS improvement.'},
    {id: 'amazon-marketplace', title: 'Amazon Marketplace Optimization', description: 'Complete SEM strategy with 47% higher conversion rate.'}
  ],
  'Conversion Optimization': [
    {id: 'electronics-search', title: 'Advanced Electronics Search Optimization', description: 'Search optimization that reduced no-results searches by 68%.'},
    {id: 'performance-marketing', title: 'Performance Marketing Campaign', description: '39% reduction in customer acquisition costs through optimization.'}
  ]
};

// Author expertise areas for better author connections
const authorExpertise: Record<string, {bio: string, areas: string[]}> = {
  'Jane Smith': {
    bio: 'E-commerce optimization specialist with 8+ years of experience helping brands improve discoverability and conversion.',
    areas: ['SEO', 'Product Discovery', 'Conversion Optimization']
  },
  'John Davis': {
    bio: 'Data specialist focused on product enrichment and marketplace optimization strategies.',
    areas: ['Data Enrichment', 'Marketpulse', 'E-commerce']
  },
  'Sarah Johnson': {
    bio: 'Search marketing expert specializing in paid strategies and ROAS optimization.',
    areas: ['SEM', 'Performance Marketing', 'Conversion Optimization']
  },
  'Michael Chen': {
    bio: 'Technical SEO and search platform migration specialist with expertise in large catalog management.',
    areas: ['SEO', 'Product Discovery', 'Search']
  }
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
  categories,
  url
}) => {
  const blogUrl = url; // Use the passed url prop instead of hardcoding
  // Extract text for schema without truncating the display content
  const articleBody = content.replace(/<[^>]*>/g, '').substring(0, 500) + '...';
  
  // Get related service page links based on categories
  const relatedServiceLinks = categories
    .filter(category => categoryServiceMap[category])
    .map(category => ({
      name: category,
      link: categoryServiceMap[category]
    }));
  
  // Get related blog posts for topic clusters
  const relatedPosts = categories.flatMap(category => 
    relatedPostsByCategory[category] || []
  ).filter(post => post.id !== id) // Remove current post if it's in the related posts
  .slice(0, 3); // Limit to 3 related posts
  
  // Get related case studies
  const relatedCaseStudies = categories.flatMap(category => 
    relatedCaseStudiesByCategory[category] || []
  ).slice(0, 2); // Limit to 2 case studies

  // Get author expertise
  const authorInfo = authorExpertise[author.name] || {
    bio: 'E-commerce optimization specialist.',
    areas: ['E-commerce']
  };
  
  // Reading time estimate (approx 200 words per minute)
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));
  
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
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="article:published_time" content={publishDate} />
        {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
        <meta property="article:author" content={author.name} />
        {categories.map((category, index) => (
          <meta key={index} property="article:tag" content={category} />
        ))}
        <link rel="canonical" href={url} />
      </Helmet>

      <BlogPostSchema
        title={title}
        description={description}
        image={image}
        datePublished={publishDate}
        dateModified={modifiedDate}
        authorName={author.name}
        url={url}
        keywords={categories}
        articleBody={articleBody}
        articleSection={categories[0] || "Blog"}
      />

      {/* Blog navigation breadcrumb - NEW */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-gray-500 hover:text-indigo-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li>
            <Link to="/blog" className="text-gray-500 hover:text-indigo-600">Blog</Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          {categories.length > 0 && (
            <li>
              <Link 
                to={`/blog?category=${encodeURIComponent(categories[0])}`} 
                className="text-gray-500 hover:text-indigo-600"
              >
                {categories[0]}
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
          )}
          <li aria-current="page" className="text-gray-900 font-medium truncate">{title}</li>
        </ol>
      </nav>

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
          
          {/* Enhanced meta information with reading time - NEW */}
          <div className="flex items-center mb-5 text-sm text-gray-600">
            <div className="flex items-center">
              <CalendarIcon size={16} className="mr-1" />
              <time dateTime={publishDate}>{new Date(publishDate).toLocaleDateString()}</time>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Book size={16} className="mr-1" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Social Share Buttons - NEW */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <SocialShareButtons 
              url={url}
              title={title}
              description={description}
              className="justify-start"
            />
          </div>
          
          {/* Author with Link to About Page - ENHANCED with expertise */}
          <div className="flex items-center mb-6 bg-gray-50 p-3 rounded-lg">
            <div itemProp="author" itemScope itemType="https://schema.org/Person" className="flex items-start">
              {author.image && (
                <img 
                  src={author.image} 
                  alt={`${author.name} - Author profile photo`} 
                  className="w-12 h-12 rounded-full mr-3" 
                  itemProp="image"
                />
              )}
              {!author.image && (
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <User className="text-indigo-600" size={20} />
                </div>
              )}
              <div>
                <Link to="/about" className="font-medium text-gray-900 hover:text-indigo-700" itemProp="name">
                  {author.name}
                </Link>
                <p className="text-gray-600 text-sm mt-1">{authorInfo.bio}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {authorInfo.areas.map((area, i) => (
                    <span key={i} className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Table of contents for longer posts - NEW */}
          {wordCount > 1000 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-bold mb-3">Table of Contents</h2>
              <ul className="space-y-1">
                {/* This is a placeholder - in a real implementation, you would extract headings from content */}
                <li><a href="#section-1" className="text-indigo-600 hover:underline">Understanding {categories[0]}</a></li>
                <li><a href="#section-2" className="text-indigo-600 hover:underline">Key Strategies</a></li>
                <li><a href="#section-3" className="text-indigo-600 hover:underline">Implementation Guide</a></li>
                <li><a href="#section-4" className="text-indigo-600 hover:underline">Results & Metrics</a></li>
                <li><a href="#conclusion" className="text-indigo-600 hover:underline">Conclusion</a></li>
              </ul>
            </div>
          )}
          
          {/* Main content */}
          <div className="prose max-w-none" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: content }} />

          {/* Topic Cluster: Related Posts Section - NEW */}
          {relatedPosts.length > 0 && (
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="text-xl font-bold mb-4">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post, index) => (
                  <div key={index} className="rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/blog/${post.id}`} className="block p-4">
                      <div className="bg-gray-100 text-xs rounded px-2 py-1 inline-block mb-2 text-indigo-800">{post.category}</div>
                      <h3 className="font-medium mb-2 hover:text-indigo-600 transition-colors">{post.title}</h3>
                      <p className="text-gray-600 text-sm">{post.excerpt}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Case Studies - NEW */}
          {relatedCaseStudies.length > 0 && (
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="text-xl font-bold mb-4">Case Studies</h2>
              <div className="space-y-4">
                {relatedCaseStudies.map((study, index) => (
                  <Link 
                    key={index}
                    to={`/case-studies/${study.id}`}
                    className="block p-4 border border-gray-100 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-all"
                  >
                    <h3 className="font-bold text-lg mb-1">{study.title}</h3>
                    <p className="text-gray-600 mb-2">{study.description}</p>
                    <span className="text-indigo-600 font-medium inline-flex items-center">
                      Read case study <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Services Section - ENHANCED */}
          {relatedServiceLinks.length > 0 && (
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="text-xl font-bold mb-4">Related Services</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedServiceLinks.map((service, index) => (
                  <Link 
                    key={index}
                    to={service.link}
                    className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-md hover:from-indigo-100 hover:to-blue-100 transition-colors"
                  >
                    <h3 className="font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {service.name === 'SEO' && 'Optimize your online visibility and organic traffic with our data-driven SEO strategies.'}
                      {service.name === 'Product Discovery' && 'Enhance customer experience with AI-powered search and navigation solutions.'}
                      {service.name === 'Data Enrichment' && 'Improve product data quality to boost discoverability and conversion rates.'}
                      {service.name === 'SEM' && 'Drive targeted traffic and maximize ROI with our strategic search marketing campaigns.'}
                      {service.name === 'Conversion Optimization' && 'Turn more visitors into customers with our proven CRO techniques.'}
                      {service.name === 'E-commerce' && 'Comprehensive e-commerce solutions to grow your online business.'}
                      {service.name === 'Search' && 'Advanced search solutions to help customers find exactly what they need.'}
                      {service.name === 'Marketpulse' && 'Market intelligence and competitive analysis for e-commerce businesses.'}
                      {service.name === 'Performance Marketing' && 'Results-driven marketing campaigns focused on measurable ROI.'}
                    </p>
                    <span className="text-indigo-600 font-medium inline-flex items-center text-sm">
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Strategic CTA - NEW */}
          <div className="mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg text-white">
            <h3 className="font-bold text-xl mb-2">Ready to improve your {categories[0]} strategy?</h3>
            <p className="mb-4 text-white/90">
              Our team of experts can help you implement these strategies and achieve measurable results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/consultation" 
                className="bg-white text-indigo-700 px-5 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors text-center"
              >
                Book a free consultation
              </Link>
              <Link 
                to="/services" 
                className="bg-indigo-700/30 text-white px-5 py-2 rounded-md font-medium hover:bg-indigo-700/50 transition-colors text-center"
              >
                Explore our services
              </Link>
            </div>
          </div>
          
          {/* More from Author Section - NEW */}
          <div className="mt-10 border-t border-gray-100 pt-8">
            <h3 className="font-bold text-xl mb-4">More from {author.name}</h3>
            <p className="text-gray-600 mb-4">
              Explore more insights from our {authorInfo.areas.join(', ')} specialist.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/blog" 
                className="text-indigo-600 font-medium inline-flex items-center"
              >
                View all articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Improved Navigation and Sharing - Enhanced with social buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-gray-100 pt-6">
            <Link 
              to="/blog" 
              className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <SocialShareButtons 
                url={url}
                title={title}
                description={description}
                className="justify-start sm:justify-end"
              />
              <Link 
                to="/case-studies" 
                className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
              >
                Case studies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
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
            <meta itemProp="mainEntityOfPage" content={url} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
