
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ShoppingCart, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: <Home className="h-10 w-10 text-blue-500" />,
    title: "Real Estate Lead Generation",
    description: "Comprehensive lead generation systems with automated nurturing, CRM integration, and conversion optimization specifically for real estate developers.",
    features: [
      "Automated lead capture systems", 
      "CRM integration & management", 
      "Marketing automation workflows", 
      "Lead scoring & qualification"
    ],
    link: "/real-estate",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: <Users className="h-10 w-10 text-blue-500" />,
    title: "Real Estate CRM & Automation",
    description: "Custom CRM solutions and marketing automation designed to streamline real estate sales processes and improve conversion rates.",
    features: [
      "Custom CRM configuration", 
      "Sales pipeline automation", 
      "Follow-up sequence optimization", 
      "Performance analytics & reporting"
    ],
    link: "/real-estate",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-purple-500" />,
    title: "E-Commerce Product Discovery",
    description: "Advanced product discovery optimization, search enhancement, and navigation improvements to help customers find products faster.",
    features: [
      "Search algorithm optimization", 
      "Product filtering & navigation", 
      "Recommendation engines", 
      "User experience optimization"
    ],
    link: "/ecommerce",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    icon: <BarChart className="h-10 w-10 text-purple-500" />,
    title: "E-Commerce Performance Marketing",
    description: "Data-driven performance marketing campaigns, catalog SEO, and conversion optimization to maximize ROI and drive sustainable growth.",
    features: [
      "Performance marketing campaigns", 
      "Catalog SEO optimization", 
      "Conversion rate optimization", 
      "Analytics & attribution modeling"
    ],
    link: "/ecommerce",
    gradient: "from-purple-500 to-indigo-600"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Specialized Solutions for Two Growing Industries
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We've built deep expertise in real estate and e-commerce, delivering tailored digital growth solutions that drive measurable results for each industry's unique challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link to={service.link} key={index} className="group">
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full bg-white hover:border-indigo-200">
                <CardHeader className="pb-4">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Two CTA Buttons for Each Vertical */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600 hover:opacity-90 active:opacity-100 shadow-lg">
            <Link to="/real-estate">Real Estate Solutions</Link>
          </Button>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-700 to-indigo-600 hover:opacity-90 active:opacity-100 shadow-lg">
            <Link to="/ecommerce">E-Commerce Solutions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
