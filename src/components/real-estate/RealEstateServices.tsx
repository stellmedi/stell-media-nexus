
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Search, Palette, Box, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RealEstateServices = () => {
  const realEstateServices = [
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
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-500" />,
      title: "Performance Marketing",
      description: "Data-driven performance marketing campaigns designed to maximize ROI and drive sustainable real estate growth.",
      features: [
        "Multi-Channel Performance Campaigns",
        "Advanced Attribution Modeling", 
        "Conversion Rate Optimization",
        "Real-Time Analytics & Reporting"
      ],
      link: "/services/sem"
    },
    {
      icon: <Search className="h-12 w-12 text-blue-500" />,
      title: "SEO & Content Strategy",
      description: "Drive organic traffic with strategic SEO and compelling content that converts visitors into customers.",
      features: [
        "Local SEO Optimization",
        "Content Marketing Strategy", 
        "Technical SEO Implementation",
        "Keyword Research & Analysis"
      ],
      link: "/services/seo"
    },
    {
      icon: <Palette className="h-12 w-12 text-blue-500" />,
      title: "Creative & Branding",
      description: "Complete brand development and visual identity solutions tailored for real estate professionals.",
      features: [
        "Logo & Brand Identity Design",
        "Marketing Collateral Creation", 
        "Property Brochure Design",
        "Brand Guidelines Development"
      ],
      link: "/contact"
    },
    {
      icon: <Box className="h-12 w-12 text-blue-500" />,
      title: "3D Animation & Visualization", 
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
    }
  ];

  return (
    <section className="py-24 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Real Estate Digital Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete end-to-end digital transformation services designed specifically for the real estate industry.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {realEstateServices.map((service, index) => (
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
  );
};

export default RealEstateServices;
