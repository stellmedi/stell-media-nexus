
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SEOHeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden" aria-label="E-commerce SEO Services">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Strategic E-commerce SEO Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Drive sustainable growth with our data-driven, technology-enhanced SEO strategies tailored specifically for e-commerce sites with large product catalogs.
            </p>
            <div className="space-y-6">
              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8">
                <li>Structured data implementation for product-rich results</li>
                <li>AI-friendly content optimization for modern search</li>
                <li>Technical SEO focused on crawlability and indexation</li>
              </ul>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100">
                <Link to="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="rounded-lg shadow-xl w-full h-96 overflow-hidden bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
                {/* Abstract SEO visualization */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {/* Search ranking visualization */}
                  <div className="w-full h-full relative">
                    {/* Abstract search visualization */}
                    <div className="absolute top-1/4 left-0 w-full">
                      <div className="h-2 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full w-3/4 mb-4"></div>
                      <div className="h-2 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full w-2/3 mb-4"></div>
                      <div className="h-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full w-1/2 mb-4"></div>
                      
                      {/* Keywords/tags visualization */}
                      <div className="flex flex-wrap mt-8 gap-2">
                        {["SEO", "Analytics", "Keywords", "Traffic", "Ranking"].map((tag, i) => (
                          <div key={i} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-xs text-indigo-600 font-medium">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Abstract chart */}
                    <svg className="absolute bottom-8 left-0" width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none">
                      <path d="M0,80 C30,70 60,90 90,70 C120,50 150,70 180,50 C210,30 240,50 270,30 C285,20 300,10 300,10 L300,120 L0,120 Z" 
                        fill="url(#blue-gradient)" opacity="0.3" />
                      <defs>
                        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Growth indicator */}
                    <div className="absolute top-4 right-4 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                          <path d="M23 6l-9.5 9.5-5-5L1 18" />
                          <path d="M17 6h6v6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOHeroSection;
