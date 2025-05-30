
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

// Simplified form schema with only essential fields
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(2, { message: "Company name is required" }),
  message: z.string().min(10, { message: "Please tell us about your project" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ConsultationFormProps {
  className?: string;
}

const ConsultationForm = ({ className = "" }: ConsultationFormProps) => {
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
      company: "",
      message: "",
    },
  });

  // Initialize EmailJS on component mount
  useEffect(() => {
    const initializeEmailJS = async () => {
      console.log("ConsultationForm: Initializing EmailJS...");
      setIsInitializing(true);
      
      try {
        await initEmailJS();
        const connectionTest = await testEmailJSConnection();
        setEmailJSReady(connectionTest);
        console.log("ConsultationForm: EmailJS ready:", connectionTest);
      } catch (error) {
        console.error("ConsultationForm: EmailJS initialization failed:", error);
        setEmailJSReady(false);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeEmailJS();
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log("ConsultationForm: Form submission started");
    console.log("ConsultationForm: Form data:", data);
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Ensure EmailJS is ready
      if (!isEmailJSInitialized()) {
        throw new Error("EmailJS is not properly initialized. Please refresh the page and try again.");
      }
      
      console.log("ConsultationForm: Calling sendEmail with template:", TEMPLATES.consultation);
      
      const response = await sendEmail(TEMPLATES.consultation, {
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
        subject: "Consultation Request",
      });
      
      console.log("ConsultationForm: Email sent successfully:", response);
      
      // Show success message
      toast({
        title: "Consultation Request Sent",
        description: "We've received your consultation request and will contact you within 24 hours!",
      });
      
      // Reset form and show success state
      form.reset();
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("ConsultationForm: Form submission failed:", error);
      
      const errorMessage = error instanceof Error ? error.message : "There was a problem sending your request. Please try again.";
      setFormError(errorMessage);
      
      // Show error toast
      toast({
        title: "Failed to Send Request",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonState = () => {
    if (isInitializing) return "Initializing...";
    if (isSubmitting) return "Submitting...";
    if (!emailJSReady) return "Service Unavailable";
    return "Request Consultation";
  };

  const isFormDisabled = isSubmitting || !emailJSReady || isInitializing;

  return (
    <div className={`bg-white p-8 rounded-lg shadow-lg border border-gray-200 ${className}`}>
      <h2 className="text-2xl font-bold mb-2 text-gray-900">Book Your Free Consultation</h2>
      <p className="text-gray-600 mb-6">
        Fill out the form below and our team will get back to you within 24 hours.
      </p>
      
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
          <AlertDescription>Thank you! Your consultation request has been submitted.</AlertDescription>
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
                  <FormLabel>Full Name</FormLabel>
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
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your company" {...field} disabled={isFormDisabled} />
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
                <FormLabel>Tell Us About Your Project</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What are your e-commerce goals and challenges?" 
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

export default ConsultationForm;
