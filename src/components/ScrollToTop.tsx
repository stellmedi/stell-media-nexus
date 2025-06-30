
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const previousPathnameRef = useRef<string>("");

  useEffect(() => {
    const currentFullPath = pathname + search;
    const previousFullPath = previousPathnameRef.current;
    
    // Only scroll to top if this is a genuine page navigation
    const isActualPageNavigation = 
      previousFullPath !== "" && // Not initial load
      pathname !== previousPathnameRef.current.split('?')[0] && // Different base path
      !hash; // Not a hash-only change
    
    if (isActualPageNavigation) {
      // Use requestAnimationFrame for smooth, reliable scrolling
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        
        // Fallback for older browsers or edge cases
        if (window.scrollY > 0) {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      });
    }
    
    // Update the previous pathname reference
    previousPathnameRef.current = currentFullPath;
  }, [pathname, search, hash]);

  return null;
}
