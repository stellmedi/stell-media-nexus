import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import IconPicker from "./IconPicker";
import ColorPicker from "./ColorPicker";

export interface RepeatableItem {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  image_url?: string;
  gradient_from?: string;
  gradient_to?: string;
  link?: string;
}

interface RepeatableItemsEditorProps {
  items: RepeatableItem[];
  onChange: (items: RepeatableItem[]) => void;
  label?: string;
  showIcon?: boolean;
  showImage?: boolean;
  showGradient?: boolean;
  showLink?: boolean;
  maxItems?: number;
}

const RepeatableItemsEditor: React.FC<RepeatableItemsEditorProps> = ({
  items = [],
  onChange,
  label = "Items",
  showIcon = true,
  showImage = false,
  showGradient = false,
  showLink = false,
  maxItems
}) => {
  const generateId = () => `item-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  const handleAddItem = () => {
    if (maxItems && items.length >= maxItems) return;
    
    const newItem: RepeatableItem = {
      id: generateId(),
      title: "",
      description: "",
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof RepeatableItem, value: string) => {
    onChange(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= items.length) return;
    
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">{label}</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddItem}
          disabled={maxItems !== undefined && items.length >= maxItems}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Item
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">No items yet. Click "Add Item" to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <Card key={item.id} className="relative">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  {/* Reorder controls */}
                  <div className="flex flex-col items-center gap-1 pt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveItem(index, 'up')}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveItem(index, 'down')}
                      disabled={index === items.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Item fields */}
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                          placeholder="Item title"
                          className="mt-1"
                        />
                      </div>
                      
                      {showIcon && (
                        <div>
                          <Label className="text-xs">Icon</Label>
                          <div className="mt-1">
                            <IconPicker
                              value={item.icon_name}
                              onChange={(value) => handleItemChange(item.id, 'icon_name', value)}
                              placeholder="Select icon"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        placeholder="Item description"
                        className="mt-1 min-h-[60px]"
                      />
                    </div>

                    {(showGradient || showLink) && (
                      <div className="grid grid-cols-2 gap-3">
                        {showGradient && (
                          <>
                            <ColorPicker
                              value={item.gradient_from}
                              onChange={(value) => handleItemChange(item.id, 'gradient_from', value)}
                              label="Gradient From"
                            />
                            <ColorPicker
                              value={item.gradient_to}
                              onChange={(value) => handleItemChange(item.id, 'gradient_to', value)}
                              label="Gradient To"
                            />
                          </>
                        )}
                        
                        {showLink && (
                          <div className="col-span-2">
                            <Label className="text-xs">Link URL</Label>
                            <Input
                              value={item.link || ""}
                              onChange={(e) => handleItemChange(item.id, 'link', e.target.value)}
                              placeholder="/services/example"
                              className="mt-1"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Delete button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {maxItems && (
        <p className="text-xs text-muted-foreground">
          {items.length} / {maxItems} items
        </p>
      )}
    </div>
  );
};

export default RepeatableItemsEditor;
