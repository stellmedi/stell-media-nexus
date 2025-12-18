import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/OptimizedImage";
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useBlogPosts, useBlogCategories } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { data: blogPosts = [], isLoading: postsLoading } = useBlogPosts({ 
    category: selectedCategory === 'All' ? undefined : selectedCategory 
  });
  const { data: categories = ['All'], isLoading: categoriesLoading } = useBlogCategories();

  const isLoading = postsLoading || categoriesLoading;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Digital Marketing Blog | Stell Media - SEO & E-commerce Insights</title>
        <meta name="description" content="Expert insights on SEO, e-commerce optimization, performance marketing, and digital growth strategies. Stay updated with the latest trends and best practices." />
        <meta name="keywords" content="digital marketing blog, SEO tips, e-commerce optimization, performance marketing, conversion rate optimization" />
        <link rel="canonical" href="https://stellmedia.com/blog" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section 
        className="pt-28 pb-16 bg-gradient-to-br from-primary/5 to-primary/10"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Digital Marketing Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Expert tips, strategies, and best practices to help you grow your e-commerce business and improve your digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categoriesLoading ? (
              Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-full" />
              ))
            ) : (
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-card rounded-lg overflow-hidden shadow-lg">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-20 mb-4" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No blog posts found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={post.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.category && (
                        <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </span>
                        )}
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.published_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
