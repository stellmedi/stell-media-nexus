
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
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
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
          <button onClick={closeMenu} className="p-2">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-4">
          <Link
            to="/"
            className="block py-3 text-gray-700 hover:text-indigo-600 font-medium border-b border-gray-100"
            onClick={closeMenu}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div>
            <button
              onClick={toggleServices}
              className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-indigo-600 font-medium border-b border-gray-100"
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {servicesOpen && (
              <div className="pl-4 mt-2 space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block py-2 text-gray-600 hover:text-indigo-600 text-sm"
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
            className="block py-3 text-gray-700 hover:text-indigo-600 font-medium border-b border-gray-100"
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            to="/blog"
            className="block py-3 text-gray-700 hover:text-indigo-600 font-medium border-b border-gray-100"
            onClick={closeMenu}
          >
            Blog
          </Link>

          <Link
            to="/faq"
            className="block py-3 text-gray-700 hover:text-indigo-600 font-medium border-b border-gray-100"
            onClick={closeMenu}
          >
            FAQ
          </Link>

          <Link
            to="/contact"
            className="block py-3 text-gray-700 hover:text-indigo-600 font-medium border-b border-gray-100"
            onClick={closeMenu}
          >
            Contact
          </Link>

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Us
            </Button>

            <Button
              onClick={handleCallClick}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
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
