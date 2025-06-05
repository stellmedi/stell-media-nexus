
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OptimizedImage from '@/components/OptimizedImage';

// Enhanced blog posts data with relevant images and consistent formatting
export const blogPosts = [
  {
    id: 'ai-search-fashion',
    title: 'AI-Powered Search: Revolutionizing Fashion E-commerce',
    excerpt: 'Discover how advanced algorithms and intelligent systems are transforming the way customers find and discover fashion products online.',
    content: `
      <p>The fashion e-commerce landscape is undergoing a dramatic transformation, driven by advanced search technologies that are redefining how customers discover and interact with products online.</p>
      
      <h2>The Evolution of Fashion Search</h2>
      <p>Traditional keyword-based search has given way to sophisticated systems that understand context, style preferences, and visual similarities. Modern fashion retailers are leveraging advanced algorithms to create more intuitive and personalized shopping experiences.</p>
      
      <h3>Key Benefits of Advanced Search Technology</h3>
      <ul>
        <li><strong>Visual Search Capabilities:</strong> Customers can upload images to find similar styles and products</li>
        <li><strong>Personalized Recommendations:</strong> Intelligent systems learn from browsing and purchase history</li>
        <li><strong>Contextual Understanding:</strong> Search engines that comprehend fashion terminology and style concepts</li>
        <li><strong>Multi-attribute Filtering:</strong> Advanced filtering by color, size, style, brand, and price simultaneously</li>
      </ul>
      
      <h2>Implementation Strategies</h2>
      <p>Successful implementation requires a comprehensive approach that combines technology with user experience design:</p>
      
      <h3>1. Data Quality and Enrichment</h3>
      <p>High-quality product data is the foundation of effective search. This includes detailed product descriptions, accurate categorization, and comprehensive attribute tagging.</p>
      
      <h3>2. User Interface Optimization</h3>
      <p>The search interface should be intuitive and responsive, providing instant feedback and suggestions as users type or filter.</p>
      
      <h3>3. Performance Optimization</h3>
      <p>Fast search response times are crucial for maintaining user engagement and preventing abandonment.</p>
      
      <h2>Measuring Success</h2>
      <p>Key performance indicators for advanced search implementation include:</p>
      <ul>
        <li>Search conversion rates</li>
        <li>Time to product discovery</li>
        <li>User engagement metrics</li>
        <li>Revenue per search session</li>
      </ul>
      
      <h2>Future Trends</h2>
      <p>The future of fashion search includes voice search integration, augmented reality try-on features, and even more sophisticated personalization algorithms that understand individual style preferences at a granular level.</p>
      
      <p>As technology continues to evolve, fashion retailers who invest in advanced search capabilities will be better positioned to meet customer expectations and drive business growth.</p>
    `,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Product Discovery',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'seo-ecommerce-guide',
    title: 'Complete SEO Guide for E-commerce Success',
    excerpt: 'Master the essential SEO strategies that drive organic traffic and boost conversions for online stores.',
    content: `
      <p>Search engine optimization for e-commerce requires a strategic approach that balances technical excellence with user experience. This comprehensive guide covers the essential strategies for driving organic growth.</p>
      
      <h2>Technical SEO Foundations</h2>
      <p>Strong technical SEO is crucial for e-commerce success. Key areas include:</p>
      
      <h3>Site Architecture</h3>
      <ul>
        <li>Clean URL structure that reflects category hierarchy</li>
        <li>Logical navigation and internal linking</li>
        <li>XML sitemaps for products and categories</li>
        <li>Proper use of canonical tags to avoid duplicate content</li>
      </ul>
      
      <h3>Page Speed Optimization</h3>
      <p>Fast-loading pages are essential for both user experience and search rankings. Focus on:</p>
      <ul>
        <li>Image optimization and compression</li>
        <li>Efficient caching strategies</li>
        <li>Content delivery network implementation</li>
        <li>Database query optimization</li>
      </ul>
      
      <h2>On-Page SEO for Products</h2>
      <p>Product page optimization requires attention to multiple elements:</p>
      
      <h3>Product Titles and Descriptions</h3>
      <p>Craft compelling, keyword-rich product titles that include brand, model, and key features. Product descriptions should be unique, detailed, and focused on benefits.</p>
      
      <h3>Schema Markup</h3>
      <p>Implement structured data to help search engines understand your products, including price, availability, reviews, and specifications.</p>
      
      <h2>Category Page Optimization</h2>
      <p>Category pages often drive the most organic traffic. Optimize them with:</p>
      <ul>
        <li>Descriptive category content</li>
        <li>Faceted navigation that's SEO-friendly</li>
        <li>Related product recommendations</li>
        <li>Clear category hierarchies</li>
      </ul>
      
      <h2>Content Marketing Strategy</h2>
      <p>Beyond product pages, create valuable content that attracts and engages your target audience:</p>
      <ul>
        <li>Buying guides and tutorials</li>
        <li>Industry trends and insights</li>
        <li>Customer success stories</li>
        <li>FAQ sections addressing common concerns</li>
      </ul>
      
      <h2>Measuring SEO Performance</h2>
      <p>Track key metrics to measure the success of your SEO efforts:</p>
      <ul>
        <li>Organic traffic growth</li>
        <li>Keyword ranking improvements</li>
        <li>Organic conversion rates</li>
        <li>Revenue from organic search</li>
      </ul>
      
      <p>Successful e-commerce SEO requires ongoing optimization and adaptation to algorithm changes. Focus on creating value for users while following technical best practices.</p>
    `,
    author: 'Michael Chen',
    date: '2024-01-10',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'data-enrichment-strategies',
    title: 'Product Data Enrichment: Best Practices for E-commerce',
    excerpt: 'Learn how to enhance your product data quality to improve discoverability, conversions, and customer satisfaction.',
    content: `
      <p>Product data enrichment is the process of enhancing existing product information with additional attributes, descriptions, and metadata to create more complete and accurate product catalogs.</p>
      
      <h2>Why Data Enrichment Matters</h2>
      <p>Rich, accurate product data is fundamental to e-commerce success. It impacts:</p>
      <ul>
        <li>Search discoverability and ranking</li>
        <li>Customer decision-making process</li>
        <li>Conversion rates and sales</li>
        <li>Customer satisfaction and returns</li>
      </ul>
      
      <h2>Key Data Enhancement Areas</h2>
      
      <h3>Product Descriptions</h3>
      <p>Transform basic manufacturer descriptions into compelling, detailed product stories that highlight benefits and use cases.</p>
      
      <h3>Technical Specifications</h3>
      <p>Ensure all relevant technical details are captured, including dimensions, materials, compatibility, and performance metrics.</p>
      
      <h3>Visual Assets</h3>
      <p>Enhance product listings with multiple high-quality images, 360-degree views, and video demonstrations where appropriate.</p>
      
      <h3>Categorization and Attributes</h3>
      <p>Implement comprehensive tagging systems that capture style, color, size, brand, and other relevant attributes for improved filtering and search.</p>
      
      <h2>Data Sources and Methods</h2>
      
      <h3>Manufacturer Data</h3>
      <p>Leverage supplier-provided information as a foundation, but always verify and enhance for accuracy and completeness.</p>
      
      <h3>Automated Enhancement Tools</h3>
      <p>Use advanced systems to automatically extract and enhance product information from various sources.</p>
      
      <h3>Manual Quality Control</h3>
      <p>Implement review processes to ensure data accuracy and consistency across your catalog.</p>
      
      <h2>Implementation Best Practices</h2>
      
      <h3>Start with High-Impact Products</h3>
      <p>Prioritize your best-selling and highest-margin products for initial enrichment efforts.</p>
      
      <h3>Create Data Standards</h3>
      <p>Establish clear guidelines for data format, quality requirements, and categorization schemes.</p>
      
      <h3>Monitor Data Quality</h3>
      <p>Implement ongoing quality checks to maintain data accuracy and identify areas for improvement.</p>
      
      <h2>Measuring Success</h2>
      <p>Track the impact of data enrichment efforts through:</p>
      <ul>
        <li>Search result visibility improvements</li>
        <li>Product page conversion rate increases</li>
        <li>Reduced customer service inquiries</li>
        <li>Lower return rates due to better product information</li>
      </ul>
      
      <h2>Technology Solutions</h2>
      <p>Modern data enrichment relies on sophisticated tools and platforms that can process large volumes of product information efficiently while maintaining quality standards.</p>
      
      <p>Investing in comprehensive product data enrichment creates a competitive advantage that drives both immediate sales improvements and long-term customer loyalty.</p>
    `,
    author: 'John Davis',
    date: '2024-01-05',
    category: 'Data Enrichment',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'conversion-optimization-techniques',
    title: 'Conversion Rate Optimization for E-commerce',
    excerpt: 'Proven strategies to increase your online store conversion rates and maximize revenue from existing traffic.',
    content: `
      <p>Conversion rate optimization (CRO) is the systematic process of increasing the percentage of website visitors who complete desired actions, such as making a purchase or signing up for a newsletter.</p>
      
      <h2>Understanding Your Conversion Funnel</h2>
      <p>Before optimizing, map out your customer journey to identify potential drop-off points:</p>
      <ul>
        <li>Homepage and category page engagement</li>
        <li>Product page interaction</li>
        <li>Add to cart behavior</li>
        <li>Checkout process completion</li>
      </ul>
      
      <h2>Key Optimization Areas</h2>
      
      <h3>Product Page Optimization</h3>
      <p>Product pages are critical conversion points. Focus on:</p>
      <ul>
        <li>High-quality product images and videos</li>
        <li>Clear, compelling product descriptions</li>
        <li>Prominent call-to-action buttons</li>
        <li>Social proof through reviews and ratings</li>
        <li>Trust signals and security badges</li>
      </ul>
      
      <h3>Checkout Process Streamlining</h3>
      <p>Reduce cart abandonment by optimizing the checkout experience:</p>
      <ul>
        <li>Minimize required form fields</li>
        <li>Offer guest checkout options</li>
        <li>Display security and trust indicators</li>
        <li>Provide multiple payment options</li>
        <li>Show clear shipping and return policies</li>
      </ul>
      
      <h3>Mobile Optimization</h3>
      <p>With mobile commerce growing rapidly, ensure your mobile experience is optimized for conversions:</p>
      <ul>
        <li>Responsive design that works on all devices</li>
        <li>Touch-friendly navigation and buttons</li>
        <li>Fast loading times on mobile networks</li>
        <li>Simplified mobile checkout process</li>
      </ul>
      
      <h2>Testing and Experimentation</h2>
      
      <h3>A/B Testing</h3>
      <p>Systematically test different versions of pages and elements to identify what works best for your audience.</p>
      
      <h3>Multivariate Testing</h3>
      <p>Test multiple elements simultaneously to understand how different combinations impact conversion rates.</p>
      
      <h3>User Experience Testing</h3>
      <p>Observe real users interacting with your site to identify usability issues and optimization opportunities.</p>
      
      <h2>Personalization Strategies</h2>
      <p>Tailor the shopping experience to individual users:</p>
      <ul>
        <li>Personalized product recommendations</li>
        <li>Dynamic content based on browsing history</li>
        <li>Targeted promotions and offers</li>
        <li>Location-based customization</li>
      </ul>
      
      <h2>Analytics and Measurement</h2>
      <p>Use data to guide optimization efforts:</p>
      <ul>
        <li>Conversion rate tracking by traffic source</li>
        <li>Funnel analysis to identify drop-off points</li>
        <li>Heat mapping to understand user behavior</li>
        <li>Customer feedback and surveys</li>
      </ul>
      
      <h2>Advanced Optimization Techniques</h2>
      <p>For mature e-commerce sites, consider advanced strategies like dynamic pricing, scarcity messaging, and behavioral triggers to further boost conversions.</p>
      
      <p>Remember that CRO is an ongoing process. Continuous testing and optimization based on data insights will drive sustained improvements in your conversion rates and overall business performance.</p>
    `,
    author: 'Sarah Johnson',
    date: '2023-12-28',
    category: 'Conversion Optimization',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sem-strategies',
    title: 'Search Engine Marketing Strategies for E-commerce Growth',
    excerpt: 'Maximize your ROI with data-driven SEM campaigns that drive qualified traffic and increase sales.',
    content: `
      <p>Search Engine Marketing (SEM) encompasses paid search strategies that drive immediate, targeted traffic to your e-commerce site. When executed properly, SEM delivers measurable ROI and complements organic search efforts.</p>
      
      <h2>Campaign Structure and Strategy</h2>
      
      <h3>Campaign Organization</h3>
      <p>Structure campaigns for maximum control and optimization:</p>
      <ul>
        <li>Brand campaigns for branded searches</li>
        <li>Product-specific campaigns by category</li>
        <li>Competitor campaigns for competitive positioning</li>
        <li>Shopping campaigns for product visibility</li>
      </ul>
      
      <h3>Keyword Research and Selection</h3>
      <p>Identify high-intent keywords that drive qualified traffic:</p>
      <ul>
        <li>Product-specific terms with commercial intent</li>
        <li>Long-tail keywords for specific customer needs</li>
        <li>Seasonal and trending keywords</li>
        <li>Local search terms for geo-targeted campaigns</li>
      </ul>
      
      <h2>Ad Copy and Creative Optimization</h2>
      
      <h3>Compelling Ad Headlines</h3>
      <p>Create headlines that capture attention and communicate value:</p>
      <ul>
        <li>Include primary keywords naturally</li>
        <li>Highlight unique selling propositions</li>
        <li>Use dynamic keyword insertion where appropriate</li>
        <li>Test emotional triggers and urgency</li>
      </ul>
      
      <h3>Description Lines</h3>
      <p>Use description text to provide additional details and encourage clicks:</p>
      <ul>
        <li>Highlight key product benefits</li>
        <li>Include pricing and promotional offers</li>
        <li>Add trust signals and guarantees</li>
        <li>Use clear calls-to-action</li>
      </ul>
      
      <h2>Shopping Campaign Optimization</h2>
      <p>Product shopping campaigns are crucial for e-commerce success:</p>
      
      <h3>Product Feed Optimization</h3>
      <ul>
        <li>Detailed and accurate product titles</li>
        <li>High-quality product images</li>
        <li>Competitive pricing strategies</li>
        <li>Complete product attributes and categories</li>
      </ul>
      
      <h3>Bid Management</h3>
      <ul>
        <li>Automated bidding strategies for efficiency</li>
        <li>Manual bid adjustments for high-value products</li>
        <li>Seasonal bid modifications</li>
        <li>Performance-based bid optimization</li>
      </ul>
      
      <h2>Landing Page Optimization</h2>
      <p>Ensure ad traffic converts effectively:</p>
      <ul>
        <li>Message match between ads and landing pages</li>
        <li>Fast page loading times</li>
        <li>Clear value propositions</li>
        <li>Streamlined conversion paths</li>
      </ul>
      
      <h2>Performance Monitoring and Analytics</h2>
      
      <h3>Key Performance Indicators</h3>
      <p>Track metrics that matter for e-commerce success:</p>
      <ul>
        <li>Return on ad spend (ROAS)</li>
        <li>Cost per acquisition (CPA)</li>
        <li>Conversion rates by campaign</li>
        <li>Average order value from paid traffic</li>
      </ul>
      
      <h3>Attribution and Tracking</h3>
      <p>Implement comprehensive tracking to understand the customer journey:</p>
      <ul>
        <li>Multi-touch attribution models</li>
        <li>Cross-device tracking</li>
        <li>Offline conversion tracking</li>
        <li>Customer lifetime value analysis</li>
      </ul>
      
      <h2>Advanced SEM Strategies</h2>
      
      <h3>Audience Targeting</h3>
      <p>Leverage audience data for more precise targeting:</p>
      <ul>
        <li>Remarketing to previous visitors</li>
        <li>Customer match campaigns</li>
        <li>Similar audience targeting</li>
        <li>In-market audience segments</li>
      </ul>
      
      <h3>Automation and Optimization</h3>
      <p>Use automated tools and strategies to improve efficiency:</p>
      <ul>
        <li>Smart bidding strategies</li>
        <li>Dynamic search ads</li>
        <li>Responsive search ads</li>
        <li>Performance-based budget allocation</li>
      </ul>
      
      <p>Successful SEM requires continuous optimization based on performance data. Regular testing, monitoring, and adjustment ensure that campaigns deliver maximum ROI and support overall business objectives.</p>
    `,
    author: 'Michael Chen',
    date: '2023-12-20',
    category: 'SEM',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'marketpulse-analytics',
    title: 'Market Intelligence: Understanding E-commerce Trends',
    excerpt: 'Leverage market data and competitive insights to make informed business decisions and stay ahead of the competition.',
    content: `
      <p>Market intelligence provides the data-driven insights necessary to understand industry trends, competitor strategies, and customer behavior patterns that drive e-commerce success.</p>
      
      <h2>The Value of Market Intelligence</h2>
      <p>Comprehensive market analysis enables businesses to:</p>
      <ul>
        <li>Identify emerging market opportunities</li>
        <li>Understand competitive positioning</li>
        <li>Optimize pricing strategies</li>
        <li>Predict customer demand patterns</li>
        <li>Make informed inventory decisions</li>
      </ul>
      
      <h2>Key Data Sources</h2>
      
      <h3>Competitive Analysis</h3>
      <p>Monitor competitor activities across multiple dimensions:</p>
      <ul>
        <li>Product catalog and pricing changes</li>
        <li>Marketing and promotional strategies</li>
        <li>Customer review sentiment analysis</li>
        <li>Search ranking performance</li>
        <li>Social media engagement metrics</li>
      </ul>
      
      <h3>Industry Trend Monitoring</h3>
      <p>Track broader market movements and consumer behavior:</p>
      <ul>
        <li>Seasonal demand patterns</li>
        <li>Emerging product categories</li>
        <li>Consumer preference shifts</li>
        <li>Technology adoption trends</li>
        <li>Economic factors impacting purchasing</li>
      </ul>
      
      <h2>Data Collection and Analysis</h2>
      
      <h3>Automated Monitoring Systems</h3>
      <p>Implement tools that continuously track market changes:</p>
      <ul>
        <li>Price monitoring across competitors</li>
        <li>Product availability tracking</li>
        <li>Review and rating aggregation</li>
        <li>Social media sentiment analysis</li>
        <li>Search trend analysis</li>
      </ul>
      
      <h3>Customer Behavior Analytics</h3>
      <p>Analyze internal data to understand customer patterns:</p>
      <ul>
        <li>Purchase history and frequency</li>
        <li>Browsing behavior analysis</li>
        <li>Customer segmentation insights</li>
        <li>Churn prediction models</li>
        <li>Lifetime value calculations</li>
      </ul>
      
      <h2>Strategic Applications</h2>
      
      <h3>Pricing Optimization</h3>
      <p>Use market data to optimize pricing strategies:</p>
      <ul>
        <li>Dynamic pricing based on competitor analysis</li>
        <li>Demand-based pricing adjustments</li>
        <li>Promotional timing optimization</li>
        <li>Price elasticity testing</li>
      </ul>
      
      <h3>Product Strategy</h3>
      <p>Inform product decisions with market intelligence:</p>
      <ul>
        <li>New product opportunity identification</li>
        <li>Inventory optimization based on trends</li>
        <li>Product feature prioritization</li>
        <li>Market positioning strategies</li>
      </ul>
      
      <h3>Marketing Strategy</h3>
      <p>Enhance marketing effectiveness through data insights:</p>
      <ul>
        <li>Target audience refinement</li>
        <li>Content strategy optimization</li>
        <li>Channel performance analysis</li>
        <li>Campaign timing optimization</li>
      </ul>
      
      <h2>Technology and Tools</h2>
      
      <h3>Data Integration Platforms</h3>
      <p>Centralize data from multiple sources for comprehensive analysis:</p>
      <ul>
        <li>API integrations with major platforms</li>
        <li>Real-time data processing</li>
        <li>Custom dashboard creation</li>
        <li>Automated reporting systems</li>
      </ul>
      
      <h3>Analytics and Visualization</h3>
      <p>Transform raw data into actionable insights:</p>
      <ul>
        <li>Interactive dashboard interfaces</li>
        <li>Trend visualization tools</li>
        <li>Predictive analytics models</li>
        <li>Alert systems for significant changes</li>
      </ul>
      
      <h2>Implementation Best Practices</h2>
      <p>Successful market intelligence implementation requires:</p>
      <ul>
        <li>Clear objectives and KPI definition</li>
        <li>Regular data quality audits</li>
        <li>Cross-functional team collaboration</li>
        <li>Continuous refinement of analysis methods</li>
      </ul>
      
      <h2>Future of Market Intelligence</h2>
      <p>Advanced technologies are enhancing market intelligence capabilities:</p>
      <ul>
        <li>Predictive analytics for demand forecasting</li>
        <li>Advanced algorithms for pattern recognition</li>
        <li>Real-time competitive monitoring</li>
        <li>Automated insight generation</li>
      </ul>
      
      <p>Organizations that effectively leverage market intelligence gain significant competitive advantages through better decision-making, improved customer understanding, and more agile responses to market changes.</p>
    `,
    author: 'Jane Smith',
    date: '2023-12-15',
    category: 'Marketpulse',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>E-commerce Optimization Blog | Stell Media</title>
        <meta name="description" content="Expert insights on e-commerce optimization, SEO strategies, product discovery, data enrichment, and conversion optimization. Stay updated with the latest trends and best practices." />
        <meta name="keywords" content="e-commerce blog, SEO insights, product discovery, data enrichment, conversion optimization, e-commerce trends" />
        <link rel="canonical" href="https://stellmedia.com/blog" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Blog Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              E-commerce Optimization Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights and strategies to help you optimize your e-commerce business, 
              from search enhancement to conversion optimization.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <OptimizedImage
                  src={post.image}
                  alt={`${post.title} - Blog post featured image`}
                  className="w-full h-48 object-cover"
                  width={400}
                  height={200}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                      <Tag size={12} className="inline mr-1" />
                      {post.category}
                    </span>
                    <time className="text-gray-500 text-sm flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User size={12} className="mr-1" />
                      {post.author}
                    </div>
                    
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
                    >
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No results message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('');}}
                className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to optimize your e-commerce business?
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Get personalized strategies and expert guidance to accelerate your growth.
            </p>
            <Link 
              to="/consultation"
              className="bg-white text-indigo-700 px-8 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors inline-block"
            >
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
