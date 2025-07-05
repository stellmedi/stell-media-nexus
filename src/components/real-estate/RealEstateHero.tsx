import React from "react";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import { Link } from "react-router-dom";

const RealEstateHero = () => {
  return (
    <section className="mobile-hero-spacing pb-12 md:pb-20 px-4 relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-6xl min-h-screen flex items-center justify-center"
           style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
        <div className="text-center mb-12 md:mb-16 w-full">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold mb-4 md:mb-6 shadow-sm">
            <Building className="w-4 h-4 mr-2" />
            Real Estate Digital Solutions
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent px-2">
            Transform Your Real Estate Business
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-4xl mx-auto px-2">
            Comprehensive digital solutions designed specifically for real estate developers, 
            agents, and property businesses. From virtual tours to automated lead management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-2">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 shadow-lg px-8 md:px-10 py-4 md:py-6 text-base md:text-lg w-full sm:w-auto min-h-[44px]">
              <Link to="/consultation">Start Your Transformation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 md:px-10 py-4 md:py-6 text-base md:text-lg w-full sm:w-auto min-h-[44px]">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstateHero;