import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { initializeApp, cert, getApps, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(projectRoot, 'public', 'sitemap.xml');

const BASE_URL = process.env.SITE_URL || 'https://www.solidevelectrosoft.com';
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_ROUTES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services', changefreq: 'monthly', priority: '0.9' },
  { loc: '/services/web-development', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services/mobile-app-development', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services/ai-solutions', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services/mvp-development', changefreq: 'monthly', priority: '0.8' },
  { loc: '/web-development', changefreq: 'monthly', priority: '0.7' },
  { loc: '/mobile-app-development', changefreq: 'monthly', priority: '0.7' },
  { loc: '/ai-ml-solutions', changefreq: 'monthly', priority: '0.7' },
  { loc: '/startup-mvp', changefreq: 'monthly', priority: '0.7' },
  { loc: '/products', changefreq: 'weekly', priority: '0.8' },
  { loc: '/portfolio', changefreq: 'weekly', priority: '0.8' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.7' },
  { loc: '/faq', changefreq: 'monthly', priority: '0.6' },
];

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizePath(routePath) {
  if (!routePath || routePath === '/') return '/';
  return routePath.startsWith('/') ? routePath : `/${routePath}`;
}

function toIsoDate(value) {
  if (!value) return TODAY;

  if (typeof value.toDate === 'function') {
    return value.toDate().toISOString().split('T')[0];
  }

  if (value.seconds) {
    return new Date(value.seconds * 1000).toISOString().split('T')[0];
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return TODAY;
  return parsed.toISOString().split('T')[0];
}

async function initFirestoreAdmin() {
  if (getApps().length > 0) {
    return getFirestore();
  }

  const explicitPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const defaultServiceAccountPath = path.join(projectRoot, 'solidev-electrosoft-firebase-adminsdk-fbsvc-77d1ebcbc5.json');

  try {
    if (explicitPath && existsSync(explicitPath)) {
      const raw = await fs.readFile(explicitPath, 'utf8');
      const serviceAccount = JSON.parse(raw);
      initializeApp({ credential: cert(serviceAccount) });
      return getFirestore();
    }

    if (existsSync(defaultServiceAccountPath)) {
      const raw = await fs.readFile(defaultServiceAccountPath, 'utf8');
      const serviceAccount = JSON.parse(raw);
      initializeApp({ credential: cert(serviceAccount) });
      return getFirestore();
    }

    // Supports CI environments with GOOGLE_APPLICATION_CREDENTIALS or workload identity.
    initializeApp({ credential: applicationDefault() });
    return getFirestore();
  } catch (error) {
    console.warn('[sitemap] Firestore admin initialization failed, generating static sitemap only.');
    console.warn(`[sitemap] ${error.message}`);
    return null;
  }
}

async function getDynamicUrls(db) {
  if (!db) {
    return [];
  }

  const dynamic = [];
  const now = Date.now();

  try {
    const blogsSnap = await db.collection('blogs').where('status', '==', 'Published').get();
    blogsSnap.forEach((doc) => {
      const data = doc.data();
      if (data.isDeleted === true || !data.slug) return;
      const publishMs = data.publishDate?.seconds ? data.publishDate.seconds * 1000 : new Date(data.publishDate || 0).getTime();
      if (!publishMs || publishMs > now) return;
      dynamic.push({
        loc: `/blog/${data.slug}`,
        lastmod: toIsoDate(data.updatedAt || data.publishDate),
        changefreq: 'monthly',
        priority: '0.7',
      });
    });
  } catch (error) {
    console.warn(`[sitemap] blogs fetch skipped: ${error.message}`);
  }

  try {
    const productsSnap = await db.collection('products').get();
    productsSnap.forEach((doc) => {
      const data = doc.data();
      if (data.status === 'archived') return;
      dynamic.push({
        loc: `/product/${data.slug || doc.id}`,
        lastmod: toIsoDate(data.updatedAt || data.createdAt),
        changefreq: 'monthly',
        priority: '0.6',
      });
    });
  } catch (error) {
    console.warn(`[sitemap] products fetch skipped: ${error.message}`);
  }

  try {
    const portfolioSnap = await db.collection('portfolios').get();
    portfolioSnap.forEach((doc) => {
      const data = doc.data();
      const status = String(data.status || '').toLowerCase();
      if (status && !['completed', 'in progress', 'in-progress'].includes(status)) return;
      dynamic.push({
        loc: `/portfolio/${data.slug || doc.id}`,
        lastmod: toIsoDate(data.updatedAt || data.createdAt),
        changefreq: 'monthly',
        priority: '0.6',
      });
    });
  } catch (error) {
    console.warn(`[sitemap] portfolios fetch skipped: ${error.message}`);
  }

  return dynamic;
}

function buildXml(urls) {
  const unique = new Map();
  urls.forEach((entry) => {
    const route = normalizePath(entry.loc);
    unique.set(route, {
      loc: route,
      lastmod: entry.lastmod || TODAY,
      changefreq: entry.changefreq || 'monthly',
      priority: entry.priority || '0.6',
    });
  });

  const entries = [...unique.values()]
    .sort((a, b) => a.loc.localeCompare(b.loc))
    .map((entry) => {
      return [
        '  <url>',
        `    <loc>${xmlEscape(`${BASE_URL}${entry.loc}`)}</loc>`,
        `    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>`,
        `    <changefreq>${xmlEscape(entry.changefreq)}</changefreq>`,
        `    <priority>${xmlEscape(entry.priority)}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    '',
    entries,
    '',
    '</urlset>',
    '',
  ].join('\n');
}

async function main() {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    ...route,
    lastmod: TODAY,
  }));

  const db = await initFirestoreAdmin();
  const dynamicEntries = await getDynamicUrls(db);
  const xml = buildXml([...staticEntries, ...dynamicEntries]);

  await fs.writeFile(outputPath, xml, 'utf8');
  console.log(`[sitemap] Generated ${outputPath} with ${staticEntries.length + dynamicEntries.length} entries.`);
}

main().catch((error) => {
  console.error('[sitemap] generation failed:', error);
  process.exitCode = 0;
});
