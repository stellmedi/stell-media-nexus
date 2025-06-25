
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Video } from "lucide-react";
import EnhancedContentManager from "./EnhancedContentManager";

export default function ContentManagement() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages">Pages & Content</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="settings">Content Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages" className="mt-6">
          <EnhancedContentManager />
        </TabsContent>
        
        <TabsContent value="media" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Media Library
              </CardTitle>
              <CardDescription>Manage images and videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <Image className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Upload Image</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <Video className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Upload Video</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
