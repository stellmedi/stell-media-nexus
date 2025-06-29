
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Database, BarChart, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CatalogSEO = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-purple-500" />,
      title: "Product SEO Optimization",
      description: "Optimize product titles, descriptions, and metadata for better search visibility"
    },
    {
      icon: <Database className="h-8 w-8 text-purple-500" />,
      title: "Bulk Data Enrichment",
      description: "Enhance product data with rich descriptions, specifications, and SEO-friendly content"
    },
    {
      icon: <BarChart className="h-8 w-8 text-purple-500" />,
      title: "Category Structure",
      description: "Optimize category hierarchy and navigation for better user experience and SEO"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: "Schema Markup",
      description: "Implement structured data for rich snippets and enhanced search results"
    }
  ];

  const benefits = [
    "Improve organic search rankings for product pages",
    "Increase click-through rates with optimized titles",
    "Enhanced product visibility in Google Shopping",
    "Better user experience with enriched product data",
    "Automated SEO optimization for large catalogs",
    "Comprehensive performance tracking and reporting"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Catalog SEO & Data Enrichment | E-commerce Services | Stell Media</title>
        <meta name="description" content="Professional catalog SEO and data enrichment services for e-commerce. Optimize product pages and enhance search visibility." />
        <meta name="keywords" content="catalog SEO, product SEO, data enrichment, e-commerce optimization, product data" />
        <link rel="canonical" href="https://stellmedia.com/services/catalog-seo" />
      </Helmet>

      <Navbar />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
              Catalog SEO & Data Enrichment
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your e-commerce catalog with comprehensive SEO optimization and rich product data that drives organic traffic and conversions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-700 to-indigo-600">
                <Link to="/contact">Optimize Catalog</Link>
              </Button>
              <Button variant="outline" size="lg">
                Free Audit
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Catalog Optimization Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced catalog SEO and data enrichment services designed to maximize your e-commerce potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Catalog SEO</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Catalog?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's enhance your product catalog for better search visibility and higher conversions.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">
              Start Optimization <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CatalogSEO;
