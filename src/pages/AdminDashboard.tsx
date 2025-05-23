
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart3,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Upload,
  Bell
} from "lucide-react";

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  date: string;
  type: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [recentSubmissions, setRecentSubmissions] = useState<FormSubmission[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("stell_admin_authenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
      toast({
        title: "Authentication required",
        description: "Please login to access the admin dashboard"
      });
    }
    
    // Check and set notification permissions
    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted");
    }
    
    // Load mock submission data
    setRecentSubmissions([
      {
        id: "sub-001",
        name: "David Chen",
        email: "david.chen@example.com",
        date: "May 22, 2025",
        type: "Contact",
        status: "New"
      },
      {
        id: "sub-002",
        name: "Sarah Williams",
        email: "sarah.w@example.org",
        date: "May 21, 2025",
        type: "Consultation",
        status: "Responded"
      },
      {
        id: "sub-003",
        name: "Miguel Rodriguez",
        email: "miguel@example.net",
        date: "May 20, 2025",
        type: "Contact",
        status: "New"
      }
    ]);
    
    // Set up form submission listener
    const handleFormSubmission = (event: CustomEvent) => {
      const { formData } = event.detail;
      
      // Add to recent submissions
      const newSubmission: FormSubmission = {
        id: `sub-${Date.now().toString().slice(-4)}`,
        name: formData.name || formData.fullName || "Unknown",
        email: formData.email || "No email provided",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: formData.subject ? "Contact" : "Consultation",
        status: "New"
      };
      
      setRecentSubmissions(prev => [newSubmission, ...prev.slice(0, 9)]);
      
      // Show toast notification
      toast({
        title: "New Form Submission",
        description: `${newSubmission.name} submitted a ${newSubmission.type.toLowerCase()} form`
      });
    };
    
    window.addEventListener("formSubmitted", handleFormSubmission as EventListener);
    
    return () => {
      window.removeEventListener("formSubmitted", handleFormSubmission as EventListener);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("stell_admin_authenticated");
    navigate("/admin");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };

  const handleGASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Google Analytics Connected",
      description: "Your tracking ID has been saved successfully"
    });
  };

  const handleGSCSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Console Connected",
      description: "Verification file uploaded successfully"
    });
  };
  
  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === "granted");
      
      if (permission === "granted") {
        toast({
          title: "Notifications enabled",
          description: "You will now receive notifications for new form submissions"
        });
      } else {
        toast({
          title: "Notifications disabled",
          description: "Please enable notifications in your browser settings for form submission alerts",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col">
      <Helmet>
        <title>Admin Dashboard | Stell Media</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-md p-4">
          <div className="mb-8">
            <h2 className="font-bold text-lg text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">Stell Media CMS</p>
          </div>
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-indigo-600 bg-indigo-50">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Content
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Globe className="mr-2 h-4 w-4" />
              SEO
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
          
          <div className="mt-auto pt-8 border-t border-gray-200 mt-8">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          <header className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your website content and configurations</p>
            </div>
            
            {/* Notification permission button */}
            <Button 
              variant={notificationsEnabled ? "outline" : "default"} 
              onClick={requestNotificationPermission}
              className="flex items-center gap-2"
            >
              <Bell size={16} />
              {notificationsEnabled ? "Notifications On" : "Enable Notifications"}
            </Button>
          </header>
          
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="form-submissions">Form Submissions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
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
                    <CardTitle className="text-lg">Form Submissions</CardTitle>
                    <CardDescription>Recent contact inquiries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{recentSubmissions.length}</p>
                    <p className="text-sm text-gray-500">New submissions</p>
                    <Button className="mt-4 w-full" variant="outline">View All</Button>
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
            
            {/* New Form Submissions Tab */}
            <TabsContent value="form-submissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Form Submissions</CardTitle>
                  <CardDescription>Contact and consultation requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Form Type</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentSubmissions.map((submission) => (
                          <tr key={submission.id} className="border-b">
                            <td className="py-3 px-4">{submission.name}</td>
                            <td className="py-3 px-4">{submission.email}</td>
                            <td className="py-3 px-4">{submission.type}</td>
                            <td className="py-3 px-4">{submission.date}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                submission.status === "New" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {submission.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
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
            
            <TabsContent value="seo" className="space-y-6">
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
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
