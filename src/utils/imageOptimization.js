/**
 * Image Optimization Utility
 * Generates thumbnails and optimizes images for web
 *
 * Features:
 * - Client-side thumbnail generation
 * - Canvas-based image resizing
 * - Aspect ratio preservation
 * - Quality optimization
 * - Fallback support
 */

/**
 * Generate a thumbnail from an image file or URL
 * @param {File|string} source - Image file or URL
 * @param {number} maxWidth - Maximum width for thumbnail (default: 300)
 * @param {number} quality - JPEG quality (0-1, default: 0.8) * @returns {Promise<Blob>} Thumbnail blob
 */
export const generateThumbnail = async (source, maxWidth = 300, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate dimensions maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create thumbnail blob'));
            }
          },
          'image/jpeg',
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Handle file or URL
    if (source instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(source);
    } else if (typeof source === 'string') {
      img.src = source;
    } else {
      reject(new Error('Invalid source: must be File or URL string'));
    }
  });
};

/**
 * Generate thumbnail and upload both original and thumbnail to Firebase
 * @param {File} file - Image file
 * @param {Function} uploadFunction - Firebase upload function (uploadImageToFirebase)
 * @param {string} folder - Storage folder path
 * @returns {Promise<Object>} { originalUrl, thumbnailUrl }
 */
export const uploadImageWithThumbnail = async (file, uploadFunction, folder = 'images') => {
  try {
    // Upload original image
    const originalUrl = await uploadFunction(file, folder);

    // Generate and upload thumbnail
    let thumbnailUrl = null;
    try {
      const thumbnailBlob = await generateThumbnail(file, 300, 0.8);
      const thumbnailFile = new File([thumbnailBlob], `thumb_${file.name}`, {
        type: 'image/jpeg',
      });
      thumbnailUrl = await uploadFunction(thumbnailFile, `${folder}/thumbnails`);
    } catch (thumbError) {
      console.warn('Thumbnail generation failed, continuing without thumbnail:', thumbError);
      // Continue with original image as fallback
      thumbnailUrl = originalUrl;
    }

    return {
      originalUrl,
      thumbnailUrl,
    };
  } catch (error) {
    console.error('Error uploading image with thumbnail:', error);
    throw error;
  }
};

/**
 * Validate image before upload
 * @param {File} file - Image file
 * @param {Object} options - Validation options
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validateImage = (
  file,
  options = {}
) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    minWidth = 100,
    minHeight = 100,
  } = options;

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${maxSize / 1024 / 1024}MB limit`,
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  // Note: Dimension check requires image to load, so it's async
  // This is a quick sync validation
  return { valid: true };
};

/**
 * Validate image dimensions asynchronously
 * @param {File} file - Image file
 * @param {number} minWidth - Minimum width
 * @param {number} minHeight - Minimum height
 * @returns {Promise<Object>} { valid: boolean, dimensions?: {width, height}, error?: string }
 */
export const validateImageDimensions = (file, minWidth = 100, minHeight = 100) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width >= minWidth && img.height >= minHeight) {
          resolve({
            valid: true,
            dimensions: { width: img.width, height: img.height },
          });
        } else {
          resolve({
            valid: false,
            dimensions: { width: img.width, height: img.height },
            error: `Image dimensions (${img.width}x${img.height}) below minimum (${minWidth}x${minHeight})`,
          });
        }
      };
      img.onerror = () => {
        resolve({
          valid: false,
          error: 'Failed to load image',
        });
      };
      img.src = e.target.result;
    };

    reader.onerror = () => {
      resolve({
        valid: false,
        error: 'Failed to read file',
      });
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Create blur placeholder from image
 * Can be used as fallback if thumbnail generation fails
 * @param {File} file - Image file
 * @returns {Promise<string>} Base64 blur placeholder data URL
 */
export const createBlurPlaceholder = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 20; // Very small for blur effect
          canvas.height = (20 * img.height) / img.width;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Get blurred data URL
          const blurredUrl = canvas.toDataURL('image/jpeg', 0.5);
          resolve(blurredUrl);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to create blur placeholder'));
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Batch process multiple images
 * @param {File[]} files - Array of image files
 * @param {Function} uploadFunction - Firebase upload function
 * @param {string} folder - Storage folder path
 * @param {Function} onProgress - Progress callback (index, total)
 * @returns {Promise<Object[]>} Array of { originalUrl, thumbnailUrl }
 */
export const uploadMultipleImagesWithThumbnails = async (
  files,
  uploadFunction,
  folder = 'images',
  onProgress = null
) => {
  const results = [];

  for (let i = 0; i < files.length; i++) {
    try {
      if (onProgress) onProgress(i + 1, files.length);

      const imageUrls = await uploadImageWithThumbnail(files[i], uploadFunction, folder);
      results.push(imageUrls);
    } catch (error) {
      console.error(`Error uploading image ${i + 1}:`, error);
      // Continue with next image even if one fails
      results.push({
        originalUrl: null,
        thumbnailUrl: null,
        error: error.message,
      });
    }
  }

  return results;
};

export default {
  generateThumbnail,
  uploadImageWithThumbnail,
  uploadMultipleImagesWithThumbnails,
  validateImage,
  validateImageDimensions,
  createBlurPlaceholder,
};
