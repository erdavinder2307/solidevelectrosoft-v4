import React, { useState, useEffect, useCallback } from 'react';

const FullScreenSlider = ({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex = 0, 
  projectTitle = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset current index when modal opens with new images
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
        break;
      case 'ArrowRight':
        setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
        break;
      default:
        break;
    }
  }, [isOpen, onClose, images.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = () => {
    setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
  };

  const prevImage = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  if (!isOpen) return null;

  return (
    <div className="fullscreen-slider-overlay" onClick={onClose}>
      <div className="fullscreen-slider-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="fullscreen-slider-header">
          <h3 className="fullscreen-slider-title">{projectTitle}</h3>
          <button 
            className="fullscreen-slider-close" 
            onClick={onClose}
            aria-label="Close slider"
          >
            <i className="fal fa-times"></i>
          </button>
        </div>

        {/* Main Image */}
        <div className="fullscreen-slider-main">
          <button 
            className="fullscreen-slider-nav fullscreen-slider-prev" 
            onClick={prevImage}
            disabled={images.length <= 1}
            aria-label="Previous image"
          >
            <i className="fal fa-chevron-left"></i>
          </button>

          <div className="fullscreen-slider-image-container">
            <img 
              src={images[currentIndex]?.src} 
              alt={images[currentIndex]?.alt || `${projectTitle} image ${currentIndex + 1}`}
              className="fullscreen-slider-image"
            />
          </div>

          <button 
            className="fullscreen-slider-nav fullscreen-slider-next" 
            onClick={nextImage}
            disabled={images.length <= 1}
            aria-label="Next image"
          >
            <i className="fal fa-chevron-right"></i>
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="fullscreen-slider-thumbnails">
            {images.map((image, index) => (
              <button
                key={index}
                className={`fullscreen-slider-thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
                aria-label={`Go to image ${index + 1}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt || `${projectTitle} thumbnail ${index + 1}`} 
                />
              </button>
            ))}
          </div>
        )}

        {/* Image Counter */}
        <div className="fullscreen-slider-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default FullScreenSlider;
