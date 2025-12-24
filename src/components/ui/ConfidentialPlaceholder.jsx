import React from 'react';
import { FaLock } from 'react-icons/fa';

/**
 * ConfidentialPlaceholder Component
 * Displays a professional placeholder for portfolio projects without screenshots.
 * Used when client confidentiality prevents displaying project images.
 *
 * @param {Object} props - Component props
 * @param {string} props.variant - Optional variant: 'gallery' (default, 16:9) or 'card' (1:1)
 * @param {boolean} props.showIcon - Whether to display lock icon (default: true)
 * @param {string} props.className - Optional CSS class for custom styling
 * @returns {JSX.Element} Placeholder element with consistent styling
 */
const ConfidentialPlaceholder = ({
  variant = 'gallery',
  showIcon = true,
  className = '',
} = {}) => {
  const isGallery = variant === 'gallery';
  const aspectRatio = isGallery ? '16/9' : '1/1';
  const minHeight = isGallery ? 'auto' : '240px';

  return (
    <div
      className={className}
      aria-label="Screenshots omitted due to confidentiality"
      style={{
        width: '100%',
        aspectRatio,
        minHeight,
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        border: '1px solid #d1d5db',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        gap: '10px',
      }}
    >
      {/* Optional Lock Icon */}
      {showIcon && (
        <div
          style={{
            color: '#9ca3af',
            fontSize: '28px',
            opacity: 0.6,
          }}
        >
          <FaLock size={28} />
        </div>
      )}

      {/* Text Content */}
      <p
        style={{
          fontSize: '13px',
          color: '#6b7280',
          margin: '0',
          textAlign: 'center',
          lineHeight: '1.5',
          maxWidth: '220px',
        }}
      >
        Some visuals are omitted to respect client confidentiality.
      </p>
    </div>
  );
};

export default ConfidentialPlaceholder;
