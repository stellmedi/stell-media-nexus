import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
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
      const subject = formData.subject || 'Contact Form Submission';
      const body = 
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || 'Not provided'}\n\n` +
        `Message:\n${formData.message}`;
      
      // Log submission for tracking
      console.log("Contact form submitted:", {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        subject: formData.subject,
        message: formData.message
      });
      
      // Create mailto link and open default email client
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      const mailtoLink = `mailto:info@stellmedia.com?subject=${encodedSubject}&body=${encodedBody}`;
      
      window.location.href = mailtoLink;
      
      toast({
        title: "Email client opening",
        description: "Please complete sending the email in your email client.",
      });
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: ""
        });
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error with contact form:", error);
      setFormError("There was a problem opening your email client. Please email us directly at info@stellmedia.com.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact Stell Media | E-commerce Product Discovery Experts</title>
        <meta 
          name="description" 
          content="Get in touch with Stell Media's team of e-commerce optimization experts. We're here to help grow your business and improve your product discovery experience."
        />
        <meta name="keywords" content="contact stell media, e-commerce optimization, product discovery, SEO services, contact us" />
        <link rel="canonical" href="https://stellmedia.com/contact" />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Have a question or ready to transform your e-commerce experience? Get in touch with our team today.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Details & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Fill out the form and we'll get back to you within 24 hours. For urgent inquiries, please call us directly.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Email</h3>
                      <p className="text-gray-600">info@stellmedia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+919877100369" className="hover:text-indigo-600 transition-colors">+91 98771 00369</a>
                      </p>
                      <p className="text-gray-600">
                        <a href="https://wa.me/919877100369" className="hover:text-indigo-600 transition-colors">WhatsApp: +91 98771 00369</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Office</h3>
                      <p className="text-gray-600">Zirakpur, SAS Nagar (Mohali),</p>
                      <p className="text-gray-600">Punjab, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h3>
                
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
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      className="h-32"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Opening Email..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Find Us</h2>
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                title="Stell Media Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27448.60824914151!2d76.79982769478256!3d30.64721144221175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f9329a983739f%3A0xe7602ef4ef0d6021!2sZirakpur%2C%20Punjab!5e0!3m2!1sen!2sin!4v1715963439373!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing Stell Media office location in Zirakpur, Punjab, India"
              />
            </div>
            <div className="text-center mt-4 text-gray-600">
              <p>Stell Media Office | Zirakpur, SAS Nagar (Mohali), Punjab, India</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
