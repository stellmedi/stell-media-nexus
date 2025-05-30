
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendEmail, TEMPLATES, isEmailJSInitialized, testEmailJSConnection } from "@/utils/emailService";
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

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  phone: z.string().min(5, { message: "Phone number is required" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  message: z.string().min(10, { message: "Please tell us a bit about your business and needs" }),
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      website: "",
      message: "",
    },
  });

  // Check EmailJS status on component mount
  useEffect(() => {
    const checkEmailJSStatus = async () => {
      console.log("ConsultationForm: Checking EmailJS status...");
      
      // Wait a bit for initialization
      setTimeout(async () => {
        const isInitialized = isEmailJSInitialized();
        console.log("ConsultationForm: EmailJS initialized:", isInitialized);
        
        if (isInitialized) {
          const canConnect = await testEmailJSConnection();
          console.log("ConsultationForm: EmailJS connection test:", canConnect);
          setEmailJSReady(canConnect);
        } else {
          setEmailJSReady(false);
        }
      }, 1000);
    };

    checkEmailJSStatus();
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log("ConsultationForm: Form submission started");
    console.log("ConsultationForm: Form data:", data);
    console.log("ConsultationForm: EmailJS ready:", emailJSReady);
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Double-check EmailJS status before sending
      if (!isEmailJSInitialized()) {
        throw new Error("EmailJS is not properly initialized. Please refresh the page and try again.");
      }
      
      console.log("ConsultationForm: Calling sendEmail with template:", TEMPLATES.consultation);
      
      const response = await sendEmail(TEMPLATES.consultation, {
        name: data.name,
        email: data.email,
        company: data.company || "",
        phone: data.phone,
        website: data.website || "",
        message: data.message,
        subject: "Consultation Request",
      });
      
      console.log("ConsultationForm: Email sent successfully:", response);
      
      // Show success message
      toast({
        title: "Consultation Request Sent",
        description: "We've received your consultation request and will contact you soon!",
      });
      
      // Reset form
      form.reset();
      setIsSuccess(true);
      
      console.log("ConsultationForm: Form submission completed successfully");
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("ConsultationForm: Form submission failed:", error);
      
      let errorMessage = "There was a problem sending your request. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error("ConsultationForm: Detailed error:", error.message);
      }
      
      setFormError(errorMessage);
      
      // Show error toast with more details
      toast({
        title: "Failed to Send Request",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white p-8 rounded-lg shadow-lg border border-gray-200 ${className}`}>
      <h2 className="text-2xl font-bold mb-2 text-gray-900">Book Your Free Consultation</h2>
      <p className="text-gray-600 mb-6">
        Fill out the form below and our team will get back to you within 24 hours.
      </p>
      
      {/* EmailJS Status Indicator */}
      {!emailJSReady && (
        <Alert className="mb-4 bg-yellow-50 text-yellow-800 border-yellow-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Email service is initializing. If this persists, please try calling us directly at +91 98771 00369.
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
          <CheckCircle2 className="h-4 w-4 mr-2" />
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
                    <Input placeholder="Your name" {...field} />
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
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL (Optional)</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://yourcompany.com" {...field} />
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90"
            disabled={isSubmitting || !emailJSReady}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : !emailJSReady ? (
              "Initializing..."
            ) : (
              "Request Consultation"
            )}
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
