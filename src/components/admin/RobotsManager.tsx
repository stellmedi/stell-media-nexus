import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, RotateCcw, Download, Copy, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useRobotsTxtSettings, useSaveRobotsTxtSettings } from "@/hooks/use-seo-settings";

const defaultRobotsTxt = `User-agent: *
Allow: /

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-Web
Allow: /

# Dynamic Sitemap
Sitemap: https://eorcqkxfqhgzmbobigcc.supabase.co/functions/v1/serve-sitemap

# Disallow admin areas
Disallow: /admin/
Disallow: /api/`;

export default function RobotsManager() {
  const { data: savedSettings, isLoading } = useRobotsTxtSettings();
  const saveMutation = useSaveRobotsTxtSettings();
  
  const [robotsContent, setRobotsContent] = useState(defaultRobotsTxt);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (savedSettings?.value?.content) {
      setRobotsContent(savedSettings.value.content);
    }
  }, [savedSettings]);

  const saveRobotsContent = async () => {
    try {
      await saveMutation.mutateAsync({ content: robotsContent });
      setHasUnsavedChanges(false);
      toast.success('Robots.txt saved to database');
    } catch (error) {
      console.error('Error saving robots.txt:', error);
      toast.error('Failed to save robots.txt');
    }
  };

  const handleContentChange = (value: string) => {
    setRobotsContent(value);
    setHasUnsavedChanges(true);
  };

  const resetToDefault = () => {
    if (!confirm('Are you sure you want to reset to default robots.txt?')) return;
    setRobotsContent(defaultRobotsTxt);
    setHasUnsavedChanges(true);
    toast.info('Reset to default content');
  };

  const downloadRobotsTxt = () => {
    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Robots.txt downloaded');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(robotsContent);
    toast.success('Content copied to clipboard');
  };

  const validateRobotsTxt = () => {
    const lines = robotsContent.split('\n');
    const issues: string[] = [];
    
    let hasUserAgent = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;
      
      if (line.toLowerCase().startsWith('user-agent:')) {
        hasUserAgent = true;
      } else if (line.toLowerCase().startsWith('allow:') || line.toLowerCase().startsWith('disallow:')) {
        if (!hasUserAgent) {
          issues.push(`Line ${i + 1}: Allow/Disallow directive without User-agent`);
        }
      }
    }
    
    // Check for sitemap directive
    if (!robotsContent.toLowerCase().includes('sitemap:')) {
      issues.push('Missing Sitemap directive');
    }
    
    return issues;
  };

  const validationIssues = validateRobotsTxt();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Robots.txt Management</CardTitle>
        <CardDescription>
          Configure how search engines crawl your website. Changes are saved to the database for version control.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Important notice */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> This editor saves to the database for backup and version control. 
              The live <code className="bg-muted px-1 rounded">robots.txt</code> file is static. 
              Download and replace the static file to update crawlers.
            </AlertDescription>
          </Alert>

          {validationIssues.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Validation Issues:</strong>
                <ul className="mt-2 list-disc list-inside">
                  {validationIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {validationIssues.length === 0 && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                Robots.txt syntax is valid
              </AlertDescription>
            </Alert>
          )}
          
          <div className="relative">
            <Textarea
              value={robotsContent}
              onChange={(e) => handleContentChange(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Enter robots.txt content..."
            />
            {hasUnsavedChanges && (
              <Badge className="absolute top-2 right-2 bg-yellow-100 text-yellow-700">
                Unsaved Changes
              </Badge>
            )}
          </div>
          
          {savedSettings?.updatedAt && (
            <p className="text-sm text-muted-foreground">
              Last saved: {new Date(savedSettings.updatedAt).toLocaleString()}
            </p>
          )}
          
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={resetToDefault}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Default
              </Button>
              <Button variant="outline" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Content
              </Button>
              <Button variant="outline" onClick={downloadRobotsTxt}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <Button 
              onClick={saveRobotsContent}
              disabled={!hasUnsavedChanges || saveMutation.isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              {saveMutation.isPending ? 'Saving...' : hasUnsavedChanges ? 'Save to Database' : 'Saved'}
            </Button>
          </div>

          {/* Dynamic sitemap info */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Dynamic Sitemap URL</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Your sitemap is served dynamically via Edge Function:
            </p>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-background px-2 py-1 rounded border flex-1 overflow-x-auto">
                https://eorcqkxfqhgzmbobigcc.supabase.co/functions/v1/serve-sitemap
              </code>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://eorcqkxfqhgzmbobigcc.supabase.co/functions/v1/serve-sitemap', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
