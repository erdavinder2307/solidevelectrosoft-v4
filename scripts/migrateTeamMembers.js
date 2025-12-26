// One-time migration to seed team_members collection from the previously hardcoded list.
// Usage: node scripts/migrateTeamMembers.js
// Requires service account JSON at ../solidev-electrosoft-firebase-adminsdk-fbsvc-77d1ebcbc5.json

import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, '../solidev-electrosoft-firebase-adminsdk-fbsvc-77d1ebcbc5.json');
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const team = [
  { name: 'Davinder Pal', role: 'Director & CTO' },
  { name: 'Anushka', role: 'Sales & Finance' },
  { name: 'Jagriti', role: 'Software Developer (Remote)' },
  { name: 'Nisha', role: 'Software Developer' },
  { name: 'Sheetal', role: 'Software Developer' },
];

async function run() {
  console.log('Seeding team_members...');
  for (let i = 0; i < team.length; i += 1) {
    const member = team[i];
    const payload = {
      name: member.name,
      role: member.role,
      profileImageUrl: member.profileImageUrl || '',
      linkedinUrl: member.linkedinUrl || '',
      shortBio: member.shortBio || '',
      isVisible: true,
      sortOrder: i + 1,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection('team_members').add(payload);
    console.log(`Added ${member.name}`);
  }
  console.log('Done.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
