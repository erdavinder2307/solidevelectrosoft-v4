/**
 * ⚠️ ONE-TIME MIGRATION SCRIPT - RUN ONLY ONCE
 * 
 * Purpose: Migrate initial client engagement data to Firestore
 * 
 * Usage:
 *   node scripts/migrateClientEngagements.js
 * 
 * Prerequisites:
 *   - Firebase Admin SDK initialized
 *   - Service account credentials available
 *   - Run locally only (never in production build)
 * 
 * Safety:
 *   - Checks if documents already exist before inserting
 *   - Logs all operations
 *   - Can be safely re-run (won't duplicate data)
 */

import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('../solidev-electrosoft-firebase-adminsdk-fbsvc-77d1ebcbc5.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Initial client engagement data
const clientEngagements = [
  {
    companyName: 'Provizant Inc',
    description: 'Software development work on internal systems and end-client projects',
    engagementType: 'direct',
    partnerName: null,
    domains: [],
    projects: [],
    period: 'Ongoing / Multiple years',
    isVisible: true,
    sortOrder: 1
  },
  {
    companyName: 'Nanojot Inc',
    description: 'Aviation software solutions',
    engagementType: 'direct',
    partnerName: null,
    domains: ['Aviation'],
    projects: [],
    period: '2018–2019',
    isVisible: true,
    sortOrder: 2
  },
  {
    companyName: 'RBH Solutions',
    description: 'Power grid management software development',
    engagementType: 'direct',
    partnerName: null,
    domains: ['Power grid management'],
    projects: ['RSS Cloud'],
    period: '2019',
    isVisible: true,
    sortOrder: 3
  },
  {
    companyName: 'Robonomics',
    description: 'Healthcare software solutions',
    engagementType: 'direct',
    partnerName: null,
    domains: ['Healthcare'],
    projects: [],
    period: '2020',
    isVisible: true,
    sortOrder: 4
  },
  {
    companyName: 'TechRBM',
    description: 'Offshore IT services - Development of employee management systems and mobile applications',
    engagementType: 'direct',
    partnerName: null,
    domains: [],
    projects: ['Fairway First app', 'Employee management system'],
    period: '2020–2023',
    isVisible: true,
    sortOrder: 5
  },
  {
    companyName: 'Fairway Inc',
    description: 'Mobile application development for sales management',
    engagementType: 'via_partner',
    partnerName: 'TechRBM',
    domains: [],
    projects: ['Fairway First mobile app'],
    period: '2020–2023',
    isVisible: true,
    sortOrder: 6
  },
  {
    companyName: '9 AM Software Solutions',
    description: 'Software development services',
    engagementType: 'direct',
    partnerName: null,
    domains: [],
    projects: [],
    period: '2023',
    isVisible: true,
    sortOrder: 7
  },
  {
    companyName: 'Billa Bang',
    description: 'Sales and telemarketing management platform',
    engagementType: 'direct',
    partnerName: null,
    domains: [],
    projects: ['Ravikk'],
    period: '2023',
    isVisible: true,
    sortOrder: 8
  },
  {
    companyName: 'Airvolution',
    description: 'Platform development for aviation industry',
    engagementType: 'direct',
    partnerName: null,
    domains: [],
    projects: ['Airvolution platform'],
    period: '2023',
    isVisible: true,
    sortOrder: 9
  },
  {
    companyName: 'SpireNSavvy',
    description: 'Contractor services for enterprise software development',
    engagementType: 'contractor',
    partnerName: null,
    domains: [],
    projects: ['Lexis Convey', 'Recon AI'],
    period: '2022–Present',
    isVisible: true,
    sortOrder: 10
  },
  {
    companyName: 'LexisNexis',
    description: 'Legal technology solutions development',
    engagementType: 'via_partner',
    partnerName: 'SpireNSavvy',
    domains: [],
    projects: [],
    period: '2020–2023',
    isVisible: true,
    sortOrder: 11
  },
  {
    companyName: 'Dacratech Inc',
    description: 'Traffic violation systems development',
    engagementType: 'direct',
    partnerName: null,
    domains: ['Traffic violation systems'],
    projects: ['Core360'],
    period: '2021–2022',
    isVisible: true,
    sortOrder: 12
  }
];

/**
 * Main migration function
 */
async function migrateClientEngagements() {
  console.log('🚀 Starting Client Engagements Migration...\n');

  const collectionRef = db.collection('client_engagements');
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const engagement of clientEngagements) {
    try {
      // Check if document already exists
      const querySnapshot = await collectionRef
        .where('companyName', '==', engagement.companyName)
        .limit(1)
        .get();

      if (!querySnapshot.empty) {
        console.log(`⏭️  Skipped: ${engagement.companyName} (already exists)`);
        skipCount++;
        continue;
      }

      // Add timestamps
      const timestamp = admin.firestore.FieldValue.serverTimestamp();
      const docData = {
        ...engagement,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      // Insert document
      const docRef = await collectionRef.add(docData);
      console.log(`✅ Added: ${engagement.companyName} (ID: ${docRef.id})`);
      successCount++;

    } catch (error) {
      console.error(`❌ Error adding ${engagement.companyName}:`, error.message);
      errorCount++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Successfully added: ${successCount}`);
  console.log(`⏭️  Skipped (existing): ${skipCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📝 Total processed: ${clientEngagements.length}`);
  console.log('='.repeat(60));

  if (errorCount === 0 && successCount > 0) {
    console.log('\n🎉 Migration completed successfully!');
  } else if (skipCount === clientEngagements.length) {
    console.log('\n✨ All records already exist. No migration needed.');
  } else if (errorCount > 0) {
    console.log('\n⚠️  Migration completed with errors. Please review the logs above.');
  }
}

// Run migration
migrateClientEngagements()
  .then(() => {
    console.log('\n✅ Script execution completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error during migration:', error);
    process.exit(1);
  });
