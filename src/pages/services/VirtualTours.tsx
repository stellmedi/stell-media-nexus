
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Eye, Smartphone, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const VirtualTours = () => {
  const features = [
    {
      icon: <Camera className="h-8 w-8 text-blue-500" />,
      title: "360° Photography",
      description: "High-resolution 360-degree photography capturing every detail of your property"
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-500" />,
      title: "Interactive Walkthrough",
      description: "Immersive virtual tours allowing visitors to explore properties remotely"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-500" />,
      title: "Mobile Optimized",
      description: "Seamless experience across all devices and platforms"
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Web Integration",
      description: "Easy embedding on websites and sharing across social platforms"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Virtual Tours & 360° Photography | Real Estate Services | Stell Media</title>
        <meta name="description" content="Professional 360° virtual tours and photography services for real estate. Showcase properties with immersive experiences that convert prospects into buyers." />
        <meta name="keywords" content="virtual tours, 360 photography, real estate photography, virtual walkthrough, property tours" />
        <link rel="canonical" href="https://stellmedia.com/services/virtual-tours" />
      </Helmet>

      <Navbar />
      
      <section className="mobile-hero-spacing pb-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative min-h-screen">
        <div className="container mx-auto px-4 min-h-screen flex items-center justify-center"
             style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Virtual Tours & 360° Photography
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Showcase your properties with stunning 360° virtual tours and professional photography that captivate prospects and drive sales.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600">
                <Link to="/contact">Get Started</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Service Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional virtual tour solutions designed to showcase your properties in the best light.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Showcase Your Properties?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's create stunning virtual tours that convert prospects into buyers.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">
              Book Photo Shoot <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VirtualTours;
