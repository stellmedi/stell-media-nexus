
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHelmet from "@/components/SEOHelmet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Globe, 
  Briefcase,
  CheckCircle,
  ArrowRight 
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Saurav Bansal",
      position: "Founder & CEO",
      bio: "18+ years in e-commerce optimization and digital transformation. Led initiatives at major retailers and technology companies.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      linkedin: "#"
    },
    {
      name: "Sarah Chen",
      position: "Head of Product Discovery",
      bio: "Expert in AI-powered search algorithms and machine learning. Former data scientist at leading e-commerce platforms.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      linkedin: "#"
    },
    {
      name: "Marcus Johnson",
      position: "Technical Director",
      bio: "Full-stack architect specializing in scalable e-commerce solutions. 15+ years building high-performance systems.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      linkedin: "#"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every strategy is designed to deliver measurable improvements in conversion rates and revenue."
    },
    {
      icon: Users,
      title: "Customer-Centric",
      description: "We prioritize user experience and customer satisfaction in all optimization efforts."
    },
    {
      icon: TrendingUp,
      title: "Continuous Innovation",
      description: "Staying ahead of e-commerce trends and implementing cutting-edge technologies."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the highest quality solutions and exceptional service."
    }
  ];

  const achievements = [
    { metric: "500+", label: "Projects Completed" },
    { metric: "150+", label: "Happy Clients" },
    { metric: "45%", label: "Average Conversion Increase" },
    { metric: "98%", label: "Client Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-indigo-50">
      <SEOHelmet pagePath="/about" />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About Stell Media
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're a team of e-commerce optimization experts dedicated to transforming online businesses 
              through innovative product discovery, search optimization, and conversion enhancement solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2">Founded 2018</Badge>
              <Badge variant="secondary" className="px-4 py-2">500+ Projects</Badge>
              <Badge variant="secondary" className="px-4 py-2">Global Reach</Badge>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Target className="h-8 w-8 text-indigo-600" />
                  Our Mission
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To empower e-commerce businesses with cutting-edge optimization solutions that enhance 
                  customer experience, increase conversions, and drive sustainable growth. We believe every 
                  online store has the potential to achieve exceptional performance.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Globe className="h-8 w-8 text-indigo-600" />
                  Our Vision
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become the global leader in e-commerce optimization, setting new standards for 
                  product discovery and conversion enhancement while helping businesses of all sizes 
                  reach their full potential in the digital marketplace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <value.icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Track Record</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{achievement.metric}</div>
                  <div className="text-gray-600">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Stell Media?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Proven Expertise</h3>
                      <p className="text-gray-600">18+ years of combined experience in e-commerce optimization and digital transformation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Data-Driven Approach</h3>
                      <p className="text-gray-600">Every recommendation is backed by thorough analysis and measurable results.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Custom Solutions</h3>
                      <p className="text-gray-600">Tailored strategies that align with your unique business goals and challenges.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Cutting-Edge Technology</h3>
                      <p className="text-gray-600">Leveraging the latest AI and machine learning technologies for optimal results.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Ongoing Support</h3>
                      <p className="text-gray-600">Continuous monitoring and optimization to ensure sustained performance improvements.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Transparent Communication</h3>
                      <p className="text-gray-600">Regular updates and clear reporting on progress and results.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your E-commerce Business?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Let's discuss how our expertise can help you achieve your optimization goals and drive sustainable growth.
            </p>
            <div className="space-x-4">
              <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
                <Briefcase className="mr-2 h-5 w-5" />
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
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
