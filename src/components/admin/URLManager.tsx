
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export default function URLManager() {
  const urls = [
    { path: "/", status: "active", redirects: 0 },
    { path: "/about", status: "active", redirects: 0 },
    { path: "/services", status: "active", redirects: 0 },
    { path: "/contact", status: "active", redirects: 0 },
    { path: "/blog", status: "active", redirects: 0 },
    { path: "/case-studies", status: "active", redirects: 0 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>URLs & Redirects</CardTitle>
        <CardDescription>
          Manage URL structure and redirect rules
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {urls.map((url) => (
            <div key={url.path} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-4 w-4 text-gray-500" />
                <span className="font-mono">{url.path}</span>
                <Badge variant={url.status === "active" ? "default" : "secondary"}>
                  {url.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {url.redirects} redirects
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
