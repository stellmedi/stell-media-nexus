
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                About Stell Media
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're a digital-first company that combines the power of technology with human expertise to deliver transformative optimization solutions for e-commerce businesses seeking growth and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story - Updated with founder info and office environment image */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Stell Media Team in a collaborative workspace" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Founder's Journey</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    With over 18 years of global experience leading digital transformation, marketing optimization, automation, and strategic innovation across Fortune 500 companies and high-growth enterprises, our founder Saurav Bansal established Stell Media to solve real-world growth challenges at scale.
                  </p>
                  <p>
                    In his past engagements, Saurav has worked with <Link to="/case-studies" className="text-indigo-600 hover:underline">Fortune 500 clients</Link> across the globe in various leadership roles, including managing tech optimization centers and leading digital operations and automation teams for major brands.
                  </p>
                  <p>
                    Throughout his career, Saurav has delivered end-to-end digital optimization solutions, operational transformations, and <Link to="/services/sem" className="text-indigo-600 hover:underline">marketing strategies</Link> across Europe, North America, and Asia—working with global sportswear companies, leading computer manufacturers, and top telecommunications providers.
                  </p>
                  <p>
                    These experiences inspired him to create Stell Media Group—a digital-first company with full-stack optimization capabilities, specialized <Link to="/services" className="text-indigo-600 hover:underline">e-commerce solutions</Link> focusing on product discovery optimization, SEO, performance marketing, and automation to help businesses worldwide grow faster and scale smarter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section - Updated with diverse Indian professionals image */}
        <section className="py-16 bg-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Meet Our Team</h2>
              <p className="text-lg text-gray-600">
                Our diverse team of experts brings together decades of experience across e-commerce optimization, search enhancement, data science, and digital marketing to deliver exceptional results.
              </p>
            </div>
            
            <div className="relative mb-12">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&w=1200&q=85" 
                alt="Diverse team of young Indian professionals collaborating in a modern office environment" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Our Culture</h3>
                <p className="text-gray-600 mb-4">
                  At Stell Media, we foster a culture of innovation, collaboration, and continuous learning. We believe in pushing boundaries, challenging assumptions, and always putting our clients' optimization success first.
                </p>
                <p className="text-gray-600">
                  Our team thrives in an environment that encourages experimentation, values diverse perspectives, and celebrates both the wins and the lessons learned along the way. We're passionate about helping e-commerce brands unlock their full potential through data-driven optimization strategies and cutting-edge technology solutions.
                </p>
                <div className="mt-4">
                  <Link to="/careers" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                    Join our team <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Our Expertise</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                    <span>
                      <strong className="text-gray-900">E-Commerce Optimization:</strong> Specialized in <Link to="/services/product-discovery" className="text-indigo-600 hover:underline">product discovery optimization</Link> and <Link to="/services/conversion-optimization" className="text-indigo-600 hover:underline">conversion rate enhancement</Link>.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                    <span>
                      <strong className="text-gray-900">Search Optimization:</strong> Experts in <Link to="/services/search-migration" className="text-indigo-600 hover:underline">search platform optimization</Link> and configuration across major e-commerce platforms.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                    <span>
                      <strong className="text-gray-900">Digital Marketing:</strong> Comprehensive <Link to="/services/seo" className="text-indigo-600 hover:underline">SEO optimization services</Link> and <Link to="/services/sem" className="text-indigo-600 hover:underline">SEM management</Link> with proven ROI.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                    <span>
                      <strong className="text-gray-900">Data Science:</strong> Advanced <Link to="/services/data-enrichment" className="text-indigo-600 hover:underline">data optimization</Link> and analytics capabilities to drive business insights.
                    </span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link to="/case-studies" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                    See our case studies <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Technology-Driven Optimization</h3>
                <p className="text-gray-600">
                  We leverage cutting-edge technology optimization solutions that continuously learn, adapt, and improve based on real data and user behavior to deliver exceptional results.
                </p>
                <div className="mt-4">
                  <Link to="/services/product-discovery" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Learn about our optimization approach →
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                    <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Human-Enhanced Configuration</h3>
                <p className="text-gray-600">
                  We optimize and configure to enhance human experiences, not replace them. Our optimization solutions combine with human expertise to make shopping more intuitive and personalized.
                </p>
                <div className="mt-4">
                  <Link to="/services/data-enrichment" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Explore our optimization approach →
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Hybrid Excellence</h3>
                <p className="text-gray-600">
                  We create seamless optimized experiences that transcend channels, combining the best of digital optimization with the human touch of physical retail.
                </p>
                <div className="mt-4">
                  <Link to="/services/conversion-optimization" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    See how we optimize →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Updated with internal links */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Growing Team</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                We're always looking for talented individuals passionate about <Link to="/services/product-discovery" className="text-white hover:text-blue-100 underline">e-commerce optimization</Link>, <Link to="/services/conversion-optimization" className="text-white hover:text-blue-100 underline">technology innovation</Link>, <Link to="/services/data-enrichment" className="text-white hover:text-blue-100 underline">automation</Link>, and <Link to="/services/seo" className="text-white hover:text-blue-100 underline">creative optimization solutions</Link>.
              </p>
              <Button asChild size="lg" variant="cta" className="shadow-xl bg-white text-indigo-700">
                <Link to="/careers">
                  View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
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

export default About;
