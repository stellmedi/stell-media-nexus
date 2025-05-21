
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Helmet>
        <title>Terms of Service | Stell Media</title>
        <meta name="description" content="Terms and conditions for using Stell Media's services and website." />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">Last updated: May 21, 2025</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you and Stell Media 
                ("we," "us," or "our"), concerning your access to and use of the www.stellmedia.com website as 
                well as any other media form, media channel, mobile website or mobile application related, linked, 
                or otherwise connected thereto (collectively, the "Site").
              </p>
              <p>
                You agree that by accessing the Site, you have read, understood, and agreed to be bound by these 
                Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited 
                from using the Site and you must discontinue use immediately.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, 
                functionality, software, website designs, audio, video, text, photographs, and graphics on the 
                Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein 
                (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and 
                trademark laws and various other intellectual property rights.
              </p>
              <p>
                The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. 
                Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks 
                may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, 
                translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose 
                whatsoever, without our express prior written permission.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Representations</h2>
              <p>By using the Site, you represent and warrant that:</p>
              <ul className="list-disc ml-6 mt-2 mb-4">
                <li className="mb-2">All registration information you submit will be true, accurate, current, and complete.</li>
                <li className="mb-2">You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li className="mb-2">You have the legal capacity and you agree to comply with these Terms of Service.</li>
                <li className="mb-2">You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
                <li className="mb-2">You will not use the Site for any illegal or unauthorized purpose.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                Email: <a href="mailto:legal@stellmedia.com" className="text-indigo-600 hover:text-indigo-800">legal@stellmedia.com</a>
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

export default Terms;
