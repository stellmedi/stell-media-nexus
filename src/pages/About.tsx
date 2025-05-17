
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Database, Layers, Network } from "lucide-react";

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former e-commerce executive with 15+ years of experience optimizing product discovery with AI and machine learning for major retail brands.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "David Chen",
    role: "CTO",
    bio: "AI and ML expert specializing in search algorithms, neural networks, and automation with background from leading tech companies.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Maria Rodriguez",
    role: "Head of SEO & AI Strategy",
    bio: "AI-powered SEO strategist specializing in automated optimization for e-commerce with expertise in machine learning applications for search.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "James Wilson",
    role: "Head of Data Science",
    bio: "Data scientist specializing in AI-driven automation for transforming unstructured product data into valuable business assets through machine learning.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Alex Thompson",
    role: "Head of Hybrid Solutions",
    bio: "Expert in creating seamless omnichannel experiences that bridge digital and physical retail through innovative technology integration.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Sophia Lee",
    role: "Head of Automation",
    bio: "Process automation specialist with expertise in developing AI-driven workflows that streamline e-commerce operations and improve efficiency.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                About Stell Media
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're on a mission to revolutionize e-commerce product discovery through AI innovation, intelligent automation, and hybrid commerce solutions that help brands connect customers with the products they'll love.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlYW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="Stell Media Team" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Stell Media was founded in 2015 by a team of AI experts, data scientists and e-commerce specialists who saw a common problem: online stores were struggling to help customers find products in large, complex catalogs using outdated technology.
                  </p>
                  <p>
                    What started as a small consultancy focused on search optimization has evolved into a full-service product discovery agency, pioneering the use of artificial intelligence, machine learning, and intelligent automation to transform the digital shopping experience.
                  </p>
                  <p>
                    Today, our team combines technical expertise in AI algorithms, data science, and hybrid commerce solutions with a deep understanding of customer behavior and conversion optimization to create truly intelligent shopping experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">AI-Driven Innovation</h3>
                <p className="text-gray-600">
                  We believe in leveraging the power of artificial intelligence and machine learning to create solutions that continuously learn, adapt, and improve based on real data and user behavior.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                    <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Customer-First Automation</h3>
                <p className="text-gray-600">
                  We automate to enhance human experiences, not replace them. Our technology solutions are designed to make shopping more intuitive, personalized, and enjoyable.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Hybrid Excellence</h3>
                <p className="text-gray-600">
                  We believe in creating seamless experiences that transcend channels, combining the best of digital innovation with the human touch of physical retail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Technology */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Our Technology Stack</h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              We leverage cutting-edge technologies to deliver intelligent, scalable, and future-proof solutions.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <Code className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">Artificial Intelligence</h3>
                <p className="text-gray-600 text-sm">
                  Custom machine learning models for search relevancy, product recommendations, and customer behavior prediction.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <Database className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">Data Processing</h3>
                <p className="text-gray-600 text-sm">
                  Big data architecture for processing millions of products and customer interactions in real-time.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <Network className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">Automation Platform</h3>
                <p className="text-gray-600 text-sm">
                  Proprietary workflow automation tools for e-commerce operations, marketing, and customer service.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <Layers className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">Hybrid Commerce</h3>
                <p className="text-gray-600 text-sm">
                  Omnichannel solutions that bridge online and offline shopping through integrated technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Meet the experts behind Stell Media's innovative approach to AI-powered e-commerce optimization.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover object-center" 
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                    <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Growing Team</h2>
              <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
                We're always looking for talented individuals passionate about e-commerce, AI, automation, and innovative technology solutions.
              </p>
              <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 active:bg-gray-200">
                <Link to="/careers">
                  View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
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

export default About;
