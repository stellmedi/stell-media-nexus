
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
      className="lg:hidden p-2 text-foreground hover:text-primary transition-colors mobile-menu-button relative z-[60]"
      aria-label="Toggle mobile menu"
      aria-expanded={isMobileMenuOpen}
    >
      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MobileMenuButton;
