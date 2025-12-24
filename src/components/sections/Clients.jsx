import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Text-only Clients section, backed by Firestore `client_engagements`
const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Filter by visibility only to avoid composite index; sort client-side
        const q = query(
          collection(db, 'client_engagements'),
          where('isVisible', '==', true)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setClients(data);
      } catch (e) {
        console.error('Error loading client engagements:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  if (loading) {
    return (
      <div id="clients" className="tp-brand-area">
        <div className="container">
          <div className="pt-60 pb-60 text-center">
            <span>Loading client engagements...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!clients.length) {
    // No visible clients → render nothing to keep page clean
    return null;
  }

  return (
    <div id="clients" className="tp-brand-area">
      <div className="container">
        <div className="tp-brand-slider tp-brand-silder-actiive tp-brand-border pt-60 pb-30">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            {clients.map((client) => (
              <div key={client.id} className="tp-brand-item text-center scale-1">
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 18px',
                    borderRadius: '999px',
                    border: '1px solid #dbeafe',
                    background: 'linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 100%)',
                    color: '#1f2937',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    boxShadow: '0 2px 6px rgba(102, 126, 234, 0.10)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(102, 126, 234, 0.10)';
                  }}
                >
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
                  <span>{client.companyName}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legal note */}
        <div className="pt-20 pb-60">
          <p style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', margin: 0 }}>
            Company names are mentioned solely to describe past project engagements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Clients;
