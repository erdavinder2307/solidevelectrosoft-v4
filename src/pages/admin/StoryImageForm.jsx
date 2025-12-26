import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ImageUploader from '../../components/admin/ImageUploader';
import { uploadImageToFirebase } from '../../utils/imageUtils';

const StoryImageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    imageUrl: '',
    isVisible: true,
    sortOrder: 0,
    description: '',
  });

  useEffect(() => {
    if (isEditing) {
      fetchImage();
    }
  }, [id, isEditing]);

  const fetchImage = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'story_images', id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          imageUrl: data.imageUrl || '',
          isVisible: data.isVisible !== undefined ? data.isVisible : true,
          sortOrder: data.sortOrder || 0,
          description: data.description || '',
        });
        setImagePreview(data.imageUrl || '');
      } else {
        setErrors({ general: 'Story image not found' });
      }
    } catch (err) {
      console.error('Error fetching image:', err);
      setErrors({ general: 'Failed to load story image' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageSelected = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, imageUrl: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.imageUrl && !imageFile) {
      newErrors.imageUrl = 'Image URL or file is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSuccessMessage('');

    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile, 'story');
      }

      const dataToSave = {
        imageUrl: imageUrl || '',
        isVisible: !!formData.isVisible,
        sortOrder: parseInt(formData.sortOrder, 10) || 0,
        description: formData.description.trim(),
        updatedAt: new Date(),
      };

      if (isEditing) {
        await updateDoc(doc(db, 'story_images', id), dataToSave);
        setSuccessMessage('Story image updated successfully');
        setTimeout(() => navigate('/admin/story-images'), 1500);
      } else {
        await addDoc(collection(db, 'story_images'), {
          ...dataToSave,
          createdAt: new Date(),
        });
        setSuccessMessage('Story image added successfully');
        setFormData({
          imageUrl: '',
          isVisible: true,
          sortOrder: 0,
          description: '',
        });
        setImageFile(null);
        setImagePreview('');
      }
    } catch (err) {
      console.error('Error saving story image:', err);
      setErrors({ general: 'Failed to save story image' });
    } finally {
      setSubmitting(false);
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
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c' }}>
          {isEditing ? 'Edit Story Image' : 'Add Story Image'}
        </h1>
        <button
          type="button"
          onClick={() => navigate('/admin/story-images')}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            background: 'white',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          ← Back to list
        </button>
      </div>

      {errors.general && (
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
          {errors.general}
        </div>
      )}

      {successMessage && (
        <div
          style={{
            background: '#DCFCE7',
            border: '1px solid #86EFAC',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            color: '#166534',
          }}
        >
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '32px',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1a202c' }}>
            Story Image *
          </label>
          <ImageUploader onImageSelected={handleImageSelected} />
          {imagePreview && (
            <div style={{ marginTop: '16px' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}
              />
            </div>
          )}
          {errors.imageUrl && (
            <span style={{ fontSize: '13px', color: '#991B1B', marginTop: '4px', display: 'block' }}>
              {errors.imageUrl}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="imageUrl" style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1a202c' }}>
            Image URL (alternative to upload)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
            Provide a direct URL to the image, or upload a file above
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="description" style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1a202c' }}>
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add a description for this image..."
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
              minHeight: '100px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="sortOrder" style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1a202c' }}>
            Sort Order
          </label>
          <input
            type="number"
            id="sortOrder"
            name="sortOrder"
            value={formData.sortOrder}
            onChange={handleInputChange}
            style={{
              width: '100%',
              maxWidth: '150px',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
            Lower numbers appear first
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleInputChange}
            />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c' }}>
              Visible on website
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '10px 24px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? 'Saving...' : isEditing ? 'Update Image' : 'Add Image'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/story-images')}
            style={{
              padding: '10px 24px',
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default StoryImageForm;
