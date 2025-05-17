
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SEOCTASection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to improve your organic visibility?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
            Let's talk about how our SEO services can help grow your e-commerce business through improved search rankings and organic traffic.
          </p>
          <Button asChild size="lg" variant="white" className="shadow-lg text-indigo-700">
            <Link to="/contact">
              Schedule a Consultation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SEOCTASection;
