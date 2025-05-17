
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const SEONewsletterSection = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our SEO newsletter.",
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Subscribe to Our SEO Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Get the latest SEO tips, e-commerce optimization strategies, and industry insights delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1" 
              required 
              aria-label="Email address"
            />
            <Button type="submit" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SEONewsletterSection;
