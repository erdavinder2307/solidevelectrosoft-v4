#!/usr/bin/env node

/**
 * Product Logo Migration Script
 * Migrates existing products to include logo field
 * Maps 'image' field to 'logo' field and initializes empty screenshots array
 * 
 * Usage: npm run migrate:logo
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

async function migrateProducts() {
  try {
    console.log('🔄 Starting product logo migration...\n');

    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();

    if (snapshot.empty) {
      console.log('✅ No products found to migrate');
      return;
    }

    let updated = 0;
    let skipped = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();

      // Check if already migrated (has logo or screenshots)
      if (data.logo && data.screenshots) {
        console.log(`⏭️  Skipping ${data.title || 'Unknown'} - already migrated`);
        skipped++;
        continue;
      }

      // Prepare update data
      const updateData = {
        // Map image to logo if logo doesn't exist
        ...(data.image && !data.logo ? { logo: data.image } : {}),
        // Initialize screenshots array if it doesn't exist
        ...(typeof data.screenshots === 'undefined' ? { screenshots: [] } : {}),
        updatedAt: new Date().toISOString(),
      };

      // Update document
      await productsRef.doc(doc.id).update(updateData);
      console.log(`✅ Updated: ${data.title || 'Unknown'}`);
      console.log(`   - Logo: ${updateData.logo ? 'added' : 'kept existing'}`);
      console.log(`   - Screenshots: initialized`);
      updated++;
    }

    console.log(`\n📊 Migration Summary:`);
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📦 Total: ${updated + skipped}`);

  } catch (error) {
    console.error('❌ Migration failed:');
    console.error(error.message);
    process.exit(1);
  } finally {
    await admin.app().delete();
    console.log('\n✨ Done!');
  }
}

migrateProducts();
