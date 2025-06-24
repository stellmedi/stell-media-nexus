
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Box, Users, Target, Search, Globe, ShoppingCart, BarChart, Database, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  // Real Estate Services
  {
    icon: <Camera className="h-10 w-10 text-blue-500" />,
    title: "Virtual Tours & Photography",
    description: "360° virtual tours and professional photography to showcase properties with stunning visual experiences that convert prospects into buyers.",
    features: [
      "360° Virtual Property Tours", 
      "Professional Real Estate Photography", 
      "Drone Aerial Services", 
      "Interactive Floor Plans"
    ],
    link: "/real-estate",
    gradient: "from-blue-500 to-indigo-600",
    category: "Real Estate"
  },
  {
    icon: <Box className="h-10 w-10 text-blue-500" />,
    title: "3D Visualization & Animation",
    description: "Stunning 3D animations and architectural visualizations that bring real estate projects to life before construction begins.",
    features: [
      "3D Property Walkthroughs", 
      "Architectural Visualization", 
      "Project Development Animations", 
      "Virtual Reality Experiences"
    ],
    link: "/real-estate",
    gradient: "from-blue-500 to-indigo-600",
    category: "Real Estate"
  },
  {
    icon: <Users className="h-10 w-10 text-blue-500" />,
    title: "CRM & Lead Management",
    description: "Comprehensive customer relationship management systems designed specifically for real estate workflows and sales processes.",
    features: [
      "Advanced Contact Management", 
      "Automated Deal Pipeline", 
      "Smart Follow-up Sequences", 
      "Performance Analytics Dashboard"
    ],
    link: "/real-estate",
    gradient: "from-blue-500 to-indigo-600",
    category: "Real Estate"
  },
  {
    icon: <Target className="h-10 w-10 text-blue-500" />,
    title: "Lead Generation & Marketing",
    description: "Automated lead generation campaigns and comprehensive digital marketing strategies for real estate professionals.",
    features: [
      "Multi-Channel Lead Generation", 
      "Social Media Marketing Campaigns", 
      "Market Analysis & Insights", 
      "ROI Tracking & Optimization"
    ],
    link: "/real-estate",
    gradient: "from-blue-500 to-indigo-600",
    category: "Real Estate"
  },
  // E-Commerce Services
  {
    icon: <Search className="h-10 w-10 text-purple-500" />,
    title: "Product Discovery Management",
    description: "Advanced product discovery optimization and intelligent search enhancement to help customers find products faster and increase conversions.",
    features: [
      "AI-Powered Search Optimization", 
      "Advanced Product Filtering", 
      "Personalized Recommendation Engines", 
      "User Experience Enhancement"
    ],
    link: "/ecommerce",
    gradient: "from-purple-500 to-indigo-600",
    category: "E-Commerce"
  },
  {
    icon: <Database className="h-10 w-10 text-purple-500" />,
    title: "Catalog SEO & Data Enrichment",
    description: "Strategic SEO optimization for large product catalogs with automated data enrichment and structured markup for better visibility.",
    features: [
      "Large-Scale Catalog SEO", 
      "Automated Data Enrichment", 
      "Schema Markup Implementation", 
      "Content Optimization at Scale"
    ],
    link: "/ecommerce",
    gradient: "from-purple-500 to-indigo-600",
    category: "E-Commerce"
  },
  {
    icon: <BarChart className="h-10 w-10 text-purple-500" />,
    title: "Performance Marketing",
    description: "Data-driven performance marketing campaigns designed to maximize ROI and drive sustainable e-commerce growth across all channels.",
    features: [
      "Multi-Channel Performance Campaigns", 
      "Advanced Attribution Modeling", 
      "Conversion Rate Optimization", 
      "Real-Time Analytics & Reporting"
    ],
    link: "/ecommerce",
    gradient: "from-purple-500 to-indigo-600",
    category: "E-Commerce"
  },
  {
    icon: <Zap className="h-10 w-10 text-purple-500" />,
    title: "Conversion Optimization",
    description: "Comprehensive conversion rate optimization strategies to maximize revenue from your existing traffic and improve customer experience.",
    features: [
      "A/B Testing & Experimentation", 
      "User Journey Optimization", 
      "Checkout Process Enhancement", 
      "Mobile Experience Optimization"
    ],
    link: "/ecommerce",
    gradient: "from-purple-500 to-indigo-600",
    category: "E-Commerce"
  }
];

const ServicesSection = () => {
  const realEstateServices = services.filter(service => service.category === "Real Estate");
  const eCommerceServices = services.filter(service => service.category === "E-Commerce");

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Professional Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Specialized expertise across two high-growth industries, delivering end-to-end digital transformation that drives measurable results and sustainable growth.
          </p>
        </div>

        {/* Real Estate Services Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">Real Estate Digital Services</h3>
                <p className="text-blue-600 font-semibold">Complete end-to-end solutions for real estate professionals</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
            {realEstateServices.map((service, index) => (
              <Link to={service.link} key={index} className="group h-full">
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full bg-white/90 backdrop-blur-sm hover:scale-[1.02] group-hover:border-blue-200">
                  <CardHeader className="pb-6 relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-bl-3xl"></div>
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-3 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block h-5 w-5 mr-3 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center text-sm font-bold">✓</span>
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* E-Commerce Services Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">E-Commerce Growth Solutions</h3>
                <p className="text-purple-600 font-semibold">Advanced optimization and marketing for online retailers</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
            {eCommerceServices.map((service, index) => (
              <Link to={service.link} key={index} className="group h-full">
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full bg-white/90 backdrop-blur-sm hover:scale-[1.02] group-hover:border-purple-200">
                  <CardHeader className="pb-6 relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 rounded-bl-3xl"></div>
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-3 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block h-5 w-5 mr-3 rounded-full bg-purple-100 text-purple-600 flex-shrink-0 flex items-center justify-center text-sm font-bold">✓</span>
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Enhanced CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose your industry and discover how our specialized solutions can drive exceptional growth for your business.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Button asChild size="xl" className="bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 active:opacity-100 shadow-lg hover:shadow-xl py-6">
                <Link to="/real-estate">Real Estate Solutions</Link>
              </Button>
              <Button asChild size="xl" className="bg-gradient-to-r from-purple-700 to-indigo-600 hover:opacity-90 active:opacity-100 shadow-lg hover:shadow-xl py-6">
                <Link to="/ecommerce">E-Commerce Solutions</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
