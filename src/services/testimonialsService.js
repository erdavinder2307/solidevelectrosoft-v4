import { collection, getDocs, query, where, orderBy, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Fetch published testimonials ordered by displayOrder
export async function fetchPublishedTestimonials() {
  try {
    const q = query(
      collection(db, 'testimonials'),
      where('isPublished', '==', true),
      where('isDeleted', '==', false),
      orderBy('displayOrder', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    throw err;
  }
}

// Optional helpers for admin actions (used by admin pages)
export async function setTestimonialPublished(id, isPublished) {
  await updateDoc(doc(db, 'testimonials', id), { isPublished, updatedAt: new Date() });
}

export async function setTestimonialFeatured(id, isFeatured) {
  await updateDoc(doc(db, 'testimonials', id), { isFeatured, updatedAt: new Date() });
}

export async function softDeleteTestimonial(id) {
  await updateDoc(doc(db, 'testimonials', id), { isDeleted: true, isPublished: false, updatedAt: new Date() });
}

export async function updateDisplayOrder(id, displayOrder) {
  await updateDoc(doc(db, 'testimonials', id), { displayOrder, updatedAt: new Date() });
}

export async function createTestimonial(data) {
  const now = new Date();
  const payload = {
    clientName: '',
    clientRole: '',
    clientCompany: '',
    country: '',
    rating: 5,
    testimonialText: '',
    clientInitials: '',
    clientImageUrl: '',
    source: '',
    isFeatured: false,
    isPublished: false,
    isDeleted: false,
    displayOrder: 0,
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  const ref = await addDoc(collection(db, 'testimonials'), payload);
  return ref.id;
}

export async function updateTestimonial(id, data) {
  await updateDoc(doc(db, 'testimonials', id), { ...data, updatedAt: new Date() });
}
