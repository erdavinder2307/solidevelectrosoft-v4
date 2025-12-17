import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { blobToFile } from '../../utils/imageUtils';

/**
 * ImageCropper Component
 * Allows users to crop images before upload
 */
const ImageCropper = ({ imageSrc, onCropComplete, onCancel, aspectRatio = 1 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropChange = (crop) => {
    setCrop(crop);
  };

  const handleZoomChange = (zoom) => {
    setZoom(Math.min(Math.max(zoom, 1), 3));
  };

  const handleCropAreaChange = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);

    try {
      // Create canvas and crop the image
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        canvas.toBlob((blob) => {
          const file = blobToFile(blob, 'cropped-image.jpg');
          onCropComplete(file);
          setIsProcessing(false);
        }, 'image/jpeg');
      };
    } catch (error) {
      console.error('Crop error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
      }}
    >
      {/* Crop Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          background: '#000',
          marginBottom: '20px',
        }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={handleCropChange}
          onCropAreaChange={handleCropAreaChange}
          onZoomChange={handleZoomChange}
          showGrid={true}
        />
      </div>

      {/* Controls */}
      <div style={{ padding: '20px' }}>
        {/* Zoom Slider */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151', fontSize: '14px' }}>
            Zoom ({Math.round(zoom * 100)}%)
          </label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: '#e5e7eb',
              outline: 'none',
              WebkitAppearance: 'none',
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSaveCrop}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '12px 20px',
              background: isProcessing ? '#9ca3af' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            {isProcessing ? '⏳ Processing...' : '✂️ Save & Crop'}
          </button>
          <button
            onClick={onCancel}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '12px 20px',
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            ✕ Cancel
          </button>
        </div>

        {/* Tips */}
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            background: '#f3f4f6',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#6b7280',
          }}
        >
          💡 <strong>Tip:</strong> Drag to move, scroll/slider to zoom, drag corners to adjust
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
