
import React from "react";
import { Badge } from "@/components/ui/badge";

interface PageSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'text' | 'list' | 'features' | 'testimonials' | 'faq' | 'services';
}

interface PageContent {
  id: string;
  pagePath: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: PageSection[];
  lastModified: string;
}

interface ContentPreviewProps {
  pageContent: PageContent;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ pageContent }) => {
  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">Page Title:</h4>
          <p className="text-xl font-semibold">{pageContent.title || "Not set"}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700">Meta Title:</h4>
          <p className="text-sm">{pageContent.metaTitle || "Not set"}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700">Meta Description:</h4>
          <p className="text-sm">{pageContent.metaDescription || "Not set"}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700">Page Sections ({pageContent.sections.length}):</h4>
          <div className="space-y-3 mt-2">
            {pageContent.sections.map((section, index) => (
              <div key={section.id} className="bg-white p-3 rounded border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">Section {index + 1}: {section.title}</span>
                  <Badge variant="outline" className="text-xs">{section.type}</Badge>
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPreview;
