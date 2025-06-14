
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Search,
  Globe
} from "lucide-react";

const AnalyticsDashboard: React.FC = () => {
  const analyticsData = [
    {
      title: "Page Views",
      value: "12,543",
      change: "+12.5%",
      changeType: "positive",
      icon: Eye
    },
    {
      title: "Unique Visitors",
      value: "3,247",
      change: "+8.2%",
      changeType: "positive",
      icon: Users
    },
    {
      title: "Organic Traffic",
      value: "2,156",
      change: "+15.3%",
      changeType: "positive",
      icon: Search
    },
    {
      title: "Bounce Rate",
      value: "42.3%",
      change: "-3.1%",
      changeType: "positive",
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-gray-600">Website performance and visitor insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Google Analytics Integration</CardTitle>
            <CardDescription>Connect your Google Analytics account for detailed insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Google Analytics not connected</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Connect Google Analytics
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search Console Integration</CardTitle>
            <CardDescription>Monitor your search performance and rankings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Search Console not connected</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Connect Search Console
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Visitor traffic for the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Chart visualization would be integrated here</p>
            <p className="text-sm text-gray-500 mt-2">
              Connect analytics services to see detailed charts and graphs
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
