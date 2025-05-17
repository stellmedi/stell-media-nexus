import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const blogPosts = [
  {
    id: "ai-search-fashion",
    title: "How AI Improved Search Conversions by 42% for a Fashion Retailer",
    excerpt: "Learn how our team implemented machine learning algorithms and AI-powered search optimization to deliver dramatically better search results and user engagement.",
    category: "AI Case Study",
    date: "May 14, 2025",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "Sarah Johnson",
    authorRole: "AI Product Discovery Specialist",
    content: "Artificial intelligence is revolutionizing how consumers find products in e-commerce. In this case study, we examine how our team implemented custom machine learning algorithms to significantly improve search relevance and accuracy for a major fashion retailer.<br><br>Our client, a multinational fashion retailer with over 500 stores worldwide and a robust online presence, was struggling with search functionality on their e-commerce platform. Customers frequently reported difficulty finding products they were looking for, even when using specific search terms. The search abandonment rate was at an alarming 35%, and the conversion rate from search was well below industry standards.<br><br><h2>The Challenge</h2><br>The retailer faced several significant search-related challenges:<br><ul><li>Poor search relevance, especially for non-exact keyword matches</li><li>Inability to understand synonyms and related terms</li><li>No accommodation for common misspellings</li><li>Limited personalization in search results</li><li>Ineffective handling of long-tail search queries</li></ul><br><h2>Our Approach</h2><br>Our team designed a comprehensive AI-powered search solution with these key components:<br><br><h3>1. Natural Language Processing</h3><br>We implemented advanced NLP algorithms to better understand user intent behind search queries. This included:<br><ul><li>Semantic understanding of search terms</li><li>Context awareness for ambiguous terms</li><li>Query expansion to include relevant synonyms</li></ul><br><h3>2. Machine Learning Ranking Model</h3><br>We developed a custom ML model that continuously improved search result ranking based on user behavior data:<br><ul><li>Click-through rates</li><li>Add-to-cart actions</li><li>Purchases</li><li>Time spent viewing products</li></ul><br><h3>3. Personalization Layer</h3><br>We introduced personalized search results based on:<br><ul><li>User browsing history</li><li>Previous purchases</li><li>Category preferences</li><li>Seasonal trends</li></ul><br><h2>Implementation Process</h2><br>The project was executed in phases:<br><ol><li><strong>Data Collection and Analysis</strong>: Gathering historical search data, user behavior, and product catalog information</li><li><strong>Algorithm Development</strong>: Creating and training the ML models</li><li><strong>A/B Testing</strong>: Comparing the new search system against the existing one with real users</li><li><strong>Refinement</strong>: Iteratively improving the algorithms based on test results</li><li><strong>Full Deployment</strong>: Rolling out the solution to all users</li></ol><br><h2>Results</h2><br>The impact of our AI-powered search solution was substantial:<br><ul><li><strong>42% increase</strong> in search conversion rate</li><li><strong>25% decrease</strong> in search abandonment</li><li><strong>37% improvement</strong> in average order value from search</li><li><strong>18% increase</strong> in overall site conversion rate</li></ul><br>Additionally, customer satisfaction metrics showed marked improvement, with search-related customer support tickets decreasing by 32%.<br><br><h2>Conclusion</h2><br>This case study demonstrates the transformative power of AI-driven search optimization in e-commerce. By understanding user intent and delivering highly relevant, personalized results, retailers can significantly improve the customer experience and drive substantial business results.<br><br>Our approach not only solved the immediate search challenges but also established a foundation for ongoing search improvement through machine learning that continues to refine results based on evolving user behavior and preferences."
  },
  {
    id: "product-data-enrichment",
    title: "Automating Product Data Enrichment: The Complete Guide",
    excerpt: "Discover how automated data processing and AI can transform messy product data into structured, actionable information that powers better e-commerce experiences.",
    category: "Automation Guide",
    date: "May 10, 2025",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRhdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "James Wilson",
    authorRole: "Head of Data Science",
    content: "Product data is the foundation of e-commerce success, but many businesses struggle with inconsistent, incomplete, or disorganized data. This comprehensive guide explores how automation can clean, enrich, and optimize your product data at scale."
  },
  {
    id: "ai-navigation-innovations",
    title: "5 AI-Powered E-Commerce Navigation Innovations That Boost Conversions",
    excerpt: "How machine learning is transforming category structures and filtering options to create more intuitive product discovery experiences for online shoppers.",
    category: "AI Innovations",
    date: "May 5, 2025",
    image: "https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "Maria Rodriguez",
    authorRole: "AI UX Specialist",
    content: "The e-commerce navigation experience is undergoing a profound transformation thanks to artificial intelligence. This article explores five cutting-edge AI applications that are making product discovery more intuitive and personalized."
  },
  {
    id: "visual-search-revolution",
    title: "The Rise of Visual Search: How AI is Transforming Product Discovery",
    excerpt: "With consumers increasingly using image-based search, learn how computer vision and machine learning are creating powerful new ways to shop online.",
    category: "AI Trends",
    date: "April 28, 2025",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "David Chen",
    authorRole: "CTO",
    content: "Visual search technology is changing how consumers find and purchase products online. Instead of searching with text, shoppers can now simply upload images to find similar or complementary items."
  },
  {
    id: "hybrid-commerce",
    title: "Hybrid Commerce: Bridging Digital and Physical Retail Through Technology",
    excerpt: "How innovative retailers are creating seamless shopping experiences by integrating online and offline channels through AI and connected technology.",
    category: "Hybrid Commerce",
    date: "April 21, 2025",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkdmVydGlzaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "Alex Thompson",
    authorRole: "Head of Hybrid Solutions",
    content: "The future of retail isn't just online or offline—it's a seamless blend of both. This article explores how leading retailers are creating hybrid commerce experiences that combine the best aspects of digital and physical shopping."
  },
  {
    id: "ecommerce-automation",
    title: "Automation for E-Commerce: Beyond Basic Product Management",
    excerpt: "How intelligent automation is revolutionizing every aspect of online retail from inventory management to customer service and personalization.",
    category: "Automation",
    date: "April 15, 2025",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "Sophia Lee",
    authorRole: "Head of Automation",
    content: "Automation in e-commerce has evolved far beyond basic product feeds and inventory updates. Today's intelligent automation systems are transforming every aspect of online retail operations."
  },
  {
    id: "ai-product-recommendations",
    title: "The Future of AI in E-Commerce Product Recommendations",
    excerpt: "How neural networks and advanced machine learning are creating increasingly sophisticated and effective product recommendation engines.",
    category: "AI Research",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "Ryan Park",
    authorRole: "AI Research Engineer",
    content: "Product recommendations have come a long way from simple 'customers also bought' algorithms. This deep dive explores the latest advancements in AI-powered recommendation engines."
  },
  {
    id: "chatbots-virtual-assistants",
    title: "How Chatbots and Virtual Assistants are Reshaping E-Commerce Support",
    excerpt: "The evolution of AI-powered customer service tools and how they're creating more responsive, personalized shopping experiences.",
    category: "AI Applications",
    date: "April 5, 2025",
    image: "https://images.unsplash.com/photo-1559003287-cd4e9122ce3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "Michelle Wong",
    authorRole: "AI Conversation Designer",
    content: "Customer support in e-commerce is undergoing a significant transformation thanks to AI-powered chatbots and virtual assistants. These tools are not only reducing response times but creating more personalized shopping experiences."
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  const handleReadArticle = (postId: string) => {
    // Navigate to the blog post detail page
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Blog
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Insights, strategies, and case studies on AI-powered e-commerce, automation, hybrid solutions, and the future of product discovery.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Featured Article</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video" 
                />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">{featuredPost.date}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{featuredPost.excerpt}</p>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-medium text-gray-900">{featuredPost.author}</p>
                    <p className="text-gray-500 text-sm">{featuredPost.authorRole}</p>
                  </div>
                </div>
                <Button onClick={() => handleReadArticle(featuredPost.id)} className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Recent Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.slice(0, 6).map((post, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-md transition-shadow bg-white cursor-pointer"
                  onClick={() => handleReadArticle(post.id)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.date}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                        <span className="text-sm">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100">
                        Read more
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
                Stay updated with the latest insights on AI in e-commerce, automation strategies, and hybrid commerce solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md flex-1 text-gray-900"
                />
                <Button className="bg-white text-indigo-700 hover:bg-gray-100 active:bg-gray-200">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
