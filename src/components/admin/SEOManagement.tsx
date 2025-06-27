
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetaTagsManager from "./MetaTagsManager";
import MediaManager from "./MediaManager";
import RedirectManager from "./RedirectManager";
import TechnicalSEOTabs from "./TechnicalSEOTabs";
import GlobalSEOManager from "./GlobalSEOManager";

export default function SEOManagement() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="meta" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="meta">Meta Tags & Titles</TabsTrigger>
          <TabsTrigger value="media">Media & Images</TabsTrigger>
          <TabsTrigger value="urls">URLs & Redirects</TabsTrigger>
          <TabsTrigger value="technical">Technical SEO</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Verification</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meta" className="mt-6">
          <MetaTagsManager />
        </TabsContent>
        
        <TabsContent value="media" className="mt-6">
          <MediaManager />
        </TabsContent>
        
        <TabsContent value="urls" className="mt-6">
          <RedirectManager />
        </TabsContent>
        
        <TabsContent value="technical" className="mt-6">
          <TechnicalSEOTabs />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <GlobalSEOManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
