import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendEmail, TEMPLATES, initEmailJS, isEmailJSInitialized, testEmailJSConnection } from "@/utils/emailService";
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
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";

// Form schema with proper validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  company: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SimpleContactFormProps {
  className?: string;
}

const SimpleContactForm = ({ className = "" }: SimpleContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailJSReady, setEmailJSReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
    },
  });

  // Initialize EmailJS on component mount
  useEffect(() => {
    const initializeEmailJS = async () => {
      console.log("SimpleContactForm: Initializing EmailJS...");
      setIsInitializing(true);
      
      try {
        await initEmailJS();
        const connectionTest = await testEmailJSConnection();
        setEmailJSReady(connectionTest);
        console.log("SimpleContactForm: EmailJS ready:", connectionTest);
      } catch (error) {
        console.error("SimpleContactForm: EmailJS initialization failed:", error);
        setEmailJSReady(false);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeEmailJS();
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log("SimpleContactForm: Form submission started");
    console.log("SimpleContactForm: Form data:", data);
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Ensure EmailJS is ready
      if (!isEmailJSInitialized()) {
        throw new Error("EmailJS is not properly initialized. Please refresh the page and try again.");
      }
      
      console.log("SimpleContactForm: Calling sendEmail with template:", TEMPLATES.contact);
      
      const response = await sendEmail(TEMPLATES.contact, {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        company: data.company || "",
      });
      
      console.log("SimpleContactForm: Email sent successfully:", response);
      
      // Show success message
      toast({
        title: "Message Sent Successfully",
        description: "We've received your message and will get back to you within 24 hours!",
      });
      
      // Reset form and show success state
      form.reset();
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("SimpleContactForm: Form submission failed:", error);
      
      const errorMessage = error instanceof Error ? error.message : "There was a problem sending your message. Please try again.";
      setFormError(errorMessage);
      
      // Show error toast
      toast({
        title: "Failed to Send Message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonState = () => {
    if (isInitializing) return "Initializing...";
    if (isSubmitting) return "Sending...";
    if (!emailJSReady) return "Service Unavailable";
    return "Send Message";
  };

  const isFormDisabled = isSubmitting || !emailJSReady || isInitializing;

  return (
    <div className={`bg-white p-8 rounded-lg shadow-lg border border-gray-200 ${className}`}>
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h3>
      
      {/* Status indicators */}
      {isInitializing && (
        <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertDescription>Initializing email service...</AlertDescription>
        </Alert>
      )}
      
      {!isInitializing && !emailJSReady && (
        <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Email service is currently unavailable. Please try calling us directly at +91 98771 00369 or refresh the page.
          </AlertDescription>
        </Alert>
      )}
      
      {formError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      
      {isSuccess && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Thank you! Your message has been sent successfully.</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} disabled={isFormDisabled} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} disabled={isFormDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your company" {...field} disabled={isFormDisabled} />
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
                  <Input placeholder="What's this about?" {...field} disabled={isFormDisabled} />
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
                    placeholder="How can we help you?" 
                    className="h-32" 
                    {...field} 
                    disabled={isFormDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90"
            disabled={isFormDisabled}
          >
            {(isSubmitting || isInitializing) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {getButtonState()}
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            We respect your privacy and will never share your information.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SimpleContactForm;
