
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Image, Upload } from "lucide-react";

interface ImageData {
  id: string;
  src: string;
  alt: string;
  title: string;
}

const sampleImages: ImageData[] = [
  {
    id: "1",
    src: "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
    alt: "Stell Media logo",
    title: "Stell Media - E-commerce Optimization Experts"
  },
  {
    id: "2", 
    src: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    alt: "E-commerce optimization services",
    title: "Professional E-commerce Optimization Services"
  }
];

export default function ImageSEOManager() {
  const [images, setImages] = useState<ImageData[]>(sampleImages);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpdate = (id: string, field: 'alt' | 'title', value: string) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Save to localStorage for demo purposes
      localStorage.setItem('stellmedia_image_seo', JSON.stringify(images));
      
      setHasUnsavedChanges(false);
      toast.success("Image SEO data saved successfully!");
    } catch (error) {
      console.error('Error saving image SEO data:', error);
      toast.error("Error saving image SEO data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Image SEO Management
          {hasUnsavedChanges && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Unsaved Changes
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Manage alt tags and title attributes for your images
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          {images.map((image) => (
            <div key={image.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-4">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-24 h-24 object-cover rounded border"
                />
                <div className="flex-1 space-y-3">
                  <div>
                    <Label htmlFor={`alt-${image.id}`}>Alt Text</Label>
                    <Input
                      id={`alt-${image.id}`}
                      value={image.alt}
                      onChange={(e) => handleImageUpdate(image.id, 'alt', e.target.value)}
                      placeholder="Descriptive alt text for accessibility"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`title-${image.id}`}>Title Attribute</Label>
                    <Input
                      id={`title-${image.id}`}
                      value={image.title}
                      onChange={(e) => handleImageUpdate(image.id, 'title', e.target.value)}
                      placeholder="Title text that appears on hover"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {image.src}
                </code>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload New Image
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isLoading}
            className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
