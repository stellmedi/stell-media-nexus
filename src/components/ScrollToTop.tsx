
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    
    // Multiple scroll attempts with increasing delays for mobile reliability
    const timeouts = [
      setTimeout(() => window.scrollTo(0, 0), 50),
      setTimeout(() => window.scrollTo(0, 0), 150),
      setTimeout(() => window.scrollTo(0, 0), 300),
      setTimeout(() => window.scrollTo(0, 0), 500)
    ];

    // iOS-specific handling for webkit scroll issues
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.pageYOffset = 0;
      }, 100);
      
      // Additional iOS scroll attempt
      setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }, 400);
    }

    // Force scroll after DOM updates
    setTimeout(() => {
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 200);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [pathname]);

  return null;
}
