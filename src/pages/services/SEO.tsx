
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SEO = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Strategic SEO Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Improve organic visibility with data-driven SEO strategies tailored specifically for e-commerce sites with large product catalogs.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Drive Qualified Organic Traffic at Scale</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Our e-commerce SEO specialists use data-driven strategies and automation to optimize even the largest product catalogs for maximum organic visibility.
                  </p>
                  <p>
                    We focus on creating systematic approaches that scale with your business, ensuring consistent visibility improvements for your entire product range.
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild>
                    <Link to="/contact">
                      Request an SEO Audit <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2VvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                  alt="SEO Services" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>

            {/* Features */}
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our SEO Approach</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold mb-4 text-gray-900">Technical SEO Excellence</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>Comprehensive technical SEO audits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>Site structure optimization for e-commerce</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>Page speed enhancement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>Mobile optimization strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>Schema markup implementation</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold mb-4 text-gray-900">Content & On-Page Optimization</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>Automated product page optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>Category structure enhancement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>Keyword research and mapping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>Content gap analysis and creation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 mr-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span>URL structure optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Teaser */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our SEO Results</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Fashion Retailer</h3>
                <p className="text-gray-600 mb-4">Increased organic traffic by 187% through systematic product page optimization and technical SEO improvements.</p>
                <p className="font-semibold text-indigo-600">+187% Organic Traffic</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Home Goods Store</h3>
                <p className="text-gray-600 mb-4">Doubled organic conversions through optimized category structure and enhanced product content.</p>
                <p className="font-semibold text-indigo-600">+103% Conversion Rate</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Electronics Retailer</h3>
                <p className="text-gray-600 mb-4">Achieved 62% higher rankings for competitive product keywords through technical SEO and content optimization.</p>
                <p className="font-semibold text-indigo-600">+62% Higher Rankings</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to improve your organic visibility?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Let our e-commerce SEO specialists help you drive more qualified traffic and conversions through strategic optimization.
              </p>
              <Button asChild size="lg" variant="cta" className="shadow-xl">
                <Link to="/contact">
                  Get Your SEO Strategy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SEO;
