import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ContentForm, { ContentFormValues } from "@/components/admin/ContentForm";
import { MediaManager } from "@/components/admin/MediaManager";

// Define route structure to extract pages from App.tsx
interface Route {
  path: string;
  name: string;
  component: string;
  type: "page" | "blog" | "faq" | "service";
  status: "published" | "draft";
  lastUpdated: string;
  author: string;
}

// Real routes based on App.tsx
const appRoutes: Route[] = [
  { path: "/", name: "Home", component: "Index", type: "page", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/services", name: "Services", component: "Services", type: "page", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/about", name: "About", component: "About", type: "page", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/contact", name: "Contact", component: "Contact", type: "page", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/consultation", name: "Consultation", component: "Consultation", type: "page", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/blog", name: "Blog", component: "Blog", type: "page", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/careers", name: "Careers", component: "Careers", type: "page", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/faq", name: "FAQ", component: "FAQ", type: "page", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/case-studies", name: "Case Studies", component: "Services", type: "page", status: "draft", lastUpdated: "2023-06-01", author: "Admin" },
  // Service pages
  { path: "/services/product-discovery", name: "Product Discovery", component: "ProductDiscovery", type: "service", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/services/data-enrichment", name: "Data Enrichment", component: "DataEnrichment", type: "service", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/services/seo", name: "SEO", component: "SEO", type: "service", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/services/sem", name: "SEM", component: "SEM", type: "service", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/services/conversion-optimization", name: "Conversion Optimization", component: "ConversionOptimization", type: "service", status: "published", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/services/search-migration", name: "Search Migration", component: "ProductDiscovery", type: "service", status: "draft", lastUpdated: "2023-06-01", author: "Admin" },
  { path: "/services/marketpulse", name: "MarketPulse", component: "DataEnrichment", type: "service", status: "draft", lastUpdated: "2023-06-01", author: "Admin" },
];

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: "1",
    title: "Top 10 SEO Strategies for E-commerce",
    type: "blog",
    status: "published",
    lastUpdated: "2023-05-15",
    author: "Content Editor",
  },
  {
    id: "2",
    title: "Product Discovery Guide",
    type: "blog",
    status: "draft",
    lastUpdated: "2023-05-18",
    author: "Content Editor",
  },
  {
    id: "3",
    title: "The Future of Data Enrichment",
    type: "blog",
    status: "published",
    lastUpdated: "2023-05-20",
    author: "Content Editor",
  },
];

// Mock data for FAQs
const mockFAQs = [
  {
    id: "1",
    title: "FAQ Page",
    type: "faq",
    status: "published",
    lastUpdated: "2023-05-12",
    author: "Admin User",
  },
  {
    id: "2",
    title: "Common SEO Questions",
    type: "faq",
    status: "published",
    lastUpdated: "2023-05-14",
    author: "Content Editor",
  }
];

// Mock data for media items
interface MediaItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedOn: string;
  url: string;
}

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

// Content Item Type
interface ContentItem {
  id: string;
  title: string;
  type: "page" | "blog" | "faq" | "service";
  status: "published" | "draft";
  lastUpdated: string;
  author: string;
}

// New content form state
interface ContentFormData {
  title: string;
  type: "page" | "blog" | "faq" | "service";
  content: string;
  status: "published" | "draft";
}

const ContentManagement = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pages");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Initialize content state from routes and mock data
  const [pages, setPages] = useState<Route[]>([]);
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [faqs, setFaqs] = useState(mockFAQs);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMedia);
  
  // Add state for edit mode
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string>("");
  const [isSystemPage, setIsSystemPage] = useState(false);
  
  // Form default values
  const [formDefaultValues, setFormDefaultValues] = useState<ContentFormValues>({
    title: "",
    type: "page",
    content: "",
    status: "draft",
    slug: "",
    language: "en",
    author: user?.name || "Admin User",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    noIndex: false,
    noFollow: false,
    ogTitle: "",
    ogDescription: "",
    twitterTitle: "",
    twitterDescription: "",
    schemaType: "None",
  });
  
  // Load page data on component mount
  useEffect(() => {
    // Get all pages and services from routes
    const pageRoutes = appRoutes.filter(route => route.type === "page");
    const serviceRoutes = appRoutes.filter(route => route.type === "service");
    
    // Combine them as pages for display
    setPages([...pageRoutes, ...serviceRoutes]);
  }, []);

  // Set author when user changes
  useEffect(() => {
    if (user?.name && !editMode) {
      setFormDefaultValues(prev => ({
        ...prev,
        author: user.name || "Admin User"
      }));
    }
  }, [user, editMode]);

  // Check authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // Filter content based on search term
  const filteredPages = pages.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlogPosts = blogPosts.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaqs = faqs.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete content handler
  const handleDeleteContent = (id: string, type: string) => {
    if (type === "page" || type === "service") {
      toast.error("Cannot delete core pages. Please contact developer to remove routes.");
    } else if (type === "blog") {
      setBlogPosts(prev => prev.filter(item => item.id !== id));
      toast.success("Blog post deleted successfully");
    } else if (type === "faq") {
      setFaqs(prev => prev.filter(item => item.id !== id));
      toast.success("FAQ deleted successfully");
    }
  };

  // Delete media handler
  const handleDeleteMedia = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
    toast.success("Media deleted successfully");
  };
  
  // New edit content handler
  const handleEditContent = (id: string, type: string) => {
    setEditMode(true);
    setCurrentEditId(id);
    setIsSystemPage(type === "page" || type === "service");
    
    // Populate form with content data based on type
    if (type === "blog") {
      const post = blogPosts.find(post => post.id === id);
      if (post) {
        setFormDefaultValues({
          title: post.title,
          type: "blog",
          content: "", // In a real app, you would fetch the full content
          status: post.status as "published" | "draft",
          slug: `blog/${post.id}`,
          language: "en",
          author: post.author,
          metaTitle: post.title,
          metaDescription: "",
          canonicalUrl: "",
          noIndex: false,
          noFollow: false,
          ogTitle: "",
          ogDescription: "",
          twitterTitle: "",
          twitterDescription: "",
          schemaType: "Article",
        });
      }
    } else if (type === "faq") {
      const faq = faqs.find(faq => faq.id === id);
      if (faq) {
        setFormDefaultValues({
          title: faq.title,
          type: "faq",
          content: "", // In a real app, you would fetch the full content
          status: faq.status as "published" | "draft",
          slug: `faq/${faq.id}`,
          language: "en",
          author: faq.author,
          metaTitle: faq.title,
          metaDescription: "",
          canonicalUrl: "",
          noIndex: false,
          noFollow: false,
          ogTitle: "",
          ogDescription: "",
          twitterTitle: "",
          twitterDescription: "",
          schemaType: "FAQ",
        });
      }
    } else if (type === "page" || type === "service") {
      const pageIndex = filteredPages.findIndex(p => `${p.path}-${p.name}` === id);
      if (pageIndex >= 0) {
        const page = filteredPages[pageIndex];
        setFormDefaultValues({
          title: page.name,
          type: page.type,
          content: "", // In a real app, you would fetch the full content
          status: page.status,
          slug: page.path.substring(1), // Remove leading slash
          language: "en",
          author: page.author,
          metaTitle: page.name,
          metaDescription: "",
          canonicalUrl: "",
          noIndex: false,
          noFollow: false,
          ogTitle: "",
          ogDescription: "",
          twitterTitle: "",
          twitterDescription: "",
          schemaType: page.type === "service" ? "Service" : "None",
        });
        toast.info("System pages can only be partially edited. Some fields may be read-only.");
      }
    }
    
    // Open the dialog
    setDialogOpen(true);
  };
  
  // Handle form submission - create or update content
  const handleSubmitContent = (values: ContentFormValues) => {
    const newDate = new Date().toISOString().split('T')[0];
    const currentUser = user?.name || "Admin User";
    
    if (editMode) {
      // Update existing content
      if (values.type === "blog") {
        setBlogPosts(prev => 
          prev.map(post => 
            post.id === currentEditId 
              ? { 
                  ...post, 
                  title: values.title, 
                  status: values.status, 
                  lastUpdated: newDate,
                  author: values.author || currentUser
                }
              : post
          )
        );
        toast.success("Blog post updated successfully");
      } else if (values.type === "faq") {
        setFaqs(prev => 
          prev.map(faq => 
            faq.id === currentEditId 
              ? { 
                  ...faq, 
                  title: values.title, 
                  status: values.status, 
                  lastUpdated: newDate,
                  author: values.author || currentUser
                }
              : faq
          )
        );
        toast.success("FAQ updated successfully");
      } else if (values.type === "page" || values.type === "service") {
        // For system pages, we can only simulate an update (in a real app, this would be limited)
        toast.info("Page metadata updated. System page content updates require developer assistance for full changes");
      }
    } else {
      // Create new content
      const newId = Date.now().toString();
      
      if (values.type === "blog") {
        const newBlogPost = {
          id: newId,
          title: values.title,
          type: "blog" as "blog",
          status: values.status,
          lastUpdated: newDate,
          author: values.author || currentUser,
        };
        setBlogPosts(prev => [...prev, newBlogPost]);
        toast.success("Blog post created successfully");
      } else if (values.type === "faq") {
        const newFaq = {
          id: newId,
          title: values.title,
          type: "faq" as "faq",
          status: values.status,
          lastUpdated: newDate,
          author: values.author || currentUser,
        };
        setFaqs(prev => [...prev, newFaq]);
        toast.success("FAQ created successfully");
      } else if (values.type === "page") {
        toast.info("Custom pages require developer assistance for full creation. Page metadata saved.");
      }
    }
    
    // Reset form and dialog states
    resetFormState();
  };
  
  // View content handler
  const handleViewContent = (path: string) => {
    if (path.startsWith("/")) {
      // Open in a new tab
      window.open(path, "_blank");
    }
  };

  // Reset form state
  const resetFormState = () => {
    setFormDefaultValues({
      title: "",
      type: "page",
      content: "",
      status: "draft",
      slug: "",
      language: "en",
      author: user?.name || "Admin User",
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      noIndex: false,
      noFollow: false,
      ogTitle: "",
      ogDescription: "",
      twitterTitle: "",
      twitterDescription: "",
      schemaType: "None",
    });
    setEditMode(false);
    setCurrentEditId("");
    setIsSystemPage(false);
    setDialogOpen(false);
  };

  // Mock upload media handler
  const handleUploadMedia = (file: File) => {
    const newMediaItem: MediaItem = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadedBy: user?.name || "Admin User",
      uploadedOn: new Date().toISOString().split('T')[0],
      url: URL.createObjectURL(file), // In a real app, this would be a server URL
    };
    
    setMediaItems(prev => [...prev, newMediaItem]);
  };

  // Dialog title based on mode
  const dialogTitle = editMode ? "Edit Content" : "Create New Content";

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
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              resetFormState();
            }
          }}>
            <DialogTrigger asChild>
              <Button className="ml-4" onClick={() => {
                setEditMode(false);
                setCurrentEditId("");
                setIsSystemPage(false);
              }}>
                <Plus className="mr-2 h-4 w-4" /> Create New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogDescription>
                  {editMode ? "Update the details for this content." : "Enter the details for your new content."}
                </DialogDescription>
              </DialogHeader>
              
              <ContentForm 
                defaultValues={formDefaultValues} 
                onSubmit={handleSubmitContent}
                onCancel={() => setDialogOpen(false)}
                isEditMode={editMode}
                isSystemPage={isSystemPage}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="pages" value={activeTab} onValueChange={setActiveTab}>
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
                  All website pages and service pages are listed here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>List of all website pages.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Path</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPages.length > 0 ? (
                      filteredPages.map((page, index) => (
                        <TableRow key={`${page.path}-${index}`}>
                          <TableCell className="font-medium">{page.name}</TableCell>
                          <TableCell>{page.path}</TableCell>
                          <TableCell>
                            <Badge variant={page.status === "published" ? "default" : "secondary"}>
                              {page.status === "published" ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>{page.lastUpdated}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleViewContent(page.path)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditContent(`${page.path}-${page.name}`, page.type)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteContent(`${page.path}-${index}`, page.type)}
                                disabled={true}
                                title="System pages cannot be deleted"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">No pages found</TableCell>
                      </TableRow>
                    )}
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
                    {filteredBlogPosts.length > 0 ? (
                      filteredBlogPosts.map(post => (
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
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditContent(post.id, "blog")}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteContent(post.id, "blog")}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">No blog posts found</TableCell>
                      </TableRow>
                    )}
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
                    {filteredFaqs.length > 0 ? (
                      filteredFaqs.map(faq => (
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
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditContent(faq.id, "faq")}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteContent(faq.id, "faq")}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">No FAQs found</TableCell>
                      </TableRow>
                    )}
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
                <MediaManager 
                  mediaItems={mediaItems} 
                  onDeleteMedia={handleDeleteMedia}
                  onUploadMedia={handleUploadMedia}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;
