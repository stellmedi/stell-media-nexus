
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, TrendingUp, Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import SchemaMarkup from "@/components/SchemaMarkup";

const RealEstate = () => {
  const services = [
    {
      icon: <Home className="h-8 w-8 text-blue-500" />,
      title: "Lead Generation Systems",
      description: "Automated lead capture and qualification systems designed specifically for real estate developers and projects."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "CRM Integration & Management",
      description: "Custom CRM solutions that streamline your sales process and improve lead conversion rates."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "Marketing Automation",
      description: "Automated marketing workflows and nurturing sequences to convert leads into sales."
    }
  ];

  const realEstateServiceSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateService",
    "name": "Real Estate Digital Marketing Services",
    "description": "Comprehensive lead generation, automation, and CRM services for real estate developers",
    "provider": {
      "@type": "Organization",
      "name": "Stell Media",
      "url": "https://stellmedia.com"
    },
    "serviceType": "Real Estate Lead Generation",
    "areaServed": "Worldwide"
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Real Estate Lead Generation & CRM Solutions | Stell Media</title>
        <meta name="description" content="Specialized lead generation, CRM automation, and marketing solutions for real estate developers. Drive more qualified leads and increase sales conversions." />
        <meta name="keywords" content="real estate lead generation, CRM automation, real estate marketing, property developer leads, real estate CRM" />
        <link rel="canonical" href="https://stellmedia.com/real-estate" />
      </Helmet>

      <SchemaMarkup type="service" data={realEstateServiceSchema} />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Real Estate Lead Generation & CRM Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Drive qualified leads and streamline your sales process with our specialized real estate marketing automation and CRM solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Real Estate Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions designed specifically for real estate developers and sales teams.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Real Estate Marketing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our specialized solutions can drive more qualified leads for your projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Conversation
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-700">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealEstate;
