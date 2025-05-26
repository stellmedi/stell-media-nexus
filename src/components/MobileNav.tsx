
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronDown, MessageSquare, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const phoneNumber = "919877100369";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Body scroll lock effect
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const toggleMenu = () => {
    console.log('Mobile menu toggle:', !isOpen);
    setIsOpen(!isOpen);
    if (servicesOpen) setServicesOpen(false);
  };

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  const closeMenu = () => {
    console.log('Mobile menu closing');
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
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
        style={{ zIndex: 1000 }}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        type="button"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay and Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 !important"
            style={{ 
              zIndex: 998,
              position: 'fixed !important',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5) !important'
            }}
            onClick={closeMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && closeMenu()}
            aria-label="Close mobile menu"
          />
          
          {/* Menu Panel */}
          <div 
            className="fixed top-0 right-0 w-80 max-w-[90vw] bg-white shadow-xl transform translate-x-0"
            style={{ 
              zIndex: 999,
              height: '100vh',
              height: '100dvh',
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingLeft: 'env(safe-area-inset-left)',
              paddingRight: 'env(safe-area-inset-right)',
              position: 'fixed !important'
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-indigo-50">
              <Link to="/" onClick={closeMenu} className="flex items-center">
                <img 
                  src="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" 
                  alt="Stell Media Logo" 
                  className="h-8 w-auto mr-2" 
                />
                <span 
                  id="mobile-menu-title"
                  className="font-bold text-lg bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Stell Media
                </span>
              </Link>
              <button 
                onClick={closeMenu} 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
                type="button"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Navigation Content */}
            <nav 
              className="p-4 space-y-2 overflow-y-auto"
              style={{ 
                height: 'calc(100vh - 80px)',
                height: 'calc(100dvh - 80px)',
                paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))'
              }}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <Link
                to="/"
                className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors min-h-[44px] flex items-center"
                onClick={closeMenu}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={toggleServices}
                  className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors min-h-[44px]"
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services-menu"
                  type="button"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {servicesOpen && (
                  <div 
                    id="mobile-services-menu"
                    className="pl-4 space-y-1 bg-gray-50 rounded-lg py-2"
                    role="menu"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-white rounded-lg text-sm transition-colors min-h-[44px] flex items-center"
                        onClick={closeMenu}
                        role="menuitem"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors min-h-[44px] flex items-center"
                onClick={closeMenu}
              >
                About
              </Link>

              <Link
                to="/blog"
                className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors min-h-[44px] flex items-center"
                onClick={closeMenu}
              >
                Blog
              </Link>

              <Link
                to="/faq"
                className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors min-h-[44px] flex items-center"
                onClick={closeMenu}
              >
                FAQ
              </Link>

              <Link
                to="/contact"
                className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors min-h-[44px] flex items-center"
                onClick={closeMenu}
              >
                Contact
              </Link>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3 border-t border-gray-200 mt-4">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg min-h-[44px]"
                  type="button"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp Us
                </Button>

                <Button
                  onClick={handleCallClick}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 py-3 rounded-lg min-h-[44px]"
                  type="button"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNav;
