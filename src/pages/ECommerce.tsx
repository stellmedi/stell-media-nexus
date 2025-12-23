import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageContent } from "@/hooks/usePageContent";
import { Skeleton } from "@/components/ui/skeleton";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { Link } from "react-router-dom";
import { Search, BarChart, Database, Phone, MessageSquare } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  link?: string;
}

const ECommerce = () => {
  const { content, isLoading, getSection } = usePageContent('/ecommerce');

  const heroSection = getSection('hero');
  const servicesSection = getSection('services');
  const ctaSection = getSection('cta');

  const heroMeta = heroSection?.metadata as Record<string, any> || {};
  const servicesMeta = servicesSection?.metadata as Record<string, any> || {};
  const ctaMeta = ctaSection?.metadata as Record<string, any> || {};

  // Fallback services
  const fallbackServices: ServiceItem[] = [
    { id: "1", icon_name: "Search", title: "Product Discovery Management", description: "Advanced search optimization and product discovery solutions to help customers find what they're looking for faster." },
    { id: "2", icon_name: "Database", title: "Catalog SEO & Data Enrichment", description: "Strategic SEO optimization for large product catalogs with automated data enrichment and structured markup." },
    { id: "3", icon_name: "BarChart", title: "Performance Marketing", description: "Data-driven performance marketing campaigns designed to maximize ROI and drive sustainable e-commerce growth." }
  ];

  const services: ServiceItem[] = servicesMeta.items?.length > 0 
    ? servicesMeta.items 
    : fallbackServices;

  const iconFallbacks: Record<string, React.ReactNode> = {
    Search: <Search className="h-8 w-8 text-purple-500" />,
    Database: <Database className="h-8 w-8 text-purple-500" />,
    BarChart: <BarChart className="h-8 w-8 text-purple-500" />
  };

  const eCommerceServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-commerce Optimization Services",
    "description": content?.meta_description || "Product discovery management, catalog SEO, and performance marketing for e-commerce brands",
    "provider": {
      "@type": "Organization",
      "name": "Stell Media",
      "url": "https://stellmedia.com"
    },
    "serviceType": "E-commerce Optimization",
    "areaServed": "Worldwide"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{content?.meta_title || "E-Commerce Product Discovery & Performance Marketing | Stell Media"}</title>
        <meta name="description" content={content?.meta_description || "Specialized e-commerce solutions including product discovery optimization, catalog SEO, and performance marketing."} />
        <link rel="canonical" href="https://stellmedia.com/ecommerce" />
      </Helmet>

      <SchemaMarkup type="service" data={eCommerceServiceSchema} />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="mobile-hero-spacing pb-16 bg-gradient-to-r from-purple-50 to-indigo-50 relative min-h-screen">
        <div className="container mx-auto px-4 min-h-screen flex items-center justify-center"
             style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
              {heroSection?.title || "E-Commerce Product Discovery & Performance Marketing"}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {heroSection?.content || "Optimize your product discovery, enhance catalog SEO, and drive growth with data-driven performance marketing strategies."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-700 to-indigo-600">
                <Link to={heroMeta.cta_link || "/contact"}>
                  {heroMeta.cta_text || "Get Started"}
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                {heroMeta.cta_secondary_text || "Schedule Demo"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {servicesSection?.title || "Our E-Commerce Solutions"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {servicesSection?.content || "Comprehensive optimization solutions designed specifically for growing e-commerce brands and large product catalogs."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="h-full">
                <CardHeader>
                  <div className="mb-4">
                    <DynamicIcon 
                      name={service.icon_name} 
                      className="h-8 w-8 text-purple-500"
                      fallback={iconFallbacks[service.icon_name || 'Search']}
                    />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 text-white"
        style={{
          background: ctaMeta.gradient_from && ctaMeta.gradient_to 
            ? `linear-gradient(to right, ${ctaMeta.gradient_from}, ${ctaMeta.gradient_to})`
            : 'linear-gradient(to right, #7c3aed, #4f46e5)'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {ctaSection?.title || "Ready to Accelerate Your E-Commerce Growth?"}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {ctaSection?.content || "Let's discuss how our specialized solutions can optimize your product discovery and drive more sales."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to={ctaMeta.cta_link || "/contact"}>
                <MessageSquare className="mr-2 h-4 w-4" />
                {ctaMeta.cta_text || "Start Conversation"}
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-purple-700">
              {ctaMeta.cta_secondary_text || "View Case Studies"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ECommerce;
