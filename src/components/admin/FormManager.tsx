
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
}

interface ConsultationSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  message: string;
}

const FormManager: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"contact" | "consultation">("contact");
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [consultationSubmissions, setConsultationSubmissions] = useState<ConsultationSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      // Fetch contact form submissions
      const { data: contactData, error: contactError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactError) {
        console.error("Error fetching contact submissions:", contactError);
        toast.error("Failed to load contact form submissions.");
      } else {
        setContactSubmissions(contactData || []);
      }

      // Fetch consultation form submissions
      const { data: consultationData, error: consultationError } = await supabase
        .from('consultation_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (consultationError) {
        console.error("Error fetching consultation submissions:", consultationError);
        toast.error("Failed to load consultation form submissions.");
      } else {
        setConsultationSubmissions(consultationData || []);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Form Submissions</h2>
          <p className="text-gray-600">Manage and review form submissions</p>
        </div>
        <Database className="h-6 w-6 text-gray-500" />
      </div>

      <Tabs
        defaultValue={selectedTab}
        className="w-full"
        onValueChange={(val: string) => setSelectedTab(val as "contact" | "consultation")}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact">Contact Form</TabsTrigger>
          <TabsTrigger value="consultation">Consultation Form</TabsTrigger>
        </TabsList>
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Submissions</CardTitle>
              <CardDescription>Review and manage contact form data</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading submissions...</p>
              ) : (
                <div>
                  <h3 className="font-bold mb-2">Contact Form Submissions</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-2 py-2">Name</th>
                        <th className="px-2 py-2">Email</th>
                        <th className="px-2 py-2">Message</th>
                        <th className="px-2 py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactSubmissions.map((submission) => (
                        <tr key={submission.id}>
                          <td className="px-2 py-2">{submission.name}</td>
                          <td className="px-2 py-2">{submission.email}</td>
                          <td className="px-2 py-2">{submission.message}</td>
                          <td className="px-2 py-2">{new Date(submission.created_at).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="consultation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Form Submissions</CardTitle>
              <CardDescription>Review and manage consultation request data</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading submissions...</p>
              ) : (
                <div>
                  <h3 className="font-bold mb-2">Consultation Submissions</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-2 py-2">Name</th>
                        <th className="px-2 py-2">Email</th>
                        <th className="px-2 py-2">Company</th>
                        <th className="px-2 py-2">Message</th>
                        <th className="px-2 py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultationSubmissions.map((submission) => (
                        <tr key={submission.id}>
                          <td className="px-2 py-2">{submission.name}</td>
                          <td className="px-2 py-2">{submission.email}</td>
                          <td className="px-2 py-2">{submission.company}</td>
                          <td className="px-2 py-2">{submission.message}</td>
                          <td className="px-2 py-2">{new Date(submission.created_at).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormManager;
