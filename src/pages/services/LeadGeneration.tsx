
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Globe, BarChart, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LeadGeneration = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Multi-Channel Campaigns",
      description: "Integrated lead generation across digital platforms, social media, and search engines"
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Social Media Marketing",
      description: "Targeted social media campaigns to reach potential property buyers and investors"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "Market Analysis",
      description: "Comprehensive market research and insights to optimize targeting strategies"
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      title: "ROI Tracking",
      description: "Advanced analytics and ROI tracking to optimize campaign performance"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Lead Generation & Marketing | Real Estate Services | Stell Media</title>
        <meta name="description" content="Comprehensive lead generation and digital marketing services for real estate professionals. Drive qualified leads and grow your property business." />
        <meta name="keywords" content="real estate lead generation, property marketing, real estate advertising, lead campaigns" />
        <link rel="canonical" href="https://stellmedia.com/services/lead-generation" />
      </Helmet>

      <Navbar />
      
      <section className="mobile-hero-spacing pb-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative min-h-screen">
        <div className="container mx-auto px-4 min-h-screen flex items-center justify-center"
             style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Lead Generation & Marketing
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Drive qualified leads for your real estate business with comprehensive digital marketing strategies and automated campaigns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600">
                <Link to="/contact">Generate More Leads</Link>
              </Button>
              <Button variant="outline" size="lg">
                View Results
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Marketing Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive lead generation strategies designed to grow your real estate business.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Lead Generation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Launch data-driven campaigns that deliver qualified prospects to your business.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">
              Start Campaign <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LeadGeneration;
