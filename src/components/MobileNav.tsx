
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
    { name: "Search Migration", path: "/services/search-migration" }
  ];

  return (
    <div className="md:hidden relative">
      {/* Mobile Menu Button - Fixed z-index */}
      <button
        onClick={toggleMenu}
        className="p-3 rounded-lg bg-indigo-600 text-white shadow-lg border-2 border-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 z-[60] relative transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        type="button"
      >
        {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-[70]" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-[80] transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
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
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            aria-label="Close menu"
            type="button"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation Content */}
        <nav className="p-6 space-y-2 overflow-y-auto h-full pb-24">
          <Link
            to="/"
            className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
            onClick={closeMenu}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="space-y-1">
            <button
              onClick={toggleServices}
              className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200 min-h-[48px]"
              aria-expanded={servicesOpen}
              type="button"
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {servicesOpen && (
              <div className="pl-4 space-y-1 bg-gray-50 rounded-lg py-3 border-l-2 border-indigo-200 animate-slide-up">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block py-3 px-4 text-gray-600 hover:text-indigo-600 hover:bg-white rounded-lg text-sm transition-all duration-200 min-h-[40px] flex items-center"
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
            className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            to="/blog"
            className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
            onClick={closeMenu}
          >
            Blog
          </Link>

          <Link
            to="/faq"
            className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
            onClick={closeMenu}
          >
            FAQ
          </Link>

          <Link
            to="/contact"
            className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
            onClick={closeMenu}
          >
            Contact
          </Link>

          {/* Action Buttons */}
          <div className="pt-6 space-y-3 border-t border-gray-200 mt-6">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md min-h-[48px]"
              type="button"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Us
            </Button>

            <Button
              onClick={handleCallClick}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 py-3 rounded-lg min-h-[48px]"
              type="button"
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
