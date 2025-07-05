
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, BarChart, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CRMLeadManagement = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Contact Management",
      description: "Comprehensive contact database with detailed prospect information and interaction history"
    },
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Deal Pipeline",
      description: "Visual deal pipeline management with automated stage progression and notifications"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Automated Follow-ups",
      description: "Smart follow-up sequences and automated email campaigns for lead nurturing"
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      title: "Analytics Dashboard",
      description: "Real-time performance analytics and reporting for sales team optimization"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>CRM & Lead Management Systems | Real Estate Services | Stell Media</title>
        <meta name="description" content="Comprehensive CRM and lead management systems for real estate professionals. Automate workflows and optimize sales processes." />
        <meta name="keywords" content="real estate CRM, lead management, sales automation, contact management, deal pipeline" />
        <link rel="canonical" href="https://stellmedia.com/services/crm-lead-management" />
      </Helmet>

      <Navbar />
      
      <section className="mobile-hero-spacing pb-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative min-h-screen">
        <div className="container mx-auto px-4 min-h-screen flex items-center justify-center"
             style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              CRM & Lead Management
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Streamline your real estate operations with comprehensive CRM systems designed specifically for property sales and client management.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600">
                <Link to="/contact">Setup CRM System</Link>
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">CRM Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced CRM capabilities designed to optimize your real estate sales process.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Sales Process?</h2>
          <p className="text-xl mb-8 opacity-90">
            Implement a powerful CRM system that grows your real estate business.
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

export default CRMLeadManagement;
