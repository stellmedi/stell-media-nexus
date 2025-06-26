
import React, { useEffect } from 'react';
import { initPerformanceOptimizations, trackWebVitals } from '@/utils/performanceOptimization';
import ErrorBoundary from '@/components/ErrorBoundary';

interface PerformanceWrapperProps {
  children: React.ReactNode;
}

const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ children }) => {
  useEffect(() => {
    try {
      // Initialize performance optimizations safely
      initPerformanceOptimizations();
      trackWebVitals();
    } catch (error) {
      console.warn('Performance optimizations failed to initialize:', error);
    }
  }, []);

  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};

export default PerformanceWrapper;
