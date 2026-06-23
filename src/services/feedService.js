/**
 * Feed Service
 * Handles FeedPost, FeedReaction, FeedComment, and FeedEngagement Firestore operations.
 * Also aggregates existing Blog posts into the homepage feed without any data duplication.
 */
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  increment,
  serverTimestamp,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ─── Collection names ────────────────────────────────────────────────────────
const FEED_POSTS       = 'feedPosts';
const FEED_REACTIONS   = 'feedReactions';
const FEED_COMMENTS    = 'feedComments';
// Lightweight engagement tracker for blog-sourced items (doesn't touch blogs collection)
const FEED_ENGAGEMENT  = 'feedEngagement';

// ─── Visitor ID ───────────────────────────────────────────────────────────────
export function getVisitorId() {
  const KEY = 'se_visitor_id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

// ─── Aggregated Feed (blogs + feedPosts) ──────────────────────────────────────

/**
 * Convert a Firestore blog document to a normalised feed item.
 * Uses `blog_${id}` as the feedId to namespace it from feedPost IDs.
 */
function normalizeBlogAsFeedItem(docSnap) {
  const d = docSnap.data();
  const publishDate = d.publishDate ? toDate(d.publishDate) : null;
  return {
    feedId: `blog_${docSnap.id}`,
    source: 'blog',
    type: 'blog_article',
    title: d.title || '',
    slug: d.slug || '',
    summary: d.excerpt || d.summary || '',
    imageUrl: d.coverImageUrl || d.imageUrl || '',
    publishedDate: publishDate,
    tags: d.tags || [],
    isPinned: false,
    relatedProductId: null,
    relatedProductName: null,
    relatedProductSlug: null,
    // Engagement populated from feedEngagement collection (see enrichWithEngagement)
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
  };
}

/**
 * Fetch up to `fetchLimit` published blogs and `fetchLimit` feedPosts,
 * merge them, sort by publishedDate descending, and return paginated slice.
 *
 * @param {number} pageSize  - Items per page shown in UI
 * @param {number} page      - 0-based page index
 * @param {number} fetchLimit - Max items to fetch from each source (default 40)
 */
export async function fetchAggregatedFeed(pageSize = 6, page = 0, fetchLimit = 40) {
  const now = new Date();
  try {
    // ── 1. Fetch published blogs ────────────────────────────────────────────
    let blogs = [];
    try {
      const blogQ = query(
        collection(db, 'blogs'),
        where('status', '==', 'Published'),
        orderBy('publishDate', 'desc'),
        limit(fetchLimit)
      );
      const blogSnap = await getDocs(blogQ);
      blogs = blogSnap.docs
        .map((d) => normalizeBlogAsFeedItem(d))
        .filter((item) => {
          if (!item.publishedDate) return false;
          return item.publishedDate <= now;
        });
    } catch (err) {
      console.warn('Feed: blog fetch failed, continuing without blogs:', err);
    }

    // ── 2. Fetch published feedPosts ────────────────────────────────────────
    let feedItems = [];
    try {
      const feedQ = query(
        collection(db, FEED_POSTS),
        where('isPublished', '==', true),
        orderBy('publishedDate', 'desc'),
        limit(fetchLimit)
      );
      const feedSnap = await getDocs(feedQ);
      feedItems = feedSnap.docs
        .map((d) => normalizeFeedPostToFeedItem(d))
        .filter((item) => {
          if (!item.publishedDate) return false;
          return item.publishedDate <= now;
        });
    } catch (err) {
      console.warn('Feed: feedPosts fetch failed, continuing without feedPosts:', err);
    }

    // ── 3. Merge & sort ────────────────────────────────────────────────────
    const all = [...feedItems, ...blogs].sort((a, b) => {
      // Pinned feedPosts always first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.publishedDate?.getTime() || 0) - (a.publishedDate?.getTime() || 0);
    });

    // ── 4. Paginate ────────────────────────────────────────────────────────
    const start = page * pageSize;
    const pageItems = all.slice(start, start + pageSize);
    const hasMore = all.length > start + pageSize;
    const totalCount = all.length;

    return { items: pageItems, hasMore, totalCount };
  } catch (err) {
    console.error('fetchAggregatedFeed error:', err);
    return { items: [], hasMore: false, totalCount: 0 };
  }
}

/**
 * Enrich a list of feed items with engagement counts from feedEngagement.
 * For blog items: counts are stored in feedEngagement/{feedId}.
 * For feedPost items: counts come from the feedPost itself (already populated).
 */
export async function enrichWithEngagement(items) {
  const blogItems = items.filter((i) => i.source === 'blog');
  if (!blogItems.length) return items;

  // Fetch engagement docs for blog items in parallel
  const engagementMap = new Map();
  await Promise.all(
    blogItems.map(async (item) => {
      try {
        const snap = await getDoc(doc(db, FEED_ENGAGEMENT, item.feedId));
        if (snap.exists()) {
          engagementMap.set(item.feedId, snap.data());
        }
      } catch { /* non-critical */ }
    })
  );

  return items.map((item) => {
    if (item.source !== 'blog') return item;
    const eng = engagementMap.get(item.feedId);
    if (!eng) return item;
    return { ...item, likeCount: eng.likeCount || 0, commentCount: eng.commentCount || 0, shareCount: eng.shareCount || 0 };
  });
}

// ─── Feed Posts (Content Hub) ────────────────────────────────────────────────

/**
 * Normalize a feedPost Firestore doc to a unified feed item.
 */
function normalizeFeedPostToFeedItem(docSnap) {
  const d = docSnap.data();
  return {
    feedId: docSnap.id,
    source: 'feed',
    type: d.type || 'blog_article',
    title: d.title || '',
    slug: d.slug || '',
    summary: d.summary || '',
    imageUrl: d.imageUrl || '',
    publishedDate: d.publishedDate ? toDate(d.publishedDate) : null,
    tags: d.tags || [],
    isPinned: d.isPinned || false,
    isPublished: d.isPublished || false,
    relatedProductId: d.relatedProductId || null,
    relatedProductName: d.relatedProductName || null,
    relatedProductSlug: d.relatedProductSlug || null,
    likeCount: d.likeCount || 0,
    commentCount: d.commentCount || 0,
    shareCount: d.shareCount || 0,
    seoTitle: d.seoTitle || '',
    seoDescription: d.seoDescription || '',
  };
}

/**
 * @deprecated Use fetchAggregatedFeed instead for homepage.
 * Kept for admin list which only shows feedPosts (not blogs).
 */
export async function fetchPublishedFeedPosts(pageSize = 5, lastDoc = null) {
  try {
    const clauses = [
      where('isPublished', '==', true),
      orderBy('isPinned', 'desc'),
      orderBy('publishedDate', 'desc'),
      limit(pageSize + 1),
    ];
    if (lastDoc) clauses.push(startAfter(lastDoc));

    const q = query(collection(db, FEED_POSTS), ...clauses);
    const snap = await getDocs(q);

    const docs = snap.docs;
    const hasMore = docs.length > pageSize;
    const pageDocs = hasMore ? docs.slice(0, pageSize) : docs;

    const posts = pageDocs.map((d) => normalizeFeedPost(d));
    return {
      posts,
      lastDoc: pageDocs.length > 0 ? pageDocs[pageDocs.length - 1] : null,
      hasMore,
    };
  } catch (err) {
    console.error('fetchPublishedFeedPosts error:', err);
    return { posts: [], lastDoc: null, hasMore: false };
  }
}

/**
 * Fetch ALL posts for admin management.
 */
export async function fetchAllFeedPostsAdmin() {
  try {
    const q = query(collection(db, FEED_POSTS), orderBy('createdDate', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => normalizeFeedPost(d));
  } catch (err) {
    console.error('fetchAllFeedPostsAdmin error:', err);
    throw err;
  }
}

export async function getFeedPostById(id) {
  const snap = await getDoc(doc(db, FEED_POSTS, id));
  if (!snap.exists()) return null;
  return normalizeFeedPost(snap);
}

export async function createFeedPost(data) {
  const payload = sanitizeFeedPostPayload(data);
  payload.createdDate = serverTimestamp();
  payload.likeCount = 0;
  payload.commentCount = 0;
  payload.shareCount = 0;
  const ref = await addDoc(collection(db, FEED_POSTS), payload);
  return ref.id;
}

export async function updateFeedPost(id, data) {
  const payload = sanitizeFeedPostPayload(data);
  payload.updatedDate = serverTimestamp();
  await updateDoc(doc(db, FEED_POSTS, id), payload);
}

export async function deleteFeedPost(id) {
  await deleteDoc(doc(db, FEED_POSTS, id));
}

function normalizeFeedPost(docSnap) {
  const d = docSnap.data();
  return {
    id: docSnap.id,
    type: d.type || 'blog_article',
    title: d.title || '',
    slug: d.slug || '',
    summary: d.summary || '',
    content: d.content || '',
    imageUrl: d.imageUrl || '',
    relatedProductId: d.relatedProductId || null,
    relatedProductName: d.relatedProductName || null,
    relatedProductSlug: d.relatedProductSlug || null,
    tags: d.tags || [],
    isPinned: d.isPinned || false,
    isPublished: d.isPublished || false,
    publishedDate: d.publishedDate ? toDate(d.publishedDate) : null,
    createdDate: d.createdDate ? toDate(d.createdDate) : null,
    likeCount: d.likeCount || 0,
    commentCount: d.commentCount || 0,
    shareCount: d.shareCount || 0,
    seoTitle: d.seoTitle || '',
    seoDescription: d.seoDescription || '',
  };
}

function sanitizeFeedPostPayload(data) {
  return {
    type: data.type || 'blog_article',
    title: (data.title || '').trim(),
    slug: (data.slug || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    summary: (data.summary || '').trim(),
    content: data.content || '',
    imageUrl: data.imageUrl || '',
    relatedProductId: data.relatedProductId || null,
    relatedProductName: data.relatedProductName || null,
    relatedProductSlug: data.relatedProductSlug || null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    isPinned: Boolean(data.isPinned),
    isPublished: Boolean(data.isPublished),
    publishedDate: data.publishedDate ? Timestamp.fromDate(new Date(data.publishedDate)) : null,
    seoTitle: (data.seoTitle || '').trim(),
    seoDescription: (data.seoDescription || '').trim(),
  };
}

// ─── Engagement helpers ──────────────────────────────────────────────────────

/**
 * Update a single engagement counter for any feed item.
 * Blog items → feedEngagement collection (never touches blogs collection).
 * Feed items → feedPosts document directly.
 */
async function updateEngagementCount(feedId, source, field, delta) {
  try {
    if (source === 'blog') {
      const engRef = doc(db, FEED_ENGAGEMENT, feedId);
      const snap = await getDoc(engRef);
      if (snap.exists()) {
        await updateDoc(engRef, { [field]: increment(delta) });
      } else {
        // Create the engagement doc with safe defaults
        const initial = { likeCount: 0, commentCount: 0, shareCount: 0 };
        initial[field] = Math.max(0, delta);
        await setDoc(engRef, initial);
      }
    } else {
      await updateDoc(doc(db, FEED_POSTS, feedId), { [field]: increment(delta) });
    }
  } catch (err) {
    console.warn(`updateEngagementCount(${feedId}, ${field}, ${delta}):`, err);
  }
}

// ─── Reactions (Likes) ────────────────────────────────────────────────────────

/**
 * Toggle a like for the current visitor on a unified feed item.
 * source='blog'  → stores reaction in feedReactions, count in feedEngagement
 * source='feed'  → stores reaction in feedReactions, count in feedPosts doc
 * @returns {{ liked: boolean }}
 */
export async function toggleLike(feedId, source = 'feed') {
  const visitorId = getVisitorId();
  const reactionId = `${feedId}_${visitorId}`;
  const reactionRef = doc(db, FEED_REACTIONS, reactionId);

  const existing = await getDoc(reactionRef);
  if (existing.exists()) {
    // Unlike
    await deleteDoc(reactionRef);
    await updateEngagementCount(feedId, source, 'likeCount', -1);
    return { liked: false };
  } else {
    // Like
    await setDoc(reactionRef, {
      postId: feedId,
      visitorId,
      reactionType: 'like',
      createdDate: serverTimestamp(),
    });
    await updateEngagementCount(feedId, source, 'likeCount', 1);
    return { liked: true };
  }
}

/**
 * Check if the current visitor has liked a post.
 */
export async function checkLiked(postId) {
  const visitorId = getVisitorId();
  const reactionId = `${postId}_${visitorId}`;
  const snap = await getDoc(doc(db, FEED_REACTIONS, reactionId));
  return snap.exists();
}

/**
 * Batch-check which posts the visitor has liked.
 * @param {string[]} postIds
 * @returns {Set<string>} Set of liked post IDs
 */
export async function checkLikedBatch(postIds) {
  const visitorId = getVisitorId();
  const liked = new Set();
  // Firestore doesn't support batch getDoc so we do parallel gets
  const checks = postIds.map(async (pid) => {
    const snap = await getDoc(doc(db, FEED_REACTIONS, `${pid}_${visitorId}`));
    if (snap.exists()) liked.add(pid);
  });
  await Promise.all(checks);
  return liked;
}

// ─── Comments ─────────────────────────────────────────────────────────────────

/**
 * Submit a comment for any feed item. Status defaults to 'pending'.
 * @param {string} feedId - The item’s feedId
 * @param {'feed'|'blog'} source
 */
export async function submitComment(feedId, source = 'feed', { name, email, comment }) {
  const visitorId = getVisitorId();
  await addDoc(collection(db, FEED_COMMENTS), {
    postId: feedId,
    visitorId,
    name: (name || '').trim().slice(0, 100),
    email: (email || '').trim().toLowerCase().slice(0, 200),
    comment: (comment || '').trim().slice(0, 2000),
    status: 'pending',
    createdDate: serverTimestamp(),
  });
  await updateEngagementCount(feedId, source, 'commentCount', 1);
}

/**
 * Fetch approved comments for a post.
 */
export async function fetchApprovedComments(postId) {
  try {
    const q = query(
      collection(db, FEED_COMMENTS),
      where('postId', '==', postId),
      where('status', '==', 'approved'),
      orderBy('createdDate', 'asc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data(), createdDate: toDate(d.data().createdDate) }));
  } catch (err) {
    console.error('fetchApprovedComments error:', err);
    return [];
  }
}

/**
 * Fetch ALL comments for admin.
 */
export async function fetchAllCommentsAdmin(postId = null) {
  try {
    const clauses = [orderBy('createdDate', 'desc')];
    if (postId) clauses.unshift(where('postId', '==', postId));
    const q = query(collection(db, FEED_COMMENTS), ...clauses);
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data(), createdDate: toDate(d.data().createdDate) }));
  } catch (err) {
    console.error('fetchAllCommentsAdmin error:', err);
    throw err;
  }
}

export async function updateCommentStatus(commentId, status) {
  await updateDoc(doc(db, FEED_COMMENTS, commentId), { status });
}

export async function deleteComment(commentId) {
  await deleteDoc(doc(db, FEED_COMMENTS, commentId));
}

// ─── Share count ──────────────────────────────────────────────────────────────

export async function recordShare(feedId, source = 'feed') {
  try {
    await updateEngagementCount(feedId, source, 'shareCount', 1);
  } catch { /* non-critical */ }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (value.seconds !== undefined) return new Date(value.seconds * 1000);
  return new Date(value);
}

export { FEED_POSTS, FEED_COMMENTS, FEED_REACTIONS, FEED_ENGAGEMENT };
