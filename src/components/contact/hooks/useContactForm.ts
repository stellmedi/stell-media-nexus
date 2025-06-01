
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmail, TEMPLATES, initEmailJS, isEmailJSInitialized, testEmailJSConnection } from "@/utils/emailService";
import { useToast } from "@/hooks/use-toast";
import { formSchema, FormValues } from "../schemas/contactFormSchema";

export const useContactForm = () => {
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
      message: "",
    },
    mode: "onChange",
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
    console.log("SimpleContactForm: Form submission started with data:", data);
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Ensure EmailJS is ready
      if (!isEmailJSInitialized()) {
        throw new Error("EmailJS is not properly initialized. Please refresh the page and try again.");
      }
      
      console.log("SimpleContactForm: Sending email with template:", TEMPLATES.contact);
      
      const response = await sendEmail(TEMPLATES.contact, {
        name: data.name,
        email: data.email,
        message: data.message,
        subject: "Website Contact Form Message",
      });
      
      console.log("SimpleContactForm: Email sent successfully:", response);
      
      // Show success message
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours!",
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

  return {
    form,
    isSubmitting,
    formError,
    isSuccess,
    emailJSReady,
    isInitializing,
    onSubmit,
  };
};
