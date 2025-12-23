import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCaseStudies } from "@/hooks/useCaseStudies";
import { Skeleton } from "@/components/ui/skeleton";

const CaseStudies = () => {
  const { data: caseStudies, isLoading, error } = useCaseStudies();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>Case Studies - Digital Marketing Success Stories | Stell Media</title>
        <meta name="description" content="Explore our case studies showcasing successful digital marketing campaigns for real estate and e-commerce clients. See measurable results and growth strategies." />
        <meta name="keywords" content="case studies, digital marketing results, real estate marketing, ecommerce growth, success stories" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="mobile-hero-spacing pb-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-indigo-100"
        style={{ 
          paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Success Stories & Case Studies
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover how we've helped real estate developers and e-commerce brands achieve remarkable growth through strategic digital marketing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Failed to load case studies. Please try again later.</p>
            </div>
          ) : caseStudies && caseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <Card key={study.id} className="group hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-indigo-300 bg-white/80 backdrop-blur-sm hover:bg-white overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={study.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <CardHeader className="bg-gradient-to-br from-white to-gray-50/50 border-b border-gray-100">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {study.category && (
                        <Badge variant="outline" className="text-xs bg-indigo-50 border-indigo-200 text-indigo-700">
                          {study.category}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
                      {study.title}
                    </CardTitle>
                    {study.client && (
                      <p className="text-sm text-gray-500">{study.client}</p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="bg-gradient-to-b from-white to-gray-50/30">
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {study.description}
                    </p>
                    
                    {/* Key Results */}
                    {study.results && study.results.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {study.results.slice(0, 4).map((result, index) => (
                          <div key={index} className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm">
                            <div className="font-bold text-lg text-indigo-600">{result.metric}</div>
                            <div className="text-xs text-gray-500">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button asChild className="w-full group-hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                      <Link to={`/case-studies/${study.slug}`}>
                        View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No case studies available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 border-t border-indigo-200">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your business
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl">
              <Link to="/consultation">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;
