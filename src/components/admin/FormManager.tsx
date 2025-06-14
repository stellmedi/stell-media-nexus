
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Download, 
  Eye,
  Calendar,
  User,
  Phone
} from "lucide-react";
import { getContactSubmissions, getConsultationSubmissions } from "@/services/supabaseFormService";
import { toast } from "sonner";

interface FormSubmission {
  id: string;
  type: 'contact' | 'consultation';
  name: string;
  email: string;
  company?: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'responded';
}

const FormManager: React.FC = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const [contacts, consultations] = await Promise.all([
          getContactSubmissions(),
          getConsultationSubmissions()
        ]);
        
        const allSubmissions: FormSubmission[] = [
          ...(contacts || []).map(contact => ({
            id: contact.id,
            type: 'contact' as const,
            name: contact.name,
            email: contact.email,
            message: contact.message,
            date: contact.created_at,
            status: 'new' as const
          })),
          ...(consultations || []).map(consultation => ({
            id: consultation.id,
            type: 'consultation' as const,
            name: consultation.name,
            email: consultation.email,
            company: consultation.company,
            message: consultation.message,
            date: consultation.created_at,
            status: 'new' as const
          }))
        ];
        
        setSubmissions(allSubmissions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.error('Error loading submissions:', error);
        toast.error('Failed to load form submissions');
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, []);

  const handleExport = () => {
    toast.success("Exporting submissions to CSV...");
  };

  const handleViewSubmission = (id: string) => {
    toast.info(`Viewing submission ${id}`);
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    read: 'bg-yellow-100 text-yellow-800',
    responded: 'bg-green-100 text-green-800'
  };

  const contactSubmissions = submissions.filter(s => s.type === 'contact');
  const consultationSubmissions = submissions.filter(s => s.type === 'consultation');

  if (loading) {
    return <div className="text-center py-8">Loading submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Form Submissions</h2>
          <p className="text-gray-600">Manage contact and consultation requests</p>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold">{submissions.length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contact Forms</p>
                <p className="text-2xl font-bold">{contactSubmissions.length}</p>
              </div>
              <User className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Consultations</p>
                <p className="text-2xl font-bold">{consultationSubmissions.length}</p>
              </div>
              <Phone className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Submissions</TabsTrigger>
          <TabsTrigger value="contact">Contact Forms</TabsTrigger>
          <TabsTrigger value="consultation">Consultations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{submission.name}</CardTitle>
                    <CardDescription>{submission.email}</CardDescription>
                    {submission.company && (
                      <CardDescription className="mt-1">Company: {submission.company}</CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${statusColors[submission.status]} text-xs`}>
                      {submission.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {submission.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{submission.message}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(submission.date).toLocaleDateString()}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewSubmission(submission.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4">
          {contactSubmissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{submission.name}</CardTitle>
                    <CardDescription>{submission.email}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${statusColors[submission.status]} text-xs`}>
                      {submission.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {submission.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{submission.message}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(submission.date).toLocaleDateString()}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewSubmission(submission.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="consultation" className="space-y-4">
          {consultationSubmissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{submission.name}</CardTitle>
                    <CardDescription>{submission.email}</CardDescription>
                    {submission.company && (
                      <CardDescription className="mt-1">Company: {submission.company}</CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${statusColors[submission.status]} text-xs`}>
                      {submission.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {submission.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{submission.message}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(submission.date).toLocaleDateString()}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewSubmission(submission.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormManager;
