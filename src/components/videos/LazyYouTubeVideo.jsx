import React, { useState } from 'react';
import { SmartImage } from '../ui';

/**
 * LazyYouTubeVideo Component
 * Lazy-loads YouTube iframe only after user interaction
 * 
 * Features:
 * - Shows thumbnail initially (no iframe)
 * - Loads iframe on click with autoplay
 * - No layout shift
 * - Mobile & desktop friendly
 */
const LazyYouTubeVideo = ({
  videoId,
  title = 'YouTube video',
  thumbnailUrl,
  aspectRatio = 16 / 9,
  autoplay = true,
  className = '',
  style = {},
  onPlay = null,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1&rel=0' : '?rel=0'}`;

  const handlePlay = () => {
    setIsPlaying(true);
    if (onPlay) {
      onPlay(videoId);
    }
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: `${(1 / aspectRatio) * 100}%`,
        background: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        ...style,
      }}
    >
      {!isPlaying ? (
        <>
          {/* Thumbnail */}
          <SmartImage
            src={thumbnail}
            alt={title}
            aspectRatio={aspectRatio}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Play Button Overlay */}
          <button
            onClick={handlePlay}
            aria-label={`Play ${title}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              background: 'rgba(255, 0, 0, 0.9)',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 0, 0, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.9)';
            }}
          >
            {/* YouTube Play Icon */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
              style={{ marginLeft: '4px' }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          {/* Hover Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
              zIndex: 5,
            }}
            className="video-hover-overlay"
          />
        </>
      ) : (
        /* YouTube Iframe */
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      )}

      <style>
        {`
          .video-hover-overlay:hover {
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  );
};

export default LazyYouTubeVideo;
