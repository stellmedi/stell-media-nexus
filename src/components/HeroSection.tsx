
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle, Building, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden flex items-center">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-blue-100/10 via-indigo-100/15 to-purple-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-semibold shadow-lg border border-indigo-100">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 animate-pulse"></span>
              Your Complete Digital Growth Partner
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                  Transform Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Digital Presence
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Comprehensive digital solutions for <strong className="text-blue-700">real estate professionals</strong> and 
                <strong className="text-purple-700"> e-commerce businesses</strong>. 
                From lead generation to conversion optimization, we deliver end-to-end growth.
              </p>
            </div>

            {/* Industry Focus Pills */}
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center px-6 py-3 bg-blue-50 border border-blue-200 rounded-full">
                <Building className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-semibold">Real Estate Solutions</span>
              </div>
              <div className="flex items-center px-6 py-3 bg-purple-50 border border-purple-200 rounded-full">
                <ShoppingCart className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-800 font-semibold">E-commerce Growth</span>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">End-to-End Solutions</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">Industry Specialists</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">Proven Results</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">24/7 Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Button asChild size="xl" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:from-blue-800 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link to="/consultation">
                  Start Your Transformation
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="xl" className="border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 font-semibold px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/case-studies">
                  View Success Stories
                  <Play className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-gray-200 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">Industry Leaders</div>
                <div className="text-sm text-gray-600">Trusted Globally</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">Premium Quality</div>
                <div className="text-sm text-gray-600">Exceptional Results</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">Expert Team</div>
                <div className="text-sm text-gray-600">Dedicated Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
