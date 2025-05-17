
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart, Globe } from "lucide-react";

const services = [
  {
    icon: <Search className="h-10 w-10 text-stell-500" />,
    title: "Product Discovery Solutions",
    description: "Enhance search performance with Algolia and Bloomreach integration. Improve navigation and browse experiences for complex product catalogs.",
    features: [
      "Site search optimization",
      "Navigation restructuring",
      "Product data cleanup",
      "Faceted filtering implementation"
    ]
  },
  {
    icon: <Globe className="h-10 w-10 text-stell-500" />,
    title: "SEO Services",
    description: "Improve organic visibility with data-driven SEO strategies tailored for e-commerce sites with large product catalogs.",
    features: [
      "Technical SEO audits",
      "Product page optimization",
      "Category structure enhancement",
      "Content gap analysis"
    ]
  },
  {
    icon: <BarChart className="h-10 w-10 text-stell-500" />,
    title: "SEM Services",
    description: "Drive measurable traffic and conversions through targeted search marketing campaigns for e-commerce products.",
    features: [
      "Google Shopping optimization",
      "Performance-based campaigns",
      "Product feed management",
      "Conversion tracking setup"
    ]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We specialize in improving how customers find and discover products in your online store.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block h-5 w-5 mr-2 rounded-full bg-stell-100 text-stell-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
