import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, WhatsApp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SEM = () => {
  // Function to handle chatbot click
  const handleChatbotClick = () => {
    toast({
      title: "Chat with us",
      description: "Our team will be with you shortly. How can we help?",
      action: (
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={() => window.open("https://wa.me/1234567890", "_blank")}
          className="flex items-center gap-1"
        >
          <WhatsApp className="h-4 w-4" /> Start WhatsApp Chat
        </Button>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Automated SEM Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Drive measurable traffic and conversions through optimized, automated search marketing campaigns for e-commerce products.
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
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRhdGElMjBhbmFseXRpY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="SEM Services" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Data-Driven Paid Search Marketing</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Our automated approach to search engine marketing combines intelligent bid management, dynamic product feeds, and performance optimization to maximize your ROAS.
                  </p>
                  <p>
                    We specialize in creating targeted campaigns that put your products in front of high-intent shoppers at the perfect moment in their buying journey.
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild>
                    <Link to="/contact">
                      Request a Campaign Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Features */}
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our SEM Services</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <h4 className="font-bold mb-3 text-gray-900">Google Shopping Optimization</h4>
                <p className="text-gray-600">Optimize your product feed and bidding strategy to maximize visibility and conversions in Google Shopping.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <h4 className="font-bold mb-3 text-gray-900">Performance-Based Campaigns</h4>
                <p className="text-gray-600">Create and optimize campaigns focusing on key performance indicators that matter most for your business.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <h4 className="font-bold mb-3 text-gray-900">Dynamic Product Feed Management</h4>
                <p className="text-gray-600">Automatically update your product feeds to ensure your ads always show accurate pricing, inventory, and promotions.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <h4 className="font-bold mb-3 text-gray-900">Conversion Tracking Automation</h4>
                <p className="text-gray-600">Set up comprehensive tracking to measure success across the entire customer journey.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <h4 className="font-bold mb-3 text-gray-900">Bid Management Strategies</h4>
                <p className="text-gray-600">Use data-driven bid optimization to maximize your return on ad spend (ROAS).</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                <h4 className="font-bold mb-3 text-gray-900">Audience Targeting Optimization</h4>
                <p className="text-gray-600">Define and refine audience segments to target shoppers most likely to convert.</p>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-indigo-50 rounded-lg p-8 mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Measurable Results</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-4xl font-bold text-indigo-600 mb-2">35%</p>
                  <p className="text-gray-700">Average increase in ROAS</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-indigo-600 mb-2">42%</p>
                  <p className="text-gray-700">Increase in conversion rate</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-indigo-600 mb-2">28%</p>
                  <p className="text-gray-700">Decrease in cost per acquisition</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to boost your paid search performance?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Let our SEM specialists create data-driven campaigns that drive qualified traffic and maximize your return on ad spend.
              </p>
              <Button asChild size="lg" variant="cta" className="shadow-xl">
                <Link to="/contact">
                  Start Your Campaign <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Chatbot */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            variant="default" 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={handleChatbotClick}
          >
            <MessageCircle size={24} />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SEM;
