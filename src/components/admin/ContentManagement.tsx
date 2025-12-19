import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EnhancedContentManager from "./EnhancedContentManager";
import ContentImporter from "./ContentImporter";
import MediaManager from "./MediaManager";
import BlogPostManager from "./BlogPostManager";
import FAQManager from "./FAQManager";
import ServicesManager from "./ServicesManager";

export default function ContentManagement() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="sync" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="sync">Content Sync</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sync" className="mt-6">
          <ContentImporter />
        </TabsContent>
        
        <TabsContent value="pages" className="mt-6">
          <EnhancedContentManager />
        </TabsContent>

        <TabsContent value="blog" className="mt-6">
          <BlogPostManager />
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <FAQManager />
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <ServicesManager />
        </TabsContent>
        
        <TabsContent value="media" className="mt-6">
          <MediaManager />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure content management options</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Content settings will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
