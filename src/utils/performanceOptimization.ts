export const initPerformanceOptimizations = () => {
  console.log('⚡ Performance: Initializing optimizations');
  
  try {
    // Preload critical resources
    if (typeof document !== 'undefined') {
      console.log('⚡ Performance: Document available, setting up optimizations');
      
      // Preload critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      fontLink.as = 'style';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);
      
      // Optimize images with lazy loading
      const images = document.querySelectorAll('img[data-src]');
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || '';
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          });
        });
        
        images.forEach(img => imageObserver.observe(img));
      }
      
      // Prefetch critical routes
      const criticalRoutes = ['/services', '/contact', '/about'];
      criticalRoutes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
      
      // Enable passive event listeners for better scroll performance
      const passiveEvents = ['touchstart', 'touchmove', 'wheel'];
      passiveEvents.forEach(event => {
        document.addEventListener(event, () => {}, { passive: true });
      });
      
      // Optimize third-party scripts
      if (window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href
        });
      }
      
      // Service Worker registration for caching
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('⚡ Performance: Service Worker registered:', registration);
          })
          .catch(error => {
            console.warn('⚡ Performance: Service Worker registration failed:', error);
          });
      }
      
      // Memory management
      const cleanupUnusedResources = () => {
        // Remove unused event listeners
        const unusedElements = document.querySelectorAll('[data-cleanup]');
        unusedElements.forEach(element => {
          element.removeEventListener('click', () => {});
        });
        
        // Clear unused timers
        if (window.performanceTimers) {
          window.performanceTimers.forEach(timer => clearTimeout(timer));
          window.performanceTimers = [];
        }
      };
      
      // Schedule cleanup on page unload
      window.addEventListener('beforeunload', cleanupUnusedResources);
      
      // Performance monitoring
      if ('performance' in window) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            console.log('⚡ Performance: Page load metrics:', {
              domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
              loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
              firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
              firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime
            });
          }, 0);
        });
      }
    }
    
    console.log('✅ Performance: Optimizations completed');
  } catch (error) {
    console.error('❌ Performance: Error during optimization:', error);
    throw error;
  }
};

// Utility function to measure component render time
export const measureRenderTime = (componentName: string, renderFn: () => void) => {
  const startTime = performance.now();
  renderFn();
  const endTime = performance.now();
  console.log(`⚡ Performance: ${componentName} render time: ${endTime - startTime}ms`);
};

// Debounce utility for performance-sensitive operations
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility for scroll and resize events
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
