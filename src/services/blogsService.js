import { collection, getDocs, query, where, orderBy, doc, updateDoc, addDoc, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'blogs';

export async function fetchAllBlogsAdmin() {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('publishDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching blogs:', err);
    throw err;
  }
}

export async function fetchPublishedBlogs({ limitCount } = {}) {
  try {
    const clauses = [
      where('status', '==', 'Published'),
      orderBy('publishDate', 'desc')
    ];
    if (limitCount) clauses.push(limit(limitCount));
    const q = query(collection(db, COLLECTION_NAME), ...clauses);
    const snapshot = await getDocs(q);
    
    // Filter out soft-deleted and future scheduled posts
    const now = new Date();
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((blog) => {
        // Exclude soft-deleted blogs
        if (blog.isDeleted === true) return false;
        
        // Exclude blogs without publishDate
        if (!blog.publishDate) return false;
        
        // Exclude future scheduled posts
        const publishDate = blog.publishDate.seconds 
          ? new Date(blog.publishDate.seconds * 1000) 
          : new Date(blog.publishDate);
        return publishDate <= now;
      });
  } catch (err) {
    console.error('Error fetching published blogs:', err);
    throw err;
  }
}

export async function getBlogBySlug(slug) {
  try {
    // Query by slug only to avoid composite index issues
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('slug', '==', slug),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    
    const d = snapshot.docs[0];
    const blog = { id: d.id, ...d.data() };
    
    // Client-side validation for published status
    if (blog.status !== 'Published') return null;
    if (blog.isDeleted === true) return null;
    
    // Check if publishDate is in the past
    if (blog.publishDate) {
      const publishDate = blog.publishDate.seconds 
        ? new Date(blog.publishDate.seconds * 1000) 
        : new Date(blog.publishDate);
      const now = new Date();
      if (publishDate > now) return null; // Future scheduled post, not yet public
    }
    
    return blog;
  } catch (err) {
    console.error('Error fetching blog by slug:', err);
    throw err;
  }
}

export async function isSlugUnique(slug, excludeId = null) {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return true;
    const d = snapshot.docs[0];
    if (excludeId && d.id === excludeId) return true;
    return false;
  } catch (err) {
    console.error('Error checking slug uniqueness:', err);
    throw err;
  }
}

export async function createBlog(data) {
  const now = new Date();
  const payload = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImageUrl: '',
    category: '',
    tags: [],
    status: 'Draft',
    publishDate: null,
    isDeleted: false,  // Always initialize as not deleted
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    createdAt: now,
    updatedAt: now,
    ...data,
  };

  const ref = await addDoc(collection(db, COLLECTION_NAME), payload);
  return ref.id;
}

export async function updateBlog(id, data) {
  await updateDoc(doc(db, COLLECTION_NAME, id), { ...data, updatedAt: new Date() });
}

export async function softDeleteBlog(id) {
  await updateDoc(doc(db, COLLECTION_NAME, id), { isDeleted: true, status: 'Draft', updatedAt: new Date() });
}

export default {
  fetchAllBlogsAdmin,
  fetchPublishedBlogs,
  getBlogBySlug,
  isSlugUnique,
  createBlog,
  updateBlog,
  softDeleteBlog,
};
