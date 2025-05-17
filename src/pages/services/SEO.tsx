
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SEOServices = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    });
  };
  
  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Strategic SEO Services
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Improve organic visibility with data-driven, technology-enhanced SEO strategies tailored for e-commerce sites with large product catalogs.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100">
                  <Link to="/contact">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="SEO Services" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our SEO Approach</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border border-gray-100 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 11-6 6v3h9l3-3"></path>
                      <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"></path>
                      <path d="m14 4 6 6"></path>
                      <path d="m18 2 4 4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Technical SEO Audits</h3>
                  <p className="text-gray-600">
                    Comprehensive analysis of your e-commerce site's structure, indexability, and performance to ensure search engines can effectively crawl and understand your content.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-100 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path>
                      <path d="M15 3v6h6"></path>
                      <path d="M10 14 8 12l-2 2"></path>
                      <path d="m18 17-2-2-2 2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Product Page Optimization</h3>
                  <p className="text-gray-600">
                    Strategic optimization of product pages with relevant keywords, schema markup, and enhanced meta data to improve visibility and click-through rates.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-100 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Category Structure Enhancement</h3>
                  <p className="text-gray-600">
                    Optimizing your site's taxonomy and category structure to improve user experience and search engine visibility for key product segments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our SEO Process</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Comprehensive Audit</h3>
                    <p className="text-gray-600">
                      We start by analyzing your current SEO performance, identifying technical issues, content gaps, and opportunities for improvement.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Strategic Planning</h3>
                    <p className="text-gray-600">
                      We develop a customized SEO strategy that aligns with your business goals and targets your most valuable product categories and keywords.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Implementation</h3>
                    <p className="text-gray-600">
                      Our team executes the strategy by improving site structure, enhancing on-page elements, and implementing technical SEO improvements.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Monitoring & Optimization</h3>
                    <p className="text-gray-600">
                      We continuously track performance metrics and refine our approach to ensure maximum visibility and ROI from your SEO investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to improve your organic visibility?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
                Let's talk about how our SEO services can help grow your e-commerce business through improved search rankings and organic traffic.
              </p>
              <Button asChild size="lg" variant="white" className="shadow-lg text-indigo-700">
                <Link to="/contact">
                  Schedule a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 mb-6">
                Get the latest SEO tips, trends, and insights delivered straight to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1" 
                  required 
                />
                <Button type="submit" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SEOServices;
