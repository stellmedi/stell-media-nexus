
import React from 'react';
import FAQSection from '@/components/FAQSection';

const SEOFAQSection: React.FC = () => {
  const faqItems = [
    {
      question: "What makes your SEO services different for e-commerce sites?",
      answer: "Our SEO approach is specifically tailored for e-commerce with large product catalogs. We focus on technical SEO that scales across thousands of pages, automated schema implementation for products, and category-level optimization strategies that increase visibility across your entire inventory."
    },
    {
      question: "How do you approach product page optimization at scale?",
      answer: "We use automated systems to analyze and optimize thousands of product pages simultaneously. Our technology evaluates content gaps, keyword opportunities, and technical SEO elements like structured data, then applies optimizations through templates and programmatic updates rather than manual page-by-page work."
    },
    {
      question: "How long before we see results from your SEO services?",
      answer: "Most e-commerce clients see initial improvements in indexation and crawling within 4-6 weeks of technical SEO implementation. For rankings and traffic growth, expect noticeable improvements within 3-6 months, with more competitive terms showing gains after 6-12 months of sustained optimization."
    },
    {
      question: "Do you provide reports on organic search performance?",
      answer: "Yes, we provide comprehensive monthly reporting with real-time dashboards showing key metrics like organic traffic, rankings, click-through rates, and most importantly, organic revenue and conversions. We track visibility by product category and analyze performance against competitors."
    },
    {
      question: "How do you handle content creation for SEO?",
      answer: "We focus on scalable content solutions including programmatically enhanced product descriptions, AI-assisted category page content, automated internal linking strategies, and targeted content gap analysis. We can either work with your content team or provide content creation services."
    },
    {
      question: "How do you stay current with Google's algorithm updates?",
      answer: "We maintain a dedicated technical SEO research team that continuously monitors algorithm changes and tests their impact. All clients benefit from our proactive approach to algorithm updates, including immediate recommendations when significant changes occur."
    }
  ];

  return <FAQSection items={faqItems} />;
};

export default SEOFAQSection;
