
import React from "react";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import { Link } from "react-router-dom";

const RealEstateHero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Building className="w-4 h-4 mr-2" />
            Real Estate Digital Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Transform Your Real Estate Business
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
            Comprehensive digital solutions designed specifically for real estate developers, 
            agents, and property businesses. From virtual tours to automated lead management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild size="xl" className="bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 shadow-lg px-10 py-6 text-lg">
              <Link to="/consultation">Start Your Transformation</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstateHero;
