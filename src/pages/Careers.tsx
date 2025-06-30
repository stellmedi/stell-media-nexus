
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobApplicationForm from "@/components/JobApplicationForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Award, Coffee } from "lucide-react";

const Careers = () => {
  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Collaborative Team",
      description: "Work with talented professionals in a supportive, growth-oriented environment"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "Career Growth",
      description: "Continuous learning opportunities and clear paths for professional advancement"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-500" />,
      title: "Competitive Benefits",
      description: "Comprehensive benefits package including health insurance and performance bonuses"
    },
    {
      icon: <Coffee className="h-8 w-8 text-blue-500" />,
      title: "Work-Life Balance",
      description: "Flexible work arrangements and a culture that values personal well-being"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Careers | Join Our Team | Stell Media</title>
        <meta name="description" content="Join the Stell Media team and build your career in digital marketing. Explore opportunities in SEO, SEM, content marketing, and more." />
        <meta name="keywords" content="careers, jobs, digital marketing careers, stell media jobs, marketing jobs" />
        <link rel="canonical" href="https://stellmedia.com/careers" />
      </Helmet>

      <Navbar />
      
      <section className="mobile-hero-spacing pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Build your career with a leading digital marketing agency. We're looking for passionate professionals who want to make a real impact.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              At Stell Media, we believe in creating an environment where talented people can thrive and grow their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Apply Now</h2>
              <p className="text-lg text-gray-600">
                Ready to join our team? Send us your application and let's start the conversation.
              </p>
            </div>
            <JobApplicationForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
