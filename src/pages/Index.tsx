
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
import SEOMetadata from "@/components/SEOMetadata";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";

// Stats data
const stats = [
  { value: "18%", label: "reduction in Zero Search Results" },
  { value: "2.4x", label: "Grew organic traffic in 6 months through performance-driven SEO" },
  { value: "100k+", label: "Products optimized" },
  { value: "99%", label: "Client retention rate" }
];

// Updated case studies with real HD images and IDs that match route params
const caseStudies = [
  {
    id: "electronics-search",
    title: "Advanced Electronics Search Optimization",
    description: "How we implemented strategic algorithms with Elastic Search to increase search conversion by 42% and reduced no-results searches by 68%.",
    category: "Product Discovery Optimization",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3",
    alt: "Close-up of circuit boards representing electronics search optimization"
  },
  {
    id: "search-platform-migration",
    title: "Search Platform Migration Success",
    description: "Our algorithm optimization during migration from Elastic Search to Coveo transformed search performance and improved customer satisfaction by 38%.",
    category: "Search Platform Migration",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3",
    alt: "Code on screen representing search platform migration"
  },
  {
    id: "amazon-marketplace",
    title: "Amazon Marketplace Optimization",
    description: "Complete overhaul of product listing and SEO strategy resulted in 62% increase in organic visibility and 47% higher conversion rate.",
    category: "Marketpulse",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3",
    alt: "Team analyzing display screens with marketplace data"
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing Campaign",
    description: "Strategic performance marketing for an online retailer resulted in 85% ROAS improvement and 39% reduction in customer acquisition costs.",
    category: "Performance Marketing",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3",
    alt: "Laptop with code and analytics data representing performance marketing"
  }
];

const Index = () => {
  const { openChat } = useChat();

  return (
    <div className="min-h-screen bg-indigo-50">
      <SEOMetadata />
      <SiteSchemaMarkup />
      
      <Navbar />
      <main>
        <HeroSection />
        
        {/* Stats Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 bg-white">
          <ServicesSection />
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-purple-50">
          <TestimonialsSection />
        </section>
        
        {/* Case Studies Preview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Case Studies</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how our innovative solutions for <Link to="/services/product-discovery" className="text-indigo-600 hover:underline">product discovery</Link>, <Link to="/services/search-migration" className="text-indigo-600 hover:underline">search platform migration</Link>, and <Link to="/services/marketpulse" className="text-indigo-600 hover:underline">marketplace management</Link> have helped e-commerce brands achieve measurable results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {caseStudies.slice(0, 2).map((study, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <img 
                      src={study.image} 
                      alt={study.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-indigo-600 py-1 px-3 rounded-full text-sm font-medium">
                        {study.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{study.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{study.description}</p>
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
        
        {/* CTA Section */}
        <section className="py-20 bg-indigo-100">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to transform your e-commerce experience?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90 leading-relaxed">
                Let's talk about how our <Link to="/services/product-discovery" className="text-white hover:text-blue-100 underline">product discovery solutions</Link>, <Link to="/services/search-migration" className="text-white hover:text-blue-100 underline">search platform migration</Link>, and <Link to="/services/marketpulse" className="text-white hover:text-blue-100 underline">marketplace management</Link> can boost your conversions.
              </p>
              <Button asChild size="lg" variant="secondary" className="font-bold text-lg shadow-md text-indigo-700 bg-white hover:bg-gray-100">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-20 bg-indigo-50">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
