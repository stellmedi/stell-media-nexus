
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/contact/ConsultationForm";
import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";

const Consultation = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Book a Consultation | Stell Media E-commerce Experts</title>
        <meta 
          name="description" 
          content="Schedule a free consultation with Stell Media's e-commerce optimization experts. Get personalized advice on improving your product discovery and conversion rates."
        />
        <meta name="keywords" content="e-commerce consultation, product discovery consultation, SEO consultation, e-commerce optimization" />
        <link rel="canonical" href="https://stellmedia.com/consultation" />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Book Your Free Consultation
              </h1>
              <p className="text-xl mb-8">
                Get expert advice tailored to your e-commerce business needs. Our team will analyze your current setup and provide actionable recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Book a Consultation?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our consultations are designed to help you identify opportunities for growth and overcome challenges in your e-commerce business. We'll provide actionable insights based on our expertise in product discovery optimization.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Expert Analysis</h3>
                      <p className="text-gray-600">Get a comprehensive review of your current e-commerce setup and product discovery experience.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Customized Recommendations</h3>
                      <p className="text-gray-600">Receive tailored strategies specific to your industry, audience, and business goals.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">Actionable Insights</h3>
                      <p className="text-gray-600">Walk away with clear, practical steps you can implement immediately to improve results.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4 flex-shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">No Obligation</h3>
                      <p className="text-gray-600">Our initial consultation is completely free with no pressure to purchase services.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">What to Expect</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li>Fill out the consultation request form with your business details.</li>
                    <li>Our team will review your information and schedule a call at your convenience.</li>
                    <li>During the consultation, we'll discuss your challenges and goals.</li>
                    <li>You'll receive a follow-up email with a summary of recommendations.</li>
                    <li>You decide if you'd like to proceed with any of our services.</li>
                  </ol>
                </div>
              </div>
              
              <ConsultationForm className="md:mt-0" />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">What Our Clients Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "The consultation with Stell Media opened our eyes to numerous opportunities we were missing. Their recommendations increased our conversion rate by 28%.",
                  author: "Sarah J.",
                  company: "Fashion Retailer"
                },
                {
                  quote: "We were struggling with product discovery on our site. After implementing the strategies from our consultation, our average order value increased by 15%.",
                  author: "Michael T.",
                  company: "Electronics E-commerce"
                },
                {
                  quote: "The team provided concrete, actionable advice that we could implement right away. They truly understand the nuances of e-commerce optimization.",
                  author: "Priya M.",
                  company: "Home Goods Store"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Consultation;
