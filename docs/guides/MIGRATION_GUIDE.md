# Phase 4: Data Migration Guide

## Overview

This guide walks you through migrating the hardcoded products and portfolios data from your React source files into Firestore. This is a one-time initialization that prepares your database for the admin panel.

## What Gets Migrated

### Products (8 items)
- Solidcare
- Smart Invoice Pro
- AdoPals
- ProTech Wallet
- Mindset Fuel
- Decidemate Pro
- SolidTrack
- Solid Apps

### Portfolios (8 items)
- Core360 (Dracra Technologies)
- Briind (Briind Inc.)
- Fairway First (Fairway IMC)
- Lexis Convey (LexisNexis)
- E-Commerce Platform
- Healthcare Portal
- AI Customer Support
- FinTech Dashboard

**Total: 16 documents** will be created in your Firestore database.

---

## Prerequisites

### 1. Firebase Setup ✅
- [ ] Firebase project created
- [ ] Firestore database initialized
- [ ] Firebase Storage bucket created
- [ ] Firebase Authentication enabled

### 2. Service Account Key
You need a Firebase service account JSON file to authenticate the migration script:

**Steps to download:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Project Settings** (gear icon)
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Save the JSON file as `firebase-service-account.json` in your project root

**⚠️ Important Security Notes:**
- Never commit this file to git (add to `.gitignore`)
- Keep this file secure and do not share it
- Delete it after migration if not needed for other backend services

### 3. Environment Variables
Ensure your `.env.local` file has (for reference, not directly used by migration):
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## Installation

### 1. Install Firebase Admin SDK

```bash
npm install firebase-admin
```

This is already in your `package.json` if you see `firebase-admin` in devDependencies.

### 2. Set Up Service Account

```bash
# Place the service account JSON in project root
cp ~/Downloads/firebase-service-account.json ./firebase-service-account.json
```

---

## Running the Migration

### Method 1: Using npm script (Recommended)

```bash
npm run migrate
```

### Method 2: Direct Node execution

```bash
node scripts/migrateInitialData.js
```

### Expected Output

```
🚀 Starting Firestore Data Migration
==================================================

📦 Migrating Products...
✅ Successfully migrated 8 products to Firestore

💼 Migrating Portfolios...
✅ Successfully migrated 8 portfolios to Firestore

==================================================

✨ Migration completed successfully!
   - Products: 8
   - Portfolios: 8
   - Total documents: 16

📋 Next steps:
1. Verify data in Firebase Console
2. Update public pages to query from Firestore
3. Deploy security rules
4. Test the admin panel and public pages
```

---

## Verification Steps

### 1. Check Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Firestore Database**
4. You should see two collections:
   - **products** (8 documents)
   - **portfolios** (8 documents)

### 2. Verify Document Structure

**Products Collection:**
```
{
  id: "solidcare",
  title: "Solidcare",
  description: "Complete Electronic Healthcare Record System",
  category: "Healthcare",
  image: "https://...",
  features: ["Feature1", "Feature2", ...],
  technologies: ["React", "Node.js", ...],
  status: "active",
  featured: true,
  createdAt: "2024-01-15T10:30:00.000Z",
  updatedAt: "2024-01-15T10:30:00.000Z"
}
```

**Portfolios Collection:**
```
{
  projectName: "Core360",
  client: "Dracra Technologies",
  description: "Enterprise-grade web application...",
  category: "Web Application",
  images: ["https://..."],
  thumbnailUrl: "https://...",
  technologies: ["React", ".NET Core", ...],
  projectUrl: "https://...",
  duration: "6 months",
  teamSize: 5,
  featured: true,
  status: "completed",
  createdAt: "2024-01-15T10:30:00.000Z",
  updatedAt: "2024-01-15T10:30:00.000Z"
}
```

### 3. Test Admin Panel

1. Start dev server: `npm run dev`
2. Navigate to http://localhost:5173/admin/login
3. Log in with your Firebase credentials
4. Visit `/admin/products` - should display all 8 products
5. Visit `/admin/portfolios` - should display all 8 portfolios

---

## Troubleshooting

### Issue: "Firebase service account file not found"

**Solution:**
```bash
# Make sure file is in project root with correct name
ls -la firebase-service-account.json

# Or set custom path
export FIREBASE_SERVICE_ACCOUNT_PATH=/path/to/service-account.json
npm run migrate
```

### Issue: "Failed to initialize Firebase Admin SDK"

**Solution:**
1. Verify the JSON file is valid (check for syntax errors)
2. Ensure it's a service account key, not a config file
3. Delete and regenerate from Firebase Console

### Issue: "Permission denied" errors

**Solutions:**
1. Ensure Firestore security rules allow writes
2. Check your user is authenticated
3. Temporarily update security rules to allow this migration:

**Firestore Rules (Temporary):**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // During migration
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **After migration, revert to production rules!**

### Issue: Partial migration (some docs migrated, then failed)

**Solution:**
Since Firestore uses batch operations, either all succeed or all fail. If it fails:
1. Check the error message
2. Delete any partially created documents in Console
3. Fix the issue and run again

---

## Post-Migration Checklist

### Phase 4 Complete ✅
- [x] Hardcoded data exported to Firestore
- [x] Migration script created
- [x] 8 products migrated
- [x] 8 portfolios migrated

### Phase 5: Refactor Public Pages (Next)
- [ ] Update `ModernProducts.jsx` to query Firestore instead of hardcoded data
- [ ] Update `ModernPortfolio.jsx` to query Firestore
- [ ] Add loading states and error handling
- [ ] Test public pages work with Firestore data

### Security & Deployment
- [ ] Deploy Firestore security rules (read: public, write: admin)
- [ ] Deploy Storage security rules
- [ ] Test permissions in production

---

## Script Details

**Location:** `/scripts/migrateInitialData.js`

**What it does:**
1. Loads Firebase Admin SDK credentials
2. Reads hardcoded products and portfolios from this file
3. Creates a batch write operation for each collection
4. Assigns timestamps to all documents
5. Reports results and next steps

**Data sources:**
- Products: Hardcoded in script (from `src/data/productsData.js`)
- Portfolios: Hardcoded in script (from `src/pages/ModernPortfolio.jsx`)

**Important notes:**
- This is a one-time script; safe to run multiple times (will create duplicates if products have same ID)
- Uses batch operations for atomic writes
- Adds `createdAt` and `updatedAt` timestamps automatically

---

## Cleanup

### After Successful Migration

1. **Delete Service Account (if not needed):**
   ```bash
   rm firebase-service-account.json
   ```

2. **Add to .gitignore (if not already):**
   ```
   firebase-service-account.json
   ```

3. **Optionally remove migration script** if it's never needed again:
   ```bash
   rm scripts/migrateInitialData.js
   rm package.json "migrate" script
   ```

---

## FAQ

### Q: Can I run the migration multiple times?
**A:** Yes, but it will create duplicate documents. Products use hardcoded IDs so they'll be overwritten. Portfolios generate new IDs so duplicates will be created.

### Q: What if I need to update the data?
**A:** 
- For small changes: Edit directly in Firebase Console
- For bulk updates: Create a new migration script
- Going forward: Use the admin panel at `/admin/products` and `/admin/portfolios`

### Q: Do I need the service account after migration?
**A:** Not if you're only using the web app with user authentication. Keep it if you need backend services (Cloud Functions, scheduled tasks, etc.).

### Q: How do I migrate data back to hardcoded format?
**A:** Use the Firebase Console export feature or create an export script. Not recommended - Firestore is more maintainable.

### Q: Can I migrate only products or only portfolios?
**A:** Edit the script to comment out the function calls you don't need:
```javascript
// await migrateProducts(); // Skip products
await migratePortfolios(); // Only portfolios
```

---

## Next Steps

After successful migration:

### 1. **Verify Admin Panel Works** ✅
   - Test product CRUD operations
   - Test portfolio CRUD operations
   - Verify image uploads work

### 2. **Update Public Pages** (Phase 5)
   - Refactor `ModernProducts.jsx` to fetch from Firestore
   - Refactor `ModernPortfolio.jsx` to fetch from Firestore
   - Add Firestore queries with loading/error states

### 3. **Deploy Security Rules**
   - Set proper Firestore rules for public read, admin write
   - Set proper Storage rules for public read, admin write
   - Test permissions thoroughly

### 4. **Final Testing**
   - Test public pages with Firestore data
   - Test admin panel full workflow
   - Verify performance and caching

---

## Support

If you encounter issues:

1. Check the error message in the console
2. Verify Firebase project is properly configured
3. Check service account JSON is valid
4. Review Firestore security rules
5. Look at Firebase Admin SDK documentation

---

**Happy migrating! 🚀**

After migration, you'll have a scalable, maintainable database backing your admin panel and public site.
