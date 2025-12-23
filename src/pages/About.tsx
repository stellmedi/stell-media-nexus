import React from "react";
import SEOHelmet from "@/components/SEOHelmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Zap } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { Skeleton } from "@/components/ui/skeleton";
import DynamicIcon from "@/components/ui/DynamicIcon";

interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  gradient_from?: string;
  gradient_to?: string;
}

const About = () => {
  const { content, isLoading, getSection } = usePageContent('/about');

  // Get sections from database
  const heroSection = getSection('hero');
  const missionSection = getSection('mission');
  const visionSection = getSection('vision');
  const differentiatorSection = getSection('differentiators');
  const storySection = getSection('story');
  const ctaSection = getSection('cta');

  // Extract metadata with safe defaults
  const missionMeta = missionSection?.metadata as Record<string, any> || {};
  const visionMeta = visionSection?.metadata as Record<string, any> || {};
  const differentiatorMeta = differentiatorSection?.metadata as Record<string, any> || {};
  const ctaMeta = ctaSection?.metadata as Record<string, any> || {};
  const heroMeta = heroSection?.metadata as Record<string, any> || {};

  // Fallback content
  const fallback = {
    heroTitle: "About Stell Media",
    heroDescription: "We're a specialized digital marketing agency focused on helping real estate developers and e-commerce brands achieve measurable growth.",
    missionTitle: "Our Mission",
    missionContent: "To empower businesses with data-driven digital marketing solutions that deliver measurable results and sustainable growth.",
    missionIcon: "Target",
    missionGradientFrom: "#3b82f6",
    missionGradientTo: "#8b5cf6",
    visionTitle: "Our Vision",
    visionContent: "To be the leading digital marketing partner for real estate and e-commerce businesses.",
    visionIcon: "Zap",
    visionGradientFrom: "#f59e0b",
    visionGradientTo: "#ef4444",
    differentiatorTitle: "What Sets Us Apart",
    differentiatorContent: "Discover the unique advantages of partnering with Stell Media.",
    differentiators: [
      { id: "1", title: "Industry Expertise", description: "Deep understanding of real estate and e-commerce markets.", icon_name: "Award", gradient_from: "#3b82f6", gradient_to: "#8b5cf6" },
      { id: "2", title: "Data-Driven Approach", description: "Every strategy is backed by comprehensive data analysis.", icon_name: "BarChart", gradient_from: "#10b981", gradient_to: "#06b6d4" },
      { id: "3", title: "Proven Results", description: "Track record of delivering exceptional results.", icon_name: "TrendingUp", gradient_from: "#f59e0b", gradient_to: "#ef4444" }
    ],
    storyTitle: "Our Story",
    storyContent: "Stell Media was founded with a vision to bridge the gap between traditional marketing and the digital-first world.\n\nOur team combines years of experience with deep industry knowledge, creating strategies that convert visitors into customers.\n\nToday, we partner with forward-thinking businesses committed to achieving sustainable growth.",
    ctaTitle: "Ready to Transform Your Business?",
    ctaDescription: "Let's discuss how our expertise can help you achieve your growth goals.",
    ctaButtonText: "Get In Touch",
    ctaButtonLink: "/contact"
  };

  const differentiators: DifferentiatorItem[] = differentiatorMeta.items?.length > 0 
    ? differentiatorMeta.items 
    : fallback.differentiators;

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SEOHelmet pagePath="/about" />
      
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="mobile-hero-spacing pb-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-indigo-100"
        style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center w-full">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {heroSection?.title || fallback.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {heroSection?.content || fallback.heroDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Mission Card */}
            <Card className="bg-white/80 backdrop-blur-sm border border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      background: `linear-gradient(135deg, ${missionMeta.gradient_from || fallback.missionGradientFrom}, ${missionMeta.gradient_to || fallback.missionGradientTo})`
                    }}
                  >
                    <DynamicIcon 
                      name={missionMeta.icon_name || fallback.missionIcon} 
                      className="h-6 w-6 text-white"
                      fallback={<Target className="h-6 w-6 text-white" />}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {missionSection?.title || fallback.missionTitle}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {missionSection?.content || fallback.missionContent}
                </p>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="bg-white/80 backdrop-blur-sm border border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      background: `linear-gradient(135deg, ${visionMeta.gradient_from || fallback.visionGradientFrom}, ${visionMeta.gradient_to || fallback.visionGradientTo})`
                    }}
                  >
                    <DynamicIcon 
                      name={visionMeta.icon_name || fallback.visionIcon} 
                      className="h-6 w-6 text-white"
                      fallback={<Zap className="h-6 w-6 text-white" />}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {visionSection?.title || fallback.visionTitle}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {visionSection?.content || fallback.visionContent}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What Sets Us Apart - Now from DB */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-indigo-100 shadow-sm mb-16">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
              {differentiatorSection?.title || fallback.differentiatorTitle}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {differentiatorSection?.content || fallback.differentiatorContent}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {differentiators.map((item) => (
                <div key={item.id} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${item.gradient_from || '#3b82f6'}, ${item.gradient_to || '#8b5cf6'})`
                    }}
                  >
                    <DynamicIcon 
                      name={item.icon_name} 
                      className="h-8 w-8 text-white"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              {storySection?.title || fallback.storyTitle}
            </h2>
            <div className="max-w-4xl mx-auto">
              {(storySection?.content || fallback.storyContent).split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 border-t border-indigo-200"
        style={{
          background: ctaMeta.gradient_from && ctaMeta.gradient_to 
            ? `linear-gradient(to right, ${ctaMeta.gradient_from}, ${ctaMeta.gradient_to})`
            : 'linear-gradient(to right, #1d4ed8, #7c3aed, #9333ea)'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {ctaSection?.title || fallback.ctaTitle}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {ctaSection?.content || fallback.ctaDescription}
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl btn-cta">
              <Link to={ctaMeta.cta_link || fallback.ctaButtonLink}>
                {ctaMeta.cta_text || fallback.ctaButtonText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
