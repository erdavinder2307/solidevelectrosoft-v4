import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllVideos, deleteVideo, toggleVideoPublished, toggleVideoFeatured } from '../../services/videosService';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const data = await fetchAllVideos();
      setVideos(data);
    } catch (err) {
      setError('Failed to load videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVideo(id);
      setVideos(videos.filter(v => v.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      alert('Failed to delete video');
      console.error(err);
    }
  };

  const handleTogglePublished = async (id, currentStatus) => {
    try {
      await toggleVideoPublished(id, !currentStatus);
      setVideos(videos.map(v => v.id === id ? { ...v, isPublished: !currentStatus } : v));
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await toggleVideoFeatured(id, !currentStatus);
      setVideos(videos.map(v => v.id === id ? { ...v, isFeatured: !currentStatus } : v));
    } catch (err) {
      alert('Failed to update featured status');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
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
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
            Videos
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Manage YouTube videos displayed on your website
          </p>
        </div>
        <Link
          to="/admin/videos/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.background = '#5568d3')}
          onMouseLeave={(e) => (e.target.style.background = '#667eea')}
        >
          <span>➕</span> Add Video
        </Link>
      </div>

      {error && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {/* Videos Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              transition: 'box-shadow 0.2s',
            }}
          >
            {/* Thumbnail */}
            <div style={{ position: 'relative', paddingTop: '56.25%', background: '#f3f4f6' }}>
              <img
                src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeVideoId}/maxresdefault.jpg`}
                alt={video.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Status Badges */}
              <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '8px' }}>
                {video.isPublished ? (
                  <span style={{ padding: '4px 8px', background: '#10b981', color: 'white', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                    PUBLISHED
                  </span>
                ) : (
                  <span style={{ padding: '4px 8px', background: '#6b7280', color: 'white', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                    DRAFT
                  </span>
                )}
                {video.isFeatured && (
                  <span style={{ padding: '4px 8px', background: '#f59e0b', color: 'white', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                    ⭐ FEATURED
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', marginBottom: '8px', lineHeight: '1.4' }}>
                {video.title}
              </h3>
              {video.description && (
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.5' }}>
                  {video.description.substring(0, 100)}{video.description.length > 100 ? '...' : ''}
                </p>
              )}
              
              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '12px', color: '#9ca3af' }}>
                {video.category && <span>📁 {video.category}</span>}
                <span>🎬 {video.youtubeVideoId}</span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Link
                  to={`/admin/videos/${video.id}/edit`}
                  style={{
                    flex: '1',
                    minWidth: '80px',
                    padding: '8px 12px',
                    background: '#667eea',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    textAlign: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.background = '#5568d3')}
                  onMouseLeave={(e) => (e.target.style.background = '#667eea')}
                >
                  ✏️ Edit
                </Link>
                
                <button
                  onClick={() => handleTogglePublished(video.id, video.isPublished)}
                  style={{
                    flex: '1',
                    minWidth: '80px',
                    padding: '8px 12px',
                    background: video.isPublished ? '#6b7280' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  {video.isPublished ? '🚫 Unpublish' : '✅ Publish'}
                </button>

                <button
                  onClick={() => handleToggleFeatured(video.id, video.isFeatured)}
                  style={{
                    flex: '1',
                    minWidth: '80px',
                    padding: '8px 12px',
                    background: video.isFeatured ? '#f59e0b' : '#e5e7eb',
                    color: video.isFeatured ? 'white' : '#1a202c',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  {video.isFeatured ? '⭐ Featured' : '☆ Feature'}
                </button>

                <button
                  onClick={() => setDeleteConfirm(video.id)}
                  style={{
                    flex: '1',
                    minWidth: '80px',
                    padding: '8px 12px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.background = '#dc2626')}
                  onMouseLeave={(e) => (e.target.style.background = '#ef4444')}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎥</div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>
            No videos yet
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Start by adding your first YouTube video
          </p>
          <Link
            to="/admin/videos/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            <span>➕</span> Add Your First Video
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div
          onClick={() => setDeleteConfirm(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '400px',
              width: '90%',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
              Delete Video?
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '14px' }}>
              This action cannot be undone. The video will be permanently removed from your website.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: '10px 20px',
                  background: '#f3f4f6',
                  color: '#1a202c',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                style={{
                  padding: '10px 20px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoList;
