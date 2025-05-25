import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";
import ClientLogos from "@/components/ClientLogos";
import EnhancedTestimonials from "@/components/EnhancedTestimonials";
import OptimizedImage from "@/components/OptimizedImage";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";

// Stats data with enhanced metrics
const stats = [{
  value: "85%",
  label: "Average ROAS improvement for our clients"
}, {
  value: "2.4x",
  label: "Organic traffic growth in 6 months"
}, {
  value: "200+",
  label: "Successful e-commerce projects delivered"
}, {
  value: "99%",
  label: "Client retention rate"
}];

// Updated case studies with real HD images and enhanced descriptions
const caseStudies = [{
  id: "electronics-search",
  title: "Electronics Giant Search Transformation",
  description: "How we implemented advanced Elasticsearch algorithms to increase search conversion by 42% and reduced zero-result searches by 68% for a major electronics retailer.",
  category: "Search Optimization",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=800&q=85",
  alt: "Advanced electronics search interface optimization",
  results: "42% conversion increase"
}, {
  id: "search-platform-migration",
  title: "Seamless Coveo Migration Success",
  description: "Complete search platform migration from Elasticsearch to Coveo with zero downtime, resulting in 38% faster product discovery and improved customer satisfaction.",
  category: "Platform Migration",
  image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&w=800&q=85",
  alt: "Search platform migration dashboard",
  results: "Zero downtime migration"
}, {
  id: "amazon-marketplace",
  title: "Amazon Marketplace Domination",
  description: "Strategic marketplace optimization resulting in 62% increase in organic visibility, 47% higher conversion rate, and significant reduction in advertising costs.",
  category: "Marketplace Optimization",
  image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&w=800&q=85",
  alt: "Amazon marketplace analytics dashboard",
  results: "62% visibility boost"
}, {
  id: "performance-marketing",
  title: "Performance Marketing Excellence",
  description: "Data-driven performance marketing campaign delivered 85% ROAS improvement and 39% reduction in customer acquisition costs for online fashion retailer.",
  category: "Performance Marketing",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&w=800&q=85",
  alt: "Performance marketing analytics and ROI dashboard",
  results: "85% ROAS improvement"
}];
const Index = () => {
  return <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Stell Media | E-Commerce Product Discovery & Search Optimization Experts</title>
        <meta name="description" content="Leading e-commerce optimization agency specializing in product discovery, search platform migration, and conversion optimization. 200+ successful projects, 99% client retention." />
        <meta name="keywords" content="e-commerce optimization, product discovery, search optimization, Elasticsearch, Coveo migration, Amazon marketplace, conversion optimization, performance marketing" />
        <meta name="author" content="Stell Media" />
        <meta property="og:title" content="Stell Media | E-Commerce Product Discovery Experts" />
        <meta property="og:description" content="Transform your e-commerce product discovery with our proven optimization strategies. 85% average ROAS improvement, 200+ successful projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stellmedia.com/" />
        <meta property="og:image" content="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" />
        <link rel="canonical" href="https://stellmedia.com/" />
        
        {/* Enhanced SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google-site-verification" content="your-verification-code" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        
        {/* Social media meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@stellmedia" />
        <meta name="twitter:title" content="Stell Media | E-Commerce Product Discovery Experts" />
        <meta name="twitter:description" content="Transform your e-commerce product discovery with proven optimization strategies. 200+ successful projects." />
        <meta name="twitter:image" content="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" />
      </Helmet>
      
      <SiteSchemaMarkup />
      <StickyHeader />
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Client Logos Section */}
        <ClientLogos />
        
        {/* Stats Section - Enhanced */}
        <section className="py-16 bg-white" aria-label="Our proven results">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Proven Results That Drive Growth
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our data-driven approach delivers measurable improvements in conversion rates, traffic, and revenue for e-commerce businesses.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </div>)}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="bg-blue-50">
          <ServicesSection />
        </section>
        
        {/* Enhanced Testimonials */}
        <EnhancedTestimonials />
        
        {/* Case Studies Preview - Enhanced */}
        <section className="py-20 bg-white" aria-label="Our success stories">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real results from real businesses. See how our innovative solutions have transformed e-commerce experiences and delivered measurable growth.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.slice(0, 2).map((study, index) => <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <OptimizedImage src={study.image} alt={study.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" priority={index === 0} />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm text-indigo-600 py-1 px-3 rounded-full text-sm font-medium">
                        {study.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white py-1 px-3 rounded-full text-sm font-medium">
                        {study.results}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{study.description}</p>
                    <Link to={`/case-studies/${study.id}`} className="text-indigo-600 font-medium inline-flex items-center hover:text-indigo-800 active:text-indigo-900 group-hover:gap-3 transition-all">
                      Read case study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>)}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="border-indigo-300 hover:bg-indigo-100 active:bg-indigo-200">
                <Link to="/case-studies">
                  View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Enhanced CTA Section */}
        
        
        {/* Contact Section */}
        <section className="bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Index;