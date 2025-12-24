import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';

const ClientEngagements = () => {
  const [engagements, setEngagements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchEngagements();
  }, []);

  const fetchEngagements = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'client_engagements'), orderBy('sortOrder', 'asc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEngagements(data);
    } catch (error) {
      console.error('Error fetching client engagements:', error);
      alert('Error loading client engagements. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      const docRef = doc(db, 'client_engagements', id);
      await updateDoc(docRef, {
        isVisible: !currentVisibility,
        updatedAt: new Date(),
      });
      // Update local state
      setEngagements((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isVisible: !currentVisibility } : item
        )
      );
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Error updating visibility. Please try again.');
    }
  };

  const handleDelete = async (id, companyName) => {
    if (!window.confirm(`Are you sure you want to delete "${companyName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(id);
      await deleteDoc(doc(db, 'client_engagements', id));
      setEngagements((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting engagement:', error);
      alert('Error deleting engagement. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const getEngagementTypeLabel = (type) => {
    const labels = {
      direct: 'Direct',
      via_partner: 'Via Partner',
      contractor: 'Contractor',
    };
    return labels[type] || type;
  };

  const getEngagementTypeBadge = (type) => {
    const colors = {
      direct: { bg: '#dbeafe', color: '#1e40af' },
      via_partner: { bg: '#fef3c7', color: '#92400e' },
      contractor: { bg: '#e0e7ff', color: '#4338ca' },
    };
    return colors[type] || { bg: '#f3f4f6', color: '#1f2937' };
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
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
            Client Engagements
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Manage companies and project engagements
          </p>
        </div>
        <Link
          to="/admin/clients/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
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
          <span>➕</span> Add Client Engagement
        </Link>
      </div>

      {/* Client Engagements Table */}
      {engagements.length === 0 ? (
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '60px 20px',
            textAlign: 'center',
            border: '1px solid #e5e7eb',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>
            No Client Engagements Yet
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            Start by adding your first client engagement
          </p>
          <Link
            to="/admin/clients/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            <span>➕</span> Add Client Engagement
          </Link>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Company Name
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Type
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Period
                </th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Visible
                </th>
                <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {engagements.map((engagement) => {
                const badge = getEngagementTypeBadge(engagement.engagementType);
                return (
                  <tr key={engagement.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '600', color: '#1a202c', marginBottom: '4px' }}>
                        {engagement.companyName}
                      </div>
                      {engagement.partnerName && (
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          via {engagement.partnerName}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {getEngagementTypeLabel(engagement.engagementType)}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: '#6b7280', fontSize: '14px' }}>
                      {engagement.period}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button
                        onClick={() => toggleVisibility(engagement.id, engagement.isVisible)}
                        style={{
                          padding: '6px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          background: engagement.isVisible ? '#d1fae5' : '#fee2e2',
                          color: engagement.isVisible ? '#065f46' : '#991b1b',
                          transition: 'all 0.2s',
                        }}
                      >
                        {engagement.isVisible ? '👁️ Visible' : '🚫 Hidden'}
                      </button>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <Link
                          to={`/admin/clients/${engagement.id}`}
                          style={{
                            padding: '8px 16px',
                            background: '#f3f4f6',
                            color: '#374151',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={(e) => (e.target.style.background = '#e5e7eb')}
                          onMouseLeave={(e) => (e.target.style.background = '#f3f4f6')}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(engagement.id, engagement.companyName)}
                          disabled={deleting === engagement.id}
                          style={{
                            padding: '8px 16px',
                            background: deleting === engagement.id ? '#fca5a5' : '#fee2e2',
                            color: '#991b1b',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: deleting === engagement.id ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            if (deleting !== engagement.id) {
                              e.target.style.background = '#fca5a5';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (deleting !== engagement.id) {
                              e.target.style.background = '#fee2e2';
                            }
                          }}
                        >
                          {deleting === engagement.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Info Box */}
      <div
        style={{
          marginTop: '32px',
          background: '#EEF2FF',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #c7d2fe',
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#4338ca', marginBottom: '8px' }}>
          💡 Client Engagement Guidelines
        </h3>
        <ul style={{ color: '#6366f1', fontSize: '13px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
          <li>Text-only entries (no logos or images)</li>
          <li>Factual, neutral descriptions only</li>
          <li>Toggle visibility to show/hide on public site</li>
          <li>Sort order determines display sequence</li>
        </ul>
      </div>
    </div>
  );
};

export default ClientEngagements;
