
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
  
  // If no post is found, redirect to the blog index
  if (!post) {
    React.useEffect(() => {
      navigate('/blog');
    }, [navigate]);
    return null;
  }
  
  const author = {
    name: post.author,
    image: undefined // We don't have author images in the data
  };
  
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>{post.title} | Stell Media Blog</title>
        <meta name="description" content={post.excerpt} />
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
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
