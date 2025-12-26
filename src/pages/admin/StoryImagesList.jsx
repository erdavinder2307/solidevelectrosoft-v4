import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const StoryImagesList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError('');
      const q = query(collection(db, 'story_images'), orderBy('sortOrder', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setImages(data);
    } catch (err) {
      console.error('Error fetching story images:', err);
      setError('Failed to load story images');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (imageId, current) => {
    try {
      setUpdating(imageId);
      await updateDoc(doc(db, 'story_images', imageId), {
        isVisible: !current,
        updatedAt: new Date(),
      });
      setImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, isVisible: !current } : img)));
    } catch (err) {
      console.error('Error updating visibility:', err);
      setError('Failed to update visibility');
    } finally {
      setUpdating(null);
    }
  };

  const handleSortChange = async (imageId, value) => {
    const order = parseInt(value, 10) || 0;
    try {
      setUpdating(imageId);
      await updateDoc(doc(db, 'story_images', imageId), {
        sortOrder: order,
        updatedAt: new Date(),
      });
      setImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, sortOrder: order } : img)));
    } catch (err) {
      console.error('Error updating sort order:', err);
      setError('Failed to update sort order');
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }
    try {
      setDeleting(imageId);
      await deleteDoc(doc(db, 'story_images', imageId));
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    } finally {
      setDeleting(null);
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c' }}>Story Images</h1>
        <Link
          to="/admin/story-images/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#5568d3')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#667eea')}
        >
          ➕ Add Image
        </Link>
      </div>

      {error && (
        <div
          style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            color: '#991B1B',
          }}
        >
          {error}
        </div>
      )}

      {images.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 20px',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
          }}
        >
          <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '16px' }}>
            No story images yet. Add your first image.
          </p>
          <Link
            to="/admin/story-images/new"
            style={{
              display: 'inline-block',
              padding: '10px 18px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Add Story Image
          </Link>
        </div>
      ) : (
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            overflowX: 'auto',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>Preview</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>URL</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>Visible</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>Sort Order</th>
                <th style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <img
                      src={image.imageUrl}
                      alt="Story"
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {image.imageUrl}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={!!image.isVisible}
                        onChange={() => toggleVisibility(image.id, image.isVisible)}
                        disabled={updating === image.id}
                      />
                      <span style={{ fontSize: '13px', color: '#374151' }}>
                        {image.isVisible ? 'Shown' : 'Hidden'}
                      </span>
                    </label>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <input
                      type="number"
                      defaultValue={image.sortOrder || 0}
                      onBlur={(e) => handleSortChange(image.id, e.target.value)}
                      style={{
                        width: '90px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '13px',
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                    <Link
                      to={`/admin/story-images/${image.id}`}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: '#f3f4f6',
                        color: '#111827',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(image.id)}
                      disabled={deleting === image.id}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: '#FEE2E2',
                        color: '#991B1B',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default StoryImagesList;
