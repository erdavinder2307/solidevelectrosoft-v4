#!/usr/bin/env node

/**
 * Firestore Data Migration Script
 * One-time script to migrate hardcoded products and portfolios to Firestore
 * 
 * Usage: npm run migrate
 * 
 * Before running:
 * 1. Set up your Firebase credentials (ensure .env.local has VITE_FIREBASE_* vars)
 * 2. Create a Firebase admin user if not already done
 * 3. Back up any existing Firestore data
 * 
 * This script will:
 * - Read hardcoded products from src/data/productsData.js
 * - Read hardcoded portfolios from src/pages/ModernPortfolio.jsx
 * - Batch write them to Firestore collections
 * - Add timestamps and formatting as needed
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin SDK
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
  join(__dirname, '../solidev-electrosoft-firebase-adminsdk-fbsvc-77d1ebcbc5.json');

if (!existsSync(serviceAccountPath)) {
  console.error('❌ Firebase service account file not found!');
  console.error(`   Expected at: ${serviceAccountPath}`);
  console.error('\nTo set up migration:');
  console.error('1. Download service account JSON from Firebase Console');
  console.error('2. Save it as solidev-electrosoft-firebase-adminsdk-fbsvc-77d1ebcbc5.json in the root directory');
  console.error('3. Or set FIREBASE_SERVICE_ACCOUNT_PATH env var');
  process.exit(1);
}

try {
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK:');
  console.error(error.message);
  process.exit(1);
}

const db = admin.firestore();

// Hardcoded Products Data
const productsData = [
  {
    id: 'solidcare',
    title: 'Solidcare',
    description: 'Complete Electronic Healthcare Record System',
    category: 'Healthcare',
    image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/product/solidcare.png',
    features: [
      'Patient Management',
      'Electronic Health Records',
      'Appointment Scheduling',
      'Medical History Tracking',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Azure'],
    status: 'active',
    featured: true,
  },
  {
    id: 'smart-invoice-pro',
    title: 'Smart Invoice Pro',
    description: 'Manage Inventory and Generate Invoices',
    category: 'Business Tools',
    image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/product/smart-invoice.png',
    features: [
      'Inventory Management',
      'Invoice Generation',
      'Payment Tracking',
      'Multi-User Support',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    status: 'active',
    featured: false,
  },
  {
    id: 'adopals',
    title: 'AdoPals',
    description: 'Adopt pets and gain knowledge about them',
    category: 'Mobile App',
    image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/product/adopals.png',
    features: [
      'Pet Adoption Marketplace',
      'Animal Care Guides',
      'User Profiles',
      'Messaging System',
    ],
    technologies: ['React Native', 'Firebase', 'Firestore'],
    status: 'active',
    featured: false,
  },
  {
    id: 'protech-wallet',
    title: 'ProTech Wallet',
    description: 'Manage expenses and incomes with a simple app',
    category: 'Finance',
    image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/product/wallet.png',
    features: [
      'Expense Tracking',
      'Income Management',
      'Budget Planning',
      'Reports & Analytics',
    ],
    technologies: ['Flutter', 'Firebase', 'Chart.js'],
    status: 'active',
    featured: false,
  },
  {
    id: 'mindset-fuel',
    title: 'Mindset Fuel',
    description: 'Stay motivated with daily AI-based quotes',
    category: 'Wellness',
    image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/product/mindset.png',
    features: [
      'Daily Quotes',
      'AI-Powered Content',
      'User Preferences',
      'Share & Save',
    ],
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    status: 'active',
    featured: true,
  },
  {
    id: 'decidemate-pro',
    title: 'Decidemate Pro',
    description: 'Make smarter decisions with Quick Spin, Insights, and History',
    category: 'Decision Making',
    image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/product/decidemate.png',
    features: [
      'Decision Spinner',
      'Decision History',
      'Insights & Analytics',
      'Offline Support',
    ],
    technologies: ['Swift', 'Objective-C', 'Core Data'],
    status: 'active',
    featured: true,
  },
  {
    id: 'solidtrack',
    title: 'SolidTrack',
    description: 'Complete workout tracking app with food log, meditation features',
    category: 'Fitness',
    image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/product/solidtrack.png',
    features: [
      'Workout Tracking',
      'Food Logging',
      'Meditation Sessions',
      'Progress Analytics',
      'Social Challenges',
    ],
    technologies: ['Swift', 'HealthKit', 'Core Motion'],
    status: 'active',
    featured: true,
  },
  {
    id: 'solid-apps',
    title: 'Solid Apps',
    description: 'Discover all our apps and products in one place',
    category: 'Platform',
    image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/product/solid-apps.png',
    features: [
      'App Directory',
      'Easy Discovery',
      'User Reviews',
      'Download Management',
    ],
    technologies: ['Next.js', 'React', 'Node.js'],
    status: 'active',
    featured: false,
  },
];

// Hardcoded Portfolios Data
const portfoliosData = [
  {
    projectName: 'Core360',
    client: 'Dracra Technologies',
    description: 'Enterprise-grade web application built with modern technologies for streamlined business operations and workflow automation.',
    category: 'Web Application',
    images: ['https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Dracra-tech.webp'],
    thumbnailUrl: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Dracra-tech.webp',
    technologies: ['React', '.NET Core', 'SQL Server', 'Azure'],
    projectUrl: 'https://core360.example.com',
    duration: '6 months',
    teamSize: 5,
    featured: true,
    status: 'completed',
  },
  {
    projectName: 'Briind',
    client: 'Briind Inc.',
    description: 'Social networking application connecting communities and enabling meaningful interactions with real-time messaging.',
    category: 'Social Platform',
    images: ['https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/brind.webp'],
    thumbnailUrl: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/brind.webp',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
    projectUrl: 'https://briind.app',
    duration: '8 months',
    teamSize: 6,
    featured: true,
    status: 'completed',
  },
  {
    projectName: 'Fairway First',
    client: 'Fairway IMC',
    description: 'Mobile application for Fairway Independent Mortgage Corporation with seamless user experience and secure transactions.',
    category: 'Mobile Application',
    images: ['https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/fairway.webp'],
    thumbnailUrl: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/fairway.webp',
    technologies: ['iOS', 'Android', 'Swift', 'Kotlin'],
    projectUrl: 'https://apps.apple.com/app/fairway-first',
    duration: '5 months',
    teamSize: 4,
    featured: true,
    status: 'completed',
  },
  {
    projectName: 'Lexis Convey',
    client: 'LexisNexis',
    description: 'Legal conveyancing platform for LexisNexis, streamlining property transactions and document management.',
    category: 'Legal Tech',
    images: ['https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Lexisnexis.webp'],
    thumbnailUrl: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Lexisnexis.webp',
    technologies: ['.NET', 'Angular', 'Azure', 'SQL Server'],
    projectUrl: 'https://lexisconvey.example.com',
    duration: '7 months',
    teamSize: 5,
    featured: true,
    status: 'completed',
  },
  {
    projectName: 'E-Commerce Platform',
    client: 'Retail Client',
    description: 'Full-featured e-commerce solution with inventory management, payment processing, and analytics dashboard.',
    category: 'E-Commerce',
    images: ['https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-1-v2.webp'],
    thumbnailUrl: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-1-v2.webp',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    projectUrl: 'https://ecommerce.example.com',
    duration: '4 months',
    teamSize: 3,
    featured: false,
    status: 'completed',
  },
  {
    projectName: 'Healthcare Portal',
    client: 'Healthcare Provider',
    description: 'Patient management system with appointment scheduling, telemedicine, and electronic health records.',
    category: 'Healthcare',
    images: ['https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-2-v2.webp'],
    thumbnailUrl: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-2-v2.webp',
    technologies: ['React', '.NET Core', 'Azure', 'HIPAA Compliant'],
    projectUrl: 'https://healthcare.example.com',
    duration: '9 months',
    teamSize: 7,
    featured: false,
    status: 'completed',
  },
  {
    projectName: 'AI Customer Support',
    client: 'Tech Startup',
    description: 'Intelligent chatbot powered by natural language processing for automated customer support.',
    category: 'AI/ML Solution',
    images: ['https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-3-v2.webp'],
    thumbnailUrl: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-3-v2.webp',
    technologies: ['Python', 'TensorFlow', 'Azure Bot Service', 'NLP'],
    projectUrl: 'https://chatbot.example.com',
    duration: '3 months',
    teamSize: 2,
    featured: false,
    status: 'completed',
  },
  {
    projectName: 'FinTech Dashboard',
    client: 'Financial Services Inc.',
    description: 'Real-time financial analytics dashboard with trading capabilities and portfolio management.',
    category: 'Financial Services',
    images: ['https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-4-v2.webp'],
    thumbnailUrl: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-4-v2.webp',
    technologies: ['Vue.js', 'Node.js', 'WebSocket', 'PostgreSQL'],
    projectUrl: 'https://fintech.example.com',
    duration: '6 months',
    teamSize: 4,
    featured: false,
    status: 'completed',
  },
];

/**
 * Migrate products to Firestore
 */
async function migrateProducts() {
  console.log('\n📦 Migrating Products...');
  const batch = db.batch();
  let count = 0;

  for (const product of productsData) {
    const docRef = db.collection('products').doc(product.id);
    batch.set(docRef, {
      title: product.title,
      description: product.description,
      category: product.category,
      image: product.image,
      features: product.features || [],
      technologies: product.technologies || [],
      status: product.status || 'active',
      featured: product.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    count++;
  }

  try {
    await batch.commit();
    console.log(`✅ Successfully migrated ${count} products to Firestore`);
    return count;
  } catch (error) {
    console.error('❌ Error migrating products:', error);
    throw error;
  }
}

/**
 * Migrate portfolios to Firestore
 */
async function migratePortfolios() {
  console.log('\n💼 Migrating Portfolios...');
  const batch = db.batch();
  let count = 0;

  for (const portfolio of portfoliosData) {
    const docRef = db.collection('portfolios').doc();
    batch.set(docRef, {
      projectName: portfolio.projectName,
      client: portfolio.client,
      description: portfolio.description,
      category: portfolio.category,
      images: portfolio.images || [],
      thumbnailUrl: portfolio.thumbnailUrl || '',
      technologies: portfolio.technologies || [],
      projectUrl: portfolio.projectUrl || '',
      duration: portfolio.duration || '',
      teamSize: portfolio.teamSize || 1,
      featured: portfolio.featured || false,
      status: portfolio.status || 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    count++;
  }

  try {
    await batch.commit();
    console.log(`✅ Successfully migrated ${count} portfolios to Firestore`);
    return count;
  } catch (error) {
    console.error('❌ Error migrating portfolios:', error);
    throw error;
  }
}

/**
 * Main migration function
 */
async function runMigration() {
  console.log('\n🚀 Starting Firestore Data Migration');
  console.log('=' .repeat(50));

  try {
    const productCount = await migrateProducts();
    const portfolioCount = await migratePortfolios();

    console.log('\n' + '=' .repeat(50));
    console.log('\n✨ Migration completed successfully!');
    console.log(`   - Products: ${productCount}`);
    console.log(`   - Portfolios: ${portfolioCount}`);
    console.log(`   - Total documents: ${productCount + portfolioCount}`);

    console.log('\n📋 Next steps:');
    console.log('1. Verify data in Firebase Console');
    console.log('2. Update public pages to query from Firestore');
    console.log('3. Deploy security rules');
    console.log('4. Test the admin panel and public pages');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
runMigration();
