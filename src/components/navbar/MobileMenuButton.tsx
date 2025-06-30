
import React from "react";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  onToggle: () => void;
}

const MobileMenuButton = ({ isMobileMenuOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors mobile-menu-button"
      aria-label="Toggle mobile menu"
    >
      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MobileMenuButton;
