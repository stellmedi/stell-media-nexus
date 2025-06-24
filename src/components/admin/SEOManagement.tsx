
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetaTagsManager from "./MetaTagsManager";
import URLManager from "./URLManager";
import ImageSEOManager from "./ImageSEOManager";
import TechnicalSEOManager from "./TechnicalSEOManager";

export default function SEOManagement() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="meta" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="meta">Meta Tags & Titles</TabsTrigger>
          <TabsTrigger value="urls">URLs & Redirects</TabsTrigger>
          <TabsTrigger value="images">Image SEO</TabsTrigger>
          <TabsTrigger value="technical">Technical SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meta" className="mt-6">
          <MetaTagsManager />
        </TabsContent>
        
        <TabsContent value="urls" className="mt-6">
          <URLManager />
        </TabsContent>
        
        <TabsContent value="images" className="mt-6">
          <ImageSEOManager />
        </TabsContent>
        
        <TabsContent value="technical" className="mt-6">
          <TechnicalSEOManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
