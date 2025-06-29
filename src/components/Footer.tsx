
import React from "react";
import CompanyInfo from "./footer/CompanyInfo";
import RealEstateServices from "./footer/RealEstateServices";
import ECommerceServices from "./footer/ECommerceServices";
import CompanyLinks from "./footer/CompanyLinks";
import FooterBottom from "./footer/FooterBottom";

const Footer = () => {
  return (
    <footer id="about" className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 text-gray-700 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <CompanyInfo />
          <RealEstateServices />
          <ECommerceServices />
          <CompanyLinks />
        </div>
        
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
