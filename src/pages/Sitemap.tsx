
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Sitemap = () => {
  // Define all website sections
  const siteStructure = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Blog", path: "/blog" },
        { name: "Case Studies", path: "/case-studies" },
        { name: "Contact", path: "/contact" },
        { name: "Consultation", path: "/consultation" },
        { name: "Careers", path: "/careers" },
        { name: "FAQ", path: "/faq" },
      ]
    },
    {
      title: "Services",
      links: [
        { name: "All Services", path: "/services" },
        { name: "Product Discovery", path: "/services/product-discovery" },
        { name: "Data Enrichment", path: "/services/data-enrichment" },
        { name: "SEO Services", path: "/services/seo" },
        { name: "SEM Management", path: "/services/sem" },
        { name: "Conversion Optimization", path: "/services/conversion-optimization" },
        { name: "Search Platform Migration", path: "/services/search-migration" },
        { name: "Marketpulse", path: "/services/marketpulse" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Sitemap | Stell Media</title>
        <meta name="description" content="View a complete map of all pages on the Stell Media website." />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Sitemap</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              {siteStructure.map((section, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="text-gray-700">
                        <Link 
                          to={link.path} 
                          className="flex items-center hover:text-indigo-600 transition-colors"
                        >
                          <ArrowRight className="mr-2 h-4 w-4" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">XML Sitemap</h2>
              <p className="text-gray-700">
                For search engines, we also provide an XML sitemap at:
              </p>
              <a 
                href="https://www.stellmedia.com/sitemap.xml" 
                className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
                target="_blank" 
                rel="noreferrer"
              >
                www.stellmedia.com/sitemap.xml
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;
