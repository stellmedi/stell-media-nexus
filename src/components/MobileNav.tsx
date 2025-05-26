import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronDown, MessageSquare, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const phoneNumber = "919877100369";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Enhanced body scroll lock with position saving
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      
      // Apply scroll lock
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      return () => {
        // Restore scroll position and remove lock
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        window.scrollTo(0, currentScrollY);
      };
    }
  }, [isOpen]);

  // Enhanced escape key handler
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

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const firstButton = document.querySelector('[role="dialog"] button, [role="dialog"] a');
      if (firstButton instanceof HTMLElement) {
        firstButton.focus();
      }
    }
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    console.log('Mobile menu toggle:', !isOpen);
    setIsOpen(!isOpen);
    if (servicesOpen) setServicesOpen(false);
  }, [isOpen, servicesOpen]);

  const toggleServices = useCallback(() => {
    setServicesOpen(!servicesOpen);
  }, []);

  const closeMenu = useCallback(() => {
    console.log('Mobile menu closing');
    setIsOpen(false);
    setServicesOpen(false);
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    toast.success("Opening WhatsApp", {
      description: "Connecting you to our support team"
    });
    window.open(whatsappUrl, '_blank');
    closeMenu();
  }, [whatsappUrl, closeMenu]);

  const handleCallClick = useCallback(() => {
    toast.success("Initiating call", {
      description: "Connecting you to our team"
    });
    window.open(`tel:${phoneNumber}`, '_blank');
    closeMenu();
  }, [phoneNumber, closeMenu]);

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
        className="relative p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center z-[1000]"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        type="button"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay and Panel */}
      {isOpen && (
        <>
          {/* Backdrop with animation */}
          <div 
            className={`fixed inset-0 bg-black/50 z-[998] transition-opacity duration-300 ease-out ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && closeMenu()}
            aria-label="Close mobile menu"
          />
          
          {/* Menu Panel with slide animation */}
          <div 
            className={`fixed top-0 right-0 w-80 max-w-[90vw] bg-white shadow-xl z-[999] transition-transform duration-300 ease-out will-change-transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ 
              height: '100dvh',
              paddingTop: 'max(env(safe-area-inset-top, 0px), 0px)',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0px)',
              paddingLeft: 'max(env(safe-area-inset-left, 0px), 0px)',
              paddingRight: 'max(env(safe-area-inset-right, 0px), 0px)',
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
                height: 'calc(100dvh - 80px)',
                paddingBottom: 'calc(2rem + max(env(safe-area-inset-bottom, 0px), 0px))'
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
                    className="pl-4 space-y-1 bg-gray-50 rounded-lg py-2 animate-fade-in"
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
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg min-h-[44px] transition-colors"
                  type="button"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp Us
                </Button>

                <Button
                  onClick={handleCallClick}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 py-3 rounded-lg min-h-[44px] transition-colors"
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
