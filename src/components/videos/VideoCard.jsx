import React from 'react';
import { motion } from 'framer-motion';
import { SmartImage } from '../ui';

/**
 * VideoCard Component
 * Displays video thumbnail with metadata
 * Triggers video modal on click
 */
const VideoCard = ({ video, onClick }) => {
  const {
    title,
    description,
    youtubeVideoId,
    thumbnailUrl,
    tags = [],
    category,
    isFeatured,
  } = video;

  const thumbnail = thumbnailUrl || `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

  // Truncate description
  const truncatedDescription = description && description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid #e5e7eb',
        position: 'relative',
      }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)' }}
    >
      {/* Thumbnail with Play Overlay */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        <SmartImage
          src={thumbnail}
          alt={title}
          aspectRatio={16 / 9}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Play Icon Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            background: 'rgba(255, 0, 0, 0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: '#f59e0b',
              color: '#ffffff',
              padding: '4px 12px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            ⭐ Featured
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            {category}
          </div>
        )}

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '8px',
            lineHeight: '1.4',
          }}
        >
          {title}
        </h3>

        {description && (
          <p
            style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: tags.length > 0 ? '12px' : '0',
            }}
          >
            {truncatedDescription}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  background: '#f3f4f6',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#4b5563',
                  fontWeight: '500',
                }}
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  background: '#f3f4f6',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#4b5563',
                  fontWeight: '500',
                }}
              >
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoCard;
