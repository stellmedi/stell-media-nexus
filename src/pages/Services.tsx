import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { useAllServices } from "@/hooks/useAllServices";
import { Skeleton } from "@/components/ui/skeleton";
import DynamicIcon from "@/components/ui/DynamicIcon";

const Services = () => {
  const { content, isLoading: pageLoading, getSection } = usePageContent('/services');
  const { data: dbServices, isLoading: servicesLoading } = useAllServices();

  const heroSection = getSection('hero');
  const ctaSection = getSection('cta');

  const heroMeta = heroSection?.metadata as Record<string, any> || {};
  const ctaMeta = ctaSection?.metadata as Record<string, any> || {};

  // Fallback services data
  const fallbackServices = [
    {
      id: "1",
      icon_name: "Search",
      title: "Smarter Product Discovery Solutions",
      description: "Optimize search performance with advanced algorithms and strategic enhancements.",
      features: ["Strategic search relevance optimization", "Smart behavioral insights integration", "Intelligent navigation restructuring"],
      link: "/services/product-discovery"
    },
    {
      id: "2",
      icon_name: "Database",
      title: "Automated Data Enrichment",
      description: "Transform messy product data into clean, structured information.",
      features: ["Automated data cleansing strategies", "Smart attribute mapping optimization", "Product tagging automation"],
      link: "/services/data-enrichment"
    },
    {
      id: "3",
      icon_name: "Globe",
      title: "Strategic SEO Services",
      description: "Improve organic visibility with data-driven SEO optimization strategies.",
      features: ["Comprehensive technical SEO optimization", "Automated product page optimization", "Strategic category structure optimization"],
      link: "/services/seo"
    },
    {
      id: "4",
      icon_name: "BarChart",
      title: "SEM Services",
      description: "Drive measurable traffic and conversions through optimized search marketing campaigns.",
      features: ["AI-powered Google Shopping optimization", "Performance-based campaign optimization", "Dynamic product feed optimization"],
      link: "/services/sem"
    },
    {
      id: "5",
      icon_name: "Layout",
      title: "Conversion Optimization",
      description: "Transform more website visitors into customers with data-driven optimization.",
      features: ["Product page optimization", "Checkout flow optimization", "Mobile experience optimization"],
      link: "/services/conversion-optimization"
    }
  ];

  // Use database services if available, otherwise fallback
  const services = dbServices?.length > 0 
    ? dbServices.map(s => ({
        id: s.id,
        icon_name: s.icon_name || "Zap",
        title: s.title,
        description: s.description,
        features: [],
        link: s.link || `/services/${s.slug}`
      }))
    : fallbackServices;

  const isLoading = pageLoading || servicesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-indigo-50">
        <Navbar />
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-1/2 mx-auto mb-6" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>{content?.meta_title || "E-commerce Optimization Services | Stell Media"}</title>
        <meta name="description" content={content?.meta_description || "Transform your e-commerce experience with Stell Media's specialized optimization services."} />
        <link rel="canonical" href="https://stellmedia.com/services" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="mobile-hero-spacing pb-12 bg-gradient-to-r from-blue-50 to-indigo-50 relative min-h-screen">
          <div className="container mx-auto px-4 min-h-screen flex items-center justify-center"
               style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
            <div className="max-w-3xl mx-auto text-center w-full">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {heroSection?.title || "Our Services"}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {heroSection?.content || "Explore our comprehensive range of technology-powered optimization services designed to enhance your e-commerce experience."}
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <DynamicIcon 
                        name={service.icon_name} 
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{service.description}</CardDescription>
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-xs">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Button asChild variant="link" className="p-0 text-indigo-600">
                      <Link to={service.link}>
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div 
              className="rounded-2xl p-8 md:p-12 text-white text-center shadow-xl"
              style={{
                background: ctaMeta.gradient_from && ctaMeta.gradient_to 
                  ? `linear-gradient(to right, ${ctaMeta.gradient_from}, ${ctaMeta.gradient_to})`
                  : 'linear-gradient(to right, #1d4ed8, #7c3aed, #9333ea)'
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {ctaSection?.title || "Ready to optimize your e-commerce experience?"}
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
                {ctaSection?.content || "Let's talk about how our technology-powered optimization strategies can help enhance your product discovery and boost conversions."}
              </p>
              <Button asChild size="lg" variant="secondary" className="font-bold shadow-xl">
                <Link to={ctaMeta.cta_link || "/contact"}>
                  {ctaMeta.cta_text || "Book Your Free Consultation"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
