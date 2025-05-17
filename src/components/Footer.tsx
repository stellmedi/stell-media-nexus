
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="about" className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Stell Media</h3>
            <p className="text-gray-400 leading-relaxed">
              We help e-commerce brands optimize product discovery and boost conversions, especially for those with large and complex catalogs.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-stell-300 transition-colors">Product Discovery</a>
              </li>
              <li>
                <a href="#" className="hover:text-stell-300 transition-colors">Search Optimization</a>
              </li>
              <li>
                <a href="#" className="hover:text-stell-300 transition-colors">SEO Services</a>
              </li>
              <li>
                <a href="#" className="hover:text-stell-300 transition-colors">SEM Management</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-stell-300 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-stell-300 transition-colors">Our Approach</a>
              </li>
              <li>
                <a href="#" className="hover:text-stell-300 transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-stell-300 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>contact@stellmedia.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 E-Commerce Drive</li>
              <li>Digital City, DC 10101</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Stell Media. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-stell-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stell-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
