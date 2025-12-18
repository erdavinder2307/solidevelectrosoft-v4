import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setDeleting(productId);
        await deleteDoc(doc(db, 'products', productId));
        setProducts(products.filter((p) => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product');
      } finally {
        setDeleting(null);
      }
    }
  };

  const getSortedProducts = () => {
    const sorted = [...products];
    switch (sortOrder) {
      case 'order':
        return sorted.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      case 'newest':
        return sorted.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      case 'oldest':
        return sorted.sort((a, b) => (a.createdAt?.toMillis?.() || 0) - (b.createdAt?.toMillis?.() || 0));
      case 'a-z':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  const handleOrderChange = async (productId, newOrder) => {
    try {
      await updateDoc(doc(db, 'products', productId), {
        displayOrder: parseInt(newOrder) || 0,
        updatedAt: new Date(),
      });
      setProducts(products.map(p => 
        p.id === productId ? { ...p, displayOrder: parseInt(newOrder) || 0 } : p
      ));
    } catch (error) {
      console.error('Error updating display order:', error);
      setError('Failed to update display order');
    }
  };

  if (loading) {
    return (
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
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c' }}>
          Products
        </h1>
        <Link
          to="/admin/products/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.background = '#5568d3')}
          onMouseLeave={(e) => (e.target.style.background = '#667eea')}
        >
          ➕ Add Product
        </Link>
      </div>

      {products.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            padding: '12px',
            background: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}
        >
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#1a202c' }}>
            Sort by:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              cursor: 'pointer',
              background: 'white',
            }}
          >
            <option value="order">Display Order</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
          </select>
        </div>
      )}

      {error && (
        <div
          style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: '#991B1B',
          }}
        >
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
          }}
        >
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '20px' }}>
            No products yet. Create your first product to get started!
          </p>
          <Link
            to="/admin/products/new"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Create Product
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {getSortedProducts().map((product) => (
            <div
              key={product.id}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              {product.logo ? (
                <img
                  src={product.logo}
                  alt={product.title}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              ) : product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              ) : null}

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c' }}>
                  {product.title}
                </h3>
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    marginTop: '4px',
                    marginBottom: '8px',
                  }}
                >
                  {product.description.substring(0, 100)}...
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: '#EEF2FF',
                      color: '#667eea',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}
                  >
                    {product.category}
                  </span>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    background: '#F0F9FF',
                    borderRadius: '6px',
                    border: '1px solid #BAE6FD',
                  }}>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#667eea' }}>Order:</label>
                    <input
                      type="number"
                      min="0"
                      value={product.displayOrder || 0}
                      onChange={(e) => handleOrderChange(product.id, e.target.value)}
                      style={{
                        width: '45px',
                        padding: '2px 4px',
                        border: '1px solid #BAE6FD',
                        borderRadius: '4px',
                        fontSize: '12px',
                      }}
                    />
                  </div>
                  {product.technologies?.slice(0, 2).map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: '#F3F4F6',
                        color: '#374151',
                        borderRadius: '20px',
                        fontSize: '12px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => navigate(`/admin/products/${product.id}`)}
                  style={{
                    padding: '8px 16px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.background = '#5568d3')}
                  onMouseLeave={(e) => (e.target.style.background = '#667eea')}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deleting === product.id}
                  style={{
                    padding: '8px 16px',
                    background: deleting === product.id ? '#dc2626' : '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: deleting === product.id ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (deleting !== product.id) e.target.style.background = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    if (deleting !== product.id) e.target.style.background = '#ef4444';
                  }}
                >
                  {deleting === product.id ? '⏳ Deleting...' : '🗑️ Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
