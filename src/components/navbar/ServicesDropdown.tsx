
import React from "react";
import { Link } from "react-router-dom";
import { Building, ShoppingCart } from "lucide-react";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { realEstateServices, ecommerceServices } from "./navbarData";

const ServicesDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium text-base">
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
  );
};

export default ServicesDropdown;
