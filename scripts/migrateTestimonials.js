// One-time migration for testimonials
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadServiceAccount() {
  const jsonPath = path.resolve(__dirname, '../solidev-electrosoft-firebase-adminsdk-fbsvc-77d1ebcbc5.json');
  const raw = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(raw);
}

async function initAdmin() {
  const serviceAccount = await loadServiceAccount();
  if (admin.apps.length === 0) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  }
  return admin.firestore();
}

// Existing hardcoded data mapped to schema
const seedTestimonials = [
  {
    clientName: 'Naga Vankadari',
    clientRole: 'Project Manager',
    clientCompany: '',
    country: 'USA',
    rating: 5,
    testimonialText: 'The work has been completed in smooth process and delivered the high quality software. He has multiple coding skills. Highly recommend to others.',
    clientInitials: 'NV',
    clientImageUrl: '',
    source: 'Email',
    isFeatured: true,
    isPublished: true,
  },
  {
    clientName: 'Prabhakaran S',
    clientRole: 'Technical Lead',
    clientCompany: 'Edify Technologies, Dacra Tech Core360',
    country: '',
    rating: 5,
    testimonialText: 'As per customer our work was great and relevant to their product. With regard of appreciation client increased per hour rate after six months of commitment.',
    clientInitials: 'PS',
    clientImageUrl: '',
    source: 'Email',
    isFeatured: false,
    isPublished: true,
  },
  {
    clientName: 'Ngwenze Ayanda',
    clientRole: 'Development Manager',
    clientCompany: 'LexisNexis',
    country: 'South Africa',
    rating: 5,
    testimonialText: 'As per customer our work is excellent and provided them value. Code quality is great and meeting deadlines for work.',
    clientInitials: 'NA',
    clientImageUrl: '',
    source: 'Email',
    isFeatured: false,
    isPublished: true,
  },
  {
    clientName: 'Nagaraju Bittu',
    clientRole: 'Business Owner',
    clientCompany: '',
    country: 'USA',
    rating: 4,
    testimonialText: 'The work has been completed in smooth process and delivered the high quality software. He has multiple coding skills. Highly recommend to others.',
    clientInitials: 'NB',
    clientImageUrl: '',
    source: 'Email',
    isFeatured: false,
    isPublished: true,
  },
];

async function run() {
  const db = await initAdmin();
  const now = admin.firestore.Timestamp.now();
  const batch = db.batch();

  seedTestimonials.forEach((t, idx) => {
    const ref = db.collection('testimonials').doc();
    batch.set(ref, {
      ...t,
      isDeleted: false,
      displayOrder: idx,
      createdAt: now,
      updatedAt: now,
    });
  });

  await batch.commit();
  console.log(`Inserted ${seedTestimonials.length} testimonials`);
}

run().catch((e) => {
  console.error('Migration failed:', e);
  process.exitCode = 1;
});
