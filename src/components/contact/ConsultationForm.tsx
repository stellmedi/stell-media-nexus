// src/pages/Consultation.tsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimpleContactForm from "@/components/contact/SimpleContactForm";
import { isEmailJSConfigured } from "@/utils/emailService";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";

const Consultation: React.FC = () => {
  const [emailConfigured, setEmailConfigured] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setEmailConfigured(isEmailJSConfigured());
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Book a Consultation | Stell Media</title>
        <meta
          name="description"
          content="Schedule a free consultation with Stell Media’s e-commerce experts. We’ll help you optimize product discovery and grow your business."
        />
        <link rel="canonical" href="https://stellmedia.com/consultation" />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Schedule a Consultation
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Let’s chat about your e-commerce goals and see how Stell Media can help.
              </p>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">
                  Or send us a quick message <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Admin‐only warning if EmailJS isn’t set */}
        {!emailConfigured && isAuthenticated && (
          <div className="container mx-auto px-4 my-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Email Service Not Configured</AlertTitle>
              <AlertDescription>
                <p>Your consultation form won't work until EmailJS is set up.</p>
                <Button variant="outline" size="sm" className="mt-2" asChild>
                  <Link to="/admin/settings">Configure Email Settings</Link>
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Consultation Form */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-xl">
            <SimpleContactForm className="w-full" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Consultation;
