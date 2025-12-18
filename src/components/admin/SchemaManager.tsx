import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Code } from "lucide-react";
import { usePageSEO, useSavePageSEO } from "@/hooks/use-page-seo";

const availablePages = [
  { path: "/", name: "Home Page" },
  { path: "/about", name: "About Page" },
  { path: "/services", name: "Services Page" },
  { path: "/contact", name: "Contact Page" }
];

const schemaTypes = [
  { value: "WebPage", label: "WebPage" },
  { value: "Article", label: "Article" },
  { value: "Service", label: "Service" },
  { value: "LocalBusiness", label: "LocalBusiness" },
  { value: "Organization", label: "Organization" },
  { value: "FAQ", label: "FAQ" }
];

export default function SchemaManager() {
  const [selectedPage, setSelectedPage] = useState("/");
  const [schemaType, setSchemaType] = useState("WebPage");
  const [schemaData, setSchemaData] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const { seoData, isLoading: dataLoading } = usePageSEO(selectedPage);
  const savePageSEO = useSavePageSEO();

  useEffect(() => {
    if (!dataLoading) {
      setSchemaType(seoData?.schemaType || "WebPage");
      setSchemaData(seoData?.schemaData || "");
      setHasUnsavedChanges(false);
    }
  }, [selectedPage, seoData, dataLoading]);

  const handleSchemaTypeChange = (value: string) => {
    setSchemaType(value);
    setHasUnsavedChanges(true);
  };

  const handleSchemaDataChange = (value: string) => {
    setSchemaData(value);
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...seoData,
        schemaType,
        schemaData
      };
      
      const result = await savePageSEO.mutateAsync({
        pagePath: selectedPage,
        seoData: updatedData
      });
      
      if (result.success) {
        setHasUnsavedChanges(false);
        toast.success("Schema markup saved successfully!");
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving schema markup:', error);
      toast.error("Error saving schema markup");
    }
  };

  const generateSampleSchema = () => {
    const samples = {
      WebPage: `{
  "name": "Page Title",
  "description": "Page description"
}`,
      Article: `{
  "headline": "Article Title",
  "author": "Author Name",
  "datePublished": "2024-01-01"
}`,
      Service: `{
  "name": "Service Name",
  "description": "Service description",
  "provider": "Stell Media"
}`,
      LocalBusiness: `{
  "name": "Business Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Street",
    "addressLocality": "City"
  }
}`,
      Organization: `{
  "name": "Stell Media",
  "description": "E-commerce optimization experts"
}`,
      FAQ: `{
  "mainEntity": [{
    "@type": "Question",
    "name": "What services do you offer?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We offer SEO and optimization services."
    }
  }]
}`
    };
    
    setSchemaData(samples[schemaType as keyof typeof samples] || "");
    setHasUnsavedChanges(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Schema Markup
          {hasUnsavedChanges && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Unsaved Changes
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Add structured data markup to help search engines understand your content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="page-select">Select Page</Label>
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Choose a page" />
            </SelectTrigger>
            <SelectContent>
              {availablePages.map((page) => (
                <SelectItem key={page.path} value={page.path}>
                  {page.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="schema-type">Schema Type</Label>
          <Select value={schemaType} onValueChange={handleSchemaTypeChange}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {schemaTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="schema-data">Schema JSON Data</Label>
            <Button variant="outline" size="sm" onClick={generateSampleSchema}>
              Generate Sample
            </Button>
          </div>
          <Textarea
            id="schema-data"
            value={schemaData}
            onChange={(e) => handleSchemaDataChange(e.target.value)}
            placeholder='{"name": "Your Content", "description": "Description"}'
            className="min-h-[200px] font-mono text-sm"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter JSON data (without @context and @type, they will be added automatically)
          </p>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={handleSave}
            disabled={!hasUnsavedChanges || savePageSEO.isPending}
            className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            <Save className="h-4 w-4 mr-2" />
            {savePageSEO.isPending ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
