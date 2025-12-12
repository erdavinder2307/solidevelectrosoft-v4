import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductGrid } from '../products';
import productsData from '../../data/productsData';

/**
 * ProductsSection Component
 * Full section displaying all Solidev products
 */
const ProductsSection = ({
  badge = "Our Products",
  title = "Apps & Platforms",
  titleHighlight = "We've Built",
  subtitle = "Explore the apps and platforms we have built for real users. From healthcare to fitness, we create solutions that make a difference.",
  showFilter = true,
  maxProducts = null, // null = show all
  showViewAll = false,
  variant = 'light', // 'light' | 'dark'
}) => {
  const displayProducts = maxProducts ? productsData.slice(0, maxProducts) : productsData;
  const isDark = variant === 'dark';

  return (
    <section
      className={isDark ? 'modern-section-lg modern-bg-dark' : 'modern-section-lg'}
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' 
          : '#f9fafb',
      }}
    >
      <div className="modern-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto 48px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: '500',
              color: isDark ? '#60a5fa' : '#3b82f6',
              marginBottom: '16px',
            }}
          >
            {badge}
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: isDark ? '#ffffff' : '#111827',
              lineHeight: '1.2',
              marginBottom: '16px',
            }}
          >
            {title}{' '}
            <span style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}>{titleHighlight}</span>
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              color: isDark ? '#9ca3af' : '#6b7280',
              lineHeight: '1.7',
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          {[
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
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '16px 24px',
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderRadius: '16px',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e5e7eb',
                minWidth: '140px',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: isDark ? '#60a5fa' : '#3b82f6',
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: isDark ? '#9ca3af' : '#6b7280',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Products Grid */}
        <ProductGrid products={displayProducts} showFilter={showFilter} />

        {/* View All Button */}
        {showViewAll && maxProducts && productsData.length > maxProducts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              textAlign: 'center',
              marginTop: '48px',
            }}
          >
            <Link
              to="/products"
              className={isDark ? 'modern-btn modern-btn-white' : 'modern-btn modern-btn-primary'}
            >
              View All Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
