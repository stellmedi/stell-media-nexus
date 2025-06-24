
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, RotateCcw, Download, Upload } from "lucide-react";
import { toast } from "sonner";

const defaultRobotsTxt = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-Web
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: https://stellmedia.com/sitemap.xml`;

export default function RobotsManager() {
  const [robotsContent, setRobotsContent] = useState(defaultRobotsTxt);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');

  useEffect(() => {
    loadRobotsContent();
  }, []);

  const loadRobotsContent = () => {
    try {
      const saved = localStorage.getItem('stellmedia_robots_txt');
      if (saved) {
        const data = JSON.parse(saved);
        setRobotsContent(data.content);
        setLastSaved(data.lastSaved);
      }
    } catch (error) {
      console.error('Error loading robots.txt:', error);
    }
  };

  const saveRobotsContent = () => {
    try {
      const data = {
        content: robotsContent,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('stellmedia_robots_txt', JSON.stringify(data));
      setLastSaved(data.lastSaved);
      setHasUnsavedChanges(false);
      
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('robotsUpdated', {
        detail: data
      }));
      
      toast.success('Robots.txt saved successfully');
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

  const validateRobotsTxt = () => {
    const lines = robotsContent.split('\n');
    const issues = [];
    
    let hasUserAgent = false;
    let currentUserAgent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;
      
      if (line.toLowerCase().startsWith('user-agent:')) {
        hasUserAgent = true;
        currentUserAgent = line;
      } else if (line.toLowerCase().startsWith('allow:') || line.toLowerCase().startsWith('disallow:')) {
        if (!hasUserAgent) {
          issues.push(`Line ${i + 1}: Allow/Disallow directive without User-agent`);
        }
      }
    }
    
    return issues;
  };

  const validationIssues = validateRobotsTxt();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Robots.txt Management</CardTitle>
        <CardDescription>
          Configure how search engines crawl your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {validationIssues.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Validation Issues:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {validationIssues.map((issue, index) => (
                  <li key={index}>• {issue}</li>
                ))}
              </ul>
            </div>
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
          
          {lastSaved && (
            <p className="text-sm text-gray-500">
              Last saved: {new Date(lastSaved).toLocaleString()}
            </p>
          )}
          
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button variant="outline" onClick={resetToDefault}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Default
              </Button>
              <Button variant="outline" onClick={downloadRobotsTxt}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <Button 
              onClick={saveRobotsContent}
              disabled={!hasUnsavedChanges}
              className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Save className="h-4 w-4 mr-2" />
              {hasUnsavedChanges ? 'Save Changes' : 'Saved'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
