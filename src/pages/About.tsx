import React from "react";
import SEOHelmet from "@/components/SEOHelmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Zap, Award } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { Skeleton } from "@/components/ui/skeleton";

const About = () => {
  const { content, isLoading, getSection } = usePageContent('/about');

  // Get sections from database or use fallback
  const heroSection = getSection('hero');
  const missionSection = getSection('mission');
  const visionSection = getSection('vision');
  const storySection = getSection('story');
  const ctaSection = getSection('cta');

  // Fallback content for when database content isn't available
  const fallback = {
    heroTitle: "About Stell Media",
    heroDescription: "We're a specialized digital marketing agency focused on helping real estate developers and e-commerce brands achieve measurable growth through innovative strategies and cutting-edge technology.",
    missionTitle: "Our Mission",
    missionContent: "To empower real estate developers and e-commerce brands with data-driven digital marketing solutions that deliver measurable results and sustainable growth.",
    visionTitle: "Our Vision",
    visionContent: "To be the leading digital marketing partner for real estate and e-commerce businesses, known for innovative strategies and exceptional results.",
    storyTitle: "Our Story",
    storyContent: `Stell Media was founded with a simple yet powerful vision: to bridge the gap between traditional marketing approaches and the digital-first world we live in today. We recognized that real estate developers and e-commerce brands needed specialized expertise to navigate the complex digital landscape effectively.

Our team combines years of experience in digital marketing with deep industry knowledge, allowing us to create strategies that not only drive traffic but convert visitors into customers and customers into advocates.

Today, we're proud to partner with forward-thinking businesses that understand the importance of digital transformation and are committed to achieving sustainable growth through innovative marketing strategies.`,
    ctaTitle: "Ready to Transform Your Business?",
    ctaDescription: "Let's discuss how our expertise can help you achieve your growth goals"
  };

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
        style={{ 
          paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))'
        }}
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
            <Card className="bg-white/80 backdrop-blur-sm border border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
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

            <Card className="bg-white/80 backdrop-blur-sm border border-indigo-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-white" />
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

          {/* What Sets Us Apart */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-indigo-100 shadow-sm mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Industry Expertise</h3>
                <p className="text-gray-600">
                  Deep understanding of real estate and e-commerce markets, allowing us to create highly targeted and effective campaigns.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Data-Driven Approach</h3>
                <p className="text-gray-600">
                  Every strategy is backed by comprehensive data analysis and continuous optimization to ensure maximum ROI.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Proven Results</h3>
                <p className="text-gray-600">
                  Track record of delivering exceptional results with 300%+ revenue growth and 450%+ lead increases for our clients.
                </p>
              </div>
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
      <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 border-t border-indigo-200">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {ctaSection?.title || fallback.ctaTitle}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {ctaSection?.content || fallback.ctaDescription}
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl btn-cta">
              <Link to="/contact">
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
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