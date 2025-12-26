# Story Images Admin Implementation

## Overview
Added a complete admin interface for managing "story section" images in the About page, allowing Firestore-based content management instead of hardcoded static assets.

## Files Created

### 1. **StoryImagesList.jsx** (`src/pages/admin/StoryImagesList.jsx`)
Admin list/management page for story images with:
- **Fetch**: Query `story_images` collection ordered by `sortOrder` ascending
- **Toggle Visibility**: Show/hide images for the website
- **Update Sort Order**: Control display order (lower numbers first)
- **Delete**: Remove images with confirmation
- **Table UI**: Preview thumbnails, image URL, visibility status, sort order, and action buttons

### 2. **StoryImageForm.jsx** (`src/pages/admin/StoryImageForm.jsx`)
Form for creating and editing story images with:
- **Image Upload**: Via `ImageUploader` component (uploads to Firebase Storage under `story/` folder)
- **Image URL**: Alternative direct URL entry if not uploading
- **Description**: Optional field for image metadata
- **Sort Order**: Numeric field to control display sequence
- **Visibility Toggle**: Checkbox to show/hide on website
- **Edit/Create Mode**: Auto-detects based on route params
- **Success/Error Messages**: User feedback on save operations

## Files Modified

### 1. **AdminLayout.jsx** (`src/components/admin/AdminLayout.jsx`)
- **Imports**: Added `StoryImagesList` and `StoryImageForm`
- **Menu Item**: Added "Story Images" (🖼️) to sidebar navigation pointing to `/admin/story-images`
- **Routes**: Added three new routes:
  - `story-images` → StoryImagesList (list all)
  - `story-images/new` → StoryImageForm (create new)
  - `story-images/:id` → StoryImageForm (edit existing)

### 2. **ModernAbout.jsx** (`src/pages/ModernAbout.jsx`)
- **State**: Added `storyImages`, `storyLoading`, `storyError` useState hooks
- **Fetch Effect**: New useEffect fetches from Firestore `story_images` collection with:
  - `where('isVisible', '==', true)` filter
  - `orderBy('sortOrder', 'asc')` for ordering
- **Display Logic**: Added `displayStoryImage` constant that uses first visible story image from Firestore, falls back to random legacy team image
- **Rendering**: Updated hero image to use `displayStoryImage` instead of `randomTeamImage`

## Firestore Collection Schema: `story_images`

Required fields:
```json
{
  "id": "auto-generated",
  "imageUrl": "https://example.com/image.jpg",
  "isVisible": true,
  "sortOrder": 0,
  "description": "Optional image description",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## How It Works

1. **Admin Upload**:
   - Admin logs in → navigates to Admin → clicks "Story Images" → "➕ Add Image"
   - Uploads image or provides URL
   - Sets sort order and visibility
   - Saves to Firestore `story_images` collection

2. **Frontend Display**:
   - About page loads → triggers `fetchStoryImages` useEffect
   - Queries visible, ordered story images
   - If images exist, uses first one; otherwise falls back to random legacy team image
   - Image displays in hero/story section

3. **Management**:
   - List view shows all images with thumbnails
   - Toggle visibility checkbox to show/hide without deleting
   - Update sort order to rearrange display
   - Edit button to modify image details
   - Delete button (with confirmation) to remove images

## Backward Compatibility
- Falls back to random team image if no story images are added
- Legacy team image imports remain in place
- No breaking changes to existing About page functionality

## Integration Points
- Uses existing `imageUploadToFirebase()` utility for storage
- Uses existing `ImageUploader` component for file selection
- Follows admin pattern established with team members (same structure, validation, UI)
- Respects existing Firestore security rules (must be authenticated)
