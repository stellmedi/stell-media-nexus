
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save,
  Upload,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'post';
  status: 'published' | 'draft' | 'scheduled';
  author: string;
  lastModified: string;
  url: string;
}

const ContentEditor: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [contentList] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Home Page',
      type: 'page',
      status: 'published',
      author: 'Admin',
      lastModified: '2024-01-15',
      url: '/'
    },
    {
      id: '2',
      title: 'About Us',
      type: 'page',
      status: 'published',
      author: 'Admin',
      lastModified: '2024-01-14',
      url: '/about'
    },
    {
      id: '3',
      title: 'AI in Education: The Future',
      type: 'post',
      status: 'draft',
      author: 'Admin',
      lastModified: '2024-01-16',
      url: '/blog/ai-in-education'
    }
  ]);

  const [editorContent, setEditorContent] = useState({
    title: '',
    content: '',
    excerpt: '',
    url: '',
    status: 'draft',
    featuredImage: '',
    publishDate: '',
    tags: ''
  });

  const handleSave = () => {
    toast.success("Content saved successfully!");
  };

  const handlePublish = () => {
    toast.success("Content published successfully!");
  };

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-gray-600">Create and manage pages and blog posts</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Content
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">All Content</CardTitle>
            <CardDescription>Select content to edit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentList.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedContent?.id === item.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedContent(item)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.url}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={`text-xs ${statusColors[item.status]}`}>
                          {item.status}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {item.type === 'page' ? <FileText className="h-3 w-3" /> : <Edit className="h-3 w-3" />}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Content Editor</span>
              {selectedContent && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContent ? (
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title"
                      value={editorContent.title || selectedContent.title}
                      onChange={(e) => setEditorContent(prev => ({...prev, title: e.target.value}))}
                      placeholder="Enter content title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea 
                      id="content"
                      value={editorContent.content}
                      onChange={(e) => setEditorContent(prev => ({...prev, content: e.target.value}))}
                      placeholder="Write your content here... (WYSIWYG editor would be integrated here)"
                      className="min-h-[300px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Rich text editor with formatting, images, and embed support
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea 
                      id="excerpt"
                      value={editorContent.excerpt}
                      onChange={(e) => setEditorContent(prev => ({...prev, excerpt: e.target.value}))}
                      placeholder="Brief description for previews and SEO"
                      className="h-20"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={editorContent.status} onValueChange={(value) => setEditorContent(prev => ({...prev, status: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="publishDate">Publish Date</Label>
                      <Input 
                        id="publishDate"
                        type="datetime-local"
                        value={editorContent.publishDate}
                        onChange={(e) => setEditorContent(prev => ({...prev, publishDate: e.target.value}))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="url">URL Slug</Label>
                    <Input 
                      id="url"
                      value={editorContent.url || selectedContent.url}
                      onChange={(e) => setEditorContent(prev => ({...prev, url: e.target.value}))}
                      placeholder="/page-url"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="featuredImage">Featured Image</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="featuredImage"
                        value={editorContent.featuredImage}
                        onChange={(e) => setEditorContent(prev => ({...prev, featuredImage: e.target.value}))}
                        placeholder="Image URL or upload"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {selectedContent.type === 'post' && (
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input 
                        id="tags"
                        value={editorContent.tags}
                        onChange={(e) => setEditorContent(prev => ({...prev, tags: e.target.value}))}
                        placeholder="Enter tags separated by commas"
                      />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-4">
                  <p className="text-sm text-gray-600">
                    SEO settings are managed in the SEO Settings tab. This integration will be enhanced to show page-specific SEO options.
                  </p>
                  <Button variant="outline">
                    Open SEO Settings
                  </Button>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Selected</h3>
                <p className="text-gray-600">Select a page or post from the list to start editing</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentEditor;
