
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendEmail } from "@/utils/emailService";
import { useToast } from "@/hooks/use-toast";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useContactFormConfig } from "@/hooks/use-contact-form-config";

// Define dynamic form schema based on config
const createContactFormSchema = (config: any) => {
  const schemaFields: any = {};
  
  // Add fields based on configuration
  if (config.fields.name.enabled) {
    schemaFields.name = config.fields.name.required 
      ? z.string().min(2, { message: "Name must be at least 2 characters" })
      : z.string().optional();
  }
  
  if (config.fields.email.enabled) {
    schemaFields.email = config.fields.email.required 
      ? z.string().email({ message: "Please enter a valid email address" })
      : z.string().email({ message: "Please enter a valid email address" }).optional();
  }
  
  if (config.fields.phone.enabled) {
    schemaFields.phone = config.fields.phone.required
      ? z.string().min(5, { message: "Phone number is required" })
      : z.string().optional();
  }
  
  if (config.fields.company.enabled) {
    schemaFields.company = config.fields.company.required
      ? z.string().min(1, { message: "Company name is required" })
      : z.string().optional();
  }
  
  if (config.fields.subject.enabled) {
    schemaFields.subject = config.fields.subject.required
      ? z.string().min(2, { message: "Subject is required" })
      : z.string().optional();
  }
  
  if (config.fields.website.enabled) {
    schemaFields.website = config.fields.website.required
      ? z.string().url({ message: "Please enter a valid URL" })
      : z.string().url({ message: "Please enter a valid URL" }).optional();
  }
  
  if (config.fields.message.enabled) {
    schemaFields.message = config.fields.message.required
      ? z.string().min(10, { message: "Message must be at least 10 characters" })
      : z.string().optional();
  }
  
  return z.object(schemaFields);
};

interface NewContactFormProps {
  templateId: string;
  className?: string;
  onSuccessCallback?: (formData: any) => void;
}

const NewContactForm = ({ templateId, className = "", onSuccessCallback }: NewContactFormProps) => {
  const { toast: hookToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Load form configuration
  const { config, isLoaded } = useContactFormConfig('contact');
  
  // Create form schema based on config
  const [formSchema, setFormSchema] = useState<z.ZodType<any>>(z.object({}));
  const [defaultValues, setDefaultValues] = useState<any>({});
  
  // Update schema and default values when config loads
  useEffect(() => {
    if (isLoaded) {
      const schema = createContactFormSchema(config);
      setFormSchema(schema);
      
      // Create default values object based on enabled fields
      const newDefaultValues: any = {};
      Object.entries(config.fields).forEach(([key, field]: [string, any]) => {
        if (field.enabled) {
          newDefaultValues[key] = "";
        }
      });
      setDefaultValues(newDefaultValues);
      
      // Reset form with new defaults
      if (form) {
        form.reset(newDefaultValues);
      }
    }
  }, [config, isLoaded]);

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // Wait for config to load before rendering form
  if (!isLoaded) {
    return <div className="flex items-center justify-center p-8">Loading form...</div>;
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      await sendEmail(config.templateId || templateId, {
        name: data.name || "",
        email: data.email || "",
        company: data.company || "",
        subject: data.subject || "",
        message: data.message || "",
        website: data.website || "",
        // Use default params for properties not in form data
      });
      
      // Show success in both toast systems for redundancy
      hookToast({
        title: "Message Sent",
        description: config.successMessage || "We've received your message and will get back to you soon!",
      });
      
      toast.success("Message sent successfully!", {
        description: "We'll respond to your inquiry within 24 hours.",
      });
      
      // Call the success callback if provided
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
      
      // Reset form
      form.reset();
      setIsSuccess(true);
      
      console.log("Contact form submission successful for:", data.email);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error with contact form submission:", error);
      let errorMessage = "There was a problem sending your message. Please try again.";
      
      if (error instanceof Error) {
        errorMessage += " Details: " + error.message;
      }
      
      setFormError(errorMessage);
      
      // Show error in toast
      toast.error("Failed to send message", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to get field label
  const getFieldLabel = (fieldName: string, fieldConfig: any) => {
    if (fieldConfig.label) return fieldConfig.label;
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };

  return (
    <Card className={`shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{config.formTitle || "Send Us a Message"}</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
      </CardHeader>
      
      <CardContent>
        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        {isSuccess && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            <AlertDescription>{config.successMessage || "Thank you! Your message has been sent successfully."}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.fields.name.enabled && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getFieldLabel("name", config.fields.name)}</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {config.fields.email.enabled && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getFieldLabel("email", config.fields.email)}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            {config.fields.phone.enabled && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getFieldLabel("phone", config.fields.phone)}</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {config.fields.company.enabled && (
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getFieldLabel("company", config.fields.company)}</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {config.fields.subject.enabled && (
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getFieldLabel("subject", config.fields.subject)}</FormLabel>
                    <FormControl>
                      <Input placeholder="What's this about?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {config.fields.website.enabled && (
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getFieldLabel("website", config.fields.website)}</FormLabel>
                    <FormControl>
                      <Input 
                        type="url" 
                        placeholder="https://yourcompany.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {config.fields.message.enabled && (
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getFieldLabel("message", config.fields.message)}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="How can we help you?" 
                        className="h-32" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : config.buttonText || "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center border-t pt-4">
        <p className="text-xs text-gray-500 text-center">
          We respect your privacy and will never share your information.
        </p>
      </CardFooter>
    </Card>
  );
};

export default NewContactForm;
