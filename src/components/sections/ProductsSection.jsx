import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ProductGrid } from '../products';
import productsData from '../../data/productsData';

import { FaBox, FaRocket, FaMobileAlt, FaGlobe } from 'react-icons/fa';

/**
 * ProductsSection Component
 * Full section displaying Solidev products from Firebase
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDark = variant === 'dark';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from Firebase first
      const productsQuery = query(
        collection(db, 'products'),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(productsQuery);
      const firebaseProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Sort by displayOrder
      firebaseProducts.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      
      setProducts(firebaseProducts.length > 0 ? firebaseProducts : productsData);
    } catch (error) {
      console.warn('Firebase fetch failed, falling back to static data:', error);
      // Fall back to static data if Firebase fails
      setProducts(productsData);
    } finally {
      setLoading(false);
    }
  };

  const displayProducts = maxProducts ? products.slice(0, maxProducts) : products;

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

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div
              style={{
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '3px solid rgba(59, 130, 246, 0.2)',
                borderTopColor: '#3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            <p style={{ marginTop: '16px', color: isDark ? '#9ca3af' : '#6b7280' }}>
              Loading products...
            </p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Stats Row */}
        {!loading && (
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
                {(() => {
                  const Icon = stat.icon;
                  return (
                    <div style={{ marginBottom: '4px', color: isDark ? '#60a5fa' : '#3b82f6' }}>
                      <Icon size={24} />
                    </div>
                  );
                })()}
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
        )}

        {/* Products Grid */}
        {!loading && <ProductGrid products={displayProducts} showFilter={showFilter} />}

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
