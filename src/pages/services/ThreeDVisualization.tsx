
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Play, Layers, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ThreeDVisualization = () => {
  const features = [
    {
      icon: <Box className="h-8 w-8 text-blue-500" />,
      title: "3D Walkthroughs",
      description: "Realistic 3D property walkthroughs that bring projects to life before construction"
    },
    {
      icon: <Play className="h-8 w-8 text-blue-500" />,
      title: "Animation Videos",
      description: "Dynamic project development animations showcasing timeline and features"
    },
    {
      icon: <Layers className="h-8 w-8 text-blue-500" />,
      title: "Architectural Visualization",
      description: "Detailed architectural renderings and floor plan visualizations"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "VR Experiences",
      description: "Virtual reality experiences for immersive property presentations"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>3D Visualization & Animation | Real Estate Services | Stell Media</title>
        <meta name="description" content="Professional 3D visualization and animation services for real estate. Create stunning architectural visualizations and project animations." />
        <meta name="keywords" content="3d visualization, architectural rendering, real estate animation, 3d walkthrough, vr real estate" />
        <link rel="canonical" href="https://stellmedia.com/services/3d-visualization" />
      </Helmet>

      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              3D Visualization & Animation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Bring your real estate projects to life with stunning 3D visualizations and animations that showcase your vision before construction begins.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600">
                <Link to="/contact">Create 3D Animation</Link>
              </Button>
              <Button variant="outline" size="lg">
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">3D Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced 3D visualization services that help you present your projects with stunning realism.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Visualize Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Transform your architectural plans into stunning 3D experiences.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">
              Start Project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThreeDVisualization;
