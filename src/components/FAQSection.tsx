
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQSchemaMarkup from './FAQSchemaMarkup';
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
  includeSchemaMeta?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ 
  title = "Frequently Asked Questions", 
  items,
  includeSchemaMeta = true
}) => {
  return (
    <div className="mb-16">
      {includeSchemaMeta && <FAQSchemaMarkup items={items.map(item => ({
        question: item.question,
        answer: typeof item.answer === 'string' ? item.answer : 'See our detailed answer'
      }))} />}
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl border-2 border-indigo-200 shadow-lg">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-indigo-100 last:border-b-0">
              <AccordionTrigger className="px-6 text-left font-semibold text-gray-900 hover:text-indigo-700 hover:bg-indigo-50/50 rounded-t-lg transition-all duration-200">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600 bg-gray-50/50 rounded-b-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;
