# Blogs Implementation — Overview

This document describes the admin CMS and public blog pages added to the project.

What was added

- Firestore collection: `blogs`
- Service: `src/services/blogsService.js` — contains admin and public helpers (fetchAllBlogsAdmin, fetchPublishedBlogs, getBlogBySlug, isSlugUnique, createBlog, updateBlog, softDeleteBlog).
- Admin pages (protected):
  - `src/pages/admin/BlogsList.jsx` — list, search, sort, delete (soft-delete), preview
  - `src/pages/admin/BlogForm.jsx` — create/edit form with slug generation, image upload, SEO fields, autosave drafts (every 25s), word count
  - Added links to admin sidebar and dashboard quick actions
- Public pages:
  - `src/pages/ModernBlog.jsx` — blog listing at `/blog`
  - `src/pages/BlogDetails.jsx` — blog detail at `/blog/:slug` with SEO meta tags and JSON-LD schema
  - `src/components/blog/BlogCard.jsx` — reused on listing page
- Utility: `src/utils/markdown.js` — small Markdown -> HTML renderer for admin-entered content

Notes & Implementation details

- Content is stored in Firestore; admin CMS is the source-of-truth. No content is hard-coded.
- Image upload uses existing `ImageUploader` and `uploadImageToFirebase` helpers.
- Slug uniqueness is validated when saving; `isSlugUnique` checks for existing slugs and allows editing the same blog.
- SEO compliance:
  - Meta title, description and OG tags set dynamically for detail pages
  - Canonical URL and JSON-LD (BlogPosting) are added on blog details
- Accessibility & UX:
  - Form validation for required fields
  - Confirmation before delete (soft delete)
  - Word count displayed for content

How to use

- Admin: visit `/admin/blogs` to create/edit blog posts (requires admin login)
- Public: visit `/blog` to see published posts and `/blog/:slug` for details

Future improvements (optional)

- Add a richer WYSIWYG/Markdown editor (react-markdown + rehype-sanitize) for better content authoring
- Implement server-side slug uniqueness checks with Cloud Functions
- Add related posts and author profiles
- Add tests for services and components
