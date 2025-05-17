
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-stell-700">
            Stell<span className="text-stell-500">Media</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-gray-600 hover:text-stell-600 transition-colors">
            Services
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-stell-600 transition-colors">
            Clients
          </a>
          <a href="#about" className="text-gray-600 hover:text-stell-600 transition-colors">
            About
          </a>
          <Button asChild variant="default" className="bg-stell-600 hover:bg-stell-700">
            <a href="#contact">Book a Consultation</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:text-stell-600 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href="#services"
              className="text-gray-600 hover:text-stell-600 transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Services
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-stell-600 transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Clients
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-stell-600 transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              About
            </a>
            <Button
              asChild
              variant="default"
              className="bg-stell-600 hover:bg-stell-700 w-full"
              onClick={toggleMobileMenu}
            >
              <a href="#contact">Book a Consultation</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
