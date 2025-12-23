import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Paintbrush } from "lucide-react";

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  label?: string;
}

// Predefined color palette with Tailwind-compatible colors
const colorPalette = [
  // Blues
  { name: "blue-500", hex: "#3b82f6" },
  { name: "blue-600", hex: "#2563eb" },
  { name: "blue-700", hex: "#1d4ed8" },
  { name: "indigo-500", hex: "#6366f1" },
  { name: "indigo-600", hex: "#4f46e5" },
  // Purples
  { name: "purple-500", hex: "#a855f7" },
  { name: "purple-600", hex: "#9333ea" },
  { name: "violet-500", hex: "#8b5cf6" },
  { name: "violet-600", hex: "#7c3aed" },
  // Pinks
  { name: "pink-500", hex: "#ec4899" },
  { name: "pink-600", hex: "#db2777" },
  { name: "rose-500", hex: "#f43f5e" },
  { name: "rose-600", hex: "#e11d48" },
  // Reds
  { name: "red-500", hex: "#ef4444" },
  { name: "red-600", hex: "#dc2626" },
  // Oranges
  { name: "orange-500", hex: "#f97316" },
  { name: "orange-600", hex: "#ea580c" },
  { name: "amber-500", hex: "#f59e0b" },
  { name: "amber-600", hex: "#d97706" },
  // Greens
  { name: "green-500", hex: "#22c55e" },
  { name: "green-600", hex: "#16a34a" },
  { name: "emerald-500", hex: "#10b981" },
  { name: "emerald-600", hex: "#059669" },
  { name: "teal-500", hex: "#14b8a6" },
  { name: "teal-600", hex: "#0d9488" },
  // Cyans
  { name: "cyan-500", hex: "#06b6d4" },
  { name: "cyan-600", hex: "#0891b2" },
  { name: "sky-500", hex: "#0ea5e9" },
  { name: "sky-600", hex: "#0284c7" },
  // Grays
  { name: "gray-500", hex: "#6b7280" },
  { name: "gray-600", hex: "#4b5563" },
  { name: "slate-500", hex: "#64748b" },
  { name: "slate-600", hex: "#475569" },
  { name: "zinc-500", hex: "#71717a" },
  { name: "zinc-600", hex: "#52525b" },
];

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label = "Color" }) => {
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("");

  const handleColorSelect = (hex: string) => {
    onChange(hex);
    setOpen(false);
  };

  const handleCustomColorSubmit = () => {
    if (customColor && /^#[0-9A-Fa-f]{6}$/.test(customColor)) {
      onChange(customColor);
      setCustomColor("");
      setOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start"
          >
            <div className="flex items-center gap-2">
              <div 
                className="h-5 w-5 rounded border"
                style={{ backgroundColor: value || "#e5e7eb" }}
              />
              <span className="text-sm">
                {value || "Select color"}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-3 bg-background border shadow-lg z-50" align="start">
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-1.5">
              {colorPalette.map((color) => (
                <button
                  key={color.name}
                  className={`h-8 w-8 rounded-md border-2 transition-transform hover:scale-110 ${
                    value === color.hex ? "border-foreground ring-2 ring-primary" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorSelect(color.hex)}
                  title={color.name}
                />
              ))}
            </div>
            
            <div className="border-t pt-3">
              <Label className="text-xs text-muted-foreground mb-2 block">
                Custom Color
              </Label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="color"
                    value={customColor || value || "#3b82f6"}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                  />
                  <Input
                    placeholder="#3b82f6"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <Button 
                  size="sm" 
                  onClick={handleCustomColorSubmit}
                  disabled={!customColor || !/^#[0-9A-Fa-f]{6}$/.test(customColor)}
                >
                  Apply
                </Button>
              </div>
            </div>
            
            {value && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                Clear Color
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;
