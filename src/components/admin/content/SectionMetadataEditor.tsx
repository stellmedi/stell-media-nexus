import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IconPicker from "./IconPicker";
import ImageUpload from "./ImageUpload";
import ColorPicker from "./ColorPicker";
import RepeatableItemsEditor, { RepeatableItem } from "./RepeatableItemsEditor";

export interface SectionMetadata {
  image_url?: string;
  background_image?: string;
  icon_name?: string;
  gradient_from?: string;
  gradient_to?: string;
  cta_text?: string;
  cta_link?: string;
  cta_secondary_text?: string;
  cta_secondary_link?: string;
  items?: RepeatableItem[];
  list_items?: string[];
}

interface SectionMetadataEditorProps {
  metadata: SectionMetadata;
  onChange: (metadata: SectionMetadata) => void;
  sectionType: string;
}

const SectionMetadataEditor: React.FC<SectionMetadataEditorProps> = ({
  metadata = {},
  onChange,
  sectionType
}) => {
  const updateMetadata = (field: keyof SectionMetadata, value: any) => {
    onChange({ ...metadata, [field]: value });
  };

  // Determine which tabs to show based on section type
  const showMedia = ['hero', 'features', 'services', 'testimonials', 'cta'].includes(sectionType);
  const showStyling = ['hero', 'features', 'services', 'cta', 'benefits'].includes(sectionType);
  const showCTA = ['hero', 'cta', 'features'].includes(sectionType);
  const showItems = ['features', 'services', 'benefits', 'differentiators', 'contact_info', 'expectations'].includes(sectionType);

  return (
    <Tabs defaultValue="media" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="media" disabled={!showMedia}>Media</TabsTrigger>
        <TabsTrigger value="styling" disabled={!showStyling}>Styling</TabsTrigger>
        <TabsTrigger value="cta" disabled={!showCTA}>CTA</TabsTrigger>
        <TabsTrigger value="items" disabled={!showItems}>Items</TabsTrigger>
      </TabsList>

      <TabsContent value="media" className="space-y-4 mt-4">
        <ImageUpload
          value={metadata.image_url}
          onChange={(value) => updateMetadata('image_url', value)}
          label="Section Image"
        />
        
        <ImageUpload
          value={metadata.background_image}
          onChange={(value) => updateMetadata('background_image', value)}
          label="Background Image"
        />
        
        <div>
          <Label>Section Icon</Label>
          <IconPicker
            value={metadata.icon_name}
            onChange={(value) => updateMetadata('icon_name', value)}
            placeholder="Select section icon"
          />
        </div>
      </TabsContent>

      <TabsContent value="styling" className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            value={metadata.gradient_from}
            onChange={(value) => updateMetadata('gradient_from', value)}
            label="Gradient Start"
          />
          <ColorPicker
            value={metadata.gradient_to}
            onChange={(value) => updateMetadata('gradient_to', value)}
            label="Gradient End"
          />
        </div>
        
        <div 
          className="h-16 rounded-lg border"
          style={{
            background: metadata.gradient_from && metadata.gradient_to 
              ? `linear-gradient(135deg, ${metadata.gradient_from}, ${metadata.gradient_to})`
              : metadata.gradient_from || metadata.gradient_to || '#f3f4f6'
          }}
        >
          <div className="h-full flex items-center justify-center text-sm text-white/80 font-medium">
            Gradient Preview
          </div>
        </div>
      </TabsContent>

      <TabsContent value="cta" className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Primary Button Text</Label>
            <Input
              value={metadata.cta_text || ""}
              onChange={(e) => updateMetadata('cta_text', e.target.value)}
              placeholder="Get Started"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Primary Button Link</Label>
            <Input
              value={metadata.cta_link || ""}
              onChange={(e) => updateMetadata('cta_link', e.target.value)}
              placeholder="/contact"
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Secondary Button Text</Label>
            <Input
              value={metadata.cta_secondary_text || ""}
              onChange={(e) => updateMetadata('cta_secondary_text', e.target.value)}
              placeholder="Learn More"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Secondary Button Link</Label>
            <Input
              value={metadata.cta_secondary_link || ""}
              onChange={(e) => updateMetadata('cta_secondary_link', e.target.value)}
              placeholder="/about"
              className="mt-1"
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="items" className="mt-4">
        <RepeatableItemsEditor
          items={metadata.items || []}
          onChange={(items) => updateMetadata('items', items)}
          label="Section Items"
          showIcon={['features', 'services', 'benefits', 'differentiators'].includes(sectionType)}
          showGradient={['features', 'services'].includes(sectionType)}
          showLink={['services'].includes(sectionType)}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SectionMetadataEditor;
