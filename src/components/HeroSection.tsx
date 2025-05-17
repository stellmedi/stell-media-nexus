
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Phone, WhatsApp } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
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
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <WhatsApp className="mr-2" size={18} /> WhatsApp Us
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-6 py-6 border-indigo-300 hover:bg-indigo-50 active:bg-indigo-100">
                <a href="tel:1234567890">
                  <Phone className="mr-2" size={18} /> Call Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Abstract background elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-50/80 to-transparent -z-10"></div>
    </section>;
};

export default HeroSection;
