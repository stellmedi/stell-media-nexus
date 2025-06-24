
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Box, 
  Users, 
  Target, 
  Building, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Globe,
  Zap,
  BarChart,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const RealEstate = () => {
  const services = [
    {
      icon: <Camera className="h-12 w-12 text-blue-500" />,
      title: "Virtual Tours & Photography",
      description: "360° virtual tours and professional photography to showcase properties with stunning visual experiences.",
      features: [
        "360° Virtual Property Tours",
        "Professional Real Estate Photography", 
        "Drone Aerial Services",
        "Interactive Floor Plans"
      ],
      link: "/services/virtual-tours"
    },
    {
      icon: <Box className="h-12 w-12 text-blue-500" />,
      title: "3D Visualization & Animation", 
      description: "Stunning 3D animations and architectural visualizations that bring projects to life before construction.",
      features: [
        "3D Property Walkthroughs",
        "Architectural Visualization",
        "Project Development Animations", 
        "Virtual Reality Experiences"
      ],
      link: "/services/3d-visualization"
    },
    {
      icon: <Users className="h-12 w-12 text-blue-500" />,
      title: "CRM & Lead Management",
      description: "Comprehensive customer relationship management systems designed specifically for real estate workflows.",
      features: [
        "Advanced Contact Management",
        "Automated Deal Pipeline", 
        "Smart Follow-up Sequences",
        "Performance Analytics Dashboard"
      ],
      link: "/services/crm-lead-management"
    },
    {
      icon: <Target className="h-12 w-12 text-blue-500" />,
      title: "Lead Generation & Marketing",
      description: "Automated lead generation campaigns and comprehensive digital marketing strategies for real estate.",
      features: [
        "Multi-Channel Lead Generation",
        "Social Media Marketing Campaigns", 
        "Market Analysis & Insights",
        "ROI Tracking & Optimization"
      ],
      link: "/services/lead-generation"
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "Increased Property Interest",
      description: "Virtual tours and professional photography significantly boost property inquiry rates and viewing requests."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Faster Lead Response",
      description: "Automated CRM systems ensure immediate lead follow-up and improved conversion rates."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Wider Market Reach", 
      description: "Digital marketing campaigns expand your reach to qualified prospects across multiple channels."
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      title: "Data-Driven Insights",
      description: "Advanced analytics provide actionable insights to optimize your sales and marketing strategies."
    }
  ];

  const testimonials = [
    {
      name: "Mukul Bansal",
      role: "Managing Director",
      company: "Motiaz Group",
      quote: "Stell Media's comprehensive approach to real estate marketing has transformed how we showcase our projects. The virtual tours and CRM automation have significantly improved our lead conversion rates."
    },
    {
      name: "Aman Khatri", 
      role: "Head of Marketing",
      company: "Ex-DLF & Central Park",
      quote: "The 3D visualizations and marketing automation solutions provided by Stell Media have been game-changing for our real estate operations. Highly professional service."
    },
    {
      name: "Pradeep Sandal",
      role: "Managing Partner", 
      company: "AHP Group",
      quote: "Working with Stell Media has elevated our digital presence significantly. Their expertise in real estate technology solutions is unmatched."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Helmet>
        <title>Real Estate Digital Solutions | Lead Generation & CRM | Stell Media</title>
        <meta name="description" content="Comprehensive real estate digital solutions including virtual tours, CRM automation, lead generation, and 3D visualization services for property developers." />
        <meta name="keywords" content="real estate digital marketing, property lead generation, real estate CRM, virtual tours, 3D visualization" />
        <link rel="canonical" href="https://stellmedia.com/real-estate" />
      </Helmet>

      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <Building className="w-4 h-4 mr-2" />
              Real Estate Digital Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Transform Your Real Estate Business
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Comprehensive digital solutions designed specifically for real estate developers, 
              agents, and property businesses. From virtual tours to automated lead management.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild size="xl" className="bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 shadow-lg px-10 py-6 text-lg">
                <Link to="/consultation">Start Your Transformation</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Complete Real Estate Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              End-to-end digital transformation services designed specifically for the real estate industry.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Link to={service.link} key={index} className="group">
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/90 backdrop-blur-sm hover:scale-[1.02] group-hover:border-blue-200">
                  <CardHeader className="pb-8 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-bl-3xl"></div>
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors mb-4">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Why Choose Our Real Estate Solutions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven results that drive growth for real estate businesses of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              What Our Real Estate Partners Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by leading real estate developers and agencies worldwide.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg italic leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-blue-600 font-semibold">{testimonial.role}</div>
                    <div className="text-gray-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8">Start Your Transformation</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Ready to revolutionize your real estate business with cutting-edge digital solutions? 
            Let's discuss how we can accelerate your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/consultation">
              <Button size="xl" className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-10 py-6 text-lg shadow-lg">
                Get Started Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="xl" 
                variant="outline" 
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-indigo-600 font-semibold px-10 py-6 text-lg"
              >
                Schedule Consultation <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealEstate;
