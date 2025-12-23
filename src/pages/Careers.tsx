import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageContent } from "@/hooks/usePageContent";
import { Skeleton } from "@/components/ui/skeleton";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { Users, TrendingUp, Award, Coffee } from "lucide-react";

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
}

const Careers = () => {
  const { content, isLoading, getSection } = usePageContent('/careers');

  const heroSection = getSection('hero');
  const benefitsSection = getSection('benefits');
  const ctaSection = getSection('cta');

  const benefitsMeta = benefitsSection?.metadata as Record<string, any> || {};
  const ctaMeta = ctaSection?.metadata as Record<string, any> || {};

  // Fallback benefits
  const fallbackBenefits: BenefitItem[] = [
    { id: "1", icon_name: "Users", title: "Collaborative Team", description: "Work with talented professionals in a supportive, growth-oriented environment" },
    { id: "2", icon_name: "TrendingUp", title: "Career Growth", description: "Continuous learning opportunities and clear paths for professional advancement" },
    { id: "3", icon_name: "Award", title: "Competitive Benefits", description: "Comprehensive benefits package including health insurance and performance bonuses" },
    { id: "4", icon_name: "Coffee", title: "Work-Life Balance", description: "Flexible work arrangements and a culture that values personal well-being" }
  ];

  const benefits: BenefitItem[] = benefitsMeta.items?.length > 0 
    ? benefitsMeta.items 
    : fallbackBenefits;

  // Icon fallbacks
  const iconFallbacks: Record<string, React.ReactNode> = {
    Users: <Users className="h-8 w-8 text-blue-500" />,
    TrendingUp: <TrendingUp className="h-8 w-8 text-blue-500" />,
    Award: <Award className="h-8 w-8 text-blue-500" />,
    Coffee: <Coffee className="h-8 w-8 text-blue-500" />
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
        <title>{content?.meta_title || "Careers | Join Our Team | Stell Media"}</title>
        <meta name="description" content={content?.meta_description || "Join the Stell Media team and build your career in digital marketing."} />
        <link rel="canonical" href="https://stellmedia.com/careers" />
      </Helmet>

      <Navbar />
      
      <section className="mobile-hero-spacing pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              {heroSection?.title || "Join Our Team"}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {heroSection?.content || "Build your career with a leading digital marketing agency. We're looking for passionate professionals who want to make a real impact."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {benefitsSection?.title || "Why Work With Us?"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {benefitsSection?.content || "At Stell Media, we believe in creating an environment where talented people can thrive and grow their careers."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {benefits.map((benefit) => (
              <Card key={benefit.id} className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <DynamicIcon 
                      name={benefit.icon_name} 
                      className="h-8 w-8 text-blue-500"
                      fallback={iconFallbacks[benefit.icon_name || 'Users']}
                    />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {ctaSection?.title || "Interested in Joining Us?"}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {ctaSection?.content || "We're always looking for talented individuals to join our team. Send us your resume and let's start the conversation."}
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
                <p className="text-gray-600 mb-6">
                  Send your resume and cover letter to our HR team, and we'll get back to you within 48 hours.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600">
                  <a href={ctaMeta.cta_link || "mailto:careers@stellmedia.com"}>
                    {ctaMeta.cta_text || "Email Your Resume"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
