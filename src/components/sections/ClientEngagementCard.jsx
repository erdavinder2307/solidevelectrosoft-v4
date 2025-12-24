import React from 'react';

/**
 * ClientEngagementCard
 * Compact card showing:
 * - Company name
 * - One-line description
 * - View details button
 *
 * Neutral, text-only presentation.
 * TODO: Add keyboard shortcut for details (e.g., Enter) if needed.
 */
const ClientEngagementCard = ({ engagement, onViewDetails }) => {
  const descriptionOneLine = (text) => {
    if (!text) return '';
    const trimmed = text.trim();
    return trimmed.length > 140 ? trimmed.slice(0, 137) + '…' : trimmed;
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        height: '100%',
        border: '1px solid #e5e7eb',
        transition: 'all 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }}
    >
      {/* Company Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <span
          aria-hidden
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#667eea',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.15)',
          }}
        />
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937', margin: 0 }}>
          {engagement.companyName}
        </h3>
      </div>

      {/* One-line Description */}
      {engagement.description && (
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
          {descriptionOneLine(engagement.description)}
        </p>
      )}

      {/* Actions */}
      <div>
        <button
          onClick={() => onViewDetails(engagement)}
          style={{
            padding: '10px 16px',
            background: '#EEF2FF',
            color: '#4338CA',
            border: '1px solid #C7D2FE',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#E0E7FF')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#EEF2FF')}
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default ClientEngagementCard;
