
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

// Case studies data
const caseStudies = [
  {
    id: "electronics-search",
    title: "Advanced Electronics Search Optimization",
    description: "How we implemented strategic algorithms with Elastic Search to increase search conversion by 42% and reduced no-results searches by 68%.",
    category: "Product Discovery Optimization",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    client: "Major Electronics Retailer",
    results: [
      "42% increase in search conversion rate",
      "68% reduction in zero-results searches",
      "31% improvement in overall user engagement",
      "22% increase in average order value from search"
    ]
  },
  {
    id: "search-platform-migration",
    title: "Search Platform Migration Success",
    description: "Our algorithm optimization during migration from Elastic Search to Coveo transformed search performance and improved customer satisfaction by 38%.",
    category: "Search Platform Migration",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMHN0b3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    client: "Fashion E-commerce Brand",
    results: [
      "Seamless migration without revenue loss",
      "38% improvement in customer satisfaction ratings",
      "42% faster search performance",
      "27% increase in product discovery metrics"
    ]
  },
  {
    id: "amazon-marketplace",
    title: "Amazon Marketplace Optimization",
    description: "Complete overhaul of product listing and SEO strategy resulted in 62% increase in organic visibility and 47% higher conversion rate.",
    category: "Marketpulse",
    image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJldGFpbCUyMHN0b3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    client: "Multi-category Retailer",
    results: [
      "62% increase in organic visibility",
      "47% higher conversion rate on Amazon",
      "31% growth in marketplace revenue",
      "52% improvement in product ranking positions"
    ]
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing Campaign",
    description: "Strategic performance marketing for an online retailer resulted in 85% ROAS improvement and 39% reduction in customer acquisition costs.",
    category: "Performance Marketing",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    client: "Direct-to-Consumer Brand",
    results: [
      "85% improvement in Return on Ad Spend (ROAS)",
      "39% reduction in customer acquisition costs",
      "41% increase in new customer acquisition",
      "28% growth in repeat purchases from ads"
    ]
  }
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Case Studies | Stell Media</title>
        <meta 
          name="description" 
          content="Explore how Stell Media has helped e-commerce brands transform their product discovery and marketing strategies with measurable results." 
        />
        <meta property="og:title" content="Case Studies | Stell Media" />
        <meta property="og:description" content="Real results from our e-commerce optimization strategies." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://stellmediaglobal.com/case-studies" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Success Stories
              </h1>
              <p className="text-xl text-gray-600">
                Discover how we've helped e-commerce brands transform their product discovery experiences and achieve measurable results.
              </p>
            </div>
          </div>
        </section>
        
        {/* Case Studies Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study) => (
                <Card key={study.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <img 
                      src={study.image} 
                      alt={`${study.title} - ${study.category} case study`}
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
                    <Button asChild variant="outline" className="text-indigo-600 hover:text-indigo-800">
                      <Link to={`/case-studies/${study.id}`} className="inline-flex items-center">
                        Read case study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to achieve similar results?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Let's discuss how our product discovery solutions can help your e-commerce business grow.
              </p>
              <Button asChild size="lg" variant="white" className="font-bold text-lg shadow-md text-indigo-700">
                <Link to="/consultation">Book Your Free Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;
