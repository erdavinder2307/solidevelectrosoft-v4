import { useEffect, useRef, useState } from 'react';

/**
 * Modern Intersection Observer Hook for scroll animations
 * Follows latest web performance and accessibility best practices
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const targetRef = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    ...options
  };

  useEffect(() => {
    const target = targetRef.current;
    
    if (!target) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsIntersecting(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasAnimated || !defaultOptions.triggerOnce)) {
          setIsIntersecting(true);
          setHasAnimated(true);
        } else if (!defaultOptions.triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin
      }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasAnimated, defaultOptions.triggerOnce, defaultOptions.threshold, defaultOptions.rootMargin]);

  return [targetRef, isIntersecting];
};

/**
 * Modern scroll progress hook for enhanced UX
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    const throttledUpdate = throttle(updateScrollProgress, 16); // ~60fps
    
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', throttledUpdate);
  }, []);

  return scrollProgress;
};

/**
 * Performance-optimized throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Modern viewport size hook with debouncing
 */
export const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewportSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    }, 150);

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewportSize;
};

/**
 * Performance-optimized debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Modern preload hook for critical resources
 */
export const usePreloadResources = (resources = []) => {
  const [loadedResources, setLoadedResources] = useState(new Set());
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (resources.length === 0) {
      setAllLoaded(true);
      return;
    }

    const preloadPromises = resources.map(resource => {
      return new Promise((resolve, reject) => {
        if (resource.type === 'image') {
          const img = new Image();
          img.onload = () => {
            setLoadedResources(prev => new Set([...prev, resource.url]));
            resolve(resource.url);
          };
          img.onerror = reject;
          img.src = resource.url;
        } else if (resource.type === 'font') {
          const font = new FontFace(resource.family, `url(${resource.url})`);
          font.load().then(() => {
            document.fonts.add(font);
            setLoadedResources(prev => new Set([...prev, resource.url]));
            resolve(resource.url);
          }).catch(reject);
        }
      });
    });

    Promise.allSettled(preloadPromises).then(() => {
      setAllLoaded(true);
    });
  }, [resources]);

  return { loadedResources, allLoaded, loadProgress: (loadedResources.size / resources.length) * 100 };
};

/**
 * Modern performance monitoring hook
 */
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fcp: null, // First Contentful Paint
    lcp: null, // Largest Contentful Paint
    fid: null, // First Input Delay
    cls: null  // Cumulative Layout Shift
  });

  useEffect(() => {
    // Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP Observer
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Fallback for older browsers
      }

      // FID Observer
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Fallback for older browsers
      }

      // CLS Observer
      const clsObserver = new PerformanceObserver((entryList) => {
        let cls = 0;
        entryList.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        setMetrics(prev => ({ ...prev, cls }));
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Fallback for older browsers
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return metrics;
};
