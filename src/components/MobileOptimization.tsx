
import React from 'react';

const MobileOptimization = () => {
  return (
    <>
      {/* Meta viewport tag is already handled by Helmet in each page */}
      <style>{`
        /* Streamlined mobile optimizations - removing conflicting overrides */
        @media (max-width: 768px) {
          /* Core accessibility improvements */
          *:focus {
            outline: 2px solid #4f46e5;
            outline-offset: 2px;
          }
          
          /* Better scroll behavior */
          html { 
            scroll-behavior: smooth; 
          }
          
          /* Prevent horizontal scroll */
          body { 
            overflow-x: hidden; 
          }
          
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
          
          /* Enhanced touch interaction */
          .touch-callout-none {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
          
          /* Better modal positioning */
          .modal-mobile {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100vw - 2rem);
            max-height: 90vh;
            overflow-y: auto;
          }
          
          /* Improved WhatsApp button */
          .whatsapp-fixed {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          
          /* Better navigation transitions */
          .nav-transition {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Enhanced button interactions */
          .btn-enhanced:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
          
          /* Improved form styling */
          .form-mobile input,
          .form-mobile textarea,
          .form-mobile select {
            -webkit-appearance: none;
            appearance: none;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            background-color: white;
          }
          
          /* Better card hover states on mobile */
          .card-mobile:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
        }
        
        /* Tablet-specific optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
          .tablet-optimized {
            padding: 1.5rem;
          }
          
          .tablet-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default MobileOptimization;
