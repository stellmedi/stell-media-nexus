
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Building, ShoppingCart, Target, TrendingUp, Search, Palette, Box, Users, Database, BarChart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  const [servicesOpen, setServicesOpen] = useState(false);

  const realEstateServices = [
    { title: "Lead Generation & Marketing", href: "/services/lead-generation", icon: <Target className="h-4 w-4" /> },
    { title: "Performance Marketing", href: "/services/sem", icon: <TrendingUp className="h-4 w-4" /> },
    { title: "SEO & Content Strategy", href: "/services/seo", icon: <Search className="h-4 w-4" /> },
    { title: "Creative & Branding", href: "/services/creative", icon: <Palette className="h-4 w-4" /> },
    { title: "3D Animation & Visualization", href: "/services/3d-visualization", icon: <Box className="h-4 w-4" /> },
    { title: "CRM & Lead Management", href: "/services/crm-lead-management", icon: <Users className="h-4 w-4" /> }
  ];

  const ecommerceServices = [
    { title: "Product Discovery", href: "/services/product-discovery", icon: <Search className="h-4 w-4" /> },
    { title: "Catalog SEO", href: "/services/catalog-seo", icon: <Database className="h-4 w-4" /> },
    { title: "Performance Marketing", href: "/services/ecommerce-performance-marketing", icon: <BarChart className="h-4 w-4" /> },
    { title: "Conversion Optimization", href: "/services/conversion-optimization", icon: <Zap className="h-4 w-4" /> }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setServicesOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Stell Media
            </span>
          </div>
        </div>
        
        <nav className="p-6 space-y-6">
          {/* Services with Dropdown */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Services
              <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            
            {servicesOpen && (
              <div className="mt-4 space-y-4 pl-4">
                {/* Real Estate Services */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded flex items-center justify-center">
                      <Building className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">Real Estate</span>
                  </div>
                  <div className="space-y-2 pl-8">
                    {realEstateServices.map((service) => (
                      <Link
                        key={service.title}
                        to={service.href}
                        onClick={handleLinkClick}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {service.icon}
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* E-commerce Services */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded flex items-center justify-center">
                      <ShoppingCart className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">E-commerce</span>
                  </div>
                  <div className="space-y-2 pl-8">
                    {ecommerceServices.map((service) => (
                      <Link
                        key={service.title}
                        to={service.href}
                        onClick={handleLinkClick}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        {service.icon}
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/about" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 font-medium transition-colors">
            About
          </Link>
          <Link to="/case-studies" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Case Studies
          </Link>
          <Link to="/faq" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 font-medium transition-colors">
            FAQ
          </Link>
          <Link to="/contact" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Contact
          </Link>
          
          <div className="pt-6 border-t border-gray-200">
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg">
              <Link to="/consultation" onClick={handleLinkClick}>Get Started</Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
