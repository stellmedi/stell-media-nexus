
import React from "react";
import { Link } from "react-router-dom";

const ECommerceServices = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-200 shadow-lg">
      <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        E-Commerce Services
      </h4>
      <ul className="space-y-2">
        <li>
          <Link 
            to="/ecommerce"
            className="text-gray-600 hover:text-purple-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-purple-50"
          >
            Product Discovery Management
          </Link>
        </li>
        <li>
          <Link 
            to="/ecommerce"
            className="text-gray-600 hover:text-purple-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-purple-50"
          >
            Catalog SEO & Data Enrichment
          </Link>
        </li>
        <li>
          <Link 
            to="/ecommerce"
            className="text-gray-600 hover:text-purple-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-purple-50"
          >
            Performance Marketing
          </Link>
        </li>
        <li>
          <Link 
            to="/ecommerce"
            className="text-gray-600 hover:text-purple-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-purple-50"
          >
            Conversion Optimization
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ECommerceServices;
