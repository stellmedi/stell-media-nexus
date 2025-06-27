
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnhancedSitemapManager from "./EnhancedSitemapManager";
import RobotsManager from "./RobotsManager";

export default function TechnicalSEOTabs() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="sitemap" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sitemap">XML Sitemap</TabsTrigger>
          <TabsTrigger value="robots">Robots.txt</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sitemap" className="mt-6">
          <EnhancedSitemapManager />
        </TabsContent>
        
        <TabsContent value="robots" className="mt-6">
          <RobotsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
