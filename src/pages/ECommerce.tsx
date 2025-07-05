
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart, Database, Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import SchemaMarkup from "@/components/SchemaMarkup";

const ECommerce = () => {
  const services = [
    {
      icon: <Search className="h-8 w-8 text-purple-500" />,
      title: "Product Discovery Management",
      description: "Advanced search optimization and product discovery solutions to help customers find what they're looking for faster."
    },
    {
      icon: <Database className="h-8 w-8 text-purple-500" />,
      title: "Catalog SEO & Data Enrichment",
      description: "Strategic SEO optimization for large product catalogs with automated data enrichment and structured markup."
    },
    {
      icon: <BarChart className="h-8 w-8 text-purple-500" />,
      title: "Performance Marketing",
      description: "Data-driven performance marketing campaigns designed to maximize ROI and drive sustainable e-commerce growth."
    }
  ];

  const eCommerceServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-commerce Optimization Services",
    "description": "Product discovery management, catalog SEO, and performance marketing for e-commerce brands",
    "provider": {
      "@type": "Organization",
      "name": "Stell Media",
      "url": "https://stellmedia.com"
    },
    "serviceType": "E-commerce Optimization",
    "areaServed": "Worldwide"
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>E-Commerce Product Discovery & Performance Marketing | Stell Media</title>
        <meta name="description" content="Specialized e-commerce solutions including product discovery optimization, catalog SEO, and performance marketing to drive growth for online stores." />
        <meta name="keywords" content="ecommerce optimization, product discovery, catalog SEO, performance marketing, ecommerce growth, online store optimization" />
        <link rel="canonical" href="https://stellmedia.com/ecommerce" />
      </Helmet>

      <SchemaMarkup type="service" data={eCommerceServiceSchema} />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="mobile-hero-spacing pb-16 bg-gradient-to-r from-purple-50 to-indigo-50 relative min-h-screen">
        <div className="container mx-auto px-4 min-h-screen flex items-center justify-center"
             style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
              E-Commerce Product Discovery & Performance Marketing
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Optimize your product discovery, enhance catalog SEO, and drive growth with data-driven performance marketing strategies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-700 to-indigo-600">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our E-Commerce Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive optimization solutions designed specifically for growing e-commerce brands and large product catalogs.
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
      <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your E-Commerce Growth?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our specialized solutions can optimize your product discovery and drive more sales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Conversation
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-purple-700">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ECommerce;
