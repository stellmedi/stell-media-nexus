
// src/pages/Contact.tsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, ArrowRight, AlertTriangle } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimpleContactForm from "@/components/contact/SimpleContactForm";
import { isEmailJSConfigured } from "@/utils/emailService";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";

const Contact: React.FC = () => {
  const [emailConfigured, setEmailConfigured] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setEmailConfigured(isEmailJSConfigured());
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact Stell Media | E-commerce Product Discovery Experts</title>
        <meta
          name="description"
          content="Get in touch with Stell Media's team of e-commerce optimization experts. We're here to help grow your business and improve your product discovery experience."
        />
        <meta
          name="keywords"
          content="contact stell media, e-commerce optimization, product discovery, SEO services, contact us"
        />
        <link rel="canonical" href="https://stellmedia.com/contact" />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Have questions or ready to transform your e-commerce experience? Our team is here to help you
                succeed.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/consultation">
                    Book a Consultation <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="tel:+919877100369">
                    <Phone className="mr-2" size={18} />
                    Call Us Directly
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* EmailJS Config Alert (Admins only) */}
        {!emailConfigured && isAuthenticated && (
          <div className="container mx-auto px-4 my-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Email Service Not Configured</AlertTitle>
              <AlertDescription>
                <p>Your contact forms won't work until you configure EmailJS.</p>
                <Button variant="outline" size="sm" className="mt-2" asChild>
                  <Link to="/admin/settings">Configure Email Settings</Link>
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Contact Details & New Contact Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Contact Info Column */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Fill out the form and we'll get back to you within 24 hours. For urgent inquiries, please call us directly.
                </p>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@stellmedia.com" className="hover:text-indigo-600">
                          info@stellmedia.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+919877100369" className="hover:text-indigo-600">
                          +91 98771 00369
                        </a>
                      </p>
                      <p className="text-gray-600 mt-1">
                        <a href="https://wa.me/919877100369" className="flex items-center hover:text-indigo-600">
                          <ArrowRight size={16} className="mr-1" />
                          WhatsApp: +91 98771 00369
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Office</h3>
                      <p className="text-gray-600">Zirakpur, SAS Nagar (Mohali),</p>
                      <p className="text-gray-600">Punjab, India</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Need a consultation?</h3>
                  <p className="text-gray-600 mb-4">
                    If you're looking for a more detailed conversation about your e-commerce needs, 
                    book a consultation with our experts.
                  </p>
                  <Button asChild className="mt-2">
                    <Link to="/consultation">
                      Book a Consultation <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Contact Form Column */}
              <div>
                <SimpleContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
