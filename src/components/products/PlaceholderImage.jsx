import React from 'react';

/**
 * PlaceholderImage Component
 * Reusable placeholder for missing product screenshots and icons
 * 
 * TODO: Replace with actual images when available
 */
const PlaceholderImage = ({ 
  width = 300, 
  height = 200, 
  type = 'screenshot', // 'screenshot' | 'icon' | 'logo'
  text = null,
  color = '#3b82f6',
  className = '',
  style = {},
}) => {
  const isIcon = type === 'icon';
  const isLogo = type === 'logo';
  
  const defaultText = isIcon ? '📱' : isLogo ? '🚀' : 'Screenshot';
  const displayText = text || defaultText;
  
  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`,
    borderRadius: isIcon ? '16px' : '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '8px',
    border: `2px dashed ${color}40`,
    color: color,
    fontSize: isIcon ? '24px' : '14px',
    fontWeight: '500',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  const patternStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `radial-gradient(${color}20 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
    opacity: 0.5,
  };

  return (
    <div className={`placeholder-image ${className}`} style={containerStyle}>
      <div style={patternStyle} />
      <span style={{ fontSize: isIcon ? '32px' : '24px', position: 'relative', zIndex: 1 }}>
        {isIcon ? '📱' : isLogo ? '🚀' : '🖼️'}
      </span>
      {!isIcon && (
        <span style={{ position: 'relative', zIndex: 1, opacity: 0.7 }}>
          {displayText}
        </span>
      )}
    </div>
  );
};

export default PlaceholderImage;
