
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart, Globe, Database, Code, Zap, ArrowRight, Network, ServerIcon, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Search className="h-12 w-12 text-indigo-500" />,
    title: "AI-Powered Product Discovery Solutions",
    description: "Enhance search performance with AI algorithms, machine learning, and intelligent integrations with Algolia and Bloomreach to create intuitive product discovery experiences.",
    features: [
      "AI-driven search relevance optimization",
      "Machine learning for behavioral insights",
      "Intelligent navigation restructuring",
      "Product data cleanup and enrichment",
      "Advanced faceted filtering implementation",
      "Real-time search analytics and insights",
      "Custom search UI development",
      "Personalized product recommendation engines"
    ],
    link: "/services/product-discovery"
  },
  {
    icon: <Database className="h-12 w-12 text-indigo-500" />,
    title: "Automated Data Enrichment",
    description: "Our AI-powered automation tools transform messy product data into clean, structured information that improves both customer experience and backend operations.",
    features: [
      "Automated data cleansing and standardization",
      "Machine learning for attribute mapping",
      "AI-powered product tagging automation",
      "Intelligent taxonomy development",
      "Real-time data quality assessment",
      "Automated master data management",
      "Neural network product categorization",
      "Streamlined legacy data migration"
    ],
    link: "/services/data-enrichment"
  },
  {
    icon: <Code className="h-12 w-12 text-indigo-500" />,
    title: "Technical Implementation & Automation",
    description: "Expert development and integration of e-commerce product discovery tools with automation capabilities to maximize performance and ROI.",
    features: [
      "AI-enhanced search integration",
      "Automated workflow implementation",
      "Custom API development & integration",
      "Performance optimization through ML",
      "Headless commerce architecture",
      "E-commerce platform integration",
      "Automated testing and deployment",
      "DevOps automation services"
    ],
    link: "/services/technical-implementation"
  },
  {
    icon: <Globe className="h-12 w-12 text-indigo-500" />,
    title: "AI-Driven SEO Services",
    description: "Improve organic visibility with data-driven, AI-powered SEO strategies tailored for e-commerce sites with large product catalogs.",
    features: [
      "AI-assisted technical SEO audits",
      "Automated product page optimization",
      "ML-driven category structure enhancement",
      "Predictive content gap analysis",
      "Automated keyword research and mapping",
      "Mobile optimization through AI",
      "Algorithmic URL structure optimization",
      "Automated schema markup implementation"
    ],
    link: "/services/seo"
  },
  {
    icon: <BarChart className="h-12 w-12 text-indigo-500" />,
    title: "Automated SEM Services",
    description: "Drive measurable traffic and conversions through AI-optimized, automated search marketing campaigns for e-commerce products.",
    features: [
      "AI-powered Google Shopping optimization",
      "Automated performance-based campaigns",
      "Dynamic product feed management",
      "Conversion tracking automation",
      "AI-driven bid management strategies",
      "ML audience targeting optimization",
      "Automated creative A/B testing",
      "ROAS optimization through AI"
    ],
    link: "/services/sem"
  },
  {
    icon: <Layout className="h-12 w-12 text-indigo-500" />,
    title: "Hybrid Commerce Solutions",
    description: "Create seamless shopping experiences that bridge online and offline channels through innovative technology and automation.",
    features: [
      "Unified inventory management",
      "Click-and-collect implementation",
      "In-store digital experience design",
      "Omnichannel customer journey mapping",
      "Mobile app development for stores",
      "Store locator and local inventory API",
      "Cross-channel analytics integration",
      "Hybrid loyalty program development"
    ],
    link: "/services/hybrid-commerce"
  },
  {
    icon: <Network className="h-12 w-12 text-indigo-500" />,
    title: "Custom AI Solutions",
    description: "Tailored artificial intelligence solutions designed specifically for your e-commerce business challenges and opportunities.",
    features: [
      "Computer vision for product recognition",
      "NLP for customer service automation",
      "Predictive inventory management",
      "Fraud detection algorithms",
      "Customer behavior prediction models",
      "Price optimization algorithms",
      "Visual search implementation",
      "Voice commerce integration"
    ],
    link: "/services/ai-solutions"
  },
  {
    icon: <ServerIcon className="h-12 w-12 text-indigo-500" />,
    title: "E-commerce Automation",
    description: "Streamline operations and reduce manual tasks with our comprehensive automation solutions for online retailers.",
    features: [
      "Marketing automation workflows",
      "Inventory update automation",
      "Order processing automation",
      "Customer service chatbots",
      "Email marketing automation",
      "Product data syndication",
      "Reporting and analytics automation",
      "Cross-platform data synchronization"
    ],
    link: "/services/ecommerce-automation"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We help e-commerce businesses leverage AI, automation, and hybrid solutions to optimize their product discovery experience, clean up messy data, and drive more conversions.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {services.slice(0, 6).map((service, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-8 items-center py-8">
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="mb-6">{service.icon}</div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                    <Button asChild className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100">
                      <Link to={service.link}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <Card className="border border-gray-200 shadow-sm h-full bg-white hover:shadow-md transition-shadow">
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
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your e-commerce experience?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
                Let's talk about how our AI-powered solutions, automation tools, and hybrid commerce strategies can help optimize your product discovery and boost your conversions.
              </p>
              <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 active:bg-gray-200">
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
