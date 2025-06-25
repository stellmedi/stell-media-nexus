
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface PageContent {
  id: string;
  pagePath: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
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
          <Label className="text-sm font-medium">Page Title</Label>
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

        <Separator />
        
        <div>
          <Label className="text-sm font-medium">SEO Meta Title</Label>
          <Input
            value={pageContent.metaTitle || ""}
            onChange={(e) => onContentChange('metaTitle', e.target.value)}
            placeholder="SEO meta title (50-60 characters)"
            className="mt-1"
            maxLength={60}
          />
          <p className="text-xs text-gray-500 mt-1">
            {(pageContent.metaTitle || "").length}/60 characters - Used in search results
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium">SEO Meta Description</Label>
          <Textarea
            value={pageContent.metaDescription || ""}
            onChange={(e) => onContentChange('metaDescription', e.target.value)}
            placeholder="SEO meta description (150-160 characters)"
            className="mt-1"
            rows={2}
            maxLength={160}
          />
          <p className="text-xs text-gray-500 mt-1">
            {(pageContent.metaDescription || "").length}/160 characters - Used in search results
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium">Keywords</Label>
          <Input
            value={pageContent.keywords || ""}
            onChange={(e) => onContentChange('keywords', e.target.value)}
            placeholder="Comma-separated keywords"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Keywords for SEO (e.g., digital marketing, SEO, real estate)
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium">Canonical URL</Label>
          <Input
            value={pageContent.canonicalUrl || ""}
            onChange={(e) => onContentChange('canonicalUrl', e.target.value)}
            placeholder="https://stellmedia.com/page-path"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Canonical URL for SEO (prevents duplicate content issues)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageMetadataEditor;
