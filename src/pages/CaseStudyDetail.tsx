import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useCaseStudy } from "@/hooks/useCaseStudy";
import { Skeleton } from "@/components/ui/skeleton";

const CaseStudyDetail = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const { data: caseStudy, isLoading, error } = useCaseStudy(studyId);

  // Redirect to case studies page if study not found and not loading
  useEffect(() => {
    if (!isLoading && !caseStudy && !error) {
      navigate('/case-studies');
    }
  }, [caseStudy, isLoading, error, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-indigo-50">
        <Navbar />
        <main className="mobile-hero-spacing pb-20">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-64 mb-8" />
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-6" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="md:w-1/2">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !caseStudy) {
    return null; // Redirect will happen via useEffect
  }

  const testimonial = caseStudy.testimonial;

  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>{caseStudy.title} | Stell Media Case Study</title>
        <meta name="description" content={caseStudy.description} />
        <meta property="og:title" content={`${caseStudy.title} | Stell Media Case Study`} />
        <meta property="og:description" content={caseStudy.description} />
        <meta property="og:type" content="article" />
        {caseStudy.image && <meta property="og:image" content={caseStudy.image} />}
        <link rel="canonical" href={`https://stellmedia.com/case-studies/${caseStudy.slug}`} />
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
                {caseStudy.category && (
                  <span className="bg-indigo-100 text-indigo-600 py-1 px-3 rounded-full text-sm font-medium inline-block mb-4">
                    {caseStudy.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {caseStudy.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">{caseStudy.description}</p>
                {caseStudy.client && (
                  <div className="text-gray-700">
                    <p className="font-semibold">Client: <span className="font-normal">{caseStudy.client}</span></p>
                  </div>
                )}
              </div>
              <div className="md:w-1/2">
                <img 
                  src={caseStudy.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"} 
                  alt={caseStudy.title} 
                  className="rounded-lg shadow-xl w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Results section */}
        {caseStudy.results && caseStudy.results.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-indigo-700">Key Results</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">{result.metric}</div>
                    <div className="text-sm text-gray-600">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Challenge and Solution */}
        {(caseStudy.challenge || caseStudy.solution) && (
          <section className="container mx-auto px-4 mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudy.challenge && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-700">The Challenge</h2>
                  <p className="text-gray-700 whitespace-pre-line">{caseStudy.challenge}</p>
                </div>
              )}
              {caseStudy.solution && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-700">Our Solution</h2>
                  <p className="text-gray-700 whitespace-pre-line">{caseStudy.solution}</p>
                </div>
              )}
            </div>
          </section>
        )}
        
        {/* Implementation */}
        {caseStudy.implementation && caseStudy.implementation.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-indigo-700">Implementation Approach</h2>
              <div className="space-y-4">
                {caseStudy.implementation.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Check className="h-4 w-4 text-indigo-600" />
                      </div>
                    </div>
                    <p className="ml-3 text-lg text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Testimonial */}
        {testimonial && testimonial.quote && (
          <section className="container mx-auto px-4 mb-16">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <div className="flex flex-col items-center text-center">
                <svg className="h-12 w-12 mb-6 text-indigo-200" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-xl mb-6 italic">{testimonial.quote}</p>
                <div>
                  {testimonial.author && <p className="font-semibold">{testimonial.author}</p>}
                  {testimonial.role && <p className="text-indigo-200">{testimonial.role}</p>}
                  {testimonial.company && <p className="text-indigo-200">{testimonial.company}</p>}
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* CTA and navigation */}
        <section className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to achieve similar results?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let's discuss how our expertise in {caseStudy.category || "digital marketing"} can help your business grow.
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
