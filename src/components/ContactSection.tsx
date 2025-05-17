
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import emailjs from 'emailjs-com';

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
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
      // First try to send via EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        website: formData.website || "Not provided",
        message: formData.message
      };
      
      await emailjs.send(
        'service_stellmedia', 
        'template_consultation', 
        templateParams,
        'qOg5qx_DbcXNrQ8v8'
      );
      
      console.log("Consultation request submitted:", templateParams);
      
      toast({
        title: "Consultation Request Received",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        message: ""
      });
      
      // Show fallback dialog anyway as a confirmation
      setShowDialog(true);
    } catch (error) {
      console.error("Error submitting consultation request:", error);
      setFormError("There was a problem with our email service. Please use the alternative method.");
      // Show fallback dialog
      setShowDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const constructMailtoLink = () => {
    const subject = encodeURIComponent(`Consultation Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'Not provided'}\n` +
      `Website: ${formData.website || 'Not provided'}\n\n` +
      `Message:\n${formData.message}\n`
    );
    
    return `mailto:info@stellmedia.com?subject=${subject}&body=${body}`;
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
                {isSubmitting ? "Submitting..." : "Request Consultation"}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Fallback Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Consultation Request</DialogTitle>
            <DialogDescription>
              To ensure we receive your consultation request, please also send us an email directly.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>
              Click the button below to open your email client with your consultation request details pre-filled.
            </p>
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <a href={constructMailtoLink()} target="_blank" rel="noopener noreferrer">
                  Open Email Client
                </a>
              </Button>
              <p className="text-sm text-gray-500">
                If the button doesn't work, please send an email to <a href="mailto:info@stellmedia.com" className="text-blue-600">info@stellmedia.com</a> with your consultation details.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;
