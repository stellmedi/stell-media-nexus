
import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Generate optimized image URLs with multiple formats
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'avif' | 'original' = 'original') => {
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const params = new URLSearchParams(originalSrc.split('?')[1] || '');
      
      // Add optimization parameters
      params.set('q', '85');
      params.set('auto', 'format');
      
      if (format === 'webp') params.set('fm', 'webp');
      if (format === 'avif') params.set('fm', 'avif');
      
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      
      return `${baseUrl}?${params.toString()}`;
    }
    return originalSrc;
  };

  const webpSrc = getOptimizedSrc(src, 'webp');
  const avifSrc = getOptimizedSrc(src, 'avif');
  const fallbackSrc = getOptimizedSrc(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
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
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </picture>
      
      {hasError && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm"
          role="img"
          aria-label={`Failed to load image: ${alt}`}
        >
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
