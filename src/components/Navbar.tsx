
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Building, ShoppingCart, Camera, Box, Users, Target, Search, Database, BarChart, Zap } from "lucide-react";
import MobileNav from "./MobileNav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const realEstateServices = [
    {
      title: "Virtual Tours & Photography",
      href: "/real-estate",
      description: "360° virtual tours and professional photography",
      icon: <Camera className="h-4 w-4" />
    },
    {
      title: "3D Visualization",
      href: "/real-estate",
      description: "Stunning 3D animations and architectural visualization",
      icon: <Box className="h-4 w-4" />
    },
    {
      title: "CRM & Lead Management",
      href: "/real-estate",
      description: "Complete customer relationship management systems",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Lead Generation",
      href: "/real-estate",
      description: "Automated lead generation and marketing campaigns",
      icon: <Target className="h-4 w-4" />
    }
  ];

  const ecommerceServices = [
    {
      title: "Product Discovery",
      href: "/ecommerce",
      description: "Advanced product discovery and search optimization",
      icon: <Search className="h-4 w-4" />
    },
    {
      title: "Catalog SEO",
      href: "/ecommerce",
      description: "Large-scale catalog optimization and data enrichment",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "Performance Marketing",
      href: "/ecommerce",
      description: "Data-driven performance marketing campaigns",
      icon: <BarChart className="h-4 w-4" />
    },
    {
      title: "Conversion Optimization",
      href: "/ecommerce",
      description: "Comprehensive conversion rate optimization",
      icon: <Zap className="h-4 w-4" />
    }
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50" 
          : "bg-white/90 backdrop-blur-sm"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png" 
                alt="Stell Media Logo" 
                className="h-10 w-10 object-cover rounded-lg"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Stell Media
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium">
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[800px] grid-cols-2">
                        {/* Real Estate Services */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                              <Building className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Real Estate Services</h3>
                          </div>
                          {realEstateServices.map((service) => (
                            <NavigationMenuLink key={service.title} asChild>
                              <Link
                                to={service.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700"
                              >
                                <div className="flex items-center gap-2 text-sm font-medium">
                                  {service.icon}
                                  {service.title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                  {service.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>

                        {/* E-commerce Services */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                              <ShoppingCart className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900">E-commerce Services</h3>
                          </div>
                          {ecommerceServices.map((service) => (
                            <NavigationMenuLink key={service.title} asChild>
                              <Link
                                to={service.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-50 hover:text-purple-700 focus:bg-purple-50 focus:text-purple-700"
                              >
                                <div className="flex items-center gap-2 text-sm font-medium">
                                  {service.icon}
                                  {service.title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                  {service.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link 
                to="/about" 
                className={cn(
                  "text-gray-700 hover:text-blue-600 font-medium transition-colors",
                  location.pathname === "/about" && "text-blue-600"
                )}
              >
                About
              </Link>
              <Link 
                to="/case-studies" 
                className={cn(
                  "text-gray-700 hover:text-blue-600 font-medium transition-colors",
                  location.pathname === "/case-studies" && "text-blue-600"
                )}
              >
                Case Studies
              </Link>
              <Link 
                to="/faq" 
                className={cn(
                  "text-gray-700 hover:text-blue-600 font-medium transition-colors",
                  location.pathname === "/faq" && "text-blue-600"
                )}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className={cn(
                  "text-gray-700 hover:text-blue-600 font-medium transition-colors",
                  location.pathname === "/contact" && "text-blue-600"
                )}
              >
                Contact
              </Link>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/consultation">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
};

export default Navbar;
