
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Privacy Policy | Stell Media</title>
        <meta name="description" content="Privacy policy and data protection practices of Stell Media." />
        <meta property="og:title" content="Privacy Policy | Stell Media" />
        <meta property="og:description" content="Privacy policy and data protection practices of Stell Media." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stellmedia.com/privacy" />
        <link rel="canonical" href="https://stellmedia.com/privacy" />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">Last updated: May 21, 2025</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
              <p>
                At Stell Media ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we handle your personal information when you visit our website 
                (www.stellmedia.com) and tell you about your privacy rights.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc ml-6 mt-2 mb-4">
                <li className="mb-2">
                  <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
                </li>
                <li className="mb-2">
                  <strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.
                </li>
                <li className="mb-2">
                  <strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.
                </li>
                <li className="mb-2">
                  <strong>Usage Data</strong> includes information about how you use our website, products and services.
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc ml-6 mt-2 mb-4">
                <li className="mb-2">To provide and maintain our services.</li>
                <li className="mb-2">To notify you about changes to our services.</li>
                <li className="mb-2">To provide customer support.</li>
                <li className="mb-2">To gather analysis or valuable information so that we can improve our services.</li>
                <li className="mb-2">To monitor the usage of our services.</li>
                <li className="mb-2">To detect, prevent and address technical issues.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: <a href="mailto:privacy@stellmedia.com" className="text-indigo-600 hover:text-indigo-800">privacy@stellmedia.com</a>
                <br />
                Phone: <a href="tel:+919877100369" className="text-indigo-600 hover:text-indigo-800">+91 98771 00369</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
