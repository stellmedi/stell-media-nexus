
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";

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
      {/* Simplified background elements - removed complex CSS patterns */}
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative">
              Smarter Product Discovery for Growing E-Commerce Brands
              <svg className="absolute -bottom-2 left-0 w-full hidden md:block" height="10" viewBox="0 0 400 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 5C65.3333 2.66667 204.6 -0.7 398 8.5" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto animate-fade-in delay-100">
            We combine technology and human expertise to optimize site search, navigation, content, and product data—helping brands with large catalogs deliver better shopping experiences and drive real results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200" role="group">
            <Button 
              onClick={handleWhatsAppClick}
              size="lg" 
              className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100 text-white text-lg px-8 py-6"
            >
              <MessageSquare className="mr-2" size={18} aria-hidden="true" /> WhatsApp Us
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

        {/* Simplified data visualization */}
        <div className="absolute inset-0 -z-10 opacity-10" aria-hidden="true">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-4xl">
              <defs>
                <linearGradient id="viz-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path d="M0,250 C100,150 200,450 300,250 C400,50 500,350 600,200 C700,50 800,300 900,150" 
                    stroke="url(#viz-gradient)" strokeWidth="2" fill="none" />
              <circle cx="200" cy="250" r="15" fill="#6366f1" fillOpacity="0.3" />
              <circle cx="400" cy="200" r="25" fill="#8b5cf6" fillOpacity="0.3" />
              <circle cx="600" cy="250" r="20" fill="#6366f1" fillOpacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-50/60 to-transparent -z-10"></div>
    </section>
  );
};

export default HeroSection;
