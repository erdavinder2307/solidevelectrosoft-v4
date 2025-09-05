import React from 'react';
import { useScrollProgress } from '../../hooks/useModernUX';

/**
 * Modern Scroll Progress Indicator
 * Follows latest UX patterns for reading progress
 */
const ScrollProgressIndicator = ({ 
  color = '#4f46e5', 
  height = '3px',
  position = 'top',
  zIndex = 9999,
  className = ''
}) => {
  const scrollProgress = useScrollProgress();

  const baseStyles = {
    position: 'fixed',
    left: 0,
    right: 0,
    height,
    background: 'rgba(0, 0, 0, 0.1)',
    zIndex,
    transition: 'opacity 0.3s ease'
  };

  const progressStyles = {
    height: '100%',
    background: `linear-gradient(90deg, ${color}, ${color}aa)`,
    width: `${scrollProgress}%`,
    transition: 'width 0.1s ease-out',
    borderRadius: '0 2px 2px 0'
  };

  const positionStyles = position === 'top' 
    ? { top: 0 } 
    : { bottom: 0 };

  // Hide progress bar at the beginning and end for cleaner experience
  const shouldShow = scrollProgress > 1 && scrollProgress < 99;

  return (
    <div 
      className={`scroll-progress-container ${className}`}
      style={{
        ...baseStyles,
        ...positionStyles,
        opacity: shouldShow ? 1 : 0
      }}
      role="progressbar"
      aria-label={`Page scroll progress: ${Math.round(scrollProgress)}%`}
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div 
        className="scroll-progress-bar"
        style={progressStyles}
      />
    </div>
  );
};

export default ScrollProgressIndicator;
