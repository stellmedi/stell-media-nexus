
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart, Globe, Database, Code, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: <Search className="h-10 w-10 text-indigo-500" />,
    title: "AI-Powered Product Discovery",
    description: "Enhance search performance with AI algorithms, Elastic Search, Coveo, Algolia and Bloomreach integration. Improve navigation and browse experiences for complex product catalogs.",
    features: [
      "AI-driven search optimization",
      "Machine learning for navigation",
      "Intelligent product filtering",
      "Automated data enrichment"
    ],
    link: "/services/product-discovery"
  },
  {
    icon: <Database className="h-10 w-10 text-indigo-500" />,
    title: "Automated Data Enrichment",
    description: "Transform messy product data into clean, structured information through AI-powered automation that improves both customer experience and operations.",
    features: [
      "Automated data cleansing",
      "Machine learning tagging",
      "AI-powered categorization",
      "Intelligent taxonomy development"
    ],
    link: "/services/data-enrichment"
  },
  {
    icon: <Code className="h-10 w-10 text-indigo-500" />,
    title: "Search Platform Migration",
    description: "Expert migration assistance and algorithm optimization for e-commerce search capabilities between Elastic Search, Coveo, Algolia, and Bloomreach platforms.",
    features: [
      "AI search algorithm optimization",
      "Seamless platform migration",
      "API development & integration",
      "Performance optimization"
    ],
    link: "/services/search-migration"
  },
  {
    icon: <Globe className="h-10 w-10 text-indigo-500" />,
    title: "Hybrid Commerce Solutions",
    description: "Create seamless shopping experiences that bridge digital and physical retail through innovative connected technology and automation.",
    features: [
      "Omnichannel integration",
      "In-store digital experiences",
      "Unified inventory management",
      "Cross-channel analytics"
    ],
    link: "/services/hybrid-commerce"
  },
  {
    icon: <BarChart className="h-10 w-10 text-indigo-500" />,
    title: "AI Marketing Automation",
    description: "Drive measurable traffic and conversions through AI-optimized, automated search marketing campaigns for e-commerce products.",
    features: [
      "AI-powered campaign optimization",
      "Automated performance tracking",
      "Product feed automation",
      "Conversion optimization"
    ],
    link: "/services/ai-marketing"
  },
  {
    icon: <Zap className="h-10 w-10 text-indigo-500" />,
    title: "E-commerce Automation",
    description: "Streamline operations and reduce manual tasks with our comprehensive automation solutions powered by AI and machine learning.",
    features: [
      "Workflow automation",
      "Inventory management automation",
      "Customer service AI tools",
      "Analytics and reporting automation"
    ],
    link: "/services/ecommerce-automation"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We specialize in improving how customers find and discover products through AI, automation, and hybrid solutions tailored to your specific business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link to={service.link} key={index} className="group">
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full bg-white hover:border-indigo-200">
                <CardHeader className="pb-4">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <CardTitle className="text-xl font-bold text-gray-800">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
