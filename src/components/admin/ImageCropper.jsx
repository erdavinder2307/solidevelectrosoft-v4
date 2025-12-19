import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { blobToFile } from '../../utils/imageUtils';

// Clean, single ImageCropper component with Crop and Fit modes
const ImageCropper = ({ imageSrc, onCropComplete, onCancel, aspectRatio = 1 }) => {
  const [mode, setMode] = useState('fit');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAspect, setCurrentAspect] = useState(aspectRatio);
  const [bgTransparent, setBgTransparent] = useState(true);
  const [bgColor, setBgColor] = useState('#ffffff');

  const handleSave = () => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      if (mode === 'crop') {
        if (!croppedAreaPixels) {
          setIsProcessing(false);
          return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          img,
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
      } else {
        // Fit mode: letterbox image into selected aspect
        const srcW = img.naturalWidth;
        const srcH = img.naturalHeight;
        const ratio = currentAspect || 1;

        let targetW = srcW;
        let targetH = Math.round(targetW / ratio);
        if (targetH < srcH) {
          targetH = srcH;
          targetW = Math.round(targetH * ratio);
        }

        const scale = Math.min(targetW / srcW, targetH / srcH);
        const drawW = Math.round(srcW * scale);
        const drawH = Math.round(srcH * scale);
        const offsetX = Math.round((targetW - drawW) / 2);
        const offsetY = Math.round((targetH - drawH) / 2);

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!bgTransparent) {
          ctx.fillStyle = bgColor || '#ffffff';
          ctx.fillRect(0, 0, targetW, targetH);
        } else {
          ctx.clearRect(0, 0, targetW, targetH);
        }
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, srcW, srcH, offsetX, offsetY, drawW, drawH);

        const mime = bgTransparent ? 'image/png' : 'image/jpeg';
        const filename = bgTransparent ? 'fitted-image.png' : 'fitted-image.jpg';
        canvas.toBlob((blob) => {
          const file = blobToFile(blob, filename);
          onCropComplete(file);
          setIsProcessing(false);
        }, mime);
      }
    };
    img.onerror = () => setIsProcessing(false);
  };

  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      {/* Crop/Preview area */}
      <div style={{ position: 'relative', width: '100%', height: 500, background: '#000', marginBottom: 20 }}>
        {mode === 'crop' ? (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={currentAspect}
            onCropChange={setCrop}
            onCropAreaChange={(_, areaPx) => setCroppedAreaPixels(areaPx)}
            onZoomChange={(z) => setZoom(Math.min(Math.max(z, 1), 3))}
            showGrid
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: bgTransparent ? 'transparent' : bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={imageSrc} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ padding: 20 }}>
        {/* Mode */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button type="button" onClick={() => setMode('crop')} disabled={isProcessing} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db', background: mode === 'crop' ? '#EEF2FF' : '#fff', fontWeight: 600, cursor: isProcessing ? 'not-allowed' : 'pointer' }}>
            ✂️ Crop
          </button>
          <button type="button" onClick={() => setMode('fit')} disabled={isProcessing} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db', background: mode === 'fit' ? '#EEF2FF' : '#fff', fontWeight: 600, cursor: isProcessing ? 'not-allowed' : 'pointer' }}>
            🖼️ Fit with padding
          </button>
        </div>

        {/* Aspect presets */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151', fontSize: 14 }}>Aspect ratio</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { label: 'Square', value: 1 },
              { label: '3:4', value: 3 / 4 },
              { label: '3:2', value: 3 / 2 },
              { label: '16:9', value: 16 / 9 },
              { label: '9:16', value: 9 / 16 },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setCurrentAspect(opt.value)}
                disabled={isProcessing}
                style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: currentAspect === opt.value ? '#e5e7eb' : '#fff', cursor: isProcessing ? 'not-allowed' : 'pointer', fontSize: 12, fontWeight: 600 }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Background options for FIT */}
        {mode === 'fit' && (
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={bgTransparent} onChange={(e) => setBgTransparent(e.target.checked)} />
              Transparent background (PNG)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#374151' }}>Color:</span>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} disabled={bgTransparent} style={{ width: 32, height: 24, border: '1px solid #d1d5db', borderRadius: 4 }} />
            </div>
          </div>
        )}

        {/* Zoom for Crop */}
        {mode === 'crop' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151', fontSize: 14 }}>Zoom ({Math.round(zoom * 100)}%)</label>
            <input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(Math.min(Math.max(parseFloat(e.target.value), 1), 3))} style={{ width: '100%', height: 6, borderRadius: 3, background: '#e5e7eb', outline: 'none' }} />
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handleSave} disabled={isProcessing} style={{ flex: 1, padding: '12px 20px', background: isProcessing ? '#9ca3af' : '#667eea', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: isProcessing ? 'not-allowed' : 'pointer', fontSize: 14 }}>
            {isProcessing ? '⏳ Processing...' : mode === 'crop' ? '✂️ Save & Crop' : '🖼️ Save & Fit'}
          </button>
          <button onClick={onCancel} disabled={isProcessing} style={{ flex: 1, padding: '12px 20px', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, fontWeight: 600, cursor: isProcessing ? 'not-allowed' : 'pointer', fontSize: 14 }}>
            ✕ Cancel
          </button>
        </div>

        <div style={{ marginTop: 16, padding: 12, background: '#f3f4f6', borderRadius: 8, fontSize: 12, color: '#6b7280' }}>
          💡 <strong>Tip:</strong> Crop mode lets you frame the image; Fit mode pads the image to the selected aspect with color or transparency.
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
 
