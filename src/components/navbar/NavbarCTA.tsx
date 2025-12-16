import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const NavbarCTA = () => {
  return <>
      <div className="hidden lg:block">
        <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <Link to="/consultation" aria-label="Get started" className="px-[20px] mx-[20px]">Get Started</Link>
        </Button>
      </div>
      <div className="lg:hidden">
        <Button asChild size="sm" variant="default" className="px-3">
          <Link to="/consultation" aria-label="Get started">Start</Link>
        </Button>
      </div>
    </>;
};
export default NavbarCTA;