import { describe, it } from 'node:test';
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, query, serverTimestamp, setDoc,
  updateDoc, where,
} from 'firebase/firestore';
import { db, seed, setupRulesEnv } from './helpers.js';

setupRulesEnv();

const CONTENT = ['products', 'portfolios', 'client_engagements', 'story_images', 'team_members', 'blogs', 'videos'];

describe('site content', () => {
  for (const name of CONTENT) {
    it(`${name}: anyone reads; only the admin writes`, async () => {
      await seed({ [`${name}/a`]: { title: 'A' } });
      await assertSucceeds(getDoc(doc(db(null), `${name}/a`)));
      await assertSucceeds(getDocs(collection(db(null), name)));
      await assertFails(setDoc(doc(db(null), `${name}/b`), { title: 'B' }));
      await assertFails(updateDoc(doc(db(null), `${name}/a`), { title: 'X' }));
      await assertFails(deleteDoc(doc(db(null), `${name}/a`)));
      await assertFails(setDoc(doc(db('user'), `${name}/b`), { title: 'B' }));
      await assertFails(deleteDoc(doc(db('user'), `${name}/a`)));
      await assertFails(setDoc(doc(db('unverified'), `${name}/b`), { title: 'B' }));
      await assertSucceeds(setDoc(doc(db('admin'), `${name}/b`), { title: 'B' }));
      await assertSucceeds(updateDoc(doc(db('claim'), `${name}/a`), { title: 'X' }));
      await assertSucceeds(deleteDoc(doc(db('admin'), `${name}/a`)));
    });
  }

  it('collections the site does not use are denied, even to signed-in users', async () => {
    await seed({ 'secrets/a': { v: 1 } });
    await assertFails(getDoc(doc(db(null), 'secrets/a')));
    await assertFails(getDoc(doc(db('user'), 'secrets/a')));
    await assertFails(setDoc(doc(db('user'), 'anything/a'), { v: 1 }));
  });
});

describe('testimonials', () => {
  it('visitors read published ones only; the admin reads and writes all', async () => {
    await seed({
      'testimonials/pub': { isPublished: true, isDeleted: false },
      'testimonials/draft': { isPublished: false, isDeleted: false },
    });
    await assertSucceeds(getDoc(doc(db(null), 'testimonials/pub')));
    await assertFails(getDoc(doc(db(null), 'testimonials/draft')));
    await assertSucceeds(getDocs(query(collection(db(null), 'testimonials'),
      where('isPublished', '==', true), where('isDeleted', '==', false))));
    await assertFails(getDocs(collection(db(null), 'testimonials')));
    await assertFails(updateDoc(doc(db('user'), 'testimonials/pub'), { isPublished: false }));
    await assertSucceeds(getDocs(collection(db('admin'), 'testimonials')));
    await assertSucceeds(updateDoc(doc(db('admin'), 'testimonials/draft'), { isPublished: true }));
  });
});

describe('newsletter (subscribedUsers)', () => {
  const sub = (email) => ({ email, subscribedAt: serverTimestamp(), status: 'active', source: 'footer' });

  it('a visitor subscribes once with the email as the id', async () => {
    await assertSucceeds(setDoc(doc(db(null), 'subscribedUsers/jo@example.com'), sub('jo@example.com')));
    // A repeat sign-up is an update and is denied (the footer shows "already subscribed").
    await assertFails(setDoc(doc(db(null), 'subscribedUsers/jo@example.com'), sub('jo@example.com')));
  });

  it('visitors and signed-in users cannot read, list, change or delete subscribers', async () => {
    await seed({ 'subscribedUsers/jo@example.com': { email: 'jo@example.com', status: 'active' } });
    await assertFails(getDoc(doc(db(null), 'subscribedUsers/jo@example.com')));
    await assertFails(getDocs(collection(db(null), 'subscribedUsers')));
    await assertFails(getDocs(query(collection(db(null), 'subscribedUsers'), where('email', '==', 'jo@example.com'))));
    await assertFails(getDocs(collection(db('user'), 'subscribedUsers')));
    await assertFails(updateDoc(doc(db(null), 'subscribedUsers/jo@example.com'), { status: 'x' }));
    await assertFails(deleteDoc(doc(db('user'), 'subscribedUsers/jo@example.com')));
    await assertSucceeds(getDocs(collection(db('admin'), 'subscribedUsers')));
    await assertSucceeds(deleteDoc(doc(db('admin'), 'subscribedUsers/jo@example.com')));
  });

  it('rejects extra fields, a mismatched id, bad emails and random ids', async () => {
    await assertFails(setDoc(doc(db(null), 'subscribedUsers/a@example.com'), { ...sub('a@example.com'), admin: true }));
    await assertFails(setDoc(doc(db(null), 'subscribedUsers/a@example.com'), sub('b@example.com')));
    await assertFails(setDoc(doc(db(null), 'subscribedUsers/not-an-email'), sub('not-an-email')));
    await assertFails(setDoc(doc(db(null), 'subscribedUsers/A@Example.com'), sub('A@Example.com')));
    const long = `${'x'.repeat(250)}@example.com`;
    await assertFails(setDoc(doc(db(null), `subscribedUsers/${long}`), sub(long)));
    await assertFails(setDoc(doc(db(null), 'subscribedUsers/a@example.com'),
      { ...sub('a@example.com'), status: 'admin' }));
    await assertFails(setDoc(doc(db(null), 'subscribedUsers/a@example.com'),
      { ...sub('a@example.com'), subscribedAt: new Date(0) }));
    await assertFails(addDoc(collection(db(null), 'subscribedUsers'), sub('a@example.com')));
  });
});

describe('feed engagement', () => {
  it('visitors bump one counter on a feed post by one, nothing else', async () => {
    await seed({ 'feedPosts/p1': { title: 'P', likeCount: 2, commentCount: 0, shareCount: 0 } });
    await assertSucceeds(updateDoc(doc(db(null), 'feedPosts/p1'), { likeCount: increment(1) }));
    await assertSucceeds(updateDoc(doc(db(null), 'feedPosts/p1'), { likeCount: increment(-1) }));
    await assertSucceeds(updateDoc(doc(db(null), 'feedPosts/p1'), { shareCount: increment(1) }));
    await assertSucceeds(updateDoc(doc(db(null), 'feedPosts/p1'), { commentCount: increment(1) }));
    await assertFails(updateDoc(doc(db(null), 'feedPosts/p1'), { likeCount: increment(5) }));
    await assertFails(updateDoc(doc(db(null), 'feedPosts/p1'), { likeCount: increment(1), shareCount: increment(1) }));
    await assertFails(updateDoc(doc(db(null), 'feedPosts/p1'), { title: 'Hacked' }));
    await assertFails(deleteDoc(doc(db(null), 'feedPosts/p1')));
    await assertFails(setDoc(doc(db(null), 'feedPosts/p2'), { title: 'Spam' }));
    await assertSucceeds(updateDoc(doc(db('admin'), 'feedPosts/p1'), { title: 'Edited' }));
  });

  it('blog counters: created with 0/1 values, then bumped by one', async () => {
    await assertSucceeds(setDoc(doc(db(null), 'feedEngagement/b1'), { likeCount: 1, commentCount: 0, shareCount: 0 }));
    await assertFails(setDoc(doc(db(null), 'feedEngagement/b2'), { likeCount: 500, commentCount: 0, shareCount: 0 }));
    await assertFails(setDoc(doc(db(null), 'feedEngagement/b3'), { likeCount: 1, title: 'x' }));
    await assertSucceeds(updateDoc(doc(db(null), 'feedEngagement/b1'), { likeCount: increment(-1) }));
    await assertFails(updateDoc(doc(db(null), 'feedEngagement/b1'), { likeCount: 99 }));
    await assertFails(deleteDoc(doc(db(null), 'feedEngagement/b1')));
  });

  it('likes: one document per visitor and post, created and removed by the visitor', async () => {
    const like = { postId: 'p1', visitorId: 'v1', reactionType: 'like', createdDate: serverTimestamp() };
    await assertSucceeds(setDoc(doc(db(null), 'feedReactions/p1_v1'), like));
    await assertSucceeds(getDoc(doc(db(null), 'feedReactions/p1_v1')));
    await assertFails(getDocs(collection(db(null), 'feedReactions')));
    await assertFails(setDoc(doc(db(null), 'feedReactions/p1_v1'), like));
    await assertFails(setDoc(doc(db(null), 'feedReactions/other'), like));
    await assertFails(setDoc(doc(db(null), 'feedReactions/p1_v2'), { ...like, visitorId: 'v2', reactionType: 'angry' }));
    await assertSucceeds(deleteDoc(doc(db(null), 'feedReactions/p1_v1')));
  });

  it('comments: visitors submit pending ones and read approved ones only', async () => {
    const comment = {
      postId: 'p1', visitorId: 'v1', name: 'Jo', email: 'jo@example.com', comment: 'Nice',
      status: 'pending', createdDate: serverTimestamp(),
    };
    await assertSucceeds(addDoc(collection(db(null), 'feedComments'), comment));
    await assertFails(addDoc(collection(db(null), 'feedComments'), { ...comment, status: 'approved' }));
    await assertFails(addDoc(collection(db(null), 'feedComments'), { ...comment, comment: 'x'.repeat(2001) }));
    await assertFails(addDoc(collection(db(null), 'feedComments'), { ...comment, comment: '' }));
    await assertFails(addDoc(collection(db(null), 'feedComments'), { ...comment, extra: 1 }));

    await seed({
      'feedComments/ok': { postId: 'p1', status: 'approved' },
      'feedComments/wait': { postId: 'p1', status: 'pending', email: 'jo@example.com' },
    });
    await assertSucceeds(getDocs(query(collection(db(null), 'feedComments'),
      where('postId', '==', 'p1'), where('status', '==', 'approved'))));
    await assertFails(getDoc(doc(db(null), 'feedComments/wait')));
    await assertFails(getDocs(collection(db(null), 'feedComments')));
    await assertFails(updateDoc(doc(db('user'), 'feedComments/wait'), { status: 'approved' }));
    await assertSucceeds(updateDoc(doc(db('admin'), 'feedComments/wait'), { status: 'approved' }));
    await assertSucceeds(deleteDoc(doc(db('admin'), 'feedComments/ok')));
  });
});
