
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart, Globe, Database, Code, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Search className="h-10 w-10 text-indigo-500" />,
    title: "Product Discovery Solutions",
    description: "Enhance search performance with Algolia and Bloomreach integration. Improve navigation and browse experiences for complex product catalogs.",
    features: [
      "Site search optimization",
      "Navigation restructuring",
      "Product data cleanup",
      "Faceted filtering implementation"
    ],
    link: "/services/product-discovery"
  },
  {
    icon: <Database className="h-10 w-10 text-indigo-500" />,
    title: "Data Enrichment",
    description: "Transform messy product data into clean, structured information that improves both customer experience and your backend operations.",
    features: [
      "Data cleansing and standardization",
      "Attribute mapping and enhancement",
      "Product tagging automation",
      "Taxonomy development"
    ],
    link: "/services/data-enrichment"
  },
  {
    icon: <Code className="h-10 w-10 text-indigo-500" />,
    title: "Technical Implementation",
    description: "Expert development and integration of e-commerce product discovery tools to maximize performance and ROI.",
    features: [
      "Algolia & Bloomreach integration",
      "Custom search UI development",
      "API development & integration",
      "Performance optimization"
    ],
    link: "/services/technical-implementation"
  },
  {
    icon: <Globe className="h-10 w-10 text-indigo-500" />,
    title: "SEO Services",
    description: "Improve organic visibility with data-driven SEO strategies tailored for e-commerce sites with large product catalogs.",
    features: [
      "Technical SEO audits",
      "Product page optimization",
      "Category structure enhancement",
      "Content gap analysis"
    ],
    link: "/services/seo"
  },
  {
    icon: <BarChart className="h-10 w-10 text-indigo-500" />,
    title: "SEM Services",
    description: "Drive measurable traffic and conversions through targeted search marketing campaigns for e-commerce products.",
    features: [
      "Google Shopping optimization",
      "Performance-based campaigns",
      "Product feed management",
      "Conversion tracking setup"
    ],
    link: "/services/sem"
  },
  {
    icon: <Zap className="h-10 w-10 text-indigo-500" />,
    title: "Conversion Optimization",
    description: "Scientifically improve your e-commerce conversion rates through data-driven testing and optimization strategies.",
    features: [
      "UX/UI analysis & enhancement",
      "A/B testing implementation",
      "Customer journey optimization",
      "Abandonment reduction strategies"
    ],
    link: "/services/conversion-optimization"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We specialize in improving how customers find and discover products in your online store, with solutions tailored to your specific business needs.
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
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
