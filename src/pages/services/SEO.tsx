import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHeroSection from "@/components/seo/SEOHeroSection";
import SEOFeaturesSection from "@/components/seo/SEOFeaturesSection";
import SEOProcessSection from "@/components/seo/SEOProcessSection";
import SEOCTASection from "@/components/seo/SEOCTASection";
import SEONewsletterSection from "@/components/seo/SEONewsletterSection";
import SEOFAQSection from "@/components/seo/SEOFAQSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import FAQSchemaMarkup from "@/components/FAQSchemaMarkup";
import SEOHelmet from "@/components/SEOHelmet";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SEOServices = () => {
  // SEO Service Schema data
  const seoServiceData = {
    serviceType: "SEO Service",
    name: "E-commerce SEO Services",
    description: "Boost your e-commerce visibility with Stell Media's data-driven SEO strategies. Improve rankings, increase organic traffic, and maximize ROI.",
    areaServed: "Global",
    services: [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technical SEO Audits",
          "description": "Comprehensive analysis of your e-commerce site structure, crawlability, and indexation.",
          "url": "https://stellmedia.com/services/seo#technical"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Page Optimization",
          "description": "Automated optimization of product pages for better search visibility.",
          "url": "https://stellmedia.com/services/seo#product-pages"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Schema Markup Implementation",
          "description": "Structured data implementation to enhance rich snippets in search results.",
          "url": "https://stellmedia.com/services/seo#schema"
        }
      }
    ]
  };

  // Breadcrumb data
  const breadcrumbData = [
    { name: "Home", url: "https://stellmedia.com/" },
    { name: "Services", url: "https://stellmedia.com/services" },
    { name: "SEO Services", url: "https://stellmedia.com/services/seo" }
  ];

  // Related case studies for SEO services
  const relatedCaseStudies = [
    {
      id: "amazon-marketplace",
      title: "Amazon Marketplace Optimization",
      description: "Complete overhaul of product listing and SEO strategy resulted in 62% increase in organic visibility and 47% higher conversion rate.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3"
    },
    {
      id: "electronics-search",
      title: "Advanced Electronics Search Optimization",
      description: "How we implemented strategic algorithms with Elastic Search to increase search conversion by 42% and reduced no-results searches by 68%.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3"
    }
  ];

  // Related services that complement SEO
  const relatedServices = [
    {
      title: "Product Discovery Solutions",
      description: "Enhance customer search experience with AI-powered algorithms.",
      link: "/services/product-discovery"
    },
    {
      title: "Data Enrichment",
      description: "Improve product data quality to boost SEO performance.",
      link: "/services/data-enrichment"
    },
    {
      title: "SEM Services",
      description: "Complement organic search with strategic paid campaigns.",
      link: "/services/sem"
    }
  ];

  // SEO FAQ items (for schema markup)
  const faqItems = [
    {
      question: "How long does it take to see results from e-commerce SEO?",
      answer: "While some improvements can be seen within weeks, significant e-commerce SEO results typically emerge after 3-6 months of consistent implementation. Technical fixes may show quicker results, while content and authority building are longer-term investments."
    },
    {
      question: "How do you approach product page optimization for e-commerce?",
      answer: "Our product page optimization strategy includes enhancing product descriptions with relevant keywords, implementing schema markup, optimizing product images, improving page load speed, and creating unique content for each product to avoid duplicate content issues."
    },
    {
      question: "What makes your e-commerce SEO services different from others?",
      answer: "Our e-commerce SEO services are distinguished by our focus on large product catalogs, automated optimization at scale, and integration with product discovery solutions. We combine technical SEO expertise with deep e-commerce knowledge to deliver measurable ROI."
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-50">
      <SEOHelmet 
        pagePath="/services/seo"
        defaultTitle="Expert E-commerce SEO Services | Data-Driven Results | Stell Media"
        defaultDescription="Boost your e-commerce visibility with Stell Media's data-driven SEO strategies. Our technical expertise improves rankings, increases organic traffic, and maximizes ROI for large product catalogs."
        defaultKeywords="e-commerce SEO, product catalog optimization, technical SEO, organic traffic, search ranking improvement, structured data, schema markup, e-commerce visibility"
        defaultOgImage="/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png"
      >
        <meta name="author" content="Stell Media" />
        <meta property="og:type" content="website" />
      </SEOHelmet>
      
      {/* Schema markup for this page */}
      <SchemaMarkup type="service" data={seoServiceData} />
      <SchemaMarkup type="breadcrumb" data={breadcrumbData} />
      <FAQSchemaMarkup items={faqItems} mainEntity="https://stellmedia.com/services/seo#faq" />
      
      <Navbar />
      <main>
        <SEOHeroSection />
        <SEOFeaturesSection />
        <SEOProcessSection />
        
        {/* Related Case Studies Section - NEW */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">SEO Success Stories</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              See how our data-driven SEO strategies have helped e-commerce brands achieve measurable results.
              Learn from these <Link to="/case-studies" className="text-indigo-600 hover:underline">real-world examples</Link> of our work.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {relatedCaseStudies.map((study, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                    <p className="text-gray-600 mb-4">{study.description}</p>
                    <Link to={`/case-studies/${study.id}`} className="text-indigo-600 font-medium inline-flex items-center hover:text-indigo-800">
                      Read case study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Related Services Section - NEW */}
        <section className="py-16 bg-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Complementary Services</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Enhance your SEO results with these complementary services. Our integrated approach ensures all aspects of your 
              <Link to="/services" className="text-indigo-600 hover:underline mx-1">digital strategy</Link> 
              work together for maximum impact.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link to={service.link} className="text-indigo-600 font-medium inline-flex items-center hover:text-indigo-800">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Educational Resources Section - NEW */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">SEO Resources & Insights</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Explore our comprehensive resources to deepen your understanding of e-commerce SEO best practices.
              Check out our <Link to="/blog" className="text-indigo-600 hover:underline">blog</Link> for the latest insights.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold mb-3 text-gray-900">Technical SEO Guide</h3>
                <p className="text-gray-600">Learn how technical optimizations can dramatically improve your site's search performance.</p>
                <Link to="/blog" className="text-indigo-600 font-medium inline-flex items-center mt-3 hover:text-indigo-800">
                  Read the guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold mb-3 text-gray-900">Product SEO Checklists</h3>
                <p className="text-gray-600">Download our free checklists for optimizing product pages at scale.</p>
                <Link to="/blog" className="text-indigo-600 font-medium inline-flex items-center mt-3 hover:text-indigo-800">
                  Get the checklist <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold mb-3 text-gray-900">SEO for Large Catalogs</h3>
                <p className="text-gray-600">Discover strategies for effectively managing SEO for catalogs with thousands of products.</p>
                <Link to="/blog" className="text-indigo-600 font-medium inline-flex items-center mt-3 hover:text-indigo-800">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <p className="mb-6">Have questions about our SEO services? Visit our <Link to="/faq" className="text-indigo-600 hover:underline">FAQ page</Link> or <Link to="/contact" className="text-indigo-600 hover:underline">contact us</Link> directly.</p>
              
              <Link to="/consultation" className="inline-flex items-center text-white bg-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Schedule an SEO consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        <SEOFAQSection />
        <SEOCTASection />
        <SEONewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default SEOServices;
