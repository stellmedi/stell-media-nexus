
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data interfaces
interface ContentItem {
  id: string;
  title: string;
  type: "page" | "blog" | "faq";
  status: "published" | "draft";
  lastUpdated: string;
  author: string;
}

interface MediaItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedOn: string;
  url: string;
}

// Mock data
const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Home Page",
    type: "page",
    status: "published",
    lastUpdated: "2023-05-10",
    author: "Admin User",
  },
  {
    id: "2",
    title: "About Us",
    type: "page",
    status: "published",
    lastUpdated: "2023-05-11",
    author: "Admin User",
  },
  {
    id: "3",
    title: "Top 10 SEO Strategies for E-commerce",
    type: "blog",
    status: "published",
    lastUpdated: "2023-05-15",
    author: "Content Editor",
  },
  {
    id: "4",
    title: "Product Discovery Guide",
    type: "blog",
    status: "draft",
    lastUpdated: "2023-05-18",
    author: "Content Editor",
  },
  {
    id: "5",
    title: "FAQ Page",
    type: "faq",
    status: "published",
    lastUpdated: "2023-05-12",
    author: "Admin User",
  },
];

const mockMedia: MediaItem[] = [
  {
    id: "1",
    name: "hero-image.jpg",
    type: "image/jpeg",
    size: "1.2 MB",
    uploadedBy: "Admin User",
    uploadedOn: "2023-05-10",
    url: "/placeholder.svg",
  },
  {
    id: "2",
    name: "product-demo.mp4",
    type: "video/mp4",
    size: "15.8 MB",
    uploadedBy: "Content Editor",
    uploadedOn: "2023-05-15",
    url: "/placeholder.svg",
  },
  {
    id: "3",
    name: "company-logo.png",
    type: "image/png",
    size: "0.5 MB",
    uploadedBy: "Admin User",
    uploadedOn: "2023-05-05",
    url: "/placeholder.svg",
  },
];

const ContentManagement = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [contentItems, setContentItems] = useState<ContentItem[]>(mockContent);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMedia);

  // Check authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // Filter content based on search term
  const filteredContent = contentItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter media based on search term
  const filteredMedia = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete content handler
  const handleDeleteContent = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
  };

  // Delete media handler
  const handleDeleteMedia = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Content Management</h1>
        
        <div className="mb-6 flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search content or media..."
              className="pl-9"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="ml-4">
            <Plus className="mr-2 h-4 w-4" /> Create New
          </Button>
        </div>
        
        <Tabs defaultValue="pages" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
          </TabsList>
          
          {/* Pages Tab */}
          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Page Management</CardTitle>
                <CardDescription>
                  Create, edit and manage your website pages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>List of all website pages.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent
                      .filter(item => item.type === "page")
                      .map(page => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium">{page.title}</TableCell>
                          <TableCell>
                            <Badge variant={page.status === "published" ? "default" : "secondary"}>
                              {page.status === "published" ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>{page.lastUpdated}</TableCell>
                          <TableCell>{page.author}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteContent(page.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Blog Posts Tab */}
          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Blog Post Management</CardTitle>
                <CardDescription>
                  Create, edit and manage your blog posts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>List of all blog posts.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent
                      .filter(item => item.type === "blog")
                      .map(post => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>
                            <Badge variant={post.status === "published" ? "default" : "secondary"}>
                              {post.status === "published" ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>{post.lastUpdated}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteContent(post.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* FAQs Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>FAQ Management</CardTitle>
                <CardDescription>
                  Create, edit and manage your frequently asked questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>List of all FAQ content.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent
                      .filter(item => item.type === "faq")
                      .map(faq => (
                        <TableRow key={faq.id}>
                          <TableCell className="font-medium">{faq.title}</TableCell>
                          <TableCell>
                            <Badge variant={faq.status === "published" ? "default" : "secondary"}>
                              {faq.status === "published" ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>{faq.lastUpdated}</TableCell>
                          <TableCell>{faq.author}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteContent(faq.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Media Library Tab */}
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Media Library</CardTitle>
                <CardDescription>
                  Manage all images, videos, and documents used on your website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Button>Upload New Media</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMedia.map(media => (
                    <Card key={media.id} className="overflow-hidden">
                      {media.type.startsWith("image/") ? (
                        <div className="aspect-square bg-gray-100 relative">
                          <img 
                            src={media.url} 
                            alt={media.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : (
                        <div className="aspect-square bg-gray-100 flex items-center justify-center">
                          <div className="text-4xl text-gray-400">
                            {media.type.includes("video") ? "🎬" : "📄"}
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-1 truncate" title={media.name}>
                          {media.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {media.type} • {media.size}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {media.uploadedOn}
                          </span>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteMedia(media.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;
