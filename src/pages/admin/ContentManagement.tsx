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
import { Search, Plus, Edit, Trash, Eye, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContentForm, { ContentFormValues } from "@/components/admin/ContentForm";
import { MediaManager } from "@/components/admin/MediaManager";
import { ContactFormConfiguration } from "@/components/admin/ContactFormConfiguration";

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
    content: "E-commerce websites face unique challenges when it comes to search engine optimization. In this post, we'll explore the top 10 most effective strategies for improving your online store's visibility in search results and driving more organic traffic. From technical SEO fundamentals to content optimization and user experience improvements, these proven tactics will help your products rank higher and convert better.\n\n## 1. Optimize Product Pages\nEach product page should have unique, detailed descriptions with relevant keywords. Avoid using manufacturer descriptions and create original content that answers potential customer questions.\n\n## 2. Implement Schema Markup\nStructured data helps search engines understand your content better. For e-commerce, use Product schema to highlight prices, availability, and reviews directly in search results."
  },
  {
    id: "2",
    title: "Product Discovery Guide",
    type: "blog",
    status: "draft",
    lastUpdated: "2023-05-18",
    author: "Content Editor",
    content: "Draft content for Product Discovery Guide - coming soon!"
  },
  {
    id: "3",
    title: "The Future of Data Enrichment",
    type: "blog",
    status: "published",
    lastUpdated: "2023-05-20",
    author: "Content Editor",
    content: "Data enrichment has evolved significantly over the past decade, transforming from basic data appending to sophisticated AI-powered insights generation. This post explores where the field is heading and how businesses should prepare.\n\n## The Evolution of Data Enrichment\n\nTraditionally, data enrichment meant adding missing fields to customer records - phone numbers, addresses, or basic demographic information. Today, it encompasses behavioral analysis, predictive modeling, and real-time personalization capabilities.\n\n## AI-Powered Enrichment\n\nMachine learning algorithms can now identify patterns in seemingly unrelated data points, creating rich customer profiles that predict future behaviors and preferences with remarkable accuracy."
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
    content: "## Frequently Asked Questions\n\n### What services does Stell Media offer?\nStell Media offers a comprehensive suite of digital marketing services including SEO, SEM, product discovery, data enrichment, and conversion optimization tailored specifically for e-commerce businesses.\n\n### How do you measure success?\nWe establish clear KPIs at the beginning of each engagement, focusing on metrics that directly impact your bottom line such as conversion rates, organic traffic growth, and ROI.\n\n### Do you work with small businesses?\nYes, we work with businesses of all sizes. Our solutions are scalable and can be tailored to meet your specific needs and budget."
  },
  {
    id: "2",
    title: "Common SEO Questions",
    type: "faq",
    status: "published",
    lastUpdated: "2023-05-14",
    author: "Content Editor",
    content: "## Common SEO Questions\n\n### How long does SEO take to show results?\nSEO is a long-term strategy. While some improvements may be visible within weeks, significant results typically take 3-6 months, depending on your industry competition, website history, and the strategies implemented.\n\n### Is SEO still relevant with AI and voice search?\nAbsolutely. While search technologies evolve, the fundamental need to optimize content for discoverability remains essential. Modern SEO incorporates these new technologies rather than being replaced by them.\n\n### How often should I update my SEO strategy?\nSEO requires ongoing attention. We recommend quarterly strategy reviews with monthly tactical adjustments based on performance data and search engine algorithm updates."
  }
];

// Mock content for pages
const mockPageContent = {
  "/": "Welcome to Stell Media, your partner for e-commerce growth through innovative digital solutions. We combine technology with human expertise to deliver transformative results for businesses seeking to thrive in the digital marketplace.",
  "/about": "Stell Media was founded with a mission to help e-commerce businesses achieve sustainable growth through innovative digital solutions. With years of experience across Fortune 500 companies and high-growth enterprises, our team brings expertise in digital transformation, marketing automation, and AI-powered strategies.",
  "/services": "Explore our comprehensive suite of services designed specifically for e-commerce businesses. From product discovery to data enrichment, SEO, SEM, and conversion optimization, we offer tailored solutions to help you grow your online presence and increase revenue.",
  "/contact": "Get in touch with our team of experts to discuss how we can help your e-commerce business thrive. Whether you're looking for a specific service or need guidance on developing a comprehensive digital strategy, we're here to help.",
  "/consultation": "Book a free consultation with our experts to discuss your e-commerce challenges and discover how our innovative solutions can help you achieve your business goals. Our team will analyze your current situation and provide tailored recommendations.",
  "/blog": "Stay updated with the latest trends, insights, and best practices in e-commerce, digital marketing, and technology. Our blog features expert articles, case studies, and practical tips to help you grow your online business.",
  "/careers": "Join our team of passionate professionals dedicated to transforming the e-commerce landscape. We offer a collaborative culture, continuous learning opportunities, and the chance to work with innovative technologies and strategies.",
  "/faq": "Find answers to commonly asked questions about our services, methodologies, and approaches. If you can't find what you're looking for, don't hesitate to contact us directly.",
  "/case-studies": "Explore our success stories and learn how we've helped businesses overcome challenges and achieve remarkable growth through our tailored digital solutions and innovative approaches."
};

// Mock content for service pages
const mockServiceContent = {
  "/services/product-discovery": "Our Product Discovery service helps e-commerce businesses improve how customers find and engage with their products. We optimize search functionality, implement AI-driven recommendations, and enhance navigation to create intuitive shopping experiences that drive conversions.",
  "/services/data-enrichment": "Transform your product data into a powerful business asset with our Data Enrichment services. We clean, enhance, and structure your product information to improve searchability, enable personalization, and create consistent cross-channel experiences.",
  "/services/seo": "Our SEO services are designed specifically for e-commerce, focusing on product page optimization, category structure, technical performance, and content strategy to improve organic visibility and drive qualified traffic to your online store.",
  "/services/sem": "Maximize your return on ad spend with our SEM services. We develop and manage targeted paid search campaigns that capture high-intent shoppers and drive them to conversion, with continuous optimization based on performance data.",
  "/services/conversion-optimization": "Turn more visitors into customers with our Conversion Rate Optimization services. We analyze user behavior, identify friction points, and implement data-driven improvements to your website's user experience, checkout process, and overall design.",
  "/services/search-migration": "Seamlessly transition to new search technology with our Search Migration services. We ensure consistent performance, preserve historical data, and leverage new capabilities to enhance your site's search functionality.",
  "/services/marketpulse": "Stay ahead of market trends with our MarketPulse service. We monitor competitor activity, track emerging customer preferences, and provide actionable insights to help you maintain a competitive edge in your industry."
};

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

// Added preview dialog state
interface PreviewDialogState {
  isOpen: boolean;
  content: string;
  title: string;
}

// Added contact form configuration state
interface ContactFormConfig {
  // Define configuration fields here
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
  
  // New state for content preview
  const [previewDialog, setPreviewDialog] = useState<PreviewDialogState>({
    isOpen: false,
    content: "",
    title: ""
  });
  
  // New state for contact form configuration
  const [contactFormConfigOpen, setContactFormConfigOpen] = useState(false);
  const [isContactPage, setIsContactPage] = useState(false);
  
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

  // Function to get mock content based on type and ID
  const getMockContent = (type: string, id: string): string => {
    if (type === "blog") {
      const post = mockBlogPosts.find(post => post.id === id);
      return post?.content || "";
    } else if (type === "faq") {
      const faq = mockFAQs.find(faq => faq.id === id);
      return faq?.content || "";
    } else if (type === "page") {
      return mockPageContent[id as keyof typeof mockPageContent] || "";
    } else if (type === "service") {
      return mockServiceContent[id as keyof typeof mockServiceContent] || "";
    }
    return "";
  };

  // Open preview dialog
  const openPreview = (type: string, id: string, title: string) => {
    const content = getMockContent(type, id);
    setPreviewDialog({
      isOpen: true,
      content,
      title
    });
  };

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
  
  // New edit content handler with content loading and special handling for contact page
  const handleEditContent = (id: string, type: string) => {
    setEditMode(true);
    setCurrentEditId(id);
    setIsSystemPage(type === "page" || type === "service");
    
    // Check if this is the contact page to show the contact form config button
    const isContactPageEdit = id === "/contact-Contact" || id.includes("contact");
    setIsContactPage(isContactPageEdit);
    
    // Populate form with content data based on type
    if (type === "blog") {
      const post = blogPosts.find(post => post.id === id);
      if (post) {
        setFormDefaultValues({
          title: post.title,
          type: "blog",
          content: post.content || "", // Get actual content
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
          content: faq.content || "", // Get actual content
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
        const content = type === "page" 
          ? mockPageContent[page.path as keyof typeof mockPageContent] || ""
          : mockServiceContent[page.path as keyof typeof mockServiceContent] || "";
          
        setFormDefaultValues({
          title: page.name,
          type: page.type,
          content: content, // Get mock content for the page
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
                  content: values.content, // Update content
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
                  content: values.content, // Update content
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
          content: values.content, // Include content
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
          content: values.content, // Include content
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

  // View content handler - for blog and FAQ
  const handleViewContentItem = (id: string, type: string, title: string) => {
    openPreview(type, id, title);
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
                setIsContactPage(false);
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
              
              {/* Add Contact Form Config Button when editing contact page */}
              {isContactPage && (
                <div className="mb-4">
                  <Dialog open={contactFormConfigOpen} onOpenChange={setContactFormConfigOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Settings className="mr-2 h-4 w-4" /> Configure Contact Form Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Contact Form Settings</DialogTitle>
                        <DialogDescription>
                          Configure the contact forms on this page.
                        </DialogDescription>
                      </DialogHeader>
                      <ContactFormConfiguration onClose={() => setContactFormConfigOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              
              <ContentForm 
                defaultValues={formDefaultValues} 
                onSubmit={handleSubmitContent}
                onCancel={() => setDialogOpen(false)}
                isEditMode={editMode}
                isSystemPage={isSystemPage}
              />
            </DialogContent>
          </Dialog>
          
          {/* Content Preview Dialog */}
          <Dialog 
            open={previewDialog.isOpen} 
            onOpenChange={(open) => setPreviewDialog(prev => ({ ...prev, isOpen: open }))}
          >
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{previewDialog.title}</DialogTitle>
                <DialogDescription>Preview of the content</DialogDescription>
              </DialogHeader>
              <div className="mt-4 p-4 border rounded-md bg-white">
                <div className="prose max-w-none">
                  {previewDialog.content.split('\n').map((paragraph, i) => (
                    paragraph.startsWith('##') ? (
                      <h3 key={i} className="text-lg font-bold mt-4 mb-2">
                        {paragraph.replace(/^##\s/, '')}
                      </h3>
                    ) : paragraph.startsWith('#') ? (
                      <h2 key={i} className="text-xl font-bold mt-6 mb-3">
                        {paragraph.replace(/^#\s/, '')}
                      </h2>
                    ) : paragraph ? (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ) : <br key={i} />
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setPreviewDialog(prev => ({ ...prev, isOpen: false }))}
                >
                  Close Preview
                </Button>
              </div>
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
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleViewContentItem(post.id, "blog", post.title)}
                              >
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
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleViewContentItem(faq.id, "faq", faq.title)}
                              >
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
