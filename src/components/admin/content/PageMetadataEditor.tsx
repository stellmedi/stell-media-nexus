
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PageContent {
  id: string;
  pagePath: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface PageMetadataEditorProps {
  pageContent: PageContent;
  onContentChange: (field: keyof PageContent, value: string) => void;
}

const PageMetadataEditor: React.FC<PageMetadataEditorProps> = ({
  pageContent,
  onContentChange,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h4 className="font-medium mb-3">Page Metadata</h4>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Page Title</label>
          <Input
            value={pageContent.title || ""}
            onChange={(e) => onContentChange('title', e.target.value)}
            placeholder="Page title"
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Meta Title (SEO)</label>
          <Input
            value={pageContent.metaTitle || ""}
            onChange={(e) => onContentChange('metaTitle', e.target.value)}
            placeholder="Title that appears in search results"
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Meta Description (SEO)</label>
          <Textarea
            value={pageContent.metaDescription || ""}
            onChange={(e) => onContentChange('metaDescription', e.target.value)}
            placeholder="Description that appears in search results"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PageMetadataEditor;
