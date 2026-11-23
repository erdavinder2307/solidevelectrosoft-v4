import { describe, it } from 'node:test';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { deleteObject, getBytes, ref, uploadBytes } from 'firebase/storage';
import { seedFile, setupRulesEnv, storage } from './helpers.js';

setupRulesEnv();

const png = new Uint8Array([1, 2, 3]);
const FOLDERS = ['products/logos', 'products/screenshots', 'portfolios', 'portfolios/logos', 'blogs', 'team/profile',
  'story', 'testimonials', 'feed-posts'];

describe('storage', () => {
  it('anyone reads the admin panel image folders; other paths are denied', async () => {
    await seedFile('products/a.png');
    await seedFile('private/a.png');
    await assertSucceeds(getBytes(ref(storage(null), 'products/a.png')));
    await assertFails(getBytes(ref(storage(null), 'private/a.png')));
    await assertFails(getBytes(ref(storage('user'), 'private/a.png')));
  });

  for (const folder of FOLDERS) {
    it(`${folder}: only the admin uploads images`, async () => {
      const path = `${folder}/1-abc.png`;
      await assertFails(uploadBytes(ref(storage(null), path), png, { contentType: 'image/png' }));
      await assertFails(uploadBytes(ref(storage('user'), path), png, { contentType: 'image/png' }));
      await assertFails(uploadBytes(ref(storage('unverified'), path), png, { contentType: 'image/png' }));
      await assertSucceeds(uploadBytes(ref(storage('admin'), path), png, { contentType: 'image/png' }));
      await assertSucceeds(uploadBytes(ref(storage('claim'), `${folder}/2-abc.jpg`), png, { contentType: 'image/jpeg' }));
    });
  }

  it('the admin cannot upload non-images, files of 10 MB or more, or outside the folders', async () => {
    await assertFails(uploadBytes(ref(storage('admin'), 'products/a.html'), png, { contentType: 'text/html' }));
    await assertFails(uploadBytes(ref(storage('admin'), 'products/big.png'), new Uint8Array(10 * 1024 * 1024),
      { contentType: 'image/png' }));
    await assertFails(uploadBytes(ref(storage('admin'), 'elsewhere/a.png'), png, { contentType: 'image/png' }));
    await assertFails(uploadBytes(ref(storage('admin'), 'root.png'), png, { contentType: 'image/png' }));
  });

  it('only the admin deletes', async () => {
    await seedFile('blogs/a.png');
    await assertFails(deleteObject(ref(storage(null), 'blogs/a.png')));
    await assertFails(deleteObject(ref(storage('user'), 'blogs/a.png')));
    await assertSucceeds(deleteObject(ref(storage('admin'), 'blogs/a.png')));
  });
});
