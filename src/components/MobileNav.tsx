
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronDown, MessageSquare, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const phoneNumber = "919877100369";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (servicesOpen) setServicesOpen(false);
  };

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setServicesOpen(false);
  };

  const handleWhatsAppClick = () => {
    toast.success("Opening WhatsApp", {
      description: "Connecting you to our support team"
    });
    window.open(whatsappUrl, '_blank');
    closeMenu();
  };

  const handleCallClick = () => {
    toast.success("Initiating call", {
      description: "Connecting you to our team"
    });
    window.open(`tel:${phoneNumber}`, '_blank');
    closeMenu();
  };

  const services = [
    { name: "Product Discovery", path: "/services/product-discovery" },
    { name: "Data Enrichment", path: "/services/data-enrichment" },
    { name: "SEO Services", path: "/services/seo" },
    { name: "SEM Management", path: "/services/sem" },
    { name: "Conversion Optimization", path: "/services/conversion-optimization" },
    { name: "Search Migration", path: "/services/search-migration" },
    { name: "Marketpulse", path: "/services/marketpulse" }
  ];

  return (
    <div className="md:hidden relative">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-50 relative"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60]" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <img 
              src="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" 
              alt="Stell Media Logo" 
              className="h-8 w-auto mr-2" 
            />
            <span className="font-bold text-lg bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Stell Media
            </span>
          </Link>
          <button 
            onClick={closeMenu} 
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Content */}
        <nav className="p-4 space-y-2 overflow-y-auto h-full pb-20">
          <Link
            to="/"
            className="block py-3 px-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition-colors"
            onClick={closeMenu}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="space-y-1">
            <button
              onClick={toggleServices}
              className="flex items-center justify-between w-full py-3 px-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition-colors"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {servicesOpen && (
              <div className="pl-4 space-y-1 bg-gray-50 rounded-md py-2">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block py-2 px-3 text-gray-600 hover:text-indigo-600 hover:bg-white rounded text-sm transition-colors"
                    onClick={closeMenu}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="block py-3 px-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition-colors"
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            to="/blog"
            className="block py-3 px-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition-colors"
            onClick={closeMenu}
          >
            Blog
          </Link>

          <Link
            to="/faq"
            className="block py-3 px-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition-colors"
            onClick={closeMenu}
          >
            FAQ
          </Link>

          <Link
            to="/contact"
            className="block py-3 px-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition-colors"
            onClick={closeMenu}
          >
            Contact
          </Link>

          {/* Action Buttons */}
          <div className="pt-6 space-y-3 border-t border-gray-200 mt-4">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Us
            </Button>

            <Button
              onClick={handleCallClick}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
