
import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { toast } from "sonner";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
};

// Sample responses for the chatbot to create a more interactive experience
const sampleResponses = [
  "How can I help you with our services today?",
  "That's a great question! Our team specializes in product discovery optimization and search platform migration.",
  "Would you like to know more about our data enrichment services?",
  "We've helped many e-commerce businesses increase their conversion rates by 30% or more.",
  "Feel free to ask any specific questions about our services or methodology.",
  "We typically respond to all inquiries within 24 hours during business days.",
  "Would you like to schedule a consultation with one of our specialists?",
  "Is there a specific e-commerce platform you're working with?",
  "Our team has extensive experience with all major e-commerce platforms including Shopify, Magento, and WooCommerce.",
  "Thanks for reaching out! I'll make sure your questions get to the right department."
];

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBox = ({ isOpen, onClose }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get a random response from our sample responses
  const getRandomResponse = (): string => {
    const randomIndex = Math.floor(Math.random() * sampleResponses.length);
    return sampleResponses[randomIndex];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(),
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, agentMessage]);
      
      // Notify with toast when chat is minimized
      if (!isOpen) {
        toast.info("New message in chat", {
          description: agentMessage.text.substring(0, 60) + (agentMessage.text.length > 60 ? '...' : ''),
          action: {
            label: "View",
            onClick: () => onClose() // This will toggle the chat open
          }
        });
      }
    }, 1000);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5 text-indigo-600" />
            <SheetTitle>Chat with us</SheetTitle>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.text}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <SheetFooter className="border-t p-4">
          <div className="flex w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <Button 
              onClick={handleSendMessage} 
              className="rounded-l-none"
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBox;
