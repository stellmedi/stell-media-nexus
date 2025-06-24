
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const generalFAQs = [
  {
    question: "What services does Stell Media offer?",
    answer: "Stell Media is your complete digital growth partner specializing in two key industries: Real Estate and E-commerce. For real estate, we offer virtual tours & photography, 3D visualization, CRM & lead management, automated marketing, SEO, and website development. For e-commerce, we provide product discovery optimization, catalog SEO & data enrichment, performance marketing, and conversion rate optimization."
  },
  {
    question: "How does Stell Media help real estate professionals?",
    answer: "We provide comprehensive end-to-end digital solutions for real estate professionals including: 360° virtual tours and professional photography, 3D animations and architectural visualizations, custom CRM systems with automated lead management, targeted lead generation campaigns, local SEO optimization, and modern responsive websites. Our solutions are designed to increase property visibility, generate quality leads, and close more deals."
  },
  {
    question: "What makes your e-commerce optimization different?",
    answer: "Our e-commerce optimization goes beyond basic consulting. We specialize in advanced product discovery management, AI-powered search optimization, large-scale catalog SEO, automated data enrichment, and performance marketing campaigns that deliver measurable ROI. Our solutions are particularly effective for mid-size to enterprise retailers with large product catalogs (5,000+ SKUs)."
  },
  {
    question: "Do you work with both real estate and e-commerce clients?",
    answer: "Yes, we're uniquely positioned as a dual-industry specialist. Our real estate division focuses on complete digital transformation including lead generation, CRM automation, virtual tours, and marketing. Our e-commerce division specializes in product discovery, search optimization, catalog management, and performance marketing. This dual expertise allows us to serve diverse business needs effectively."
  },
  {
    question: "What platforms and technologies do you work with?",
    answer: "For real estate: We work with leading CRM platforms, marketing automation tools, virtual tour technologies, 3D visualization software, and website builders. For e-commerce: We have expertise with Shopify Plus, Magento, BigCommerce, WooCommerce, and custom solutions. For search optimization, we specialize in Elasticsearch, Algolia, Coveo, Bloomreach, and other advanced search platforms."
  },
  {
    question: "How quickly can we see results from your services?",
    answer: "Results vary by service type, but most clients see initial improvements within 2-4 weeks. Real estate clients typically see increased lead generation within 3-4 weeks of CRM implementation, while virtual tours show immediate impact on property engagement. E-commerce clients often see search and conversion improvements within 4-6 weeks, with significant performance gains achieved within 3-6 months for SEO initiatives."
  },
  {
    question: "What makes Stell Media different from other digital agencies?",
    answer: "Unlike generalist agencies, we focus exclusively on real estate and e-commerce with deep industry specialization. Our team combines years of industry-specific experience with cutting-edge technology expertise. We don't just provide services – we deliver complete digital transformation with measurable results, ongoing optimization, and dedicated support tailored to each industry's unique challenges."
  },
  {
    question: "How do you measure success and ROI?",
    answer: "We establish clear, industry-specific KPIs for each engagement. For real estate: lead generation rates, conversion metrics, property engagement, and sales cycle improvement. For e-commerce: search conversion rates, organic traffic growth, ROAS optimization, catalog performance, and revenue growth. We provide transparent reporting with real-time dashboards and regular performance reviews."
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer: "Yes, we work with businesses of all sizes in both industries. Our real estate solutions scale from individual agents to large development companies. Our e-commerce services are particularly valuable for retailers with substantial product catalogs, though we adapt our approach to meet the specific needs and budget of each client, from startups to enterprise-level businesses."
  },
  {
    question: "What is your approach to client collaboration?",
    answer: "We believe in transparent, results-focused partnerships. Each client receives a dedicated account manager who understands their industry and provides regular updates. We work in agile phases with clear deliverables, milestone tracking, and continuous feedback loops. Our collaborative approach ensures you're always informed about progress and have input throughout the transformation process."
  }
];

const realEstateFAQs = [
  {
    question: "How do virtual tours help sell properties faster?",
    answer: "Virtual tours provide 24/7 property access, reduce unnecessary physical visits, attract serious buyers, and significantly increase online engagement. Properties with virtual tours typically see 40% more inquiries and sell 31% faster than those without."
  },
  {
    question: "What CRM features are most important for real estate?",
    answer: "Essential CRM features include automated lead capture, deal pipeline management, follow-up sequences, client communication tracking, document management, and performance analytics. Our CRM solutions integrate with your marketing channels for seamless lead management."
  },
  {
    question: "How does SEO help real estate businesses?",
    answer: "Local SEO helps real estate professionals appear in local searches, Google My Business optimization increases visibility, and content marketing establishes authority. Our SEO strategies typically increase organic leads by 60-120% within 6 months."
  }
];

const eCommerceFAQs = [
  {
    question: "What is product discovery optimization?",
    answer: "Product discovery optimization improves how customers find products on your site through enhanced search functionality, intelligent filtering, personalized recommendations, and AI-powered search results. This typically increases conversion rates by 25-45%."
  },
  {
    question: "How does catalog SEO work for large inventories?",
    answer: "Catalog SEO involves optimizing product pages at scale through automated data enrichment, schema markup implementation, strategic keyword optimization, and technical SEO improvements. We can optimize thousands of product pages efficiently while maintaining quality."
  },
  {
    question: "What is performance marketing for e-commerce?",
    answer: "Performance marketing focuses on measurable results through data-driven campaigns across multiple channels including Google Ads, Facebook, Instagram, and other platforms. We optimize for specific KPIs like ROAS, conversion rates, and customer acquisition costs."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Helmet>
        <title>Frequently Asked Questions | Real Estate & E-commerce Digital Solutions | Stell Media</title>
        <meta 
          name="description" 
          content="Find comprehensive answers about Stell Media's real estate and e-commerce digital solutions. Learn about our virtual tours, CRM systems, product discovery optimization, and performance marketing services." 
        />
        <meta name="keywords" content="real estate digital solutions FAQ, e-commerce optimization FAQs, virtual tours, CRM systems, product discovery, performance marketing, digital transformation" />
        <meta name="author" content="Stell Media" />
        <meta property="og:title" content="Frequently Asked Questions | Stell Media" />
        <meta property="og:description" content="Find comprehensive answers about our real estate and e-commerce digital transformation services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stellmedia.com/faq" />
        <meta property="og:image" content="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png" />
        <link rel="canonical" href="https://stellmedia.com/faq" />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Expert Answers
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Find comprehensive answers about our specialized digital solutions for 
                <span className="text-blue-700 font-semibold"> real estate</span> and 
                <span className="text-purple-700 font-semibold"> e-commerce</span> businesses.
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <FAQSection 
              items={generalFAQs} 
              title="General Questions" 
            />
            
            <FAQSection 
              items={realEstateFAQs} 
              title="Real Estate Solutions" 
            />
            
            <FAQSection 
              items={eCommerceFAQs} 
              title="E-Commerce Optimization" 
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Still Have Questions?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
              Our experts are ready to discuss your specific needs and provide personalized recommendations 
              for your real estate or e-commerce business.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="https://wa.me/919877100369" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-4 bg-white text-indigo-600 hover:bg-gray-100 font-semibold rounded-lg text-lg shadow-lg transition-all duration-300"
              >
                Get Expert Consultation
              </a>
              <a 
                href="tel:919877100369"
                className="inline-flex items-center px-10 py-4 border-2 border-white text-white bg-transparent hover:bg-white hover:text-indigo-600 font-semibold rounded-lg text-lg transition-all duration-300"
              >
                Call Now: +91 98771 00369
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
