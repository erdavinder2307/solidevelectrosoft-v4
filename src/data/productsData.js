/**
 * Products Data (fallback)
 * Shown only when the Firestore `products` collection cannot be loaded.
 * Keep it in line with the live products in the admin (title, short description, status, links).
 * No icons or screenshots here: the cards show their built-in placeholder instead of broken images.
 */

const productsData = [
  {
    id: 'solidev-store',
    slug: 'solidev-store',
    name: 'Solidev Store',
    description: 'An independent app marketplace that makes discovering and installing apps simple, transparent and reliable.',
    platform: ['Web', 'Mobile'],
    status: 'LIVE',
    screenshots: [],
    links: {
      websiteUrl: 'https://www.solidev.store/',
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#3b82f6',
    featured: false,
  },
  {
    id: 'adopals',
    slug: 'adopals-pet-adoption-platform',
    name: 'Adopals – Pet Adoption & Relocation Platform',
    description: 'A pet adoption platform that connects caring pet parents with pets that need a loving home.',
    platform: ['Web'],
    status: 'LIVE',
    screenshots: [],
    links: {
      websiteUrl: 'https://adopals.com/',
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#f59e0b',
    featured: false,
  },
  {
    id: 'solidtrack',
    slug: 'solid-track-app',
    name: 'SolidTrack',
    description: 'Log your lifts, scan your food, get an AI coach. A workout tracker for people who lift.',
    platform: ['Mobile'],
    status: 'LIVE',
    screenshots: [],
    links: {
      websiteUrl: null,
      appStoreUrl: 'https://apps.apple.com/app/solid-track-app/id6751640011',
      playStoreUrl: null,
    },
    color: '#ef4444',
    featured: true,
  },
  {
    id: 'mindset-fuel',
    slug: 'mindset-fuel',
    name: 'Mindset Fuel',
    description: 'An AI-powered motivation app that builds confidence, focus and resilience with personalised quotes and wallpapers.',
    platform: ['Mobile', 'Web'],
    status: 'LIVE',
    screenshots: [],
    links: {
      websiteUrl: null,
      appStoreUrl: 'https://apps.apple.com/app/mindset-fuel/id6757799330',
      playStoreUrl: null,
    },
    color: '#ec4899',
    featured: false,
  },
  {
    id: 'solidev-books',
    slug: 'solidev-books',
    name: 'Solidev Books',
    description: 'A workflow-driven financial operating system that helps businesses run their finances through connected workflows.',
    platform: ['Web'],
    status: 'LIVE',
    screenshots: [],
    links: {
      websiteUrl: 'https://www.solidevbooks.com/',
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#3b82f6',
    featured: false,
  },
  {
    id: 'decidemate-pro',
    slug: 'decidemate-pro',
    name: 'Decidemate Pro',
    description: 'Take the guesswork out of your day: spin for quick decisions and see your insights and history.',
    platform: ['Mobile'],
    status: 'LIVE',
    screenshots: [],
    links: {
      websiteUrl: null,
      appStoreUrl: 'https://apps.apple.com/app/decidemate-pro/id6738579894',
      playStoreUrl: null,
    },
    color: '#06b6d4',
    featured: true,
  },
  {
    id: 'solidcare',
    slug: 'solidcare',
    name: 'Solidcare - Healthcare',
    description: 'Healthcare management for clinics and patients: appointments, records and follow-ups in one place.',
    platform: ['Web', 'Mobile'],
    status: 'LIVE',
    screenshots: [],
    links: {
      websiteUrl: 'https://solidcare.org/',
      appStoreUrl: 'https://apps.apple.com/app/solidcare-healthcare/id6473382556',
      playStoreUrl: null,
    },
    color: '#10b981',
    featured: true,
  },
  {
    id: 'protech-wallet',
    slug: 'protech-wallet',
    name: 'ProTech Wallet',
    description: 'A simple, secure personal bookkeeping app to understand and control your money.',
    platform: ['Mobile'],
    status: 'IN PROGRESS',
    screenshots: [],
    links: {
      websiteUrl: null,
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#8b5cf6',
    featured: false,
  },
];

// Helper functions
export const getProductById = (id) => productsData.find(p => p.id === id);
export const getLiveProducts = () => productsData.filter(p => p.status === 'LIVE');
export const getInProgressProducts = () => productsData.filter(p => p.status === 'IN PROGRESS');
export const getFeaturedProducts = () => productsData.filter(p => p.featured);
export const getProductsByPlatform = (platform) => productsData.filter(p => p.platform.includes(platform));

export default productsData;
