
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "How AI Improved Search Conversions by 42% for a Fashion Retailer",
    excerpt: "Learn how our team implemented machine learning algorithms and AI-powered search optimization to deliver dramatically better search results and user engagement.",
    category: "AI Case Study",
    date: "May 14, 2025",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "Sarah Johnson",
    authorRole: "AI Product Discovery Specialist"
  },
  {
    title: "Automating Product Data Enrichment: The Complete Guide",
    excerpt: "Discover how automated data processing and AI can transform messy product data into structured, actionable information that powers better e-commerce experiences.",
    category: "Automation Guide",
    date: "May 10, 2025",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRhdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "James Wilson",
    authorRole: "Head of Data Science"
  },
  {
    title: "5 AI-Powered E-Commerce Navigation Innovations That Boost Conversions",
    excerpt: "How machine learning is transforming category structures and filtering options to create more intuitive product discovery experiences for online shoppers.",
    category: "AI Innovations",
    date: "May 5, 2025",
    image: "https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "Maria Rodriguez",
    authorRole: "AI UX Specialist" 
  },
  {
    title: "The Rise of Visual Search: How AI is Transforming Product Discovery",
    excerpt: "With consumers increasingly using image-based search, learn how computer vision and machine learning are creating powerful new ways to shop online.",
    category: "AI Trends",
    date: "April 28, 2025",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "David Chen",
    authorRole: "CTO"
  },
  {
    title: "Hybrid Commerce: Bridging Digital and Physical Retail Through Technology",
    excerpt: "How innovative retailers are creating seamless shopping experiences by integrating online and offline channels through AI and connected technology.",
    category: "Hybrid Commerce",
    date: "April 21, 2025",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkdmVydGlzaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "Alex Thompson",
    authorRole: "Head of Hybrid Solutions"
  },
  {
    title: "Automation for E-Commerce: Beyond Basic Product Management",
    excerpt: "How intelligent automation is revolutionizing every aspect of online retail from inventory management to customer service and personalization.",
    category: "Automation",
    date: "April 15, 2025",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "Sophia Lee",
    authorRole: "Head of Automation"
  },
  {
    title: "The Future of AI in E-Commerce Product Recommendations",
    excerpt: "How neural networks and advanced machine learning are creating increasingly sophisticated and effective product recommendation engines.",
    category: "AI Research",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "Ryan Park",
    authorRole: "AI Research Engineer"
  },
  {
    title: "How Chatbots and Virtual Assistants are Reshaping E-Commerce Support",
    excerpt: "The evolution of AI-powered customer service tools and how they're creating more responsive, personalized shopping experiences.",
    category: "AI Applications",
    date: "April 5, 2025",
    image: "https://images.unsplash.com/photo-1559003287-cd4e9122ce3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "Michelle Wong",
    authorRole: "AI Conversation Designer"
  }
];

const featuredPost = blogPosts[0];
const regularPosts = blogPosts.slice(1);

const Blog = () => {
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
                <Button asChild className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100">
                  <Link to={`/blog/post-1`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow bg-white">
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
                      <Button variant="ghost" asChild size="sm" className="text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100">
                        <Link to={`/blog/post-${index + 2}`}>
                          Read more
                        </Link>
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
