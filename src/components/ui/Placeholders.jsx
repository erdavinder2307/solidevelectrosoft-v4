import React from 'react';
import { motion } from 'framer-motion';

/**
 * Placeholder Image Component
 * Use when actual images are missing or not yet available
 */
export const PlaceholderImage = ({ 
  width = 300, 
  height = 200, 
  text = '',
  className = '',
  rounded = 'lg',
  animate = false 
}) => {
  const borderRadiusMap = {
    none: '0',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    full: 'var(--radius-full)',
  };

  const baseStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--border-light) 100%)',
    borderRadius: borderRadiusMap[rounded] || rounded,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-muted)',
    fontSize: 'var(--text-sm)',
    fontWeight: '500',
    overflow: 'hidden',
  };

  const content = (
    <div style={baseStyle} className={className}>
      {text || (
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

/**
 * Placeholder Card Component
 * Use for content cards with missing data
 */
export const PlaceholderCard = ({ 
  title = 'Coming Soon',
  description = 'Content will be available soon.',
  icon = null,
  className = '' 
}) => {
  return (
    <div 
      className={`modern-card ${className}`}
      style={{
        padding: 'var(--space-8)',
        textAlign: 'center',
      }}
    >
      {icon ? (
        icon
      ) : (
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-primary-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-4)',
            color: 'var(--color-primary-500)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
      )}
      <h4 
        style={{
          fontSize: 'var(--text-lg)',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-2)',
        }}
      >
        {title}
      </h4>
      <p 
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--text-tertiary)',
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
};

/**
 * Placeholder Logo Component
 * Use for client logos that aren't available
 */
export const PlaceholderLogo = ({ 
  name = 'Company',
  width = 120,
  height = 40,
  className = '' 
}) => {
  return (
    <div 
      className={className}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontSize: 'var(--text-xs)',
        fontWeight: '600',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}
    >
      {name}
    </div>
  );
};

/**
 * Placeholder Avatar Component
 * Use for profile images that aren't available
 */
export const PlaceholderAvatar = ({ 
  name = '',
  size = 48,
  className = '' 
}) => {
  // Generate initials from name
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  // Generate consistent color based on name
  const colors = [
    'var(--color-primary-500)',
    '#8b5cf6',
    '#ec4899',
    '#f97316',
    '#14b8a6',
    '#10b981',
  ];
  const colorIndex = name.length % colors.length;

  return (
    <div 
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: 'var(--radius-full)',
        background: colors[colorIndex],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: `${size * 0.4}px`,
        fontWeight: '600',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
};

/**
 * Skeleton Loader Component
 * Use for loading states
 */
export const Skeleton = ({ 
  width = '100%',
  height = 20,
  rounded = 'md',
  className = '' 
}) => {
  const borderRadiusMap = {
    none: '0',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    full: 'var(--radius-full)',
  };

  return (
    <div 
      className={`modern-skeleton ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: borderRadiusMap[rounded] || rounded,
      }}
    />
  );
};

/**
 * Icon Box Component
 * Wrapper for icons with consistent styling
 */
export const IconBox = ({ 
  children,
  variant = 'primary',
  size = 'default',
  className = '' 
}) => {
  const sizeMap = {
    sm: { box: 40, icon: 18 },
    default: { box: 56, icon: 24 },
    lg: { box: 72, icon: 32 },
    xl: { box: 96, icon: 40 },
  };

  const variantStyles = {
    primary: {
      background: 'var(--color-primary-50)',
      color: 'var(--color-primary-500)',
    },
    dark: {
      background: 'var(--color-neutral-800)',
      color: 'var(--text-inverse)',
    },
    light: {
      background: 'var(--bg-tertiary)',
      color: 'var(--text-secondary)',
    },
    gradient: {
      background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)',
      color: 'var(--text-inverse)',
    },
  };

  const { box } = sizeMap[size] || sizeMap.default;
  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <div 
      className={className}
      style={{
        width: `${box}px`,
        height: `${box}px`,
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

export default {
  PlaceholderImage,
  PlaceholderCard,
  PlaceholderLogo,
  PlaceholderAvatar,
  Skeleton,
  IconBox,
};
