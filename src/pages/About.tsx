
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Results-Driven",
      description: "We focus on measurable outcomes and ROI for every client partnership"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Client-Centric",
      description: "Your success is our success. We build long-term partnerships, not just projects"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "Innovation First",
      description: "We stay ahead of digital trends to give you competitive advantage"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-500" />,
      title: "Quality Excellence",
      description: "Every solution is crafted with attention to detail and industry best practices"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Us | Digital Marketing Experts | Stell Media</title>
        <meta name="description" content="Learn about Stell Media's mission to help real estate developers and e-commerce brands grow through innovative digital marketing solutions." />
        <meta name="keywords" content="about stell media, digital marketing agency, real estate marketing, ecommerce marketing experts" />
        <link rel="canonical" href="https://stellmedia.com/about" />
      </Helmet>

      <Navbar />
      
      <section className="mobile-hero-spacing pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              About Stell Media
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're digital growth specialists focused on helping real estate developers and e-commerce brands achieve measurable success through innovative marketing strategies.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Stell Media, we believe that every business deserves to thrive in the digital landscape. 
                We specialize in creating tailored growth strategies that combine cutting-edge technology 
                with proven marketing methodologies.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With over 18 years of combined experience in digital marketing, we've helped hundreds of 
                businesses transform their online presence and achieve sustainable growth.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 to-indigo-600">
                <Link to="/contact">Work With Us</Link>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>18+ years of digital marketing expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Specialized in real estate and e-commerce</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Data-driven approach to growth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Proven track record of success</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="h-full text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
