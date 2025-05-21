
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden bg-abstract-pattern">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl -z-10"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative">
              Smarter Product Discovery for Growing E-Commerce Brands
              <svg className="absolute -bottom-2 left-0 w-full hidden md:block" height="10" viewBox="0 0 400 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5C65.3333 2.66667 204.6 -0.7 398 8.5" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto animate-fade-in delay-100">We combine technology and human expertise to optimize site search, navigation, content, and product data—helping brands with large catalogs deliver better shopping experiences and drive real results.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100 text-white text-lg px-8 py-6">
              <Link to="/contact">
                Book a Consultation <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild size="lg" variant="outline" className="text-lg px-6 py-6 border-indigo-300 hover:bg-indigo-50 active:bg-indigo-100">
                <a href="https://wa.me/919877100369" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0v-4Z" />
                    <path d="M14 10a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0v-4Z" />
                  </svg> WhatsApp Us
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-6 py-6 border-indigo-300 hover:bg-indigo-50 active:bg-indigo-100">
                <a href="tel:+919877100369">
                  <Phone className="mr-2" size={18} /> Call Us
                </a>
              </Button>
            </div>
          </div>
          
          {/* Abstract visualization instead of device mockup */}
          <div className="relative h-80 mt-16 hidden md:block">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full">
              <div className="mx-auto rounded-lg shadow-2xl border border-gray-100 w-4/5 h-64 bg-white overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-blue-50 to-white relative">
                  {/* Abstract data visualization elements */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
                    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70">
                      <path fill="none" stroke="#6366f1" strokeWidth="1.5" d="M0,50 C20,30 40,70 60,50 C80,30 100,70 120,50 C140,30 160,70 180,50 C200,30 220,70 240,50" />
                      <path fill="none" stroke="#818cf8" strokeWidth="1" d="M0,60 C20,40 40,80 60,60 C80,40 100,80 120,60 C140,40 160,80 180,60 C200,40 220,80 240,60" />
                      <path fill="none" stroke="#a5b4fc" strokeWidth="0.5" d="M0,70 C20,50 40,90 60,70 C80,50 100,90 120,70 C140,50 160,90 180,70 C200,50 220,90 240,70" />
                    </svg>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-3 p-4 opacity-70">
                      {Array.from({length: 9}).map((_, i) => (
                        <div key={i} className="bg-gradient-to-br from-indigo-100 to-blue-50 rounded h-8 w-full"></div>
                      ))}
                    </div>
                  </div>
                  {/* Circular elements */}
                  <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-200 to-purple-100 opacity-40"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-indigo-100 opacity-40"></div>
                </div>
              </div>
            </div>
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
