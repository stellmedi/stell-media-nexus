
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { sendEmail, isEmailJSConfigured } from "@/utils/emailService";
import { contactFormSchema, FormValues } from "../schemas/contactFormSchema";

export const useContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailJSReady, setEmailJSReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    const checkEmailJS = () => {
      setEmailJSReady(isEmailJSConfigured());
      setIsInitializing(false);
    };
    
    // Add a small delay to ensure EmailJS has time to initialize
    const timer = setTimeout(checkEmailJS, 500);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      if (!emailJSReady) {
        throw new Error("Email service is not configured");
      }

      // Send email with phone number instead of email
      await sendEmail("template_contact", {
        name: data.name,
        email: data.phone, // Using phone as email field for backward compatibility
        phone: data.phone,
        company: "",
        website: "",
        subject: "Contact Form Submission",
        message: data.message,
      });
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      form.reset();
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error with form submission:", error);
      let errorMessage = "There was a problem sending your message. Please try again.";
      
      if (error instanceof Error) {
        errorMessage += " Details: " + error.message;
      }
      
      setFormError(errorMessage);
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
