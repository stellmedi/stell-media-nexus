import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="bg-background">
      <Helmet>
        <title>Frequently Asked Questions | Stell Media</title>
        <meta name="description" content="Find answers to common questions about our digital marketing services, pricing, and processes. Get the information you need to make informed decisions." />
        <meta name="keywords" content="FAQ, frequently asked questions, digital marketing questions, stell media help" />
        <link rel="canonical" href="https://stellmedia.com/faq" />
      </Helmet>

      <Navbar />
      
      <section 
        className="pt-28 pb-16 bg-gradient-to-br from-primary/5 to-primary/10"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get answers to the most common questions about our services, processes, and how we can help grow your business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <FAQSection pagePath="/faq" includeSchemaMeta={true} />
          
          <div className="text-center mt-12">
            <div className="bg-secondary/50 p-8 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? We're here to help with any questions about our services.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
