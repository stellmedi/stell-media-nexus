
import { useEffect } from 'react';

interface PerformanceMonitor {
  onLCP?: (value: number) => void;
  onFID?: (value: number) => void;
  onCLS?: (value: number) => void;
  onTTFB?: (value: number) => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitor> = ({
  onLCP,
  onFID,
  onCLS,
  onTTFB
}) => {
  useEffect(() => {
    // Track Largest Contentful Paint
    if (onLCP && typeof PerformanceObserver !== 'undefined') {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry) {
          onLCP(lastEntry.startTime);
        }
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observation not supported');
      }
    }

    // Track First Input Delay
    if (onFID && typeof PerformanceObserver !== 'undefined') {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            onFID(entry.processingStart - entry.startTime);
          }
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observation not supported');
      }
    }

    // Track Cumulative Layout Shift
    if (onCLS && typeof PerformanceObserver !== 'undefined') {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            onCLS(clsValue);
          }
        });
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observation not supported');
      }
    }

    // Track Time to First Byte
    if (onTTFB && typeof PerformanceObserver !== 'undefined') {
      const ttfbObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (entry.responseStart && entry.requestStart) {
            onTTFB(entry.responseStart - entry.requestStart);
          }
        });
      });
      
      try {
        ttfbObserver.observe({ entryTypes: ['navigation'] });
      } catch (e) {
        console.warn('TTFB observation not supported');
      }
    }

    // Monitor main thread blocking
    if (typeof PerformanceObserver !== 'undefined') {
      const longTaskObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`);
          }
        });
      });
      
      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('Long task observation not supported');
      }
    }

  }, [onLCP, onFID, onCLS, onTTFB]);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
