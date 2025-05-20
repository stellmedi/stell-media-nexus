
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/hooks/use-auth";
import { TEMPLATES, sendEmail, EmailFormData } from "@/utils/emailService";

// Define email form schema
const emailFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

// Email templates
const emailTemplates = [
  {
    id: "welcome",
    name: "Welcome Email",
    subject: "Welcome to Stell Media",
    body: "Dear {{name}},\n\nThank you for joining Stell Media. We're excited to have you on board!\n\nBest regards,\nThe Stell Media Team",
  },
  {
    id: "newsletter",
    name: "Monthly Newsletter",
    subject: "Stell Media Monthly Update",
    body: "Dear {{name}},\n\nHere are the latest updates from Stell Media for this month...\n\nBest regards,\nThe Stell Media Team",
  },
  {
    id: "follow_up",
    name: "Consultation Follow-Up",
    subject: "Following Up on Our Consultation",
    body: "Dear {{name}},\n\nThank you for your consultation request. We'd like to follow up on our discussion...\n\nBest regards,\nThe Stell Media Team",
  },
];

const EmailManagement = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Initialize form
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Load template when selected
  useEffect(() => {
    if (selectedTemplate) {
      const template = emailTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        form.setValue("subject", template.subject);
        form.setValue("message", template.body);
      }
    }
  }, [selectedTemplate, form]);

  // Form submission handler
  const onSubmit = async (data: EmailFormValues) => {
    setIsSending(true);
    
    try {
      // Format data to match EmailFormData
      const emailData: EmailFormData = {
        name: user?.name || "Stell Media Admin",
        email: user?.email || "admin@stellmedia.com",
        subject: data.subject,
        message: data.message,
      };
      
      // Send email using the contact template
      await sendEmail(TEMPLATES.CONTACT, emailData);
      
      toast.success("Email sent successfully");
      form.reset();
      setSelectedTemplate(null);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // Apply template handler
  const applyTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  // Check authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Email Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Templates Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Select a template to use for your email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailTemplates.map(template => (
                    <Card 
                      key={template.id} 
                      className={`cursor-pointer hover:border-primary transition-colors ${selectedTemplate === template.id ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => applyTemplate(template.id)}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{template.subject}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Email Composer */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Compose Email</CardTitle>
                <CardDescription>
                  Create and send emails to your contacts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Email Subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Type your message here..." 
                              className="min-h-[200px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          form.reset();
                          setSelectedTemplate(null);
                        }}
                      >
                        Clear
                      </Button>
                      <Button type="submit" disabled={isSending}>
                        {isSending ? "Sending..." : "Send Email"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmailManagement;
