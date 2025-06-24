
import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useContactForm } from "./hooks/useContactForm";
import ContactFormStatus from "./components/ContactFormStatus";
import ContactFormFields from "./components/ContactFormFields";
import { saveContactSubmission } from "@/services/supabaseFormService";

interface SimpleContactFormProps {
  className?: string;
}

const SimpleContactForm = ({ className = "" }: SimpleContactFormProps) => {
  const {
    form,
    isSubmitting,
    formError,
    isSuccess,
    emailJSReady,
    isInitializing,
    onSubmit: originalOnSubmit,
  } = useContactForm();

  // Enhanced submit handler that saves to both EmailJS and Supabase
  const handleSubmit = async (data: any) => {
    try {
      // Save to Supabase first
      await saveContactSubmission({
        name: data.name,
        email: data.phone, // Using phone field for email in the service
        message: data.message,
      });
      console.log("Contact submission saved to Supabase successfully");
      
      // Then send email via EmailJS
      await originalOnSubmit(data);
    } catch (error) {
      console.error("Error saving to Supabase:", error);
      // Still try to send email even if Supabase fails
      await originalOnSubmit(data);
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg border border-gray-200 ${className}`}>
      <h3 className="text-xl font-bold mb-4 text-gray-900">Send Us a Message</h3>
      
      <ContactFormStatus 
        isInitializing={isInitializing}
        emailJSReady={emailJSReady}
        formError={formError}
        isSuccess={isSuccess}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <ContactFormFields form={form} isSubmitting={isSubmitting} />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white"
            disabled={isSubmitting || isInitializing}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span className="text-white">{isSubmitting ? "Sending..." : "Send Message"}</span>
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            We'll respond within 24 hours.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SimpleContactForm;
