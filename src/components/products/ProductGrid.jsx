import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

/**
 * ProductGrid Component
 * Responsive grid layout for displaying products
 * 3 columns desktop, 2 tablet, 1 mobile
 */
const ProductGrid = ({ products, showFilter = true, onViewScreenshots }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'live', label: 'Live' },
    { id: 'coming-soon', label: 'Coming Soon' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'all') return true;
    
    // Normalize status for comparison
    const normalizedStatus = (product.status || 'active').toLowerCase();
    
    if (activeFilter === 'live') {
      return normalizedStatus === 'active' || normalizedStatus === 'live';
    }
    if (activeFilter === 'coming-soon') {
      return normalizedStatus === 'coming-soon' || normalizedStatus === 'coming soon';
    }
    if (activeFilter === 'web') {
      // Check platform array or category
      return product.platform?.includes('Web') || 
             product.category?.toLowerCase().includes('web') ||
             product.category === 'Web & Mobile';
    }
    if (activeFilter === 'mobile') {
      // Check platform array or category
      return product.platform?.includes('Mobile') || 
             product.category?.toLowerCase().includes('mobile') ||
             product.category === 'Web & Mobile';
    }
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      {/* Filter Tabs */}
      {showFilter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '100px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeFilter === filter.id ? '#3b82f6' : '#f3f4f6',
                color: activeFilter === filter.id ? '#ffffff' : '#6b7280',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter.id) {
                  e.currentTarget.style.background = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== filter.id) {
                  e.currentTarget.style.background = '#f3f4f6';
                }
              }}
            >
              {filter.label}
              {filter.id === 'live' && (
                <span
                  style={{
                    marginLeft: '8px',
                    padding: '2px 8px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    background: activeFilter === filter.id ? 'rgba(255,255,255,0.2)' : '#dcfce7',
                    color: activeFilter === filter.id ? '#ffffff' : '#166534',
                  }}
                >
                  {products.filter(p => {
                    const status = (p.status || 'active').toLowerCase();
                    return status === 'active' || status === 'live';
                  }).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>
      )}

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}
        className="products-grid"
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewScreenshots={onViewScreenshots}
          />
        ))}
      </motion.div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#6b7280',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <p style={{ fontSize: '1.125rem' }}>No products found in this category.</p>
        </motion.div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 640px) {
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default ProductGrid;
