
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top on actual route changes, not hash or query changes
    // This prevents unwanted scrolling when interacting with accordions, tabs, etc.
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Small delay to ensure DOM is ready, but only one attempt
    const timeoutId = setTimeout(scrollToTop, 10);
    
    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]); // Only trigger on pathname changes (actual route changes)

  return null;
}
