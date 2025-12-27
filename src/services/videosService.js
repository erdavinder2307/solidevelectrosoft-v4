import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'videos';

/**
 * Videos Service
 * Handles all Firestore operations for YouTube videos
 */

/**
 * Extract YouTube video ID from various URL formats
 */
export const extractYouTubeId = (input) => {
  if (!input) return null;
  
  // If already just an ID (11 characters)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }
  
  // Match various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

/**
 * Generate YouTube thumbnail URL
 */
export const getYouTubeThumbnail = (videoId, quality = 'maxresdefault') => {
  if (!videoId) return null;
  // Options: maxresdefault, hqdefault, mqdefault, sddefault, default
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Validate YouTube video ID format
 */
export const isValidYouTubeId = (videoId) => {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
};

/**
 * Fetch all videos (admin)
 */
export const fetchAllVideos = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('displayOrder', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching all videos:', error);
    throw error;
  }
};

/**
 * Fetch published videos (public)
 */
export const fetchPublishedVideos = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPublished', '==', true),
      orderBy('displayOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching published videos:', error);
    throw error;
  }
};

/**
 * Fetch featured videos
 */
export const fetchFeaturedVideos = async (limit = 4) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPublished', '==', true),
      where('isFeatured', '==', true),
      orderBy('displayOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    const videos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return videos.slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    throw error;
  }
};

/**
 * Fetch video by ID
 */
export const fetchVideoById = async (videoId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, videoId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

/**
 * Create new video
 */
export const createVideo = async (videoData) => {
  try {
    const videoId = extractYouTubeId(videoData.youtubeVideoId);
    if (!videoId || !isValidYouTubeId(videoId)) {
      throw new Error('Invalid YouTube video ID');
    }
    
    const newVideo = {
      ...videoData,
      youtubeVideoId: videoId,
      thumbnailUrl: videoData.thumbnailUrl || getYouTubeThumbnail(videoId),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), newVideo);
    return docRef.id;
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

/**
 * Update video
 */
export const updateVideo = async (videoId, videoData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, videoId);
    
    // Extract and validate YouTube ID if changed
    let updateData = { ...videoData };
    if (videoData.youtubeVideoId) {
      const extractedId = extractYouTubeId(videoData.youtubeVideoId);
      if (!extractedId || !isValidYouTubeId(extractedId)) {
        throw new Error('Invalid YouTube video ID');
      }
      updateData.youtubeVideoId = extractedId;
      // Update thumbnail if not custom
      if (!videoData.thumbnailUrl || videoData.thumbnailUrl.includes('img.youtube.com')) {
        updateData.thumbnailUrl = getYouTubeThumbnail(extractedId);
      }
    }
    
    updateData.updatedAt = serverTimestamp();
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
};

/**
 * Delete video
 */
export const deleteVideo = async (videoId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, videoId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};

/**
 * Toggle video published status
 */
export const toggleVideoPublished = async (videoId, isPublished) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, videoId);
    await updateDoc(docRef, {
      isPublished,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error toggling video published status:', error);
    throw error;
  }
};

/**
 * Toggle video featured status
 */
export const toggleVideoFeatured = async (videoId, isFeatured) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, videoId);
    await updateDoc(docRef, {
      isFeatured,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error toggling video featured status:', error);
    throw error;
  }
};

/**
 * Fetch videos by category
 */
export const fetchVideosByCategory = async (category) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPublished', '==', true),
      where('category', '==', category),
      orderBy('displayOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    throw error;
  }
};

/**
 * Get unique categories
 */
export const getVideoCategories = async () => {
  try {
    const videos = await fetchPublishedVideos();
    const categories = [...new Set(videos.map(v => v.category).filter(Boolean))];
    return categories.sort();
  } catch (error) {
    console.error('Error fetching video categories:', error);
    throw error;
  }
};
