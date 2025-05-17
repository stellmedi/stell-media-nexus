
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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

        {/* Desktop Navigation - Removed Case Studies, added FAQ */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Services
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
            About
          </Link>
          <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Blog
          </Link>
          <Link to="/faq" className="text-gray-600 hover:text-indigo-600 transition-colors">
            FAQ
          </Link>
          <Button asChild variant="default" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 text-white">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
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

      {/* Mobile Menu - Updated with new navigation order */}
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
            <Link
              to="/services"
              className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
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
            <Button
              asChild
              variant="default"
              className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 w-full"
              onClick={toggleMobileMenu}
            >
              <Link to="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
