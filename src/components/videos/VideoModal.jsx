import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyYouTubeVideo from './LazyYouTubeVideo';

/**
 * VideoModal Component
 * Full-screen modal for playing YouTube videos
 * Closes on background click or Escape key
 */
const VideoModal = ({ video, isOpen, onClose }) => {
  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!video) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(4,6,12,0.95) 70%, rgba(4,6,12,0.98) 100%)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflow: 'auto',
            padding: '20px',
            '@media (max-height: 900px)': {
              alignItems: 'flex-start',
            },
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close video"
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              zIndex: 10001,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          >
            ×
          </button>

          {/* Video Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1200px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '60px',
              marginBottom: '20px',
            }}
          >
            {/* Video Player */}
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
                background: '#000',
                flexShrink: 0,
              }}
            >
              <LazyYouTubeVideo
                videoId={video.youtubeVideoId}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
                aspectRatio={16 / 9}
                autoplay={true}
              />
            </div>

            {/* Video Info */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.92)',
                backdropFilter: 'blur(12px)',
                borderRadius: '14px',
                padding: 'clamp(16px, 4vw, 22px)',
                color: '#e5e7eb',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                overflowY: 'auto',
                maxHeight: 'none',
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(18px, 5vw, 24px)',
                  fontWeight: '700',
                  marginBottom: '10px',
                  lineHeight: '1.3',
                  color: '#f8fafc',
                }}
              >
                {video.title}
              </h2>

              {video.description && (
                <p
                  style={{
                    fontSize: 'clamp(13px, 4vw, 14px)',
                    color: '#cbd5e1',
                    lineHeight: '1.7',
                    marginBottom: video.tags?.length > 0 ? '14px' : '0',
                  }}
                >
                  {video.description}
                </p>
              )}

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '12px',
                  }}
                >
                  {video.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '999px',
                        fontSize: '12px',
                        color: '#e2e8f0',
                        fontWeight: '600',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Channel Link */}
              {video.youtubeChannelUrl && (
                <a
                  href={video.youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '18px',
                    padding: '10px 18px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '700',
                    letterSpacing: '0.01em',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.2s',
                    boxShadow: '0 10px 30px rgba(248, 113, 113, 0.35)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 14px 36px rgba(248, 113, 113, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(248, 113, 113, 0.35)';
                  }}
                >
                  View Channel
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
