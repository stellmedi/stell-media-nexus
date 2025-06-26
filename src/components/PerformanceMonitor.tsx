
import { useEffect } from 'react';

interface PerformanceMonitorProps {
  onLCP?: (value: number) => void;
  onFID?: (value: number) => void;
  onCLS?: (value: number) => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onLCP,
  onFID,
  onCLS
}) => {
  useEffect(() => {
    if (typeof PerformanceObserver === 'undefined') return;

    const observers: PerformanceObserver[] = [];

    // Track Largest Contentful Paint
    if (onLCP) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry) {
            onLCP(lastEntry.startTime);
          }
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        observers.push(lcpObserver);
      } catch (e) {
        // Silently fail
      }
    }

    // Track First Input Delay
    if (onFID) {
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            if (entry.processingStart && entry.startTime) {
              onFID(entry.processingStart - entry.startTime);
            }
          });
        });
        
        fidObserver.observe({ entryTypes: ['first-input'] });
        observers.push(fidObserver);
      } catch (e) {
        // Silently fail
      }
    }

    // Track Cumulative Layout Shift
    if (onCLS) {
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              onCLS(clsValue);
            }
          });
        });
        
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        observers.push(clsObserver);
      } catch (e) {
        // Silently fail
      }
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [onLCP, onFID, onCLS]);

  return null;
};

export default PerformanceMonitor;
