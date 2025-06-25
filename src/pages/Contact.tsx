
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import SEOHelmet from "@/components/SEOHelmet";
import SiteSchemaMarkup from "@/components/SiteSchemaMarkup";
import ScrollToTop from "@/components/ScrollToTop";
import MobileOptimization from "@/components/MobileOptimization";
import OptimizedImage from "@/components/OptimizedImage";
import SocialShareButtons from "@/components/SocialShareButtons";
import InternalLinkingHelper from "@/components/InternalLinkingHelper";
import FAQSchemaMarkup from "@/components/FAQSchemaMarkup";

const Contact = () => {
  const faqItems = [
    {
      question: "How can I contact Stell Media?",
      answer: "You can contact us through our contact form, email, or phone. We respond to all inquiries within 24 hours."
    },
    {
      question: "What services does Stell Media offer?",
      answer: "We offer comprehensive digital marketing solutions including SEO, SEM, conversion optimization, and data enrichment services."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Stell Media</title>
        <meta
          name="description"
          content="Contact Stell Media for expert digital marketing solutions. Reach out to discuss your project and how we can help you achieve your business goals."
        />
        <meta
          name="keywords"
          content="digital marketing, SEO, web design, social media marketing, content marketing, contact us"
        />
        <link rel="canonical" href="https://stellmedia.ca/contact" />
      </Helmet>
      <SEOHelmet
        pagePath="/contact"
        defaultTitle="Contact Us | Stell Media"
        defaultDescription="Contact Stell Media for expert digital marketing solutions."
        defaultKeywords="digital marketing, SEO, web design, social media marketing, content marketing, contact us"
      />
      <SiteSchemaMarkup />
      <FAQSchemaMarkup items={faqItems} />
      <ScrollToTop />
      <MobileOptimization />

      <Navbar />

      <ContactSection />

      <Footer />
    </>
  );
};

export default Contact;
