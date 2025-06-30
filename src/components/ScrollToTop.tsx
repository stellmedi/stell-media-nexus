
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    
    // Multiple scroll attempts for mobile reliability
    const timeouts = [
      setTimeout(() => window.scrollTo(0, 0), 100),
      setTimeout(() => window.scrollTo(0, 0), 300),
      setTimeout(() => window.scrollTo(0, 0), 500)
    ];

    // iOS-specific handling for webkit scroll issues
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }, 100);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [pathname]);

  return null;
}
