
// Enhanced performance optimization utilities

// Optimized requestIdleCallback polyfill
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

// Critical resource hints for faster loading
const CRITICAL_RESOURCES = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://www.google-analytics.com'
];

// Preconnect to critical domains
const PRECONNECT_DOMAINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://www.googletagmanager.com'
];

// Enhanced image lazy loading with intersection observer
let imageObserver: IntersectionObserver | null = null;

export const initImageLazyLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  if (imageObserver) return;

  imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          // Use requestAnimationFrame for smoother loading
          requestAnimationFrame(() => {
            img.src = img.dataset.src!;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          });
          imageObserver?.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.1
  });

  // Observe all lazy images
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver?.observe(img);
  });
};

// Preload critical resources with performance hints
export const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;

  const fragment = document.createDocumentFragment();

  // Add preconnect links
  PRECONNECT_DOMAINS.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    fragment.appendChild(link);
  });

  // Add DNS prefetch for other resources
  CRITICAL_RESOURCES.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    fragment.appendChild(link);
  });

  document.head.appendChild(fragment);
};

// Optimized resource prefetching
const prefetchResources = (resources: string[]) => {
  safeRequestIdleCallback(() => {
    const fragment = document.createDocumentFragment();
    resources.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.as = 'document';
      fragment.appendChild(link);
    });
    document.head.appendChild(fragment);
  });
};

// Enhanced font loading optimization
export const optimizeFontLoading = () => {
  if (typeof document === 'undefined') return;

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = () => {
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(styleLink);
  };
  document.head.appendChild(fontLink);
};

// Service worker registration for caching
export const registerServiceWorker = () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('SW registered: ', registration);
        }
      })
      .catch((registrationError) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('SW registration failed: ', registrationError);
        }
      });
  });
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Immediate optimizations
  preloadCriticalResources();
  optimizeFontLoading();

  // Deferred optimizations
  safeRequestIdleCallback(() => {
    initImageLazyLoading();
    registerServiceWorker();
  });

  // Prefetch important routes
  const importantRoutes = ['/about', '/services', '/contact', '/real-estate', '/ecommerce'];
  prefetchResources(importantRoutes);
};

// Enhanced web vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Track LCP
    const lcpObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('LCP:', entry.startTime);
        }
      });
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Track FID
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Track CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          if (process.env.NODE_ENV === 'development') {
            console.log('CLS:', clsValue);
          }
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Performance observer error:', error);
    }
  }
};
