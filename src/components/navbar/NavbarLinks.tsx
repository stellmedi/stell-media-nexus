
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavbarLinks = () => {
  const location = useLocation();

  const links = [
    { to: "/about", label: "About" },
    { to: "/case-studies", label: "Case Studies" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={cn(
            "text-gray-700 hover:text-blue-600 font-medium transition-colors text-base",
            location.pathname === link.to && "text-blue-600"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default NavbarLinks;
