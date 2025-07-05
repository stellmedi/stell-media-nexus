import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FAQSection from "@/components/FAQSection";

const ConversionOptimization = () => {
  // FAQ items for Conversion Optimization
  const faqItems = [
    {
      question: "How do you identify conversion rate optimization opportunities?",
      answer: "We use a data-driven approach that combines quantitative analysis (heatmaps, session recordings, analytics) with qualitative insights (user testing, surveys) to identify specific friction points in your conversion funnel. Our proprietary analytics platform also detects pattern anomalies and opportunities that basic analytics might miss."
    },
    {
      question: "What testing methodology do you use for optimizing conversions?",
      answer: "We primarily use A/B and multivariate testing backed by statistical significance calculations to ensure reliable results. For lower traffic sites, we employ sequential testing methods. All tests are designed based on behavioral psychology principles and data-backed hypotheses rather than subjective opinions."
    },
    {
      question: "How long does it typically take to see results from CRO efforts?",
      answer: "Most clients see measurable improvements within the first 90 days. Initial quick wins often come from fixing obvious usability issues, while more substantial gains emerge from our iterative testing program over 6-12 months. The compounding effect of continuous optimization typically delivers 15-30% conversion rate improvements within the first year."
    },
    {
      question: "Do you focus only on checkout conversion or the entire customer journey?",
      answer: "We optimize the entire customer journey from initial landing page experience through product discovery, consideration, checkout, and post-purchase communication. Our holistic approach recognizes that conversion optimization extends beyond the buy button to include average order value, repeat purchases, and customer lifetime value."
    },
    {
      question: "How do you measure the ROI of conversion optimization services?",
      answer: "We establish clear baseline metrics before beginning optimization work and track improvements in conversion rate, average order value, revenue per visitor, and ultimately overall revenue impact. Our reporting includes projected annualized revenue increases based on implemented changes, giving you clear visibility into program ROI."
    },
    {
      question: "Can you integrate with our existing tech stack and analytics tools?",
      answer: "Yes, our conversion optimization infrastructure works with virtually any e-commerce platform and integrates with all major analytics tools including Google Analytics, Adobe Analytics, Hotjar, FullStory, and custom data solutions. We can also deploy custom tracking when needed to capture specific interactions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="mobile-hero-spacing pb-16 bg-gradient-to-r from-blue-50 to-indigo-50 relative min-h-screen">
          <div className="container mx-auto px-4 min-h-screen flex items-center justify-center"
               style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}>
            <div className="max-w-3xl mx-auto text-center w-full">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Conversion Rate Optimization
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform more of your website visitors into customers with data-driven optimization strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Maximize Your E-commerce Conversion Rate</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Our conversion optimization services focus on transforming more of your existing traffic into paying customers through systematic testing and optimization.
                  </p>
                  <p>
                    We analyze user behavior, identify friction points, and implement targeted improvements that drive significant increases in your conversion rates.
                  </p>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGN1c3RvbWVyJTIwam91cm5leXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="Conversion Optimization" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>

            {/* Our Process */}
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our Conversion Optimization Process</h3>
            <div className="space-y-8 mb-16">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-indigo-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">1</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Data Analysis</h4>
                  <p className="text-gray-600">
                    We analyze your analytics data, user session recordings, and heatmaps to identify areas of opportunity and friction points in the customer journey.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-indigo-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">2</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Hypothesis Development</h4>
                  <p className="text-gray-600">
                    Based on data insights, we develop testable hypotheses about what changes will improve your conversion rates.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-indigo-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">3</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900">A/B Testing</h4>
                  <p className="text-gray-600">
                    We implement controlled tests to measure the impact of our proposed changes on actual user behavior and conversion metrics.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-indigo-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">4</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Implementation</h4>
                  <p className="text-gray-600">
                    Successful tests are implemented across your site, creating a measurable lift in your conversion metrics.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-indigo-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">5</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Continuous Improvement</h4>
                  <p className="text-gray-600">
                    We maintain an ongoing testing program to continuously improve your conversion rates over time.
                  </p>
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Key Focus Areas</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Product Page Optimization</h4>
                <p className="text-gray-600">Enhance product imagery, descriptions, and layout to increase add-to-cart rates.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Checkout Flow Enhancement</h4>
                <p className="text-gray-600">Streamline the purchase process to reduce cart abandonment and increase completed purchases.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Mobile Optimization</h4>
                <p className="text-gray-600">Ensure a seamless mobile shopping experience that converts just as well as desktop.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Trust & Credibility Enhancements</h4>
                <p className="text-gray-600">Build customer confidence with strategic placement of reviews, testimonials, and trust indicators.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Personalization Strategies</h4>
                <p className="text-gray-600">Implement personalized experiences based on user behavior and preferences.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold mb-3 text-gray-900">Value Proposition Clarity</h4>
                <p className="text-gray-600">Refine messaging to clearly communicate the unique value of your products and overcome objections.</p>
              </div>
            </div>

            {/* FAQ Section */}
            <FAQSection items={faqItems} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to boost your conversion rates?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Let's discuss how our conversion optimization strategies can help turn more of your traffic into paying customers.
              </p>
              <Button asChild size="lg" variant="cta" className="shadow-xl">
                <Link to="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConversionOptimization;
