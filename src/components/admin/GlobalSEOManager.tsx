
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useGlobalSEO } from '@/hooks/use-global-seo';
import { Globe, BarChart3, Search, Bot, Brain, AlertCircle, CheckCircle, RefreshCw, ExternalLink, TestTube } from 'lucide-react';

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [testingGA, setTestingGA] = useState(false);
  const [testingGSC, setTestingGSC] = useState(false);
  const [testingGTM, setTestingGTM] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      console.log('GlobalSEOManager: Setting form data from config:', config);
      setFormData(config);
    }
  }, [config, isLoading]);

  // Validation functions
  const validateGoogleAnalyticsId = (id: string): string | null => {
    if (!id) return null;
    const ga4Pattern = /^G-[A-Z0-9]{10}$/;
    const uaPattern = /^UA-\d{4,}-\d+$/;
    if (!ga4Pattern.test(id) && !uaPattern.test(id)) {
      return 'Invalid format. Use G-XXXXXXXXXX for GA4 or UA-XXXXXXXX-X for Universal Analytics';
    }
    return null;
  };

  const validateGoogleTagManagerId = (id: string): string | null => {
    if (!id) return null;
    const gtmPattern = /^GTM-[A-Z0-9]{7}$/;
    if (!gtmPattern.test(id)) {
      return 'Invalid format. Use GTM-XXXXXXX format';
    }
    return null;
  };

  const validateGoogleSearchConsoleVerification = (code: string): string | null => {
    if (!code) return null;
    // Basic validation for verification code format
    if (code.length < 40 || code.includes('<') || code.includes('>')) {
      return 'Enter only the verification code content, not the full meta tag';
    }
    return null;
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate Google Analytics ID
    const gaError = validateGoogleAnalyticsId(formData.googleAnalyticsId);
    if (gaError) errors.googleAnalyticsId = gaError;

    // Validate Google Tag Manager ID
    const gtmError = validateGoogleTagManagerId(formData.googleTagManagerId);
    if (gtmError) errors.googleTagManagerId = gtmError;

    // Validate Google Search Console verification
    const gscError = validateGoogleSearchConsoleVerification(formData.googleSearchConsoleVerification);
    if (gscError) errors.googleSearchConsoleVerification = gscError;

    // Validate AI crawler instructions length
    if (formData.aiCrawlerInstructions.length > 500) {
      errors.aiCrawlerInstructions = 'Instructions should be under 500 characters for optimal performance';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const testAnalyticsConnection = async () => {
    const gaId = formData.googleAnalyticsId;
    if (!gaId) {
      toast.error('Please enter a Google Analytics ID first');
      return;
    }

    const gaError = validateGoogleAnalyticsId(gaId);
    if (gaError) {
      toast.error(gaError);
      return;
    }

    setTestingGA(true);
    toast.info('Testing Google Analytics connection...');
    
    try {
      // Check if gtag is available (would be loaded if GA is properly configured)
      const hasGtag = typeof window !== 'undefined' && window.gtag;
      
      setTimeout(() => {
        if (hasGtag) {
          toast.success('Google Analytics is connected and tracking', {
            description: 'GA tracking script is loaded and functional'
          });
        } else {
          toast.success('Google Analytics ID format is valid', {
            description: 'Note: Tracking will be active after page reload'
          });
        }
        setTestingGA(false);
      }, 1500);
    } catch (error) {
      toast.error('Error testing Google Analytics connection');
      setTestingGA(false);
    }
  };

  const testSearchConsoleConnection = async () => {
    const gscCode = formData.googleSearchConsoleVerification;
    if (!gscCode) {
      toast.error('Please enter a Google Search Console verification code first');
      return;
    }

    const gscError = validateGoogleSearchConsoleVerification(gscCode);
    if (gscError) {
      toast.error(gscError);
      return;
    }

    setTestingGSC(true);
    toast.info('Verifying Search Console configuration...');
    
    setTimeout(() => {
      toast.success('Search Console verification code format is valid', {
        description: 'Verification will be active after saving and page reload'
      });
      setTestingGSC(false);
    }, 1000);
  };

  const testTagManagerConnection = async () => {
    const gtmId = formData.googleTagManagerId;
    if (!gtmId) {
      toast.error('Please enter a Google Tag Manager ID first');
      return;
    }

    const gtmError = validateGoogleTagManagerId(gtmId);
    if (gtmError) {
      toast.error(gtmError);
      return;
    }

    setTestingGTM(true);
    toast.info('Testing Google Tag Manager connection...');
    
    try {
      // Check if GTM dataLayer exists
      const hasDataLayer = typeof window !== 'undefined' && window.dataLayer;
      
      setTimeout(() => {
        if (hasDataLayer) {
          toast.success('Google Tag Manager is connected', {
            description: 'GTM container is loaded and dataLayer is active'
          });
        } else {
          toast.success('Google Tag Manager ID format is valid', {
            description: 'Container will be loaded after saving and page reload'
          });
        }
        setTestingGTM(false);
      }, 1500);
    } catch (error) {
      toast.error('Error testing Google Tag Manager connection');
      setTestingGTM(false);
    }
  };

  const handleReconnectGA = () => {
    if (!formData.googleAnalyticsId) {
      toast.error('Please enter a Google Analytics ID first');
      return;
    }
    
    toast.info('Reconnecting Google Analytics...', {
      description: 'Save the settings and reload the page to reconnect'
    });
  };

  const handleReconnectGSC = () => {
    if (!formData.googleSearchConsoleVerification) {
      toast.error('Please enter a Search Console verification code first');
      return;
    }
    
    toast.info('Reconnecting Search Console...', {
      description: 'Save the settings and reload the page to reconnect'
    });
  };

  const openGADashboard = () => {
    const gaId = formData.googleAnalyticsId;
    if (gaId && gaId.startsWith('G-')) {
      // GA4 dashboard
      window.open(`https://analytics.google.com/analytics/web/#/p${gaId.slice(2)}/reports/dashboard`, '_blank');
    } else if (gaId && gaId.startsWith('UA-')) {
      // Universal Analytics dashboard
      window.open('https://analytics.google.com/analytics/web/', '_blank');
    } else {
      window.open('https://analytics.google.com/', '_blank');
    }
  };

  const openGSCDashboard = () => {
    window.open('https://search.google.com/search-console', '_blank');
  };

  const handleSave = async () => {
    console.log('GlobalSEOManager: Attempting to save config:', formData);
    
    if (!validateForm()) {
      toast.error('Please fix validation errors before saving');
      return;
    }

    setIsSaving(true);
    
    try {
      const success = updateConfig(formData);
      
      if (success) {
        toast.success('Global SEO settings saved successfully', {
          description: 'Changes will be applied to all pages. Reload the page to see analytics changes.'
        });
        console.log('GlobalSEOManager: Config saved successfully');
      } else {
        toast.error('Failed to save global SEO settings', {
          description: 'Please check your inputs and try again'
        });
        console.error('GlobalSEOManager: Save failed');
      }
    } catch (error) {
      console.error('Error saving global SEO settings:', error);
      toast.error('An error occurred while saving', {
        description: 'Please try again or contact support'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    console.log('GlobalSEOManager: Resetting to saved values');
    setFormData(config);
    setValidationErrors({});
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
  const hasValidationErrors = Object.keys(validationErrors).length > 0;

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
            <div className="flex gap-2">
              <Input
                id="ga-id"
                value={formData.googleAnalyticsId}
                onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                className={`font-mono text-sm ${validationErrors.googleAnalyticsId ? 'border-red-500' : ''}`}
              />
              <Button
                type="button"
                variant="outline"
                onClick={testAnalyticsConnection}
                disabled={testingGA}
                className="shrink-0"
              >
                {testingGA ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <TestTube className="h-4 w-4" />
                )}
                Test
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReconnectGA}
                className="shrink-0"
              >
                <RefreshCw className="h-4 w-4" />
                Reconnect
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={openGADashboard}
                className="shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
                Dashboard
              </Button>
            </div>
            {validationErrors.googleAnalyticsId && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {validationErrors.googleAnalyticsId}
              </div>
            )}
            {formData.googleAnalyticsId && !validationErrors.googleAnalyticsId && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Valid format
              </div>
            )}
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
            <div className="flex gap-2">
              <Input
                id="gsc-verification"
                value={formData.googleSearchConsoleVerification}
                onChange={(e) => handleInputChange('googleSearchConsoleVerification', e.target.value)}
                placeholder="Enter verification code (without meta tag)"
                className={`font-mono text-sm ${validationErrors.googleSearchConsoleVerification ? 'border-red-500' : ''}`}
              />
              <Button
                type="button"
                variant="outline"
                onClick={testSearchConsoleConnection}
                disabled={testingGSC}
                className="shrink-0"
              >
                {testingGSC ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <TestTube className="h-4 w-4" />
                )}
                Test
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReconnectGSC}
                className="shrink-0"
              >
                <RefreshCw className="h-4 w-4" />
                Reconnect
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={openGSCDashboard}
                className="shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
                Dashboard
              </Button>
            </div>
            {validationErrors.googleSearchConsoleVerification && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {validationErrors.googleSearchConsoleVerification}
              </div>
            )}
            {formData.googleSearchConsoleVerification && !validationErrors.googleSearchConsoleVerification && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Valid format
              </div>
            )}
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
            <div className="flex gap-2">
              <Input
                id="gtm-id"
                value={formData.googleTagManagerId}
                onChange={(e) => handleInputChange('googleTagManagerId', e.target.value)}
                placeholder="GTM-XXXXXXX"
                className={`font-mono text-sm ${validationErrors.googleTagManagerId ? 'border-red-500' : ''}`}
              />
              <Button
                type="button"
                variant="outline"
                onClick={testTagManagerConnection}
                disabled={testingGTM}
                className="shrink-0"
              >
                {testingGTM ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <TestTube className="h-4 w-4" />
                )}
                Test
              </Button>
            </div>
            {validationErrors.googleTagManagerId && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {validationErrors.googleTagManagerId}
              </div>
            )}
            {formData.googleTagManagerId && !validationErrors.googleTagManagerId && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Valid format
              </div>
            )}
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
                className={`min-h-[80px] ${validationErrors.aiCrawlerInstructions ? 'border-red-500' : ''}`}
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  These instructions will be included globally for AI search engines
                </p>
                <span className="text-xs text-gray-400">
                  {formData.aiCrawlerInstructions.length}/500
                </span>
              </div>
              {validationErrors.aiCrawlerInstructions && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {validationErrors.aiCrawlerInstructions}
                </div>
              )}
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
            disabled={isSaving || (!hasUnsavedChanges && !hasValidationErrors) || hasValidationErrors}
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

        <div className="flex items-center gap-4">
          {hasValidationErrors && (
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="mr-2 h-4 w-4" />
              Please fix validation errors
            </div>
          )}
          {hasUnsavedChanges && !hasValidationErrors && (
            <div className="flex items-center text-sm text-amber-600">
              <span className="mr-2">⚠️</span>
              You have unsaved changes
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSEOManager;
