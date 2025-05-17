
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProductDiscovery = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Smarter Product Discovery Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Enhance your customers' shopping experience with intelligent search solutions that make finding the right products intuitive and effortless.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Transform How Customers Find Your Products</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Our product discovery solutions leverage advanced algorithms and intelligent integrations to create intuitive product discovery experiences that convert browsers into buyers.
                  </p>
                  <p>
                    We specialize in optimizing search experiences with Elastic Search, Coveo, Algolia, and Bloomreach to deliver relevant results even for complex catalogs.
                  </p>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3QlMjBzZWFyY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="Product Discovery" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>

            {/* Features */}
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Key Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Search Relevance Optimization</h4>
                <p className="text-gray-600">Fine-tune your search algorithms to ensure customers find exactly what they're looking for, even with incomplete queries.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Behavioral Insights Integration</h4>
                <p className="text-gray-600">Use customer behavior data to continually improve search results and product recommendations.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Intelligent Navigation</h4>
                <p className="text-gray-600">Create intuitive category structures and navigation paths that match how customers think about your products.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Advanced Filtering</h4>
                <p className="text-gray-600">Implement smart faceted search to help customers narrow down options quickly and efficiently.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to enhance your product discovery?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Let's discuss how our solutions can transform your customer experience and boost your conversions.
              </p>
              <Button asChild size="lg" variant="cta" className="shadow-xl">
                <Link to="/contact">
                  Book Your Consultation <ArrowRight className="ml-2 h-4 w-4" />
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

export default ProductDiscovery;
