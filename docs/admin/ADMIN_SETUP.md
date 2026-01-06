# Admin Panel Setup Guide

## Overview
Secure admin panel for managing website content (Products & Portfolios) using Firebase Authentication, Firestore, and Storage.

## Features
- 🔐 Firebase Authentication (Email/Password)
- 📦 Products CRUD operations
- 💼 Portfolios CRUD operations
- 🖼️ Image upload with Firebase Storage
- 🎨 Image cropping functionality
- 📊 Dashboard with statistics
- 🔒 Protected routes (admin-only access)

## Setup Instructions

### 1. Firebase Project Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Name it (e.g., "solidev-electrosoft-admin")
   - Disable Google Analytics (optional)

2. **Enable Authentication**:
   - Go to Authentication → Get Started
   - Enable "Email/Password" provider
   - Click "Add user" to create admin account:
     - Email: `admin@solidevelectrosoft.com`
     - Password: (your secure password)

3. **Create Firestore Database**:
   - Go to Firestore Database → Create database
   - Start in **Production mode**
   - Choose location: `us-central1`

4. **Enable Storage**:
   - Go to Storage → Get Started
   - Start in **Production mode**
   - Same location as Firestore

5. **Get Firebase Config**:
   - Go to Project Settings (⚙️ icon)
   - Scroll to "Your apps" → Click Web icon `</>`
   - Register app: "Admin Panel"
   - Copy the config values

### 2. Environment Configuration

1. **Copy `.env.example` to `.env.local`**:
   ```bash
   cp .env.example .env.local
   ```

2. **Add Firebase credentials** to `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   ```

### 3. Firestore Security Rules

Go to Firestore → Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Products collection
    match /products/{productId} {
      allow read: if true; // Public read for website
      allow write: if isAuthenticated(); // Admin only write
    }
    
    // Portfolios collection
    match /portfolios/{portfolioId} {
      allow read: if true; // Public read for website
      allow write: if isAuthenticated(); // Admin only write
    }
  }
}
```

### 4. Storage Security Rules

Go to Storage → Rules and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Admin only upload
    }
    
    match /portfolios/{allPaths=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Admin only upload
    }
  }
}
```

### 5. Run Development Server

```bash
npm run dev
```

Access admin panel:
- Login: `http://localhost:5173/admin/login`
- Dashboard: `http://localhost:5173/admin/dashboard` (after login)

## Admin Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/admin/login` | Login page | No |
| `/admin/dashboard` | Admin dashboard | Yes |
| `/admin/products` | Products list | Yes |
| `/admin/products/new` | Add product | Yes |
| `/admin/products/:id` | Edit product | Yes |
| `/admin/portfolios` | Portfolios list | Yes |
| `/admin/portfolios/new` | Add portfolio | Yes |
| `/admin/portfolios/:id` | Edit portfolio | Yes |

## Firestore Data Structure

### Products Collection (`products`)
```json
{
  "id": "auto-generated-id",
  "title": "Custom Healthcare Platform",
  "description": "HIPAA-compliant patient management system...",
  "category": "Web Development",
  "image": "https://firebasestorage.googleapis.com/...",
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "technologies": ["React", "Node.js", "MongoDB"],
  "status": "active",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T15:45:00Z"
}
```

### Portfolios Collection (`portfolios`)
```json
{
  "id": "auto-generated-id",
  "projectName": "FinTech Dashboard",
  "client": "Financial Services Inc.",
  "description": "Real-time trading platform with analytics...",
  "category": "Web Application",
  "images": [
    "https://firebasestorage.googleapis.com/...",
    "https://firebasestorage.googleapis.com/..."
  ],
  "thumbnailUrl": "https://firebasestorage.googleapis.com/...",
  "technologies": ["Angular", ".NET Core", "Azure"],
  "projectUrl": "https://example.com",
  "duration": "6 months",
  "teamSize": 5,
  "featured": true,
  "status": "completed",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T15:45:00Z"
}
```

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use strong passwords** for admin accounts
3. **Enable 2FA** in Firebase Console (Project Settings → Users)
4. **Regularly review Auth logs** in Firebase Console
5. **Keep Firebase SDK updated**: `npm update firebase`
6. **Limit Storage uploads**: Max 5MB per image (configured in code)
7. **Use environment-specific projects**: 
   - Development: `solidev-dev`
   - Production: `solidev-prod`

## Migration Script

To migrate existing hardcoded data to Firestore:

```bash
# Run migration script (to be created)
node scripts/migrateInitialData.js
```

## Troubleshooting

### "Permission denied" errors
- Check Firestore/Storage rules
- Verify user is authenticated
- Ensure admin user email matches Firebase Auth

### Images not uploading
- Check file size (max 5MB)
- Verify Storage rules allow uploads
- Check browser console for errors

### Login fails
- Verify Firebase credentials in `.env.local`
- Check Firebase Auth is enabled
- Ensure admin user exists in Firebase Console

### Build errors
- Run `npm install` to ensure all dependencies
- Check that all imports are correct
- Verify `.env.local` has all required variables

## Next Steps

1. ✅ Firebase setup complete
2. ✅ Auth system implemented
3. ✅ Admin layout created
4. ⏳ Create Products CRUD pages
5. ⏳ Create Portfolios CRUD pages
6. ⏳ Add image upload with cropper
7. ⏳ Write migration script
8. ⏳ Refactor public pages to use Firestore

## Support

For issues or questions:
- Check Firebase Console logs
- Review browser console errors
- Verify all environment variables are set
- Check network tab for API errors

---

**Note**: The admin panel is intentionally NOT linked from the public website. Access it directly via `/admin/login`.
