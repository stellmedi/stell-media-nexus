
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";

const HeroSection = () => {
  const { getSection, isLoading, error } = usePageContent('/');
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🦸 HeroSection: Component mounted');
    }
  }, []);
  
  const handleWhatsAppClick = () => {
    const phoneNumber = "919877100369";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get hero content from database
  const heroSection = getSection('hero');
  
  // Fallback content if database content is not available
  const heroTitle = heroSection?.content || "Digital Growth for Real Estate Developers and eCommerce Brands";
  const heroSubtitle = heroSection?.title || "Helping real estate developers close faster and e-commerce brands sell smarter with powerful automation, product discovery, and digital performance strategies.";

  return (
    <section className="relative min-h-[70vh] md:min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">          
          {/* Main headline */}
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2">
            {isLoading ? (
              <span className="animate-pulse bg-gray-200 rounded h-8 w-3/4 mx-auto block"></span>
            ) : (
              <>
                {heroTitle.split('Real Estate Developers and eCommerce Brands')[0]}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Real Estate Developers and eCommerce Brands
                </span>
              </>
            )}
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto px-2">
            {isLoading ? (
              <span className="animate-pulse bg-gray-200 rounded h-6 w-full block"></span>
            ) : (
              heroSubtitle
            )}
          </p>
          
          {/* Value propositions */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-10 px-2">
            <div className="flex items-center gap-2 text-gray-700 justify-center sm:justify-start">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base">18+ Years of Digital Leadership</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 justify-center sm:justify-start">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base">Growth Backed by Data & Automation</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 justify-center sm:justify-start">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base">Niche Experts in Real Estate & eCommerce</span>
            </div>
          </div>
          
          {/* Enhanced Services Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            <Link to="/real-estate" className="group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 md:p-6 rounded-xl text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h3 className="text-lg md:text-xl font-bold mb-2">Real Estate Solutions</h3>
                <p className="text-blue-100 text-sm md:text-base">CRM automation, lead generation & virtual tours</p>
                <div className="mt-4 flex items-center text-blue-200 group-hover:text-white">
                  <span className="text-sm">Explore Services</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link to="/ecommerce" className="group">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-4 md:p-6 rounded-xl text-white hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h3 className="text-lg md:text-xl font-bold mb-2">eCommerce Solutions</h3>
                <p className="text-purple-100 text-sm md:text-base">Product discovery, catalog SEO & performance marketing</p>
                <div className="mt-4 flex items-center text-purple-200 group-hover:text-white">
                  <span className="text-sm">Explore Services</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-2">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto">
              <Link to="/consultation">
                Talk to Us
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
            <Button 
              onClick={handleWhatsAppClick}
              variant="outline" 
              size="lg" 
              className="border-2 border-green-500 hover:border-green-600 text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg transition-all duration-300 w-full sm:w-auto"
            >
              <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements - hidden on mobile for better performance */}
      <div className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
      <div className="hidden md:block absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse" />
      <div className="hidden md:block absolute top-1/2 left-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" />
    </section>
  );
};

export default HeroSection;
