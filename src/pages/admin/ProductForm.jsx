import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { validateProduct, hasErrors } from '../../utils/formValidation';
import { uploadImageToFirebase } from '../../utils/imageUtils';
import ImageUploader from '../../components/admin/ImageUploader';
import { FaGlobe, FaGooglePlay, FaApple, FaDownload } from 'react-icons/fa';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Screenshot Item Component
const SortableScreenshot = ({ screenshot, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: screenshot.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '2px solid #e5e7eb',
        background: 'white',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '6px 10px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'grab',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span style={{ fontSize: '14px' }}>⋮⋮</span>
        <span>#{screenshot.displayOrder}</span>
      </div>

      <img
        src={screenshot.url}
        alt="Screenshot"
        style={{
          width: '100%',
          height: '120px',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
      
      {/* Platform Badge */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
        }}
      >
        {screenshot.type === 'both' ? 'Web & Mobile' : screenshot.type === 'web' ? 'Web' : 'Mobile'}
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(screenshot.id)}
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 12px',
          fontSize: '12px',
          cursor: 'pointer',
          fontWeight: '500',
          zIndex: 10,
        }}
      >
        🗑️ Remove
      </button>
    </div>
  );
};

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
    logo: '',
    logoFile: null,
    screenshots: [],
    features: [],
    technologies: [],
    status: 'active',
    webAppUrl: '',
    androidAppUrl: '',
    iosAppUrl: '',
    directApkUrl: '',
    gitRepoUrl: '',
    displayOrder: 0,
  });

  const [featureInput, setFeatureInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoError, setLogoError] = useState('');
  const [uploadingScreenshots, setUploadingScreenshots] = useState(false);
  const [screenshotError, setScreenshotError] = useState('');
  const [screenshotType, setScreenshotType] = useState('web');
  const [addingAnotherScreenshot, setAddingAnotherScreenshot] = useState(false);
  const [changingLogo, setChangingLogo] = useState(false);
  const [hasOrderChanges, setHasOrderChanges] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id, isEditing]);

  const fetchProduct = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'products', id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        const normalizedScreenshots = (data.screenshots || []).map((screenshot, index) => ({
          ...screenshot,
          id: screenshot.id || `existing-${index}-${screenshot.url || 'screenshot'}`,
          displayOrder: screenshot.displayOrder ?? index + 1, // Assign order if missing
        }));
        // Sort by displayOrder
        normalizedScreenshots.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setFormData({
          ...data,
          screenshots: normalizedScreenshots,
          logoFile: null,
          directApkUrl: data.directApkUrl || '',
          gitRepoUrl: data.gitRepoUrl || '',
        });
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
      logoFile: croppedFile,
    }));
    setLogoError('');
    setChangingLogo(false);
  };

  const handleImageError = (error) => {
    setLogoError(error);
  };

  const handleScreenshotSelected = (croppedFile) => {
    const newScreenshot = {
      id: `new-${Date.now()}`,
      url: URL.createObjectURL(croppedFile),
      file: croppedFile,
      type: screenshotType,
      displayOrder: formData.screenshots.length + 1, // Add to end
    };
    setFormData((prev) => ({
      ...prev,
      screenshots: [...prev.screenshots, newScreenshot],
    }));
    setScreenshotError('');
    setAddingAnotherScreenshot(false);
  };

  const handleScreenshotError = (error) => {
    setScreenshotError(error);
  };

  const handleRemoveScreenshot = (screenshotId) => {
    setFormData((prev) => {
      const updatedScreenshots = prev.screenshots
        .filter(s => s.id !== screenshotId)
        .map((s, index) => ({ ...s, displayOrder: index + 1 }));
      return {
        ...prev,
        screenshots: updatedScreenshots,
      };
    });
    setHasOrderChanges(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.screenshots.findIndex((s) => s.id === active.id);
        const newIndex = prev.screenshots.findIndex((s) => s.id === over.id);

        const reorderedScreenshots = arrayMove(prev.screenshots, oldIndex, newIndex);
        // Update displayOrder based on new positions
        const updatedScreenshots = reorderedScreenshots.map((screenshot, index) => ({
          ...screenshot,
          displayOrder: index + 1,
        }));

        return {
          ...prev,
          screenshots: updatedScreenshots,
        };
      });
      setHasOrderChanges(true);
    }
  };

  const handleSaveOrder = async () => {
    if (!isEditing || !hasOrderChanges) return;

    setSavingOrder(true);
    try {
      // Prepare screenshots with updated order
      const screenshotsToSave = formData.screenshots.map(({ id, url, type, displayOrder, caption }) => ({
        url,
        type,
        displayOrder,
        ...(caption && { caption }),
      }));

      await updateDoc(doc(db, 'products', id), {
        screenshots: screenshotsToSave,
        updatedAt: new Date().toISOString(),
      });

      setHasOrderChanges(false);
      setSuccessMessage('Screenshot order saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving screenshot order:', error);
      setErrors({ general: 'Failed to save screenshot order' });
    } finally {
      setSavingOrder(false);
    }
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
      let logoUrl = formData.logo;

      // Upload logo to Firebase if new logo selected
      if (formData.logoFile) {
        setUploadingLogo(true);
        try {
          logoUrl = await uploadImageToFirebase(formData.logoFile, 'products/logos');
        } catch (uploadError) {
          console.error('Logo upload error:', uploadError);
          setErrors({ general: 'Failed to upload logo. Please try again.' });
          setSubmitting(false);
          setUploadingLogo(false);
          return;
        } finally {
          setUploadingLogo(false);
        }
      }

      // Upload screenshots to Firebase
      const screenshotPromises = formData.screenshots.map(async (screenshot) => {
        // If it's a new file (has file property)
        if (screenshot.file) {
          try {
            const url = await uploadImageToFirebase(screenshot.file, 'products/screenshots');
            return { 
              url, 
              type: screenshot.type,
              displayOrder: screenshot.displayOrder,
              ...(screenshot.caption && { caption: screenshot.caption }),
            };
          } catch (error) {
            console.error('Screenshot upload error:', error);
            throw error;
          }
        }
        // If it's an existing screenshot from database
        return { 
          url: screenshot.url, 
          type: screenshot.type,
          displayOrder: screenshot.displayOrder,
          ...(screenshot.caption && { caption: screenshot.caption }),
        };
      });

      let screenshotsData = [];
      if (screenshotPromises.length > 0) {
        setUploadingScreenshots(true);
        try {
          screenshotsData = await Promise.all(screenshotPromises);
        } catch (uploadError) {
          console.error('Screenshots upload error:', uploadError);
          setErrors({ general: 'Failed to upload screenshots. Please try again.' });
          setSubmitting(false);
          setUploadingScreenshots(false);
          return;
        } finally {
          setUploadingScreenshots(false);
        }
      }

      const dataToSave = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        logo: logoUrl,
        screenshots: screenshotsData,
        features: formData.features,
        technologies: formData.technologies,
        status: formData.status,
        webAppUrl: formData.webAppUrl || '',
        androidAppUrl: formData.androidAppUrl || '',
        iosAppUrl: formData.iosAppUrl || '',
        directApkUrl: formData.directApkUrl || '',
        gitRepoUrl: formData.gitRepoUrl || '',
        displayOrder: formData.displayOrder || 0,
        updatedAt: new Date().toISOString(),
      };

      if (isEditing) {
        await updateDoc(doc(db, 'products', id), dataToSave);
        setSuccessMessage('Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), {
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
            <option value="Web & Mobile">Web & Mobile</option>
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

        {/* Logo */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Product Logo (1:1 ratio) {!isEditing && '*'}
          </label>
          
          {formData.logoFile ? (
            <div style={{ marginBottom: '12px' }}>
              <img
                src={URL.createObjectURL(formData.logoFile)}
                alt="Logo preview"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '2px solid #667eea',
                }}
              />
              <p style={{ fontSize: '12px', color: '#059669', marginTop: '8px', fontWeight: '500' }}>
                ✅ New logo selected (will be uploaded on save)
              </p>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, logoFile: null }))}
                style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  background: '#fee2e2',
                  color: '#991b1b',
                  border: '1px solid #fca5a5',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Remove Selected
              </button>
            </div>
          ) : formData.logo ? (
            <div style={{ marginBottom: '12px' }}>
              <img
                src={formData.logo}
                alt="Logo preview"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '1px solid #e5e7eb',
                }}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                ✅ Current logo (will be replaced if you select a new one)
              </p>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setChangingLogo((v) => !v)}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    background: changingLogo ? '#f3f4f6' : '#eef2ff',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  {changingLogo ? 'Cancel' : 'Change Logo'}
                </button>
              )}
            </div>
          ) : null}

          {!formData.logoFile && (!formData.logo || changingLogo) ? (
            <ImageUploader
              onImageSelected={handleImageSelected}
              onError={handleImageError}
              aspectRatio={1 / 1}
              mode="single"
              inputId="product-logo-input"
            />
          ) : null}
          
          {logoError && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
              {logoError}
            </p>
          )}
          {errors.logo && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.logo}
            </p>
          )}
        </div>

        {/* Screenshots */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Screenshots
          </label>
          <div style={{ marginBottom: '12px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              📸 Add screenshots for different platforms. Select the type below:
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <select
                value={screenshotType}
                onChange={(e) => setScreenshotType(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              >
                <option value="web">Web Application</option>
                <option value="mobile">Mobile App</option>
                <option value="both">Both Web & Mobile</option>
              </select>
            </div>
          </div>

          {formData.screenshots.length === 0 ? (
            <ImageUploader
              onImageSelected={handleScreenshotSelected}
              onError={handleScreenshotError}
              aspectRatio={16 / 9}
              mode="single"
              inputId="product-screenshot-input"
            />
          ) : null}

          {screenshotError && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px', marginBottom: '12px' }}>
              {screenshotError}
            </p>
          )}

          {formData.screenshots.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '16px',
                padding: '12px',
                background: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #bae6fd',
              }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#0369a1', marginBottom: '4px' }}>
                    📸 Screenshots ({formData.screenshots.length})
                  </h4>
                  <p style={{ fontSize: '12px', color: '#0c4a6e' }}>
                    Drag screenshots to reorder. Click "Save Order" to persist changes.
                  </p>
                </div>
                {hasOrderChanges && (
                  <button
                    type="button"
                    onClick={handleSaveOrder}
                    disabled={savingOrder}
                    style={{
                      padding: '10px 20px',
                      background: savingOrder ? '#9ca3af' : '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: savingOrder ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {savingOrder ? '💾 Saving...' : '💾 Save Order'}
                  </button>
                )}
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={formData.screenshots.map(s => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                    gap: '16px' 
                  }}>
                    {formData.screenshots.map((screenshot) => (
                      <SortableScreenshot
                        key={screenshot.id}
                        screenshot={screenshot}
                        onRemove={handleRemoveScreenshot}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              {formData.screenshots.length < 6 && !addingAnotherScreenshot && (
                <button
                  type="button"
                  onClick={() => setAddingAnotherScreenshot(true)}
                  style={{
                    marginTop: '12px',
                    padding: '10px 16px',
                    background: '#f3f4f6',
                    color: '#374151',
                    border: '1px dashed #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  + Add Another Screenshot
                </button>
              )}
              {addingAnotherScreenshot && (
                <div style={{ marginTop: '12px' }}>
                  <ImageUploader
                    onImageSelected={handleScreenshotSelected}
                    onError={handleScreenshotError}
                    aspectRatio={16 / 9}
                    mode="single"
                    inputId="product-screenshot-input-more"
                  />
                </div>
              )}
            </div>
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
              <FaGooglePlay size={16} /> Android App URL (Solidev Store)
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

          {/* Direct APK Download URL */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaDownload size={16} /> Direct APK Download URL
            </label>
            <input
              type="url"
              name="directApkUrl"
              value={formData.directApkUrl}
              onChange={handleInputChange}
              placeholder="https://cdn.example.com/app-latest.apk"
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
              Add a direct download link for your APK (e.g., CDN or storage URL).
            </p>
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

          {/* Git Repository URL */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Git Repository URL
            </label>
            <input
              type="url"
              name="gitRepoUrl"
              value={formData.gitRepoUrl}
              onChange={handleInputChange}
              placeholder="https://github.com/username/repository"
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
              Add GitHub, GitLab, or other git repository URL for this project.
            </p>
          </div>

          {/* 
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
              Set the order in which this product appears on the frontend. Use increments of 10 (0, 10, 20, etc.) for flexibility.
            </p>
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
            <option value="coming-soon">Coming Soon</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={submitting || uploadingLogo || uploadingScreenshots}
            style={{
              flex: 1,
              padding: '12px 24px',
              background: submitting || uploadingLogo || uploadingScreenshots ? '#9ca3af' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: submitting || uploadingLogo || uploadingScreenshots ? 'not-allowed' : 'pointer',
            }}
          >
            {uploadingLogo ? '📤 Uploading logo...' : uploadingScreenshots ? '📸 Uploading screenshots...' : submitting ? '⏳ Saving...' : isEditing ? '💾 Update Product' : '✨ Create Product'}
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
