
import React, { useEffect } from 'react';
import { initPerformanceOptimizations, trackWebVitals } from '@/utils/performanceOptimization';
import ErrorBoundary from '@/components/ErrorBoundary';

interface PerformanceWrapperProps {
  children: React.ReactNode;
}

const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ children }) => {
  useEffect(() => {
    console.log('⚡ PerformanceWrapper: Component mounted');
    
    try {
      // Initialize performance optimizations safely
      console.log('⚡ PerformanceWrapper: Initializing performance optimizations');
      initPerformanceOptimizations();
      trackWebVitals();
      console.log('⚡ PerformanceWrapper: Performance optimizations initialized successfully');
    } catch (error) {
      console.warn('⚠️ PerformanceWrapper: Performance optimizations failed to initialize:', error);
    }
    
    return () => {
      console.log('⚡ PerformanceWrapper: Component unmounting');
    };
  }, []);

  console.log('⚡ PerformanceWrapper: Rendering with ErrorBoundary');

  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};

export default PerformanceWrapper;
