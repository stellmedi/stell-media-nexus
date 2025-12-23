import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import DynamicIcon from "@/components/ui/DynamicIcon";

interface ValueProp {
  id: string;
  title: string;
  icon_name?: string;
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  link: string;
  gradient_from?: string;
  gradient_to?: string;
}

const HeroSection = () => {
  const { content, isLoading, getSection } = usePageContent('/');
  
  const heroSection = getSection('hero');
  const heroMeta = heroSection?.metadata as Record<string, any> || {};

  const handleWhatsAppClick = () => {
    const phoneNumber = "919877100369";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  // Fallback content
  const fallback = {
    title: "Digital Growth for Real Estate Developers and eCommerce Brands",
    subtitle: "Helping real estate developers close faster and e-commerce brands sell smarter with powerful automation, product discovery, and digital performance strategies.",
    valueProps: [
      { id: "1", title: "18+ Years of Digital Leadership", icon_name: "CheckCircle" },
      { id: "2", title: "Growth Backed by Data & Automation", icon_name: "CheckCircle" },
      { id: "3", title: "Niche Experts in Real Estate & eCommerce", icon_name: "CheckCircle" }
    ],
    serviceCards: [
      { 
        id: "1", 
        title: "Real Estate Solutions", 
        description: "CRM automation, lead generation & virtual tours for property developers",
        link: "/real-estate",
        gradient_from: "#2563eb",
        gradient_to: "#4338ca"
      },
      { 
        id: "2", 
        title: "eCommerce Solutions", 
        description: "Product discovery, catalog SEO & performance marketing for online stores",
        link: "/ecommerce",
        gradient_from: "#7c3aed",
        gradient_to: "#4338ca"
      }
    ],
    ctaText: "Talk to Us",
    ctaLink: "/consultation",
    ctaSecondaryText: "WhatsApp Us"
  };

  const heroTitle = heroSection?.title || fallback.title;
  const heroSubtitle = heroSection?.content || fallback.subtitle;
  const valueProps: ValueProp[] = heroMeta.value_props?.length > 0 ? heroMeta.value_props : fallback.valueProps;
  const serviceCards: ServiceCard[] = heroMeta.service_cards?.length > 0 ? heroMeta.service_cards : fallback.serviceCards;

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
            {heroSubtitle}
          </p>
          
          {/* Value propositions */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 md:gap-6 mb-8 md:mb-10 px-2">
            {valueProps.map((prop) => (
              <div key={prop.id} className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                <span className="font-medium text-sm md:text-base whitespace-nowrap">{prop.title}</span>
              </div>
            ))}
          </div>
          
          {/* Enhanced Services Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            {serviceCards.map((card) => (
              <Link key={card.id} to={card.link} className="group">
                <div 
                  className="p-4 md:p-6 rounded-xl text-white hover:shadow-xl transition-all duration-300 hover:scale-105 h-full min-h-[160px] flex flex-col justify-between"
                  style={{
                    background: `linear-gradient(135deg, ${card.gradient_from || '#2563eb'}, ${card.gradient_to || '#4338ca'})`
                  }}
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">{card.description}</p>
                  </div>
                  <div className="mt-4 flex items-center text-white/70 group-hover:text-white">
                    <span className="text-sm">Explore Services</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-2">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto min-h-[44px]">
              <Link to={heroMeta.cta_link || fallback.ctaLink}>
                {heroMeta.cta_text || fallback.ctaText}
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
              {heroMeta.cta_secondary_text || fallback.ctaSecondaryText}
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
