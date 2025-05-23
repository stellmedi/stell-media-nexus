
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useMetadata } from '@/context/MetadataContext';

const SiteSchemaMarkup: React.FC = () => {
  const { currentPageMetadata, pagesMetadata } = useMetadata();
  
  // Get the organization schema data
  const getOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://stellmedia.com/#organization",
      "name": "Stell Media",
      "url": "https://stellmedia.com",
      "logo": "https://stellmedia.com/logo.png",
      "sameAs": [
        "https://twitter.com/stellmedia",
        "https://www.linkedin.com/company/stellmedia",
        "https://www.facebook.com/stellmedia"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-555-1234",
        "contactType": "customer service",
        "availableLanguage": ["English"]
      }
    };
  };

  // Get the website schema
  const getWebsiteSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://stellmedia.com/#website",
      "name": "Stell Media",
      "url": "https://stellmedia.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://stellmedia.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@id": "https://stellmedia.com/#organization"
      }
    };
  };

  // Generate additional schema based on current page's metadata
  const getPageSpecificSchema = () => {
    if (!currentPageMetadata || currentPageMetadata.schemaType === "None") {
      return null;
    }

    try {
      // Base schema with type from metadata
      const baseSchema: any = {
        "@context": "https://schema.org",
        "@type": currentPageMetadata.schemaType
      };
      
      // Add canonical URL as @id if available
      if (currentPageMetadata.canonicalUrl) {
        baseSchema["@id"] = currentPageMetadata.canonicalUrl;
      }
      
      // Parse and add additional properties from the JSON string
      if (currentPageMetadata.schemaProperties) {
        const additionalProps = JSON.parse(currentPageMetadata.schemaProperties);
        Object.assign(baseSchema, additionalProps);
      }
      
      // Add specific fields for different schema types
      switch (currentPageMetadata.schemaType) {
        case "Article":
          // If these fields aren't already set from schemaProperties
          if (!baseSchema.headline) baseSchema.headline = currentPageMetadata.metaTitle || currentPageMetadata.title;
          if (!baseSchema.description) baseSchema.description = currentPageMetadata.metaDescription;
          if (!baseSchema.image) baseSchema.image = currentPageMetadata.ogImage;
          if (!baseSchema.author) baseSchema.author = { "@type": "Organization", "name": "Stell Media" };
          break;
          
        case "Service":
          if (!baseSchema.name) baseSchema.name = currentPageMetadata.metaTitle || currentPageMetadata.title;
          if (!baseSchema.description) baseSchema.description = currentPageMetadata.metaDescription;
          if (!baseSchema.provider) baseSchema.provider = { "@type": "Organization", "@id": "https://stellmedia.com/#organization" };
          break;
          
        case "WebPage":
          if (!baseSchema.name) baseSchema.name = currentPageMetadata.metaTitle || currentPageMetadata.title;
          if (!baseSchema.description) baseSchema.description = currentPageMetadata.metaDescription;
          if (!baseSchema.isPartOf) baseSchema.isPartOf = { "@id": "https://stellmedia.com/#website" };
          break;
      }
      
      return baseSchema;
    } catch (error) {
      console.error("Error parsing schema properties:", error);
      return null;
    }
  };

  // Get all schemas for the page
  const schemas = [
    getOrganizationSchema(),
    getWebsiteSchema()
  ];

  // Add page specific schema if available
  const pageSchema = getPageSpecificSchema();
  if (pageSchema) {
    schemas.push(pageSchema);
  }

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SiteSchemaMarkup;
