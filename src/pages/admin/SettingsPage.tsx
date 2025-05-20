
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/hooks/use-auth";
import { isEmailJSConfigured } from "@/utils/emailService";
import { ContactFormConfig } from "@/types/contactFormConfig";
import { useContactFormConfig } from "@/hooks/use-contact-form-config";

// Define site settings schema
const siteSettingsSchema = z.object({
  siteName: z.string().min(2, { message: "Site name must be at least 2 characters" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(5, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  businessHours: z.string().min(2, { message: "Please specify business hours" }),
});

// Define email settings schema
const emailSettingsSchema = z.object({
  emailjsServiceId: z.string().min(1, { message: "Service ID is required" }),
  emailjsContactTemplateId: z.string().min(1, { message: "Template ID is required" }),
  emailjsConsultationTemplateId: z.string().min(1, { message: "Template ID is required" }),
  emailjsPublicKey: z.string().min(1, { message: "Public key is required" }),
});

type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;
type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;

const SettingsPage = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [notifyOnContact, setNotifyOnContact] = useState(true);
  const [notifyOnConsultation, setNotifyOnConsultation] = useState(true);
  
  // Get contact form configs to update them with new email settings
  const { config: contactConfig, saveConfig: saveContactConfig } = useContactFormConfig('contact');
  const { config: consultConfig, saveConfig: saveConsultConfig } = useContactFormConfig('consultation');

  // Initialize site settings form
  const siteSettingsForm = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteName: "Stell Media",
      contactEmail: "info@stellmedia.com",
      phoneNumber: "+91 98771 00369",
      address: "Zirakpur, SAS Nagar (Mohali), Punjab, India",
      businessHours: "Monday - Friday: 9:00 AM - 5:00 PM",
    },
  });

  // Initialize email settings form
  const emailSettingsForm = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      emailjsServiceId: "",
      emailjsContactTemplateId: "",
      emailjsConsultationTemplateId: "",
      emailjsPublicKey: "",
    },
  });

  // Load saved settings
  useEffect(() => {
    // Load site settings
    const savedSiteSettings = localStorage.getItem("site_settings");
    if (savedSiteSettings) {
      const parsedSettings = JSON.parse(savedSiteSettings);
      siteSettingsForm.reset(parsedSettings);
    }

    // Load notification preferences
    const savedNotifyPrefs = localStorage.getItem("notification_preferences");
    if (savedNotifyPrefs) {
      const prefs = JSON.parse(savedNotifyPrefs);
      setNotifyOnContact(prefs.notifyOnContact ?? true);
      setNotifyOnConsultation(prefs.notifyOnConsultation ?? true);
    }

    // Load EmailJS settings if they exist
    const savedEmailSettings = localStorage.getItem("emailjs_settings");
    if (savedEmailSettings) {
      const parsedEmailSettings = JSON.parse(savedEmailSettings);
      emailSettingsForm.reset(parsedEmailSettings);
    }
  }, [siteSettingsForm, emailSettingsForm]);

  // Save site settings
  const onSaveSiteSettings = (data: SiteSettingsFormValues) => {
    localStorage.setItem("site_settings", JSON.stringify(data));
    
    // Also update the notification email in contact form configs
    const updatedContactConfig = {
      ...contactConfig,
      notificationEmail: data.contactEmail
    };
    
    const updatedConsultConfig = {
      ...consultConfig,
      notificationEmail: data.contactEmail
    };
    
    saveContactConfig(updatedContactConfig);
    saveConsultConfig(updatedConsultConfig);
    
    toast.success("Site settings saved successfully");
  };

  // Save email settings
  const onSaveEmailSettings = (data: EmailSettingsFormValues) => {
    // Store in localStorage for future sessions
    localStorage.setItem("emailjs_settings", JSON.stringify(data));
    
    // Set environment variables for EmailJS
    if (import.meta.env.DEV) {
      (window as any).VITE_EMAILJS_SERVICE_ID = data.emailjsServiceId;
      (window as any).VITE_EMAILJS_PUBLIC_KEY = data.emailjsPublicKey;
      (window as any).VITE_EMAILJS_CONTACT_TEMPLATE_ID = data.emailjsContactTemplateId;
      (window as any).VITE_EMAILJS_CONSULTATION_TEMPLATE_ID = data.emailjsConsultationTemplateId;
    }
    
    // Update template IDs in contact form configs
    const updatedContactConfig = {
      ...contactConfig,
      templateId: data.emailjsContactTemplateId
    };
    
    const updatedConsultConfig = {
      ...consultConfig,
      templateId: data.emailjsConsultationTemplateId
    };
    
    saveContactConfig(updatedContactConfig);
    saveConsultConfig(updatedConsultConfig);
    
    toast.success("Email settings saved successfully");
    toast.info("Please reload the page for settings to take effect");
  };

  // Save notification preferences
  const saveNotificationPreferences = () => {
    const prefs = {
      notifyOnContact,
      notifyOnConsultation
    };
    
    localStorage.setItem("notification_preferences", JSON.stringify(prefs));
    toast.success("Notification preferences saved");
  };

  // Check authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  if (user?.role !== "admin") {
    return (
      <AdminLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Access Denied</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="site" className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="site">Site Settings</TabsTrigger>
            <TabsTrigger value="email">Email Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* Site Settings */}
          <TabsContent value="site">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>
                  Update general information about your website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...siteSettingsForm}>
                  <form 
                    onSubmit={siteSettingsForm.handleSubmit(onSaveSiteSettings)} 
                    className="space-y-4"
                  >
                    <FormField
                      control={siteSettingsForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={siteSettingsForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            This email will be displayed on the contact page and used for receiving form submissions.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={siteSettingsForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={siteSettingsForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={siteSettingsForm.control}
                      name="businessHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Hours</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Format: Monday - Friday: 9:00 AM - 5:00 PM
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save Site Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure the email service for sending notifications and form responses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className={`rounded-lg p-4 mb-6 ${isEmailJSConfigured() ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                    <h3 className="font-semibold mb-2">EmailJS Status</h3>
                    <p>
                      {isEmailJSConfigured() 
                        ? "EmailJS is properly configured." 
                        : "EmailJS is not configured properly. Please update the settings below."
                      }
                    </p>
                  </div>
                </div>
                
                <Form {...emailSettingsForm}>
                  <form 
                    onSubmit={emailSettingsForm.handleSubmit(onSaveEmailSettings)} 
                    className="space-y-4"
                  >
                    <FormField
                      control={emailSettingsForm.control}
                      name="emailjsServiceId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>EmailJS Service ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Get this from your EmailJS dashboard under "Email Services"
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="emailjsContactTemplateId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Form Template ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Template ID for contact form submissions
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="emailjsConsultationTemplateId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Consultation Form Template ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Template ID for consultation form submissions
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="emailjsPublicKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>EmailJS Public Key</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Get this from your EmailJS dashboard under "Account" → "API Keys"
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save Email Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Contact Form Notifications</h3>
                      <p className="text-sm text-gray-500">
                        Receive an email when someone submits the contact form
                      </p>
                    </div>
                    <Switch 
                      checked={notifyOnContact} 
                      onCheckedChange={setNotifyOnContact} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Consultation Request Notifications</h3>
                      <p className="text-sm text-gray-500">
                        Receive an email when someone requests a consultation
                      </p>
                    </div>
                    <Switch 
                      checked={notifyOnConsultation} 
                      onCheckedChange={setNotifyOnConsultation} 
                    />
                  </div>
                  
                  <Button onClick={saveNotificationPreferences}>
                    Save Notification Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
