
import React from 'react';

const ClientLogos = () => {
  const clients = [
    {
      name: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center",
      alt: "TechCorp Solutions logo"
    },
    {
      name: "Digital Dynamics",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop&crop=center",
      alt: "Digital Dynamics logo"
    },
    {
      name: "E-Commerce Plus",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center", 
      alt: "E-Commerce Plus logo"
    },
    {
      name: "Global Retail Co",
      logo: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=200&h=100&fit=crop&crop=center",
      alt: "Global Retail Co logo"
    },
    {
      name: "Innovation Labs",
      logo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&h=100&fit=crop&crop=center",
      alt: "Innovation Labs logo"
    },
    {
      name: "Future Commerce",
      logo: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=200&h=100&fit=crop&crop=center",
      alt: "Future Commerce logo"
    }
  ];

  return (
    <section className="py-12 bg-gray-50" aria-label="Our trusted clients">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Trusted by Leading E-commerce Brands</h2>
          <p className="text-gray-600">Join 200+ companies that trust Stell Media with their product discovery optimization</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 grayscale hover:grayscale-0"
            >
              <img
                src={client.logo}
                alt={client.alt}
                className="max-h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>99% client retention rate</span>
            <span className="mx-2">•</span>
            <span>5+ years average partnership</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
