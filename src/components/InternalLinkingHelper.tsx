
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

export const InternalLink: React.FC<InternalLinkProps> = ({ 
  to, 
  children, 
  className = "", 
  showArrow = false 
}) => {
  return (
    <Link 
      to={to} 
      className={`text-indigo-600 hover:text-indigo-800 underline decoration-indigo-300 hover:decoration-indigo-500 transition-colors ${className}`}
    >
      {children}
      {showArrow && <ArrowRight className="inline ml-1 h-4 w-4" />}
    </Link>
  );
};

// Service cross-linking suggestions
export const ServiceCrossLinks = () => {
  const linkSuggestions = [
    {
      from: 'Real Estate CRM',
      to: '/services/crm-lead-management',
      relatedService: 'Lead Generation',
      relatedLink: '/services/lead-generation'
    },
    {
      from: 'E-commerce SEO',
      to: '/services/seo',
      relatedService: 'Product Discovery',
      relatedLink: '/services/product-discovery'
    },
    {
      from: 'Data Enrichment',
      to: '/services/data-enrichment',
      relatedService: 'Conversion Optimization',
      relatedLink: '/services/conversion-optimization'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg my-8">
      <h3 className="font-semibold text-gray-900 mb-4">Related Services</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {linkSuggestions.map((link, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
            <div>
              <InternalLink to={link.to} className="font-medium">
                {link.from}
              </InternalLink>
              <span className="text-gray-500 mx-2">+</span>
              <InternalLink to={link.relatedLink} className="font-medium">
                {link.relatedService}
              </InternalLink>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCrossLinks;
