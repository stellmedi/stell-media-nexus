
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string, linkName: string) => {
    // Show toast notification
    toast({
      title: "Navigating...",
      description: `Going to ${linkName}`,
      duration: 2000,
    });

    // Navigate to the path
    navigate(path);
    
    // Scroll to top with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer id="about" className="bg-indigo-50 text-gray-700 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" 
                alt="Stell Media Logo" 
                className="h-8" 
              />
              <h3 className="text-xl font-bold text-gray-900">Stell Media</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We help e-commerce brands optimize product discovery and boost conversions, especially for those with large and complex catalogs.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/product-discovery", "Product Discovery")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  Product Discovery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/data-enrichment", "Data Enrichment")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  Data Enrichment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/seo", "SEO Services")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  SEO Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/sem", "SEM Management")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  SEM Management
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/conversion-optimization", "Conversion Optimization")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  Conversion Optimization
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleLinkClick("/about", "About Us")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/case-studies", "Case Studies")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/blog", "Blog")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/careers", "Careers")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/contact", "Contact")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>info@stellmedia.com</li>
              <li>+91 98771 00369</li>
              <li>Zirakpur, SAS Nagar(Mohali),</li>
              <li>Punjab, India</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/stellmediadigital/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-indigo-600 transition-colors active:scale-95 transform"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-indigo-600 transition-colors active:scale-95 transform"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-indigo-600 transition-colors active:scale-95 transform"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-indigo-200 pt-8 mt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Stell Media. All rights reserved. | www.stellmedia.com</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button 
              onClick={() => handleLinkClick("/privacy", "Privacy Policy")}
              className="text-gray-500 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleLinkClick("/terms", "Terms of Service")}
              className="text-gray-500 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleLinkClick("/sitemap", "Sitemap")}
              className="text-gray-500 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
