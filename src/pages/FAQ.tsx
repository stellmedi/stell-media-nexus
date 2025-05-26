
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const generalFAQs = [
  {
    question: "What services does Stell Media offer?",
    answer: "Stell Media offers a comprehensive range of e-commerce optimization services including Product Discovery Optimization, Data Enrichment, Search Platform Migration Consulting, SEO Optimization, SEM Optimization, Conversion Optimization, and E-commerce Analytics. We specialize in helping online retailers optimize their customer experience and increase conversions through strategic improvements."
  },
  {
    question: "How can Stell Media help improve my e-commerce search experience?",
    answer: "We enhance your e-commerce search experience through advanced optimization strategies, strategic consulting for platforms like Elastic Search, Coveo, Algolia, and Bloomreach, and comprehensive optimization of your product data. Our solutions include relevance optimization, behavioral insights integration, and personalized product recommendation strategies."
  },
  {
    question: "What makes Stell Media different from other e-commerce agencies?",
    answer: "Unlike traditional agencies, we focus specifically on technology-powered optimization solutions for e-commerce with large product catalogs. Our expertise in search optimization, data automation strategies, and AI-driven optimization allows us to handle complex e-commerce challenges at scale. We pride ourselves on our data-driven approach and measurable optimization results."
  },
  {
    question: "How do you measure the success of your optimization services?",
    answer: "We establish clear KPIs at the beginning of each engagement based on your business objectives. These typically include metrics such as search conversion rate optimization, zero-result search reduction, organic traffic growth, ROAS optimization for paid campaigns, and ultimately revenue growth. We provide transparent reporting with real-time dashboards to track these optimization metrics."
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer: "Yes, we work with e-commerce businesses of all sizes, though our optimization solutions are particularly valuable for mid-size to enterprise retailers with large product catalogs (5,000+ SKUs). Our technology-powered optimization approach allows us to scale our services to meet the needs of any size business."
  },
  {
    question: "What platforms and technologies do you optimize for?",
    answer: "We have optimization expertise for major e-commerce platforms including Shopify Plus, Magento, BigCommerce, and custom solutions. For search and discovery, we specialize in optimizing Elastic Search, Algolia, Coveo, Bloomreach, and custom search implementations. Our team also provides optimization strategies for various marketing technologies and data platforms."
  },
  {
    question: "How long does it typically take to see results from your optimization services?",
    answer: "The timeline varies by service, but you can generally expect to see initial improvements within 4-6 weeks of optimization implementation. Technical improvements like search relevance optimization often show results quickly, while SEO optimization initiatives may take 3-6 months to fully materialize. We provide clear timelines and milestone expectations for each optimization project."
  },
  {
    question: "What is your approach to client collaboration?",
    answer: "We believe in transparent, collaborative partnerships focused on optimization results. Each client is assigned a dedicated success manager who provides regular updates and maintains open communication. We typically work in agile sprints with clear optimization deliverables and feedback cycles, ensuring you're always informed about progress and have input throughout the optimization process."
  },
  {
    question: "Can you optimize existing technology stacks without major changes?",
    answer: "Absolutely. Our optimization solutions are designed to enhance your existing technology infrastructure without requiring major overhauls. We conduct a thorough assessment of your current stack during onboarding and develop optimization strategies that minimize disruption while maximizing value. Our technical team has experience optimizing a wide range of platforms and systems."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Frequently Asked Questions | E-commerce Optimization Services | Stell Media</title>
        <meta 
          name="description" 
          content="Find comprehensive answers about Stell Media's e-commerce optimization services, search technology optimization, data enrichment, and more. Learn how we help online retailers improve their customer experience." 
        />
        <meta name="keywords" content="e-commerce optimization FAQs, product discovery optimization, search platform optimization, data enrichment, search optimization, e-commerce optimization services" />
        <meta name="author" content="Stell Media" />
        <meta property="og:title" content="Frequently Asked Questions | Stell Media" />
        <meta property="og:description" content="Find comprehensive answers about our e-commerce optimization services and technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stellmedia.com/faq" />
        <meta property="og:image" content="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" />
        <link rel="canonical" href="https://stellmedia.com/faq" />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find answers to common questions about our optimization services, methodology, and how we can help optimize your e-commerce experience.
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FAQSection 
              items={generalFAQs} 
              title="General Questions" 
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
