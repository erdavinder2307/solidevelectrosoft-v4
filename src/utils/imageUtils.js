/**
 * Image Utilities
 * Functions for image compression, optimization, and Firebase Storage upload
 */

import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Compress image file
 * @param {File} file - Image file to compress
 * @param {Object} options - Compression options
 * @returns {Promise<File>} - Compressed image file
 */
export const compressImage = async (file, options = {}) => {
  const defaultOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg',
  };

  const compressionOptions = { ...defaultOptions, ...options };

  try {
    const compressedFile = await imageCompression(file, compressionOptions);
    return compressedFile;
  } catch (error) {
    console.error('Image compression error:', error);
    throw new Error('Failed to compress image');
  }
};

/**
 * Generate thumbnail from image file
 * @param {File} file - Image file
 * @param {number} maxSize - Max width/height for thumbnail
 * @returns {Promise<File>} - Thumbnail file
 */
export const generateThumbnail = async (file, maxSize = 300) => {
  try {
    const thumbnail = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: maxSize,
      useWebWorker: true,
      fileType: 'image/jpeg',
    });
    return thumbnail;
  } catch (error) {
    console.error('Thumbnail generation error:', error);
    throw new Error('Failed to generate thumbnail');
  }
};

/**
 * Upload image to Firebase Storage
 * @param {File} file - Image file to upload
 * @param {string} folder - Storage folder (products or portfolios)
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<string>} - Download URL of uploaded image
 */
export const uploadImageToFirebase = async (file, folder = 'products', onProgress = null) => {
  try {
    // Compress image first
    const compressedFile = await compressImage(file);

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = uuidv4().substring(0, 8);
    const fileExtension = compressedFile.type === 'image/jpeg' ? '.jpg' : '.png';
    const fileName = `${timestamp}-${randomId}${fileExtension}`;

    // Create storage reference
    const storageRef = ref(storage, `${folder}/${fileName}`);

    // Upload file
    const snapshot = await uploadBytes(storageRef, compressedFile, {
      contentType: compressedFile.type,
    });

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Firebase upload error:', error);
    throw new Error('Failed to upload image to Firebase');
  }
};

/**
 * Upload multiple images to Firebase Storage
 * @param {File[]} files - Array of image files
 * @param {string} folder - Storage folder (products or portfolios)
 * @param {Function} onProgress - Progress callback with signature (index, total)
 * @returns {Promise<string[]>} - Array of download URLs
 */
export const uploadMultipleImagesToFirebase = async (
  files,
  folder = 'portfolios',
  onProgress = null
) => {
  const urls = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const url = await uploadImageToFirebase(files[i], folder);
      urls.push(url);
      if (onProgress) {
        onProgress(i + 1, files.length);
      }
    } catch (error) {
      console.error(`Failed to upload image ${i + 1}:`, error);
      throw error;
    }
  }

  return urls;
};

/**
 * Delete image from Firebase Storage
 * @param {string} imageUrl - Download URL of the image
 * @returns {Promise<void>}
 */
export const deleteImageFromFirebase = async (imageUrl) => {
  try {
    // Extract filename from URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0];

    // This requires a backend function for security
    // For now, we'll handle deletion via Firestore cleanup
    console.log('Image deletion would be handled by backend cleanup');
  } catch (error) {
    console.error('Image deletion error:', error);
    // Don't throw - allow the operation to continue
  }
};

/**
 * Validate image file
 * @param {File} file - Image file to validate
 * @returns {Object} - { valid: boolean, error: string }
 */
export const validateImageFile = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 5MB limit' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPG, PNG, and WebP files are allowed' };
  }

  return { valid: true, error: '' };
};

/**
 * Convert blob to file
 * @param {Blob} blob - Blob to convert
 * @param {string} fileName - Name for the file
 * @returns {File}
 */
export const blobToFile = (blob, fileName) => {
  return new File([blob], fileName, { type: blob.type });
};
