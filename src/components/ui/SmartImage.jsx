import React, { useState, useEffect, useRef } from 'react';

/**
 * SmartImage Component
 * Efficient image loading with blur placeholder, lazy loading, and smooth transitions
 *
 * Features:
 * - Lazy loading with blur placeholder
 * - Thumbnail-first loading strategy
 * - No layout shift (fixed aspect ratio)
 * - Smooth fade-in transition
 * - Fallback handling
 * - Mobile & desktop optimized
 */
const SmartImage = ({
  src,
  thumbnailSrc,
  alt = 'Image',
  aspectRatio = 16 / 9,
  lazy = true,
  className = '',
  style = {},
  onLoad = null,
  onError = null,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Setup Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isVisible) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (observerRef.current) {
            observerRef.current.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, isVisible]);

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle thumbnail load
  const handleThumbnailLoad = () => {
    setThumbnailLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    setError(true);
    if (onError) onError();
  };

  // Container padding to maintain aspect ratio (if aspectRatio is provided)
  const paddingTop = aspectRatio ? `${(1 / aspectRatio) * 100}%` : undefined;

  // Use blur placeholder (thumbnail) as fallback
  const placeholderSrc = thumbnailSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3C/svg%3E';

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        ...(paddingTop && { paddingTop }),
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
        ...style,
      }}
    >
      {/* Thumbnail / Blur Placeholder (always loaded if available) */}
      {thumbnailSrc && !imageLoaded && (
        <img
          src={thumbnailSrc}
          alt={alt}
          loading="eager"
          style={{
            position: paddingTop ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: paddingTop ? '100%' : 'auto',
            objectFit: 'cover',
            filter: 'blur(20px) brightness(0.9)',
            opacity: thumbnailLoaded ? 1 : 0.5,
            transition: 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
            zIndex: 1,
          }}
          onLoad={handleThumbnailLoad}
          onError={() => {
            // If thumbnail fails, just continue with main image
            console.warn(`Failed to load thumbnail for: ${alt}`);
          }}
        />
      )}

      {/* Fallback blur placeholder (SVG) */}
      {!thumbnailSrc && !imageLoaded && (
        <div
          style={{
            position: paddingTop ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#e5e7eb',
            zIndex: 0,
          }}
        />
      )}

      {/* Main Image */}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          loading={lazy ? 'lazy' : 'eager'}
          style={{
            position: paddingTop ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: paddingTop ? '100%' : 'auto',
            objectFit: 'cover',
            opacity: imageLoaded && !error ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out',
            zIndex: imageLoaded ? 2 : 0,
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {/* Error Fallback */}
      {error && (
        <div
          style={{
            position: paddingTop ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: paddingTop ? '100%' : 'auto',
            minHeight: paddingTop ? 'auto' : '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            color: '#9ca3af',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 3,
          }}
        >
          ⚠️ Image failed to load
        </div>
      )}

      {/* Loading Skeleton (optional: for UX feedback) */}
      {!imageLoaded && !error && isVisible && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(243, 244, 246, 0.5)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            zIndex: 0,
          }}
        />
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default SmartImage;
