/**
 * Admin: Content Hub — Post Form (Create & Edit)
 * Supports all 6 post types with rich metadata and SEO fields.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import {
  createFeedPost,
  updateFeedPost,
  getFeedPostById,
} from '../../services/feedService';
import { uploadImageToFirebase } from '../../utils/imageUtils';

const POST_TYPES = [
  { value: 'blog_article',    label: 'Blog Article' },
  { value: 'product_update',  label: 'Product Update' },
  { value: 'feature_release', label: 'Feature Release' },
  { value: 'company_update',  label: 'Company Update' },
  { value: 'founder_insight', label: 'Founder Insight' },
  { value: 'milestone',       label: 'Milestone' },
];

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const EMPTY_FORM = {
  type: 'blog_article',
  title: '',
  slug: '',
  summary: '',
  content: '',
  imageUrl: '',
  relatedProductId: '',
  relatedProductName: '',
  relatedProductSlug: '',
  tags: '',
  isPinned: false,
  isPublished: false,
  publishedDate: '',
  seoTitle: '',
  seoDescription: '',
};

const s = {
  page: { maxWidth: 860, padding: '0 0 60px' },
  heading: { fontSize: 26, fontWeight: 700, color: '#1a202c', marginBottom: 24 },
  card: {
    background: '#fff',
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    padding: '28px 28px',
    marginBottom: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  cardTitle: { fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 },
  label: { fontSize: 13, fontWeight: 600, color: '#374151' },
  input: {
    padding: '9px 13px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'inherit',
    color: '#1a202c',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '9px 13px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: 100,
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    padding: '9px 13px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'inherit',
    background: '#fff',
    width: '100%',
  },
  hint: { fontSize: 11.5, color: '#9ca3af', marginTop: 2 },
  error: { fontSize: 12, color: '#ef4444', marginTop: 2 },
  checkRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 },
  checkLabel: { fontSize: 14, color: '#374151', cursor: 'pointer' },
  saveBtn: {
    padding: '11px 28px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
  },
  cancelBtn: {
    padding: '11px 20px',
    background: '#f9fafb',
    color: '#374151',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    marginLeft: 10,
  },
  imgPreview: {
    width: '100%',
    maxHeight: 200,
    objectFit: 'cover',
    borderRadius: 8,
    marginTop: 8,
    border: '1px solid #e5e7eb',
  },
};

const Spinner = () => (
  <span style={{
    display: 'inline-block', width: 16, height: 16,
    border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff',
    borderRadius: '50%', animation: 'ch-spin 0.65s linear infinite',
  }} />
);

const ContentHubForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  // Load products for related-product selector
  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, 'products'));
        const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Filter to active/coming-soon client-side; sort by name
        const visible = all
          .filter((p) => p.status !== 'inactive' && p.status !== 'archived')
          .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        setProducts(visible);
      } catch (err) {
        console.error('ContentHubForm: failed to load products', err);
      }
    })();
  }, []);

  // Load post when editing
  useEffect(() => {
    if (!isEditing) return;
    (async () => {
      setLoading(true);
      try {
        const post = await getFeedPostById(id);
        if (!post) { navigate('/admin/content-hub'); return; }
        setForm({
          type: post.type || 'blog_article',
          title: post.title || '',
          slug: post.slug || '',
          summary: post.summary || '',
          content: post.content || '',
          imageUrl: post.imageUrl || '',
          relatedProductId: post.relatedProductId || '',
          relatedProductName: post.relatedProductName || '',
          relatedProductSlug: post.relatedProductSlug || '',
          tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
          isPinned: Boolean(post.isPinned),
          isPublished: Boolean(post.isPublished),
          publishedDate: post.publishedDate
            ? new Date(post.publishedDate).toISOString().slice(0, 16)
            : '',
          seoTitle: post.seoTitle || '',
          seoDescription: post.seoDescription || '',
        });
        if (post.imageUrl) setImagePreview(post.imageUrl);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditing, navigate]);

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((p) => {
      const next = { ...p, [field]: val };
      if (field === 'title' && !isEditing && !p.slug) {
        next.slug = slugify(val);
      }
      return next;
    });
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const handleProductChange = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setForm((p) => ({ ...p, relatedProductId: '', relatedProductName: '', relatedProductSlug: '' }));
      return;
    }
    const product = products.find((pr) => pr.id === selectedId);
    setForm((p) => ({
      ...p,
      relatedProductId: selectedId,
      relatedProductName: product?.name || '',
      relatedProductSlug: product?.slug || '',
    }));
  };

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.slug.trim()) e.slug = 'Slug is required';
    if (!form.summary.trim()) e.summary = 'Summary is required';
    if (form.summary.trim().length < 20) e.summary = 'Summary must be at least 20 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    setSuccess('');
    try {
      let imageUrl = form.imageUrl;
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImageToFirebase(imageFile, 'feed-posts');
        setUploading(false);
      }
      const payload = {
        ...form,
        imageUrl,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };
      if (isEditing) {
        await updateFeedPost(id, payload);
        setSuccess('Post updated successfully!');
      } else {
        await createFeedPost(payload);
        setSuccess('Post created!');
        setTimeout(() => navigate('/admin/content-hub'), 1200);
      }
    } catch (err) {
      setErrors({ submit: `Save failed: ${err.message || err}` });
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  if (loading) return <p style={{ padding: 40, color: '#6b7280' }}>Loading…</p>;

  return (
    <div style={s.page}>
      <style>{`@keyframes ch-spin { to { transform: rotate(360deg); } }`}</style>

      <h1 style={s.heading}>{isEditing ? 'Edit Post' : 'New Post'}</h1>

      <form onSubmit={handleSubmit} noValidate>
        {/* Core Content */}
        <div style={s.card}>
          <p style={s.cardTitle}>Content</p>

          <div style={s.field}>
            <label style={s.label}>Post Type <span style={{ color: '#ef4444' }}>*</span></label>
            <select style={s.select} value={form.type} onChange={set('type')}>
              {POST_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div style={s.grid2}>
            <div style={s.field}>
              <label style={s.label}>Title <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                style={{ ...s.input, ...(errors.title ? { borderColor: '#ef4444' } : {}) }}
                value={form.title}
                onChange={set('title')}
                placeholder="Post title"
              />
              {errors.title && <span style={s.error}>{errors.title}</span>}
            </div>
            <div style={s.field}>
              <label style={s.label}>Slug <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                style={{ ...s.input, ...(errors.slug ? { borderColor: '#ef4444' } : {}) }}
                value={form.slug}
                onChange={set('slug')}
                placeholder="url-friendly-slug"
              />
              {errors.slug && <span style={s.error}>{errors.slug}</span>}
              <span style={s.hint}>/blog/{form.slug || 'your-slug'}</span>
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>Summary <span style={{ color: '#ef4444' }}>*</span></label>
            <textarea
              style={{ ...s.textarea, ...(errors.summary ? { borderColor: '#ef4444' } : {}), minHeight: 80 }}
              value={form.summary}
              onChange={set('summary')}
              placeholder="Short description shown on the feed card (20–200 chars)"
              maxLength={300}
              rows={3}
            />
            {errors.summary && <span style={s.error}>{errors.summary}</span>}
          </div>

          <div style={s.field}>
            <label style={s.label}>Full Content</label>
            <textarea
              style={{ ...s.textarea, minHeight: 180 }}
              value={form.content}
              onChange={set('content')}
              placeholder="Full post body (supports HTML or Markdown)"
              rows={8}
            />
            <span style={s.hint}>Used on the detail/blog page.</span>
          </div>

          <div style={s.field}>
            <label style={s.label}>Tags</label>
            <input
              style={s.input}
              value={form.tags}
              onChange={set('tags')}
              placeholder="react, firebase, product-update (comma-separated)"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div style={s.card}>
          <p style={s.cardTitle}>Cover Image</p>
          <div style={s.field}>
            <label style={s.label}>Image URL</label>
            <input
              style={s.input}
              value={form.imageUrl}
              onChange={set('imageUrl')}
              placeholder="https://..."
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>— or upload a file</label>
            <input type="file" accept="image/*" onChange={handleImageFile} />
            {uploading && <span style={{ fontSize: 13, color: '#667eea', marginTop: 4 }}>Uploading…</span>}
          </div>
          {imagePreview && (
            <img src={imagePreview} alt="Cover preview" style={s.imgPreview} />
          )}
        </div>

        {/* Related Product */}
        <div style={s.card}>
          <p style={s.cardTitle}>Related Product</p>
          <div style={s.field}>
            <label style={s.label}>Link to Product (optional)</label>
            <select style={s.select} value={form.relatedProductId} onChange={handleProductChange}>
              <option value="">— None —</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <span style={s.hint}>A product badge will appear on the feed card.</span>
          </div>
        </div>

        {/* Publishing */}
        <div style={s.card}>
          <p style={s.cardTitle}>Publishing</p>
          <div style={s.checkRow}>
            <input
              type="checkbox"
              id="isPublished"
              checked={form.isPublished}
              onChange={set('isPublished')}
            />
            <label style={s.checkLabel} htmlFor="isPublished">Published (visible on homepage)</label>
          </div>
          <div style={s.checkRow}>
            <input
              type="checkbox"
              id="isPinned"
              checked={form.isPinned}
              onChange={set('isPinned')}
            />
            <label style={s.checkLabel} htmlFor="isPinned">Pinned (always show at top)</label>
          </div>
          <div style={{ ...s.field, maxWidth: 280 }}>
            <label style={s.label}>Publish Date</label>
            <input
              type="datetime-local"
              style={s.input}
              value={form.publishedDate}
              onChange={set('publishedDate')}
            />
          </div>
        </div>

        {/* SEO */}
        <div style={s.card}>
          <p style={s.cardTitle}>SEO</p>
          <div style={s.field}>
            <label style={s.label}>SEO Title</label>
            <input
              style={s.input}
              value={form.seoTitle}
              onChange={set('seoTitle')}
              placeholder="Defaults to post title"
              maxLength={70}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>SEO Description</label>
            <textarea
              style={{ ...s.textarea, minHeight: 70 }}
              value={form.seoDescription}
              onChange={set('seoDescription')}
              placeholder="Defaults to summary"
              maxLength={160}
              rows={3}
            />
          </div>
        </div>

        {/* Actions */}
        {errors.submit && (
          <div style={{ padding: '10px 14px', background: '#fef2f2', color: '#dc2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
            {errors.submit}
          </div>
        )}
        {success && (
          <div style={{ padding: '10px 14px', background: '#f0fdf4', color: '#15803d', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
            ✓ {success}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button type="submit" style={s.saveBtn} disabled={saving || uploading}>
            {saving && <Spinner />}
            {saving ? 'Saving…' : isEditing ? 'Update Post' : 'Create Post'}
          </button>
          <button
            type="button"
            style={s.cancelBtn}
            onClick={() => navigate('/admin/content-hub')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentHubForm;
