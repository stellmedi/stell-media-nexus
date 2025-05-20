
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendEmail, EmailFormData } from "@/utils/emailService";
import { useToast } from "@/hooks/use-toast";
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
import { useContactFormConfig } from "@/hooks/use-contact-form-config";

export interface ContactFormProps {
  templateId: string;
  title?: string;
  showCompany?: boolean;
  showWebsite?: boolean;
  showSubject?: boolean;
  buttonText?: string;
  successMessage?: string;
  className?: string;
}

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

const ContactFormComponent = ({
  templateId,
  title,
  showCompany = false,
  showWebsite = false,
  showSubject = false,
  buttonText = "Send Message",
  successMessage = "Thank you for your message. We'll get back to you soon!",
  className = "",
}: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Load form configuration - use consultation config for this component
  const { config, isLoaded } = useContactFormConfig('consultation');
  
  // Create form schema based on config
  const [formSchema, setFormSchema] = useState<z.ZodType<any>>(z.object({}));
  const [defaultValues, setDefaultValues] = useState<any>({});
  
  // Override props with config if available
  const finalTitle = title || config.formTitle;
  const finalButtonText = buttonText || config.buttonText;
  const finalSuccessMessage = successMessage || config.successMessage;
  const finalTemplateId = templateId || config.templateId;
  
  // Update schema and default values when config loads
  useEffect(() => {
    if (isLoaded) {
      // Check if we should use the config or props
      const usingProps = title && buttonText && successMessage;
      const activeConfig = usingProps 
        ? {
            fields: {
              name: { enabled: true, required: true },
              email: { enabled: true, required: true },
              company: { enabled: showCompany, required: false },
              website: { enabled: showWebsite, required: false },
              subject: { enabled: showSubject, required: false },
              message: { enabled: true, required: true },
              phone: { enabled: false, required: false },
            }
          }
        : config;
      
      const schema = createContactFormSchema(activeConfig);
      setFormSchema(schema);
      
      // Create default values object based on enabled fields
      const newDefaultValues: any = {};
      Object.entries(activeConfig.fields).forEach(([key, field]: [string, any]) => {
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
  }, [config, isLoaded, showCompany, showSubject, showWebsite, title, buttonText, successMessage]);

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
      // Make sure we have all required fields for EmailFormData
      const emailData: EmailFormData = {
        name: data.name || "",
        email: data.email || "",
        company: data.company || "",
        website: data.website || "",
        subject: data.subject || "",
        message: data.message || "",
        phone: data.phone || "",
      };
      
      await sendEmail(finalTemplateId, emailData);
      
      // Log submission for tracking
      console.log("Form submitted successfully:", data);
      
      // Show success message
      toast({
        title: "Message Sent",
        description: finalSuccessMessage,
      });
      
      // Reset form
      form.reset();
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error with form submission:", error);
      let errorMessage = "There was a problem sending your message. Please try again.";
      
      // More detailed error message
      if (error instanceof Error) {
        errorMessage += " Details: " + error.message;
      }
      
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to get field label
  const getFieldLabel = (fieldName: string, fieldConfig: any) => {
    if (fieldConfig?.label) return fieldConfig.label;
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };

  return (
    <div className={`bg-white p-8 rounded-lg shadow-lg border border-gray-200 ${className}`}>
      {finalTitle && <h3 className="text-2xl font-bold mb-6 text-gray-900">{finalTitle}</h3>}
      
      {formError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      
      {isSuccess && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          <AlertDescription>{finalSuccessMessage}</AlertDescription>
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
            className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : finalButtonText}
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            We respect your privacy and will never share your information.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ContactFormComponent;
