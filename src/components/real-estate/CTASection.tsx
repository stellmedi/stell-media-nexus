
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-8">Start Your Transformation</h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
          Ready to revolutionize your business with cutting-edge digital solutions? 
          Let's discuss how we can accelerate your growth across real estate and e-commerce.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/consultation">
            <Button size="xl" className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-10 py-6 text-lg shadow-lg">
              Get Started Today
            </Button>
          </Link>
          <Link to="/contact">
            <Button 
              size="xl" 
              variant="outline" 
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-indigo-600 font-semibold px-10 py-6 text-lg"
            >
              Schedule Consultation <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
