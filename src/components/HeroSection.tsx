
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden bg-abstract-pattern" aria-labelledby="hero-heading">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl -z-10"></div>
      
      {/* Enhanced background patterns */}
      <div className="pattern-overlay"></div>
      <div className="hexagon-overlay"></div>
      <div className="wave-overlay"></div>
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] -z-10"></div>
      
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
          <div className="flex justify-center animate-fade-in delay-200" role="group">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100 text-white text-lg px-8 py-6">
              <Link to="/contact">
                Learn More <ArrowRight className="ml-2" size={18} aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Abstract data visualization as background element */}
        <div className="absolute inset-0 -z-10 opacity-20" aria-hidden="true">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {/* Abstract data visualization */}
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="viz-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path d="M0,250 C100,150 200,450 300,250 C400,50 500,350 600,200 C700,50 800,300 900,150" 
                    stroke="url(#viz-gradient)" strokeWidth="3" fill="none" />
              <path d="M0,300 C100,200 200,500 300,300 C400,100 500,400 600,250 C700,100 800,350 900,200" 
                    stroke="url(#viz-gradient)" strokeWidth="2" strokeDasharray="5,5" fill="none" />
              <circle cx="200" cy="250" r="20" fill="#6366f1" fillOpacity="0.2" />
              <circle cx="400" cy="200" r="40" fill="#8b5cf6" fillOpacity="0.2" />
              <circle cx="600" cy="250" r="30" fill="#6366f1" fillOpacity="0.2" />
              <circle cx="300" cy="300" r="25" fill="#8b5cf6" fillOpacity="0.2" />
              <circle cx="500" cy="150" r="35" fill="#6366f1" fillOpacity="0.2" />
              <rect x="150" y="350" width="200" height="100" rx="10" fill="#6366f1" fillOpacity="0.1" />
              <rect x="450" y="300" width="200" height="100" rx="10" fill="#8b5cf6" fillOpacity="0.1" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Abstract background elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-50/80 to-transparent -z-10"></div>
    </section>
  );
};

export default HeroSection;
