
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const EnhancedTestimonials = () => {
  const testimonials = [
    // Real Estate (India) Examples
    {
      name: "Rajesh Sharma",
      title: "Managing Director",
      company: "Prestige Group",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format&q=85",
      rating: 5,
      text: "Stell Media transformed our lead generation process for luxury residential projects in Bangalore. Our qualified leads increased by 180% and conversion rates improved dramatically. Their CRM automation saved our sales team countless hours.",
      results: "180% increase in qualified leads"
    },
    {
      name: "Priya Mehta",
      title: "Head of Sales",
      company: "Godrej Properties",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=80&h=80&fit=crop&crop=face&auto=format&q=85",
      rating: 5,
      text: "The automated lead nurturing system helped us stay connected with prospects throughout their property buying journey. Our sales cycle reduced by 40% and customer satisfaction scores improved significantly.",
      results: "40% reduction in sales cycle"
    },
    {
      name: "Amit Agarwal",
      title: "Vice President Marketing",
      company: "DLF Limited",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format&q=85",
      rating: 5,
      text: "Our digital marketing campaigns for premium residential projects in Gurgaon achieved exceptional results. Lead quality improved by 220% and our cost per acquisition dropped by 35% within 6 months.",
      results: "220% improvement in lead quality"
    },
    // E-commerce (Global) Examples
    {
      name: "Sarah Chen",
      title: "VP of E-commerce",
      company: "TechVantage Solutions",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format&q=85",
      rating: 5,
      text: "Stell Media's product discovery optimization transformed our customer experience. Search conversion rates improved by 65% and zero-result searches dropped to less than 2%. Outstanding technical expertise.",
      results: "65% increase in search conversions"
    },
    {
      name: "Michael Rodriguez",
      title: "Director of Digital Strategy",
      company: "GlobalMart Industries",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format&q=85",
      rating: 5,
      text: "The catalog SEO and performance marketing strategies delivered exceptional ROI. Our organic traffic grew 3x in 8 months and revenue per visitor increased by 45%. Highly recommend their expertise.",
      results: "3x organic traffic growth"
    },
    {
      name: "Emily Thompson",
      title: "Head of Product",
      company: "StyleForward",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face&auto=format&q=85",
      rating: 5,
      text: "Product discovery management and search optimization helped our customers find products 70% faster. Conversion rates improved across all categories and customer satisfaction scores reached all-time highs.",
      results: "70% faster product discovery"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Trusted by Leading Brands Globally
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real results from real estate developers in India and e-commerce brands worldwide. See how we've helped businesses achieve exceptional growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <div className="text-sm font-semibold text-green-800">
                    Result: {testimonial.results}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} profile`}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.title}</div>
                    <div className="text-sm text-indigo-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-6 text-sm text-gray-600 bg-white px-6 py-3 rounded-full shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>4.9/5 average rating</span>
            </div>
            <span>•</span>
            <span>500+ successful projects</span>
            <span>•</span>
            <span>99% client retention</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
