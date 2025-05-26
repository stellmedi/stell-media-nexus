
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import MobileNav from "@/components/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar: React.FC = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const isMobile = useIsMobile();
  const phoneNumber = "919877100369";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const handleWhatsAppClick = () => {
    toast.success("Opening WhatsApp", { description: "Connecting you to our support team" });
    window.open(whatsappUrl, '_blank');
  };

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  const closeServices = () => {
    setServicesOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    if (servicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setServicesOpen(false);
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleServices();
    }
  };

  // Desktop hover handlers with delay
  const handleMouseEnter = () => {
    if (!isMobile) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setServicesOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      hoverTimeoutRef.current = setTimeout(() => {
        setServicesOpen(false);
      }, 150); // Small delay to prevent flickering
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full bg-indigo-50/95 backdrop-blur-sm z-40 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center" aria-label="Stell Media home">
            <img
              src="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
              alt="Stell Media Logo"
              className="h-10 w-auto mr-3"
              width="120"
              height="40"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Stell Media
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            Home
          </Link>

          {/* Services Dropdown - Clean implementation */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={isMobile ? toggleServices : undefined}
              onKeyDown={handleKeyDown}
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              type="button"
            >
              Services <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-100"
                role="menu"
              >
                <Link
                  to="/services/product-discovery"
                  className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  role="menuitem"
                  onClick={closeServices}
                >
                  <div className="font-medium">Product Discovery</div>
                  <div className="text-xs text-gray-500">Optimize search &amp; navigation</div>
                </Link>
                <Link
                  to="/services/data-enrichment"
                  className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  role="menuitem"
                  onClick={closeServices}
                >
                  <div className="font-medium">Data Enrichment</div>
                  <div className="text-xs text-gray-500">Clean &amp; enhance product data</div>
                </Link>
                <Link
                  to="/services/seo"
                  className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  role="menuitem"
                  onClick={closeServices}
                >
                  <div className="font-medium">SEO Services</div>
                  <div className="text-xs text-gray-500">Boost organic visibility</div>
                </Link>
                <Link
                  to="/services/sem"
                  className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  role="menuitem"
                  onClick={closeServices}
                >
                  <div className="font-medium">SEM Management</div>
                  <div className="text-xs text-gray-500">Optimize paid campaigns</div>
                </Link>
                <Link
                  to="/services/conversion-optimization"
                  className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  role="menuitem"
                  onClick={closeServices}
                >
                  <div className="font-medium">Conversion Optimization</div>
                  <div className="text-xs text-gray-500">Increase conversion rates</div>
                </Link>
                <Link
                  to="/services/search-migration"
                  className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  role="menuitem"
                  onClick={closeServices}
                >
                  <div className="font-medium">Search Platform Migration</div>
                  <div className="text-xs text-gray-500">Seamless platform transitions</div>
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            About
          </Link>
          <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            Blog
          </Link>
          <Link to="/faq" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            FAQ
          </Link>

          {/* Desktop CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/contact">
              <Button variant="outline" size="sm" className="font-medium">
                Get Quote
              </Button>
            </Link>
            <Button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <MessageSquare className="h-4 w-4" /> WhatsApp
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
