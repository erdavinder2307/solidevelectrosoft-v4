import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchFeaturedVideos } from '../../services/videosService';
import VideoCard from '../videos/VideoCard';
import VideoModal from '../videos/VideoModal';

const FeaturedVideos = ({ 
  limit = 4, 
  showViewAll = true,
  title = "Featured Videos",
  description = "Check out our latest video content"
}) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, [limit]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const data = await fetchFeaturedVideos(limit);
      setVideos(data);
    } catch (error) {
      console.error('Error loading featured videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    
    // Analytics - track video click from featured section
    if (window.gtag) {
      window.gtag('event', 'featured_video_click', {
        video_id: video.youtubeVideoId,
        video_title: video.title,
        section: 'featured_videos',
      });
    }
  };

  // Don't render if no videos
  if (!loading && videos.length === 0) {
    return null;
  }

  return (
    <section style={{ 
      padding: '80px 20px', 
      background: '#f9fafb'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#1a202c',
              marginBottom: '12px'
            }}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ 
              fontSize: '16px', 
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {description}
          </motion.p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '32px' 
          }}>
            {[...Array(limit)].map((_, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {/* Skeleton */}
                <div style={{ 
                  paddingTop: '56.25%', 
                  background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                }} />
                <div style={{ padding: '20px' }}>
                  <div style={{ 
                    height: '20px', 
                    background: '#e5e7eb', 
                    borderRadius: '4px',
                    marginBottom: '12px'
                  }} />
                  <div style={{ 
                    height: '16px', 
                    background: '#e5e7eb', 
                    borderRadius: '4px',
                    width: '60%'
                  }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Videos Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '32px' 
            }}>
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VideoCard 
                    video={video} 
                    onClick={() => handleVideoClick(video)}
                  />
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            {showViewAll && videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{ textAlign: 'center', marginTop: '48px' }}
              >
                <a
                  href="/videos"
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    background: '#667eea',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#5568d3';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#667eea';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  View All Videos →
                </a>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Shimmer animation for skeleton */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `
      }} />
    </section>
  );
};

export default FeaturedVideos;
