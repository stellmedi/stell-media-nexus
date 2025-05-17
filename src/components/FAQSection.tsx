
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQSchemaMarkup from './FAQSchemaMarkup';

interface FAQItem {
  question: string;
  answer: string;
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
      {includeSchemaMeta && <FAQSchemaMarkup items={items} />}
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">{title}</h3>
      <div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-100 shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-6 text-left font-semibold text-gray-900 hover:text-indigo-700">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
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
