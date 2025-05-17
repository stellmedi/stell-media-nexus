
import React from "react";

const SEOProcessSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our SEO Process</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Comprehensive Audit</h3>
                <p className="text-gray-600">
                  We start by analyzing your current SEO performance, identifying technical issues, content gaps, and opportunities for improvement.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Strategic Planning</h3>
                <p className="text-gray-600">
                  We develop a customized SEO strategy that aligns with your business goals and targets your most valuable product categories and keywords.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Implementation</h3>
                <p className="text-gray-600">
                  Our team executes the strategy by improving site structure, enhancing on-page elements, and implementing technical SEO improvements.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                <span className="font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Monitoring & Optimization</h3>
                <p className="text-gray-600">
                  We continuously track performance metrics and refine our approach to ensure maximum visibility and ROI from your SEO investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOProcessSection;
