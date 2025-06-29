
import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const CompanyLinks = () => {
  return (
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
  );
};

export default CompanyLinks;
