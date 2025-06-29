
import React, { useEffect } from 'react';
import { initPerformanceOptimizations } from '@/utils/performanceOptimization';
import ErrorBoundary from '@/components/ErrorBoundary';

interface PerformanceWrapperProps {
  children: React.ReactNode;
}

const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ children }) => {
  console.log('🚀 PerformanceWrapper: Component rendering');
  
  useEffect(() => {
    console.log('🔄 PerformanceWrapper: Initializing performance optimizations');
    try {
      initPerformanceOptimizations();
      console.log('✅ PerformanceWrapper: Performance optimizations initialized');
    } catch (error) {
      console.warn('⚠️ PerformanceWrapper: Performance optimizations failed:', error);
    }
  }, []);

  console.log('🔄 PerformanceWrapper: Rendering children with ErrorBoundary');
  
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};

export default PerformanceWrapper;
