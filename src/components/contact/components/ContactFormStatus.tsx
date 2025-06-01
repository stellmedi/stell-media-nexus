
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";

interface ContactFormStatusProps {
  isInitializing: boolean;
  emailJSReady: boolean;
  formError: string | null;
  isSuccess: boolean;
}

const ContactFormStatus = ({ 
  isInitializing, 
  emailJSReady, 
  formError, 
  isSuccess 
}: ContactFormStatusProps) => {
  return (
    <>
      {/* Status indicators */}
      {isInitializing && (
        <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertDescription>Initializing...</AlertDescription>
        </Alert>
      )}
      
      {!isInitializing && !emailJSReady && (
        <Alert className="mb-4 bg-yellow-50 text-yellow-800 border-yellow-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Service temporarily unavailable. Please call +91 98771 00369 or try again.
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
          <AlertDescription>Message sent successfully!</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ContactFormStatus;
