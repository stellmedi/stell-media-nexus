
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const CaseStudies = () => {
  const caseStudies = [
    {
      id: "ecommerce-fashion-brand",
      title: "Fashion E-commerce: 300% Revenue Growth",
      category: "E-commerce",
      industry: "Fashion & Retail",
      challenge: "Low conversion rates and poor product discovery",
      solution: "Implemented advanced product discovery optimization and personalized recommendations",
      results: {
        revenue: "+300%",
        conversion: "+85%",
        traffic: "+150%",
        timeframe: "6 months"
      },
      description: "A mid-sized fashion retailer struggling with high bounce rates and low conversions. Our product discovery optimization and personalized shopping experience drove remarkable results.",
      image: "/lovable-uploads/case-study-fashion.jpg",
      tags: ["Product Discovery", "Conversion Optimization", "Personalization"]
    },
    {
      id: "luxury-real-estate-leads",
      title: "Luxury Real Estate: 450% Lead Increase",
      category: "Real Estate",
      industry: "Luxury Properties",
      challenge: "Inefficient lead generation and poor lead quality",
      solution: "Automated CRM integration with targeted marketing campaigns",
      results: {
        leads: "+450%",
        conversion: "+120%",
        cost: "-60%",
        timeframe: "4 months"
      },
      description: "A luxury real estate developer needed high-quality leads for premium properties. Our targeted approach and CRM automation delivered exceptional results.",
      image: "/lovable-uploads/case-study-luxury-real-estate.jpg",
      tags: ["Lead Generation", "CRM Automation", "Luxury Marketing"]
    },
    {
      id: "tech-startup-growth",
      title: "Tech Startup: 500% User Acquisition",
      category: "E-commerce",
      industry: "Technology",
      challenge: "Limited brand awareness and customer acquisition",
      solution: "Multi-channel performance marketing with advanced analytics",
      results: {
        users: "+500%",
        cac: "-40%",
        retention: "+75%",
        timeframe: "8 months"
      },
      description: "A B2B SaaS startup needed scalable user acquisition. Our performance marketing strategy delivered sustainable growth with improved unit economics.",
      image: "/lovable-uploads/case-study-tech-startup.jpg",
      tags: ["Performance Marketing", "User Acquisition", "Analytics"]
    },
    {
      id: "residential-development-sales",
      title: "Residential Development: 200% Sales Velocity",
      category: "Real Estate",
      industry: "Residential Development",
      challenge: "Slow sales cycle and limited qualified prospects",
      solution: "Comprehensive digital marketing with virtual tours and lead nurturing",
      results: {
        sales: "+200%",
        leads: "+300%",
        cycle: "-45%",
        timeframe: "5 months"
      },
      description: "A residential development project facing slow sales needed to accelerate their marketing efforts. Our integrated approach significantly improved sales velocity.",
      image: "/lovable-uploads/case-study-residential-development.jpg",
      tags: ["Virtual Tours", "Lead Nurturing", "Digital Marketing"]
    },
    {
      id: "marketplace-optimization",
      title: "Online Marketplace: 250% Seller Growth",
      category: "E-commerce",
      industry: "Marketplace",
      challenge: "Low seller engagement and platform adoption",
      solution: "Data enrichment and seller onboarding optimization",
      results: {
        sellers: "+250%",
        revenue: "+180%",
        retention: "+90%",
        timeframe: "7 months"
      },
      description: "An emerging marketplace platform needed to attract and retain quality sellers. Our data-driven approach optimized the entire seller journey.",
      image: "/lovable-uploads/case-study-marketplace.jpg",
      tags: ["Data Enrichment", "Platform Optimization", "Seller Growth"]
    },
    {
      id: "health-ecommerce",
      title: "Health E-commerce: 400% Organic Growth",
      category: "E-commerce",
      industry: "Health & Wellness",
      challenge: "Poor search visibility and low organic traffic",
      solution: "Comprehensive SEO strategy with content marketing",
      results: {
        organic: "+400%",
        keywords: "+300%",
        revenue: "+250%",
        timeframe: "10 months"
      },
      description: "A health and wellness e-commerce brand needed better search visibility. Our SEO strategy dramatically improved organic performance and revenue.",
      image: "/lovable-uploads/case-study-health-ecommerce.jpg",
      tags: ["SEO", "Content Marketing", "Organic Growth"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Case Studies - Digital Marketing Success Stories | Stell Media</title>
        <meta name="description" content="Explore our case studies showcasing successful digital marketing campaigns for real estate and e-commerce clients. See measurable results and growth strategies." />
        <meta name="keywords" content="case studies, digital marketing results, real estate marketing, ecommerce growth, success stories" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Success Stories & Case Studies
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover how we've helped real estate developers and e-commerce brands achieve remarkable growth through strategic digital marketing
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-300">
                <div className="aspect-video bg-gradient-to-br from-indigo-50 to-blue-50 rounded-t-lg flex items-center justify-center">
                  <div className="text-center p-6">
                    <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                      {study.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {study.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
                    {study.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{study.industry}</p>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {study.description}
                  </p>
                  
                  {/* Key Results */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(study.results).map(([key, value], index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-bold text-lg text-indigo-600">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full group-hover:bg-indigo-700 transition-colors">
                    <Link to={`/case-studies/${study.id}`}>
                      View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results for your business
          </p>
          <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
            <Link to="/consultation">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;
