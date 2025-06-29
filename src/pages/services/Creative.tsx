
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, PenTool, Image, Video, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Creative = () => {
  console.log('🎨 Creative: Component rendering');

  const services = [
    {
      icon: <Palette className="h-8 w-8 text-blue-500" />,
      title: "Brand Identity Design",
      description: "Complete brand development including logo design, color palettes, and brand guidelines"
    },
    {
      icon: <PenTool className="h-8 w-8 text-blue-500" />,
      title: "Marketing Collateral",
      description: "Brochures, flyers, business cards, and all marketing materials for real estate"
    },
    {
      icon: <Image className="h-8 w-8 text-blue-500" />,
      title: "Digital Graphics",
      description: "Social media graphics, web banners, and digital advertising creatives"
    },
    {
      icon: <Video className="h-8 w-8 text-blue-500" />,
      title: "Video Production",
      description: "Property showcase videos, brand videos, and promotional content"
    }
  ];

  const benefits = [
    "Professional brand identity that builds trust",
    "Consistent visual communication across all platforms",
    "High-quality marketing materials that convert",
    "Creative solutions tailored to real estate industry",
    "Fast turnaround times for urgent projects",
    "Ongoing creative support and maintenance"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Creative & Branding Services | Real Estate Marketing | Stell Media</title>
        <meta name="description" content="Professional creative and branding services for real estate developers. Logo design, marketing materials, and brand identity solutions." />
        <meta name="keywords" content="real estate branding, logo design, marketing materials, creative services, brand identity" />
        <link rel="canonical" href="https://stellmedia.com/services/creative" />
      </Helmet>

      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Creative & Branding Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Build a powerful brand identity that resonates with your target audience and drives real estate success through compelling creative solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600">
                <Link to="/contact">Start Creative Project</Link>
              </Button>
              <Button variant="outline" size="lg">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Creative Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive creative solutions designed specifically for real estate professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">{service.icon}</div>
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

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Creative Services?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Brand?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's create a compelling brand identity that sets you apart in the real estate market.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Creative;
