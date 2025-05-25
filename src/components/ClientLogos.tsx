import React from 'react';
const ClientLogos = () => {
  const clients = [{
    name: "TechCorp Solutions",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&crop=center&auto=format&q=85",
    alt: "TechCorp Solutions - E-commerce Technology Leader"
  }, {
    name: "Digital Dynamics",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=80&fit=crop&crop=center&auto=format&q=85",
    alt: "Digital Dynamics - Online Retail Innovation"
  }, {
    name: "E-Commerce Plus",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop&crop=center&auto=format&q=85",
    alt: "E-Commerce Plus - Digital Commerce Solutions"
  }, {
    name: "Global Retail Co",
    logo: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=200&h=80&fit=crop&crop=center&auto=format&q=85",
    alt: "Global Retail Co - International E-commerce"
  }, {
    name: "Innovation Labs",
    logo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&h=80&fit=crop&crop=center&auto=format&q=85",
    alt: "Innovation Labs - Technology Research & Development"
  }, {
    name: "Future Commerce",
    logo: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=200&h=80&fit=crop&crop=center&auto=format&q=85",
    alt: "Future Commerce - Next-Gen Retail Solutions"
  }];
  return <section className="py-16 bg-gray-50" aria-label="Our trusted clients">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Trusted by Leading E-commerce Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join 200+ companies that trust Stell Media with their product discovery optimization and e-commerce growth strategies
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {clients.map((client, index) => <div key={index} className="group flex items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200 w-full h-24">
              <img src={client.logo} alt={client.alt} className="max-h-12 max-w-full w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0" loading="lazy" width="160" height="48" />
            </div>)}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-6 text-sm text-gray-600 bg-white px-8 py-4 rounded-full shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">99% client retention rate</span>
            </div>
            <span className="text-gray-300">•</span>
            <span>50+ successful optimization projects</span>
            <span className="text-gray-300">•</span>
            <span>15+ years of expertise</span>
          </div>
        </div>
      </div>
    </section>;
};
export default ClientLogos;