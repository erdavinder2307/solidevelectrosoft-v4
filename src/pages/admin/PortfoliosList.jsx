import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const PortfoliosList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError('');
      const querySnapshot = await getDocs(collection(db, 'portfolios'));
      const portfoliosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPortfolios(portfoliosData);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      setError('Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (portfolioId) => {
    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      try {
        setDeleting(portfolioId);
        await deleteDoc(doc(db, 'portfolios', portfolioId));
        setPortfolios(portfolios.filter((p) => p.id !== portfolioId));
      } catch (error) {
        console.error('Error deleting portfolio:', error);
        setError('Failed to delete portfolio');
      } finally {
        setDeleting(null);
      }
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
            borderTopColor: '#f59e0b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
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
          Portfolios
        </h1>
        <Link
          to="/admin/portfolios/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: '#f59e0b',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.background = '#d97706')}
          onMouseLeave={(e) => (e.target.style.background = '#f59e0b')}
        >
          ➕ Add Portfolio
        </Link>
      </div>

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

      {portfolios.length === 0 ? (
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
            No portfolios yet. Showcase your first project!
          </p>
          <Link
            to="/admin/portfolios/new"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: '#f59e0b',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Create Portfolio
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
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
              {portfolio.thumbnailUrl && (
                <img
                  src={portfolio.thumbnailUrl}
                  alt={portfolio.projectName}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              )}

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c' }}>
                  {portfolio.projectName}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                  <strong>Client:</strong> {portfolio.client}
                </p>
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    marginTop: '4px',
                    marginBottom: '8px',
                  }}
                >
                  {portfolio.description.substring(0, 100)}...
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: '#FEF3C7',
                      color: '#92400e',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}
                  >
                    {portfolio.category}
                  </span>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: '#D1D5DB',
                      color: '#374151',
                      borderRadius: '20px',
                      fontSize: '12px',
                    }}
                  >
                    👥 {portfolio.teamSize} people
                  </span>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: '#D1D5DB',
                      color: '#374151',
                      borderRadius: '20px',
                      fontSize: '12px',
                    }}
                  >
                    📅 {portfolio.duration}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => navigate(`/admin/portfolios/${portfolio.id}`)}
                  style={{
                    padding: '8px 16px',
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.background = '#d97706')}
                  onMouseLeave={(e) => (e.target.style.background = '#f59e0b')}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(portfolio.id)}
                  disabled={deleting === portfolio.id}
                  style={{
                    padding: '8px 16px',
                    background: deleting === portfolio.id ? '#dc2626' : '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: deleting === portfolio.id ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (deleting !== portfolio.id) e.target.style.background = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    if (deleting !== portfolio.id) e.target.style.background = '#ef4444';
                  }}
                >
                  {deleting === portfolio.id ? '⏳ Deleting...' : '🗑️ Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfoliosList;
