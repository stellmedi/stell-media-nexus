import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Target, ShoppingCart, Building2, TrendingUp, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { useServices } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback services for when database is empty
const fallbackServices = [
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

const ServicesSection = () => {
  const { getSection, isLoading: contentLoading } = usePageContent('/');
  const { data: dbServices, isLoading: servicesLoading } = useServices();

  const servicesSection = getSection('services');
  const sectionTitle = servicesSection?.title || "Our Digital Growth Services";
  const sectionDescription = servicesSection?.content || "Comprehensive digital marketing solutions designed to accelerate growth for real estate developers and e-commerce businesses";

  // Use database services or fallback
  const services = dbServices && dbServices.length > 0 
    ? dbServices.map(s => ({
        icon: s.icon,
        title: s.title,
        description: s.description,
        link: s.link || '#',
        gradient: s.gradient,
        borderColor: s.borderColor
      }))
    : fallbackServices;

  const isLoading = contentLoading || servicesLoading;

  return (
    <section className="py-12 md:py-16 bg-secondary/30" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {isLoading ? (
              <Skeleton className="h-10 w-1/2 mx-auto" />
            ) : (
              sectionTitle
            )}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            {isLoading ? (
              <Skeleton className="h-6 w-3/4 mx-auto" />
            ) : (
              sectionDescription
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            Array(6).fill(0).map((_, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="text-center pb-4">
                  <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                </CardHeader>
                <CardContent className="text-center">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mx-auto mb-6" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            services.map((service, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 border-2 ${service.borderColor} bg-card/80 backdrop-blur-sm hover:bg-card h-full flex flex-col`}>
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg md:text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-grow flex flex-col justify-between">
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </CardDescription>
                  <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 w-full min-h-[44px]">
                    <Link to={service.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
