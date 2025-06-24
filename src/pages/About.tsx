
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHelmet from "@/components/SEOHelmet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Globe, 
  Briefcase,
  CheckCircle,
  ArrowRight,
  Building,
  ShoppingCart,
  Clock,
  Star,
  User,
  Heart,
  Share2,
  Palette
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every strategy is designed to deliver measurable improvements in leads, conversions, and revenue across both industries."
    },
    {
      icon: Users,
      title: "Industry-Focused",
      description: "Deep specialization in real estate and e-commerce ensures we understand your unique challenges and opportunities."
    },
    {
      icon: TrendingUp,
      title: "End-to-End Solutions",
      description: "Complete digital transformation from initial strategy to implementation and ongoing optimization."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Delivering enterprise-grade solutions with meticulous attention to detail and exceptional service standards."
    }
  ];

  const achievements = [
    { metric: "Virtual Tour Engagement", label: "Higher Property Interest", icon: <Building className="w-5 h-5 text-blue-600" /> },
    { metric: "CRM Automation", label: "Faster Lead Response", icon: <Clock className="w-5 h-5 text-indigo-600" /> },
    { metric: "Search Optimization", label: "Better Product Discovery", icon: <ShoppingCart className="w-5 h-5 text-purple-600" /> },
    { metric: "Performance Marketing", label: "Enhanced ROAS", icon: <TrendingUp className="w-5 h-5 text-green-600" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <SEOHelmet pagePath="/about" />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              Your Complete Digital Growth Partner
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              About Stell Media
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              We're a specialized digital transformation agency dedicated to delivering 
              <strong className="text-blue-700"> comprehensive real estate solutions</strong> and 
              <strong className="text-purple-700"> advanced e-commerce optimization</strong> that drive exceptional growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="px-6 py-3 text-base bg-blue-100 text-blue-800">15+ Years Global Experience</Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base bg-indigo-100 text-indigo-800">Fortune 500 Clients</Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base bg-purple-100 text-purple-800">Dual Industry Focus</Badge>
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="py-20 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                  Meet Our Founder
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  A vision born from global experience and passion for transformative digital solutions.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 shadow-xl border border-gray-100">
                <div className="grid lg:grid-cols-3 gap-12 items-center">
                  <div className="lg:col-span-1 text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Saurav Sharma</h3>
                    <p className="text-blue-600 font-semibold mb-4">Founder & CEO</p>
                    <div className="flex justify-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">Global Fortune 500 Experience</h4>
                          <p className="text-gray-700 leading-relaxed">
                            With over 15 years of global digital experience working with Fortune 500 companies, 
                            Saurav has led digital transformation initiatives across multiple continents, 
                            bringing enterprise-level expertise to businesses of all sizes.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">Passion for Real Estate Innovation</h4>
                          <p className="text-gray-700 leading-relaxed">
                            Saurav's deep passion for real estate technology and innovation drives Stell Media's 
                            mission to revolutionize how properties are marketed and sold. His vision combines 
                            cutting-edge technology with deep industry understanding to create transformative solutions.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                        <p className="text-lg italic text-gray-700 leading-relaxed">
                          "I founded Stell Media with a simple belief: every business deserves access to 
                          enterprise-level digital solutions. By focusing deeply on real estate and e-commerce, 
                          we can deliver the specialized expertise that drives real, measurable results."
                        </p>
                        <div className="flex items-center mt-4">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">— Saurav Sharma, Founder & CEO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  Our Mission
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To empower businesses in real estate and e-commerce with cutting-edge digital solutions that enhance 
                  customer experiences, accelerate lead generation, optimize conversions, and drive sustainable growth. 
                  We believe every business deserves access to enterprise-level digital transformation.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  Our Vision
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To become the global leader in specialized digital transformation for real estate and e-commerce, 
                  setting new standards for innovation, results, and client success while helping businesses 
                  of all sizes achieve their full potential in the digital marketplace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Expertise */}
        <section className="py-20 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Dual Industry Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our specialized focus on two high-growth industries allows us to deliver unmatched expertise and results.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Real Estate */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Real Estate Focus</h3>
                    <p className="text-blue-600 font-semibold">Complete Digital Transformation</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Virtual Tours & 3D Visualization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>CRM & Lead Management Systems</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Branding & Social Media Management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Automated Marketing & Follow-ups</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>SEO & Digital Presence Management</span>
                  </li>
                </ul>
              </div>

              {/* E-Commerce */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6">
                    <ShoppingCart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">E-Commerce Focus</h3>
                    <p className="text-purple-600 font-semibold">Growth & Optimization</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Product Discovery & Search Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Catalog SEO & Data Enrichment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Performance Marketing Campaigns</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Conversion Rate Optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <value.icon className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
                    <h3 className="font-bold text-xl mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Our Impact Areas
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex justify-center mb-4">
                    {achievement.icon}
                  </div>
                  <div className="text-lg font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {achievement.metric}
                  </div>
                  <div className="text-gray-600 font-medium">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Removed image, kept text */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Meet Our Expert Team
            </h2>
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Our diverse team of specialists brings together years of focused experience in real estate and e-commerce 
                digital transformation. We combine deep industry knowledge with cutting-edge technology expertise to deliver 
                results that exceed expectations and drive sustainable business growth.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section - Updated */}
        <section className="py-20 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Whether you're in real estate or e-commerce, let's discuss how our specialized expertise 
              can accelerate your growth and deliver exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/consultation">
                <Button size="xl" className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-10 py-6 text-lg shadow-lg">
                  <Briefcase className="mr-3 h-5 w-5" />
                  Start Your Transformation
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-indigo-600 font-semibold px-10 py-6 text-lg"
                >
                  Explore Our Services <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
