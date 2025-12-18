#!/usr/bin/env node

/**
 * Debug script to check product data structure
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
  join(__dirname, '../solidev-electrosoft-firebase-adminsdk-fbsvc-77d1ebcbc5.json');

if (!existsSync(serviceAccountPath)) {
  console.error('❌ Firebase service account file not found!');
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

async function debugProducts() {
  try {
    console.log('🔍 Checking product data structure...\n');

    const productsRef = db.collection('products');
    const snapshot = await productsRef.limit(3).get();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      console.log(`Product: ${data.title}`);
      console.log(`  ID: ${doc.id}`);
      console.log(`  Fields: ${Object.keys(data).join(', ')}`);
      console.log(`  logo: ${data.logo ? '✅ exists' : '❌ missing'}`);
      console.log(`  image: ${data.image ? '✅ exists' : '❌ missing'}`);
      console.log(`  screenshots: ${data.screenshots ? `✅ exists (${data.screenshots.length} items)` : '❌ missing'}`);
      console.log();
    }

  } catch (error) {
    console.error('❌ Error:');
    console.error(error.message);
    process.exit(1);
  } finally {
    await admin.app().delete();
  }
}

debugProducts();
