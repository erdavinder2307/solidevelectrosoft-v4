import { readFileSync } from 'node:fs';
import { after, before, beforeEach } from 'node:test';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, setDoc, setLogLevel } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

setLogLevel('silent');

export const ADMIN_EMAIL = 'admin@solidevelectrosoft.com';

let env;

/** One rules test environment per test file; Firestore and Storage are cleared before each test. */
export function setupRulesEnv() {
  before(async () => {
    env = await initializeTestEnvironment({
      projectId: 'demo-solidev-website',
      firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
      storage: { rules: readFileSync(new URL('../../storage.rules', import.meta.url), 'utf8') },
    });
  });
  beforeEach(async () => {
    await env.clearFirestore();
    await env.clearStorage();
  });
  after(async () => {
    await env.cleanup();
  });
}

/** Writes Firestore documents with rules disabled. */
export async function seed(docs) {
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    for (const [path, data] of Object.entries(docs)) {
      await setDoc(doc(db, path), data);
    }
  });
}

/** Uploads a Storage file with rules disabled. */
export async function seedFile(path) {
  await env.withSecurityRulesDisabled(async (ctx) => {
    await uploadBytes(ref(ctx.storage(), path), new Uint8Array([1, 2, 3]), { contentType: 'image/png' });
  });
}

/** A test context: 'admin' (verified admin email), 'claim' (admin custom claim), 'unverified'
 *  (admin email, not verified), 'user' (any other signed-in account) or null (signed out). */
export function as(who) {
  if (!who) return env.unauthenticatedContext();
  const tokens = {
    admin: { email: ADMIN_EMAIL, email_verified: true },
    claim: { email: 'ops@example.com', email_verified: true, admin: true },
    unverified: { email: ADMIN_EMAIL, email_verified: false },
    user: { email: 'stranger@example.com', email_verified: true },
  };
  return env.authenticatedContext(`${who}-uid`, tokens[who]);
}

export const db = (who) => as(who).firestore();
export const storage = (who) => as(who).storage();
