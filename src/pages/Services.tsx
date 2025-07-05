
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BarChart, Globe, Database, Code, Zap, ArrowRight, Network, ServerIcon, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Search className="h-12 w-12 text-indigo-500" />,
    title: "Smarter Product Discovery Solutions",
    description: "Optimize search performance with advanced algorithms and strategic enhancements to create intuitive product discovery experiences that drive conversions.",
    features: [
      "Strategic search relevance optimization",
      "Smart behavioral insights integration",
      "Intelligent navigation restructuring",
      "Product data optimization and enrichment",
      "Advanced faceted filtering optimization",
      "Real-time search analytics and insights",
      "Relevance algorithm enhancement strategies",
      "Personalized product recommendation optimization"
    ],
    link: "/services/product-discovery"
  },
  {
    icon: <Database className="h-12 w-12 text-indigo-500" />,
    title: "Automated Data Enrichment",
    description: "Transform messy product data into clean, structured information through technology-powered optimization strategies that improve customer experience and business operations.",
    features: [
      "Automated data cleansing strategies",
      "Smart attribute mapping optimization",
      "Product tagging automation strategies",
      "Intelligent taxonomy optimization",
      "Real-time data quality optimization",
      "Automated master data optimization",
      "Strategic product categorization",
      "Legacy data optimization strategies"
    ],
    link: "/services/data-enrichment"
  },
  {
    icon: <Code className="h-12 w-12 text-indigo-500" />,
    title: "Search Platform Migration Support",
    description: "Expert migration consultation and optimization strategies for your e-commerce search capabilities with focus on performance optimization and minimal business disruption.",
    features: [
      "Search platform migration consultation",
      "Algorithm optimization strategies",
      "Data transition optimization",
      "Performance optimization strategies",
      "Architecture optimization consulting",
      "E-commerce platform optimization",
      "Search configuration optimization",
      "Search relevance optimization"
    ],
    link: "/services/search-migration"
  },
  {
    icon: <Globe className="h-12 w-12 text-indigo-500" />,
    title: "Strategic SEO Services",
    description: "Improve organic visibility with data-driven, technology-enhanced SEO optimization strategies tailored for e-commerce sites with large product catalogs.",
    features: [
      "Comprehensive technical SEO optimization",
      "Automated product page optimization",
      "Strategic category structure optimization",
      "Predictive content gap optimization",
      "Automated keyword optimization strategies",
      "Mobile optimization strategies",
      "Strategic URL structure optimization",
      "Schema markup optimization"
    ],
    link: "/services/seo"
  },
  {
    icon: <BarChart className="h-12 w-12 text-indigo-500" />,
    title: "SEM Services",
    description: "Drive measurable traffic and conversions through optimized search marketing campaigns and strategic optimization for e-commerce products.",
    features: [
      "AI-powered Google Shopping optimization",
      "Performance-based campaign optimization",
      "Dynamic product feed optimization",
      "Conversion tracking optimization",
      "AI-driven bid optimization strategies",
      "ML audience targeting optimization",
      "Creative optimization and testing",
      "ROAS optimization through AI strategies"
    ],
    link: "/services/sem"
  },
  {
    icon: <Layout className="h-12 w-12 text-indigo-500" />,
    title: "Conversion Optimization",
    description: "Transform more website visitors into customers with data-driven optimization strategies that enhance user experience and drive conversions.",
    features: [
      "Product page optimization",
      "Checkout flow optimization",
      "Mobile experience optimization",
      "Trust & credibility optimization",
      "Personalization optimization strategies",
      "Value proposition optimization",
      "A/B testing optimization",
      "User behavior optimization analysis"
    ],
    link: "/services/conversion-optimization"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>E-commerce Optimization Services | Product Discovery & Search Solutions | Stell Media</title>
        <meta 
          name="description" 
          content="Transform your e-commerce experience with Stell Media's specialized optimization services including product discovery solutions, data enrichment, search optimization, SEO, and SEM services." 
        />
        <meta name="keywords" content="e-commerce optimization, product discovery optimization, data enrichment, search optimization, e-commerce SEO, SEM optimization" />
        <meta name="author" content="Stell Media" />
        <meta property="og:title" content="E-commerce Optimization Services | Stell Media" />
        <meta property="og:description" content="Transform your e-commerce experience with our specialized product discovery and optimization services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stellmedia.com/services" />
        <meta property="og:image" content="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" />
        <link rel="canonical" href="https://stellmedia.com/services" />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="mobile-hero-spacing pb-12 bg-gradient-to-r from-blue-50 to-indigo-50 relative min-h-screen">
          <div className="container mx-auto px-4 min-h-screen flex items-center justify-center"
               style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
            <div className="max-w-3xl mx-auto text-center w-full">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Explore our comprehensive range of technology-powered optimization services designed to enhance your e-commerce experience, improve product discovery, and create meaningful customer connections.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {services.map((service, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-8 items-center py-6">
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
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to optimize your e-commerce experience?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
                Let's talk about how our technology-powered optimization strategies and data-driven approaches can help enhance your product discovery and boost your conversions.
              </p>
              <Button asChild size="xl" variant="white" className="font-bold shadow-xl">
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
