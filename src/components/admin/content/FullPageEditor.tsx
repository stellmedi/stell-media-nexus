
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, Plus, Trash2, Edit3 } from "lucide-react";
import { toast } from "sonner";

interface PageSection {
  id: string;
  section_key: string;
  title: string;
  content: string;
  section_type: 'hero' | 'text' | 'list' | 'features' | 'testimonials' | 'faq' | 'services';
  display_order: number;
  is_active: boolean;
}

interface PageContent {
  id: string;
  page_path: string;
  title: string;
  is_published: boolean;
  sections: PageSection[];
}

interface FullPageEditorProps {
  pageContent: PageContent;
  onPageTitleChange: (title: string) => void;
  onSectionChange: (sectionId: string, field: keyof PageSection, value: any) => void;
  onAddSection: () => void;
  onRemoveSection: (sectionId: string) => void;
  onSave: () => void;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
}

const FullPageEditor: React.FC<FullPageEditorProps> = ({
  pageContent,
  onPageTitleChange,
  onSectionChange,
  onAddSection,
  onRemoveSection,
  onSave,
  hasUnsavedChanges,
  isLoading
}) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const sectionTypes = [
    { value: 'hero', label: 'Hero Section' },
    { value: 'text', label: 'Text Content' },
    { value: 'services', label: 'Services' },
    { value: 'features', label: 'Features' },
    { value: 'testimonials', label: 'Testimonials' },
    { value: 'faq', label: 'FAQ' },
    { value: 'list', label: 'List' }
  ];

  const getSectionTypeColor = (type: string) => {
    const colors = {
      hero: 'bg-blue-100 text-blue-800',
      text: 'bg-gray-100 text-gray-800',
      services: 'bg-green-100 text-green-800',
      features: 'bg-purple-100 text-purple-800',
      testimonials: 'bg-yellow-100 text-yellow-800',
      faq: 'bg-orange-100 text-orange-800',
      list: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Page Content Editor</span>
            <Button 
              onClick={onSave}
              disabled={!hasUnsavedChanges || isLoading}
              className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : hasUnsavedChanges ? 'Save All Changes' : 'Saved'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Page Title</label>
              <Input
                value={pageContent.title}
                onChange={(e) => onPageTitleChange(e.target.value)}
                placeholder="Enter page title"
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={pageContent.is_published ? "default" : "secondary"}>
                {pageContent.is_published ? "Published" : "Draft"}
              </Badge>
              <span className="text-sm text-gray-500">
                {pageContent.sections.length} section{pageContent.sections.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Page Sections</span>
            <Button onClick={onAddSection} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pageContent.sections
              .sort((a, b) => a.display_order - b.display_order)
              .map((section, index) => (
                <Card key={section.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={getSectionTypeColor(section.section_type)}>
                          {sectionTypes.find(t => t.value === section.section_type)?.label || section.section_type}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Order: {section.display_order}
                        </span>
                        <span className="text-sm font-medium">
                          {section.section_key}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          {editingSection === section.id ? 'Collapse' : 'Edit'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRemoveSection(section.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {editingSection === section.id && (
                    <CardContent className="pt-0">
                      <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="content">Content</TabsTrigger>
                          <TabsTrigger value="settings">Settings</TabsTrigger>
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="content" className="space-y-4 mt-4">
                          <div>
                            <label className="text-sm font-medium">Section Title</label>
                            <Input
                              value={section.title}
                              onChange={(e) => onSectionChange(section.id, 'title', e.target.value)}
                              placeholder="Section title"
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Content</label>
                            <Textarea
                              value={section.content}
                              onChange={(e) => onSectionChange(section.id, 'content', e.target.value)}
                              placeholder="Enter section content..."
                              className="mt-1 min-h-[120px]"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Rich text editor would be integrated here for advanced formatting
                            </p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="settings" className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Section Key</label>
                              <Input
                                value={section.section_key}
                                onChange={(e) => onSectionChange(section.id, 'section_key', e.target.value)}
                                placeholder="unique-section-key"
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Display Order</label>
                              <Input
                                type="number"
                                value={section.display_order}
                                onChange={(e) => onSectionChange(section.id, 'display_order', parseInt(e.target.value) || 0)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Section Type</label>
                            <select
                              value={section.section_type}
                              onChange={(e) => onSectionChange(section.id, 'section_type', e.target.value)}
                              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {sectionTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="preview" className="mt-4">
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <h4 className="font-medium mb-2">{section.title}</h4>
                            <div className="text-sm text-gray-700 whitespace-pre-wrap">
                              {section.content}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  )}
                  
                  {editingSection !== section.id && (
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <h4 className="font-medium">{section.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {section.content}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            
            {pageContent.sections.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No sections yet. Add your first section to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FullPageEditor;
