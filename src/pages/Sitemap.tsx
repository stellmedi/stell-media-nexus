
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sitemap = () => {
  // Define all website sections with improved organization and interlinking
  const siteStructure = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/", description: "Our main landing page featuring our e-commerce optimization services" },
        { name: "About Us", path: "/about", description: "Learn about our company, founder, and values" },
        { name: "Blog", path: "/blog", description: "Latest insights on e-commerce optimization and industry trends" },
        { name: "Case Studies", path: "/case-studies", description: "Real results achieved for our clients across various industries" },
        { name: "Contact", path: "/contact", description: "Get in touch with our team for any inquiries" },
        { name: "Free Consultation", path: "/consultation", description: "Schedule your free e-commerce analysis session" },
        { name: "Careers", path: "/careers", description: "Join our team of e-commerce optimization experts" },
        { name: "FAQ", path: "/faq", description: "Answers to frequently asked questions about our services" },
      ]
    },
    {
      title: "E-Commerce Services",
      links: [
        { name: "All Services Overview", path: "/services", description: "Complete overview of our e-commerce optimization solutions" },
        { name: "Product Discovery Solutions", path: "/services/product-discovery", description: "Improve how customers find products on your site" },
        { name: "Data Enrichment", path: "/services/data-enrichment", description: "Enhance your product data for better customer experience" },
        { name: "SEO Services", path: "/services/seo", description: "Improve organic rankings and visibility" },
        { name: "SEM Management", path: "/services/sem", description: "Optimize your paid search campaigns for better ROI" },
        { name: "Conversion Optimization", path: "/services/conversion-optimization", description: "Turn more visitors into customers" },
        { name: "Search Platform Migration", path: "/services/search-migration", description: "Seamlessly transition between search technologies" },
        { name: "Marketpulse", path: "/services/marketpulse", description: "Marketplace optimization for Amazon and other platforms" },
      ]
    },
    {
      title: "Case Study Categories",
      links: [
        { name: "Electronics Search", path: "/case-studies/electronics-search", description: "How we improved search for electronics retailers" },
        { name: "Platform Migration", path: "/case-studies/search-platform-migration", description: "Successful migrations between search platforms" },
        { name: "Amazon Marketplace", path: "/case-studies/amazon-marketplace", description: "Optimization for marketplace sellers" },
        { name: "Performance Marketing", path: "/case-studies/performance-marketing", description: "ROI-focused marketing campaign results" },
      ]
    },
    {
      title: "Legal & Info",
      links: [
        { name: "Privacy Policy", path: "/privacy", description: "Our privacy practices and data handling" },
        { name: "Terms of Service", path: "/terms", description: "Terms governing use of our services" },
        { name: "Sitemap", path: "/sitemap", description: "This page - full navigation structure" },
      ]
    }
  ];

  // Strategic cross-linking opportunities
  const crossLinkingSuggestions = [
    {
      title: "Popular Service Combinations",
      links: [
        { from: "Product Discovery", to: "Data Enrichment", reason: "Better data improves discovery" },
        { from: "SEO Services", to: "Conversion Optimization", reason: "Convert more of your organic traffic" },
        { from: "SEM Management", to: "Search Platform Migration", reason: "Optimize your internal search to match ad campaigns" },
        { from: "Marketpulse", to: "Data Enrichment", reason: "Better product data performs better on marketplaces" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Complete Sitemap | Stell Media E-Commerce Optimization Services</title>
        <meta name="description" content="Explore the full structure of Stell Media's website, including our e-commerce optimization services, case studies, resources and more." />
        <link rel="canonical" href="https://www.stellmedia.com/sitemap" />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Sitemap</h1>
              <p className="text-lg text-gray-600 mb-6">
                Welcome to our complete sitemap. Use this page to navigate to any section of our website or discover related services 
                that might benefit your e-commerce business.
              </p>
              <Button asChild size="sm" variant="outline" className="border-indigo-300 hover:bg-indigo-100 active:bg-indigo-200">
                <Link to="/contact" className="inline-flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Contact Us For Personalized Guidance
                </Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {siteStructure.map((section, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="text-gray-700">
                        <Link 
                          to={link.path} 
                          className="flex items-start hover:text-indigo-600 transition-colors group"
                        >
                          <ArrowRight className="mr-2 h-4 w-4 mt-1 group-hover:translate-x-1 transition-transform" />
                          <div>
                            <span className="font-medium">{link.name}</span>
                            {link.description && (
                              <p className="text-sm text-gray-500 mt-0.5">{link.description}</p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Cross-linking suggestions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm mb-12">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Service Combinations for Maximum Results</h2>
              <p className="text-gray-600 mb-4">
                Our clients often see the best results when combining complementary services. Here are some powerful combinations:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {crossLinkingSuggestions[0].links.map((link, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-indigo-100">
                    <div className="flex items-center mb-2">
                      <Link to={`/services/${link.from.toLowerCase().replace(/\s+/g, '-')}`} className="text-indigo-600 hover:underline font-medium">{link.from}</Link>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2 text-gray-400"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      <Link to={`/services/${link.to.toLowerCase().replace(/\s+/g, '-')}`} className="text-indigo-600 hover:underline font-medium">{link.to}</Link>
                    </div>
                    <p className="text-sm text-gray-600">{link.reason}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">XML Sitemap for Search Engines</h2>
              <p className="text-gray-700">
                For search engines and technical SEO purposes, we also provide an XML sitemap at:
              </p>
              <a 
                href="https://www.stellmedia.com/sitemap.xml" 
                className="text-indigo-600 hover:text-indigo-800 mt-2 inline-flex items-center"
                target="_blank" 
                rel="noreferrer"
              >
                www.stellmedia.com/sitemap.xml <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-medium mb-2 text-gray-900">Not finding what you're looking for?</h3>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="sm" variant="secondary">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/faq">View FAQ</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/">Return to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;
