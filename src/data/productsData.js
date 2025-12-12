/**
 * Products Data
 * Contains all Solidev Electrosoft products with their details
 * 
 * TODO: Replace placeholder screenshots with actual product images
 * TODO: Replace placeholder icons with actual product icons
 * TODO: Update links when products go live
 */

const productsData = [
  {
    id: 'solidcare',
    name: 'Solidcare',
    description: 'Complete Electronic Healthcare Record System',
    platform: ['Web', 'Mobile'],
    status: 'LIVE',
    icon: '/src/assets/products/solidcare/icon.png', // TODO: Add actual icon
    screenshots: [
      '/src/assets/products/solidcare/screenshot-1.png', // TODO: Replace with actual
      '/src/assets/products/solidcare/screenshot-2.png', // TODO: Replace with actual
      '/src/assets/products/solidcare/screenshot-3.png', // TODO: Replace with actual
    ],
    links: {
      websiteUrl: 'https://solidcare.org/',
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#10b981', // Green for healthcare
    featured: true,
  },
  {
    id: 'smart-invoice-pro',
    name: 'Smart Invoice Pro',
    description: 'Manage Inventory and Generate Invoices',
    platform: ['Web', 'Mobile'],
    status: 'IN PROGRESS',
    icon: '/src/assets/products/smart-invoice-pro/icon.png', // TODO: Add actual icon
    screenshots: [
      '/src/assets/products/smart-invoice-pro/screenshot-1.png', // TODO: Replace with actual
      '/src/assets/products/smart-invoice-pro/screenshot-2.png', // TODO: Replace with actual
      '/src/assets/products/smart-invoice-pro/screenshot-3.png', // TODO: Replace with actual
    ],
    links: {
      websiteUrl: null, // TODO: Add when available
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#3b82f6', // Blue for business
    featured: false,
  },
  {
    id: 'adopals',
    name: 'AdoPals',
    description: 'Adopt pets and gain knowledge about them',
    platform: ['Web', 'Mobile'],
    status: 'LIVE',
    icon: '/src/assets/products/adopals/icon.png', // TODO: Add actual icon
    screenshots: [
      '/src/assets/products/adopals/screenshot-1.png', // TODO: Replace with actual
      '/src/assets/products/adopals/screenshot-2.png', // TODO: Replace with actual
      '/src/assets/products/adopals/screenshot-3.png', // TODO: Replace with actual
    ],
    links: {
      websiteUrl: null, // TODO: Add when available
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#f59e0b', // Orange for pets
    featured: false,
  },
  {
    id: 'protech-wallet',
    name: 'ProTech Wallet',
    description: 'Manage expenses and incomes with a simple app',
    platform: ['Mobile', 'Web'],
    status: 'IN PROGRESS',
    icon: '/src/assets/products/protech-wallet/icon.png', // TODO: Add actual icon
    screenshots: [
      '/src/assets/products/protech-wallet/screenshot-1.png', // TODO: Replace with actual
      '/src/assets/products/protech-wallet/screenshot-2.png', // TODO: Replace with actual
      '/src/assets/products/protech-wallet/screenshot-3.png', // TODO: Replace with actual
    ],
    links: {
      websiteUrl: null, // TODO: Add when available
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#8b5cf6', // Purple for finance
    featured: false,
  },
  {
    id: 'mindset-fuel-mobile',
    name: 'Mindset Fuel',
    description: 'Stay motivated with daily AI-based quotes in mobile',
    platform: ['Mobile', 'Web'],
    status: 'IN PROGRESS',
    icon: '/src/assets/products/mindset-fuel/icon.png', // TODO: Add actual icon
    screenshots: [
      '/src/assets/products/mindset-fuel/screenshot-1.png', // TODO: Replace with actual
      '/src/assets/products/mindset-fuel/screenshot-2.png', // TODO: Replace with actual
      '/src/assets/products/mindset-fuel/screenshot-3.png', // TODO: Replace with actual
    ],
    links: {
      websiteUrl: null, // TODO: Add when available
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#ec4899', // Pink for motivation
    featured: false,
  },
  {
    id: 'decidemate-pro',
    name: 'Decidemate Pro',
    description: 'Make smarter decisions with Quick Spin, Insights, and History — your ultimate decision-making companion',
    platform: ['Mobile'],
    status: 'LIVE',
    icon: '/src/assets/products/decidemate-pro/icon.png', // TODO: Add actual icon
    screenshots: [
      '/src/assets/products/decidemate-pro/screenshot-1.png', // TODO: Replace with actual
      '/src/assets/products/decidemate-pro/screenshot-2.png', // TODO: Replace with actual
      '/src/assets/products/decidemate-pro/screenshot-3.png', // TODO: Replace with actual
    ],
    links: {
      websiteUrl: null,
      appStoreUrl: 'https://apps.apple.com/app/decidemate-pro', // TODO: Replace with actual App Store link
      playStoreUrl: null,
    },
    color: '#06b6d4', // Cyan for decision
    featured: true,
  },
  {
    id: 'solidtrack',
    name: 'SolidTrack',
    description: 'Complete workout tracking app with food log, meditation features',
    platform: ['Mobile'],
    status: 'LIVE',
    icon: '/src/assets/products/solidtrack/icon.png', // TODO: Add actual icon
    screenshots: [
      '/src/assets/products/solidtrack/screenshot-1.png', // TODO: Replace with actual
      '/src/assets/products/solidtrack/screenshot-2.png', // TODO: Replace with actual
      '/src/assets/products/solidtrack/screenshot-3.png', // TODO: Replace with actual
    ],
    links: {
      websiteUrl: null,
      appStoreUrl: 'https://apps.apple.com/app/solidtrack', // TODO: Replace with actual App Store link
      playStoreUrl: null,
    },
    color: '#ef4444', // Red for fitness
    featured: true,
  },
  {
    id: 'solid-apps',
    name: 'Solid Apps',
    description: 'Discover all our apps and products in one place',
    platform: ['Web'],
    status: 'LIVE',
    icon: '/src/assets/products/solid-apps/icon.png', // TODO: Add actual icon
    screenshots: [
      '/src/assets/products/solid-apps/screenshot-1.png', // TODO: Replace with actual
      '/src/assets/products/solid-apps/screenshot-2.png', // TODO: Replace with actual
      '/src/assets/products/solid-apps/screenshot-3.png', // TODO: Replace with actual
    ],
    links: {
      websiteUrl: 'https://solidevapps.com/',
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#3b82f6', // Blue for brand
    featured: false,
  },
  {
    id: 'mindset-fuel-web',
    name: 'MindsetFuel Web',
    description: 'Stay motivated with daily AI-based quotes - Web version',
    platform: ['Web'],
    status: 'IN PROGRESS',
    icon: '/src/assets/products/mindset-fuel/icon.png', // TODO: Add actual icon (same as mobile)
    screenshots: [
      '/src/assets/products/mindset-fuel-web/screenshot-1.png', // TODO: Replace with actual
      '/src/assets/products/mindset-fuel-web/screenshot-2.png', // TODO: Replace with actual
      '/src/assets/products/mindset-fuel-web/screenshot-3.png', // TODO: Replace with actual
    ],
    links: {
      websiteUrl: null, // TODO: Add when available
      appStoreUrl: null,
      playStoreUrl: null,
    },
    color: '#ec4899', // Pink for motivation (same as mobile)
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
