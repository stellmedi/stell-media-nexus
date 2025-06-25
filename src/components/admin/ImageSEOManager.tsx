
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, AlertCircle, CheckCircle } from "lucide-react";

export default function ImageSEOManager() {
  const images = [
    { 
      src: "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
      alt: "Stell Media Logo",
      status: "optimized",
      size: "45KB"
    },
    {
      src: "/lovable-uploads/d1aeb466-efb1-4d25-900f-37414e5d0863.png", 
      alt: "Feature illustration",
      status: "needs-alt",
      size: "120KB"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image SEO</CardTitle>
        <CardDescription>
          Optimize images for search engines and performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {images.map((image, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Image className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-mono text-sm">{image.src.split('/').pop()}</div>
                  <div className="text-xs text-gray-600">{image.alt}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{image.size}</span>
                {image.status === "optimized" ? (
                  <Badge variant="default" className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Optimized
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Needs Alt
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
