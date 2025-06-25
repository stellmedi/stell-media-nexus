
import React from "react";
import { Input } from "@/components/ui/input";

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
      <h4 className="font-medium mb-3">Page Information</h4>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Page Title</label>
          <Input
            value={pageContent.title || ""}
            onChange={(e) => onContentChange('title', e.target.value)}
            placeholder="Page title"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            This is the main page title (not for SEO)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageMetadataEditor;
