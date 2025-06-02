
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useGlobalSEO } from '@/hooks/use-global-seo';
import { Globe, BarChart3, Search, Bot, Brain } from 'lucide-react';

const GlobalSEOManager: React.FC = () => {
  const { config, isLoading, updateConfig } = useGlobalSEO();
  const [formData, setFormData] = useState({
    googleAnalyticsId: '',
    googleSearchConsoleVerification: '',
    googleTagManagerId: '',
    enableAISEO: true,
    aiCrawlerInstructions: '',
    perplexityOptimization: true,
    chatgptOptimization: true
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      console.log('GlobalSEOManager: Setting form data from config:', config);
      setFormData(config);
    }
  }, [config, isLoading]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log('GlobalSEOManager: Saving global config:', formData);
    
    try {
      const success = updateConfig(formData);
      
      if (success) {
        toast.success('Global SEO settings saved successfully');
      } else {
        toast.error('Failed to save global SEO settings');
      }
    } catch (error) {
      console.error('Error saving global SEO settings:', error);
      toast.error('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    console.log('GlobalSEOManager: Resetting to saved values');
    setFormData(config);
    toast.info('Form reset to saved values');
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-sm text-gray-500">Loading global SEO settings...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasUnsavedChanges = JSON.stringify(formData) !== JSON.stringify(config);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Google Analytics
          </CardTitle>
          <CardDescription>
            Configure Google Analytics tracking for your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ga-id">Google Analytics Tracking ID</Label>
            <Input
              id="ga-id"
              value={formData.googleAnalyticsId}
              onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
              placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Enter your Google Analytics 4 measurement ID (starts with G-) or Universal Analytics tracking ID (starts with UA-)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Google Search Console
          </CardTitle>
          <CardDescription>
            Verify your website ownership with Google Search Console
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gsc-verification">Google Site Verification Code</Label>
            <Input
              id="gsc-verification"
              value={formData.googleSearchConsoleVerification}
              onChange={(e) => handleInputChange('googleSearchConsoleVerification', e.target.value)}
              placeholder="Enter verification code (without meta tag)"
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Enter only the content value from the verification meta tag, not the entire tag
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Google Tag Manager
          </CardTitle>
          <CardDescription>
            Configure Google Tag Manager for advanced tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gtm-id">Google Tag Manager Container ID</Label>
            <Input
              id="gtm-id"
              value={formData.googleTagManagerId}
              onChange={(e) => handleInputChange('googleTagManagerId', e.target.value)}
              placeholder="GTM-XXXXXXX"
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Enter your Google Tag Manager container ID (starts with GTM-)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Search Engine Optimization
          </CardTitle>
          <CardDescription>
            Configure global settings for AI-powered search engines like ChatGPT and Perplexity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enable-ai-seo"
                checked={formData.enableAISEO}
                onChange={(e) => handleInputChange('enableAISEO', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="enable-ai-seo">Enable AI SEO optimization globally</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ai-crawler-instructions">Global AI Crawler Instructions</Label>
              <Textarea
                id="ai-crawler-instructions"
                value={formData.aiCrawlerInstructions}
                onChange={(e) => handleInputChange('aiCrawlerInstructions', e.target.value)}
                placeholder="Global instructions for AI crawlers about your website content"
                className="min-h-[80px]"
              />
              <p className="text-xs text-gray-500">
                These instructions will be included globally for AI search engines
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Platform Specific Settings
          </CardTitle>
          <CardDescription>
            Enable or disable optimization for specific AI platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="perplexity-optimization"
                checked={formData.perplexityOptimization}
                onChange={(e) => handleInputChange('perplexityOptimization', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="perplexity-optimization">Enable Perplexity AI optimization</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="chatgpt-optimization"
                checked={formData.chatgptOptimization}
                onChange={(e) => handleInputChange('chatgptOptimization', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="chatgpt-optimization">Enable ChatGPT/OpenAI optimization</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600"
          >
            {isSaving ? 'Saving...' : 'Save Global Settings'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasUnsavedChanges}
          >
            Reset
          </Button>
        </div>

        {hasUnsavedChanges && (
          <div className="flex items-center text-sm text-amber-600">
            <span className="mr-2">⚠️</span>
            You have unsaved changes
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSEOManager;
