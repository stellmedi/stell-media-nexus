
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const generalFAQs = [
  {
    question: "What services does Stell Media offer?",
    answer: "Stell Media offers a comprehensive range of e-commerce optimization services including Product Discovery Solutions, Data Enrichment, Search Platform Migration, SEO Services, SEM Services, Hybrid Commerce Solutions, Custom AI Solutions, and E-commerce Automation. We specialize in helping online retailers improve their customer experience and increase conversions."
  },
  {
    question: "How can Stell Media help improve my e-commerce search experience?",
    answer: "We enhance your e-commerce search experience through advanced algorithms, intelligent integrations with platforms like Elastic Search, Coveo, Algolia, and Bloomreach, and strategic optimization of your product data. Our solutions include relevance optimization, behavioral insights integration, and personalized product recommendations."
  },
  {
    question: "What makes Stell Media different from other e-commerce agencies?",
    answer: "Unlike traditional agencies, we focus specifically on technology-powered solutions for e-commerce with large product catalogs. Our expertise in search algorithms, data automation, and AI-driven optimization allows us to handle complex e-commerce challenges at scale. We also pride ourselves on our data-driven approach and measurable results."
  },
  {
    question: "How do you measure the success of your services?",
    answer: "We establish clear KPIs at the beginning of each engagement based on your business objectives. These typically include metrics such as search conversion rate, zero-result searches, organic traffic growth, ROAS for paid campaigns, and ultimately revenue growth. We provide transparent reporting with real-time dashboards to track these metrics."
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer: "Yes, we work with e-commerce businesses of all sizes, though our solutions are particularly valuable for mid-size to enterprise retailers with large product catalogs (5,000+ SKUs). Our technology-powered approach allows us to scale our services to meet the needs of any size business."
  },
  {
    question: "What platforms and technologies do you work with?",
    answer: "We have expertise in major e-commerce platforms including Shopify Plus, Magento, BigCommerce, and custom solutions. For search and discovery, we specialize in Elastic Search, Algolia, Coveo, Bloomreach, and custom search implementations. Our team is also experienced with various marketing technologies and data platforms."
  },
  {
    question: "How long does it typically take to see results from your services?",
    answer: "The timeline varies by service, but you can generally expect to see initial improvements within 4-6 weeks of implementation. Technical improvements like search relevance optimization often show results quickly, while SEO initiatives may take 3-6 months to fully materialize. We provide clear timelines and milestone expectations for each project."
  },
  {
    question: "What is your approach to client collaboration?",
    answer: "We believe in transparent, collaborative partnerships. Each client is assigned a dedicated success manager who provides regular updates and maintains open communication. We typically work in agile sprints with clear deliverables and feedback cycles, ensuring you're always informed about progress and have input throughout the process."
  },
  {
    question: "Can you integrate your solutions with our existing technology stack?",
    answer: "Absolutely. Our solutions are designed to integrate seamlessly with your existing technology infrastructure. We conduct a thorough assessment of your current stack during onboarding and develop integration strategies that minimize disruption while maximizing value. Our technical team has experience with a wide range of APIs and integration patterns."
  },
  {
    question: "How do you approach data privacy and security?",
    answer: "We take data privacy and security very seriously. We are compliant with major regulations like GDPR and CCPA, implement strict data access controls, use encryption for sensitive information, and regularly audit our security practices. We're happy to complete your security assessments and can sign custom data processing agreements as needed."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Frequently Asked Questions | Stell Media</title>
        <meta 
          name="description" 
          content="Find answers to common questions about Stell Media's e-commerce optimization services, approach, and results." 
        />
        <link rel="canonical" href="https://stellmedia.com/faq" />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find answers to common questions about our services, methodology, and how we can help optimize your e-commerce experience.
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
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
