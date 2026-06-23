/**
 * UpdateDetails Page
 * Handles /updates/:slug routes for company_update, founder_insight, milestone types.
 * Blog articles are handled by the existing /blog/:slug route.
 * Product updates/feature releases that have a relatedProductSlug route to /products/:slug.
 */
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';

function toDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (value.seconds !== undefined) return new Date(value.seconds * 1000);
  return new Date(value);
}

const TYPE_LABELS = {
  blog_article:    'Article',
  product_update:  'Product Update',
  feature_release: 'Feature Release',
  company_update:  'Company Update',
  founder_insight: 'Founder Insight',
  milestone:       'Milestone',
};

const UpdateDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.body.scrollTo?.(0, 0);
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const q = query(
          collection(db, 'feedPosts'),
          where('slug', '==', slug),
          where('isPublished', '==', true),
          limit(1)
        );
        const snap = await getDocs(q);
        if (!mounted) return;
        if (snap.empty) {
          setNotFound(true);
        } else {
          const d = snap.docs[0];
          const data = d.data();
          // Redirect blog articles to the blog page
          if (data.type === 'blog_article') {
            navigate(`/blog/${data.slug}`, { replace: true });
            return;
          }
          // Redirect product/feature to product page if slug available
          if ((data.type === 'product_update' || data.type === 'feature_release') && data.relatedProductSlug) {
            navigate(`/products/${data.relatedProductSlug}`, { replace: true });
            return;
          }
          setPost({ id: d.id, ...data, publishedDate: toDate(data.publishedDate) });

          // SEO
          document.title = `${data.seoTitle || data.title} | Solidev Electrosoft`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.content = data.seoDescription || data.summary || '';
          const canonical = document.querySelector('link[rel="canonical"]');
          const canonicalUrl = `https://www.solidevelectrosoft.com/updates/${slug}`;
          if (canonical) { canonical.href = canonicalUrl; }
          else {
            const el = document.createElement('link');
            el.rel = 'canonical'; el.href = canonicalUrl;
            document.head.appendChild(el);
          }
        }
      } catch (err) {
        console.error('UpdateDetails fetch error:', err);
        if (mounted) setNotFound(true);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [slug, navigate]);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <ModernHeader />
      <main style={{ minHeight: '60vh', background: '#fafafa', paddingTop: 80 }}>
        <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 24px 80px' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#a3a3a3' }}>
              <div style={{ width: 32, height: 32, border: '3px solid #e5e7eb', borderTopColor: '#0068d6', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 16px' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {!loading && notFound && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#171717', marginBottom: 12 }}>Post not found</h1>
              <p style={{ color: '#737373', marginBottom: 24 }}>This update may have been moved or removed.</p>
              <Link to="/" style={{ color: '#0068d6', fontWeight: 600, textDecoration: 'none' }}>← Back to home</Link>
            </div>
          )}

          {!loading && post && (
            <article>
              {/* Breadcrumb */}
              <nav style={{ marginBottom: 28 }} aria-label="Breadcrumb">
                <Link to="/" style={{ color: '#a3a3a3', fontSize: 13, textDecoration: 'none' }}>Home</Link>
                <span style={{ color: '#d4d4d4', margin: '0 8px', fontSize: 13 }}>/</span>
                <span style={{ color: '#737373', fontSize: 13 }}>Updates</span>
              </nav>

              {/* Type badge + date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{
                  background: '#f0f7ff', color: '#0068d6', padding: '3px 12px',
                  borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  {TYPE_LABELS[post.type] || 'Update'}
                </span>
                {post.publishedDate && (
                  <time style={{ fontSize: 13, color: '#a3a3a3' }} dateTime={new Date(post.publishedDate).toISOString()}>
                    {formatDate(post.publishedDate)}
                  </time>
                )}
              </div>

              {/* Title */}
              <h1 style={{ fontSize: 'clamp(1.625rem, 1.3rem + 1.5vw, 2.25rem)', fontWeight: 750, color: '#171717', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: 16 }}>
                {post.title}
              </h1>

              {/* Summary / lead */}
              {post.summary && (
                <p style={{ fontSize: '1.0625rem', color: '#525252', lineHeight: 1.65, marginBottom: 28, borderLeft: '3px solid #0085ff', paddingLeft: 16 }}>
                  {post.summary}
                </p>
              )}

              {/* Cover image */}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ width: '100%', borderRadius: 12, marginBottom: 32, objectFit: 'cover', maxHeight: 400, border: '1px solid #e5e5e5' }}
                  loading="eager"
                />
              )}

              {/* Related product */}
              {post.relatedProductName && (
                <Link
                  to={post.relatedProductSlug ? `/products/${post.relatedProductSlug}` : `/product/${post.relatedProductId}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: '#f0f7ff', color: '#0052ad', border: '1px solid #e0efff',
                    borderRadius: 7, padding: '5px 12px', fontSize: 12.5, fontWeight: 600,
                    textDecoration: 'none', marginBottom: 28,
                  }}
                >
                  📦 {post.relatedProductName}
                </Link>
              )}

              {/* Content body */}
              {post.content && (
                <div
                  style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.75 }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 32 }}>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{ background: '#f5f5f5', color: '#525252', padding: '3px 10px', borderRadius: 5, fontSize: 12, fontWeight: 500 }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Back link */}
              <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e5e5e5' }}>
                <Link to="/" style={{ color: '#0068d6', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  ← Back to home
                </Link>
              </div>
            </article>
          )}
        </div>
      </main>
      <ModernFooter />
    </>
  );
};

export default UpdateDetails;
