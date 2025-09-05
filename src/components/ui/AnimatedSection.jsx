import React from 'react';
import { useIntersectionObserver } from '../../hooks/useModernUX';

/**
 * Modern Animated Section Component
 * Implements latest animation and accessibility best practices
 */
const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fade-in-up',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  ...props 
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  const animationClasses = {
    'fade-in-up': 'fade-in-up',
    'fade-in-left': 'fade-in-left',
    'fade-in-right': 'fade-in-right',
    'fade-in': 'fade-in',
    'scale-in': 'scale-in',
    'slide-in-up': 'slide-in-up'
  };

  const animationClass = animationClasses[animation] || 'fade-in-up';
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      className={`${className} ${animationClass} ${isVisible ? 'visible' : ''}`}
      style={delayStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
