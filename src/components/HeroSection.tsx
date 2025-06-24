
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Digital Growth Partner for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Real Estate & E-commerce
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Specialized lead generation & CRM for real estate developers. 
            Advanced product discovery & performance marketing for e-commerce brands.
          </p>
          
          {/* Value propositions */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">18+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Data-Driven Results</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">Industry Specialists</span>
            </div>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <Link to="/consultation">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold px-8 py-4 text-lg transition-all duration-300">
              <Link to="/case-studies">
                View Case Studies
              </Link>
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
