
import React, { useEffect, useState } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import { getContactSubmissions, getConsultationSubmissions, getAdminUsers } from "@/services/supabaseFormService";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [contactFormSubmissions, setContactFormSubmissions] = useState([]);
  const [consultationRequests, setConsultationRequests] = useState([]);
  const [statsData, setStatsData] = useState({
    totalContacts: 0,
    totalConsultations: 0,
    totalUsers: 0,
    recentActivity: 0
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Load real data from Supabase
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const [contactData, consultationData, usersData] = await Promise.all([
          getContactSubmissions(),
          getConsultationSubmissions(),
          getAdminUsers()
        ]);

        setContactFormSubmissions(contactData || []);
        setConsultationRequests(consultationData || []);
        
        // Update stats with real data
        setStatsData({
          totalContacts: contactData?.length || 0,
          totalConsultations: consultationData?.length || 0,
          totalUsers: usersData?.length || 0,
          recentActivity: (contactData?.length || 0) + (consultationData?.length || 0)
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load submissions from database",
          variant: "destructive",
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, [toast]);

  // Set up real-time subscriptions for new submissions
  useEffect(() => {
    const contactChannel = supabase
      .channel('contact-submissions')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'contact_submissions' },
        (payload) => {
          console.log('New contact submission:', payload);
          setContactFormSubmissions(prev => [payload.new, ...prev]);
          setStatsData(prev => ({
            ...prev,
            totalContacts: prev.totalContacts + 1,
            recentActivity: prev.recentActivity + 1
          }));
          toast({
            title: "New Contact Submission",
            description: `New message from ${payload.new.name}`,
          });
        }
      )
      .subscribe();

    const consultationChannel = supabase
      .channel('consultation-submissions')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'consultation_submissions' },
        (payload) => {
          console.log('New consultation request:', payload);
          setConsultationRequests(prev => [payload.new, ...prev]);
          setStatsData(prev => ({
            ...prev,
            totalConsultations: prev.totalConsultations + 1,
            recentActivity: prev.recentActivity + 1
          }));
          toast({
            title: "New Consultation Request",
            description: `New request from ${payload.new.company}`,
          });
        }
      )
      .subscribe();

    return () => {
      contactChannel.unsubscribe();
      consultationChannel.unsubscribe();
    };
  }, [toast]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Stell Media Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor website activity and manage digital marketing operations</p>
        </div>
        
        {/* Stats Overview with proper spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium text-blue-900">Contact Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-700">{statsData.totalContacts}</p>
              <p className="text-sm text-blue-600 mt-1">Website contacts</p>
            </CardContent>
          </Card>
          
          <Card className="border border-purple-200 bg-purple-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium text-purple-900">Consultation Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-700">{statsData.totalConsultations}</p>
              <p className="text-sm text-purple-600 mt-1">Business consultations</p>
            </CardContent>
          </Card>
          
          <Card className="border border-green-200 bg-green-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium text-green-900">Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-700">{statsData.totalUsers}</p>
              <p className="text-sm text-green-600 mt-1">System users</p>
            </CardContent>
          </Card>
          
          <Card className="border border-indigo-200 bg-indigo-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium text-indigo-900">Total Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-indigo-700">{statsData.recentActivity}</p>
              <p className="text-sm text-indigo-600 mt-1">Recent interactions</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for Different Sections with proper spacing */}
        <div className="mt-8">
          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="contacts" className="text-base">Website Contacts</TabsTrigger>
              <TabsTrigger value="consultations" className="text-base">Business Consultations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contacts" className="space-y-4">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Contact Form Submissions</CardTitle>
                  <CardDescription>
                    Messages received through the Stell Media website contact form
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingData ? (
                    <div className="text-center py-8 text-gray-500">Loading contact submissions...</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableCaption className="text-gray-600">
                          {contactFormSubmissions.length === 0 ? 
                            "No contact submissions yet." : 
                            `Total: ${contactFormSubmissions.length} contact submissions`
                          }
                        </TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-semibold">Name</TableHead>
                            <TableHead className="font-semibold">Email</TableHead>
                            <TableHead className="font-semibold">Message Preview</TableHead>
                            <TableHead className="font-semibold">Received</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contactFormSubmissions.map((submission) => (
                            <TableRow key={submission.id} className="hover:bg-gray-50">
                              <TableCell className="font-medium">{submission.name}</TableCell>
                              <TableCell className="text-blue-600">{submission.email}</TableCell>
                              <TableCell className="max-w-xs">
                                <div className="truncate" title={submission.message}>
                                  {submission.message}
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-600">{formatDate(submission.created_at)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="consultations" className="space-y-4">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Business Consultation Requests</CardTitle>
                  <CardDescription>
                    Consultation requests for digital marketing services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingData ? (
                    <div className="text-center py-8 text-gray-500">Loading consultation requests...</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableCaption className="text-gray-600">
                          {consultationRequests.length === 0 ? 
                            "No consultation requests yet." : 
                            `Total: ${consultationRequests.length} consultation requests`
                          }
                        </TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-semibold">Contact</TableHead>
                            <TableHead className="font-semibold">Company</TableHead>
                            <TableHead className="font-semibold">Message Preview</TableHead>
                            <TableHead className="font-semibold">Submitted</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {consultationRequests.map((request) => (
                            <TableRow key={request.id} className="hover:bg-gray-50">
                              <TableCell>
                                <div className="font-medium">{request.name}</div>
                                <div className="text-sm text-blue-600">{request.email}</div>
                              </TableCell>
                              <TableCell className="font-medium text-purple-700">{request.company}</TableCell>
                              <TableCell className="max-w-xs">
                                <div className="truncate" title={request.message}>
                                  {request.message}
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-600">{formatDate(request.created_at)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
