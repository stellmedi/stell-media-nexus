import React from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Footer = () => {
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
                <Link to="/services/product-discovery" className="text-gray-600 hover:text-indigo-600 transition-colors">Product Discovery</Link>
              </li>
              <li>
                <Link to="/services/data-enrichment" className="text-gray-600 hover:text-indigo-600 transition-colors">Data Enrichment</Link>
              </li>
              <li>
                <Link to="/services/seo" className="text-gray-600 hover:text-indigo-600 transition-colors">SEO Services</Link>
              </li>
              <li>
                <Link to="/services/sem" className="text-gray-600 hover:text-indigo-600 transition-colors">SEM Management</Link>
              </li>
              <li>
                <Link to="/services/conversion-optimization" className="text-gray-600 hover:text-indigo-600 transition-colors">Conversion Optimization</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-600 hover:text-indigo-600 transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-indigo-600 transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</Link>
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
                className="text-gray-500 hover:text-indigo-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-indigo-200 pt-8 mt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Stell Media. All rights reserved. | www.stellmedia.com</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="text-gray-500 hover:text-indigo-600 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
