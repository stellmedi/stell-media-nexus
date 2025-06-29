import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const EnhancedTestimonials = () => {
  const testimonials = [
    // Real Estate (India) Examples
    {
      name: "Mukul Bansal",
      title: "Managing Director",
      company: "Motiaz Group",
      rating: 5,
      text: "Stell Media's comprehensive digital transformation has delivered exceptional quality leads and dramatically increased our site visits. Their successful performance marketing campaigns and CRM automation have significantly enhanced our lead conversion rates and streamlined our operations across all our residential, commercial and industrial projects.",
      results: "Exceptional quality leads & increased site visits"
    },
    {
      name: "Aman Khatri",
      title: "Head of Marketing",
      company: "Ex-DLF & Central Park",
      rating: 5,
      text: "The end-to-end digital solutions provided by Stell Media transformed our marketing approach. From automated lead nurturing to comprehensive CRM integration, their expertise has been instrumental in modernizing our real estate operations.",
      results: "Complete marketing transformation & modernization"
    },
    {
      name: "Adarsh",
      title: "CEO",
      company: "Testbee (Cologne, Germany)",
      rating: 5,
      text: "Their digital transformation services for customer acquisition and lead generation have been truly impactful. The team's expertise has significantly contributed to our growth and marketing efficiency.",
      results: "Significant growth & marketing efficiency"
    },
    // E-commerce (Global) Examples
    {
      name: "Julie Tolbert",
      title: "Founder",
      company: "Antell Coaching, US",
      rating: 5,
      text: "Stell Media's comprehensive digital optimization transformed our online presence completely. Their SEO strategies and performance marketing have significantly improved our customer journey and conversion rates.",
      results: "Improved customer journey & conversion optimization"
    },
    {
      name: "Akanksha",
      title: "Head of E-commerce",
      company: "Detox People Ltd, UK",
      rating: 5,
      text: "The catalog SEO and data enrichment services provided by Stell Media revolutionized our product visibility. Their comprehensive approach to e-commerce optimization has driven substantial growth in our organic traffic and sales performance.",
      results: "Substantial growth in organic traffic & sales"
    },
    {
      name: "Manu",
      title: "Managing Partner",
      company: "Ruhee - On Demand Salon Services, UAE",
      rating: 5,
      text: "Stell Media's end-to-end digital solutions have been game-changing for our on-demand service platform. Their performance marketing and conversion optimization strategies have significantly enhanced our customer acquisition and retention.",
      results: "Enhanced customer acquisition & retention"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Trusted by Industry Leaders Globally
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real results from established real estate developers and e-commerce brands worldwide. See how we've helped businesses achieve exceptional digital transformation.
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
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.title}</div>
                  <div className="text-sm text-indigo-600 font-medium">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 text-sm text-gray-600 bg-white px-8 py-4 rounded-full shadow-sm flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Excellent client satisfaction</span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium">Comprehensive digital transformation</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium">Proven industry expertise</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
