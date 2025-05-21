
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

const WhatsAppButton = () => {
  const phoneNumber = "919877100369"; // Format for WhatsApp: country code (91) + number without any symbols
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  
  const handleWhatsAppClick = () => {
    // Show a toast notification when the button is clicked
    toast.success("Opening WhatsApp", {
      description: "Connecting you to our support team"
    });
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        variant="default" 
        size="icon" 
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={handleWhatsAppClick}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} />
      </Button>
    </div>
  );
};

export default WhatsAppButton;
