
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart, Database, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: <Search className="h-10 w-10 text-indigo-500" />,
    title: "Product Discovery Optimization",
    description: "Enhance search performance with advanced algorithms, intelligent product filtering, and strategic optimization to improve how customers find your products.",
    features: [
      "Strategic search relevance optimization", 
      "Smart product navigation", 
      "Intelligent product filtering", 
      "Automated data enrichment"
    ],
    link: "/services/product-discovery"
  },
  {
    icon: <Code className="h-10 w-10 text-indigo-500" />,
    title: "Search Algorithm Optimization & Platform Migration",
    description: "Expert migration assistance and algorithm optimization between Elastic Search, Coveo, Algolia, and Bloomreach platforms with minimal disruption.",
    features: [
      "Search algorithm optimization", 
      "Seamless platform migration", 
      "API development & integration", 
      "Performance optimization"
    ],
    link: "/services/search-migration"
  },
  {
    icon: <BarChart className="h-10 w-10 text-indigo-500" />,
    title: "Performance Marketing",
    description: "Drive measurable traffic and conversions through strategically optimized search marketing campaigns for e-commerce products.",
    features: [
      "Data-powered campaign optimization", 
      "Performance tracking", 
      "Product feed optimization", 
      "Conversion optimization"
    ],
    link: "/services/sem"
  },
  {
    icon: <Database className="h-10 w-10 text-indigo-500" />,
    title: "Marketpulse",
    description: "End-to-end marketplace management for Amazon, Walmart, and other marketplaces to maximize visibility, conversions and profitability.",
    features: [
      "Marketplace listing optimization", 
      "Competitive analysis", 
      "Sales analytics & reporting", 
      "Inventory management"
    ],
    link: "/services/marketpulse"
  }
];

const ServicesSection = () => {
  return <section id="services" className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our expert team pairs industry-leading technology with hands-on human expertise to optimize every aspect of your e-commerce experience—from search and navigation to data management and marketing.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => <Link to={service.link} key={index} className="group">
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
                    {service.features.map((feature, idx) => <li key={idx} className="flex items-start">
                        <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>
            </Link>)}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100 shadow-lg">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>;
};

export default ServicesSection;
