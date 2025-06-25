
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SocialProofSection = () => {
  const caseStudies = [
    {
      title: 'Real Estate Lead Gen & CRM Automation',
      client: 'Top real estate brand in Tricity',
      metric: '2.4x more Site Visits',
      description: 'High quality leads with Automated lead nurturing system & personalised followups',
      category: 'real-estate'
    },
    {
      title: 'E-commerce Product Discovery',
      client: 'Top healthcare Supplements brand, UK',
      metric: '9% boost in conversion rate',
      description: 'Enhanced search and product recommendation engine',
      category: 'ecommerce'
    },
    {
      title: 'Optimised Product Data & Shopping Ads',
      client: 'Hardware ecommerce store',
      metric: '2.1X revenue uplift in online sales',
      description: 'Comprehensive product Data Optimisation & Shopping ads across shopify & marketplaces',
      category: 'ecommerce'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Case Studies Preview */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Proven Results
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real outcomes achieved for our clients across real estate and e-commerce industries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  study.category === 'real-estate' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {study.category === 'real-estate' ? 'Real Estate' : 'E-commerce'}
                </div>
                
                <h3 className="font-bold text-lg mb-2">{study.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{study.client}</p>
                
                <div className="flex items-center mb-3" aria-label={`5 star rating for ${study.client}`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                
                <div className="text-2xl font-bold text-green-600 mb-3">{study.metric}</div>
                <p className="text-gray-600 text-sm">{study.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-2 border-indigo-300 hover:bg-indigo-50">
              <Link to="/case-studies">
                View All Case Studies
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
