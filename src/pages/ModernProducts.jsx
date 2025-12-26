import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBox, FaRocket, FaMobileAlt, FaGlobe, FaPalette, FaBolt, FaLock, FaSyncAlt, FaComments } from 'react-icons/fa';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import { ProductGrid } from '../components/products';
import CTABanner from '../components/sections/CTABanner';
import { FloatingCTA } from '../components/ui';
import AIProjectAssistant from '../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../utils/seo';
import { getCommonSchemas, generateBreadcrumbSchema } from '../utils/structuredData';

/**
 * Modern Products Page
 * Showcases all Solidev products and apps
 */
const ModernProducts = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryModal, setGalleryModal] = useState({ isOpen: false, product: null, currentIndex: 0 });

  // SEO Configuration
  useSEO({
    title: pageSEO.products.title,
    description: pageSEO.products.description,
    keywords: pageSEO.products.keywords,
    canonical: pageSEO.products.canonical,
    ogType: pageSEO.products.ogType,
    schemas: [
      ...getCommonSchemas(),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
        { name: 'Products', url: 'https://www.solidevelectrosoft.com/products' },
      ]),
    ],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productsQuery = query(
        collection(db, 'products'),
        where('status', '!=', 'archived'),
        orderBy('status'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(productsQuery);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Sort by displayOrder
      productsData.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // SEO
    document.title = 'Our Products | Solidev Electrosoft - Apps & Platforms';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        'Explore our portfolio of apps and platforms. From healthcare systems to fitness trackers, ' +
        'discover the products we\'ve built for real users worldwide.'
      );
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.solidevelectrosoft.com/products');

    // Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: 'Products',
        page_location: window.location.href,
        page_path: '/products',
      });
    }
  }, []);

  const stats = [
    { 
      number: products.length, 
      label: 'Total Products',
      icon: FaBox,
    },
    { 
      number: products.filter(p => p.featured).length, 
      label: 'Featured Apps',
      icon: FaRocket,
    },
    { 
      number: products.filter(p => p.category === 'Mobile App').length, 
      label: 'Mobile Apps',
      icon: FaMobileAlt,
    },
    { 
      number: products.filter(p => p.category !== 'Mobile App').length, 
      label: 'Web & Other',
      icon: FaGlobe,
    },
  ];

  // Loading state
  if (loading) {
    return (
      <>
        <ModernHeader />
        <main>
          <section style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
          }}>
            <div style={{ textAlign: 'center' }}>
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
              <p style={{ marginTop: '20px', fontSize: '16px', color: '#6b7280' }}>
                Loading products...
              </p>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </section>
        </main>
        <ModernFooter onQuoteClick={openAI} />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <ModernHeader />
        <main>
          <section style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
          }}>
            <div style={{ textAlign: 'center', maxWidth: '500px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚠️</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '12px' }}>
                Failed to Load Products
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
                {error}
              </p>
              <button
                onClick={fetchProducts}
                style={{
                  padding: '12px 24px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            </div>
          </section>
        </main>
        <ModernFooter onQuoteClick={openAI} />
      </>
    );
  }

  return (
    <>
      <ModernHeader />
      <main>
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
              top: '10%',
              right: '-15%',
              width: '700px',
              height: '700px',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              left: '-10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
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
                Our Products
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
                Apps & Platforms{' '}
                <span style={{ color: '#60a5fa' }}>We've Built</span>
              </h1>
              <p
                style={{
                  fontSize: '1.25rem',
                  color: '#9ca3af',
                  lineHeight: '1.7',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                Explore the apps and platforms we have built for real users. 
                From healthcare to fitness, we create solutions that make a difference.{' '}
                <Link to="/services" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '600' }}>
                  Learn about our development process
                </Link>.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                marginTop: '48px',
                flexWrap: 'wrap',
              }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    style={{
                      textAlign: 'center',
                      padding: '20px 28px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      minWidth: '150px',
                    }}
                  >
                    <div style={{ marginBottom: '8px', color: '#60a5fa' }}>
                      <Icon size={28} />
                    </div>
                    <div
                      style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#60a5fa',
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#9ca3af',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="modern-section-lg" style={{ background: '#f9fafb' }}>
          <div className="modern-container">
            <ProductGrid 
              products={products} 
              showFilter={true}
              onViewScreenshots={(product) => setGalleryModal({ isOpen: true, product, currentIndex: 0 })}
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="modern-section-lg">
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}
            >
              <span 
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#3b82f6',
                  marginBottom: '16px',
                }}
              >
                Why Our Products Stand Out
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '700',
                  color: '#111827',
                  lineHeight: '1.2',
                  marginBottom: '16px',
                }}
              >
                Built with Care, Designed to Perform
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.7' }}>
                Every product we build follows the same principles: user-first design, 
                robust architecture, and continuous improvement.
              </p>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px',
              }}
              className="features-grid"
            >
              {[
                {
                  icon: FaPalette,
                  title: 'Beautiful Design',
                  description: 'Clean, intuitive interfaces that users love to interact with.',
                },
                {
                  icon: FaBolt,
                  title: 'Lightning Fast',
                  description: 'Optimized performance for smooth, responsive experiences.',
                },
                {
                  icon: FaLock,
                  title: 'Secure by Default',
                  description: 'Enterprise-grade security built into every layer.',
                },
                {
                  icon: FaMobileAlt,
                  title: 'Cross-Platform',
                  description: 'Works seamlessly across web, iOS, and Android.',
                },
                {
                  icon: FaSyncAlt,
                  title: 'Regular Updates',
                  description: 'Continuous improvements based on user feedback.',
                },
                {
                  icon: FaComments,
                  title: 'Great Support',
                  description: 'Dedicated support team ready to help you succeed.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    padding: '32px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease',
                  }}
                  className="feature-card"
                >
                  {(() => {
                    const Icon = feature.icon;
                    return (
                      <div style={{ marginBottom: '16px', color: '#3b82f6' }}>
                        <Icon size={40} />
                      </div>
                    );
                  })()}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '8px',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTABanner
          variant="gradient"
          title="Have an App Idea?"
          subtitle="Let's build your next successful product together."
          primaryCTA={{
            text: 'Start Your Project',
            link: '/contact',
          }}
          secondaryCTA={{
            text: 'View Our Services',
            link: '/services',
          }}
        />
      </main>
      <ModernFooter onQuoteClick={openAI} />
      <FloatingCTA onQuoteClick={openAI} />
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />

      {/* Gallery Modal */}
      {galleryModal.isOpen && galleryModal.product && galleryModal.product.screenshots && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setGalleryModal({ isOpen: false, product: null, currentIndex: 0 })}
        >
          {/* Close Button */}
          <button
            onClick={() => setGalleryModal({ isOpen: false, product: null, currentIndex: 0 })}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            ×
          </button>

          {/* Image Counter */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '100px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {galleryModal.currentIndex + 1} / {galleryModal.product.screenshots.length}
          </div>

          {/* Previous Button */}
          {galleryModal.currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGalleryModal(prev => ({ ...prev, currentIndex: prev.currentIndex - 1 }));
              }}
              style={{
                position: 'absolute',
                left: '20px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              ‹
            </button>
          )}

          {/* Next Button */}
          {galleryModal.currentIndex < galleryModal.product.screenshots.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGalleryModal(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
              }}
              style={{
                position: 'absolute',
                right: '20px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              ›
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <img
              src={galleryModal.product.screenshots[galleryModal.currentIndex].url || galleryModal.product.screenshots[galleryModal.currentIndex]}
              alt={`${galleryModal.product.title || galleryModal.product.name} - Screenshot ${galleryModal.currentIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(90vh - 100px)',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              }}
            />
            <div
              style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              {galleryModal.product.title || galleryModal.product.name}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {galleryModal.product.screenshots.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                maxWidth: '90%',
                overflowX: 'auto',
              }}
            >
              {galleryModal.product.screenshots.map((screenshot, idx) => {
                const imgUrl = screenshot.url || screenshot;
                return (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setGalleryModal(prev => ({ ...prev, currentIndex: idx }))}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: idx === galleryModal.currentIndex ? '2px solid #667eea' : '2px solid transparent',
                      opacity: idx === galleryModal.currentIndex ? 1 : 0.6,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = idx === galleryModal.currentIndex ? '1' : '0.6'}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Responsive Styles */
      <style>{`
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        .feature-card:hover {
          border-color: #3b82f6 !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      }</>
  );
};

export default ModernProducts;
