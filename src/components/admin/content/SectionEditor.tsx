
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface PageSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'text' | 'list' | 'features';
}

interface SectionEditorProps {
  section: PageSection;
  index: number;
  onSectionChange: (sectionId: string, field: keyof PageSection, value: string) => void;
  onRemoveSection: (sectionId: string) => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  index,
  onSectionChange,
  onRemoveSection,
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Section {index + 1}</span>
          <Badge variant="outline">{section.type}</Badge>
        </div>
        <Button 
          onClick={() => onRemoveSection(section.id)} 
          variant="ghost" 
          size="sm"
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
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
          <label className="text-sm font-medium">Section Content</label>
          <Textarea
            value={section.content}
            onChange={(e) => onSectionChange(section.id, 'content', e.target.value)}
            placeholder="Section content"
            className="mt-1 min-h-[100px]"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Section Type</label>
          <Select 
            value={section.type} 
            onValueChange={(value) => onSectionChange(section.id, 'type', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="list">List</SelectItem>
              <SelectItem value="features">Features</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
