
import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
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
                <Link 
                  to="/real-estate"
                  className="text-gray-600 hover:text-blue-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-blue-50"
                >
                  Virtual Tours & Photography
                </Link>
              </li>
              <li>
                <Link 
                  to="/real-estate"
                  className="text-gray-600 hover:text-blue-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-blue-50"
                >
                  3D Visualization & Animation
                </Link>
              </li>
              <li>
                <Link 
                  to="/real-estate"
                  className="text-gray-600 hover:text-blue-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-blue-50"
                >
                  CRM & Lead Management
                </Link>
              </li>
              <li>
                <Link 
                  to="/real-estate"
                  className="text-gray-600 hover:text-blue-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-blue-50"
                >
                  Lead Generation & Marketing
                </Link>
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
                <Link 
                  to="/ecommerce"
                  className="text-gray-600 hover:text-purple-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-purple-50"
                >
                  Product Discovery Management
                </Link>
              </li>
              <li>
                <Link 
                  to="/ecommerce"
                  className="text-gray-600 hover:text-purple-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-purple-50"
                >
                  Catalog SEO & Data Enrichment
                </Link>
              </li>
              <li>
                <Link 
                  to="/ecommerce"
                  className="text-gray-600 hover:text-purple-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-purple-50"
                >
                  Performance Marketing
                </Link>
              </li>
              <li>
                <Link 
                  to="/ecommerce"
                  className="text-gray-600 hover:text-purple-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-purple-50"
                >
                  Conversion Optimization
                </Link>
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
                <Link 
                  to="/about"
                  className="text-gray-600 hover:text-indigo-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-indigo-50"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/case-studies"
                  className="text-gray-600 hover:text-indigo-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-indigo-50"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog"
                  className="text-gray-600 hover:text-indigo-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-indigo-50"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact"
                  className="text-gray-600 hover:text-indigo-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-indigo-50"
                >
                  Contact
                </Link>
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
