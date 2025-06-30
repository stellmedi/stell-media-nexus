
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimpleContactForm from "@/components/contact/SimpleContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      title: "Email",
      details: "info@stellmedia.com",
      description: "Send us a message anytime"
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-500" />,
      title: "Phone",
      details: "+91 98771 00369",
      description: "Call us for immediate assistance"
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-500" />,
      title: "Location",
      details: "India",
      description: "Serving clients globally"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "Business Hours",
      details: "Mon - Fri: 9AM - 6PM IST",
      description: "We respond within 24 hours"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact Us | Get In Touch | Stell Media</title>
        <meta name="description" content="Get in touch with Stell Media for digital marketing solutions. Contact us for real estate marketing, e-commerce optimization, and performance marketing services." />
        <meta name="keywords" content="contact stell media, digital marketing consultation, get in touch, marketing services inquiry" />
        <link rel="canonical" href="https://stellmedia.com/contact" />
      </Helmet>

      <Navbar />
      
      <section className="mobile-hero-spacing pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to transform your digital presence? Let's discuss how we can help grow your business with our proven marketing strategies.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {info.icon}
                        <CardTitle className="text-lg">{info.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-gray-900 mb-1">{info.details}</p>
                      <CardDescription>{info.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Response within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Free consultation and strategy discussion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Customized recommendations for your business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>No obligation, just valuable insights</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
              <SimpleContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
