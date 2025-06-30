
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPathnameRef = useRef<string>("");

  useEffect(() => {
    // Only scroll to top when actually navigating to a different page
    // Not for same-page interactions or hash changes
    if (previousPathnameRef.current !== "" && previousPathnameRef.current !== pathname) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      });
    }
    
    // Update the previous pathname
    previousPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}
