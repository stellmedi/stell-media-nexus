
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation();

  useEffect(() => {
    // Only scroll to top for actual route changes (not hash changes)
    // The location.key changes on actual navigation but stays the same for hash changes
    if (!hash) {
      // Use a more reliable method for smooth scrolling
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, search, key]); // Include key to detect actual navigation

  return null;
}
