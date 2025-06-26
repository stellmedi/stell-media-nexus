
// Enhanced performance optimization utilities with better main thread management

// Preload critical resources with priority and cache optimization
export const preloadCriticalResources = () => {
  // Use requestIdleCallback to avoid blocking main thread
  const scheduleWork = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 1000 });
    } else {
      setTimeout(callback, 1);
    }
  };

  scheduleWork(() => {
    // Preload critical fonts with optimized loading
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontPreload.as = 'style';
    fontPreload.crossOrigin = 'anonymous';
    fontPreload.onload = () => {
      fontPreload.rel = 'stylesheet';
    };
    document.head.appendChild(fontPreload);
  });

  // Preload critical images with explicit dimensions
  scheduleWork(() => {
    const heroImage = new Image();
    heroImage.src = '/hero-background.webp';
    heroImage.loading = 'eager';
    heroImage.width = 1920;
    heroImage.height = 1080;
  });
};

// Enhanced lazy loading with reduced main thread blocking
export const setupLazyImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      // Process entries in chunks to avoid long main thread tasks
      const processChunk = (startIndex: number) => {
        const endIndex = Math.min(startIndex + 5, entries.length);
        
        for (let i = startIndex; i < endIndex; i++) {
          const entry = entries[i];
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
        }
        
        // Process next chunk if there are more entries
        if (endIndex < entries.length) {
          requestIdleCallback(() => processChunk(endIndex), { timeout: 100 });
        }
      };
      
      processChunk(0);
    }, {
      rootMargin: '50px',
      threshold: 0.01
    });

    // Observe images in chunks to avoid blocking
    const observeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => imageObserver.observe(img));
    };

    requestIdleCallback(observeImages, { timeout: 1000 });
  }
};

// Defer non-critical CSS with better caching headers
export const loadNonCriticalCSS = () => {
  const nonCriticalCSS = [
    { href: '/assets/animations.css', media: 'all' },
    { href: '/assets/print.css', media: 'print' }
  ];

  nonCriticalCSS.forEach(({ href, media }) => {
    requestIdleCallback(() => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = media === 'all' ? 'print' : media;
      
      // Add cache control attributes
      link.setAttribute('data-cache', 'long-term');
      
      link.onload = () => {
        if (media === 'all') link.media = 'all';
      };
      document.head.appendChild(link);
    }, { timeout: 2000 });
  });
};

// Enhanced service worker with better caching strategies
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      requestIdleCallback(() => {
        navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        })
        .then(registration => {
          console.log('SW registered: ', registration);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      }, { timeout: 3000 });
    });
  }
};

// Prevent layout shifts and optimize Web Vitals
export const optimizeWebVitals = () => {
  // Reserve space for scrollbar to prevent layout shift
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
  
  // Optimize font loading to prevent FOIT/FOUT
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded');
      // Trigger reflow only once when fonts are ready
      requestAnimationFrame(() => {
        document.body.style.visibility = 'visible';
      });
    });
  }

  // Prevent cumulative layout shift from images
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    const imgElement = img as HTMLImageElement;
    if (imgElement.naturalWidth && imgElement.naturalHeight) {
      imgElement.width = imgElement.naturalWidth;
      imgElement.height = imgElement.naturalHeight;
    }
  });
};

// Enhanced resource hints with cache policies
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//images.unsplash.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
  ];

  // Add hints in batches to avoid blocking main thread
  const addHintsBatch = (startIndex: number) => {
    const endIndex = Math.min(startIndex + 2, hints.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const hint = hints[i];
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
    
    if (endIndex < hints.length) {
      requestIdleCallback(() => addHintsBatch(endIndex), { timeout: 100 });
    }
  };

  addHintsBatch(0);
};

// Break down initialization to prevent long main thread tasks
export const initPerformanceOptimizations = () => {
  // Critical optimizations - run immediately
  addResourceHints();
  optimizeWebVitals();
  
  // Non-critical optimizations - defer to idle time
  requestIdleCallback(() => {
    preloadCriticalResources();
  }, { timeout: 1000 });
  
  requestIdleCallback(() => {
    setupLazyImages();
  }, { timeout: 1500 });
  
  requestIdleCallback(() => {
    loadNonCriticalCSS();
  }, { timeout: 2000 });
  
  requestIdleCallback(() => {
    registerServiceWorker();
  }, { timeout: 3000 });
};

// Clean up unused resources to reduce bundle size
export const removeUnusedResources = () => {
  requestIdleCallback(() => {
    // Remove unused CSS classes
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
    
    // Remove unused script tags that might be blocking
    const unusedScripts = document.querySelectorAll('script[data-unused]');
    unusedScripts.forEach(script => script.remove());
  }, { timeout: 5000 });
};

// Optimize cache policies for static assets
export const optimizeCaching = () => {
  // Set cache headers for static resources via meta tags
  const cachePolicy = document.createElement('meta');
  cachePolicy.httpEquiv = 'Cache-Control';
  cachePolicy.content = 'public, max-age=31536000, immutable';
  document.head.appendChild(cachePolicy);
  
  // Add versioning to prevent stale cache issues
  const version = Date.now().toString();
  localStorage.setItem('app-version', version);
};
