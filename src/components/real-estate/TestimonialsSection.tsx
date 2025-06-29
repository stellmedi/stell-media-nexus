
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Mukul Bansal",
      role: "Managing Director",
      company: "Motiaz Group",
      quote: "Stell Media's comprehensive approach to real estate marketing has transformed how we showcase our projects. The virtual tours and CRM automation have significantly improved our lead conversion rates."
    },
    {
      name: "Aman Khatri", 
      role: "Head of Marketing",
      company: "Ex-DLF & Central Park",
      quote: "The 3D visualizations and marketing automation solutions provided by Stell Media have been game-changing for our real estate operations. Highly professional service."
    },
    {
      name: "Pradeep Sandal",
      role: "Managing Partner", 
      company: "AHP Group",
      quote: "Working with Stell Media has elevated our digital presence significantly. Their expertise in real estate technology solutions is unmatched."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            What Our Partners Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by leading businesses across real estate and e-commerce industries worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg italic leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-blue-600 font-semibold">{testimonial.role}</div>
                  <div className="text-gray-600">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
