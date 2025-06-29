
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Database, BarChart, Zap, CheckCircle, ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ECommerceServices = () => {
  const ecommerceServices = [
    {
      icon: <Search className="h-12 w-12 text-purple-500" />,
      title: "Product Discovery Management",
      description: "Advanced product discovery optimization and intelligent search enhancement to help customers find products faster.",
      features: [
        "AI-Powered Search Optimization",
        "Advanced Product Filtering", 
        "Personalized Recommendation Engines",
        "User Experience Enhancement"
      ],
      link: "/services/product-discovery"
    },
    {
      icon: <Database className="h-12 w-12 text-purple-500" />,
      title: "Catalog SEO & Data Enrichment",
      description: "Strategic SEO optimization for large product catalogs with automated data enrichment and structured markup.",
      features: [
        "Large-Scale Catalog SEO",
        "Automated Data Enrichment", 
        "Schema Markup Implementation",
        "Content Optimization at Scale"
      ],
      link: "/services/data-enrichment"
    },
    {
      icon: <BarChart className="h-12 w-12 text-purple-500" />,
      title: "Performance Marketing",
      description: "Data-driven performance marketing campaigns designed to maximize ROI and drive sustainable e-commerce growth.",
      features: [
        "Multi-Channel Performance Campaigns",
        "Advanced Attribution Modeling", 
        "Conversion Rate Optimization",
        "Real-Time Analytics & Reporting"
      ],
      link: "/services/sem"
    },
    {
      icon: <Zap className="h-12 w-12 text-purple-500" />,
      title: "Conversion Optimization",
      description: "Comprehensive conversion rate optimization strategies to maximize revenue from existing traffic.",
      features: [
        "A/B Testing & Experimentation",
        "User Journey Optimization", 
        "Checkout Process Enhancement",
        "Mobile Experience Optimization"
      ],
      link: "/services/conversion-optimization"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-indigo-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-purple-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            E-Commerce Growth Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-900 bg-clip-text text-transparent">
            E-Commerce Optimization Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advanced optimization and marketing solutions for online retailers to maximize growth and conversions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {ecommerceServices.map((service, index) => (
            <Link to={service.link} key={index} className="group">
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/90 backdrop-blur-sm hover:scale-[1.02] group-hover:border-purple-200">
                <CardHeader className="pb-8 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 rounded-bl-3xl"></div>
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors mb-4">
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
                  <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
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

export default ECommerceServices;
