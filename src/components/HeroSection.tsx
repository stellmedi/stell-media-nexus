import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const { getSection, isLoading, error } = usePageContent('/');
  const [h1Tag, setH1Tag] = useState<string | null>(null);
  
  // Fetch H1 tag from page_content table
  useEffect(() => {
    const fetchH1Tag = async () => {
      try {
        const { data, error } = await supabase
          .from('page_content')
          .select('h1_tag')
          .eq('page_path', '/')
          .single();
        
        if (data && !error) {
          setH1Tag((data as any).h1_tag);
        }
      } catch (err) {
        console.error('Error fetching H1 tag:', err);
      }
    };
    
    fetchH1Tag();
  }, []);
  
  const handleWhatsAppClick = () => {
    const phoneNumber = "919877100369";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get hero content from database
  const heroSection = getSection('hero');
  
  // Use H1 from page_content table, fallback to section content, then hardcoded
  const heroTitle = h1Tag || heroSection?.content || "Digital Growth for Real Estate Developers and eCommerce Brands";
  const heroSubtitle = heroSection?.title || "Helping real estate developers close faster and e-commerce brands sell smarter with powerful automation, product discovery, and digital performance strategies.";

  return (
    <section className="mobile-hero-spacing relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10 flex items-center justify-center min-h-screen"
           style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
        <div className="max-w-4xl mx-auto text-center">          
          {/* Main headline - H1 tag */}
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2">
            {isLoading ? (
              <span className="animate-pulse bg-gray-200 rounded h-8 w-3/4 mx-auto block"></span>
            ) : (
              <>
                {heroTitle.includes('Real Estate Developers and eCommerce Brands') ? (
                  <>
                    {heroTitle.split('Real Estate Developers and eCommerce Brands')[0]}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Real Estate Developers and eCommerce Brands
                    </span>
                  </>
                ) : (
                  heroTitle
                )}
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
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 md:gap-6 mb-8 md:mb-10 px-2">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base whitespace-nowrap">18+ Years of Digital Leadership</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base whitespace-nowrap">Growth Backed by Data & Automation</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base whitespace-nowrap">Niche Experts in Real Estate & eCommerce</span>
            </div>
          </div>
          
          {/* Enhanced Services Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            <Link to="/real-estate" className="group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 md:p-6 rounded-xl text-white hover:shadow-xl transition-all duration-300 hover:scale-105 h-full min-h-[160px] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Real Estate Solutions</h3>
                  <p className="text-blue-100 text-sm md:text-base leading-relaxed">CRM automation, lead generation & virtual tours for property developers</p>
                </div>
                <div className="mt-4 flex items-center text-blue-200 group-hover:text-white">
                  <span className="text-sm">Explore Services</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link to="/ecommerce" className="group">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-4 md:p-6 rounded-xl text-white hover:shadow-xl transition-all duration-300 hover:scale-105 h-full min-h-[160px] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">eCommerce Solutions</h3>
                  <p className="text-purple-100 text-sm md:text-base leading-relaxed">Product discovery, catalog SEO & performance marketing for online stores</p>
                </div>
                <div className="mt-4 flex items-center text-purple-200 group-hover:text-white">
                  <span className="text-sm">Explore Services</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-2">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto min-h-[44px]">
              <Link to="/consultation">
                Talk to Us
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
            <Button 
              onClick={handleWhatsAppClick}
              variant="outline" 
              size="lg" 
              className="border-2 border-green-500 hover:border-green-600 text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg transition-all duration-300 w-full sm:w-auto min-h-[44px]"
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
