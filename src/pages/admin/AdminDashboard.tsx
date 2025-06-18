
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import { getContactSubmissions, getConsultationSubmissions } from "@/services/supabaseFormService";
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
        const [contactData, consultationData] = await Promise.all([
          getContactSubmissions(),
          getConsultationSubmissions()
        ]);

        setContactFormSubmissions(contactData || []);
        setConsultationRequests(consultationData || []);
        
        // Update stats with real data
        setStatsData({
          totalContacts: contactData?.length || 0,
          totalConsultations: consultationData?.length || 0,
          totalUsers: 5, // Keep as mock for now
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
                  Real-time submissions from your website contact form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="text-center py-8">Loading submissions...</div>
                ) : (
                  <Table>
                    <TableCaption>
                      {contactFormSubmissions.length === 0 ? 
                        "No contact submissions yet. Test the contact form to see data here!" : 
                        `Total: ${contactFormSubmissions.length} submissions`
                      }
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contactFormSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.name}</TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                          <TableCell>{formatDate(submission.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consultations">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Requests</CardTitle>
                <CardDescription>
                  Real-time consultation requests from potential clients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="text-center py-8">Loading requests...</div>
                ) : (
                  <Table>
                    <TableCaption>
                      {consultationRequests.length === 0 ? 
                        "No consultation requests yet. Test the consultation form to see data here!" : 
                        `Total: ${consultationRequests.length} requests`
                      }
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consultationRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.name}</TableCell>
                          <TableCell>{request.email}</TableCell>
                          <TableCell>{request.company}</TableCell>
                          <TableCell className="max-w-xs truncate">{request.message}</TableCell>
                          <TableCell>{formatDate(request.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
