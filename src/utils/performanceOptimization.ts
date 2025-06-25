
// Enhanced performance optimization utilities

// Preload critical resources with priority
export const preloadCriticalResources = () => {
  // Preload critical fonts with high priority
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontPreload.as = 'style';
  fontPreload.crossOrigin = 'anonymous';
  fontPreload.onload = () => {
    fontPreload.rel = 'stylesheet';
  };
  document.head.appendChild(fontPreload);

  // Preload critical images
  const heroImage = new Image();
  heroImage.src = '/hero-background.webp';
  heroImage.loading = 'eager';
};

// Enhanced lazy loading with intersection observer
export const setupLazyImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          
          if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
          }
          
          img.classList.remove('lazy');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      // Load images 100px before they enter viewport
      rootMargin: '100px',
      threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Defer non-critical CSS with media queries
export const loadNonCriticalCSS = () => {
  const nonCriticalCSS = [
    { href: '/assets/animations.css', media: 'all' },
    { href: '/assets/print.css', media: 'print' }
  ];

  nonCriticalCSS.forEach(({ href, media }) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = media === 'all' ? 'print' : media;
    link.onload = () => {
      if (media === 'all') link.media = 'all';
    };
    document.head.appendChild(link);
  });
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Optimize Web Vitals
export const optimizeWebVitals = () => {
  // Reduce layout shifts
  document.documentElement.style.setProperty('--scrollbar-width', 
    (window.innerWidth - document.documentElement.clientWidth) + 'px');
  
  // Optimize font loading
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded');
    });
  }
};

// Resource hints for better loading
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//images.unsplash.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossorigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  // Run critical optimizations immediately
  addResourceHints();
  optimizeWebVitals();
  
  // Run after initial render
  requestIdleCallback(() => {
    preloadCriticalResources();
    setupLazyImages();
    loadNonCriticalCSS();
    registerServiceWorker();
  });
};

// Clean up unused CSS classes
export const removeUnusedCSS = () => {
  const unusedClasses = [
    'unused-animation',
    'legacy-styles',
    'old-layout'
  ];
  
  unusedClasses.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
      el.classList.remove(className);
    });
  });
};
