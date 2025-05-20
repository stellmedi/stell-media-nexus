
import React from "react";
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

// Content form schema with validation
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  type: z.enum(["page", "blog", "faq", "service"]),
  content: z.string().optional(),
  status: z.enum(["published", "draft"]),
  slug: z.string().optional(),
  language: z.string().default("en"),
  author: z.string().optional(),
  
  // SEO Fields
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  schemaType: z.enum(["Article", "Product", "FAQ", "Service", "LocalBusiness", "None"]).default("None"),
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
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
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
          
          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter content" 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="p-4 border rounded-md bg-gray-50">
              <h3 className="text-sm font-medium mb-2">Rich Content Editor</h3>
              <p className="text-sm text-muted-foreground">
                Advanced editor coming soon. Currently using plain text editor.
              </p>
            </div>
          </TabsContent>
          
          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-4">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter meta title for SEO" {...field} />
                  </FormControl>
                  <FormDescription>
                    Title shown in search engine results. Recommended length: 50-60 characters.
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
                    <Textarea 
                      placeholder="Enter meta description" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Description shown in search engine results. Recommended length: 150-160 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="canonicalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical URL</FormLabel>
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
            
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium">Open Graph / Social Sharing</h3>
              
              <FormField
                control={form.control}
                name="ogTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title for social sharing" {...field} />
                    </FormControl>
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
                      />
                    </FormControl>
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
            </div>
            
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
                    </select>
                  </FormControl>
                  <FormDescription>
                    Structured data type to be added to the page
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
