
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Database, Layout, Layers, Network, ServerIcon, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const careers = [
  {
    title: "AI Solutions Architect",
    department: "Technology",
    location: "Remote (US)",
    type: "Full-time",
    description: "Lead the design and implementation of cutting-edge AI and machine learning solutions for e-commerce product discovery platforms.",
    requirements: [
      "5+ years of experience in AI/ML engineering",
      "Experience with NLP and search relevancy algorithms",
      "Proficiency in Python, TensorFlow, or PyTorch",
      "Understanding of e-commerce data structures and taxonomy",
      "Experience with cloud-based AI services (AWS, GCP, Azure)"
    ],
    icon: <Code className="h-10 w-10 text-indigo-500" />
  },
  {
    title: "Data Enrichment Specialist",
    department: "Data & Analytics",
    location: "Hybrid (New York)",
    type: "Full-time",
    description: "Transform messy e-commerce product data into structured, actionable information that drives superior shopping experiences.",
    requirements: [
      "3+ years in product data management or taxonomy",
      "Experience with PIM/DAM systems",
      "Strong analytical skills and attention to detail",
      "Knowledge of product attribute structures",
      "Experience with data cleansing techniques"
    ],
    icon: <Database className="h-10 w-10 text-indigo-500" />
  },
  {
    title: "Search Technology Engineer",
    department: "Product",
    location: "Remote (Europe)",
    type: "Full-time",
    description: "Implement and optimize search technologies like Algolia and Bloomreach to create intelligent product discovery experiences.",
    requirements: [
      "4+ years of experience with search technologies",
      "Experience with Algolia, Bloomreach, or Elasticsearch",
      "Strong JavaScript/TypeScript skills",
      "Understanding of search relevancy and ranking algorithms",
      "E-commerce platform integration experience"
    ],
    icon: <Rocket className="h-10 w-10 text-indigo-500" />
  },
  {
    title: "E-commerce Automation Specialist",
    department: "Operations",
    location: "Hybrid (London)",
    type: "Full-time",
    description: "Develop automation workflows that streamline e-commerce operations and product data management processes.",
    requirements: [
      "3+ years in automation or workflow development",
      "Experience with RPA tools or workflow automation software",
      "Understanding of e-commerce operational processes",
      "API integration experience",
      "Problem-solving mindset with analytical skills"
    ],
    icon: <ServerIcon className="h-10 w-10 text-indigo-500" />
  },
  {
    title: "Product Discovery UX Researcher",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Drive user research to understand how customers interact with search and navigation features in e-commerce platforms.",
    requirements: [
      "3+ years in UX research",
      "Experience conducting usability studies for search interfaces",
      "Knowledge of search patterns and behavior",
      "Ability to translate research insights into actionable recommendations",
      "E-commerce or retail experience preferred"
    ],
    icon: <Layout className="h-10 w-10 text-indigo-500" />
  }
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-indigo-100 to-purple-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Join Our Team
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Help us build the future of e-commerce product discovery through innovative AI, data science, and automation solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Culture</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    At Stell Media, we're passionate about solving complex problems at the intersection of 
                    e-commerce, artificial intelligence, and user experience. Our team combines deep 
                    technical expertise with a relentless focus on delivering measurable results for our clients.
                  </p>
                  <p>
                    We value innovation, continuous learning, and collaboration. Our hybrid work environment 
                    allows team members to work flexibly while maintaining strong connections with colleagues.
                  </p>
                  <p>
                    We're building a diverse team of specialists who are excited about pushing the boundaries of 
                    what's possible in e-commerce product discovery through automation, AI, and thoughtful UX design.
                  </p>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVhbSUyMHdvcmtpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="Stell Media Team Working" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Why Join Stell Media?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-sm border border-gray-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Cutting-Edge Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Work with the latest AI, machine learning, and search technologies to solve real-world e-commerce challenges and drive innovation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm border border-gray-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                    <Network className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Flexible Work Environment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Enjoy our hybrid work policy, competitive compensation, comprehensive healthcare, and generous PTO to maintain a healthy work-life balance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm border border-gray-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                    <Layers className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Career Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Develop your skills through continuous learning opportunities, mentorship, professional development funding, and a clear career progression path.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Open Positions</h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Join our team of experts and help us revolutionize e-commerce product discovery through technology and innovation.
            </p>
            
            <div className="space-y-8">
              {careers.map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow overflow-hidden border border-gray-200">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-4">
                        <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium mr-2">
                          {job.department}
                        </span>
                        <span className="text-gray-500 text-sm">{job.location}</span>
                        <span className="ml-auto text-sm font-medium text-gray-500">{job.type}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                      
                      <Button className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90 active:opacity-100">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="md:w-1/3 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-8">
                      <div>
                        {job.icon}
                        <h4 className="text-center font-medium mt-4 text-gray-900">{job.title}</h4>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-100 to-purple-100">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Don't See the Right Role?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
                We're always looking for talented individuals who are passionate about e-commerce, technology, and innovation.
              </p>
              <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 active:bg-gray-200">
                <Link to="/contact">
                  Contact Us
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

export default Careers;
