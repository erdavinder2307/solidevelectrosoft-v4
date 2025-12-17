import React, { useState } from 'react';
import ImageCropper from './ImageCropper';
import { validateImageFile } from '../../utils/imageUtils';

/**
 * ImageUploader Component
 * Handles image selection, cropping, and upload callback
 */
const ImageUploader = ({ 
  onImageSelected, 
  aspectRatio = 1,
  mode = 'single', // 'single' or 'multiple'
  maxImages = 10,
  onError = null
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      if (onError) onError(validation.error);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setSelectedImage(file);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedFile) => {
    setShowCropper(false);
    onImageSelected(croppedFile);
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleCancel = () => {
    setShowCropper(false);
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  if (showCropper && previewUrl) {
    return (
      <ImageCropper
        imageSrc={previewUrl}
        onCropComplete={handleCropComplete}
        onCancel={handleCancel}
        aspectRatio={aspectRatio}
      />
    );
  }

  return (
    <div
      style={{
        border: '2px dashed #d1d5db',
        borderRadius: '12px',
        padding: '40px 20px',
        textAlign: 'center',
        background: '#f9fafb',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#667eea';
        e.currentTarget.style.background = '#f3f4f6';
      }}
      onDragLeave={(e) => {
        e.currentTarget.style.borderColor = '#d1d5db';
        e.currentTarget.style.background = '#f9fafb';
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#d1d5db';
        e.currentTarget.style.background = '#f9fafb';
        const file = e.dataTransfer.files[0];
        if (file) {
          const validation = validateImageFile(file);
          if (!validation.valid) {
            if (onError) onError(validation.error);
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result);
            setSelectedImage(file);
            setShowCropper(true);
          };
          reader.readAsDataURL(file);
        }
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        id="image-input"
      />

      <label
        htmlFor="image-input"
        style={{
          cursor: 'pointer',
          display: 'block',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📸</div>
        <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', marginBottom: '4px' }}>
          {mode === 'multiple' ? 'Click or drag images here' : 'Click or drag an image here'}
        </p>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          JPG, PNG, or WebP • Max 5MB
        </p>
      </label>
    </div>
  );
};

export default ImageUploader;
