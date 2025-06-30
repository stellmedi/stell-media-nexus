
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple scroll attempts with increasing delays for reliability
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Multiple fallback attempts with increasing delays
    const timeouts: NodeJS.Timeout[] = [];
    
    // Quick fallback for fast devices
    timeouts.push(setTimeout(scrollToTop, 10));
    
    // Medium fallback for slower devices
    timeouts.push(setTimeout(scrollToTop, 50));
    
    // Final fallback for very slow devices or complex pages
    timeouts.push(setTimeout(scrollToTop, 150));
    
    // Mobile-specific fallback (iOS Safari, Android Chrome issues)
    timeouts.push(setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      // Force scroll for mobile browsers
      requestAnimationFrame(() => {
        scrollToTop();
      });
    }, 300));
    
    // Cleanup function to prevent memory leaks
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [pathname]);

  return null;
}
