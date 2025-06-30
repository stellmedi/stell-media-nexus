
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    // Only scroll to top on actual route changes, not on component interactions
    const previousPathname = previousPathnameRef.current;
    
    if (pathname !== previousPathname) {
      // This is a real navigation, scroll to top
      const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      };
      
      // Small delay to ensure DOM is ready
      setTimeout(scrollToTop, 50);
      
      // Update the ref for next comparison
      previousPathnameRef.current = pathname;
    }
  }, [pathname]);

  return null;
}
