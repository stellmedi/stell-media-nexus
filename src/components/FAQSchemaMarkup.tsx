
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useMetadata } from '@/context/MetadataContext';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaMarkupProps {
  items: FAQItem[];
  mainEntity?: string;
}

const FAQSchemaMarkup: React.FC<FAQSchemaMarkupProps> = ({ items, mainEntity }) => {
  const { normalizeUrl } = useMetadata();
  
  // Normalize the mainEntity URL to ensure it uses stellmedia.com
  const normalizedMainEntity = normalizeUrl(mainEntity || "https://stellmedia.com/faq");
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": normalizedMainEntity,
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
