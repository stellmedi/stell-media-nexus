
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPost from '@/components/blog/BlogPost';

// Import the same blog post data from Blog.tsx
import { blogPosts } from './Blog';

const BlogPostPage: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  // Find the blog post with the matching ID
  const post = blogPosts.find(post => post.id === postId);
  
  // Move useEffect outside of conditional - hooks must always be called in the same order
  React.useEffect(() => {
    // If no post is found, redirect to the blog index
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);
  
  // If no post is found, return null (the useEffect will handle the redirect)
  if (!post) {
    return null;
  }
  
  const author = {
    name: post.author,
    image: undefined // We don't have author images in the data
  };

  // Generate canonical URL for this blog post
  const canonicalUrl = `https://stellmedia.com/blog/${post.id}`;
  
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>{post.title} | Stell Media Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Stell Media Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <BlogPost
            id={post.id}
            title={post.title}
            description={post.excerpt}
            content={post.content}
            image={post.image}
            publishDate={new Date(post.date).toISOString()}
            author={author}
            categories={[post.category]}
            url={canonicalUrl}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
