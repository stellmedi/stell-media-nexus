
// Streamlined performance optimization utilities

// Polyfill for requestIdleCallback with better fallback
const requestIdleCallbackPolyfill = (callback: IdleRequestCallback) => {
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

const safeRequestIdleCallback = typeof requestIdleCallback !== 'undefined' 
  ? requestIdleCallback 
  : requestIdleCallbackPolyfill;

// Critical resource hints
const CRITICAL_RESOURCES = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

// Optimized image lazy loading
let imageObserver: IntersectionObserver | null = null;

export const initImageLazyLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  if (imageObserver) return; // Prevent multiple observers

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
  }, {
    rootMargin: '50px', // Start loading 50px before entering viewport
    threshold: 0.1
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

// Batch resource hints to avoid blocking
const addResourceHints = (resources: string[]) => {
  safeRequestIdleCallback(() => {
    const fragment = document.createDocumentFragment();
    resources.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      fragment.appendChild(link);
    });
    document.head.appendChild(fragment);
  });
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Add critical resource hints immediately
  preloadCriticalResources();
  
  // Initialize lazy loading when idle
  safeRequestIdleCallback(() => {
    initImageLazyLoading();
  });
  
  // Prefetch common routes when idle
  const commonRoutes = ['/about', '/services', '/contact'];
  addResourceHints(commonRoutes);
};

// Simplified web vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Track only essential metrics
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`${entry.entryType}:`, entry.duration || entry.startTime);
        }
      });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
  } catch (error) {
    // Silently fail in production
    if (process.env.NODE_ENV === 'development') {
      console.warn('Performance observer not supported:', error);
    }
  }
};
