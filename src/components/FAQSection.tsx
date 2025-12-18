import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQSchemaMarkup from './FAQSchemaMarkup';
import { useFaqItems } from '@/hooks/useFaqItems';
import { Skeleton } from '@/components/ui/skeleton';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  title?: string;
  items?: FAQItem[];
  pagePath?: string;
  includeSchemaMeta?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ 
  title = "Frequently Asked Questions", 
  items: propItems,
  pagePath = '/',
  includeSchemaMeta = true
}) => {
  const { data: dbItems = [], isLoading } = useFaqItems(pagePath);
  
  // Use prop items if provided, otherwise use database items
  const items: FAQItem[] = propItems || dbItems.map(item => ({
    question: item.question,
    answer: item.answer
  }));

  if (isLoading && !propItems) {
    return (
      <div className="mobile-header-spacing mb-16">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          {title}
        </h3>
        <div className="max-w-3xl mx-auto bg-card/90 backdrop-blur-sm rounded-xl border-2 border-border shadow-lg p-4">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full mb-2 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mobile-header-spacing mb-16">
      {includeSchemaMeta && <FAQSchemaMarkup items={items.map(item => ({
        question: item.question,
        answer: typeof item.answer === 'string' ? item.answer : 'See our detailed answer'
      }))} />}
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        {title}
      </h3>
      <div className="max-w-3xl mx-auto bg-card/90 backdrop-blur-sm rounded-xl border-2 border-border shadow-lg">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-b-0">
              <AccordionTrigger className="px-6 text-left font-semibold text-card-foreground hover:text-primary hover:bg-primary/5 rounded-t-lg transition-all duration-200">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 text-muted-foreground bg-secondary/30 rounded-b-lg">
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
