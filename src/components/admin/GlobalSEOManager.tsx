import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, Globe, BarChart3, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface GlobalSEOConfig {
  siteName: string;
  siteDescription: string;
  defaultOgImage: string;
  googleAnalyticsId: string;
  googleSearchConsoleVerification: string;
  googleTagManagerId: string;
  bingWebmasterVerification: string;
  facebookDomainVerification: string;
}

const defaultConfig: GlobalSEOConfig = {
  siteName: "Stell Media",
  siteDescription: "Leading e-commerce optimization agency specializing in product discovery, search optimization, and conversion enhancement services",
  defaultOgImage: "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
  googleAnalyticsId: "G-8MK59B7JZV",
  googleSearchConsoleVerification: "",
  googleTagManagerId: "",
  bingWebmasterVerification: "",
  facebookDomainVerification: ""
};

export default function GlobalSEOManager() {
  const [config, setConfig] = useState<GlobalSEOConfig>(defaultConfig);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('stellmedia_global_seo_config');
      if (saved) {
        const data = JSON.parse(saved);
        setConfig({ ...defaultConfig, ...data });
      }
    } catch (error) {
      console.error('Error loading global SEO config:', error);
    }
  };

  const handleInputChange = (field: keyof GlobalSEOConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('stellmedia_global_seo_config', JSON.stringify(config));
      
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('globalSEOUpdated', {
        detail: { config }
      }));
      
      setHasUnsavedChanges(false);
      toast.success('Global SEO settings saved successfully!', {
        description: 'Analytics and verification codes have been updated.',
        duration: 3000
      });
    } catch (error) {
      console.error('Error saving global SEO config:', error);
      toast.error('Failed to save global SEO settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (hasUnsavedChanges && !confirm('Are you sure you want to reset? This will lose your unsaved changes.')) {
      return;
    }
    
    setConfig(defaultConfig);
    setHasUnsavedChanges(false);
    toast.info('Global SEO settings reset to defaults');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Global SEO Settings
            {hasUnsavedChanges && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Unsaved Changes
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Configure site-wide SEO settings, analytics, and verification codes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Site Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Site Information</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={config.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  placeholder="Your website name"
                />
              </div>
              <div>
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  value={config.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  placeholder="Brief description of your website"
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="default-og-image">Default OG Image URL</Label>
                <Input
                  id="default-og-image"
                  value={config.defaultOgImage}
                  onChange={(e) => handleInputChange('defaultOgImage', e.target.value)}
                  placeholder="https://yourdomain.com/default-image.jpg"
                />
              </div>
            </div>
          </div>

          {/* Google Analytics & Search Console */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <h3 className="text-lg font-medium">Google Analytics & Search Console</h3>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Analytics Integration</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Enter your Google Analytics and Search Console verification codes below. These will be automatically added to all pages.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="ga-id">Google Analytics ID</Label>
                <Input
                  id="ga-id"
                  value={config.googleAnalyticsId}
                  onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your GA4 Measurement ID (starts with G-)
                </p>
              </div>
              
              <div>
                <Label htmlFor="gsc-verification">Google Search Console Verification</Label>
                <Input
                  id="gsc-verification"
                  value={config.googleSearchConsoleVerification}
                  onChange={(e) => handleInputChange('googleSearchConsoleVerification', e.target.value)}
                  placeholder="verification code from Google Search Console"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Meta tag verification code from Google Search Console
                </p>
              </div>
              
              <div>
                <Label htmlFor="gtm-id">Google Tag Manager ID (Optional)</Label>
                <Input
                  id="gtm-id"
                  value={config.googleTagManagerId}
                  onChange={(e) => handleInputChange('googleTagManagerId', e.target.value)}
                  placeholder="GTM-XXXXXXX"
                />
                <p className="text-sm text-gray-500 mt-1">
                  If you use GTM instead of direct GA4
                </p>
              </div>
            </div>
          </div>

          {/* Other Verification Codes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              <h3 className="text-lg font-medium">Other Verification Codes</h3>
            </div>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="bing-verification">Bing Webmaster Tools Verification</Label>
                <Input
                  id="bing-verification"
                  value={config.bingWebmasterVerification}
                  onChange={(e) => handleInputChange('bingWebmasterVerification', e.target.value)}
                  placeholder="Bing verification code"
                />
              </div>
              
              <div>
                <Label htmlFor="facebook-verification">Facebook Domain Verification</Label>
                <Input
                  id="facebook-verification"
                  value={config.facebookDomainVerification}
                  onChange={(e) => handleInputChange('facebookDomainVerification', e.target.value)}
                  placeholder="Facebook domain verification code"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t">
            <Button variant="outline" onClick={handleReset} disabled={isLoading}>
              Reset to Defaults
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!hasUnsavedChanges || isLoading}
              className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
