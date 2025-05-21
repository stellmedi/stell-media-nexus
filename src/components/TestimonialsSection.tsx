
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Abstract client logos/representations
const clients = [
  { name: "Tech Retailer", industry: "Electronics", gradient: "from-blue-400 to-indigo-500" },
  { name: "Fashion Market", industry: "Apparel", gradient: "from-indigo-400 to-purple-500" },
  { name: "Home Goods", industry: "Home & Garden", gradient: "from-purple-400 to-pink-500" },
  { name: "Outdoor Supply", industry: "Sports & Recreation", gradient: "from-blue-400 to-teal-500" },
  { name: "Beauty Brand", industry: "Cosmetics", gradient: "from-pink-400 to-purple-500" },
  { name: "Auto Parts", industry: "Automotive", gradient: "from-blue-400 to-cyan-500" },
];

const testimonials = [
  {
    quote: "Stell Media completely transformed our product discovery experience. Our conversion rate increased by 34% within the first month of implementation.",
    author: "Sarah Johnson",
    title: "Marketing Director",
    company: "Fashion E-commerce"
  },
  {
    quote: "The search optimization was a game changer. Customers are finding what they need faster, and our average order value has increased by 27% since working with Stell Media.",
    author: "Michael Chen",
    title: "E-commerce Manager",
    company: "Electronics Retailer"
  },
  {
    quote: "The team at Stell Media fixed our complex product data issues that we'd been struggling with for years. Professional, efficient, and results-driven approach to every challenge.",
    author: "Jennifer Williams",
    title: "CEO",
    company: "Home Goods Store"
  },
  {
    quote: "Implementing Stell Media's AI-driven product discovery solution has reduced our customer support tickets by 40% as shoppers can now easily find what they're looking for.",
    author: "David Rodriguez",
    title: "CTO",
    company: "Outdoor Equipment"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Trusted by Leading Brands</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've helped e-commerce companies across various industries improve their product discovery and boost conversions.
          </p>
        </div>

        {/* Client Abstract Logos/Representations */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {clients.map((client, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4 hover:opacity-80 transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-r ${client.gradient} rounded-full mb-3 flex items-center justify-center text-white relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/3 left-0 w-full h-px bg-white/30"></div>
                  <div className="absolute top-2/3 left-0 w-full h-px bg-white/20"></div>
                  <div className="absolute top-0 left-1/3 h-full w-px bg-white/30"></div>
                  <div className="absolute top-0 left-2/3 h-full w-px bg-white/20"></div>
                </div>
                <span className="relative z-10 text-2xl font-bold">{client.name.charAt(0)}</span>
              </div>
              <p className="font-medium text-gray-700">{client.name}</p>
              <p className="text-sm text-gray-500">{client.industry}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Auto-Scrolling Carousel */}
        <div className="relative px-12 max-w-5xl mx-auto mb-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
            autoplay={true}
            autoplayTimeout={5000}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 transition-all duration-500">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full hover:shadow-lg transition-all duration-300">
                    <div className="text-indigo-500 mb-4 text-4xl font-serif">"</div>
                    <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white mr-3 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-1/2 left-0 w-full h-px bg-white/30"></div>
                          <div className="absolute top-0 left-1/2 h-full w-px bg-white/30"></div>
                        </div>
                        <span className="font-bold relative z-10">{testimonial.author.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.title}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white" />
            <CarouselNext className="right-0 bg-white" />
          </Carousel>
        </div>

        {/* CTA for Case Studies */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">See how we've helped clients achieve real results</p>
          <Button asChild variant="outline" className="border-indigo-300 hover:bg-indigo-100 active:bg-indigo-200">
            <Link to="/case-studies">
              View Our Case Studies <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
