
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const SEOFeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our SEO Approach</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white border border-gray-100 hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 11-6 6v3h9l3-3"></path>
                  <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"></path>
                  <path d="m14 4 6 6"></path>
                  <path d="m18 2 4 4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Technical SEO Audits</h3>
              <p className="text-gray-600">
                Comprehensive analysis of your e-commerce site's structure, indexability, and performance to ensure search engines can effectively crawl and understand your content.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-100 hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path>
                  <path d="M15 3v6h6"></path>
                  <path d="M10 14 8 12l-2 2"></path>
                  <path d="m18 17-2-2-2 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Product Page Optimization</h3>
              <p className="text-gray-600">
                Strategic optimization of product pages with relevant keywords, schema markup, and enhanced meta data to improve visibility and click-through rates.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-100 hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Category Structure Enhancement</h3>
              <p className="text-gray-600">
                Optimizing your site's taxonomy and category structure to improve user experience and search engine visibility for key product segments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SEOFeaturesSection;
