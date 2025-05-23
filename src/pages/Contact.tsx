
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewContactForm from "@/components/contact/NewContactForm";
import { TEMPLATES, isEmailJSConfigured } from "@/utils/emailService";
import { Mail, Phone, MapPin, Clock, ArrowRight, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";

const ContactInfo = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
      {children}
    </div>
  </div>
);

const Contact = () => {
  const [emailConfigured, setEmailConfigured] = useState(true);
  const { isAuthenticated } = useAuth();
  
  // Check if EmailJS is configured
  useEffect(() => {
    setEmailConfigured(isEmailJSConfigured());
  }, []);

  // Set up event listener for form submissions
  useEffect(() => {
    const handleFormSubmission = (event: CustomEvent) => {
      console.log("Contact form submission detected:", event.detail);
      // You could add additional handling here if needed
    };
    
    window.addEventListener("formSubmitted", handleFormSubmission as EventListener);
    return () => {
      window.removeEventListener("formSubmitted", handleFormSubmission as EventListener);
    };
  }, []);

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
        <section className="pt-32 pb-12 md:pb-16 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-600 mb-6 md:mb-8">
                Have questions or ready to transform your <Link to="/services" className="text-indigo-600 hover:underline">e-commerce experience</Link>? Our team is here to help you succeed with <Link to="/services/product-discovery" className="text-indigo-600 hover:underline">product discovery</Link> and <Link to="/services/seo" className="text-indigo-600 hover:underline">optimization</Link>.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" onClick={() => {
                  // Dispatch form submission event when user clicks
                  const event = new CustomEvent("formSubmitted", { 
                    detail: { formData: { name: "Test User", email: "test@example.com" } } 
                  });
                  window.dispatchEvent(event);
                }}>
                  <a href="tel:+919877100369">
                    <Phone className="mr-2" size={18} />
                    Call Us Directly
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Email Configuration Alert for Admins */}
        {!emailConfigured && isAuthenticated && (
          <div className="container mx-auto px-4 my-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Email Service Not Configured</AlertTitle>
              <AlertDescription>
                <p>Your contact forms won't work until you configure EmailJS.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2" 
                  asChild
                >
                  <Link to="/admin/settings">
                    Configure Email Settings
                  </Link>
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Contact Details & Form */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-6 md:mb-8">
                  Fill out the form and we'll get back to you within 24 hours. Our <Link to="/services" className="text-indigo-600 hover:underline">digital services</Link> team is ready to help with your <Link to="/services/product-discovery" className="text-indigo-600 hover:underline">product discovery</Link> and <Link to="/services/data-enrichment" className="text-indigo-600 hover:underline">data enrichment</Link> needs.
                </p>
                
                <div className="space-y-6 md:space-y-8">
                  <ContactInfo icon={Mail} title="Email">
                    <p className="text-gray-600">
                      <a href="mailto:info@stellmedia.com" className="hover:text-indigo-600 transition-colors">
                        info@stellmedia.com
                      </a>
                    </p>
                  </ContactInfo>
                  
                  <ContactInfo icon={Phone} title="Phone">
                    <p className="text-gray-600">
                      <a href="tel:+919877100369" className="hover:text-indigo-600 transition-colors">
                        +91 98771 00369
                      </a>
                    </p>
                    <p className="text-gray-600 mt-1">
                      <a href="https://wa.me/919877100369" className="hover:text-indigo-600 transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                          <path d="M9 10a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0v-4Z" />
                          <path d="M14 10a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0v-4Z" />
                        </svg>
                        WhatsApp: +91 98771 00369
                      </a>
                    </p>
                  </ContactInfo>
                  
                  <ContactInfo icon={MapPin} title="Office">
                    <p className="text-gray-600">Zirakpur, SAS Nagar (Mohali),</p>
                    <p className="text-gray-600">Punjab, India</p>
                  </ContactInfo>
                  
                  <ContactInfo icon={Clock} title="Business Hours">
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </ContactInfo>
                </div>
                
                <div className="mt-8 md:mt-10">
                  <h3 className="text-xl font-semibold mb-4">Explore Our Services</h3>
                  <p className="text-gray-600 mb-4">
                    Learn more about our <Link to="/services/seo" className="text-indigo-600 hover:underline">SEO services</Link>, 
                    <Link to="/services/data-enrichment" className="text-indigo-600 hover:underline"> data enrichment</Link>, and 
                    <Link to="/services/search-migration" className="text-indigo-600 hover:underline"> search platform migration</Link> expertise.
                  </p>
                </div>
              </div>
              
              <NewContactForm 
                templateId={TEMPLATES.CONTACT}
                className="md:mt-4"
                onSuccessCallback={(formData) => {
                  // Dispatch custom event with form data
                  const event = new CustomEvent("formSubmitted", { 
                    detail: { formData } 
                  });
                  window.dispatchEvent(event);
                }}
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 md:mb-10 text-center text-gray-900">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto grid gap-6">
              {[
                {
                  q: "How soon can I expect a response to my inquiry?",
                  a: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling us directly."
                },
                {
                  q: "Do you offer free consultations?",
                  a: "Yes, we offer a free initial consultation to understand your needs and determine how we can best help your e-commerce business with product discovery and data enrichment solutions."
                },
                {
                  q: "What areas do you serve?",
                  a: "As a digital service provider, we work with clients worldwide. Our team operates remotely and can accommodate different time zones for our product discovery and SEO services."
                },
                {
                  q: "What information should I provide for the best response?",
                  a: "Including details about your business, website URL, specific challenges you're facing with product discovery or search, and your goals will help us provide the most relevant assistance."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Our Location</h2>
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
