
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Stats data
const stats = [
  { value: "18%", label: "Average conversion increase" },
  { value: "10+", label: "E-commerce clients" },
  { value: "100k+", label: "Products optimized" },
  { value: "99%", label: "Client retention rate" }
];

// Updated case studies to align with service offerings
const caseStudies = [
  {
    title: "Advanced Electronics Search Optimization",
    description: "How we implemented strategic algorithms with Elastic Search to increase search conversion by 42% and reduced no-results searches by 68%.",
    category: "Product Discovery Optimization",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Search Platform Migration Success",
    description: "Our algorithm optimization during migration from Elastic Search to Coveo transformed search performance and improved customer satisfaction by 38%.",
    category: "Search Platform Migration",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMHN0b3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Amazon Marketplace Optimization",
    description: "Complete overhaul of product listing and SEO strategy resulted in 62% increase in organic visibility and 47% higher conversion rate.",
    category: "Marketpulse",
    image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJldGFpbCUyMHN0b3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Performance Marketing Campaign",
    description: "Strategic performance marketing for an online retailer resulted in 85% ROAS improvement and 39% reduction in customer acquisition costs.",
    category: "Performance Marketing",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  }
];

const Index = () => {
  // Function to handle chatbot click
  const handleChatbotClick = () => {
    toast({
      title: "Chat with us",
      description: "Our team will be with you shortly. How can we help?",
      action: (
        <Button size="sm" variant="secondary" onClick={() => console.log("Starting chat...")}>
          Start Chat
        </Button>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <main>
        <HeroSection />
        
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <ServicesSection />
        
        {/* Testimonials Section - Enhanced and more prominent */}
        <TestimonialsSection />
        
        {/* Case Studies Preview - Updated to align with services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Case Studies</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how our innovative solutions for product discovery, search platform migration, and marketplace management have helped e-commerce brands achieve measurable results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.slice(0, 2).map((study, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-indigo-600 py-1 px-3 rounded-full text-sm font-medium">
                        {study.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                    <p className="text-gray-600 mb-4">{study.description}</p>
                    <Link to="/case-studies" className="text-indigo-600 font-medium inline-flex items-center hover:text-indigo-800 active:text-indigo-900">
                      Read case study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="border-indigo-300 hover:bg-indigo-100 active:bg-indigo-200">
                <Link to="/case-studies">
                  View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section with improved button visibility */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your e-commerce experience?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Let's talk about how our product discovery solutions, search platform migration, and marketplace management can boost your conversions.
              </p>
              <Button asChild size="xl" className="font-bold text-lg bg-white text-indigo-700 hover:bg-indigo-50 shadow-md">
                <Link to="/contact">Book Your Free Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <ContactSection />
        
        {/* Chatbot */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            variant="default" 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={handleChatbotClick}
          >
            <MessageCircle size={24} />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
