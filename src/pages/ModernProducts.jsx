import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import { ProductGrid } from '../components/products';
import CTABanner from '../components/sections/CTABanner';
import { FloatingCTA } from '../components/ui';
import productsData from '../data/productsData';

/**
 * Modern Products Page
 * Showcases all Solidev products and apps
 */
const ModernProducts = () => {
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
    canonical.setAttribute('href', 'https://solidev.in/products');

    // Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: 'Products',
        page_location: window.location.href,
        page_path: '/products',
      });
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { 
      number: productsData.length, 
      label: 'Total Products',
      icon: '📦',
    },
    { 
      number: productsData.filter(p => p.status === 'LIVE').length, 
      label: 'Live Apps',
      icon: '🚀',
    },
    { 
      number: productsData.filter(p => p.platform.includes('Mobile')).length, 
      label: 'Mobile Apps',
      icon: '📱',
    },
    { 
      number: productsData.filter(p => p.platform.includes('Web')).length, 
      label: 'Web Platforms',
      icon: '🌐',
    },
  ];

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
                From healthcare to fitness, we create solutions that make a difference.
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
              {stats.map((stat, index) => (
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
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
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
              ))}
            </motion.div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="modern-section-lg" style={{ background: '#f9fafb' }}>
          <div className="modern-container">
            <ProductGrid products={productsData} showFilter={true} />
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
                  icon: '🎨',
                  title: 'Beautiful Design',
                  description: 'Clean, intuitive interfaces that users love to interact with.',
                },
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  description: 'Optimized performance for smooth, responsive experiences.',
                },
                {
                  icon: '🔒',
                  title: 'Secure by Default',
                  description: 'Enterprise-grade security built into every layer.',
                },
                {
                  icon: '📱',
                  title: 'Cross-Platform',
                  description: 'Works seamlessly across web, iOS, and Android.',
                },
                {
                  icon: '🔄',
                  title: 'Regular Updates',
                  description: 'Continuous improvements based on user feedback.',
                },
                {
                  icon: '💬',
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
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>{feature.icon}</div>
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
      <ModernFooter />
      <FloatingCTA />

      {/* Responsive Styles */}
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
    </>
  );
};

export default ModernProducts;
