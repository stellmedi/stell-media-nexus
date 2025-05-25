import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
const EnhancedTestimonials = () => {
  const testimonials = [{
    name: "Sarah Chen",
    title: "VP of E-commerce",
    company: "TechVantage Solutions",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "Stell Media transformed our product discovery experience. Our search conversion rate improved by 42% within 3 months. Their technical expertise in Elasticsearch optimization is unmatched.",
    results: "42% increase in search conversions"
  }, {
    name: "Michael Rodriguez",
    title: "Director of Digital Strategy",
    company: "GlobalMart Industries",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "The search platform migration to Coveo was seamless. Zero downtime, improved performance, and our customers can now find products 60% faster. Exceptional project management.",
    results: "60% faster product discovery"
  }, {
    name: "Emily Thompson",
    title: "Head of Product",
    company: "StyleForward",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "Our Amazon marketplace optimization campaign exceeded all expectations. Organic visibility increased by 62% and our conversion rates improved dramatically. ROI was incredible.",
    results: "62% increase in organic visibility"
  }, {
    name: "David Park",
    title: "E-commerce Manager",
    company: "TechGear Hub",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "The data enrichment project cleaned up our entire product catalog. Search accuracy improved by 75% and our zero-result searches dropped to almost nothing. Outstanding work.",
    results: "75% improvement in search accuracy"
  }, {
    name: "Lisa Wang",
    title: "Marketing Director",
    company: "FashionFirst",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "Performance marketing campaigns delivered 85% ROAS improvement. The team's strategic approach and data-driven insights made all the difference. Highly recommend.",
    results: "85% ROAS improvement"
  }, {
    name: "James Wilson",
    title: "CTO",
    company: "ElectroMart",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "Technical SEO audit revealed critical issues we didn't know existed. After implementation, our organic traffic grew 2.4x in 6 months. The team's expertise is phenomenal.",
    results: "2.4x organic traffic growth"
  }];
  return <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real results from real businesses. See how we've helped e-commerce brands optimize their product discovery and boost conversions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                </div>
                
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <div className="text-sm font-semibold text-green-800">
                    Key Result: {testimonial.results}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <img src={testimonial.image} alt={`${testimonial.name} profile`} className="w-12 h-12 rounded-full mr-4 object-cover" loading="lazy" />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.title}</div>
                    <div className="text-sm text-indigo-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-6 text-sm text-gray-600 bg-white px-6 py-3 rounded-full shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>4.9/5 average rating</span>
            </div>
            <span>•</span>
            <span>100+ successful projects</span>
            <span>•</span>
            <span>99% client retention</span>
          </div>
        </div>
      </div>
    </section>;
};
export default EnhancedTestimonials;