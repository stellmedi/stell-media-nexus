
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SEOCTASection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>
            <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full border border-white opacity-20"></div>
            <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full border border-white opacity-20"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to improve your organic visibility?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
              Let's talk about how our SEO services can help grow your e-commerce business through improved search rankings and organic traffic.
            </p>
            <Button asChild size="lg" variant="white" className="shadow-lg text-indigo-700 hover:bg-gray-100">
              <Link to="/contact">
                Schedule a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOCTASection;
