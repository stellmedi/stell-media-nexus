import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPost from '@/components/blog/BlogPost';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPostPage: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  const { data: post, isLoading, error } = useBlogPost(postId || '');
  
  React.useEffect(() => {
    if (!isLoading && !post && !error) {
      navigate('/blog');
    }
  }, [post, isLoading, error, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    return null;
  }
  
  const author = {
    name: post.author || 'Stell Media Team',
    image: undefined
  };

  const canonicalUrl = `https://stellmedia.com/blog/${post.slug}`;
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Stell Media Blog</title>
        <meta name="description" content={post.excerpt || ''} />
        <meta property="og:title" content={`${post.title} | Stell Media Blog`} />
        <meta property="og:description" content={post.excerpt || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={post.image_url || ''} />
        {post.published_at && (
          <meta property="article:published_time" content={new Date(post.published_at).toISOString()} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <BlogPost
            id={post.slug}
            title={post.title}
            description={post.excerpt || ''}
            content={post.content}
            image={post.image_url || ''}
            publishDate={post.published_at ? new Date(post.published_at).toISOString() : new Date().toISOString()}
            author={author}
            categories={post.category ? [post.category] : []}
            url={canonicalUrl}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
