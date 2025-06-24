
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, TrendingUp, Phone, MessageSquare, Target, Zap, BarChart, CheckCircle, ArrowRight, Camera, Box, Smartphone, Search, Globe, PaintBucket } from "lucide-react";
import { Link } from "react-router-dom";
import SchemaMarkup from "@/components/SchemaMarkup";

const RealEstate = () => {
  const services = [
    {
      icon: <Camera className="h-12 w-12 text-blue-500" />,
      title: "Virtual Tours & Photography",
      description: "360° virtual tours and professional photography to showcase properties with stunning visual experiences.",
      features: [
        "360° Virtual Tours", 
        "Professional Photography", 
        "Drone Services", 
        "Book Photo Shoot"
      ],
      cta: "Book Photo Shoot"
    },
    {
      icon: <Box className="h-12 w-12 text-blue-500" />,
      title: "3D Animation & Visualization",
      description: "Stunning 3D animations and visualizations for real estate projects and architectural walkthroughs.",
      features: [
        "3D Property Walkthroughs",
        "Architectural Visualization",
        "Project Animations",
        "Virtual Reality Tours"
      ],
      cta: "Create 3D Animation"
    },
    {
      icon: <Users className="h-12 w-12 text-blue-500" />,
      title: "CRM & Lead Management",
      description: "Comprehensive customer relationship management systems designed for real estate workflows.",
      features: [
        "Contact Management",
        "Deal Pipeline",
        "Automated Follow-ups",
        "Performance Analytics"
      ],
      cta: "Setup CRM System"
    },
    {
      icon: <Target className="h-12 w-12 text-blue-500" />,
      title: "Lead Generation & Marketing",
      description: "Automated lead generation campaigns and digital strategies for real estate professionals.",
      features: [
        "Lead Generation Campaigns",
        "Social Media Marketing",
        "Market Analysis",
        "ROI Tracking & Optimization"
      ],
      cta: "Generate More Leads"
    },
    {
      icon: <Search className="h-12 w-12 text-blue-500" />,
      title: "SEO & Digital Presence",
      description: "Search engine optimization and digital marketing to increase your real estate business visibility.",
      features: [
        "Local SEO",
        "Google My Business",
        "Online Reputation Management",
        "Content Marketing"
      ],
      cta: "Improve SEO Ranking"
    },
    {
      icon: <Globe className="h-12 w-12 text-blue-500" />,
      title: "Website Development",
      description: "Custom real estate websites with advanced features and modern responsive design.",
      features: [
        "Custom Websites",
        "Mobile Responsive",
        "Fast Loading",
        "Property Listings Integration"
      ],
      cta: "Build Website"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Faster Lead Response",
      description: "Respond to leads within minutes, not hours, with automated qualification and routing."
    },
    {
      icon: <BarChart className="h-8 w-8 text-green-500" />,
      title: "Higher Conversion Rates",
      description: "Convert more leads with personalized nurturing sequences and timely follow-ups."
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: "Better Lead Quality",
      description: "Focus on qualified prospects with intelligent lead scoring and segmentation."
    }
  ];

  const process = [
    {
      step: "01",
      title: "Strategy & Planning",
      description: "We analyze your target market, buyer personas, and current lead generation processes to create a customized strategy."
    },
    {
      step: "02",
      title: "System Implementation",
      description: "Deploy automated lead capture systems, CRM integration, and marketing automation workflows tailored to your projects."
    },
    {
      step: "03",
      title: "Optimization & Growth",
      description: "Continuously optimize campaigns based on performance data to maximize lead quality and conversion rates."
    }
  ];

  const realEstateServiceSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateService",
    "name": "Real Estate Digital Services & Lead Generation Solutions",
    "description": "Comprehensive digital services for real estate professionals including lead generation, CRM automation, virtual tours, and marketing solutions",
    "provider": {
      "@type": "Organization",
      "name": "Stell Media",
      "url": "https://stellmedia.com"
    },
    "serviceType": "Real Estate Digital Services",
    "areaServed": "India"
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Real Estate Digital Services & Lead Generation India | Stell Media</title>
        <meta name="description" content="Specialized digital solutions for real estate professionals including lead generation, CRM automation, virtual tours, 3D visualization, and marketing services in India." />
        <meta name="keywords" content="real estate digital services India, lead generation, CRM automation, virtual tours, 3D visualization, real estate marketing, property photography" />
        <link rel="canonical" href="https://stellmedia.com/real-estate" />
      </Helmet>

      <SchemaMarkup type="service" data={realEstateServiceSchema} />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                  <Home className="mr-2 h-4 w-4" />
                  Real Estate Digital Services
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent leading-tight">
                  Transform Your Real Estate Sales with Smart Lead Generation
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Specialized digital solutions designed exclusively for real estate professionals and agencies. Drive qualified leads, showcase properties with stunning visuals, and automate your sales process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600 text-lg px-8">
                    <Link to="/contact">
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    <Phone className="mr-2 h-5 w-5" />
                    Schedule Demo
                  </Button>
                </div>
                <div className="flex items-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Quick Setup</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Proven Results</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl transform rotate-6 opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format&q=85"
                  alt="Modern Real Estate Office with Digital Technology"
                  className="relative z-10 rounded-3xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Real Estate Solutions?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your real estate business with proven digital strategies that deliver measurable results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions designed specifically for real estate professionals and agencies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base mt-3">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                  <ul className="space-y-3 mb-6 flex-grow">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
                    {service.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Proven Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach to transforming your real estate digital presence and sales process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-700 to-indigo-600 text-white rounded-full text-2xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full transform -translate-x-1/2 w-24 h-0.5 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Real Estate Marketing?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading developers across India who have increased their qualified leads by 180% and reduced sales cycles by 40%.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/contact">
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Free Consultation
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-700 text-lg px-8">
              <span className="text-white hover:text-blue-700">View Success Stories</span>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealEstate;
