
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="text-gray-900">Elevate Your E-Commerce with</span>{" "}
            <span className="text-stell-600 relative">
              Superior Product Discovery
              <svg
                className="absolute -bottom-2 left-0 w-full hidden md:block"
                height="10"
                viewBox="0 0 400 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5C65.3333 2.66667 204.6 -0.7 398 8.5"
                  stroke="#0EA5E9"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto animate-fade-in delay-100">
            We help e-commerce brands with large catalogs optimize product discovery, 
            fix messy data, and boost conversions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200">
            <Button asChild size="lg" className="bg-stell-600 hover:bg-stell-700 text-lg px-8 py-6">
              <a href="#contact">
                Book a Consultation <ArrowRight className="ml-2" size={18} />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
              <a href="#services">Explore Services</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50/80 to-transparent -z-10"></div>
    </section>
  );
};

export default HeroSection;
