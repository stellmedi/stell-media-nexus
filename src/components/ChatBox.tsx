
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

// Define topic categories for better response organization
type TopicCategory = 'general' | 'services' | 'pricing' | 'contact' | 'support' | 'unknown';

// Organize responses by topic categories for more relevant replies
const categorizedResponses: Record<TopicCategory, string[]> = {
  general: [
    "Welcome to Stell Media! How can I help you today?",
    "Is there something specific you'd like to know about our e-commerce optimization services?",
    "Our team specializes in improving product discovery and search experiences for e-commerce businesses.",
    "We've helped many businesses increase their conversion rates by 30% or more through optimized search experiences."
  ],
  services: [
    "We offer several specialized services including Product Discovery Optimization, Search Platform Migration, Data Enrichment, SEO, SEM, and Conversion Rate Optimization.",
    "Our Product Discovery service helps improve how customers find products on your site, reducing zero-result searches by up to 68%.",
    "With our Data Enrichment service, we can enhance your product catalog with better attributes and metadata for improved discoverability.",
    "Our Search Platform Migration service ensures smooth transitions between search platforms like Elastic Search and Coveo without losing performance.",
    "Would you like me to tell you more about a specific service we offer?"
  ],
  pricing: [
    "Our pricing is customized based on your specific needs and the size of your product catalog.",
    "We offer flexible pricing packages starting from $2,500 for initial consultations and audits.",
    "For enterprise clients, we provide comprehensive service packages with ongoing optimization and support.",
    "Would you like to schedule a consultation to discuss pricing options that would work best for your business?"
  ],
  contact: [
    "You can reach our team directly at contact@stellmedia.com or through our contact form.",
    "Our office hours are Monday through Friday, 9am to 5pm EST.",
    "Would you like me to have someone from our team reach out to you directly?",
    "If you'd prefer to speak with someone right away, you can call us at (555) 123-4567."
  ],
  support: [
    "If you're an existing client, please email support@stellmedia.com with your account details.",
    "Our support team typically responds within 24 hours during business days.",
    "For urgent matters, existing clients can use our priority support line mentioned in your service agreement.",
    "I'd be happy to connect you with your account manager for personalized assistance."
  ],
  unknown: [
    "I'm not sure I understand your question. Could you please provide more details?",
    "That's a bit outside my area of expertise, but I'd be happy to connect you with a specialist who can help.",
    "Let me make sure I understand your question correctly. Could you rephrase that?",
    "I apologize, but I don't have enough information to answer that question properly. Would you like to speak with a human agent?"
  ]
};

// Keywords to help identify message categories
const topicKeywords: Record<TopicCategory, string[]> = {
  general: ['hello', 'hi', 'hey', 'info', 'information', 'help', 'about', 'company', 'stell'],
  services: ['service', 'services', 'discovery', 'search', 'optimization', 'seo', 'sem', 'data', 'enrichment', 'migration', 'conversion'],
  pricing: ['price', 'pricing', 'cost', 'package', 'fee', 'charge', 'quote', 'estimate', 'budget', 'affordable', 'expensive'],
  contact: ['contact', 'email', 'phone', 'call', 'reach', 'talk', 'schedule', 'meeting', 'appointment', 'consultation'],
  support: ['support', 'help', 'issue', 'problem', 'ticket', 'bug', 'fix', 'trouble', 'question', 'existing', 'client'],
  unknown: []
};

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
  const [currentTopic, setCurrentTopic] = useState<TopicCategory>('general');
  const [consecutiveUnknown, setConsecutiveUnknown] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Categorize user message to determine appropriate response topic
  const categorizeMessage = (message: string): TopicCategory => {
    // Convert to lowercase for case-insensitive matching
    const lowerMessage = message.toLowerCase();
    
    // Check for topic matches based on keywords
    for (const [category, keywords] of Object.entries(topicKeywords)) {
      if (category !== 'unknown' && keywords.some(keyword => lowerMessage.includes(keyword))) {
        return category as TopicCategory;
      }
    }
    
    // No specific category found
    return 'unknown';
  };

  // Get contextual response based on message category and conversation history
  const getContextualResponse = (topic: TopicCategory): string => {
    // If there have been several consecutive unknown responses, suggest human contact
    if (topic === 'unknown' && consecutiveUnknown >= 2) {
      return "I'm sorry I'm not understanding your questions correctly. Would you like to speak with a real person? You can reach our team at contact@stellmedia.com or schedule a consultation.";
    }
    
    // Get responses for the identified topic
    const responses = categorizedResponses[topic];
    
    // Pick a random response from the appropriate category
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
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
    
    // Determine the topic based on user message
    const messageTopic = categorizeMessage(userMessage.text);
    
    // Update consecutive unknown counter
    if (messageTopic === 'unknown') {
      setConsecutiveUnknown(prev => prev + 1);
    } else {
      setConsecutiveUnknown(0);
    }
    
    // Update current conversation topic
    setCurrentTopic(messageTopic);
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      const responseText = getContextualResponse(messageTopic);
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
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
