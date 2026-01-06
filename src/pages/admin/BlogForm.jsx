import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploader from '../../components/admin/ImageUploader';
import BlogEditor from '../../components/admin/BlogEditor';
import BlogPreview from '../../components/admin/BlogPreview';
import { uploadImageToFirebase } from '../../utils/imageUtils';
import { generateExcerpt, getWordCount, hasMinimumHeadings, generateSeoScore } from '../../utils/blogUtils';
import * as blogsService from '../../services/blogsService';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const categories = ['Announcements', 'Engineering', 'Product', 'Company', 'Tips'];

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const BlogForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImageUrl: '',
    category: '',
    tags: [],
    status: 'Draft',
    publishDate: null,
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
  });

  // Autosave interval ref
  const autosaveRef = useRef(null);

  useEffect(() => {
    if (isEditing) fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const snap = await getDoc(doc(db, 'blogs', id));
      if (snap.exists()) {
        const data = snap.data();
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          coverImageUrl: data.coverImageUrl || '',
          category: data.category || '',
          tags: data.tags || [],
          status: data.status || 'Draft',
          publishDate: data.publishDate || null,
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          canonicalUrl: data.canonicalUrl || '',
          ogTitle: data.ogTitle || '',
          ogDescription: data.ogDescription || '',
          ogImage: data.ogImage || '',
        });
        setImagePreview(data.coverImageUrl || '');
      } else {
        setErrors({ general: 'Blog not found' });
      }
    } catch (err) {
      console.error('Load blog failed:', err);
      setErrors({ general: 'Failed to load blog' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Autosave drafts every 25 seconds
    autosaveRef.current = setInterval(() => {
      if (formData.title && formData.status === 'Draft') {
        saveDraft();
      }
    }, 25000);

    return () => clearInterval(autosaveRef.current);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'tags') {
      setFormData((prev) => ({
        ...prev,
        tags: value.split(',').map((t) => t.trim()).filter(Boolean),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'title' && !isEditing) {
      setFormData((prev) => ({ ...prev, slug: slugify(value) }));
    }
  };

  const handleContentChange = (html) => {
    setFormData((prev) => ({
      ...prev,
      content: html,
      // Auto-generate excerpt if empty
      excerpt: prev.excerpt || generateExcerpt(html),
    }));
    if (errors.content) setErrors((prev) => ({ ...prev, content: '' }));
  };

  const handleImageSelected = (file) => {
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, coverImageUrl: 'Image must be under 5MB' }));
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, coverImageUrl: '' }));
  };

  const validate = async () => {
    const newErrors = {};

    // Required fields
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';

    // Slug validation
    if (formData.slug.trim()) {
      const slugOk = await blogsService.isSlugUnique(formData.slug, isEditing ? id : null);
      if (!slugOk) newErrors.slug = 'Slug already exists';
    }

    // Meta title
    if (formData.status === 'Published') {
      if (!formData.metaTitle.trim()) newErrors.metaTitle = 'Required for published posts';
      else if (formData.metaTitle.length > 60)
        newErrors.metaTitle = `Too long (${formData.metaTitle.length}/60 chars)`;
    }

    // Meta description
    if (formData.status === 'Published') {
      if (!formData.metaDescription.trim())
        newErrors.metaDescription = 'Required for published posts';
      else if (formData.metaDescription.length > 160)
        newErrors.metaDescription = `Too long (${formData.metaDescription.length}/160 chars)`;
    }

    // Content requirements for published
    if (formData.status === 'Published') {
      if (!hasMinimumHeadings(formData.content))
        newErrors.content = 'Content must contain at least one H2 heading';
      const wordCount = getWordCount(formData.content);
      if (wordCount < 300) newErrors.content = `Content is too short (${wordCount} words, minimum 300)`;
    }

    return newErrors;
  };

  const saveDraft = async () => {
    try {
      const payload = { ...formData, updatedAt: new Date() };
      if (imageFile) {
        payload.coverImageUrl = await uploadImageToFirebase(imageFile, 'blogs');
      }
      if (isEditing) {
        await blogsService.updateBlog(id, payload);
        setSuccessMessage('Draft autosaved');
        setTimeout(() => setSuccessMessage(''), 1500);
      } else {
        const newId = await blogsService.createBlog(payload);
        // navigate to edit view to keep consistent autosaves
        navigate(`/admin/blogs/${newId}`);
      }
    } catch (err) {
      console.error('Autosave failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSuccessMessage('');

    try {
      let imageUrl = formData.coverImageUrl;
      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile, 'blogs');
      }

      const payload = {
        ...formData,
        coverImageUrl: imageUrl || '',
        tags: Array.isArray(formData.tags) ? formData.tags : [],
        updatedAt: new Date(),
      };

      if (formData.status === 'Published' && !formData.publishDate) {
        payload.publishDate = new Date();
      }

      if (isEditing) {
        await blogsService.updateBlog(id, payload);
        setSuccessMessage('Blog updated successfully');
        setTimeout(() => navigate('/admin/blogs'), 1200);
      } else {
        await blogsService.createBlog({ ...payload, createdAt: new Date() });
        setSuccessMessage('Blog created successfully');
        setTimeout(() => navigate('/admin/blogs'), 1200);
      }
    } catch (err) {
      console.error('Save blog failed:', err);
      setErrors({ general: 'Failed to save blog' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading…</div>;

  const seoScore = generateSeoScore(formData);
  const canPublish =
    formData.status === 'Draft' ||
    (seoScore.score >= 60 &&
      formData.title &&
      formData.slug &&
      formData.metaTitle &&
      formData.metaDescription &&
      hasMinimumHeadings(formData.content) &&
      getWordCount(formData.content) > 300);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
          {isEditing ? 'Edit Blog' : 'Create Blog'}
        </h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: showPreview ? '#667eea' : 'white',
              color: showPreview ? 'white' : '#374151',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {showPreview ? '👁️ Preview On' : '👁️ Preview Off'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: 'white',
              color: '#374151',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ← Back to list
          </button>
        </div>
      </div>

      {/* Messages */}
      {errors.general && (
        <div style={{ background: '#FEE2E2', padding: 12, borderRadius: 8, color: '#991B1B', marginBottom: 16 }}>
          {errors.general}
        </div>
      )}
      {successMessage && (
        <div style={{ background: '#DCFCE7', padding: 12, borderRadius: 8, color: '#166534', marginBottom: 16 }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: showPreview ? '1fr 380px' : '1fr', gap: 24 }}>
        {/* Main Content Area */}
        <div>
          {/* Title & Slug */}
          <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 20 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Title *
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Blog post title"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: errors.title ? '2px solid #ef4444' : '1px solid #e5e7eb',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
              {errors.title && <div style={{ color: '#991b1b', fontSize: 13, marginTop: 4 }}>✗ {errors.title}</div>}
              <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
                {formData.title.length} characters
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Slug *
              </label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="url-friendly-slug"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: errors.slug ? '2px solid #ef4444' : '1px solid #e5e7eb',
                  fontSize: 14,
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
              {errors.slug && <div style={{ color: '#991b1b', fontSize: 13, marginTop: 4 }}>✗ {errors.slug}</div>}
              <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
                blog/solidevelectrosoft.com/{formData.slug || 'slug'}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief summary for listings and search results (auto-generated from content if empty)"
              style={{
                width: '100%',
                minHeight: 80,
                padding: '10px 12px',
                borderRadius: 8,
                border: errors.excerpt ? '2px solid #ef4444' : '1px solid #e5e7eb',
                fontSize: 14,
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
            />
            {errors.excerpt && <div style={{ color: '#991b1b', fontSize: 13, marginTop: 4 }}>✗ {errors.excerpt}</div>}
            <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
              {formData.excerpt.length}/160 characters
              {formData.excerpt.length > 160 && (
                <span style={{ color: '#f59e0b', marginLeft: 8 }}>⚠️ Too long for search results</span>
              )}
            </div>
          </div>

          {/* Rich Text Editor */}
          <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>
              Content *
            </label>
            <BlogEditor content={formData.content} onChange={handleContentChange} errors={errors} />
          </div>

          {/* Meta Fields */}
          <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 20 }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
              SEO & Social Media
            </h3>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Meta Title {formData.status === 'Published' && <span style={{ color: '#ef4444' }}>*</span>}
              </label>
              <input
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleInputChange}
                placeholder="Browser tab & search results (under 60 chars)"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: errors.metaTitle ? '2px solid #ef4444' : '1px solid #e5e7eb',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
              {errors.metaTitle && <div style={{ color: '#991b1b', fontSize: 13, marginTop: 4 }}>✗ {errors.metaTitle}</div>}
              <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
                {formData.metaTitle.length}/60 characters
                {formData.metaTitle.length > 60 && (
                  <span style={{ color: '#f59e0b', marginLeft: 8 }}>⚠️ Will be truncated</span>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Meta Description {formData.status === 'Published' && <span style={{ color: '#ef4444' }}>*</span>}
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                placeholder="Shown in search results (under 160 chars)"
                style={{
                  width: '100%',
                  minHeight: 70,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: errors.metaDescription ? '2px solid #ef4444' : '1px solid #e5e7eb',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
              {errors.metaDescription && <div style={{ color: '#991b1b', fontSize: 13, marginTop: 4 }}>✗ {errors.metaDescription}</div>}
              <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
                {formData.metaDescription.length}/160 characters
                {formData.metaDescription.length > 160 && (
                  <span style={{ color: '#f59e0b', marginLeft: 8 }}>⚠️ Will be truncated</span>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Canonical URL
              </label>
              <input
                name="canonicalUrl"
                value={formData.canonicalUrl}
                onChange={handleInputChange}
                placeholder="https://solidevelectrosoft.com/blog/your-slug"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 14,
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
                Tells search engines the primary URL for this content (optional)
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                OG Title
              </label>
              <input
                name="ogTitle"
                value={formData.ogTitle}
                onChange={handleInputChange}
                placeholder="How it appears on social media (defaults to meta title)"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                OG Description
              </label>
              <textarea
                name="ogDescription"
                value={formData.ogDescription}
                onChange={handleInputChange}
                placeholder="How it appears on social media (defaults to meta description)"
                style={{
                  width: '100%',
                  minHeight: 70,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                OG Image
              </label>
              <input
                type="text"
                name="ogImage"
                value={formData.ogImage}
                onChange={handleInputChange}
                placeholder="Full image URL for social sharing (defaults to cover image)"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 14,
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Publish Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '12px 24px',
                background: '#667eea',
                color: 'white',
                borderRadius: 8,
                border: 'none',
                fontSize: 14,
                fontWeight: 600,
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? 'Saving…' : formData.status === 'Published' ? '✓ Publish' : '📝 Save Draft'}
            </button>
            <button
              type="button"
              onClick={() =>
                window.open(`/blog/${formData.slug}`, '_blank')
              }
              disabled={!formData.slug}
              style={{
                padding: '12px 24px',
                background: '#f3f4f6',
                color: '#374151',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 14,
                fontWeight: 600,
                cursor: !formData.slug ? 'not-allowed' : 'pointer',
                opacity: !formData.slug ? 0.6 : 1,
              }}
            >
              👁️ Preview
            </button>
          </div>
        </div>

        {/* Preview Sidebar */}
        {showPreview && (
          <aside>
            <BlogPreview formData={formData} />

            {/* Cover Image */}
            <div style={{ marginBottom: 20, marginTop: 20 }}>
              <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
                Cover Image
              </h3>
              <ImageUploader onImageSelected={handleImageSelected} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="cover"
                  style={{
                    width: '100%',
                    marginTop: 12,
                    borderRadius: 8,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
              )}
              {errors.coverImageUrl && (
                <div style={{ color: '#991b1b', fontSize: 13, marginTop: 4 }}>✗ {errors.coverImageUrl}</div>
              )}
            </div>

            {/* Category & Tags */}
            <div
              style={{
                background: '#f9fafb',
                padding: 16,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 13 }}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: '1px solid #e5e7eb',
                  fontSize: 13,
                  boxSizing: 'border-box',
                }}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, marginTop: 12, fontSize: 13 }}>
                Tags (comma separated)
              </label>
              <input
                name="tags"
                value={formData.tags.join(', ')}
                onChange={handleInputChange}
                placeholder="e.g. react, javascript, engineering"
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: '1px solid #e5e7eb',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Status & Publish Date */}
            <div
              style={{
                background: '#f9fafb',
                padding: 16,
                borderRadius: 8,
              }}
            >
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 13 }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: '1px solid #e5e7eb',
                  fontSize: 13,
                  boxSizing: 'border-box',
                  marginBottom: 12,
                }}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>

              {formData.status === 'Published' && (
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 13 }}>
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    name="publishDate"
                    value={
                      formData.publishDate
                        ? new Date(
                            formData.publishDate.seconds
                              ? formData.publishDate.seconds * 1000
                              : formData.publishDate
                          )
                            .toISOString()
                            .slice(0, 16)
                        : ''
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        publishDate: e.target.value
                          ? new Date(e.target.value)
                          : null,
                      }))
                    }
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 6,
                      border: '1px solid #e5e7eb',
                      fontSize: 13,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              )}

              {formData.status === 'Published' && !canPublish && (
                <div
                  style={{
                    marginTop: 12,
                    padding: 12,
                    background: '#fef3c7',
                    borderRadius: 6,
                    border: '1px solid #fcd34d',
                    color: '#92400e',
                    fontSize: 12,
                  }}
                >
                  ⚠️ Check SEO score and fill required fields before publishing
                </div>
              )}
            </div>
          </aside>
        )}
      </form>
    </div>
  );
};

export default BlogForm;