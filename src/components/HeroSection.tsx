
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919877100369"; // Format for WhatsApp: country code (91) + number without any symbols
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">          
          {/* Main headline - Updated as requested */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Digital Growth for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Builders and eCommerce Giants
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Helping real estate developers close faster and e-commerce brands sell smarter with powerful automation, product discovery, and digital performance strategies.
          </p>
          
          {/* Value propositions */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">18+ Years of Digital Leadership</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Growth Backed by Data & Automation</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Niche Experts in Real Estate & eCommerce</span>
            </div>
          </div>
          
          {/* Enhanced Services Navigation - Two distinct entry paths */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
            <Link to="/real-estate" className="group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-bold mb-2">🏗️ Real Estate Solutions</h3>
                <p className="text-blue-100">CRM automation, lead generation & virtual tours</p>
                <div className="mt-4 flex items-center text-blue-200 group-hover:text-white">
                  <span className="text-sm">Explore Services</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link to="/ecommerce" className="group">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-xl text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-bold mb-2">🛒 eCommerce Solutions</h3>
                <p className="text-purple-100">Product discovery, catalog SEO & performance marketing</p>
                <div className="mt-4 flex items-center text-purple-200 group-hover:text-white">
                  <span className="text-sm">Explore Services</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <Link to="/consultation">
                Talk to Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              onClick={handleWhatsAppClick}
              variant="outline" 
              size="lg" 
              className="border-2 border-green-500 hover:border-green-600 text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" />
    </section>
  );
};

export default HeroSection;
