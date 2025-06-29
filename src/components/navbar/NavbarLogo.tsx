
import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
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
  );
};

export default NavbarLogo;
