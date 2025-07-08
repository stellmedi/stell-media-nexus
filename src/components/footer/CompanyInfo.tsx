
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const CompanyInfo = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Newsletter subscription received!",
      description: "Thank you for subscribing to our newsletter.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <img 
          src="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" 
          alt="Stell Media Logo" 
          className="h-8" 
        />
        <h3 className="text-xl font-bold text-gray-900">Stell Media</h3>
      </div>
      <p className="text-gray-600 leading-relaxed">
        Your trusted digital growth partner specializing in real estate and e-commerce solutions worldwide.
      </p>
      
      <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
        <h4 className="font-semibold text-gray-800 mb-1 flex items-center">
          <span className="mr-2">📍</span>
          Location
        </h4>
        <p className="text-gray-600 text-sm">
          Chandigarh City Center, VIP Road, Zirakpur,<br />
          SAS Nagar (Mohali), Punjab, India
        </p>
      </div>
      
      {/* Newsletter subscription */}
      <div className="mt-6 pt-4 border-t border-indigo-200">
        <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
          <Input 
            type="email" 
            placeholder="Your email address" 
            className="px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium w-full shadow-lg"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;
