
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

const WhatsAppButton = () => {
  const phoneNumber = "919877100369"; // Format for WhatsApp: country code (91) + number without any symbols
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    // Enhanced animation that makes the button pulse, float, and rotate slightly
    const animation = `
      @keyframes float-pulse-rotate {
        0% { 
          transform: translateY(0) scale(1) rotate(0deg); 
          box-shadow: 0 5px 15px rgba(34, 197, 94, 0.2); 
        }
        25% {
          transform: translateY(-5px) scale(1.05) rotate(1deg);
          box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
        }
        50% { 
          transform: translateY(-7px) scale(1.07) rotate(0deg); 
          box-shadow: 0 12px 24px rgba(34, 197, 94, 0.35); 
        }
        75% {
          transform: translateY(-5px) scale(1.05) rotate(-1deg);
          box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
        }
        100% { 
          transform: translateY(0) scale(1) rotate(0deg); 
          box-shadow: 0 5px 15px rgba(34, 197, 94, 0.2); 
        }
      }
    `;
    
    // Create and add the style element
    const style = document.createElement('style');
    style.innerHTML = animation;
    document.head.appendChild(style);
    
    // Apply the animation to the button
    button.style.animation = 'float-pulse-rotate 3s ease-in-out infinite';
    
    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
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
        ref={buttonRef}
        variant="default" 
        size="icon" 
        className="h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg transition-all duration-300"
        onClick={handleWhatsAppClick}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} className="text-white" />
      </Button>
    </div>
  );
};

export default WhatsAppButton;
