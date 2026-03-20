/**
 * Global Search Service
 * Searches across blogs (Firebase), portfolios (Firebase),
 * products (static data), and pages (static list).
 */

import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import productsData from '../data/productsData';

// ─── Static Pages ─────────────────────────────────────────────────────────────
const STATIC_PAGES = [
  {
    id: 'home',
    type: 'page',
    title: 'Home',
    description: 'Solidev Electrosoft – Software development company specialising in web, mobile and AI solutions.',
    slug: '',
    url: '/',
    tags: ['home', 'solidev', 'software'],
    date: null,
  },
  {
    id: 'about',
    type: 'page',
    title: 'About Us',
    description: 'Learn about Solidev Electrosoft, our team, mission and story.',
    slug: 'about',
    url: '/about',
    tags: ['about', 'team', 'mission'],
    date: null,
  },
  {
    id: 'services',
    type: 'page',
    title: 'Services',
    description: 'Web app development, mobile apps, AI-powered solutions and MVP development services.',
    slug: 'services',
    url: '/services',
    tags: ['services', 'web', 'mobile', 'ai'],
    date: null,
  },
  {
    id: 'services-web',
    type: 'page',
    title: 'Web App Development',
    description: 'Custom web application development using modern frameworks and cloud infrastructure.',
    slug: 'services/web-development',
    url: '/services/web-development',
    tags: ['web', 'react', 'development'],
    date: null,
  },
  {
    id: 'services-mobile',
    type: 'page',
    title: 'Mobile App Development',
    description: 'Cross-platform and native mobile applications for iOS and Android.',
    slug: 'services/mobile-app-development',
    url: '/services/mobile-app-development',
    tags: ['mobile', 'ios', 'android', 'react native'],
    date: null,
  },
  {
    id: 'services-ai',
    type: 'page',
    title: 'AI-Powered Solutions',
    description: 'Integrate artificial intelligence and machine learning into your products.',
    slug: 'services/ai-solutions',
    url: '/services/ai-solutions',
    tags: ['ai', 'ml', 'machine learning', 'automation'],
    date: null,
  },
  {
    id: 'services-mvp',
    type: 'page',
    title: 'MVP Development',
    description: 'Rapid prototyping and MVP development for startups and new product ideas.',
    slug: 'services/mvp-development',
    url: '/services/mvp-development',
    tags: ['mvp', 'startup', 'prototype'],
    date: null,
  },
  {
    id: 'contact',
    type: 'page',
    title: 'Contact Us',
    description: 'Get in touch with Solidev Electrosoft for inquiries, projects or support.',
    slug: 'contact',
    url: '/contact',
    tags: ['contact', 'support', 'inquiry'],
    date: null,
  },
  {
    id: 'portfolio',
    type: 'page',
    title: 'Portfolio',
    description: 'Browse our portfolio of completed projects across industries.',
    slug: 'portfolio',
    url: '/portfolio',
    tags: ['portfolio', 'projects', 'case studies'],
    date: null,
  },
  {
    id: 'faq',
    type: 'page',
    title: 'FAQ',
    description: 'Frequently asked questions about our services, process and pricing.',
    slug: 'faq',
    url: '/faq',
    tags: ['faq', 'questions', 'pricing'],
    date: null,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normaliseText(str = '') {
  return str.toLowerCase().trim();
}

/**
 * Scores a candidate string against the query tokens.
 * Returns a number 0–100 (higher = more relevant).
 */
function scoreMatch(text = '', tokens = []) {
  const lower = normaliseText(text);
  let score = 0;
  for (const token of tokens) {
    if (lower.includes(token)) score += token.length > 3 ? 20 : 10;
  }
  return score;
}

function computeRelevance(item, tokens) {
  const titleScore = scoreMatch(item.title, tokens) * 3;
  const descScore = scoreMatch(item.description, tokens) * 1.5;
  const tagScore = (item.tags || []).reduce(
    (acc, tag) => acc + scoreMatch(tag, tokens) * 2,
    0
  );
  return titleScore + descScore + tagScore;
}

// ─── Firebase Fetchers ────────────────────────────────────────────────────────

async function fetchBlogs() {
  try {
    const now = new Date();
    const q = query(
      collection(db, 'blogs'),
      where('status', '==', 'Published'),
      orderBy('publishDate', 'desc'),
      limit(100)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((b) => {
        if (b.isDeleted) return false;
        if (!b.publishDate) return false;
        const pd = b.publishDate.seconds
          ? new Date(b.publishDate.seconds * 1000)
          : new Date(b.publishDate);
        return pd <= now;
      })
      .map((b) => ({
        id: b.id,
        type: 'blog',
        title: b.title || 'Untitled',
        description: b.excerpt || b.summary || '',
        slug: b.slug || b.id,
        url: `/blog/${b.slug || b.id}`,
        tags: b.tags || [],
        date: b.publishDate
          ? b.publishDate.seconds
            ? new Date(b.publishDate.seconds * 1000).toISOString()
            : b.publishDate
          : null,
        image: b.coverImage || b.featuredImage || null,
      }));
  } catch (err) {
    console.error('[searchService] Failed to fetch blogs:', err);
    return [];
  }
}

async function fetchPortfolios() {
  try {
    const q = query(
      collection(db, 'portfolios'),
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const p = { id: d.id, ...d.data() };
      return {
        id: p.id,
        type: 'portfolio',
        title: p.title || p.name || 'Untitled',
        description: p.description || p.shortDescription || '',
        slug: p.slug || p.id,
        url: `/portfolio/${p.id}`,
        tags: p.tags || p.technologies || [],
        date: p.createdAt
          ? p.createdAt.seconds
            ? new Date(p.createdAt.seconds * 1000).toISOString()
            : p.createdAt
          : null,
        image: p.image || p.thumbnail || null,
      };
    });
  } catch (err) {
    console.error('[searchService] Failed to fetch portfolios:', err);
    return [];
  }
}

function getProducts() {
  return productsData.map((p) => ({
    id: p.id,
    type: 'product',
    title: p.name,
    description: p.description || '',
    slug: p.id,
    url: `/product/${p.id}`,
    tags: p.platform || [],
    date: null,
    image: p.icon || null,
    status: p.status || null,
  }));
}

// ─── Cache ────────────────────────────────────────────────────────────────────
// Cache Firebase results for 5 minutes to avoid repeated reads during a session.
let _cache = null;
let _cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

async function getAllItems() {
  if (_cache && Date.now() - _cacheTime < CACHE_TTL) return _cache;
  const [blogs, portfolios] = await Promise.all([fetchBlogs(), fetchPortfolios()]);
  _cache = [
    ...blogs,
    ...portfolios,
    ...getProducts(),
    ...STATIC_PAGES,
  ];
  _cacheTime = Date.now();
  return _cache;
}

/** Invalidate cache (call after admin mutations) */
export function invalidateSearchCache() {
  _cache = null;
  _cacheTime = 0;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Search across all content types.
 *
 * @param {string} rawQuery
 * @param {{ types?: string[], tags?: string[], dateFrom?: string, dateTo?: string }} filters
 * @returns {Promise<{
 *   all: SearchResult[],
 *   topResult: SearchResult | null,
 *   byType: Record<string, SearchResult[]>,
 *   allTags: string[],
 * }>}
 */
export async function search(rawQuery, filters = {}) {
  const q = normaliseText(rawQuery);
  if (q.length < 2) {
    return { all: [], topResult: null, byType: {}, allTags: [] };
  }

  const tokens = q.split(/\s+/).filter(Boolean);
  const allItems = await getAllItems();

  // Score and filter
  let results = allItems
    .map((item) => ({ ...item, _score: computeRelevance(item, tokens) }))
    .filter((item) => item._score > 0);

  // Type filter
  if (filters.types && filters.types.length > 0) {
    results = results.filter((r) => filters.types.includes(r.type));
  }

  // Tag filter
  if (filters.tags && filters.tags.length > 0) {
    results = results.filter((r) =>
      filters.tags.some((ft) =>
        (r.tags || []).some((t) => normaliseText(t).includes(normaliseText(ft)))
      )
    );
  }

  // Date filter
  if (filters.dateFrom) {
    const from = new Date(filters.dateFrom);
    results = results.filter((r) => {
      if (!r.date) return false;
      return new Date(r.date) >= from;
    });
  }
  if (filters.dateTo) {
    const to = new Date(filters.dateTo);
    results = results.filter((r) => {
      if (!r.date) return false;
      return new Date(r.date) <= to;
    });
  }

  // Sort by score descending
  results.sort((a, b) => b._score - a._score);

  // Collect all unique tags from results for filter panel
  const tagSet = new Set();
  results.forEach((r) => (r.tags || []).forEach((t) => tagSet.add(t)));
  const allTags = [...tagSet].sort();

  // Group by type
  const byType = results.reduce((acc, r) => {
    if (!acc[r.type]) acc[r.type] = [];
    acc[r.type].push(r);
    return acc;
  }, {});

  return {
    all: results,
    topResult: results[0] || null,
    byType,
    allTags,
  };
}
