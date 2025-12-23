import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimpleContactForm from "@/components/contact/SimpleContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageContent } from "@/hooks/usePageContent";
import { Skeleton } from "@/components/ui/skeleton";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface ContactInfoItem {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  details?: string;
}

interface ExpectationItem {
  text: string;
}

const Contact = () => {
  const { content, isLoading, getSection } = usePageContent('/contact');

  const heroSection = getSection('hero');
  const contactInfoSection = getSection('contact_info');
  const expectationsSection = getSection('expectations');

  const contactInfoMeta = contactInfoSection?.metadata as Record<string, any> || {};
  const expectationsMeta = expectationsSection?.metadata as Record<string, any> || {};

  // Fallback contact info
  const fallbackContactInfo: ContactInfoItem[] = [
    { id: "1", icon_name: "Mail", title: "Email", description: "Send us a message anytime", details: "info@stellmedia.com" },
    { id: "2", icon_name: "Phone", title: "Phone", description: "Call us for immediate assistance", details: "+91 98771 00369" },
    { id: "3", icon_name: "MapPin", title: "Location", description: "Serving clients globally", details: "India" },
    { id: "4", icon_name: "Clock", title: "Business Hours", description: "We respond within 24 hours", details: "Mon - Fri: 9AM - 6PM IST" }
  ];

  const fallbackExpectations = [
    "Response within 24 hours",
    "Free consultation and strategy discussion",
    "Customized recommendations for your business",
    "No obligation, just valuable insights"
  ];

  const contactInfo: ContactInfoItem[] = contactInfoMeta.items?.length > 0 
    ? contactInfoMeta.items 
    : fallbackContactInfo;

  const expectations: string[] = expectationsMeta.list_items?.length > 0 
    ? expectationsMeta.list_items 
    : fallbackExpectations;

  // Icon fallbacks
  const iconFallbacks: Record<string, React.ReactNode> = {
    Mail: <Mail className="h-6 w-6 text-blue-500" />,
    Phone: <Phone className="h-6 w-6 text-blue-500" />,
    MapPin: <MapPin className="h-6 w-6 text-blue-500" />,
    Clock: <Clock className="h-6 w-6 text-blue-500" />
  };

  if (isLoading) {
    return (
      <div className="bg-white">
        <Navbar />
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-1/2 mx-auto mb-6" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Helmet>
        <title>{content?.meta_title || "Contact Us | Get In Touch | Stell Media"}</title>
        <meta name="description" content={content?.meta_description || "Get in touch with Stell Media for digital marketing solutions."} />
        <link rel="canonical" href="https://stellmedia.com/contact" />
      </Helmet>

      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="mobile-hero-spacing pb-16 bg-gradient-to-br from-blue-50 to-indigo-50"
        style={{ paddingTop: 'max(7rem, calc(64px + env(safe-area-inset-top, 0px)))' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              {heroSection?.title || "Get In Touch"}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {heroSection?.content || "Ready to transform your digital presence? Let's discuss how we can help grow your business."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">
                {contactInfoSection?.title || "Contact Information"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((info) => (
                  <Card key={info.id} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <DynamicIcon 
                          name={info.icon_name} 
                          className="h-6 w-6 text-blue-500"
                          fallback={iconFallbacks[info.icon_name || 'Mail']}
                        />
                        <CardTitle className="text-lg">{info.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-gray-900 mb-1">{info.details || info.description}</p>
                      {info.details && <CardDescription>{info.description}</CardDescription>}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  {expectationsSection?.title || "What to Expect"}
                </h3>
                <ul className="space-y-3">
                  {expectations.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
              <SimpleContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
