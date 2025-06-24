
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wand2, 
  Search, 
  TrendingUp, 
  Target, 
  Lightbulb,
  BarChart3,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const AIPoweredSEO: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions] = useState([
    {
      type: 'title',
      current: 'About Us - Stell Media',
      suggested: 'Digital Marketing Agency | Lead Generation & SEO Services | Stell Media',
      score: 88,
      reason: 'Includes target keywords "Digital Marketing Agency" and "Lead Generation" with higher search volume'
    },
    {
      type: 'description',
      current: 'Learn about our agency',
      suggested: 'Stell Media is a leading digital marketing agency specializing in lead generation, SEO services, and conversion optimization for real estate and e-commerce businesses.',
      score: 94,
      reason: 'More descriptive, includes relevant keywords, targets specific industries, and within optimal length'
    }
  ]);

  const [keywordInsights] = useState([
    { keyword: 'digital marketing agency', volume: '18K', difficulty: 'High', opportunity: 'High' },
    { keyword: 'lead generation services', volume: '12K', difficulty: 'Medium', opportunity: 'High' },
    { keyword: 'SEO services company', volume: '15K', difficulty: 'High', opportunity: 'Medium' },
    { keyword: 'conversion optimization', volume: '8.5K', difficulty: 'Medium', opportunity: 'High' },
    { keyword: 'real estate marketing', volume: '7.2K', difficulty: 'Medium', opportunity: 'High' },
    { keyword: 'ecommerce marketing agency', volume: '5.8K', difficulty: 'Low', opportunity: 'High' }
  ]);

  const [seoScore] = useState({
    overall: 78,
    technical: 85,
    content: 72,
    structure: 80,
    performance: 75
  });

  // Updated page list to match SEOManager
  const availablePages = [
    { path: "/", name: "Home Page" },
    { path: "/about", name: "About Page" },
    { path: "/services", name: "Services Page" },
    { path: "/services/seo", name: "SEO Services" },
    { path: "/services/product-discovery", name: "Product Discovery" },
    { path: "/services/data-enrichment", name: "Data Enrichment" },
    { path: "/services/sem", name: "SEM Services" },
    { path: "/services/conversion-optimization", name: "Conversion Optimization" },
    { path: "/blog", name: "Blog Page" },
    { path: "/contact", name: "Contact Page" },
    { path: "/careers", name: "Careers Page" },
    { path: "/case-studies", name: "Case Studies" },
    { path: "/faq", name: "FAQ Page" }
  ];

  const handleAnalyzePage = () => {
    if (!selectedPage) {
      toast.error("Please select a page to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success("SEO analysis completed!");
    }, 3000);
  };

  const handleApplySuggestion = (type: string) => {
    toast.success(`${type} suggestion applied successfully!`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI-Powered SEO</h2>
          <p className="text-gray-600">Get intelligent SEO suggestions and insights</p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleAnalyzePage} disabled={isAnalyzing}>
          <Wand2 className="h-4 w-4" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Page'}
        </Button>
      </div>

      {/* Page Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Page to Analyze</CardTitle>
          <CardDescription>Choose a page for AI-powered SEO analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Enter page URL or select from list"
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
            />
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
            >
              <option value="">Select a page...</option>
              {availablePages.map((page) => (
                <option key={page.path} value={page.path}>
                  {page.name}
                </option>
              ))}
            </select>
            <Button 
              variant="outline" 
              onClick={handleAnalyzePage}
              disabled={!selectedPage || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Quick Analyze'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              SEO Score Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{seoScore.overall}/100</div>
                <p className="text-gray-600">Overall SEO Score</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Technical SEO</span>
                    <span>{seoScore.technical}%</span>
                  </div>
                  <Progress value={seoScore.technical} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Content Quality</span>
                    <span>{seoScore.content}%</span>
                  </div>
                  <Progress value={seoScore.content} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Site Structure</span>
                    <span>{seoScore.structure}%</span>
                  </div>
                  <Progress value={seoScore.structure} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Performance</span>
                    <span>{seoScore.performance}%</span>
                  </div>
                  <Progress value={seoScore.performance} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              AI Suggestions
            </CardTitle>
            <CardDescription>Intelligent recommendations to improve your SEO</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {suggestion.type}
                      </Badge>
                      <span className="text-sm font-medium">Score: {suggestion.score}/100</span>
                    </div>
                    <Button size="sm" onClick={() => handleApplySuggestion(suggestion.type)}>
                      Apply
                    </Button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Current:</span>
                      <p className="text-gray-600 mt-1">{suggestion.current}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium">Suggested:</span>
                      <p className="text-green-700 mt-1">{suggestion.suggested}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium">Why:</span>
                      <p className="text-gray-600 mt-1">{suggestion.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keyword Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Keyword Insights
          </CardTitle>
          <CardDescription>Discover high-opportunity keywords for your content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Keyword</th>
                  <th className="text-left py-3 px-4">Search Volume</th>
                  <th className="text-left py-3 px-4">Difficulty</th>
                  <th className="text-left py-3 px-4">Opportunity</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {keywordInsights.map((keyword, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{keyword.keyword}</td>
                    <td className="py-3 px-4">{keyword.volume}</td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getDifficultyColor(keyword.difficulty)}`}>
                        {keyword.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getOpportunityColor(keyword.opportunity)}`}>
                        {keyword.opportunity}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        Target
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Schema Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Schema Markup Generator
          </CardTitle>
          <CardDescription>Automatically generate structured data for better search visibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <div className="text-sm font-medium">Organization</div>
              <div className="text-xs text-gray-500">Company info</div>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <div className="text-sm font-medium">Service</div>
              <div className="text-xs text-gray-500">Marketing services</div>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <div className="text-sm font-medium">LocalBusiness</div>
              <div className="text-xs text-gray-500">Local presence</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPoweredSEO;
