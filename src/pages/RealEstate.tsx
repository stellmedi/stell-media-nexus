import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageContent } from "@/hooks/usePageContent";
import { Skeleton } from "@/components/ui/skeleton";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, View, Box, Users, Building, Target, TrendingUp } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  link?: string;
}

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
}

const RealEstate = () => {
  const { content, isLoading, getSection } = usePageContent('/real-estate');

  const heroSection = getSection('hero');
  const servicesSection = getSection('services');
  const benefitsSection = getSection('benefits');
  const ctaSection = getSection('cta');

  const heroMeta = heroSection?.metadata as Record<string, any> || {};
  const servicesMeta = servicesSection?.metadata as Record<string, any> || {};
  const benefitsMeta = benefitsSection?.metadata as Record<string, any> || {};
  const ctaMeta = ctaSection?.metadata as Record<string, any> || {};

  // Fallback data
  const fallbackServices: ServiceItem[] = [
    { id: "1", icon_name: "View", title: "Virtual Tours", description: "360° immersive property experiences that engage potential buyers.", link: "/services/virtual-tours" },
    { id: "2", icon_name: "Box", title: "3D Visualization", description: "Photorealistic property renderings that bring concepts to life.", link: "/services/3d-visualization" },
    { id: "3", icon_name: "Users", title: "Lead Generation", description: "Attract qualified property buyers with targeted campaigns.", link: "/services/lead-generation" },
    { id: "4", icon_name: "Building", title: "CRM & Lead Management", description: "Streamline your sales pipeline with smart automation.", link: "/services/crm-lead-management" }
  ];

  const fallbackBenefits: BenefitItem[] = [
    { id: "1", icon_name: "Target", title: "Targeted Reach", description: "Connect with qualified buyers actively searching for properties." },
    { id: "2", icon_name: "TrendingUp", title: "Higher Conversions", description: "Turn more leads into successful property sales." },
    { id: "3", icon_name: "Building", title: "Brand Authority", description: "Establish your brand as a trusted real estate leader." }
  ];

  const services: ServiceItem[] = servicesMeta.items?.length > 0 ? servicesMeta.items : fallbackServices;
  const benefits: BenefitItem[] = benefitsMeta.items?.length > 0 ? benefitsMeta.items : fallbackBenefits;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Helmet>
        <title>{content?.meta_title || "Real Estate Digital Solutions | Lead Generation & CRM | Stell Media"}</title>
        <meta name="description" content={content?.meta_description || "Comprehensive real estate digital solutions including virtual tours, CRM automation, lead generation, and 3D visualization services."} />
        <link rel="canonical" href="https://stellmedia.com/real-estate" />
      </Helmet>

      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="mobile-hero-spacing pb-16 relative min-h-screen"
        style={{
          background: heroMeta.gradient_from && heroMeta.gradient_to 
            ? `linear-gradient(135deg, ${heroMeta.gradient_from}20, ${heroMeta.gradient_to}20)`
            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))'
        }}
      >
        <div className="container mx-auto px-4 min-h-screen flex items-center justify-center"
             style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              {heroSection?.title || "Real Estate Marketing"}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {heroSection?.content || "Specialized marketing solutions to help real estate professionals stand out and close more deals."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-cyan-600">
                <Link to={heroMeta.cta_link || "/consultation"}>
                  {heroMeta.cta_text || "Get Started"}
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                {heroMeta.cta_secondary_text || "Schedule Call"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {servicesSection?.title || "Real Estate Services"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {servicesSection?.content || "Comprehensive marketing solutions for the real estate industry."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <DynamicIcon 
                      name={service.icon_name} 
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  {service.link && (
                    <Link 
                      to={service.link} 
                      className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
                    >
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {benefitsSection?.title || "Why Choose Us"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {benefitsSection?.content || "Benefits of our real estate marketing expertise."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DynamicIcon 
                    name={benefit.icon_name} 
                    className="h-8 w-8 text-white"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
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
            : 'linear-gradient(to right, #059669, #0891b2)'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {ctaSection?.title || "Ready to Elevate Your Listings?"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {ctaSection?.content || "Let's discuss how we can help you sell properties faster."}
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to={ctaMeta.cta_link || "/consultation"}>
              {ctaMeta.cta_text || "Get Started"}
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealEstate;
