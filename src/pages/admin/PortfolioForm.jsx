import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { validatePortfolio, hasErrors } from '../../utils/formValidation';
import { uploadImageToFirebase, generateThumbnail } from '../../utils/imageUtils';
import ImageUploader from '../../components/admin/ImageUploader';
import { FaGlobe, FaGooglePlay, FaApple } from 'react-icons/fa';

const PortfolioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    projectName: '',
    client: '',
    description: '',
    category: '',
    images: [],
    imageFiles: [],
    thumbnailUrl: '',
    thumbnailFile: null,
    technologies: [],
    projectUrl: '',
    duration: '',
    teamSize: 1,
    featured: false,
    status: 'completed',
    webAppUrl: '',
    androidAppUrl: '',
    iosAppUrl: '',
    displayOrder: 0,
  });

  const [techInput, setTechInput] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchPortfolio();
    }
  }, [id, isEditing]);

  const fetchPortfolio = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'portfolios', id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          ...data,
          images: data.images || [],
          imageFiles: [],
          technologies: data.technologies || [],
        });
      } else {
        setErrors({ general: 'Portfolio not found' });
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setErrors({ general: 'Failed to load portfolio' });
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
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files],
    }));
    setImageError('');
  };

  const handleImageSelected = (croppedFile) => {
    setFormData((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, croppedFile],
    }));
    setImageError('');
  };

  const handleImageError = (error) => {
    setImageError(error);
  };

  const handleSetThumbnail = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      thumbnailUrl: imageUrl,
      thumbnailFile: null,
    }));
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = formData.images[index];
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      thumbnailUrl: prev.thumbnailUrl === imageToRemove ? '' : prev.thumbnailUrl,
    }));
  };

  const handleRemoveNewImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validatePortfolio({
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
      let allImages = [...formData.images];
      let thumbnailUrl = formData.thumbnailUrl;

      // Upload new images to Firebase if any
      if (formData.imageFiles.length > 0) {
        setUploadingImages(true);
        try {
          for (const file of formData.imageFiles) {
            const imageUrl = await uploadImageToFirebase(file, 'portfolios');
            allImages.push(imageUrl);

            // Set first new image as thumbnail if no thumbnail is set
            if (!thumbnailUrl && allImages.length > 0) {
              thumbnailUrl = imageUrl;
            }
          }
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          setErrors({ general: 'Failed to upload images. Please try again.' });
          setSubmitting(false);
          setUploadingImages(false);
          return;
        } finally {
          setUploadingImages(false);
        }
      }

      const dataToSave = {
        projectName: formData.projectName,
        client: formData.client,
        description: formData.description,
        category: formData.category,
        images: allImages,
        thumbnailUrl: thumbnailUrl,
        technologies: formData.technologies,
        projectUrl: formData.projectUrl,
        duration: formData.duration,
        teamSize: parseInt(formData.teamSize),
        featured: formData.featured,
        status: formData.status,
        webAppUrl: formData.webAppUrl || '',
        androidAppUrl: formData.androidAppUrl || '',
        iosAppUrl: formData.iosAppUrl || '',
        displayOrder: formData.displayOrder || 0,
        updatedAt: new Date().toISOString(),
      };

      if (isEditing) {
        await updateDoc(doc(db, 'portfolios', id), dataToSave);
        setSuccessMessage('Portfolio updated successfully!');
      } else {
        await addDoc(collection(db, 'portfolios'), {
          ...dataToSave,
          createdAt: new Date().toISOString(),
        });
        setSuccessMessage('Portfolio created successfully!');
      }

      setTimeout(() => {
        navigate('/admin/portfolios');
      }, 1500);
    } catch (error) {
      console.error('Error saving portfolio:', error);
      setErrors({ general: 'Failed to save portfolio. Please try again.' });
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
            borderTopColor: '#f59e0b',
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
        {isEditing ? 'Edit Portfolio' : 'Create New Portfolio'}
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
        {/* Project Name */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Project Name *
          </label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            placeholder="e.g., FinTech Dashboard"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: errors.projectName ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {errors.projectName && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.projectName}
            </p>
          )}
        </div>

        {/* Client */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Client Name *
          </label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            placeholder="e.g., Fortune 500 Company"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: errors.client ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {errors.client && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.client}
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
            placeholder="Detailed project description..."
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
            <option value="Web Application">Web Application</option>
            <option value="Mobile App">Mobile App</option>
            <option value="AI Integration">AI Integration</option>
            <option value="Enterprise System">Enterprise System</option>
            <option value="SaaS Platform">SaaS Platform</option>
          </select>
          {errors.category && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.category}
            </p>
          )}
        </div>

        {/* Images */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Project Images {!isEditing && '*'} (Multiple images supported)
          </label>
          
          <ImageUploader
            onImageSelected={handleImageSelected}
            onError={handleImageError}
            aspectRatio={16 / 9}
            mode="multiple"
          />
          
          {imageError && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
              {imageError}
            </p>
          )}
          {errors.images && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
              {errors.images}
            </p>
          )}

          {/* Existing Images */}
          {formData.images.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '12px' }}>
                Current Images ({formData.images.length})
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
                {formData.images.map((image, idx) => (
                  <div
                    key={`existing-${idx}`}
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: formData.thumbnailUrl === image ? '3px solid #f59e0b' : '1px solid #d1d5db',
                    }}
                  >
                    <img
                      src={image}
                      alt={`Portfolio ${idx + 1}`}
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        gap: '4px',
                        padding: '4px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleSetThumbnail(image)}
                        title="Set as thumbnail"
                        style={{
                          background: formData.thumbnailUrl === image ? '#f59e0b' : '#6b7280',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        📌
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        title="Remove image"
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images */}
          {formData.imageFiles.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '12px' }}>
                New Images to Upload ({formData.imageFiles.length})
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
                {formData.imageFiles.map((file, idx) => (
                  <div
                    key={`new-${idx}`}
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '2px dashed #f59e0b',
                      background: '#FEF3C7',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                      }}
                    >
                      📸
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: '#ef4444',
                        borderRadius: '4px',
                        padding: '4px 8px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(idx)}
                        title="Remove image"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '16px',
                          padding: '0',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail */}
        {formData.thumbnailUrl && (
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Thumbnail Preview
            </label>
            <img
              src={formData.thumbnailUrl}
              alt="Thumbnail"
              style={{
                width: '100%',
                maxHeight: '200px',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

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
              placeholder="e.g., React, Angular, .NET Core..."
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
                background: '#f59e0b',
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
                  background: '#FEF3C7',
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
                    color: '#92400e',
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

        {/* Project URL */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Project URL (optional)
          </label>
          <input
            type="url"
            name="projectUrl"
            value={formData.projectUrl}
            onChange={handleInputChange}
            placeholder="https://example.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Duration & Team Size (same row) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Duration *
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="e.g., 6 months"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.duration ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {errors.duration && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {errors.duration}
              </p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Team Size *
            </label>
            <input
              type="number"
              name="teamSize"
              min="1"
              value={formData.teamSize}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.teamSize ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {errors.teamSize && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {errors.teamSize}
              </p>
            )}
          </div>
        </div>

        {/* App URLs */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '16px', fontWeight: '600', color: '#374151', fontSize: '16px' }}>
            🔗 App Links (Optional)
          </label>
          
          {/* Web App URL */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaGlobe size={16} /> Web App URL
            </label>
            <input
              type="url"
              name="webAppUrl"
              value={formData.webAppUrl}
              onChange={handleInputChange}
              placeholder="https://app.example.com"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Android App URL */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaGooglePlay size={16} /> Android App URL (Play Store)
            </label>
            <input
              type="url"
              name="androidAppUrl"
              value={formData.androidAppUrl}
              onChange={handleInputChange}
              placeholder="https://play.google.com/store/apps/details?id=..."
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* iOS App URL */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaApple size={16} /> iOS App URL (App Store)
            </label>
            <input
              type="url"
              name="iosAppUrl"
              value={formData.iosAppUrl}
              onChange={handleInputChange}
              placeholder="https://apps.apple.com/app/..."
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Display Order */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#6b7280' }}>
              📊 Display Order (lower number = appears first)
            </label>
            <input
              type="number"
              name="displayOrder"
              min="0"
              value={formData.displayOrder}
              onChange={handleInputChange}
              placeholder="0"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px' }}>
              Set the order in which this portfolio appears on the frontend. Use increments of 10 (0, 10, 20, etc.) for flexibility.
            </p>
          </div>
        </div>

        {/* Featured & Status (same row) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label htmlFor="featured" style={{ fontWeight: '500', color: '#374151', cursor: 'pointer' }}>
              Featured Project
            </label>
          </div>

          <div>
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
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={submitting || uploadingImages}
            style={{
              flex: 1,
              padding: '12px 24px',
              background: submitting || uploadingImages ? '#9ca3af' : '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: submitting || uploadingImages ? 'not-allowed' : 'pointer',
            }}
          >
            {uploadingImages ? '📤 Uploading images...' : submitting ? '⏳ Saving...' : isEditing ? '💾 Update Portfolio' : '✨ Create Portfolio'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/portfolios')}
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

export default PortfolioForm;
