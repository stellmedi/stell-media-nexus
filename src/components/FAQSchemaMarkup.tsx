
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaMarkupProps {
  items: FAQItem[];
  mainEntity?: string;
}

const FAQSchemaMarkup: React.FC<FAQSchemaMarkupProps> = ({ items, mainEntity = "https://stellmedia.com/faq" }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": mainEntity,
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      },
      "wordCount": item.answer.split(' ').length.toString()
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default FAQSchemaMarkup;
