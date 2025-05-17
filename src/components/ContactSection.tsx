
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showManualInstructions, setShowManualInstructions] = useState(false);
  const [emailContent, setEmailContent] = useState({ subject: "", body: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Prepare email content for mailto link
      const subject = `Consultation Request from ${formData.name}`;
      const body = 
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || 'Not provided'}\n` +
        `Website: ${formData.website || 'Not provided'}\n\n` +
        `Message:\n${formData.message}`;
      
      // Store content for manual instructions
      setEmailContent({
        subject: subject,
        body: body
      });
      
      // Log submission for tracking
      console.log("Consultation request submitted:", {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        website: formData.website,
        message: formData.message
      });
      
      // Create mailto link and open default email client
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      const mailtoLink = `mailto:info@stellmedia.com?subject=${encodedSubject}&body=${encodedBody}`;
      
      // Try to open the email client
      const mailtoWindow = window.open(mailtoLink, '_blank');
      
      // Show success message
      toast({
        title: "Consultation Request Submitted",
        description: "Please complete sending the email in your email client.",
      });
      
      // If mailto failed or was blocked, show manual instructions
      if (!mailtoWindow || mailtoWindow.closed || typeof mailtoWindow.closed === 'undefined') {
        setShowManualInstructions(true);
      } else {
        // Reset form if successful
        setFormData({
          name: "",
          email: "",
          company: "",
          website: "",
          message: ""
        });
      }
      
    } catch (error) {
      console.error("Error with consultation request:", error);
      setFormError("There was a problem opening your email client. Please email us directly at info@stellmedia.com.");
      setShowManualInstructions(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied to your clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive"
      });
    });
  };

  const resetForm = () => {
    setShowManualInstructions(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      website: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
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
          
          {!showManualInstructions ? (
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Book a Consultation</h3>
              
              {formError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <Input
                    id="company"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    How can we help you?
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your current challenges..."
                    className="h-32"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  variant="white" 
                  className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Request Consultation"}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Complete Your Consultation Request</h3>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  Please complete your consultation request by sending an email with the following details:
                </p>
                
                <div>
                  <h4 className="font-medium mb-1 text-gray-800">To:</h4>
                  <div className="flex">
                    <Input value="info@stellmedia.com" readOnly className="bg-gray-50" />
                    <Button 
                      variant="outline" 
                      className="ml-2"
                      onClick={() => copyToClipboard("info@stellmedia.com")}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1 text-gray-800">Subject:</h4>
                  <div className="flex">
                    <Input value={emailContent.subject} readOnly className="bg-gray-50" />
                    <Button 
                      variant="outline" 
                      className="ml-2"
                      onClick={() => copyToClipboard(emailContent.subject)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1 text-gray-800">Body:</h4>
                  <div className="relative">
                    <Textarea 
                      value={emailContent.body} 
                      readOnly 
                      className="h-[150px] bg-gray-50" 
                    />
                    <Button
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(emailContent.body)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    onClick={resetForm}
                    className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white hover:opacity-90"
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
