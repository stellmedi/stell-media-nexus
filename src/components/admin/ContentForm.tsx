import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Eye, Edit, BarChart, Search, Copy, FileText, Link, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Enhanced Content form schema with expanded SEO validation
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  type: z.enum(["page", "blog", "faq", "service"]),
  content: z.string().optional(),
  status: z.enum(["published", "draft"]),
  slug: z.string().optional(),
  language: z.string().default("en"),
  author: z.string().optional(),
  
  // Enhanced SEO Fields
  metaTitle: z.string().max(60, { message: "Meta title should be 60 characters or less" }).optional(),
  metaDescription: z.string().max(160, { message: "Meta description should be 160 characters or less" }).optional(),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
  
  // Social media
  ogTitle: z.string().max(60, { message: "Open Graph title should be 60 characters or less" }).optional(),
  ogDescription: z.string().max(160, { message: "Open Graph description should be 160 characters or less" }).optional(),
  ogImage: z.string().optional(),
  twitterTitle: z.string().max(60, { message: "Twitter title should be 60 characters or less" }).optional(),
  twitterDescription: z.string().max(160, { message: "Twitter description should be 160 characters or less" }).optional(),
  twitterImage: z.string().optional(),
  
  // AI-specific metadata
  aiDescription: z.string().max(200, { message: "AI description should be 200 characters or less" }).optional(),
  aiKeywords: z.string().optional(),
  aiExpertise: z.string().optional(),
  aiServices: z.string().optional(),
  
  // Schema markup
  schemaType: z.enum(["Article", "Product", "FAQ", "Service", "LocalBusiness", "Organization", "WebPage", "None"]).default("None"),
  schemaProperties: z.string().optional(),
  
  // Analytics Fields
  googleAnalyticsId: z.string().optional(),
  googleSearchConsoleId: z.string().optional(),
});

export type ContentFormValues = z.infer<typeof formSchema>;

interface ContentFormProps {
  defaultValues: ContentFormValues;
  onSubmit: (values: ContentFormValues) => void;
  onCancel: () => void;
  isEditMode: boolean;
  isSystemPage: boolean;
}

export default function ContentForm({
  defaultValues,
  onSubmit,
  onCancel,
  isEditMode,
  isSystemPage
}: ContentFormProps) {
  const [contentMode, setContentMode] = useState<'edit' | 'preview'>('edit');
  const [metaTitleCount, setMetaTitleCount] = useState(0);
  const [metaDescCount, setMetaDescCount] = useState(0);
  const [showCurrentMetadata, setShowCurrentMetadata] = useState(false);
  
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Update character counts for meta fields
  useEffect(() => {
    const titleValue = form.watch('metaTitle') || '';
    const descValue = form.watch('metaDescription') || '';
    
    setMetaTitleCount(titleValue.length);
    setMetaDescCount(descValue.length);
  }, [form.watch('metaTitle'), form.watch('metaDescription')]);

  // Generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);
    
    // Only auto-generate slug for new content, not for editing
    if (!isEditMode && !isSystemPage) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      form.setValue("slug", slug);
    }
    
    // Suggest meta title if not set
    if (!form.getValues("metaTitle")) {
      form.setValue("metaTitle", title);
      setMetaTitleCount(title.length);
    }
  };

  // Get current content value for preview
  const currentContent = form.watch('content') || '';

  // Toggle between edit and preview mode
  const toggleContentMode = () => {
    setContentMode(mode => mode === 'edit' ? 'preview' : 'edit');
  };

  // Toggle current metadata view
  const toggleCurrentMetadata = () => {
    setShowCurrentMetadata(!showCurrentMetadata);
  };

  // Copy meta tags to clipboard
  const copyMetaTags = () => {
    const metaTitle = form.getValues("metaTitle");
    const metaDesc = form.getValues("metaDescription");
    
    const metaTagsHtml = `
<title>${metaTitle || defaultValues.title || ''}</title>
<meta name="description" content="${metaDesc || ''}">
<link rel="canonical" href="${form.getValues("canonicalUrl") || ''}">
<meta property="og:title" content="${metaTitle || form.getValues("ogTitle") || ''}">
<meta property="og:description" content="${metaDesc || form.getValues("ogDescription") || ''}">
<meta property="og:image" content="${form.getValues("ogImage") || ''}">
<meta name="twitter:title" content="${metaTitle || form.getValues("twitterTitle") || ''}">
<meta name="twitter:description" content="${metaDesc || form.getValues("twitterDescription") || ''}">
<meta name="ai:description" content="${form.getValues("aiDescription") || ''}">
<meta name="ai:keywords" content="${form.getValues("aiKeywords") || ''}">
<meta name="ai:services" content="${form.getValues("aiServices") || ''}">
<meta name="ai:expertise" content="${form.getValues("aiExpertise") || ''}">
${form.watch("noIndex") ? '<meta name="robots" content="noindex">\n' : ''}${form.watch("noFollow") ? '<meta name="robots" content="nofollow">\n' : ''}`;
    
    navigator.clipboard.writeText(metaTagsHtml.trim());
    toast({
      title: "Meta tags copied",
      description: "Meta tags have been copied to clipboard",
    });
  };

  // Render markdown-like content for the preview
  const renderContent = (content: string) => {
    return (
      <div className="prose max-w-none">
        {content.split('\n').map((paragraph, i) => (
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
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter title" 
                      {...field} 
                      onChange={handleTitleChange}
                      disabled={isEditMode && isSystemPage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {!isSystemPage && (
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Path</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-1">/</span>
                        <Input placeholder="url-path" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The URL path for this content
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded-md" 
                      {...field}
                      disabled={isEditMode}
                    >
                      <option value="page">Page</option>
                      <option value="blog">Blog Post</option>
                      <option value="faq">FAQ</option>
                      {isEditMode && field.value === "service" && <option value="service">Service</option>}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select className="w-full p-2 border rounded-md" {...field}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <select className="w-full p-2 border rounded-md" {...field}>
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Content author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          {/* Content Tab - Enhanced with Preview */}
          <TabsContent value="content" className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Content Editor</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={toggleContentMode}
              >
                {contentMode === 'edit' 
                  ? <><Eye className="mr-2 h-4 w-4" /> Preview</> 
                  : <><Edit className="mr-2 h-4 w-4" /> Edit</>
                }
              </Button>
            </div>
            
            {contentMode === 'edit' ? (
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter content" 
                        className="min-h-[300px] font-mono" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      You can use basic markdown formatting: # for headings, ## for subheadings, and paragraphs separated by blank lines.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="border rounded-md p-6 min-h-[300px] bg-white">
                <div className="prose max-w-none">
                  {currentContent ? renderContent(currentContent) : (
                    <p className="text-gray-500 italic">No content to preview.</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="p-4 border rounded-md bg-gray-50">
              <h3 className="text-sm font-medium mb-2">Rich Content Editor</h3>
              <div className="flex flex-col space-y-3">
                <p className="text-sm text-muted-foreground">
                  Enhanced rich editor coming soon. Current editor supports basic markdown:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-white rounded border">
                    <code># Heading</code> - For main headings
                  </div>
                  <div className="p-2 bg-white rounded border">
                    <code>## Subheading</code> - For subheadings
                  </div>
                  <div className="p-2 bg-white rounded border">
                    <code>Blank line</code> - To separate paragraphs
                  </div>
                  <div className="p-2 bg-white rounded border">
                    <code>Regular text</code> - For paragraph content
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button type="button" variant="secondary" size="sm" disabled>
                    Full Editor (Coming Soon)
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Media Tab for image alt tags */}
          <TabsContent value="media" className="space-y-6">
            <div className="border rounded-md p-6 bg-white">
              <h3 className="font-medium text-lg mb-4">Media Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Featured Image</h4>
                  <div className="flex flex-col space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-3 text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-12 w-12">
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                            <line x1="16" x2="22" y1="5" y2="5"></line>
                            <line x1="19" x2="19" y1="2" y2="8"></line>
                            <circle cx="9" cy="9" r="2"></circle>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                          </svg>
                        </div>
                        <Button type="button" variant="outline" size="sm">Upload Featured Image</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="featuredImageAlt">Alt Text</Label>
                        <Input
                          id="featuredImageAlt"
                          placeholder="Describe the image for accessibility"
                          className="mt-1"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Describe the image to improve accessibility and SEO.
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="featuredImageCaption">Caption</Label>
                        <Input
                          id="featuredImageCaption"
                          placeholder="Optional image caption"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-3">Content Images</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Manage alt text for images used within your content.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md bg-gray-50 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                            <circle cx="9" cy="9" r="2"></circle>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">image-1.jpg</span>
                      </div>
                      <Button variant="outline" size="sm">Edit Alt Text</Button>
                    </div>
                    
                    <Button variant="outline" type="button" className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                      Add Images
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* SEO Tab - Enhanced with current metadata viewer and improved editing */}
          <TabsContent value="seo" className="space-y-4">
            {/* Current metadata viewer */}
            <div className="border rounded-md p-4 bg-blue-50 mb-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Current Metadata
                </h3>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={toggleCurrentMetadata}
                  >
                    {showCurrentMetadata ? "Hide" : "View"} Metadata
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={copyMetaTags}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Tags
                  </Button>
                </div>
              </div>
              
              {showCurrentMetadata && (
                <div className="mt-4 p-4 bg-white rounded-md border overflow-x-auto">
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                    {`<title>${form.watch("metaTitle") || defaultValues.title || ''}</title>
<meta name="description" content="${form.watch("metaDescription") || ''}">
<link rel="canonical" href="${form.watch("canonicalUrl") || ''}">
<meta property="og:title" content="${form.watch("ogTitle") || form.watch("metaTitle") || ''}">
<meta property="og:description" content="${form.watch("ogDescription") || form.watch("metaDescription") || ''}">
<meta property="og:image" content="${form.watch("ogImage") || ''}">
<meta name="twitter:title" content="${form.watch("twitterTitle") || form.watch("metaTitle") || ''}">
<meta name="twitter:description" content="${form.watch("twitterDescription") || form.watch("metaDescription") || ''}">
<meta name="ai:description" content="${form.watch("aiDescription") || ''}">
<meta name="ai:keywords" content="${form.watch("aiKeywords") || ''}">
<meta name="ai:services" content="${form.watch("aiServices") || ''}">
<meta name="ai:expertise" content="${form.watch("aiExpertise") || ''}">
${form.watch("noIndex") ? '<meta name="robots" content="noindex">\n' : ''}${form.watch("noFollow") ? '<meta name="robots" content="nofollow">\n' : ''}`}
                  </pre>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Enter meta title for SEO" 
                          {...field} 
                          onChange={e => {
                            field.onChange(e);
                            setMetaTitleCount(e.target.value.length);
                          }}
                          className={`${metaTitleCount > 60 ? 'border-red-300' : metaTitleCount > 50 ? 'border-yellow-300' : 'border-green-300'}`}
                        />
                        <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                          metaTitleCount > 60 ? 'text-red-500' : metaTitleCount > 50 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {metaTitleCount}/60
                        </span>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Title shown in search engine results. Optimal length: 50-60 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea 
                          placeholder="Enter meta description" 
                          className={`min-h-[80px] ${metaDescCount > 160 ? 'border-red-300' : metaDescCount > 145 ? 'border-yellow-300' : 'border-green-300'}`} 
                          {...field} 
                          onChange={e => {
                            field.onChange(e);
                            setMetaDescCount(e.target.value.length);
                          }}
                        />
                        <span className={`absolute right-3 bottom-3 text-xs ${
                          metaDescCount > 160 ? 'text-red-500' : metaDescCount > 145 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {metaDescCount}/160
                        </span>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Description shown in search engine results. Optimal length: 140-160 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="canonicalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Link className="mr-2 h-4 w-4" />
                    Canonical URL
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/canonical-page" 
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Used to prevent duplicate content issues. Leave blank to use the default URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="noIndex"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">No Index</FormLabel>
                      <FormDescription>
                        Prevent search engines from indexing this page
                      </FormDescription>
                    </div>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="ml-2 h-4 w-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="noFollow"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">No Follow</FormLabel>
                      <FormDescription>
                        Prevent search engines from following links on this page
                      </FormDescription>
                    </div>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="ml-2 h-4 w-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Social Media metadata section */}
            <div className="border rounded-md p-4 space-y-4 mt-6">
              <h3 className="font-medium flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Social Media / Open Graph
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ogTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OG Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title for social sharing" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>
                        Leave blank to use Meta Title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ogDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OG Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description for social sharing" 
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        Leave blank to use Meta Description
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="ogImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Image URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Image URL for social media sharing (1200×630 pixels recommended)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-center border-dashed border-2 border-gray-300 rounded-md p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Upload OG Image</p>
                  <Button type="button" variant="outline" size="sm">Select Image</Button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-sm mb-3">Twitter Card</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="twitterTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Twitter card title" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>
                          Leave blank to use OG Title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="twitterDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Twitter card description" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>
                          Leave blank to use OG Description
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            {/* AI-specific metadata section */}
            <div className="border rounded-md p-4 space-y-4 mt-6 bg-purple-50">
              <h3 className="font-medium flex items-center text-purple-800">
                <Settings className="mr-2 h-4 w-4" />
                AI Platform Optimization
              </h3>
              <p className="text-sm text-purple-700">
                These fields help AI platforms like Perplexity, ChatGPT, and Claude better understand your content.
              </p>
              
              <FormField
                control={form.control}
                name="aiDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description for AI platforms" 
                        {...field}
                        value={field.value || ""}
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormDescription>
                      More detailed than meta description, helps AI platforms understand the content better
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="aiKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Keywords</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ai-optimization, chatgpt, perplexity" 
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated keywords for AI relevance
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="aiServices"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Services</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="SEO, Content Creation, Analytics" 
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of services
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="aiExpertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Expertise</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="E-commerce optimization, search algorithms, product data management" 
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Comma-separated areas of expertise
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Schema markup section */}
            <div className="border rounded-md p-4 space-y-4 mt-6">
              <h3 className="font-medium">Schema Markup</h3>
              
              <FormField
                control={form.control}
                name="schemaType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schema Markup Type</FormLabel>
                    <FormControl>
                      <select className="w-full p-2 border rounded-md" {...field}>
                        <option value="None">None</option>
                        <option value="Article">Article</option>
                        <option value="Product">Product</option>
                        <option value="FAQ">FAQ</option>
                        <option value="Service">Service</option>
                        <option value="LocalBusiness">Local Business</option>
                        <option value="Organization">Organization</option>
                        <option value="WebPage">WebPage</option>
                        <option value="BreadcrumbList">Breadcrumb List</option>
                        <option value="HowTo">How-To</option>
                      </select>
                    </FormControl>
                    <FormDescription>
                      Structured data type to be added to the page
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="schemaProperties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schema Properties (JSON)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='{"name": "Example Name", "description": "Example description"}'
                        className="font-mono text-sm min-h-[120px]"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      JSON properties for the selected schema type
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {form.watch("schemaType") !== "None" && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Schema Type Properties Guide</h4>
                  <dl className="text-xs space-y-2">
                    {form.watch("schemaType") === "Article" && (
                      <>
                        <dt className="font-semibold">Article Properties:</dt>
                        <dd className="ml-2">headline, description, author, datePublished, publisher, image</dd>
                      </>
                    )}
                    {form.watch("schemaType") === "Product" && (
                      <>
                        <dt className="font-semibold">Product Properties:</dt>
                        <dd className="ml-2">name, description, image, brand, offers, sku, aggregateRating</dd>
                      </>
                    )}
                    {form.watch("schemaType") === "FAQ" && (
                      <>
                        <dt className="font-semibold">FAQ Properties:</dt>
                        <dd className="ml-2">mainEntity (array of questions and answers)</dd>
                      </>
                    )}
                    {form.watch("schemaType") === "Service" && (
                      <>
                        <dt className="font-semibold">Service Properties:</dt>
                        <dd className="ml-2">name, description, provider, areaServed, serviceType</dd>
                      </>
                    )}
                  </dl>
                </div>
              )}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md mt-6">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">SEO Best Practices</h4>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Use unique, descriptive meta titles and descriptions for each page</li>
                <li>Keep meta titles under 60 characters and descriptions under 160</li>
                <li>Use schema markup to help search engines understand your content</li>
                <li>Optimize for AI platforms with detailed descriptions and keywords</li>
                <li>Use canonical URLs to prevent duplicate content issues</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* Analytics Tab - Enhanced with Google tools integration */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="border rounded-md p-6 bg-white">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart className="text-indigo-600" />
                <h3 className="font-medium text-lg">Google Analytics Integration</h3>
              </div>
              
              <FormField
                control={form.control}
                name="googleAnalyticsId"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Google Analytics ID</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="G-XXXXXXXXXX or UA-XXXXXXXX-X" 
                        {...field}
                        value={field.value || ""} 
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your Google Analytics 4 (G-XXXXXXXXXX) or Universal Analytics (UA-XXXXXXXX-X) tracking ID
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="p-4 bg-gray-50 rounded-md mt-4">
                <h4 className="text-sm font-medium mb-2">Additional Settings</h4>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="enableEcommerce" className="mr-2 h-4 w-4" />
                  <Label htmlFor="enableEcommerce">Enable Enhanced E-commerce</Label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="anonymizeIp" className="mr-2 h-4 w-4" />
                  <Label htmlFor="anonymizeIp">Anonymize IP addresses</Label>
                </div>
              </div>
              
              <div className="mt-8 mb-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="text-indigo-600" />
                  <h3 className="font-medium text-lg">Google Search Console</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="googleSearchConsoleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Search Console Verification HTML Tag</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="<meta name='google-site-verification' content='VERIFICATION_CODE' />" 
                          {...field}
                          value={field.value || ""} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the HTML verification meta tag from Google Search Console
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium mb-3">Data Tracking Configuration</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="conversionGoals">Conversion Goals</Label>
                    <Input 
                      id="conversionGoals" 
                      placeholder="e.g., form_submission, checkout_complete" 
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Comma-separated list of conversion goals to track
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="eventCategory">Default Event Category</Label>
                    <Input 
                      id="eventCategory" 
                      placeholder="e.g., user_engagement" 
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Analytics Best Practices</h4>
                <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                  <li>Set up both Google Analytics and Search Console for comprehensive insights</li>
                  <li>Create custom events to track user interactions specific to your business</li>
                  <li>Set up conversion goals to measure and optimize performance</li>
                  <li>Regularly review data to identify optimization opportunities</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Custom Code</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add custom HTML, CSS, or JavaScript to this page.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customHtml">Custom HTML</Label>
                  <Textarea
                    id="customHtml"
                    placeholder="<!-- Add custom HTML here -->"
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customCss">Custom CSS</Label>
                  <Textarea
                    id="customCss"
                    placeholder="/* Add custom CSS here */"
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customJs">Custom JavaScript</Label>
                  <Textarea
                    id="customJs"
                    placeholder="// Add custom JavaScript here"
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditMode ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
