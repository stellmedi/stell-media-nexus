
import React from "react";
import { Link } from "react-router-dom";

const FooterBottom = () => {
  return (
    <div className="border-t-2 border-gradient-to-r from-indigo-200 via-purple-200 to-blue-200 pt-8 mt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center bg-white/40 backdrop-blur-sm rounded-lg p-4">
      <p>© {new Date().getFullYear()} Stell Media. All rights reserved. | www.stellmedia.com</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <Link to="/privacy" className="text-gray-500 hover:text-indigo-600 transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms" className="text-gray-500 hover:text-indigo-600 transition-colors">
          Terms of Service
        </Link>
        <Link to="/sitemap" className="text-gray-500 hover:text-indigo-600 transition-colors">
          Sitemap
        </Link>
      </div>
    </div>
  );
};

export default FooterBottom;
