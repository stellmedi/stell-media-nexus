
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Edit, Eye, Image, Video, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'page' | 'post' | 'service';
  status: 'published' | 'draft';
  lastModified: string;
}

const sampleContent: ContentItem[] = [
  {
    id: "1",
    title: "Home Page",
    content: "Transform your e-commerce platform with Stell Media's AI-powered solutions...",
    type: "page",
    status: "published",
    lastModified: "2024-01-15"
  },
  {
    id: "2",
    title: "About Us",
    content: "Stell Media is a leading e-commerce optimization agency...",
    type: "page", 
    status: "published",
    lastModified: "2024-01-10"
  },
  {
    id: "3",
    title: "SEO Services",
    content: "Our comprehensive SEO services help boost your visibility...",
    type: "service",
    status: "published", 
    lastModified: "2024-01-12"
  }
];

export default function ContentManagement() {
  const [content, setContent] = useState<ContentItem[]>(sampleContent);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleEdit = (item: ContentItem) => {
    setSelectedContent(item);
    setEditTitle(item.title);
    setEditContent(item.content);
    setIsEditing(true);
    setHasUnsavedChanges(false);
  };

  const handleSave = () => {
    if (!selectedContent) return;
    
    const updatedContent = content.map(item => 
      item.id === selectedContent.id 
        ? { ...item, title: editTitle, content: editContent, lastModified: new Date().toISOString().split('T')[0] }
        : item
    );
    
    setContent(updatedContent);
    setSelectedContent({ ...selectedContent, title: editTitle, content: editContent });
    setHasUnsavedChanges(false);
    setIsEditing(false);
    toast.success("Content saved successfully!");
  };

  const handleUndo = () => {
    if (!selectedContent) return;
    setEditTitle(selectedContent.title);
    setEditContent(selectedContent.content);
    setHasUnsavedChanges(false);
  };

  const handleContentChange = (field: 'title' | 'content', value: string) => {
    if (field === 'title') setEditTitle(value);
    if (field === 'content') setEditContent(value);
    setHasUnsavedChanges(true);
  };

  const handlePreview = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages">Pages & Content</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="settings">Content Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Content List */}
            <Card>
              <CardHeader>
                <CardTitle>Content Items</CardTitle>
                <CardDescription>Select content to view or edit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {content.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedContent?.id === item.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleEdit(item)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.content.substring(0, 60)}...
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                              {item.status}
                            </Badge>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Last modified: {item.lastModified}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isEditing ? <Edit className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  {isEditing ? 'Edit Content' : 'Preview Content'}
                  {hasUnsavedChanges && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Unsaved Changes
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {selectedContent ? `Editing: ${selectedContent.title}` : 'Select content to edit'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedContent ? (
                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            value={editTitle}
                            onChange={(e) => handleContentChange('title', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Content</label>
                          <Textarea
                            value={editContent}
                            onChange={(e) => handleContentChange('content', e.target.value)}
                            className="mt-1 min-h-[300px]"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold">{editTitle}</h3>
                        </div>
                        <div className="prose max-w-none">
                          <p className="whitespace-pre-wrap">{editContent}</p>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex gap-2">
                        {isEditing && (
                          <Button variant="outline" onClick={handleUndo} disabled={!hasUnsavedChanges}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Undo
                          </Button>
                        )}
                        <Button variant="outline" onClick={handlePreview}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        {!isEditing && (
                          <Button onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}
                        {isEditing && (
                          <Button 
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges}
                            className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Select a content item from the list to start editing
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Media Library
              </CardTitle>
              <CardDescription>Manage images and videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <Image className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Upload Image</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <Video className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Upload Video</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure content management options</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Content settings will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
