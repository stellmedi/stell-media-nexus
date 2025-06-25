
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SectionEditor from "./SectionEditor";

interface PageSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'text' | 'list' | 'features';
}

interface SectionsManagerProps {
  sections: PageSection[];
  onSectionChange: (sectionId: string, field: keyof PageSection, value: string) => void;
  onAddSection: () => void;
  onRemoveSection: (sectionId: string) => void;
}

const SectionsManager: React.FC<SectionsManagerProps> = ({
  sections,
  onSectionChange,
  onAddSection,
  onRemoveSection,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Page Sections</h4>
        <Button onClick={onAddSection} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>
      
      {sections.map((section, index) => (
        <SectionEditor
          key={section.id}
          section={section}
          index={index}
          onSectionChange={onSectionChange}
          onRemoveSection={onRemoveSection}
        />
      ))}
    </div>
  );
};

export default SectionsManager;
