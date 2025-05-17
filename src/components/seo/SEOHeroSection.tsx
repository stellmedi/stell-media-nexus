
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SEOHeroSection = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50" aria-label="E-commerce SEO Services">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Strategic E-commerce SEO Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Drive sustainable growth with our data-driven, technology-enhanced SEO strategies tailored specifically for e-commerce sites with large product catalogs.
            </p>
            <div className="space-y-4">
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
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
          <div>
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
              alt="E-commerce SEO optimization dashboard showing improved rankings and metrics" 
              className="rounded-lg shadow-lg w-full"
              loading="eager"
              width="800"
              height="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOHeroSection;
