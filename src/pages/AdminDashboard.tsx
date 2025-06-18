import React from "react";
import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SEOManager from "@/components/admin/SEOManager";
import {
  BarChart3,
  FileText,
  Search,
  Upload
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const handleGASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle Google Analytics connection
  };

  const handleGSCSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle Search Console verification
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Dashboard | Stell Media</title>
      </Helmet>
      
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your website content and configurations</p>
        </header>
        
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="seo">SEO Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blog Posts</CardTitle>
                  <CardDescription>Manage your blog content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-500">Total posts</p>
                  <Button className="mt-4 w-full" variant="outline">Manage Posts</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Services</CardTitle>
                  <CardDescription>Manage service offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-gray-500">Active services</p>
                  <Button className="mt-4 w-full" variant="outline">Edit Services</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Listings</CardTitle>
                  <CardDescription>Manage career opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-500">Open positions</p>
                  <Button className="mt-4 w-full" variant="outline">Edit Listings</Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest job applications received</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Position</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Sarah Johnson</td>
                        <td className="py-3 px-4">AI Product Specialist</td>
                        <td className="py-3 px-4">May 16, 2025</td>
                        <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">New</span></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Michael Chang</td>
                        <td className="py-3 px-4">SEO Specialist</td>
                        <td className="py-3 px-4">May 14, 2025</td>
                        <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Reviewed</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Jessica Martinez</td>
                        <td className="py-3 px-4">Data Scientist</td>
                        <td className="py-3 px-4">May 10, 2025</td>
                        <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Interview</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seo" className="space-y-6">
            <SEOManager />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Google Analytics Configuration</CardTitle>
                <CardDescription>Connect your Google Analytics account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGASubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="ga-id" className="text-sm font-medium">Tracking ID</label>
                    <Input id="ga-id" placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" />
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Connect Analytics
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Console Verification</CardTitle>
                <CardDescription>Connect Google Search Console to monitor search performance</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGSCSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Verification Method</label>
                    <div className="flex gap-4">
                      <Button type="button" variant="outline" className="flex-1 bg-white">
                        <Upload className="mr-2 h-4 w-4" /> HTML File
                      </Button>
                      <Button type="button" variant="outline" className="flex-1 bg-white">
                        <FileText className="mr-2 h-4 w-4" /> Meta Tag
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="meta-tag" className="text-sm font-medium">Meta Tag Value</label>
                    <Textarea id="meta-tag" placeholder="<meta name='google-site-verification' content='your-verification-code' />" />
                  </div>
                  
                  <Button type="submit" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
                    <Search className="mr-2 h-4 w-4" />
                    Verify Ownership
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
