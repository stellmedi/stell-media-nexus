
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart, Globe, Database, Code, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Search className="h-12 w-12 text-indigo-500" />,
    title: "Product Discovery Solutions",
    description: "Enhance search performance with Algolia and Bloomreach integration. Improve navigation and browse experiences for complex product catalogs.",
    features: [
      "Site search optimization",
      "Navigation restructuring",
      "Product data cleanup",
      "Faceted filtering implementation",
      "Search relevancy tuning",
      "Search analytics and insights",
      "Custom search UI development",
      "Product recommendation engines"
    ],
    link: "/services/product-discovery"
  },
  {
    icon: <Database className="h-12 w-12 text-indigo-500" />,
    title: "Data Enrichment",
    description: "Transform messy product data into clean, structured information that improves both customer experience and your backend operations.",
    features: [
      "Data cleansing and standardization",
      "Attribute mapping and enhancement",
      "Product tagging automation",
      "Taxonomy development",
      "Data quality assessment",
      "Master data management",
      "Product information enrichment",
      "Legacy data migration"
    ],
    link: "/services/data-enrichment"
  },
  {
    icon: <Code className="h-12 w-12 text-indigo-500" />,
    title: "Technical Implementation",
    description: "Expert development and integration of e-commerce product discovery tools to maximize performance and ROI.",
    features: [
      "Algolia & Bloomreach integration",
      "Custom search UI development",
      "API development & integration",
      "Performance optimization",
      "Headless commerce architecture",
      "E-commerce platform integration",
      "Technical requirements analysis",
      "Long-term technical support"
    ],
    link: "/services/technical-implementation"
  },
  {
    icon: <Globe className="h-12 w-12 text-indigo-500" />,
    title: "SEO Services",
    description: "Improve organic visibility with data-driven SEO strategies tailored for e-commerce sites with large product catalogs.",
    features: [
      "Technical SEO audits",
      "Product page optimization",
      "Category structure enhancement",
      "Content gap analysis",
      "Keyword research and mapping",
      "Mobile optimization",
      "URL structure optimization",
      "Schema markup implementation"
    ],
    link: "/services/seo"
  },
  {
    icon: <BarChart className="h-12 w-12 text-indigo-500" />,
    title: "SEM Services",
    description: "Drive measurable traffic and conversions through targeted search marketing campaigns for e-commerce products.",
    features: [
      "Google Shopping optimization",
      "Performance-based campaigns",
      "Product feed management",
      "Conversion tracking setup",
      "Bid management strategies",
      "Audience targeting optimization",
      "Ad copy and creative development",
      "ROAS optimization"
    ],
    link: "/services/sem"
  },
  {
    icon: <Zap className="h-12 w-12 text-indigo-500" />,
    title: "Conversion Optimization",
    description: "Scientifically improve your e-commerce conversion rates through data-driven testing and optimization strategies.",
    features: [
      "UX/UI analysis & enhancement",
      "A/B testing implementation",
      "Customer journey optimization",
      "Abandonment reduction strategies",
      "Checkout flow optimization",
      "Personalization strategies",
      "Conversion funnel analysis",
      "User behavior studies"
    ],
    link: "/services/conversion-optimization"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We help e-commerce businesses optimize their product discovery experience, clean up messy data, and drive more conversions.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-8 items-center py-8">
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="mb-6">{service.icon}</div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                    <Button asChild className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90">
                      <Link to={service.link}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <Card className="border border-gray-200 shadow-sm h-full">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold">Key Features</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your e-commerce experience?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
                Let's talk about how we can help optimize your product discovery and boost your conversions.
              </p>
              <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
                <Link to="/contact">Book Your Free Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
