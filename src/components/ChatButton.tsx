
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useChat } from '@/hooks/use-chat';
import ChatBox from './ChatBox';

const ChatButton = () => {
  const { isChatOpen, openChat, closeChat } = useChat();
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          variant="default" 
          size="icon" 
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={openChat}
          aria-label="Open chat support"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
      
      <ChatBox isOpen={isChatOpen} onClose={closeChat} />
    </>
  );
};

export default ChatButton;
