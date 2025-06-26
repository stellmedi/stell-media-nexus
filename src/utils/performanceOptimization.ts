
// Performance optimization utilities with proper browser compatibility

// Polyfill for requestIdleCallback
const requestIdleCallbackPolyfill = (callback: IdleRequestCallback, options?: IdleRequestOptions) => {
  const start = Date.now();
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      },
    });
  }, 1);
};

// Use native requestIdleCallback if available, otherwise use polyfill
const safeRequestIdleCallback = typeof requestIdleCallback !== 'undefined' 
  ? requestIdleCallback 
  : requestIdleCallbackPolyfill;

// Critical resource hints for performance
const CRITICAL_RESOURCES = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

// Lazy loading observer for images
let imageObserver: IntersectionObserver | null = null;

export const initImageLazyLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver?.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver?.observe(img);
  });
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;

  CRITICAL_RESOURCES.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Add resource hints in batches to avoid blocking
const addHintsBatch = (hints: string[]) => {
  safeRequestIdleCallback(() => {
    hints.forEach((hint) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = hint;
      document.head.appendChild(link);
    });
  });
};

export const addResourceHints = (resources: string[]) => {
  const batchSize = 3;
  for (let i = 0; i < resources.length; i += batchSize) {
    const batch = resources.slice(i, i + batchSize);
    addHintsBatch(batch);
  }
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Add critical resource hints
  preloadCriticalResources();
  
  // Initialize lazy loading
  safeRequestIdleCallback(() => {
    initImageLazyLoading();
  });
  
  // Prefetch common routes
  const commonRoutes = ['/about', '/services', '/contact'];
  addResourceHints(commonRoutes);
};

// Web Vitals tracking (simplified)
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Track Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('LCP:', entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('Performance observer not supported:', error);
    }
  }
};
