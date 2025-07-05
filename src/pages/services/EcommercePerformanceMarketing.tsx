
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, BarChart, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EcommercePerformanceMarketing = () => {
  console.log('📈 EcommercePerformanceMarketing: Component rendering');

  const services = [
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: "Paid Advertising",
      description: "Google Ads, Facebook Ads, and marketplace advertising campaigns optimized for ROI"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: "Shopping Campaigns",
      description: "Google Shopping and product listing ads that drive qualified traffic and sales"
    },
    {
      icon: <BarChart className="h-8 w-8 text-purple-500" />,
      title: "Analytics & Tracking",
      description: "Advanced tracking setup and performance analytics for data-driven decisions"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: "Campaign Optimization",
      description: "Continuous optimization of ad campaigns for maximum performance and efficiency"
    }
  ];

  const metrics = [
    "Increase ROAS by 200-400%",
    "Reduce cost per acquisition by 30-50%",
    "Improve conversion rates by 25-60%",
    "Expand reach to qualified audiences",
    "Enhanced product visibility across platforms",
    "Real-time performance monitoring and reporting"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>E-commerce Performance Marketing | Digital Advertising | Stell Media</title>
        <meta name="description" content="Data-driven performance marketing for e-commerce brands. Google Ads, Facebook Ads, and shopping campaigns that deliver results." />
        <meta name="keywords" content="ecommerce marketing, performance marketing, google ads, facebook ads, shopping campaigns, ROAS optimization" />
        <link rel="canonical" href="https://stellmedia.com/services/ecommerce-performance-marketing" />
      </Helmet>

      <Navbar />
      
      <section className="mobile-hero-spacing pb-16 bg-gradient-to-br from-purple-50 to-indigo-50" style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
              E-commerce Performance Marketing
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Data-driven performance marketing campaigns that maximize your e-commerce ROI through strategic paid advertising and optimization.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-700 to-indigo-600">
                <Link to="/contact">Launch Campaigns</Link>
              </Button>
              <Button variant="outline" size="lg">
                Free Strategy Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance Marketing Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive performance marketing solutions designed to drive e-commerce growth and profitability.
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
            <h2 className="text-3xl font-bold text-center mb-12">Expected Results</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{metric}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your E-commerce?</h2>
          <p className="text-xl mb-8 opacity-90">
            Launch high-performing marketing campaigns that drive real results for your business.
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

export default EcommercePerformanceMarketing;
