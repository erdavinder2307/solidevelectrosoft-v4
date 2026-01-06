import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import { FloatingCTA } from '../components/ui';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { pageSEO, generateTitle, generateCanonicalURL } from '../utils/seo';
import * as blogsService from '../services/blogsService';
import BlogCard from '../components/blog/BlogCard';
import CTABanner from '../components/sections/CTABanner';

const ModernBlog = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);

  useEffect(() => {
    document.title = generateTitle('Blog');
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) canonical.setAttribute('href', generateCanonicalURL('/blog'));
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) metaDesc.setAttribute('content', 'Latest articles and updates from Solidev Electrosoft. Insights on software development, AI, and digital transformation.');

    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogsService.fetchPublishedBlogs();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const featured = blogs[0];
  const rest = blogs.slice(1);
  const paginated = rest.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(rest.length / perPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <ModernHeader />
      <main style={{ paddingTop: '80px' }}>
        {/* Hero Section */}
        <section 
          style={{
            paddingTop: '160px',
            paddingBottom: '80px',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Effects */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
            >
              <span 
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#60a5fa',
                  marginBottom: '24px',
                }}
              >
                Blog & Insights
              </span>
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.1',
                  marginBottom: '24px',
                }}
              >
                Engineering Insights &{' '}
                <span style={{ color: '#60a5fa' }}>Industry Trends</span>
              </h1>
              <p
                style={{
                  fontSize: '1.25rem',
                  color: '#9ca3af',
                  lineHeight: '1.7',
                  maxWidth: '700px',
                  margin: '0 auto',
                }}
              >
                Deep-dive articles on software development, AI solutions, cloud architecture, and lessons learned from 13+ years of shipping production systems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Content Section */}
        <section className="modern-section-lg">
          <div className="modern-container">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
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
            ) : blogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ color: '#6b7280', fontSize: '18px' }}>No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '60px' }}>
                {/* Featured Blog */}
                {featured && (
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '60px',
                      alignItems: 'center',
                    }}
                    className="featured-blog-grid"
                  >
                    <div>
                      {featured.coverImageUrl && (
                        <img
                          src={featured.coverImageUrl}
                          alt={featured.title}
                          style={{
                            width: '100%',
                            borderRadius: '16px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                          }}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div>
                      <span 
                        style={{
                          display: 'inline-block',
                          padding: '8px 16px',
                          background: 'rgba(59, 130, 246, 0.1)',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#3b82f6',
                          marginBottom: '16px',
                        }}
                      >
                        Featured
                      </span>
                      <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#111827', lineHeight: '1.2', marginBottom: '16px' }}>
                        {featured.title}
                      </h2>
                      <p style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.8', marginBottom: '24px' }}>
                        {featured.excerpt}
                      </p>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                        {featured.category && (
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>{featured.category}</span>
                        )}
                        {featured.publishDate && (
                          <span style={{ fontSize: '14px', color: '#9ca3af' }}>
                            {new Date(featured.publishDate.seconds ? featured.publishDate.seconds * 1000 : featured.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <a
                        href={`/blog/${featured.slug}`}
                        className="modern-btn modern-btn-primary"
                      >
                        Read Full Article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  </motion.section>
                )}

                {/* Blog Grid */}
                {rest.length > 0 && (
                  <div>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '32px',
                        marginBottom: '48px',
                      }}
                    >
                      {paginated.map((blog) => (
                        <motion.div key={blog.id} variants={itemVariants}>
                          <BlogCard blog={blog} />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
                        <button
                          onClick={() => setPage(Math.max(1, page - 1))}
                          disabled={page === 1}
                          style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            background: page === 1 ? '#f9fafb' : 'white',
                            color: page === 1 ? '#9ca3af' : '#374151',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          ← Previous
                        </button>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                border: p === page ? '1px solid #667eea' : '1px solid #e5e7eb',
                                background: p === page ? '#667eea' : 'white',
                                color: p === page ? 'white' : '#374151',
                                fontSize: '14px',
                                fontWeight: p === page ? '600' : '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                            >
                              {p}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setPage(Math.min(totalPages, page + 1))}
                          disabled={page === totalPages}
                          style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            background: page === totalPages ? '#f9fafb' : 'white',
                            color: page === totalPages ? '#9ca3af' : '#374151',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: page === totalPages ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          Next →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <CTABanner
          variant="gradient"
          title="Got a Project Idea?"
          subtitle="Let's discuss how we can help bring your vision to life with expert software development."
          primaryCTA={{
            text: '✨ Chat with AI',
            link: '/contact',
          }}
          secondaryCTA={{
            text: 'View Our Work',
            link: '/portfolio',
          }}
        />
      </main>

      <ModernFooter onQuoteClick={openAI} />
      <FloatingCTA onQuoteClick={openAI} />

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .featured-blog-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default ModernBlog;