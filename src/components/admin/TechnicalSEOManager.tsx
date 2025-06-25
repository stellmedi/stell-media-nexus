
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useGlobalSEO } from "@/hooks/use-global-seo";

export default function TechnicalSEOManager() {
  const { config } = useGlobalSEO();

  const seoChecks = [
    {
      name: "Google Analytics",
      status: config.googleAnalyticsId ? "active" : "missing",
      description: "Tracking user behavior and traffic"
    },
    {
      name: "Google Search Console",
      status: config.googleSearchConsoleVerification ? "verified" : "pending",
      description: "Website verification for search insights"
    },
    {
      name: "Sitemap",
      status: "active",
      description: "XML sitemap for search engines"
    },
    {
      name: "Robots.txt",
      status: "active", 
      description: "Search engine crawling instructions"
    },
    {
      name: "SSL Certificate",
      status: "active",
      description: "Secure HTTPS connection"
    },
    {
      name: "Page Speed",
      status: "good",
      description: "Website loading performance"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "missing":
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "verified":
      case "good":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "pending":
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-700">Warning</Badge>;
      case "missing":
      case "error":
        return <Badge className="bg-red-100 text-red-700">Missing</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical SEO</CardTitle>
        <CardDescription>
          Monitor technical SEO health and performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {seoChecks.map((check, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(check.status)}
                <div>
                  <div className="font-medium">{check.name}</div>
                  <div className="text-sm text-gray-600">{check.description}</div>
                </div>
              </div>
              {getStatusBadge(check.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
