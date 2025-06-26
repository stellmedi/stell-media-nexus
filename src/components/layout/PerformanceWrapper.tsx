
import React, { useEffect } from 'react';
import { initPerformanceOptimizations } from '@/utils/performanceOptimization';
import ErrorBoundary from '@/components/ErrorBoundary';

interface PerformanceWrapperProps {
  children: React.ReactNode;
}

const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ children }) => {
  useEffect(() => {
    try {
      initPerformanceOptimizations();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Performance optimizations failed:', error);
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};

export default PerformanceWrapper;
