import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPublishedVideos, getVideoCategories } from '../services/videosService';
import VideoCard from '../components/videos/VideoCard';
import VideoModal from '../components/videos/VideoModal';
import PreLoader from '../components/ui/PreLoader';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    
    // SEO
    document.title = 'Video Gallery - Solidev Electrosoft';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Watch our collection of video tutorials, demos, and technical content. Learn about embedded systems, electronics, and software development.');
    }
    
    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/videos`;

    // Analytics
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Videos',
        page_location: window.location.href,
        page_path: '/videos',
        send_to: 'GT-KFNT9K9X'
      });
      window.gtag('event', 'page_view', {
        page_title: 'Videos',
        page_location: window.location.href,
        page_path: '/videos',
        send_to: 'GT-MBLK2C2Q'
      });
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [videosData, categoriesData] = await Promise.all([
        fetchPublishedVideos(),
        getVideoCategories()
      ]);
      setVideos(videosData);
      setCategories(['All', ...categoriesData]);
    } catch (err) {
      setError(err.message);
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    
    // Analytics - track video thumbnail click
    if (window.gtag) {
      window.gtag('event', 'video_thumbnail_click', {
        video_id: video.youtubeVideoId,
        video_title: video.title,
        category: video.category,
      });
    }
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <>
        <ModernHeader />
        <main>
          <section
            style={{
              minHeight: '70vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 20px',
              background: '#f9fafb',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '48px',
                  height: '48px',
                  border: '4px solid #f3f4f6',
                  borderTopColor: '#667eea',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <p style={{ marginTop: '20px', fontSize: '16px', color: '#6b7280' }}>
                Loading videos...
              </p>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </section>
        </main>
        <ModernFooter />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <ModernHeader />
        <main>
          <section
            style={{
              minHeight: '70vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 20px',
              background: '#f9fafb',
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '520px' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>⚠️</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>
                Failed to Load Videos
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '20px' }}>{error}</p>
              <button
                onClick={loadData}
                style={{
                  padding: '12px 24px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(102,126,234,0.3)',
                }}
              >
                Try Again
              </button>
            </div>
          </section>
        </main>
        <ModernFooter />
      </>
    );
  }

  return (
    <>
      <ModernHeader />
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Hero Section */}
      <section 
        style={{ 
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 60%, #252545 100%)',
          padding: '160px 20px 80px',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '8%',
            right: '-15%',
            width: '680px',
            height: '680px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-18%',
            left: '-12%',
            width: '520px',
            height: '520px',
            background: 'radial-gradient(circle, rgba(118,75,162,0.16) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div className="modern-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}
          >
            <span 
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: 'rgba(59, 130, 246, 0.12)',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#60a5fa',
                marginBottom: '22px',
              }}
            >
              Our Video Library
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                fontSize: 'clamp(2.5rem, 4vw, 3.6rem)',
                fontWeight: '700', 
                marginBottom: '16px',
                lineHeight: '1.15',
                color: '#f8fafc',
                textShadow: '0 10px 30px rgba(0,0,0,0.45)'
              }}
            >
              Watch Tutorials, Demos, and Deep Dives
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ 
                fontSize: '18px', 
                opacity: 0.92,
                maxWidth: '760px',
                margin: '0 auto',
                color: '#e5e7eb',
                textShadow: '0 8px 24px rgba(0,0,0,0.35)'
              }}
            >
              Learn how we build production software, integrate cloud services, and optimize performance across web and mobile products.
            </motion.p>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ padding: '8px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '13px' }}>Performance-optimized embeds</span>
              <span style={{ padding: '8px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '13px' }}>YouTube CDN thumbnails</span>
              <span style={{ padding: '8px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '13px' }}>Featured collections</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)' }}>
        <div className="modern-container">
          {/* Category Filters */}
          {categories.length > 1 && (
            <div style={{ marginBottom: '42px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {categories.map(category => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: '11px 24px',
                      background: isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                      color: isActive ? 'white' : '#111827',
                      border: isActive ? '1px solid transparent' : '1px solid #e5e7eb',
                      borderRadius: '999px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 10px 30px rgba(102, 126, 234, 0.25)' : '0 4px 14px rgba(17, 24, 39, 0.04)',
                      transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.boxShadow = '0 8px 22px rgba(17, 24, 39, 0.08)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(17, 24, 39, 0.04)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{ 
              background: '#fef2f2', 
              border: '1px solid #fecaca',
              borderRadius: '12px', 
              padding: '16px', 
              marginBottom: '24px',
              color: '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '18px' }}>⚠️</span>
              <div>
                <div style={{ fontWeight: 600 }}>Failed to load videos</div>
                <div style={{ fontSize: '14px', color: '#b91c1c' }}>{error}</div>
              </div>
            </div>
          )}

          {/* Videos Grid */}
          {filteredVideos.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '28px' 
            }}>
              <AnimatePresence mode="wait">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <VideoCard 
                      video={video} 
                      onClick={() => handleVideoClick(video)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '90px 20px',
              color: '#6b7280',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 35px rgba(17, 24, 39, 0.08)'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎥</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                No videos found
              </h3>
              <p style={{ fontSize: '15px', marginBottom: '14px' }}>
                {selectedCategory === 'All' 
                  ? 'No videos available at the moment.' 
                  : `No videos in "${selectedCategory}" category.`}
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                style={{
                  padding: '10px 18px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 8px 18px rgba(102, 126, 234, 0.35)'
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={handleCloseModal}
      />

      {/* Schema.org VideoGallery */}
      {filteredVideos.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGallery",
            "name": "Solidev Electrosoft Video Gallery",
            "description": "Collection of video tutorials, demos, and technical content",
            "video": filteredVideos.map(video => ({
              "@type": "VideoObject",
              "name": video.title,
              "description": video.description,
              "thumbnailUrl": video.thumbnailUrl,
              "uploadDate": video.createdAt?.toDate?.()?.toISOString?.() || new Date().toISOString(),
              "contentUrl": `https://www.youtube.com/watch?v=${video.youtubeVideoId}`,
              "embedUrl": `https://www.youtube.com/embed/${video.youtubeVideoId}`,
            }))
          })}
        </script>
      )}
      </div>
      <ModernFooter />
    </>
  );
};

export default Videos;
