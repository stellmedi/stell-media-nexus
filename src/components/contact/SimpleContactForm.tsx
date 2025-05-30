
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

  // Check EmailJS status on component mount
  useEffect(() => {
    const checkEmailJSStatus = async () => {
      console.log("SimpleContactForm: Checking EmailJS status...");
      
      // Wait a bit for initialization
      setTimeout(async () => {
        const isInitialized = isEmailJSInitialized();
        console.log("SimpleContactForm: EmailJS initialized:", isInitialized);
        
        if (isInitialized) {
          const canConnect = await testEmailJSConnection();
          console.log("SimpleContactForm: EmailJS connection test:", canConnect);
          setEmailJSReady(canConnect);
        } else {
          setEmailJSReady(false);
        }
      }, 1000);
    };

    checkEmailJSStatus();
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log("SimpleContactForm: Form submission started");
    console.log("SimpleContactForm: Form data:", data);
    console.log("SimpleContactForm: EmailJS ready:", emailJSReady);
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Double-check EmailJS status before sending
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
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
      });
      
      // Reset form
      form.reset();
      setIsSuccess(true);
      
      console.log("SimpleContactForm: Form submission completed successfully");
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("SimpleContactForm: Form submission failed:", error);
      
      let errorMessage = "There was a problem sending your message. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error("SimpleContactForm: Detailed error:", error.message);
      }
      
      setFormError(errorMessage);
      
      // Show error toast with more details
      toast({
        title: "Failed to Send Message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white p-8 rounded-lg shadow-lg border border-gray-200 ${className}`}>
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h3>
      
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
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your company" {...field} />
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
                  <Input placeholder="What's this about?" {...field} />
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
                Sending...
              </>
            ) : !emailJSReady ? (
              "Initializing..."
            ) : (
              "Send Message"
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

export default SimpleContactForm;
