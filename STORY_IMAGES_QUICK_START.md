# Story Images Admin — Quick Start

## Access Admin Panel
1. Go to `https://yoursite.com/admin/login`
2. Login with your Firebase email/password
3. Navigate to **Story Images** (🖼️) in the sidebar

## Add a Story Image
1. Click **➕ Add Image**
2. Either:
   - Upload an image file (JPG, PNG, WebP up to 5MB)
   - OR paste a direct URL
3. Optional: Add a description
4. Set **Sort Order** (0 = appears first)
5. Check **Visible on website** to make it live
6. Click **Add Image**

## Edit a Story Image
1. Go to **Story Images** list
2. Click **Edit** on any image
3. Update the image URL, sort order, or description
4. Click **Update Image**

## Manage Visibility
- In the list view, use the **Visible** checkbox to show/hide images without deleting
- Check = shows on website, Uncheck = hidden

## Change Display Order
- In the list view, edit the **Sort Order** field (lower numbers appear first)
- First visible image in sort order is shown in the About hero section

## Delete an Image
1. In the list view, click **Delete** on the image
2. Confirm the deletion
3. Image is permanently removed from Firestore

## How It Works on Website
- The About page automatically fetches the first visible, ordered story image from Firestore
- If no story images are added, it falls back to a random team image
- No need to reload the website—changes appear immediately after saving

## Notes
- Images are uploaded to Firebase Storage under the `story/` folder
- Always use valid image URLs (https://)
- Sort order 0 is recommended for the primary image
- Use visibility toggle instead of deleting to temporarily hide images
