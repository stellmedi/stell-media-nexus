
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, ArrowRight, CheckCircle2, Star, Users, Building, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const phoneNumber = "919877100369";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const handleWhatsAppClick = () => {
    toast.success("Opening WhatsApp", {
      description: "Connecting you to our support team"
    });
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    toast.success("Initiating call", {
      description: "Connecting you to our team"
    });
    window.open(`tel:${phoneNumber}`, '_blank');
  };

  const stats = [
    { icon: <Users className="w-6 h-6 text-blue-600" />, value: "500+", label: "Projects Delivered" },
    { icon: <Building className="w-6 h-6 text-indigo-600" />, value: "50+", label: "Real Estate Partners" },
    { icon: <TrendingUp className="w-6 h-6 text-purple-600" />, value: "180%", label: "Average Lead Increase" },
    { icon: <Star className="w-6 h-6 text-amber-500" />, value: "4.9/5", label: "Client Satisfaction" }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden" aria-labelledby="hero-heading">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/25 to-pink-200/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Premium grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        {/* Trust indicators */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-blue-100">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">Trusted by 500+ businesses globally</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 id="hero-heading" className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] animate-fade-in">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent relative">
              Your Complete Digital Growth Partner
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
            </span>
          </h1>
          <div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            <span className="text-blue-600">Real Estate</span> & <span className="text-purple-600">E-Commerce</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-100">
            From <strong className="text-blue-700">comprehensive real estate solutions</strong> including virtual tours, CRM automation, and lead generation to <strong className="text-purple-700">advanced e-commerce optimization</strong> with product discovery and performance marketing.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in delay-200">
            <Button 
              onClick={handleWhatsAppClick}
              size="xl" 
              className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:from-blue-800 hover:via-indigo-700 hover:to-purple-700 text-white text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageSquare className="mr-3" size={20} /> Start Your Growth Journey
            </Button>
            <Button 
              onClick={handleCallClick}
              variant="white"
              size="xl" 
              className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="mr-3" size={20} /> Schedule Consultation
            </Button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-16">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Free Strategy Session</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>30-Day Quick Results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>ROI Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Industry Sections */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Real Estate Section */}
          <div className="group">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Real Estate</h3>
                  <p className="text-blue-600 font-semibold">Complete Digital Solutions</p>
                </div>
              </div>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                End-to-end digital transformation for real estate professionals. From stunning virtual tours and 3D visualizations to automated CRM systems and lead generation.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Virtual Tours & Photography</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">3D Visualization</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">CRM & Automation</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Lead Generation</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">SEO & Digital Marketing</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Website Development</span>
                </div>
              </div>
              <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6 shadow-lg">
                <Link to="/real-estate">
                  Explore Real Estate Solutions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* E-Commerce Section */}
          <div className="group">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 15a1 1 0 001-1v-3a1 1 0 00-1-1H7a1 1 0 00-1 1v3a1 1 0 001 1h1zm5 0a1 1 0 001-1v-6a1 1 0 00-1-1h-1a1 1 0 00-1 1v6a1 1 0 001 1h1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">E-Commerce</h3>
                  <p className="text-purple-600 font-semibold">Growth & Optimization</p>
                </div>
              </div>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Advanced e-commerce solutions to maximize your online potential. From intelligent product discovery to performance marketing that drives sustainable growth.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Product Discovery</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Search Optimization</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Catalog SEO</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Performance Marketing</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Conversion Optimization</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-3"></div>
                  <span className="font-medium">Analytics & Insights</span>
                </div>
              </div>
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg py-6 shadow-lg">
                <Link to="/ecommerce">
                  Explore E-Commerce Solutions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
