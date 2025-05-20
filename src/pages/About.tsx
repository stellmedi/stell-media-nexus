
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const team = [
  {
    name: "Saurav Bansal",
    role: "CEO & Founder",
    bio: "With over 18 years of global experience leading digital transformation, marketing, automation, and AI-powered solutions across Fortune 500 companies and high-growth enterprises.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Maria Rodriguez",
    role: "Head of SEO & Strategy",
    bio: "Expert SEO strategist specializing in automated optimization for e-commerce with expertise in developing practical applications for improved search performance.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "James Wilson",
    role: "Head of Data Science",
    bio: "Data scientist specializing in automation techniques for transforming unstructured product data into valuable business assets through advanced analytics.",
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
    bio: "Process automation specialist with expertise in developing data-driven workflows that streamline e-commerce operations and improve efficiency.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  }
];

// Flag to hide the team section
const HIDE_TEAM_SECTION = true;

const About = () => {
  return (
    <div className="min-h-screen bg-white">
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
                We're a digital-first company that combines the power of technology with human expertise to deliver transformative solutions for e-commerce businesses seeking growth and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story - Updated with founder info */}
        <section className="py-16 bg-white">
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
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Founder's Journey</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    With over 18 years of global experience leading digital transformation, marketing, automation, and strategic innovation across Fortune 500 companies and high-growth enterprises, our founder Saurav Bansal established Stell Media to solve real-world growth challenges at scale.
                  </p>
                  <p>
                    In his past engagements, Saurav has worked with Fortune 500 clients across the globe in various leadership roles, including managing tech support centers and leading digital operations and automation teams for major brands.
                  </p>
                  <p>
                    Throughout his career, Saurav has delivered end-to-end digital solutions, operational transformations, and marketing strategies across Europe, North America, and Asia—working with global sportswear companies, leading computer manufacturers, and top telecommunications providers.
                  </p>
                  <p>
                    These experiences inspired him to create Stell Media Group—a digital-first company with full-stack capabilities, specialized e-commerce solutions focusing on product discovery, SEO, performance marketing, and automation to help businesses worldwide grow faster and scale smarter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
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
                <h3 className="text-xl font-bold mb-3 text-gray-900">Technology-Driven Innovation</h3>
                <p className="text-gray-600">
                  We leverage cutting-edge technology solutions that continuously learn, adapt, and improve based on real data and user behavior to deliver exceptional results.
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
                <h3 className="text-xl font-bold mb-3 text-gray-900">Human-Enhanced Automation</h3>
                <p className="text-gray-600">
                  We automate to enhance human experiences, not replace them. Our technology solutions combine with human expertise to make shopping more intuitive and personalized.
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
                  We create seamless experiences that transcend channels, combining the best of digital innovation with the human touch of physical retail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section - Hidden for now using the HIDE_TEAM_SECTION flag */}
        {!HIDE_TEAM_SECTION && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Our Team</h2>
              <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                Meet the experts behind Stell Media's innovative approach to technology-enhanced e-commerce optimization.
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
        )}

        {/* CTA Section - Updated to match site-wide CTA style */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Growing Team</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                We're always looking for talented individuals passionate about e-commerce, technology innovation, automation, and creative solutions.
              </p>
              <Button asChild size="lg" variant="cta" className="shadow-xl">
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
