
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleServicesMenu = () => {
    setServicesOpen(!servicesOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-50/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" 
              alt="Stell Media Logo" 
              className="h-10 w-auto mr-3" 
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Stell Media
            </span>
          </Link>
        </div>

        {/* Desktop Navigation with Services Dropdown */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          
          {/* Services Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={toggleServicesMenu}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              Services
              {servicesOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
            </button>
            
            {servicesOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link 
                  to="/services/product-discovery" 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Product Discovery
                </Link>
                <Link 
                  to="/services/data-enrichment" 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Data Enrichment
                </Link>
                <Link 
                  to="/services/seo" 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  SEO Services
                </Link>
                <Link 
                  to="/services/sem" 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  SEM Management
                </Link>
                <Link 
                  to="/services/conversion-optimization" 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Conversion Optimization
                </Link>
                <Link 
                  to="/services/search-migration" 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Search Platform Migration
                </Link>
                <Link 
                  to="/services/marketpulse" 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Marketpulse
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
            About
          </Link>
          <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Blog
          </Link>
          <Link to="/faq" className="text-gray-600 hover:text-indigo-600 transition-colors">
            FAQ
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-50 border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            
            {/* Mobile Services Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center w-full text-left text-gray-600 hover:text-indigo-600 transition-colors py-2"
                onClick={toggleServicesMenu}
              >
                Services
                {servicesOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
              
              {servicesOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-indigo-200">
                  <Link 
                    to="/services/product-discovery" 
                    className="block py-2 text-gray-600 hover:text-indigo-600"
                    onClick={toggleMobileMenu}
                  >
                    Product Discovery
                  </Link>
                  <Link 
                    to="/services/data-enrichment" 
                    className="block py-2 text-gray-600 hover:text-indigo-600"
                    onClick={toggleMobileMenu}
                  >
                    Data Enrichment
                  </Link>
                  <Link 
                    to="/services/seo" 
                    className="block py-2 text-gray-600 hover:text-indigo-600"
                    onClick={toggleMobileMenu}
                  >
                    SEO Services
                  </Link>
                  <Link 
                    to="/services/sem" 
                    className="block py-2 text-gray-600 hover:text-indigo-600"
                    onClick={toggleMobileMenu}
                  >
                    SEM Management
                  </Link>
                  <Link 
                    to="/services/conversion-optimization" 
                    className="block py-2 text-gray-600 hover:text-indigo-600"
                    onClick={toggleMobileMenu}
                  >
                    Conversion Optimization
                  </Link>
                  <Link 
                    to="/services/search-migration" 
                    className="block py-2 text-gray-600 hover:text-indigo-600"
                    onClick={toggleMobileMenu}
                  >
                    Search Migration
                  </Link>
                  <Link 
                    to="/services/marketpulse" 
                    className="block py-2 text-gray-600 hover:text-indigo-600"
                    onClick={toggleMobileMenu}
                  >
                    Marketpulse
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              to="/about"
              className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Blog
            </Link>
            <Link
              to="/faq"
              className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
