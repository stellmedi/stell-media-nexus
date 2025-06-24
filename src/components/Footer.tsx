
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Newsletter subscription received!",
      description: "Thank you for subscribing to our newsletter.",
      duration: 3000,
    });
  };

  return (
    <footer id="about" className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 text-gray-700 py-16">
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
              Your trusted digital growth partner specializing in real estate and e-commerce solutions worldwide.
            </p>
            
            {/* Newsletter subscription */}
            <div className="mt-6 pt-4 border-t border-indigo-200">
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium w-full shadow-lg"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-200 shadow-lg">
            <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Real Estate Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/virtual-tours", "Virtual Tours")}
                  className="text-gray-600 hover:text-blue-600 transition-colors active:bg-blue-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  Virtual Tours & Photography
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/3d-visualization", "3D Visualization")}
                  className="text-gray-600 hover:text-blue-600 transition-colors active:bg-blue-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  3D Visualization & Animation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/crm-lead-management", "CRM & Lead Management")}
                  className="text-gray-600 hover:text-blue-600 transition-colors active:bg-blue-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  CRM & Lead Management
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/lead-generation", "Lead Generation")}
                  className="text-gray-600 hover:text-blue-600 transition-colors active:bg-blue-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  Lead Generation & Marketing
                </button>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-200 shadow-lg">
            <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              E-Commerce Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/product-discovery", "Product Discovery")}
                  className="text-gray-600 hover:text-purple-600 transition-colors active:bg-purple-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  Product Discovery Management
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/data-enrichment", "Data Enrichment")}
                  className="text-gray-600 hover:text-purple-600 transition-colors active:bg-purple-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  Catalog SEO & Data Enrichment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/sem", "Performance Marketing")}
                  className="text-gray-600 hover:text-purple-600 transition-colors active:bg-purple-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  Performance Marketing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/services/conversion-optimization", "Conversion Optimization")}
                  className="text-gray-600 hover:text-purple-600 transition-colors active:bg-purple-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  Conversion Optimization
                </button>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-indigo-200 shadow-lg">
            <h4 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              Company
            </h4>
            <ul className="space-y-2 mb-6">
              <li>
                <button 
                  onClick={() => handleLinkClick("/about", "About Us")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/case-studies", "Case Studies")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/blog", "Blog")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/contact", "Contact")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors active:bg-indigo-100 rounded px-2 py-1 -ml-2 w-full text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
            
            <div className="pt-4 border-t border-indigo-200">
              <p className="text-sm text-gray-600 mb-2">
                <a href="mailto:info@stellmedia.com" className="hover:text-indigo-600 transition-colors">
                  info@stellmedia.com
                </a>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <a href="tel:+919877100369" className="hover:text-indigo-600 transition-colors">
                  +91 98771 00369
                </a>
              </p>
              <p className="text-sm text-gray-600">Punjab, India</p>
            </div>
            
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
        
        <div className="border-t-2 border-gradient-to-r from-indigo-200 via-purple-200 to-blue-200 pt-8 mt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center bg-white/40 backdrop-blur-sm rounded-lg p-4">
          <p>© {new Date().getFullYear()} Stell Media. All rights reserved. | www.stellmedia.com</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-indigo-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-indigo-600 transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-500 hover:text-indigo-600 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
