
import React from "react";
import { Link } from "react-router-dom";

const RealEstateServices = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-200 shadow-lg">
      <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        Real Estate Services
      </h4>
      <ul className="space-y-2">
        <li>
          <Link 
            to="/real-estate"
            className="text-gray-600 hover:text-blue-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-blue-50"
          >
            Virtual Tours & Photography
          </Link>
        </li>
        <li>
          <Link 
            to="/real-estate"
            className="text-gray-600 hover:text-blue-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-blue-50"
          >
            3D Visualization & Animation
          </Link>
        </li>
        <li>
          <Link 
            to="/real-estate"
            className="text-gray-600 hover:text-blue-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-blue-50"
          >
            CRM & Lead Management
          </Link>
        </li>
        <li>
          <Link 
            to="/real-estate"
            className="text-gray-600 hover:text-blue-600 transition-colors block px-2 py-1 -ml-2 rounded hover:bg-blue-50"
          >
            Lead Generation & Marketing
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RealEstateServices;
