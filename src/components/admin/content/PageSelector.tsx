
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AvailablePage {
  path: string;
  name: string;
}

interface PageSelectorProps {
  availablePages: AvailablePage[];
  selectedPage: string;
  onPageChange: (newPage: string) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({
  availablePages,
  selectedPage,
  onPageChange,
}) => {
  const selectedPageInfo = availablePages.find(p => p.path === selectedPage);

  return (
    <div>
      <label className="text-sm font-medium">Select Page to Edit</label>
      <Select value={selectedPage} onValueChange={onPageChange}>
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Choose a page to edit" />
        </SelectTrigger>
        <SelectContent>
          {availablePages.map((page) => (
            <SelectItem key={page.path} value={page.path}>
              {page.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedPageInfo && (
        <p className="text-sm text-gray-500 mt-1">
          Editing: {selectedPageInfo.name}
        </p>
      )}
    </div>
  );
};

export default PageSelector;
