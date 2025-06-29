
import React, { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width = 800,
  height = 600,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  objectFit = 'cover',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Generate optimized image URLs with multiple formats and better compression
  const getOptimizedSrc = useCallback((originalSrc: string, format: 'webp' | 'avif' | 'original' = 'original') => {
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const params = new URLSearchParams();
      
      // Aggressive optimization parameters
      params.set('q', '80'); // Slightly lower quality for better performance
      params.set('auto', 'format,compress');
      params.set('fit', 'crop');
      params.set('cs', 'srgb'); // Color space optimization
      
      if (format === 'webp') params.set('fm', 'webp');
      if (format === 'avif') params.set('fm', 'avif');
      
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      
      // Add DPR optimization for high-density displays
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      if (dpr > 1) {
        params.set('dpr', Math.min(dpr, 2).toString()); // Cap at 2x for performance
      }
      
      return `${baseUrl}?${params.toString()}`;
    }
    return originalSrc;
  }, [width, height]);

  const webpSrc = getOptimizedSrc(src, 'webp');
  const avifSrc = getOptimizedSrc(src, 'avif');
  const fallbackSrc = getOptimizedSrc(src);

  const aspectRatio = `${width}/${height}`;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio,
        width: '100%',
        height: 'auto',
        contain: 'layout'
      }}
    >
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"
          style={{ aspectRatio }}
          aria-hidden="true"
        />
      )}
      
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={`w-full h-full object-${objectFit} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          style={{ 
            aspectRatio,
            objectFit,
            contain: 'layout'
          }}
        />
      </picture>
      
      {hasError && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm"
          role="img"
          aria-label={`Failed to load image: ${alt}`}
          style={{ aspectRatio }}
        >
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
