
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useChat } from "@/hooks/use-chat";
import { Helmet } from "react-helmet-async";

// Stats data
const stats = [
  { value: "18%", label: "reduction in Zero Search Results" },
  { value: "2.4x", label: "Grew organic traffic in 6 months through performance-driven SEO" },
  { value: "100k+", label: "Products optimized" },
  { value: "99%", label: "Client retention rate" }
];

// Updated case studies with abstract images and IDs that match route params
const caseStudies = [
  {
    id: "electronics-search",
    title: "Advanced Electronics Search Optimization",
    description: "How we implemented strategic algorithms with Elastic Search to increase search conversion by 42% and reduced no-results searches by 68%.",
    category: "Product Discovery Optimization",
    image: "bg-gradient-to-br from-blue-100 via-indigo-50 to-white",
    pattern: "electronics-pattern"
  },
  {
    id: "search-platform-migration",
    title: "Search Platform Migration Success",
    description: "Our algorithm optimization during migration from Elastic Search to Coveo transformed search performance and improved customer satisfaction by 38%.",
    category: "Search Platform Migration",
    image: "bg-gradient-to-br from-indigo-100 via-purple-50 to-white",
    pattern: "migration-pattern"
  },
  {
    id: "amazon-marketplace",
    title: "Amazon Marketplace Optimization",
    description: "Complete overhaul of product listing and SEO strategy resulted in 62% increase in organic visibility and 47% higher conversion rate.",
    category: "Marketpulse",
    image: "bg-gradient-to-br from-purple-100 via-pink-50 to-white",
    pattern: "marketplace-pattern"
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing Campaign",
    description: "Strategic performance marketing for an online retailer resulted in 85% ROAS improvement and 39% reduction in customer acquisition costs.",
    category: "Performance Marketing",
    image: "bg-gradient-to-br from-blue-100 via-cyan-50 to-white",
    pattern: "performance-pattern"
  }
];

const Index = () => {
  const { openChat } = useChat();

  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Stell Media | E-Commerce Product Discovery & Optimization Experts</title>
        <meta 
          name="description" 
          content="Stell Media helps e-commerce brands optimize product discovery and boost conversions with AI-powered search optimization, data enrichment, and navigation improvements." 
        />
        <meta 
          name="keywords" 
          content="e-commerce optimization, product discovery, search optimization, data enrichment, search platform migration, e-commerce SEO, product catalog optimization" 
        />
        <meta name="author" content="Stell Media" />
        <meta property="og:title" content="Stell Media | E-Commerce Product Discovery Experts" />
        <meta property="og:description" content="Optimize your e-commerce product discovery experience and boost conversions with Stell Media's specialized solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.stellmedia.com/" />
        <meta property="og:image" content="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" />
        <link rel="canonical" href="https://www.stellmedia.com/" />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <ServicesSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Case Studies Preview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Case Studies</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how our innovative solutions for product discovery, search platform migration, and marketplace management have helped e-commerce brands achieve measurable results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.slice(0, 2).map((study, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`relative h-64 ${study.image}`}>
                    {/* Abstract pattern specific to each case study */}
                    <div className={`absolute inset-0 ${study.pattern}`}>
                      {study.pattern === 'electronics-pattern' && (
                        <div className="absolute inset-0">
                          <div className="absolute left-1/4 top-1/2 w-64 h-32 border border-blue-300 rounded-lg opacity-20 transform -rotate-12"></div>
                          <div className="absolute right-1/4 bottom-1/3 w-48 h-24 border border-indigo-300 rounded-lg opacity-20 transform rotate-12"></div>
                          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
                            <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20,10 L100,10 M20,20 L80,20 M20,30 L90,30 M20,40 L70,40 M20,50 L60,50" 
                                    stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3" opacity="0.4" />
                            </svg>
                          </div>
                          <div className="absolute bottom-1/4 right-1/3">
                            <div className="w-20 h-20 rounded-full border-2 border-blue-200 opacity-20"></div>
                          </div>
                        </div>
                      )}
                      
                      {study.pattern === 'migration-pattern' && (
                        <div className="absolute inset-0">
                          <div className="absolute left-1/3 top-1/3 opacity-20">
                            <svg width="240" height="60" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10,30 C50,10 70,50 120,30 C170,10 190,50 230,30" 
                                    stroke="#6366f1" strokeWidth="2" fill="none" opacity="0.7" />
                              <path d="M10,30 C50,50 70,10 120,30 C170,50 190,10 230,30" 
                                    stroke="#8b5cf6" strokeWidth="1" fill="none" opacity="0.4" />
                            </svg>
                          </div>
                          <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-indigo-100 opacity-20"></div>
                          <div className="absolute bottom-1/4 left-1/4 w-12 h-12 rounded-full bg-purple-100 opacity-20"></div>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-indigo-600 py-1 px-3 rounded-full text-sm font-medium">
                        {study.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                    <p className="text-gray-600 mb-4">{study.description}</p>
                    <Link to={`/case-studies/${study.id}`} className="text-indigo-600 font-medium inline-flex items-center hover:text-indigo-800 active:text-indigo-900">
                      Read case study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="border-indigo-300 hover:bg-indigo-100 active:bg-indigo-200">
                <Link to="/case-studies">
                  View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section with white button variant */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your e-commerce experience?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Let's talk about how our product discovery solutions, search platform migration, and marketplace management can boost your conversions.
              </p>
              <Button asChild size="lg" variant="default" className="font-bold text-lg shadow-md bg-white text-indigo-700 hover:bg-gray-100">
                <Link to="/contact">Book Your Free Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
