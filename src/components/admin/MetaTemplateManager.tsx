
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface MetaTemplate {
  id: string;
  name: string;
  titleTemplate: string;
  descriptionTemplate: string;
  keywordsTemplate: string;
  ogImageTemplate: string;
  pageType: string;
  variables: string[];
}

export default function MetaTemplateManager() {
  const [templates, setTemplates] = useState<MetaTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currentTemplate, setCurrentTemplate] = useState<MetaTemplate>({
    id: '',
    name: '',
    titleTemplate: '',
    descriptionTemplate: '',
    keywordsTemplate: '',
    ogImageTemplate: '',
    pageType: 'general',
    variables: []
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    try {
      const saved = localStorage.getItem('stellmedia_meta_templates');
      if (saved) {
        const data = JSON.parse(saved);
        setTemplates(data);
      } else {
        // Load default templates
        const defaultTemplates = getDefaultTemplates();
        setTemplates(defaultTemplates);
        localStorage.setItem('stellmedia_meta_templates', JSON.stringify(defaultTemplates));
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const getDefaultTemplates = (): MetaTemplate[] => [
    {
      id: 'service-page',
      name: 'Service Page Template',
      titleTemplate: '{serviceName} | Digital Marketing Services | Stell Media',
      descriptionTemplate: 'Professional {serviceName} services from Stell Media. {benefits} Contact us for a free consultation.',
      keywordsTemplate: '{serviceName}, digital marketing, {serviceType}, Stell Media',
      ogImageTemplate: '/service-images/{serviceName}-og.jpg',
      pageType: 'service',
      variables: ['serviceName', 'benefits', 'serviceType']
    },
    {
      id: 'blog-post',
      name: 'Blog Post Template',
      titleTemplate: '{postTitle} | Stell Media Blog',
      descriptionTemplate: '{excerpt} Read more insights from Stell Media\'s digital marketing experts.',
      keywordsTemplate: '{tags}, digital marketing blog, {category}',
      ogImageTemplate: '/blog-images/{slug}-og.jpg',
      pageType: 'article',
      variables: ['postTitle', 'excerpt', 'tags', 'category', 'slug']
    },
    {
      id: 'general-page',
      name: 'General Page Template',
      titleTemplate: '{pageTitle} | Stell Media',
      descriptionTemplate: '{pageDescription}',
      keywordsTemplate: '{keywords}, Stell Media',
      ogImageTemplate: '/page-images/{slug}-og.jpg',
      pageType: 'general',
      variables: ['pageTitle', 'pageDescription', 'keywords', 'slug']
    }
  ];

  const saveTemplates = (newTemplates: MetaTemplate[]) => {
    try {
      localStorage.setItem('stellmedia_meta_templates', JSON.stringify(newTemplates));
      setTemplates(newTemplates);
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('metaTemplatesUpdated', {
        detail: { templates: newTemplates }
      }));
      
      toast.success('Templates saved successfully');
    } catch (error) {
      console.error('Error saving templates:', error);
      toast.error('Failed to save templates');
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setCurrentTemplate(template);
      setIsEditing(true);
    }
  };

  const handleSaveTemplate = () => {
    if (!currentTemplate.name || !currentTemplate.titleTemplate) {
      toast.error('Please fill in required fields');
      return;
    }

    let updatedTemplates;
    if (currentTemplate.id) {
      // Update existing
      updatedTemplates = templates.map(t => 
        t.id === currentTemplate.id ? currentTemplate : t
      );
    } else {
      // Add new
      const newTemplate = {
        ...currentTemplate,
        id: Date.now().toString()
      };
      updatedTemplates = [...templates, newTemplate];
      setCurrentTemplate(newTemplate);
    }

    saveTemplates(updatedTemplates);
    setIsEditing(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;
    
    const updated = templates.filter(t => t.id !== templateId);
    saveTemplates(updated);
    
    if (selectedTemplate === templateId) {
      setSelectedTemplate('');
      setCurrentTemplate({
        id: '',
        name: '',
        titleTemplate: '',
        descriptionTemplate: '',
        keywordsTemplate: '',
        ogImageTemplate: '',
        pageType: 'general',
        variables: []
      });
      setIsEditing(false);
    }
  };

  const handleNewTemplate = () => {
    setCurrentTemplate({
      id: '',
      name: '',
      titleTemplate: '',
      descriptionTemplate: '',
      keywordsTemplate: '',
      ogImageTemplate: '',
      pageType: 'general',
      variables: []
    });
    setSelectedTemplate('');
    setIsEditing(true);
  };

  const extractVariables = (template: string) => {
    const regex = /{([^}]+)}/g;
    const variables = [];
    let match;
    while ((match = regex.exec(template)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    return variables;
  };

  const updateTemplateField = (field: keyof MetaTemplate, value: string) => {
    const updated = { ...currentTemplate, [field]: value };
    
    // Auto-extract variables from templates
    if (field === 'titleTemplate' || field === 'descriptionTemplate' || field === 'keywordsTemplate') {
      const allVariables = [
        ...extractVariables(updated.titleTemplate),
        ...extractVariables(updated.descriptionTemplate),
        ...extractVariables(updated.keywordsTemplate)
      ];
      updated.variables = [...new Set(allVariables)];
    }
    
    setCurrentTemplate(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meta Template Management</CardTitle>
        <CardDescription>
          Create reusable templates for meta tags across your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Available Templates</h3>
              <Button variant="outline" size="sm" onClick={handleNewTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </div>
            
            <div className="space-y-2">
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedTemplate === template.id ? 'border-blue-300 bg-blue-50' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-600 truncate">
                        {template.titleTemplate}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {template.pageType}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {template.variables.length} variables
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTemplate(template.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Editor */}
          <div className="space-y-4">
            <h3 className="font-medium">
              {isEditing ? (currentTemplate.id ? 'Edit Template' : 'New Template') : 'Template Details'}
            </h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name">Template Name *</Label>
                  <Input
                    id="template-name"
                    value={currentTemplate.name}
                    onChange={(e) => updateTemplateField('name', e.target.value)}
                    placeholder="e.g., Service Page Template"
                  />
                </div>

                <div>
                  <Label htmlFor="page-type">Page Type</Label>
                  <Select 
                    value={currentTemplate.pageType} 
                    onValueChange={(value) => updateTemplateField('pageType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title-template">Title Template *</Label>
                  <Input
                    id="title-template"
                    value={currentTemplate.titleTemplate}
                    onChange={(e) => updateTemplateField('titleTemplate', e.target.value)}
                    placeholder="e.g., {serviceName} | Digital Marketing | Stell Media"
                  />
                </div>

                <div>
                  <Label htmlFor="description-template">Description Template</Label>
                  <Textarea
                    id="description-template"
                    value={currentTemplate.descriptionTemplate}
                    onChange={(e) => updateTemplateField('descriptionTemplate', e.target.value)}
                    placeholder="e.g., Professional {serviceName} services..."
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="keywords-template">Keywords Template</Label>
                  <Input
                    id="keywords-template"
                    value={currentTemplate.keywordsTemplate}
                    onChange={(e) => updateTemplateField('keywordsTemplate', e.target.value)}
                    placeholder="e.g., {serviceName}, digital marketing"
                  />
                </div>

                <div>
                  <Label htmlFor="og-image-template">OG Image Template</Label>
                  <Input
                    id="og-image-template"
                    value={currentTemplate.ogImageTemplate}
                    onChange={(e) => updateTemplateField('ogImageTemplate', e.target.value)}
                    placeholder="e.g., /images/{serviceName}-og.jpg"
                  />
                </div>

                {currentTemplate.variables.length > 0 && (
                  <div>
                    <Label>Detected Variables</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {currentTemplate.variables.map((variable) => (
                        <Badge key={variable} variant="outline">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Use curly braces to define variables: {'{variableName}'}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTemplate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </Button>
                </div>
              </div>
            ) : selectedTemplate ? (
              <div className="space-y-3">
                <div>
                  <Label>Template Name</Label>
                  <p className="text-sm">{currentTemplate.name}</p>
                </div>
                <div>
                  <Label>Page Type</Label>
                  <p className="text-sm capitalize">{currentTemplate.pageType}</p>
                </div>
                <div>
                  <Label>Title Template</Label>
                  <code className="text-sm bg-gray-100 p-2 rounded block">
                    {currentTemplate.titleTemplate}
                  </code>
                </div>
                <div>
                  <Label>Description Template</Label>
                  <code className="text-sm bg-gray-100 p-2 rounded block">
                    {currentTemplate.descriptionTemplate}
                  </code>
                </div>
                {currentTemplate.variables.length > 0 && (
                  <div>
                    <Label>Variables</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentTemplate.variables.map((variable) => (
                        <Badge key={variable} variant="outline" className="text-xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Template
                </Button>
              </div>
            ) : (
              <p className="text-gray-500">Select a template to view details</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
