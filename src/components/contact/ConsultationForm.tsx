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
import { saveConsultationSubmission } from "@/services/supabaseFormService";

// Simplified form schema - only 4 essential fields
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Company name is required" }),
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
    console.log("ConsultationForm: Form submission started with data:", data);
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Save to Supabase first
      await saveConsultationSubmission({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
      });
      console.log("Consultation submission saved to Supabase successfully");
      
      // Then send email via EmailJS
      if (isEmailJSInitialized()) {
        console.log("ConsultationForm: Sending email with template:", TEMPLATES.consultation);
        
        const response = await sendEmail(TEMPLATES.consultation, {
          name: data.name,
          email: data.email,
          company: data.company,
          message: data.message,
          subject: "Consultation Request from " + data.company,
        });
        
        console.log("ConsultationForm: Email sent successfully:", response);
      }
      
      // Show success message
      toast({
        title: "Consultation Request Sent!",
        description: "We'll contact you within 24 hours to discuss your project!",
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

  const isFormDisabled = isSubmitting || !emailJSReady || isInitializing;

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg border border-gray-200 ${className}`}>
      <h2 className="text-xl font-bold mb-2 text-gray-900">Book Your Free Consultation</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Fill out the form below and we'll contact you within 24 hours.
      </p>
      
      {/* Status indicators */}
      {isInitializing && (
        <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertDescription>Initializing...</AlertDescription>
        </Alert>
      )}
      
      {!isInitializing && !emailJSReady && (
        <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Service unavailable. Please call +91 98771 00369 or refresh the page.
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
          <AlertDescription>Consultation request submitted successfully!</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
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
                <FormLabel>Project Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your e-commerce project and goals" 
                    className="h-24" 
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
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Request Consultation"}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            We'll respond within 24 hours.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ConsultationForm;
