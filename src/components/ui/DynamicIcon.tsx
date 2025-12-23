import React from "react";
import { icons, LucideIcon } from "lucide-react";

interface DynamicIconProps {
  name?: string;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * Renders a Lucide icon by name from the database
 * Falls back to a default or null if icon not found
 */
const DynamicIcon: React.FC<DynamicIconProps> = ({ 
  name, 
  className = "h-6 w-6",
  fallback = null 
}) => {
  if (!name) return <>{fallback}</>;
  
  const IconComponent = icons[name as keyof typeof icons] as LucideIcon;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return <>{fallback}</>;
  }
  
  return <IconComponent className={className} />;
};

export default DynamicIcon;
