
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Globe, BarChart } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "Increased Property Interest",
      description: "Virtual tours and professional photography significantly boost property inquiry rates and viewing requests."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Faster Lead Response",
      description: "Automated CRM systems ensure immediate lead follow-up and improved conversion rates."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Wider Market Reach", 
      description: "Digital marketing campaigns expand your reach to qualified prospects across multiple channels."
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      title: "Data-Driven Insights",
      description: "Advanced analytics provide actionable insights to optimize your sales and marketing strategies."
    }
  ];

  return (
    <section className="py-24 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Why Choose Our Digital Solutions?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proven results that drive growth for businesses of all sizes across multiple industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
