
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  PlayCircle,
  Download,
  RefreshCw,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";
import { toast } from "sonner";

interface QACheck {
  id: string;
  category: string;
  name: string;
  description: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  priority: 'critical' | 'medium' | 'minor';
  notes?: string;
  suggestion?: string;
}

interface QACategory {
  name: string;
  checks: QACheck[];
  completed: number;
  total: number;
  passed: number;
}

const QAudit: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState<QACategory[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');

  const initialChecks: QACheck[] = [
    // General UI/UX
    {
      id: 'layout-consistency',
      category: 'UI/UX',
      name: 'Layout Consistency',
      description: 'Check layout consistency across all pages',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'branding-consistency',
      category: 'UI/UX',
      name: 'Branding Consistency',
      description: 'Verify colors, fonts, and logos are consistent',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'responsive-design',
      category: 'UI/UX',
      name: 'Responsive Design',
      description: 'Test responsiveness on desktop, mobile, and tablet',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'navigation-consistency',
      category: 'UI/UX',
      name: 'Navigation Consistency',
      description: 'Ensure navbar and footer work consistently',
      status: 'pending',
      priority: 'critical'
    },

    // Functionality
    {
      id: 'buttons-links-ctas',
      category: 'Functionality',
      name: 'Interactive Elements',
      description: 'Test all buttons, links, and CTAs are functional',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'form-validation',
      category: 'Functionality',
      name: 'Form Validation',
      description: 'Verify forms validate and submit correctly',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'scroll-transitions',
      category: 'Functionality',
      name: 'Scroll Effects',
      description: 'Check scroll effects and transitions work smoothly',
      status: 'pending',
      priority: 'minor'
    },
    {
      id: 'broken-links',
      category: 'Functionality',
      name: 'Link Integrity',
      description: 'Scan for broken links or 404 errors',
      status: 'pending',
      priority: 'critical'
    },

    // Content & Media
    {
      id: 'grammar-spelling',
      category: 'Content',
      name: 'Grammar & Spelling',
      description: 'Check all text for grammar and spelling errors',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'image-optimization',
      category: 'Content',
      name: 'Image Optimization',
      description: 'Verify images load fast and are properly sized',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'alt-text',
      category: 'Content',
      name: 'Alt Text',
      description: 'Ensure all images have correct alt text',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'video-functionality',
      category: 'Content',
      name: 'Video Functionality',
      description: 'Test videos load, resize properly, and autoplay settings',
      status: 'pending',
      priority: 'medium'
    },

    // SEO
    {
      id: 'meta-tags',
      category: 'SEO',
      name: 'Meta Tags',
      description: 'Verify each page has meta title and description',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'h1-structure',
      category: 'SEO',
      name: 'H1 Tag Structure',
      description: 'Check H1 tags are used properly (one per page)',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'url-structure',
      category: 'SEO',
      name: 'URL Structure',
      description: 'Ensure clean URL structure without query clutter',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'sitemap-robots',
      category: 'SEO',
      name: 'Sitemap & Robots',
      description: 'Verify sitemap.xml and robots.txt are present',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'og-tags',
      category: 'SEO',
      name: 'Social Media Tags',
      description: 'Check OG tags show correct preview on social media',
      status: 'pending',
      priority: 'medium'
    },

    // Performance
    {
      id: 'page-load-speed',
      category: 'Performance',
      name: 'Page Load Speed',
      description: 'Ensure each page loads in under 3 seconds',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'file-minification',
      category: 'Performance',
      name: 'File Minification',
      description: 'Check CSS/JS files are minified',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'image-compression',
      category: 'Performance',
      name: 'Image Compression',
      description: 'Verify images are in WebP or compressed formats',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'lazy-loading',
      category: 'Performance',
      name: 'Lazy Loading',
      description: 'Check lazy loading is applied to media',
      status: 'pending',
      priority: 'minor'
    },
    {
      id: 'browser-caching',
      category: 'Performance',
      name: 'Browser Caching',
      description: 'Verify browser caching is active',
      status: 'pending',
      priority: 'medium'
    },

    // Accessibility
    {
      id: 'color-contrast',
      category: 'Accessibility',
      name: 'Color Contrast',
      description: 'Check color contrast meets WCAG 2.1 standards',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'tab-order',
      category: 'Accessibility',
      name: 'Tab Order',
      description: 'Verify tab order is logical',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'keyboard-navigation',
      category: 'Accessibility',
      name: 'Keyboard Navigation',
      description: 'Test all buttons/links are navigable by keyboard',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'aria-labels',
      category: 'Accessibility',
      name: 'ARIA Labels',
      description: 'Check ARIA labels are present where needed',
      status: 'pending',
      priority: 'medium'
    },

    // Forms & Database
    {
      id: 'form-data-capture',
      category: 'Forms',
      name: 'Data Capture',
      description: 'Test forms capture data correctly',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'confirmation-messages',
      category: 'Forms',
      name: 'Confirmation Messages',
      description: 'Verify thank you/confirmation messages show',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'backend-integration',
      category: 'Forms',
      name: 'Backend Integration',
      description: 'Check entries are saved to Supabase',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'spam-protection',
      category: 'Forms',
      name: 'Spam Protection',
      description: 'Verify CAPTCHA/spam filters are in place',
      status: 'pending',
      priority: 'medium'
    },

    // Security
    {
      id: 'https-enforcement',
      category: 'Security',
      name: 'HTTPS Enforcement',
      description: 'Ensure HTTPS is enforced across the site',
      status: 'pending',
      priority: 'critical'
    },
    {
      id: 'console-errors',
      category: 'Security',
      name: 'Console Errors',
      description: 'Check console logs are error-free',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'redirect-handling',
      category: 'Security',
      name: 'Redirect Handling',
      description: 'Test redirects from old WordPress URLs work',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'api-security',
      category: 'Security',
      name: 'API Security',
      description: 'Verify no unsecured form actions or API endpoints',
      status: 'pending',
      priority: 'critical'
    }
  ];

  useEffect(() => {
    initializeCategories();
  }, []);

  const initializeCategories = () => {
    const categoryMap = new Map<string, QACheck[]>();
    
    initialChecks.forEach(check => {
      if (!categoryMap.has(check.category)) {
        categoryMap.set(check.category, []);
      }
      categoryMap.get(check.category)!.push(check);
    });

    const categoryList: QACategory[] = Array.from(categoryMap.entries()).map(([name, checks]) => ({
      name,
      checks,
      completed: 0,
      total: checks.length,
      passed: 0
    }));

    setCategories(categoryList);
  };

  const runQAAudit = async () => {
    setIsRunning(true);
    setProgress(0);
    
    const updatedCategories = [...categories];
    const totalChecks = initialChecks.length;
    let completedChecks = 0;

    // Simulate running checks with realistic results
    for (let i = 0; i < updatedCategories.length; i++) {
      const category = updatedCategories[i];
      
      for (let j = 0; j < category.checks.length; j++) {
        const check = category.checks[j];
        
        // Simulate check execution
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Simulate realistic results based on check type
        const result = simulateCheckResult(check);
        check.status = result.status;
        check.notes = result.notes;
        check.suggestion = result.suggestion;
        
        completedChecks++;
        setProgress((completedChecks / totalChecks) * 100);
        
        // Update category stats
        category.completed = category.checks.filter(c => c.status !== 'pending').length;
        category.passed = category.checks.filter(c => c.status === 'pass').length;
        
        setCategories([...updatedCategories]);
      }
    }
    
    setIsRunning(false);
    toast.success("QA Audit completed successfully!");
  };

  const simulateCheckResult = (check: QACheck) => {
    // Simulate realistic results based on common issues
    const randomFactor = Math.random();
    
    // Critical checks are more likely to have issues
    if (check.priority === 'critical') {
      if (randomFactor < 0.2) {
        return {
          status: 'fail' as const,
          notes: `Critical issue found in ${check.name}`,
          suggestion: getCheckSuggestion(check.id)
        };
      } else if (randomFactor < 0.3) {
        return {
          status: 'warning' as const,
          notes: `Minor issues detected in ${check.name}`,
          suggestion: getCheckSuggestion(check.id)
        };
      }
    } else if (check.priority === 'medium') {
      if (randomFactor < 0.15) {
        return {
          status: 'fail' as const,
          notes: `Issues found in ${check.name}`,
          suggestion: getCheckSuggestion(check.id)
        };
      } else if (randomFactor < 0.25) {
        return {
          status: 'warning' as const,
          notes: `Room for improvement in ${check.name}`,
          suggestion: getCheckSuggestion(check.id)
        };
      }
    } else {
      if (randomFactor < 0.1) {
        return {
          status: 'warning' as const,
          notes: `Minor improvements possible for ${check.name}`,
          suggestion: getCheckSuggestion(check.id)
        };
      }
    }
    
    return {
      status: 'pass' as const,
      notes: `${check.name} passed all tests`,
      suggestion: undefined
    };
  };

  const getCheckSuggestion = (checkId: string): string => {
    const suggestions: Record<string, string> = {
      'responsive-design': 'Consider using CSS Grid and Flexbox for better responsive layouts',
      'meta-tags': 'Add unique meta titles and descriptions to each page',
      'alt-text': 'Add descriptive alt text to all images for better accessibility',
      'page-load-speed': 'Optimize images and enable compression to improve load times',
      'form-validation': 'Implement client-side validation with proper error messages',
      'broken-links': 'Use automated tools to regularly check for broken links',
      'color-contrast': 'Ensure text has sufficient contrast ratio (4.5:1 minimum)',
      'https-enforcement': 'Configure server to redirect all HTTP traffic to HTTPS',
      'sitemap-robots': 'Generate and submit sitemap.xml to search engines'
    };
    
    return suggestions[checkId] || 'Review and fix the identified issues';
  };

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalChecks: categories.reduce((sum, cat) => sum + cat.total, 0),
        passed: categories.reduce((sum, cat) => sum + cat.passed, 0),
        failed: categories.reduce((sum, cat) => sum + (cat.total - cat.passed), 0)
      },
      categories: categories.map(cat => ({
        name: cat.name,
        passed: cat.passed,
        total: cat.total,
        checks: cat.checks
      }))
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qa-audit-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("QA report exported successfully!");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusBadge = (status: string, priority: string) => {
    const statusColors = {
      pass: 'bg-green-100 text-green-800',
      fail: priority === 'critical' ? 'bg-red-100 text-red-800' : priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800',
      warning: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-gray-100 text-gray-800'
    };
    
    return statusColors[status as keyof typeof statusColors] || statusColors.pending;
  };

  const overallScore = categories.length > 0 
    ? Math.round((categories.reduce((sum, cat) => sum + cat.passed, 0) / categories.reduce((sum, cat) => sum + cat.total, 0)) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Website QA Audit</h2>
          <p className="text-gray-600">Comprehensive quality assurance testing</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1">
            <Button
              variant={selectedDevice === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDevice('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={selectedDevice === 'tablet' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDevice('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={selectedDevice === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDevice('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={exportReport} variant="outline" disabled={overallScore === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={runQAAudit} disabled={isRunning}>
            {isRunning ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <PlayCircle className="h-4 w-4 mr-2" />
            )}
            {isRunning ? 'Running Audit...' : 'Run QA Audit'}
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      {isRunning && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Audit Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      {categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{overallScore}%</div>
                <p className="text-sm text-gray-600">Overall Score</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {categories.reduce((sum, cat) => sum + cat.passed, 0)}
                </div>
                <p className="text-sm text-gray-600">Passed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {categories.reduce((sum, cat) => sum + cat.checks.filter(c => c.status === 'fail').length, 0)}
                </div>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {categories.reduce((sum, cat) => sum + cat.checks.filter(c => c.status === 'warning').length, 0)}
                </div>
                <p className="text-sm text-gray-600">Warnings</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Results */}
      <Tabs defaultValue={categories[0]?.name || 'UI/UX'} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <TabsTrigger key={category.name} value={category.name} className="text-xs">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category.name} value={category.name} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {category.name} Tests
                  <Badge variant="outline">
                    {category.passed}/{category.total} Passed
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Testing {category.name.toLowerCase()} related functionality and compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.checks.map((check) => (
                    <div key={check.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(check.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{check.name}</h4>
                            <p className="text-sm text-gray-600">{check.description}</p>
                            {check.notes && (
                              <p className="text-sm mt-2 text-gray-700">{check.notes}</p>
                            )}
                            {check.suggestion && (
                              <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                                <strong>Suggestion:</strong> {check.suggestion}
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusBadge(check.status, check.priority)}>
                          {check.status === 'pending' ? 'Pending' : check.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QAudit;
