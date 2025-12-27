import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  createVideo, 
  updateVideo, 
  fetchVideoById, 
  extractYouTubeId, 
  getYouTubeThumbnail,
  isValidYouTubeId 
} from '../../services/videosService';

const VideoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeVideoId: '',
    youtubeChannelUrl: '',
    category: '',
    tags: '',
    thumbnailUrl: '',
    isFeatured: false,
    isPublished: true,
    displayOrder: 0,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewThumbnail, setPreviewThumbnail] = useState('');

  useEffect(() => {
    if (isEditMode) {
      loadVideo();
    }
  }, [id]);

  const loadVideo = async () => {
    try {
      setLoading(true);
      const video = await fetchVideoById(id);
      if (video) {
        setFormData({
          title: video.title || '',
          description: video.description || '',
          youtubeVideoId: video.youtubeVideoId || '',
          youtubeChannelUrl: video.youtubeChannelUrl || '',
          category: video.category || '',
          tags: video.tags ? video.tags.join(', ') : '',
          thumbnailUrl: video.thumbnailUrl || '',
          isFeatured: video.isFeatured || false,
          isPublished: video.isPublished !== false,
          displayOrder: video.displayOrder || 0,
        });
        setPreviewThumbnail(video.thumbnailUrl || getYouTubeThumbnail(video.youtubeVideoId));
      }
    } catch (error) {
      alert('Failed to load video');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-preview thumbnail when YouTube ID changes
    if (name === 'youtubeVideoId') {
      const videoId = extractYouTubeId(value);
      if (videoId && isValidYouTubeId(videoId)) {
        setPreviewThumbnail(getYouTubeThumbnail(videoId));
        setErrors(prev => ({ ...prev, youtubeVideoId: '' }));
      } else if (value) {
        setErrors(prev => ({ ...prev, youtubeVideoId: 'Invalid YouTube URL or Video ID' }));
        setPreviewThumbnail('');
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.youtubeVideoId.trim()) {
      newErrors.youtubeVideoId = 'YouTube Video ID or URL is required';
    } else {
      const videoId = extractYouTubeId(formData.youtubeVideoId);
      if (!videoId || !isValidYouTubeId(videoId)) {
        newErrors.youtubeVideoId = 'Invalid YouTube Video ID or URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const videoData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        youtubeVideoId: formData.youtubeVideoId.trim(),
        youtubeChannelUrl: formData.youtubeChannelUrl.trim(),
        category: formData.category.trim(),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        thumbnailUrl: formData.thumbnailUrl.trim(),
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished,
        displayOrder: Number(formData.displayOrder) || 0,
      };

      if (isEditMode) {
        await updateVideo(id, videoData);
        alert('Video updated successfully!');
      } else {
        await createVideo(videoData);
        alert('Video created successfully!');
      }

      navigate('/admin/videos');
    } catch (error) {
      alert(error.message || 'Failed to save video');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
          {isEditMode ? 'Edit Video' : 'Add New Video'}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          {isEditMode ? 'Update video details' : 'Add a new YouTube video to your website'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Main Form */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
            {/* Title */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Video Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter video title"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: `1px solid ${errors.title ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              {errors.title && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>{errors.title}</p>}
            </div>

            {/* YouTube Video ID */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                YouTube Video ID or URL *
              </label>
              <input
                type="text"
                name="youtubeVideoId"
                value={formData.youtubeVideoId}
                onChange={handleChange}
                placeholder="e.g., dQw4w9WgXcQ or https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: `1px solid ${errors.youtubeVideoId ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              {errors.youtubeVideoId && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>{errors.youtubeVideoId}</p>}
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Paste the full YouTube URL or just the video ID (11 characters)
              </p>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter video description"
                rows="4"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., React, Firebase, Tutorial"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Tags */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., react, firebase, tutorial"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* YouTube Channel URL */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                YouTube Channel URL (Optional)
              </label>
              <input
                type="url"
                name="youtubeChannelUrl"
                value={formData.youtubeChannelUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/@YourChannel"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Custom Thumbnail URL */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Custom Thumbnail URL (Optional)
              </label>
              <input
                type="url"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="Leave empty to use YouTube's default thumbnail"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Auto-generated if empty
              </p>
            </div>

            {/* Display Order */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Display Order
              </label>
              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                min="0"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Lower numbers appear first
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Thumbnail Preview */}
            {previewThumbnail && (
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', marginBottom: '12px' }}>
                  Thumbnail Preview
                </h3>
                <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '8px', overflow: 'hidden', background: '#f3f4f6' }}>
                  <img
                    src={previewThumbnail}
                    alt="Thumbnail preview"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'none', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '12px' }}>
                    Thumbnail not available
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', marginBottom: '16px' }}>
                Settings
              </h3>

              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Published</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Show on website</div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Featured</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Highlight this video</div>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: loading ? '#9ca3af' : '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginBottom: '12px',
                }}
              >
                {loading ? 'Saving...' : (isEditMode ? 'Update Video' : 'Create Video')}
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/videos')}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#f3f4f6',
                  color: '#1a202c',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
