
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Search, ShoppingCart, Building2, BarChart3, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";

const ServicesSection = () => {
  const { getSection, isLoading } = usePageContent('/');

  // Get services content from database
  const servicesSection = getSection('services');
  
  // Fallback content - Using correct field mapping
  const sectionTitle = servicesSection?.title || "Our Digital Growth Services";
  const sectionDescription = servicesSection?.content || "Comprehensive digital marketing solutions designed to accelerate growth for real estate developers and e-commerce businesses";

  console.log('ServicesSection: servicesSection data:', servicesSection);
  console.log('ServicesSection: Using title:', sectionTitle);
  console.log('ServicesSection: Using description:', sectionDescription);

  const services = [
    {
      icon: Search,
      title: "SEO & Content Strategy",
      description: "Drive organic traffic with strategic SEO and compelling content that converts visitors into customers.",
      link: "/services/seo",
      gradient: "from-blue-500 to-blue-600",
      borderColor: "border-blue-200 hover:border-blue-400"
    },
    {
      icon: Target,
      title: "Performance Marketing",
      description: "Data-driven SEM campaigns that maximize ROI and drive qualified leads to your business.",
      link: "/services/sem",
      gradient: "from-purple-500 to-purple-600",
      borderColor: "border-purple-200 hover:border-purple-400"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Optimization",
      description: "Boost online sales with product discovery optimization and conversion rate improvements.",
      link: "/ecommerce",
      gradient: "from-green-500 to-green-600",
      borderColor: "border-green-200 hover:border-green-400"
    },
    {
      icon: Building2,
      title: "Real Estate Lead Gen",
      description: "Automated lead generation and CRM solutions specifically designed for real estate developers.",
      link: "/real-estate",
      gradient: "from-orange-500 to-orange-600",
      borderColor: "border-orange-200 hover:border-orange-400"
    },
    {
      icon: TrendingUp,
      title: "Conversion Optimization",
      description: "Increase your conversion rates with A/B testing, UX improvements, and data-driven optimizations.",
      link: "/services/conversion-optimization",
      gradient: "from-indigo-500 to-indigo-600",
      borderColor: "border-indigo-200 hover:border-indigo-400"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive analytics and reporting to track performance and make data-driven decisions.",
      link: "/services/data-enrichment",
      gradient: "from-teal-500 to-teal-600",
      borderColor: "border-teal-200 hover:border-teal-400"
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {isLoading ? (
              <span className="animate-pulse bg-gray-200 rounded h-8 w-1/2 mx-auto block"></span>
            ) : (
              sectionTitle
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isLoading ? (
              <span className="animate-pulse bg-gray-200 rounded h-6 w-3/4 mx-auto block"></span>
            ) : (
              sectionDescription
            )}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`group hover:shadow-xl transition-all duration-300 border-2 ${service.borderColor} bg-white/80 backdrop-blur-sm hover:bg-white`}>
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </CardDescription>
                <Button asChild variant="outline" className="group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                  <Link to={service.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
