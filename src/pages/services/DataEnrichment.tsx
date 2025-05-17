
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const DataEnrichment = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Automated Data Enrichment
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform messy product data into clean, structured information that improves both customer experience and backend operations.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhdGElMjBhbmFseXNpc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="Data Enrichment" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Unlock the Power of Clean Product Data</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Our technology-powered automation tools transform inconsistent product information into valuable, structured data that drives better customer experiences and operational efficiency.
                  </p>
                  <p>
                    We help e-commerce businesses standardize, enrich, and optimize their product data at scale, reducing manual effort while improving data quality.
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our Data Enrichment Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Automated Data Cleansing</h4>
                <p className="text-gray-600">Identify and correct errors, inconsistencies, and duplications in your product data automatically.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Smart Attribute Mapping</h4>
                <p className="text-gray-600">Map and standardize product attributes to create consistent product information across your catalog.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Product Tagging Automation</h4>
                <p className="text-gray-600">Automatically generate relevant tags and categories for your products to improve discoverability.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Intelligent Taxonomy Development</h4>
                <p className="text-gray-600">Create logical product hierarchies that make sense to both your customers and search engines.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Data Quality Assessment</h4>
                <p className="text-gray-600">Continuously monitor data quality and identify areas for improvement with real-time analytics.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Master Data Management</h4>
                <p className="text-gray-600">Establish a single source of truth for your product data across all channels and platforms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your product data?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Let us help you clean, enrich, and optimize your product information for better customer experiences and operational efficiency.
              </p>
              <Button asChild size="lg" variant="cta" className="shadow-xl">
                <Link to="/contact">
                  Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DataEnrichment;
