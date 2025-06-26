
import React, { useEffect } from 'react';
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { initPerformanceOptimizations } from "@/utils/performanceOptimization";

interface PerformanceWrapperProps {
  children: React.ReactNode;
}

const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ children }) => {
  // Initialize performance optimizations
  useEffect(() => {
    initPerformanceOptimizations();
  }, []);

  // Performance monitoring handlers
  const handleLCP = (value: number) => {
    if (value > 2500) {
      console.warn(`LCP is slow: ${value}ms`);
    }
  };

  const handleCLS = (value: number) => {
    if (value > 0.1) {
      console.warn(`CLS is high: ${value}`);
    }
  };

  return (
    <>
      <PerformanceMonitor onLCP={handleLCP} onCLS={handleCLS} />
      {children}
    </>
  );
};

export default PerformanceWrapper;
