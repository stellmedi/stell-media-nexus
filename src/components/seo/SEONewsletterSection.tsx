
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

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
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Subscribe to Our SEO Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Get the latest <Link to="/services/seo" className="text-indigo-600 hover:underline">SEO tips</Link>, <Link to="/services/conversion-optimization" className="text-indigo-600 hover:underline">e-commerce optimization strategies</Link>, and industry insights delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
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
          <div className="mt-6 text-sm text-gray-500">
            Check out our <Link to="/blog" className="text-indigo-600 hover:underline">latest articles</Link> or <Link to="/contact" className="text-indigo-600 hover:underline">contact us</Link> for personalized guidance.
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEONewsletterSection;
