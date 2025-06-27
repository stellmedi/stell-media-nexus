
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EnhancedContentManager from "./EnhancedContentManager";
import ContentImporter from "./ContentImporter";
import MediaManager from "./MediaManager";

export default function ContentManagement() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="sync" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sync">Content Sync</TabsTrigger>
          <TabsTrigger value="pages">Pages & Content</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="settings">Content Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sync" className="mt-6">
          <ContentImporter />
        </TabsContent>
        
        <TabsContent value="pages" className="mt-6">
          <EnhancedContentManager />
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
              <p className="text-gray-500">Content settings will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
