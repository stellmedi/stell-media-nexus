
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, BarChart3, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SEM = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Targeted Campaigns",
      description: "Precision-targeted Google Ads and Bing campaigns that reach your ideal customers at the right moment"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "ROI Optimization",
      description: "Data-driven bid management and budget allocation to maximize return on advertising spend"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      title: "Performance Analytics",
      description: "Comprehensive tracking and reporting to monitor campaign performance and identify opportunities"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Landing Page Optimization",
      description: "High-converting landing pages designed to turn clicks into customers and maximize conversions"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Search Engine Marketing (SEM) | Performance Marketing | Stell Media</title>
        <meta name="description" content="Drive targeted traffic and conversions with our data-driven SEM campaigns. Google Ads, Bing Ads, and performance marketing services." />
        <meta name="keywords" content="SEM, search engine marketing, Google Ads, PPC, performance marketing, paid search advertising" />
        <link rel="canonical" href="https://stellmedia.com/services/sem" />
      </Helmet>

      <Navbar />
      
      <section className="mobile-hero-spacing pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Search Engine Marketing (SEM)
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Drive qualified traffic and maximize conversions with strategic SEM campaigns optimized for performance and ROI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600">
                <Link to="/contact">Start Your Campaign</Link>
              </Button>
              <Button variant="outline" size="lg">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">SEM Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive search engine marketing strategies designed to drive qualified traffic and conversions.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Marketing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Launch data-driven SEM campaigns that deliver measurable results and growth.
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

export default SEM;
