import React, { useEffect, useRef } from 'react';

/**
 * ClientDetailsDialog
 * Accessible, mobile-friendly modal dialog.
 * - Traps focus
 * - Closes on ESC
 * - Full-screen on mobile
 * - Reusable: displays data passed via props (no extra Firestore reads)
 *
 * TODO: Consider extracting focus-trap into a shared utility if more modals are added.
 */
const ClientDetailsDialog = ({ isOpen, onClose, client }) => {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const prevFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Remember previously focused element
    prevFocusRef.current = document.activeElement;

    // Focus the dialog on open
    const focusTarget = dialogRef.current;
    if (focusTarget) {
      focusTarget.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || !focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    const overlayEl = overlayRef.current;
    overlayEl?.addEventListener('keydown', handleKeyDown);

    return () => {
      overlayEl?.removeEventListener('keydown', handleKeyDown);
      // Restore focus to previous element when closing
      if (prevFocusRef.current && typeof prevFocusRef.current.focus === 'function') {
        prevFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !client) return null;

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  const getTypeLabel = (type) => {
    const map = { direct: 'Direct', via_partner: 'Via Partner', contractor: 'Contractor' };
    return map[type] || type;
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-dialog-title"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17, 24, 39, 0.6)',
        backdropFilter: 'blur(2px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? 0 : '20px',
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        style={{
          width: isMobile ? '100%' : '100%',
          maxWidth: isMobile ? '100%' : '720px',
          height: isMobile ? '100%' : 'auto',
          maxHeight: isMobile ? '100%' : '85vh',
          overflowY: 'auto',
          background: 'white',
          borderRadius: isMobile ? '0' : '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e5e7eb',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <h2 id="client-dialog-title" style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827' }}>
            {client.companyName}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              border: 'none',
              background: '#F3F4F6',
              color: '#374151',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#E5E7EB')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#F3F4F6')}
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px' }}>
          {/* Engagement Type + Partner */}
          <div style={{ marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: '999px',
                background: '#EEF2FF',
                color: '#4338CA',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {getTypeLabel(client.engagementType)}
            </span>
            {client.engagementType === 'via_partner' && client.partnerName ? (
              <span style={{ marginLeft: 10, color: '#6B7280', fontSize: '13px', fontWeight: 600 }}>
                via {client.partnerName}
              </span>
            ) : null}
          </div>

          {/* Period */}
          {client.period && (
            <div style={{ marginBottom: '12px', color: '#4B5563', fontSize: '14px' }}>
              <span style={{ fontWeight: 600 }}>Engagement Period:</span> {client.period}
            </div>
          )}

          {/* Domains */}
          {client.domains && client.domains.length > 0 && (
            <div style={{ marginBottom: '12px', color: '#4B5563', fontSize: '14px' }}>
              <span style={{ fontWeight: 600 }}>Industry / Domain:</span> {client.domains.join(', ')}
            </div>
          )}

          {/* Projects */}
          {client.projects && client.projects.length > 0 && (
            <div style={{ marginBottom: '12px', color: '#1F2937' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px' }}>Projects</div>
              <ul style={{ paddingLeft: '18px', margin: 0 }}>
                {client.projects.map((p, idx) => (
                  <li key={idx} style={{ color: '#4B5563', fontSize: '14px' }}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {client.description && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px', color: '#1F2937' }}>Description</div>
              <p style={{ color: '#4B5563', fontSize: '14px', lineHeight: 1.7 }}>{client.description}</p>
            </div>
          )}

          {/* Footer note */}
          <div
            style={{
              marginTop: '16px',
              background: '#FEF3C7',
              border: '1px solid #FCD34D',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#92400E',
              fontSize: '12px',
              textAlign: 'center',
            }}
          >
            Company names are mentioned solely to describe past project engagements.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsDialog;
