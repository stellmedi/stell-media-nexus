
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Tag,
  Eye,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  status: 'draft' | 'published' | 'scheduled';
  publishDate: string;
  tags: string[];
  author: string;
}

const BlogManager: React.FC = () => {
  const [posts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'AI in Education: The Future is Here',
      excerpt: 'Exploring how artificial intelligence is transforming educational experiences...',
      status: 'published',
      publishDate: '2024-01-15',
      tags: ['AI', 'Education', 'Technology'],
      author: 'Admin'
    },
    {
      id: '2',
      title: 'Data Analytics for Business Growth',
      excerpt: 'How businesses can leverage data analytics to drive growth and innovation...',
      status: 'draft',
      publishDate: '2024-01-20',
      tags: ['Analytics', 'Business', 'Growth'],
      author: 'Admin'
    }
  ]);

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800'
  };

  const handleNewPost = () => {
    toast.success("Opening new post editor...");
  };

  const handleEditPost = (postId: string) => {
    toast.info(`Editing post ${postId}`);
  };

  const handleDeletePost = (postId: string) => {
    toast.success(`Post ${postId} deleted`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        <Button onClick={handleNewPost} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                </div>
                <Badge className={`${statusColors[post.status]} text-xs`}>
                  {post.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.publishDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    {post.tags.join(', ')}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditPost(post.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
