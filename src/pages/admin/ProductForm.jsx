import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { validateProduct, hasErrors } from '../../utils/formValidation';
import { uploadImageToFirebase } from '../../utils/imageUtils';
import ImageUploader from '../../components/admin/ImageUploader';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    imageFile: null,
    features: [],
    technologies: [],
    status: 'active',
  });

  const [featureInput, setFeatureInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id, isEditing]);

  const fetchProduct = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'products', id));
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        setErrors({ general: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setErrors({ general: 'Failed to load product' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (index) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleImageSelected = (croppedFile) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: croppedFile,
    }));
    setImageError('');
  };

  const handleImageError = (error) => {
    setImageError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const validationErrors = validateProduct({
      ...formData,
      isNew: !isEditing,
    });

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      let imageUrl = formData.image;

      // Upload image to Firebase if new image selected
      if (formData.imageFile) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadImageToFirebase(formData.imageFile, 'products');
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          setErrors({ general: 'Failed to upload image. Please try again.' });
          setSubmitting(false);
          setUploadingImage(false);
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      const dataToSave = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: imageUrl,
        features: formData.features,
        technologies: formData.technologies,
        status: formData.status,
        updatedAt: new Date().toISOString(),
      };

      if (isEditing) {
        await updateDoc(doc(db, 'products', id), dataToSave);
        setSuccessMessage('Product updated successfully!');
      } else {
        await setDoc(doc(db, 'products'), {
          ...dataToSave,
          createdAt: new Date().toISOString(),
        });
        setSuccessMessage('Product created successfully!');
      }

      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ general: 'Failed to save product. Please try again.' });
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
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c', marginBottom: '32px' }}>
        {isEditing ? 'Edit Product' : 'Create New Product'}
      </h1>

      {successMessage && (
        <div
          style={{
            background: '#DCFCE7',
            border: '1px solid #86EFAC',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: '#166534',
          }}
        >
          ✅ {successMessage}
        </div>
      )}

      {errors.general && (
        <div
          style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: '#991B1B',
          }}
        >
          ❌ {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        {/* Title */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Product Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Custom Healthcare Platform"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: errors.title ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {errors.title && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Detailed product description..."
            rows="5"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: errors.description ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
          {errors.description && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.description}
            </p>
          )}
        </div>

        {/* Category */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: errors.category ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          >
            <option value="">Select a category</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="AI Solutions">AI Solutions</option>
            <option value="MVP Development">MVP Development</option>
            <option value="Custom Solutions">Custom Solutions</option>
          </select>
          {errors.category && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.category}
            </p>
          )}
        </div>

        {/* Image */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Product Image {!isEditing && '*'}
          </label>
          {formData.image && !formData.imageFile && (
            <div style={{ marginBottom: '12px' }}>
              <img
                src={formData.image}
                alt="Product preview"
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                ✅ Current image (will be replaced if you select a new one)
              </p>
            </div>
          )}
          {!formData.image || formData.imageFile ? (
            <ImageUploader
              onImageSelected={handleImageSelected}
              onError={handleImageError}
              aspectRatio={16 / 9}
              mode="single"
            />
          ) : null}
          {imageError && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
              {imageError}
            </p>
          )}
          {errors.image && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.image}
            </p>
          )}
        </div>

        {/* Features */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Features
          </label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              placeholder="Add a feature..."
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={handleAddFeature}
              style={{
                padding: '12px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Add
            </button>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {formData.features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: '#EEF2FF',
                  borderRadius: '20px',
                  fontSize: '14px',
                }}
              >
                {feature}
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '0',
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Technologies *
          </label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
              placeholder="e.g., React, Node.js..."
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={handleAddTech}
              style={{
                padding: '12px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Add
            </button>
          </div>
          {errors.technologies && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px' }}>
              {errors.technologies}
            </p>
          )}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {formData.technologies.map((tech, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: '#F3F4F6',
                  borderRadius: '20px',
                  fontSize: '14px',
                }}
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#374151',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '0',
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={submitting || uploadingImage}
            style={{
              flex: 1,
              padding: '12px 24px',
              background: submitting || uploadingImage ? '#9ca3af' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: submitting || uploadingImage ? 'not-allowed' : 'pointer',
            }}
          >
            {uploadingImage ? '📤 Uploading image...' : submitting ? '⏳ Saving...' : isEditing ? '💾 Update Product' : '✨ Create Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            style={{
              flex: 1,
              padding: '12px 24px',
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            ← Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
