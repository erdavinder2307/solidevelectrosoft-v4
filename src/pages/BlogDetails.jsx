import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import { FloatingCTA } from '../components/ui';
import { useAIAssistant } from '../hooks/useAIAssistant';
import * as blogsService from '../services/blogsService';
import { getReadingTime, formatReadingTime } from '../utils/blogUtils';
import { siteConfig } from '../utils/seo';

const safeSetMeta = (name, content) => {
  if (!content) return;
  let el = document.querySelector(`meta[name=\"${name}\"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const BlogDetails = () => {
  const { slug } = useParams();
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, [slug]);

  const fetch = async () => {
    try {
      setLoading(true);
      const b = await blogsService.getBlogBySlug(slug);
      if (!b) {
        setBlog(null);
        return;
      }
      setBlog(b);

      // SEO
      document.title = b.metaTitle || b.title || siteConfig.defaultTitle;
      safeSetMeta('description', b.metaDescription || b.excerpt || siteConfig.defaultDescription);
      
      // Open Graph
      const ogTitleEl = document.querySelector("meta[property='og:title']");
      if (!ogTitleEl) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.setAttribute('content', b.ogTitle || b.title);
        document.head.appendChild(meta);
      } else ogTitleEl.setAttribute('content', b.ogTitle || b.title);

      const ogDescEl = document.querySelector("meta[property='og:description']");
      if (!ogDescEl) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.setAttribute('content', b.ogDescription || b.excerpt);
        document.head.appendChild(meta);
      } else ogDescEl.setAttribute('content', b.ogDescription || b.excerpt);

      const ogImageEl = document.querySelector("meta[property='og:image']");
      if (!ogImageEl && (b.ogImage || b.coverImageUrl)) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.setAttribute('content', b.ogImage || b.coverImageUrl);
        document.head.appendChild(meta);
      } else if (ogImageEl) ogImageEl.setAttribute('content', b.ogImage || b.coverImageUrl || '');

      // canonical
      const canonical = document.querySelector("link[rel='canonical']");
      if (canonical) canonical.setAttribute('href', `${siteConfig.siteUrl}/blog/${b.slug}`);

      // JSON-LD schema
      const existing = document.getElementById('blog-schema');
      if (existing) existing.remove();

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': b.title,
        'description': b.excerpt,
        'image': b.coverImageUrl || undefined,
        'author': { '@type': 'Organization', 'name': siteConfig.organization.name },
        'datePublished': b.publishDate ? (b.publishDate.seconds ? new Date(b.publishDate.seconds * 1000).toISOString() : new Date(b.publishDate).toISOString()) : undefined,
        'dateModified': b.updatedAt ? (b.updatedAt.seconds ? new Date(b.updatedAt.seconds * 1000).toISOString() : new Date(b.updatedAt).toISOString()) : undefined,
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'blog-schema';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <ModernHeader />
        <div style={{ paddingTop: '200px', textAlign: 'center', minHeight: '100vh' }}>
          <div
            style={{
              display: 'inline-block',
              width: '48px',
              height: '48px',
              border: '4px solid #f3f4f6',
              borderTopColor: '#667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
        <ModernFooter onQuoteClick={openAI} />
      </>
    );

  if (!blog)
    return (
      <>
        <ModernHeader />
        <div style={{ paddingTop: '200px', textAlign: 'center', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '24px', color: '#111827' }}>Blog not found</h1>
          <p style={{ color: '#6b7280', marginTop: '12px' }}>
            <a href="/blog" style={{ color: '#667eea' }}>
              ← Back to blog
            </a>
          </p>
        </div>
        <ModernFooter onQuoteClick={openAI} />
      </>
    );

  const date = blog.publishDate
    ? new Date(
        blog.publishDate.seconds ? blog.publishDate.seconds * 1000 : blog.publishDate
      ).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const readingTime = getReadingTime(blog.content || '');

  return (
    <>
      <ModernHeader />
      <main style={{ paddingTop: '80px' }}>
        {/* Article Header */}
        <section style={{ paddingBottom: '60px', borderBottom: '1px solid #e5e7eb' }}>
          <div className="modern-container">
            <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '40px' }}>
              <div style={{ marginBottom: '16px' }}>
                {blog.category && (
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: 'rgba(102, 126, 234, 0.1)',
                      borderRadius: '100px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#667eea',
                    }}
                  >
                    {blog.category}
                  </span>
                )}
              </div>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: '700',
                  color: '#111827',
                  lineHeight: '1.2',
                  marginBottom: '20px',
                  marginTop: '12px',
                }}
              >
                {blog.title}
              </h1>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', color: '#6b7280', fontSize: '15px' }}>
                <span>📅 {date}</span>
                <span>⏱️ {formatReadingTime(readingTime)}</span>
                {blog.tags && blog.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {blog.coverImageUrl && (
          <section style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <div className="modern-container">
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                style={{
                  width: '100%',
                  maxWidth: '900px',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  display: 'block',
                  margin: '0 auto',
                }}
                loading="lazy"
              />
            </div>
          </section>
        )}

        {/* Article Content */}
        <article style={{ paddingTop: '40px', paddingBottom: '80px' }}>
          <div className="modern-container">
            <div
              style={{
                maxWidth: '900px',
                margin: '0 auto',
              }}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content || '' }}
            />
          </div>
        </article>
      </main>

      <FloatingCTA onQuoteClick={openAI} />
      <ModernFooter onQuoteClick={openAI} />

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .blog-content {
          font-size: 16px;
          line-height: 1.8;
          color: #4b5563;
        }

        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
          line-height: 1.3;
        }

        .blog-content h2:first-child {
          margin-top: 0;
        }

        .blog-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
          color: #1f2937;
          line-height: 1.4;
        }

        .blog-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          color: #374151;
          line-height: 1.5;
        }

        .blog-content p {
          margin-bottom: 1.25rem;
          color: #4b5563;
          line-height: 1.8;
        }

        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.25rem;
          padding-left: 2rem;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
          color: #4b5563;
          line-height: 1.8;
        }

        .blog-content blockquote {
          border-left: 4px solid #667eea;
          padding-left: 1.5rem;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 1.25rem;
          color: #6b7280;
          font-style: italic;
        }

        .blog-content pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin-bottom: 1.25rem;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .blog-content code {
          background: #f9fafb;
          color: #7c3aed;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
        }

        .blog-content pre code {
          background: none;
          color: #f3f4f6;
          padding: 0;
          border-radius: 0;
        }

        .blog-content a {
          color: #667eea;
          text-decoration: underline;
        }

        .blog-content a:hover {
          color: #5568d3;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5rem 0;
          display: block;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .blog-content strong {
          font-weight: 700;
          color: #111827;
        }

        .blog-content em {
          font-style: italic;
        }
      `}</style>
    </>
  );
};

export default BlogDetails;