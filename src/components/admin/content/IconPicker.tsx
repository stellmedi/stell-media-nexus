import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { icons, LucideIcon } from "lucide-react";
import { Search } from "lucide-react";

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
  placeholder?: string;
}

// Common icons for quick access
const commonIcons = [
  "Home", "Settings", "User", "Mail", "Phone", "MapPin", "Calendar", "Clock",
  "Star", "Heart", "ThumbsUp", "Check", "X", "Plus", "Minus", "Edit",
  "Trash2", "Search", "Filter", "Download", "Upload", "Share", "Link",
  "Image", "Video", "File", "Folder", "Database", "Cloud", "Globe",
  "Shield", "Lock", "Key", "Eye", "EyeOff", "Bell", "MessageSquare",
  "Send", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "ChevronRight",
  "Target", "Zap", "Award", "Trophy", "Rocket", "TrendingUp", "BarChart",
  "PieChart", "Activity", "Briefcase", "Building", "Store", "ShoppingCart",
  "CreditCard", "DollarSign", "Percent", "Tag", "Gift", "Package",
  "Truck", "Plane", "Car", "Bike", "Compass", "Navigation",
  "Camera", "Mic", "Headphones", "Monitor", "Smartphone", "Tablet",
  "Wifi", "Bluetooth", "Battery", "Cpu", "HardDrive", "Server"
];

const IconPicker: React.FC<IconPickerProps> = ({ value, onChange, placeholder = "Select icon" }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const allIconNames = useMemo(() => Object.keys(icons), []);

  const filteredIcons = useMemo(() => {
    if (!search) return commonIcons;
    const searchLower = search.toLowerCase();
    return allIconNames.filter(name => 
      name.toLowerCase().includes(searchLower)
    ).slice(0, 100); // Limit results for performance
  }, [search, allIconNames]);

  const SelectedIcon = value ? (icons[value as keyof typeof icons] as LucideIcon) : null;

  const renderIcon = (iconName: string) => {
    const IconComponent = icons[iconName as keyof typeof icons] as LucideIcon;
    if (!IconComponent) return null;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            {SelectedIcon ? (
              <>
                <SelectedIcon className="h-4 w-4" />
                <span>{value}</span>
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-background border shadow-lg z-50" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-6 gap-1 p-2">
            {filteredIcons.map((iconName) => {
              const IconComponent = icons[iconName as keyof typeof icons] as LucideIcon;
              if (!IconComponent) return null;
              
              return (
                <Button
                  key={iconName}
                  variant={value === iconName ? "default" : "ghost"}
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => {
                    onChange(iconName);
                    setOpen(false);
                    setSearch("");
                  }}
                  title={iconName}
                >
                  <IconComponent className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
          {filteredIcons.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No icons found
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
