
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SitemapManager from "./SitemapManager";
import RobotsManager from "./RobotsManager";
import GlobalSEOManager from "./GlobalSEOManager";
import SchemaManager from "./SchemaManager";

export default function TechnicalSEOManager() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="sitemap" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sitemap">XML Sitemap</TabsTrigger>
          <TabsTrigger value="robots">Robots.txt</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & GSC</TabsTrigger>
          <TabsTrigger value="schema">Schema Markup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sitemap" className="mt-6">
          <SitemapManager />
        </TabsContent>
        
        <TabsContent value="robots" className="mt-6">
          <RobotsManager />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <GlobalSEOManager />
        </TabsContent>
        
        <TabsContent value="schema" className="mt-6">
          <SchemaManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
