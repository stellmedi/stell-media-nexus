
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Case studies data - same as in CaseStudies.tsx
const caseStudies = [
  {
    id: "electronics-search",
    title: "Advanced Electronics Search Optimization",
    description: "How we implemented strategic algorithms with Elastic Search to increase search conversion by 42% and reduced no-results searches by 68%.",
    category: "Product Discovery Optimization",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    client: "Major Electronics Retailer",
    results: [
      "42% increase in search conversion rate",
      "68% reduction in zero-results searches",
      "31% improvement in overall user engagement",
      "22% increase in average order value from search"
    ],
    challenge: "The client, a major electronics retailer with over 50,000 products, struggled with poor search relevance resulting in high bounce rates and abandoned searches. Their legacy search system produced too many zero-result searches and failed to match user intent effectively.",
    solution: "We implemented a comprehensive search optimization strategy with Elastic Search that included:\n\n- Custom-built search algorithms tailored to electronics product taxonomy\n- Intelligent query interpretation with natural language processing\n- Automated synonym management and search term enrichment\n- Machine learning-based relevance tuning based on user behavior",
    implementation: "Our implementation approach involved a three-phase process:\n\n1. **Discovery & Analysis**: Comprehensive audit of search performance, user behavior, and product data quality\n2. **Algorithm Development**: Creation of custom search algorithms and relevance models\n3. **Continuous Optimization**: Ongoing refinement based on real-time performance data",
    testimonial: {
      quote: "The search improvements transformed our online experience. Customers now find what they're looking for quickly, and our conversion rates have dramatically improved.",
      author: "Director of E-Commerce",
      company: "Major Electronics Retailer"
    }
  },
  {
    id: "search-platform-migration",
    title: "Search Platform Migration Success",
    description: "Our algorithm optimization during migration from Elastic Search to Coveo transformed search performance and improved customer satisfaction by 38%.",
    category: "Search Platform Migration",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMHN0b3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    client: "Fashion E-commerce Brand",
    results: [
      "Seamless migration without revenue loss",
      "38% improvement in customer satisfaction ratings",
      "42% faster search performance",
      "27% increase in product discovery metrics"
    ],
    challenge: "A leading fashion retailer needed to migrate from Elastic Search to Coveo to leverage AI-powered capabilities, but feared disruption to their search experience and potential revenue loss during the transition.",
    solution: "We developed a comprehensive migration strategy that included:\n\n- Parallel system operation during migration\n- Custom algorithm transfer and adaptation for the new platform\n- Extensive A/B testing to validate performance\n- Phased rollout to minimize risk",
    implementation: "The implementation followed a carefully orchestrated timeline:\n\n1. **Pre-Migration Audit**: Documenting all existing search behaviors and performance metrics\n2. **Algorithm Translation**: Converting custom logic to the new platform\n3. **Testing & Validation**: Extensive testing in staging environment\n4. **Phased Deployment**: Gradual traffic shifting to new platform with continuous monitoring",
    testimonial: {
      quote: "What could have been a risky transition turned into a major opportunity. The migration was seamless for our customers, and the search performance improvements exceeded our expectations.",
      author: "VP of Digital Experience",
      company: "Fashion E-commerce Brand"
    }
  },
  {
    id: "amazon-marketplace",
    title: "Amazon Marketplace Optimization",
    description: "Complete overhaul of product listing and SEO strategy resulted in 62% increase in organic visibility and 47% higher conversion rate.",
    category: "Marketpulse",
    image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJldGFpbCUyMHN0b3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    client: "Multi-category Retailer",
    results: [
      "62% increase in organic visibility",
      "47% higher conversion rate on Amazon",
      "31% growth in marketplace revenue",
      "52% improvement in product ranking positions"
    ],
    challenge: "The client was struggling with poor visibility and sluggish sales on Amazon despite having competitive products and pricing. Their listings weren't optimized for Amazon's search algorithm, and they lacked a cohesive strategy for marketplace presence.",
    solution: "We deployed our Marketpulse solution which included:\n\n- Comprehensive listing optimization for A9 algorithm compliance\n- Strategic keyword research and implementation\n- Enhanced product content with A+ content creation\n- Competitive analysis and positioning strategy",
    implementation: "The implementation process followed a systematic approach:\n\n1. **Catalog Assessment**: Complete audit of existing listings and performance\n2. **Optimization Execution**: Systematic improvement of titles, bullets, descriptions and backend terms\n3. **Enhanced Content**: Development of A+ content and optimized images\n4. **Performance Tracking**: Implementation of monitoring and continuous improvement processes",
    testimonial: {
      quote: "The transformation of our Amazon presence was remarkable. Not only did our products start appearing in searches more frequently, but our conversion rates improved substantially once customers found our optimized listings.",
      author: "E-commerce Director",
      company: "Multi-category Retailer"
    }
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing Campaign",
    description: "Strategic performance marketing for an online retailer resulted in 85% ROAS improvement and 39% reduction in customer acquisition costs.",
    category: "Performance Marketing",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    client: "Direct-to-Consumer Brand",
    results: [
      "85% improvement in Return on Ad Spend (ROAS)",
      "39% reduction in customer acquisition costs",
      "41% increase in new customer acquisition",
      "28% growth in repeat purchases from ads"
    ],
    challenge: "A direct-to-consumer brand was experiencing diminishing returns from their paid marketing efforts with rising acquisition costs and declining ROAS. Their campaigns lacked cohesion across channels and weren't effectively targeting high-value customer segments.",
    solution: "We implemented a comprehensive performance marketing strategy that included:\n\n- Data-driven audience segmentation and targeting\n- Multi-channel campaign orchestration\n- Custom conversion tracking and attribution modeling\n- Automated bid management and budget allocation",
    implementation: "The implementation followed a strategic approach:\n\n1. **Data Foundation**: Setting up proper tracking and attribution models\n2. **Channel Strategy**: Developing optimized approach for each marketing channel\n3. **Creative Development**: Creating targeted messaging for different segments\n4. **Continuous Optimization**: Implementing testing cycles and performance improvement processes",
    testimonial: {
      quote: "The results speak for themselves - lower costs and higher returns. But what impressed us most was the strategic approach that connected our marketing efforts across channels and created a cohesive customer journey.",
      author: "CMO",
      company: "Direct-to-Consumer Brand"
    }
  }
];

const CaseStudyDetail = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  
  // Find the case study by ID
  const caseStudy = caseStudies.find(study => study.id === studyId);
  
  // Redirect to case studies page if study not found
  useEffect(() => {
    if (!caseStudy) {
      navigate('/case-studies');
    }
  }, [caseStudy, navigate]);
  
  // If no case study found, return null (redirect will happen)
  if (!caseStudy) return null;
  
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>{caseStudy.title} | Stell Media Case Study</title>
        <meta name="description" content={caseStudy.description} />
        <meta property="og:title" content={`${caseStudy.title} | Stell Media Case Study`} />
        <meta property="og:description" content={caseStudy.description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={caseStudy.image} />
        <link rel="canonical" href={`https://stellmedia.com/case-studies/${studyId}`} />
      </Helmet>
      
      <Navbar />
      
      <main className="mobile-hero-spacing pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <span className="mx-2">→</span>
            <Link to="/case-studies" className="hover:text-indigo-600">Case Studies</Link>
            <span className="mx-2">→</span>
            <span className="text-indigo-600">{caseStudy.title}</span>
          </div>
        </div>
        
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 mb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <span className="bg-indigo-100 text-indigo-600 py-1 px-3 rounded-full text-sm font-medium inline-block mb-4">
                  {caseStudy.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {caseStudy.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">{caseStudy.description}</p>
                <div className="text-gray-700">
                  <p className="font-semibold">Client: <span className="font-normal">{caseStudy.client}</span></p>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title} 
                  className="rounded-lg shadow-xl w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Results section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Key Results</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-indigo-600" />
                    </div>
                  </div>
                  <p className="ml-3 text-lg">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Challenge and Solution */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">The Challenge</h2>
              <p className="text-gray-700 whitespace-pre-line">{caseStudy.challenge}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">Our Solution</h2>
              <p className="text-gray-700 whitespace-pre-line">{caseStudy.solution}</p>
            </div>
          </div>
        </section>
        
        {/* Implementation */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Implementation Approach</h2>
            <p className="text-gray-700 whitespace-pre-line">{caseStudy.implementation}</p>
          </div>
        </section>
        
        {/* Testimonial */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <div className="flex flex-col items-center text-center">
              <svg className="h-12 w-12 mb-6 text-indigo-200" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <p className="text-xl mb-6 italic">{caseStudy.testimonial.quote}</p>
              <div>
                <p className="font-semibold">{caseStudy.testimonial.author}</p>
                <p className="text-indigo-200">{caseStudy.testimonial.company}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA and navigation */}
        <section className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to achieve similar results?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let's discuss how our expertise in {caseStudy.category} can help your e-commerce business grow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
                <Link to="/consultation">Book a Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/case-studies">View Other Case Studies</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between mt-12">
            <Button asChild variant="ghost" className="flex items-center">
              <Link to="/case-studies">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
