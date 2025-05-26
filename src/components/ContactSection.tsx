
import React, { useEffect, useState } from "react";
import ContactFormComponent from "@/components/forms/ContactFormComponent";
import { TEMPLATES } from "@/utils/emailService";
import { useContactFormConfig } from "@/hooks/use-contact-form-config";

const ContactSection = () => {
  const { config, isLoaded } = useContactFormConfig('consultation');
  const [isConfigReady, setIsConfigReady] = useState(false);
  
  useEffect(() => {
    if (isLoaded) {
      setIsConfigReady(true);
    }
  }, [isLoaded]);

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your E-commerce Conversions?</h2>
            <p className="text-lg mb-8 text-indigo-100">
              Book a free consultation with our team and learn how we can help optimize your product discovery experience.
            </p>
            <div className="space-y-4 mb-8">
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
          
          <div className="md:col-span-1">
            {isConfigReady ? (
              <ContactFormComponent 
                templateId={config.templateId || TEMPLATES.CONSULTATION}
                title={config.formTitle}
                buttonText={config.buttonText}
                successMessage={config.successMessage}
                className="max-w-md"
              />
            ) : (
              <ContactFormComponent 
                templateId={TEMPLATES.CONSULTATION}
                title="Book a Consultation"
                showCompany={true}
                showWebsite={true}
                buttonText="Request Consultation"
                successMessage="Thank you! We'll get back to you shortly."
                className="max-w-md"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
