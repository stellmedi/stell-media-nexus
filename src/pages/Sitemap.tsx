
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
        { name: "Home", path: "/", description: "Our main landing page featuring digital growth solutions for real estate & e-commerce" },
        { name: "About Us", path: "/about", description: "Learn about our company, values, and dual-industry expertise" },
        { name: "Services", path: "/services", description: "Complete overview of our real estate and e-commerce optimization solutions" },
        { name: "Case Studies", path: "/case-studies", description: "Real results achieved for our clients across both industries" },
        { name: "Blog", path: "/blog", description: "Latest insights on digital transformation and industry trends" },
        { name: "Contact", path: "/contact", description: "Get in touch with our team for any inquiries" },
        { name: "Free Consultation", path: "/consultation", description: "Schedule your free business analysis session" },
        { name: "Careers", path: "/careers", description: "Join our team of digital transformation experts" },
        { name: "FAQ", path: "/faq", description: "Answers to frequently asked questions about our services" },
      ]
    },
    {
      title: "Real Estate Services",
      links: [
        { name: "Real Estate Overview", path: "/real-estate", description: "Comprehensive real estate digital solutions" },
        { name: "Virtual Tours & Photography", path: "/real-estate", description: "Immersive property showcasing technology" },
        { name: "3D Visualization", path: "/real-estate", description: "Advanced 3D modeling and visualization services" },
        { name: "CRM & Lead Management", path: "/real-estate", description: "Customer relationship management systems" },
        { name: "Lead Generation", path: "/real-estate", description: "Automated lead generation and nurturing" },
        { name: "Marketing Automation", path: "/real-estate", description: "End-to-end marketing automation solutions" },
      ]
    },
    {
      title: "E-Commerce Services",
      links: [
        { name: "E-Commerce Overview", path: "/ecommerce", description: "Complete e-commerce optimization solutions" },
        { name: "Product Discovery Solutions", path: "/services/product-discovery", description: "Improve how customers find products on your site" },
        { name: "Data Enrichment", path: "/services/data-enrichment", description: "Enhance your product data for better customer experience" },
        { name: "SEO Services", path: "/services/seo", description: "Improve organic rankings and visibility" },
        { name: "SEM Management", path: "/services/sem", description: "Optimize your paid search campaigns for better ROI" },
        { name: "Conversion Optimization", path: "/services/conversion-optimization", description: "Turn more visitors into customers" },
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
        { from: "Virtual Tours", to: "Lead Generation", reason: "Enhanced property showcases generate more qualified leads" },
        { from: "Product Discovery", to: "Data Enrichment", reason: "Better data improves discovery experience" },
        { from: "SEO Services", to: "Conversion Optimization", reason: "Convert more of your organic traffic" },
        { from: "CRM Systems", to: "Marketing Automation", reason: "Streamline your entire sales funnel" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Helmet>
        <title>Complete Sitemap | Stell Media Digital Growth Solutions</title>
        <meta name="description" content="Explore the full structure of Stell Media's website, including our real estate and e-commerce optimization services, case studies, resources and more." />
        <link rel="canonical" href="https://www.stellmedia.com/sitemap" />
      </Helmet>
      <Navbar />
      <main className="mobile-header-spacing pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Website Sitemap
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
                Navigate through our comprehensive digital solutions for real estate and e-commerce businesses. 
                Discover all our services, resources, and ways to get in touch.
              </p>
              <Button asChild size="sm" variant="outline" className="border-indigo-300 hover:bg-indigo-100 active:bg-indigo-200">
                <Link to="/contact" className="inline-flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Contact Us For Personalized Guidance
                </Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {siteStructure.map((section, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="text-gray-700">
                        <Link 
                          to={link.path} 
                          className="flex items-start hover:text-indigo-600 transition-colors group"
                        >
                          <ArrowRight className="mr-2 h-4 w-4 mt-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm mb-12 border border-blue-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Service Combinations for Maximum Results</h2>
              <p className="text-gray-600 mb-4">
                Our clients often see the best results when combining complementary services. Here are some powerful combinations:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {crossLinkingSuggestions[0].links.map((link, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-indigo-100">
                    <div className="flex items-center mb-2 flex-wrap">
                      <span className="text-indigo-600 font-medium">{link.from}</span>
                      <ArrowRight className="mx-2 h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-indigo-600 font-medium">{link.to}</span>
                    </div>
                    <p className="text-sm text-gray-600">{link.reason}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">XML Sitemap for Search Engines</h2>
              <p className="text-gray-700 mb-4">
                For search engines and technical SEO purposes, we also provide an XML sitemap at:
              </p>
              <a 
                href="/sitemap.xml" 
                className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-6"
                target="_blank" 
                rel="noreferrer"
              >
                www.stellmedia.com/sitemap.xml <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-medium mb-3 text-gray-900">Not finding what you're looking for?</h3>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="sm" variant="default" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/faq">View FAQ</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/consultation">Free Consultation</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
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
