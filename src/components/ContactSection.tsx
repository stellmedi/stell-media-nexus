
import React, { useEffect, useState } from "react";
import ContactFormComponent from "@/components/forms/ContactFormComponent";
import { TEMPLATES } from "@/utils/emailService";
import { useContactFormConfig } from "@/hooks/use-contact-form-config";
import { toast } from "sonner";

const ContactSection = () => {
  const { config, isLoaded } = useContactFormConfig('consultation');
  const [isConfigReady, setIsConfigReady] = useState(false);
  
  useEffect(() => {
    if (isLoaded) {
      setIsConfigReady(true);
    }
  }, [isLoaded]);

  // Set up notification listener for form submissions
  useEffect(() => {
    const handleFormSubmission = (event: CustomEvent) => {
      const { formData } = event.detail;
      
      // Display toast notification
      toast.success("New form submission received!", {
        description: `${formData.name} just submitted a contact form.`,
        duration: 5000,
      });
      
      // You could also implement webhooks or other notification methods here
      console.log("Form submission data:", formData);
      
      // Send to admin dashboard (could be implemented with websockets, etc.)
      if (window.localStorage.getItem("stell_admin_authenticated") === "true") {
        // Show browser notification for admin users
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("New Form Submission", {
            body: `${formData.name} just submitted a contact form.`,
            icon: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
          });
        }
      }
    };
    
    // Add event listener for custom form submission event
    window.addEventListener("formSubmitted", handleFormSubmission as EventListener);
    
    // Request notification permission for admin users
    if (window.localStorage.getItem("stell_admin_authenticated") === "true" && 
        "Notification" in window && 
        Notification.permission !== "granted" && 
        Notification.permission !== "denied") {
      Notification.requestPermission();
    }
    
    return () => {
      window.removeEventListener("formSubmitted", handleFormSubmission as EventListener);
    };
  }, []);

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your E-commerce Conversions?</h2>
            <p className="text-lg mb-6 md:mb-8 text-indigo-100">
              Book a free consultation with our team and learn how we can help optimize your product discovery experience.
            </p>
            <div className="space-y-4 mb-6 md:mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <span className="text-white">✓</span>
                </div>
                <p>No obligations, just actionable insights</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <span className="text-white">✓</span>
                </div>
                <p>Tailored recommendations for your business</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <span className="text-white">✓</span>
                </div>
                <p>Quick response within 24 hours</p>
              </div>
            </div>
          </div>
          
          {isConfigReady ? (
            <ContactFormComponent 
              templateId={config.templateId || TEMPLATES.CONSULTATION}
              title={config.formTitle}
              buttonText={config.buttonText}
              successMessage={config.successMessage}
              onSuccessfulSubmit={(formData) => {
                // Dispatch custom event with form data
                const event = new CustomEvent("formSubmitted", { 
                  detail: { formData } 
                });
                window.dispatchEvent(event);
              }}
            />
          ) : (
            <ContactFormComponent 
              templateId={TEMPLATES.CONSULTATION}
              title="Book a Consultation"
              showCompany={true}
              showWebsite={true}
              buttonText="Request Consultation"
              successMessage="Thank you! We'll get back to you shortly."
              onSuccessfulSubmit={(formData) => {
                // Dispatch custom event with form data
                const event = new CustomEvent("formSubmitted", { 
                  detail: { formData } 
                });
                window.dispatchEvent(event);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
