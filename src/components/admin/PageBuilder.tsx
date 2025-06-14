
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Blocks, 
  Plus, 
  Move, 
  Eye, 
  EyeOff,
  Edit,
  Trash2,
  Copy,
  Layout,
  Type,
  Image,
  Video
} from "lucide-react";
import { toast } from "sonner";

interface PageSection {
  id: string;
  type: 'hero' | 'text' | 'image' | 'video' | 'features' | 'testimonials' | 'cta';
  title: string;
  visible: boolean;
  order: number;
  content?: any;
}

const PageBuilder: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [sections, setSections] = useState<PageSection[]>([
    {
      id: '1',
      type: 'hero',
      title: 'Hero Section',
      visible: true,
      order: 1,
      content: { headline: 'Welcome to Stell Tech Academy', subtitle: 'Learn AI & Technology' }
    },
    {
      id: '2',
      type: 'features',
      title: 'Features Section',
      visible: true,
      order: 2,
      content: { features: ['AI Courses', 'Expert Instructors', 'Hands-on Projects'] }
    },
    {
      id: '3',
      type: 'testimonials',
      title: 'Testimonials',
      visible: false,
      order: 3,
      content: { testimonials: [] }
    },
    {
      id: '4',
      type: 'cta',
      title: 'Call to Action',
      visible: true,
      order: 4,
      content: { text: 'Start Your Journey Today', button: 'Get Started' }
    }
  ]);

  const availableBlocks = [
    { type: 'hero', icon: Layout, title: 'Hero Section', description: 'Large banner with headline' },
    { type: 'text', icon: Type, title: 'Text Block', description: 'Rich text content' },
    { type: 'image', icon: Image, title: 'Image Gallery', description: 'Photo galleries and carousels' },
    { type: 'video', icon: Video, title: 'Video Section', description: 'Embedded videos' },
    { type: 'features', icon: Blocks, title: 'Features Grid', description: 'Service/feature highlights' },
    { type: 'testimonials', icon: Type, title: 'Testimonials', description: 'Customer reviews' },
    { type: 'cta', icon: Layout, title: 'Call to Action', description: 'Conversion-focused sections' }
  ];

  const handleToggleVisibility = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, visible: !section.visible }
          : section
      )
    );
    toast.success("Section visibility updated");
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
    toast.success("Section deleted");
  };

  const handleDuplicateSection = (sectionId: string) => {
    const sectionToDuplicate = sections.find(s => s.id === sectionId);
    if (sectionToDuplicate) {
      const newSection = {
        ...sectionToDuplicate,
        id: Date.now().toString(),
        title: `${sectionToDuplicate.title} (Copy)`,
        order: sections.length + 1
      };
      setSections(prev => [...prev, newSection]);
      toast.success("Section duplicated");
    }
  };

  const handleAddBlock = (blockType: string) => {
    const newSection: PageSection = {
      id: Date.now().toString(),
      type: blockType as any,
      title: availableBlocks.find(b => b.type === blockType)?.title || 'New Section',
      visible: true,
      order: sections.length + 1,
      content: {}
    };
    setSections(prev => [...prev, newSection]);
    toast.success("Block added to page");
  };

  const getSectionIcon = (type: string) => {
    const block = availableBlocks.find(b => b.type === type);
    const IconComponent = block?.icon || Layout;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Page Builder</h2>
          <p className="text-gray-600">Drag and drop page layouts with reusable blocks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Page Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Page to Edit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {['home', 'about', 'services', 'contact'].map((page) => (
              <Button
                key={page}
                variant={selectedPage === page ? "default" : "outline"}
                onClick={() => setSelectedPage(page)}
                className="capitalize"
              >
                {page}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Available Blocks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Blocks</CardTitle>
            <CardDescription>Drag these blocks to build your page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableBlocks.map((block) => (
                <div
                  key={block.type}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleAddBlock(block.type)}
                >
                  <div className="flex items-start gap-3">
                    <block.icon className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{block.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{block.description}</p>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Page Structure */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Page Structure</span>
              <Badge variant="outline">{sections.length} sections</Badge>
            </CardTitle>
            <CardDescription>Current layout of your {selectedPage} page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => (
                <div
                  key={section.id}
                  className={`p-4 border rounded-lg ${
                    section.visible ? 'bg-white' : 'bg-gray-50 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Move className="h-4 w-4 text-gray-400 cursor-move" />
                      {getSectionIcon(section.type)}
                      <div>
                        <h4 className="font-medium text-sm">{section.title}</h4>
                        <p className="text-xs text-gray-500 capitalize">{section.type} block</p>
                      </div>
                      <Badge 
                        variant={section.visible ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {section.visible ? 'Visible' : 'Hidden'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={section.visible}
                          onCheckedChange={() => handleToggleVisibility(section.id)}
                        />
                        <Label className="text-xs">Visible</Label>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDuplicateSection(section.id)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteSection(section.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Section Preview */}
                  <div className="mt-3 p-3 bg-gray-50 rounded text-xs text-gray-600">
                    {section.type === 'hero' && section.content?.headline && (
                      <div>
                        <strong>{section.content.headline}</strong>
                        {section.content.subtitle && <p>{section.content.subtitle}</p>}
                      </div>
                    )}
                    {section.type === 'features' && section.content?.features && (
                      <div>Features: {section.content.features.join(', ')}</div>
                    )}
                    {section.type === 'cta' && section.content?.text && (
                      <div>{section.content.text}</div>
                    )}
                    {!section.content && (
                      <div className="italic">Click edit to configure this section</div>
                    )}
                  </div>
                </div>
              ))}
              
              {sections.length === 0 && (
                <div className="text-center py-12">
                  <Blocks className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Sections Added</h3>
                  <p className="text-gray-600">Add blocks from the sidebar to start building your page</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Page Settings</CardTitle>
          <CardDescription>Configure global settings for this page</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Layout Options</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label className="text-sm">Full Width Sections</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label className="text-sm">Show Page Header</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label className="text-sm">Enable Animations</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Mobile Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Label className="text-sm">Mobile Responsive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label className="text-sm">Touch Optimized</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Performance</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Label className="text-sm">Lazy Load Images</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Label className="text-sm">Optimize CSS</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageBuilder;
