import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaGlobe, FaCheck } from 'react-icons/fa';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import { db } from '../config/firebase';
import PlaceholderImage from '../components/products/PlaceholderImage';
import { trackProductViewed, trackProductScreenshotsOpened, trackExternalLinkClicked } from '../utils/analytics';
import { useSEO } from '../hooks/useSEO';
import { generateSoftwareApplicationSchema, generateBreadcrumbSchema } from '../utils/structuredData';

/**
 * Product Details Page
 * App store-like detailed view of a product with all information
 */
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);
  const [showAllScreenshots, setShowAllScreenshots] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (e) => setIsMobile(e.matches);
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const docSnap = await getDoc(doc(db, 'products', id));
      if (docSnap.exists()) {
        setProduct({
          id: docSnap.id,
          ...docSnap.data(),
        });
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product) {
      // GA4 EVENT: Track product view
      // Business value: Measures which products get the most attention
      trackProductViewed(product.id, product.title);
      
      // SEO: Update meta tags dynamically
      useSEO({
        title: product.title,
        description: product.description || `${product.title} - Custom software application by Solidev Electrosoft`,
        canonical: `/product/${product.id}`,
        ogImage: product.thumbnailUrl || product.logo,
        ogType: 'product',
        schemas: [
          generateSoftwareApplicationSchema(product),
          generateBreadcrumbSchema([
            { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
            { name: 'Products', url: 'https://www.solidevelectrosoft.com/products' },
            { name: product.title, url: `https://www.solidevelectrosoft.com/product/${product.id}` },
          ]),
        ],
      });
    }
  }, [product]);

  if (loading) {
    return (
      <>
        <ModernHeader />
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
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
        <ModernFooter />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <ModernHeader />
        <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>❌ {error || 'Product not found'}</h2>
          <button
            onClick={() => navigate('/products')}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            ← Back to Products
          </button>
        </div>
        <ModernFooter />
      </>
    );
  }

  const screenshots = product.screenshots || [];
  const features = product.features || [];
  const technologies = product.technologies || [];
  const currentScreenshot = screenshots[selectedScreenshot];

  return (
    <>
      <ModernHeader />
      <main style={{ background: '#ffffff', paddingTop: '80px' }}>
        {/* Product Hero Section */}
        <section style={{ padding: 'clamp(24px, 6vw, 48px) 16px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(24px, 4vw, 40px)',
                alignItems: 'start',
              }}
            >
              {/* Left: Logo and Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: isMobile ? 'center' : 'left' }}
              >
                {/* Product Logo */}
                <div
                  style={{
                    width: 'clamp(96px, 18vw, 120px)',
                    height: 'clamp(96px, 18vw, 120px)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: isMobile ? '0 auto 24px' : '0 0 24px 0',
                    border: '2px solid #e5e7eb',
                  }}
                >
                  {product.logo ? (
                    <img
                      src={product.logo}
                      alt={product.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <PlaceholderImage width={120} height={120} />
                  )}
                </div>

                {/* Title and Category */}
                <h1 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                  {product.title}
                </h1>
                <p style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', color: '#667eea', fontWeight: '500', marginBottom: '16px' }}>
                  {product.category}
                </p>

                {/* Status Badge */}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    background: product.status === 'active' ? '#dcfce7' : '#fef3c7',
                    color: product.status === 'active' ? '#166534' : '#92400e',
                    marginBottom: '24px',
                    marginLeft: isMobile ? 'auto' : 0,
                    marginRight: isMobile ? 'auto' : 0,
                  }}
                >
                  {product.status}
                </span>

                {/* Action Buttons */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '12px',
                    alignItems: 'stretch',
                  }}
                >
                  {/* Web App Button */}
                  {product.webAppUrl && (
                    <a
                      href={product.webAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        // GA4 EVENT: Track external link clicks
                        // Business value: Measures interest in live demos
                        trackExternalLinkClicked('website');
                      }}
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: '#667eea',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <FaGlobe size={16} />
                      Open Web App
                    </a>
                  )}

                  {/* Android Button (Solidev Store) */}
                  {product.androidAppUrl && (
                    <a
                      href={product.androidAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLinkClicked('app_store')}
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: '#34a853',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <FaGooglePlay size={16} />
                      Solidev Store
                    </a>
                  )}

                  {/* Direct APK Download */}
                  {product.directApkUrl && (
                    <a
                      href={product.directApkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLinkClicked('direct_download')}
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: '#0f766e',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <span style={{ fontWeight: '700' }}>⬇️</span>
                      Direct Download
                    </a>
                  )}

                  {/* iOS Button */}
                  {product.iosAppUrl && (
                    <a
                      href={product.iosAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLinkClicked('app_store')}
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: '#000000',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <FaApple size={16} />
                      App Store
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Right: Screenshots - Full Width 16:9 */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                {screenshots.length > 0 ? (
                  <>
                    {/* Main Screenshot - 16:9 Ratio */}
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '16/9',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#f3f4f6',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      {currentScreenshot?.url ? (
                        <img
                          src={currentScreenshot.url}
                          alt={`Screenshot ${selectedScreenshot + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <PlaceholderImage width="100%" height="100%" />
                      )}
                    </div>

                    {/* Thumbnail Strip */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        overflowX: 'auto',
                        paddingBottom: '8px',
                        scrollbarWidth: 'thin',
                      }}
                    >
                      {screenshots.map((screenshot, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedScreenshot(idx);
                            // GA4 EVENT: Track screenshot engagement (first click only)
                            // Business value: Measures deep product interest
                            if (idx !== selectedScreenshot && idx === 1) {
                              trackProductScreenshotsOpened(product.id);
                            }
                          }}
                          style={{
                            flex: '0 0 88px',
                            width: '88px',
                            height: '52px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: selectedScreenshot === idx ? '3px solid #667eea' : '2px solid #e5e7eb',
                            background: '#f3f4f6',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            padding: '0',
                          }}
                          onMouseEnter={(e) => {
                            if (selectedScreenshot !== idx) {
                              e.currentTarget.style.borderColor = '#d1d5db';
                            }
                          }}
                        >
                          <img
                            src={screenshot.url}
                            alt={`Thumbnail ${idx + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '16px',
                      background: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      fontSize: '14px',
                    }}
                  >
                    No screenshots available
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section
          style={{
            padding: 'clamp(24px, 6vw, 48px) 16px',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            background: '#f9fafb',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              About
            </h2>
            <p
              style={{
                fontSize: 'clamp(14px, 3.6vw, 15px)',
                color: '#4b5563',
                lineHeight: '1.8',
                maxWidth: '800px',
              }}
            >
              {product.description}
            </p>
          </div>
        </section>

        {/* Features Section */}
        {features.length > 0 && (
          <section style={{ padding: 'clamp(24px, 6vw, 48px) 16px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                Features
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '14px',
                      borderRadius: '10px',
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                    }}
                  >
                    <div style={{ color: '#667eea', marginTop: '2px' }}>
                      <FaCheck size={16} />
                    </div>
                    <p style={{ fontSize: '14px', color: '#4b5563', margin: '0' }}>{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technologies Section */}
        {technologies.length > 0 && (
          <section
            style={{
              padding: 'clamp(24px, 6vw, 48px) 16px',
              borderTop: '1px solid #e5e7eb',
              background: '#f9fafb',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                Built With
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '18px',
                      background: '#667eea',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <ModernFooter />
    </>
  );
};

export default ProductDetails;
