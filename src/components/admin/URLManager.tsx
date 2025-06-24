
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RedirectManager from "./RedirectManager";
import CanonicalManager from "./CanonicalManager";

export default function URLManager() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="redirects" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="redirects">Redirect Management</TabsTrigger>
          <TabsTrigger value="canonical">Canonical URLs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="redirects" className="mt-6">
          <RedirectManager />
        </TabsContent>
        
        <TabsContent value="canonical" className="mt-6">
          <CanonicalManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
