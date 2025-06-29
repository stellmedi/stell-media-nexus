
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ServicesDropdown from "./ServicesDropdown";
import NavbarLinks from "./NavbarLinks";

const DesktopNavigation = () => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      <NavigationMenu>
        <NavigationMenuList>
          <ServicesDropdown />
        </NavigationMenuList>
      </NavigationMenu>
      <NavbarLinks />
    </div>
  );
};

export default DesktopNavigation;
