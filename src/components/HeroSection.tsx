
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, ArrowRight } from "lucide-react";
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

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50" aria-labelledby="hero-heading">
      {/* Simplified background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-200/15 rounded-full blur-3xl -z-10"></div>
      
      {/* Simple grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] -z-10" style={{
        backgroundImage: `linear-gradient(to right, rgba(100, 116, 139, 0.3) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(100, 116, 139, 0.3) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative">
              Your Digital Growth Partner for Real Estate & E-Commerce
              <svg className="absolute -bottom-2 left-0 w-full hidden md:block" height="10" viewBox="0 0 400 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 5C65.3333 2.66667 204.6 -0.7 398 8.5" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto animate-fade-in delay-100">
            We drive measurable growth through specialized solutions: <strong>lead generation & CRM automation for real estate developers</strong>, and <strong>product discovery & performance marketing for e-commerce brands</strong>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200" role="group">
            <Button 
              onClick={handleWhatsAppClick}
              size="lg" 
              className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100 text-white text-lg px-8 py-6"
            >
              <MessageSquare className="mr-2" size={18} aria-hidden="true" /> Get Started
            </Button>
            <Button 
              onClick={handleCallClick}
              variant="secondary"
              size="lg" 
              className="text-lg px-8 py-6"
            >
              <Phone className="mr-2" size={18} aria-hidden="true" /> Call Us
            </Button>
          </div>
        </div>

        {/* Two Sub-Brand Sections */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Real Estate Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Real Estate</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Lead generation, automation, and CRM solutions designed specifically for real estate developers and sales teams.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Automated lead generation systems
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                CRM integration & optimization
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Marketing automation workflows
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/real-estate">
                Explore Real Estate Solutions <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* E-Commerce Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L3 3.5v3.979a9.992 9.992 0 006.458 9.307c.242.102.498.102.74 0A9.992 9.992 0 0017 7.479V3.5L10 2zM4.5 4.64L10 3.5l5.5 1.14v2.839a8.992 8.992 0 01-5.5 8.386A8.992 8.992 0 014.5 7.479V4.64z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">E-Commerce</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Product discovery management, catalog SEO, and performance marketing for growing e-commerce brands.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Product discovery optimization
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Catalog SEO & data enrichment
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Performance marketing campaigns
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link to="/ecommerce">
                Explore E-Commerce Solutions <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-50/60 to-transparent -z-10"></div>
    </section>
  );
};

export default HeroSection;
