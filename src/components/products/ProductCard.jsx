import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaApple, FaGooglePlay, FaGlobe, FaDownload } from 'react-icons/fa';
import PlaceholderImage from './PlaceholderImage';

/**
 * ProductCard Component
 * Displays individual product information with modern SaaS styling
 * 
 * TODO: Replace placeholder icons with actual product icons
 */
const ProductCard = ({ product, onViewScreenshots }) => {
  const [iconError, setIconError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const {
    title,
    name,
    description,
    platform = [],
    status = 'active',
    icon,
    logo,
    color = '#3b82f6',
    links,
    category,
    screenshots = [],
    webAppUrl,
    androidAppUrl,
    iosAppUrl,
    directApkUrl,
  } = product;

  // Use title or name (Firestore uses 'title', legacy might use 'name')
  const displayName = title || name;
  
  // Normalize status for display
  const displayStatus = (status || 'active').toUpperCase();
  const isLive = displayStatus === 'ACTIVE' || displayStatus === 'LIVE';
  
  // Check for any available links
  const hasLink = links?.websiteUrl || links?.appStoreUrl || links?.playStoreUrl || webAppUrl || androidAppUrl || iosAppUrl || directApkUrl;

  // Count available buttons for responsive layout
  const hasScreenshots = screenshots && screenshots.length > 0;
  const availableButtons = [
    webAppUrl ? 1 : 0,
    androidAppUrl ? 1 : 0,
    directApkUrl ? 1 : 0,
    iosAppUrl ? 1 : 0,
    hasScreenshots ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  // Mobile detection
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getButtonGridCols = () => {
    if (availableButtons <= 2) return 'repeat(2, 1fr)';
    if (availableButtons === 3) return 'repeat(3, 1fr)';
    if (availableButtons === 4) return 'repeat(4, 1fr)';
    // For 5 buttons, use 3 columns so they wrap into 2 rows (3 + 2)
    return 'repeat(3, 1fr)';
  };

  const getMainLink = () => {
    if (webAppUrl) return webAppUrl;
    if (links?.websiteUrl) return links.websiteUrl;
    if (androidAppUrl) return androidAppUrl;
    if (links?.playStoreUrl) return links.playStoreUrl;
    if (iosAppUrl) return iosAppUrl;
    if (links?.appStoreUrl) return links.appStoreUrl;
    return null;
  };

  const truncateText = (text, wordLimit = 20) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const truncatedDescription = truncateText(description, 25);
  const isDescriptionTruncated = description && description.split(' ').length > 25;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.12)' 
          : '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Card Header with Color Accent */}
      <div
        style={{
          height: '8px',
          background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
        }}
      />

      {/* Card Content */}
      <div style={{ padding: '28px' }}>
        {/* Icon and Status Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          {/* Product Logo */}
          <Link
            to={`/product/${product.id}`}
            style={{
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                overflow: 'hidden',
                background: `${color}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${color}20`,
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
            {logo ? (
              <img
                src={logo}
                alt={`${displayName} logo`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : iconError ? (
              <PlaceholderImage
                width={64}
                height={64}
                type="icon"
                color={color}
              />
            ) : (
              <img
                src={icon}
                alt={`${displayName} icon`}
                onError={() => setIconError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
          </Link>

          {/* Status Badge */}
          <span
            style={{
              padding: '6px 12px',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              background: isLive ? '#dcfce7' : '#fef3c7',
              color: isLive ? '#166534' : '#92400e',
            }}
          >
            {status}
          </span>
        </div>

        {/* Product Name */}
        <Link
          to={`/product/${product.id}`}
          style={{
            textDecoration: 'none',
            display: 'block',
          }}
        >
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#111827')}
          >
            {displayName}
          </h3>
        </Link>

        {/* Description */}
        <div style={{ marginBottom: '16px' }}>
          <p
            style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: isDescriptionTruncated ? '8px' : '0',
              minHeight: '44px',
            }}
          >
            {truncatedDescription}
          </p>
          {isDescriptionTruncated && (
            <a
              href={`/product/${product.id}`}
              style={{
                display: 'inline-block',
                fontSize: '13px',
                fontWeight: '500',
                color: color,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Learn More →
            </a>
          )}
        </div>

        {/* Platform Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '20px',
          }}
        >
          {platform.map((p) => (
            <span
              key={p}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                background: '#f3f4f6',
                color: '#4b5563',
              }}
            >
              {p === 'Web' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              )}
              {p === 'Mobile' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
              )}
              {p}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          {/* App URL Buttons */}
          {(webAppUrl || androidAppUrl || iosAppUrl || directApkUrl || hasScreenshots) && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : getButtonGridCols(),
                gap: '8px',
              }}
            >
              {/* Web App Button */}
              {webAppUrl && (
                <a
                  href={webAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: color,
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FaGlobe size={14} />
                  Web
                </a>
              )}

              {/* Android Button (Solidev Store) */}
              {androidAppUrl && (
                <a
                  href={androidAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#34a853',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FaGooglePlay size={14} />
                  Store
                </a>
              )}

              {/* Direct Download APK Button */}
              {directApkUrl && (
                <a
                  href={directApkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#0f766e',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FaDownload size={14} />
                  APK
                </a>
              )}

              {/* iOS Button */}
              {iosAppUrl && (
                <a
                  href={iosAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#000000',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FaApple size={14} />
                  iOS
                </a>
              )}

              {/* Gallery Button */}
              {hasScreenshots && (
                <button
                  onClick={() => {
                    if (typeof onViewScreenshots === 'function') {
                      onViewScreenshots(product);
                    } else {
                      navigate(`/product/${product.id}`);
                    }
                  }}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#8b5cf6',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  Gallery
                </button>
              )}
            </div>
          )}

          {/* Legacy Open App Button - Only show if no new URL fields but has legacy links */}
          {!webAppUrl && !androidAppUrl && !iosAppUrl && !directApkUrl && !hasScreenshots && hasLink && (
            <a
              href={getMainLink()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                background: color,
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Open App
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}

          {/* Coming Soon - Only show if absolutely no buttons/links available */}
          {!webAppUrl && !androidAppUrl && !iosAppUrl && !directApkUrl && !hasScreenshots && !hasLink && (
            <button
              disabled
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                background: '#e5e7eb',
                color: '#9ca3af',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
