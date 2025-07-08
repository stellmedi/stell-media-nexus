import React from 'react';
import { Helmet } from 'react-helmet-async';

const MobileSpeedOptimizer: React.FC = () => {
  return (
    <Helmet>
      {/* Critical CSS for mobile performance */}
      <style type="text/css">{`
        /* Critical mobile-first styles */
        @media (max-width: 768px) {
          * {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
          
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeSpeed;
          }
          
          img {
            will-change: transform;
            transform: translateZ(0);
          }
          
          .hero-section {
            contain: layout style paint;
            will-change: auto;
          }
          
          .navbar {
            contain: layout style paint;
            transform: translateZ(0);
          }
          
          /* Reduce paint complexity on mobile */
          .btn-primary, .button {
            will-change: transform;
            backface-visibility: hidden;
          }
          
          /* Optimize animations for mobile */
          .animate-fade-in {
            animation-duration: 0.3s;
          }
          
          /* Reduce layout shifts */
          .container {
            contain: layout;
          }
        }
        
        /* Preload critical fonts */
        @font-face {
          font-family: 'Inter';
          font-display: swap;
          src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
        }
      `}</style>
      
      {/* Resource hints for faster loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="//stellmedia.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Preload critical resources */}
      <link 
        rel="preload" 
        href="/lovable-uploads/96e2b26f-1803-4e30-b44f-8ebce6c60b7f.png" 
        as="image" 
        type="image/png"
      />
      
      {/* Mobile viewport optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="theme-color" content="#4f46e5" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Performance hints */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="HandheldFriendly" content="true" />
    </Helmet>
  );
};

export default MobileSpeedOptimizer;