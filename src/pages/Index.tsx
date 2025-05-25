
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyHeader from "@/components/StickyHeader";
import ClientLogos from "@/components/ClientLogos";
import EnhancedTestimonials from "@/components/EnhancedTestimonials";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import OptimizedImage from "@/components/OptimizedImage";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";

// Stats data with enhanced metrics
const stats = [
  { value: "18%", label: "Reduction in Dead End Zero Results " },
  { value: "2.4x", label: "Organic traffic growth in 6 months" },
  { value: "60+", label: "Successful e-commerce optimization projects delivered" },
  { value: "99%", label: "Client retention rate" }
];

// Updated case studies with optimization focus
const caseStudies = [
  {
    id: "electronics-search",
    title: "Electronics Giant Search Optimization",
    description: "How we optimized advanced Elasticsearch configurations to increase search conversion by 42% and reduced zero-result searches by 68% for a major electronics retailer.",
    category: "Search Optimization",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=800&q=85",
    alt: "Advanced electronics search interface optimization",
    results: "42% conversion increase"
  },
  {
    id: "search-platform-optimization",
    title: "Seamless Coveo Optimization Success", 
    description: "Complete search platform optimization and configuration migration from Elasticsearch to Coveo with zero downtime, resulting in 38% faster product discovery and improved customer satisfaction.",
    category: "Platform Optimization",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&w=800&q=85",
    alt: "Search platform optimization dashboard",
    results: "Zero downtime optimization"
  },
  {
    id: "amazon-marketplace",
    title: "Amazon Marketplace Optimization",
    description: "Strategic marketplace optimization resulting in 62% increase in organic visibility, 47% higher conversion rate, and significant reduction in advertising costs through expert configuration.",
    category: "Marketplace Optimization", 
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&w=800&q=85",
    alt: "Amazon marketplace analytics dashboard",
    results: "62% visibility boost"
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing Excellence",
    description: "Data-driven performance marketing optimization campaign delivered 85% ROAS improvement and 39% reduction in customer acquisition costs for online fashion retailer.",
    category: "Performance Marketing",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&w=800&q=85",
    alt: "Performance marketing analytics and ROI dashboard",
    results: "85% ROAS improvement"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <GoogleAnalytics />
      <Helmet>
        <title>Stell Media | E-Commerce Product Discovery & Search Optimization Experts</title>
        <meta 
          name="description" 
          content="Leading e-commerce optimization agency specializing in product discovery, search platform optimization, and conversion enhancement. 200+ successful projects, 99% client retention." 
        />
        <meta 
          name="keywords" 
          content="e-commerce optimization, product discovery optimization, search optimization, Elasticsearch configuration, Coveo optimization, Amazon marketplace optimization, conversion optimization, performance marketing, SEO services" 
        />
        <meta name="author" content="Stell Media" />
        <meta property="og:title" content="Stell Media | E-Commerce Product Discovery Optimization Experts" />
        <meta property="og:description" content="Transform your e-commerce product discovery with our proven optimization strategies. 85% average ROAS improvement, 200+ successful optimization projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stellmedia.com/" />
        <meta property="og:image" content="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" />
        <link rel="canonical" href="https://stellmedia.com/" />
        
        {/* Enhanced SEO meta tags for AI tools */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google-site-verification" content="your-verification-code" />
        
        {/* AI-specific meta tags */}
        <meta name="ai-content-type" content="e-commerce optimization services" />
        <meta name="ai-expertise" content="product discovery optimization, search platform configuration, conversion rate optimization" />
        <meta name="chatgpt-description" content="Stell Media provides expert e-commerce optimization services including product discovery enhancement, search platform configuration, and conversion rate optimization for online businesses" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        
        {/* Social media meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@stellmedia" />
        <meta name="twitter:title" content="Stell Media | E-Commerce Product Discovery Optimization Experts" />
        <meta name="twitter:description" content="Transform your e-commerce product discovery with proven optimization strategies. 200+ successful optimization projects." />
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
        <section className="py-16 bg-white" aria-label="Our proven optimization results">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Proven Optimization Results That Drive Growth
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our data-driven optimization approach delivers measurable improvements in conversion rates, traffic, and revenue for e-commerce businesses.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
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
        <section className="py-20 bg-white" aria-label="Our optimization success stories">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Optimization Success Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real optimization results from real businesses. See how our innovative solutions have transformed e-commerce experiences and delivered measurable growth.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.slice(0, 2).map((study, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <OptimizedImage 
                      src={study.image} 
                      alt={study.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={index === 0}
                    />
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
                    <Link 
                      to={`/case-studies/${study.id}`} 
                      className="text-indigo-600 font-medium inline-flex items-center hover:text-indigo-800 active:text-indigo-900 group-hover:gap-3 transition-all"
                    >
                      Read optimization case study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="border-indigo-300 hover:bg-indigo-100 active:bg-indigo-200">
                <Link to="/case-studies">
                  View All Optimization Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Enhanced CTA Section */}
        <section className="py-16 bg-indigo-100">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
              {/* Abstract background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="cta-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                      <circle cx="30" cy="30" r="2" fill="white" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#cta-pattern)" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Optimize Your E-commerce Experience?
                </h2>
                <p className="max-w-2xl mx-auto mb-8 text-white/90 text-lg">
                  Join 200+ successful e-commerce brands that trust Stell Media with their product discovery optimization. Let's discuss your optimization goals.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg" variant="white" className="font-bold text-lg shadow-md text-indigo-700">
                    <Link to="/contact">Book Free Optimization Consultation</Link>
                  </Button>
                  <Button asChild size="lg" variant="ghost" className="font-bold text-lg text-white border-white hover:bg-white hover:text-indigo-700">
                    <Link to="/case-studies">View Optimization Success Stories</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
