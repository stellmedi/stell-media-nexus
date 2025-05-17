
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const clients = [
  { name: "Tech Retailer", industry: "Electronics" },
  { name: "Fashion Market", industry: "Apparel" },
  { name: "Home Goods", industry: "Home & Garden" },
  { name: "Outdoor Supply", industry: "Sports & Recreation" },
  { name: "Beauty Brand", industry: "Cosmetics" },
  { name: "Auto Parts", industry: "Automotive" },
];

const testimonials = [
  {
    quote: "Stell Media completely transformed our product discovery experience. Our conversion rate increased by 34% within the first month.",
    author: "Marketing Director",
    company: "Fashion E-commerce"
  },
  {
    quote: "The search optimization was a game changer. Customers are finding what they need faster, and our average order value has increased significantly.",
    author: "E-commerce Manager",
    company: "Electronics Retailer"
  },
  {
    quote: "The team at Stell Media fixed our complex product data issues that we'd been struggling with for years. Professional, efficient, and results-driven.",
    author: "CEO",
    company: "Home Goods Store"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Leading Brands</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've helped e-commerce companies across various industries improve their product discovery and boost conversions.
          </p>
        </div>

        {/* Client Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {clients.map((client, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">{client.name.charAt(0)}</span>
              </div>
              <p className="font-medium text-gray-700">{client.name}</p>
              <p className="text-sm text-gray-500">{client.industry}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <div className="text-stell-500 mb-4 text-3xl">"</div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-gray-500">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
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
