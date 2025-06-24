
import React from 'react';

const MobileOptimization = () => {
  return (
    <>
      {/* Meta viewport tag is already handled by Helmet in each page */}
      <style>{`
        /* Enhanced mobile responsiveness */
        @media (max-width: 768px) {
          /* Improved text sizing for mobile */
          h1 { font-size: 2.5rem !important; line-height: 1.2 !important; }
          h2 { font-size: 2rem !important; line-height: 1.3 !important; }
          h3 { font-size: 1.5rem !important; line-height: 1.4 !important; }
          
          /* Better spacing on mobile */
          .container { padding-left: 1rem !important; padding-right: 1rem !important; }
          
          /* Improved button sizing */
          .btn-mobile { min-height: 44px !important; min-width: 44px !important; }
          
          /* Better touch targets */
          a, button { min-height: 44px; display: flex; align-items: center; justify-content: center; }
          
          /* Optimized form inputs */
          input, textarea, select { 
            font-size: 16px !important; /* Prevents zoom on iOS */
            padding: 12px !important;
            border-radius: 8px !important;
          }
          
          /* Improved navigation */
          .mobile-nav { 
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
          }
          .mobile-nav.open { transform: translateX(0); }
          
          /* Better image handling */
          img { max-width: 100%; height: auto; }
          
          /* Improved grid layouts */
          .grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          
          /* Better card layouts */
          .card { margin-bottom: 1rem; padding: 1rem !important; }
          
          /* Optimized hero sections */
          .hero-section { 
            min-height: 70vh !important; 
            padding: 2rem 1rem !important; 
            text-align: center !important;
          }
          
          /* Better footer */
          .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; }
          
          /* Improved WhatsApp button positioning */
          .whatsapp-button { 
            bottom: 20px !important; 
            right: 20px !important; 
            z-index: 1000 !important;
          }
          
          /* Better modal and dialog handling */
          .modal, .dialog { 
            margin: 1rem !important; 
            max-height: 90vh !important; 
            overflow-y: auto !important;
          }
          
          /* Improved table responsiveness */
          .table-container { overflow-x: auto; }
          table { min-width: 600px; }
          
          /* Better form layouts */
          .form-grid { grid-template-columns: 1fr !important; }
          
          /* Improved section spacing */
          section { padding: 3rem 0 !important; }
          
          /* Better testimonial cards */
          .testimonial-grid { grid-template-columns: 1fr !important; }
          
          /* Improved service cards */
          .service-grid { grid-template-columns: 1fr !important; }
        }
        
        /* Enhanced tablet responsiveness */
        @media (min-width: 769px) and (max-width: 1024px) {
          .tablet-grid-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .tablet-text-lg { font-size: 1.125rem !important; }
          .container { padding-left: 2rem !important; padding-right: 2rem !important; }
        }
        
        /* Focus improvements for accessibility */
        *:focus {
          outline: 2px solid #4f46e5 !important;
          outline-offset: 2px !important;
        }
        
        /* Better scroll behavior */
        html { scroll-behavior: smooth; }
        
        /* Improved loading states */
        .loading-skeleton {
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
};

export default MobileOptimization;
