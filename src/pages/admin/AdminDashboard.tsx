
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/hooks/use-auth";

const AdminDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [contactFormSubmissions, setContactFormSubmissions] = useState([]);
  const [consultationRequests, setConsultationRequests] = useState([]);
  const [statsData, setStatsData] = useState({
    totalContacts: 0,
    totalConsultations: 0,
    totalUsers: 0,
    recentActivity: 0
  });

  useEffect(() => {
    // Mock data - will be replaced with actual API calls
    const mockContactSubmissions = [
      { id: 1, name: "John Doe", email: "john@example.com", subject: "General Inquiry", date: "2023-05-20", status: "unread" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Product Question", date: "2023-05-19", status: "read" },
      { id: 3, name: "Robert Johnson", email: "robert@example.com", subject: "Partnership", date: "2023-05-18", status: "read" },
    ];

    const mockConsultationRequests = [
      { id: 1, name: "Emily Brown", email: "emily@example.com", company: "ABC Inc", date: "2023-05-20", status: "unread", budget: "$1,000-$5,000" },
      { id: 2, name: "Michael Wilson", email: "michael@example.com", company: "XYZ Corp", date: "2023-05-19", status: "read", budget: "$5,000-$10,000" },
    ];

    setContactFormSubmissions(mockContactSubmissions);
    setConsultationRequests(mockConsultationRequests);
    
    // Set mock stats
    setStatsData({
      totalContacts: mockContactSubmissions.length,
      totalConsultations: mockConsultationRequests.length,
      totalUsers: 5,
      recentActivity: mockContactSubmissions.length + mockConsultationRequests.length
    });
  }, []);

  // If not authenticated, redirect to login
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const markAsRead = (id, type) => {
    if (type === 'contact') {
      setContactFormSubmissions(prev => 
        prev.map(item => item.id === id ? { ...item, status: 'read' } : item)
      );
      toast({
        title: "Status Updated",
        description: "Contact submission marked as read",
      });
    } else {
      setConsultationRequests(prev => 
        prev.map(item => item.id === id ? { ...item, status: 'read' } : item)
      );
      toast({
        title: "Status Updated",
        description: "Consultation request marked as read",
      });
    }
  };

  const deleteSubmission = (id, type) => {
    if (type === 'contact') {
      setContactFormSubmissions(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Item Deleted",
        description: "Contact submission has been deleted",
      });
    } else {
      setConsultationRequests(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Item Deleted",
        description: "Consultation request has been deleted",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{statsData.totalContacts}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{statsData.totalConsultations}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{statsData.totalUsers}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{statsData.recentActivity}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for Different Sections */}
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
            <TabsTrigger value="consultations">Consultation Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>
                  Manage all contact form submissions from your website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of all contact form submissions.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactFormSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.subject}</TableCell>
                        <TableCell>{submission.date}</TableCell>
                        <TableCell>
                          <Badge variant={submission.status === 'unread' ? "default" : "secondary"}>
                            {submission.status === 'unread' ? 'Unread' : 'Read'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => markAsRead(submission.id, 'contact')}
                              disabled={submission.status === 'read'}
                            >
                              Mark as Read
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => deleteSubmission(submission.id, 'contact')}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consultations">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Requests</CardTitle>
                <CardDescription>
                  Manage all consultation requests from potential clients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of all consultation requests.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultationRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.company}</TableCell>
                        <TableCell>{request.budget}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>
                          <Badge variant={request.status === 'unread' ? "default" : "secondary"}>
                            {request.status === 'unread' ? 'Unread' : 'Read'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => markAsRead(request.id, 'consultation')}
                              disabled={request.status === 'read'}
                            >
                              Mark as Read
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => deleteSubmission(request.id, 'consultation')}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
