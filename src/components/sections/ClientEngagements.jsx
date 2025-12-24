import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ClientEngagementCard from './ClientEngagementCard';
import ClientDetailsDialog from '../ui/ClientDetailsDialog';

/**
 * ClientEngagements Component
 * Displays visible client engagements on public site
 * Text-only, factual, and legally safe
 */
const ClientEngagements = () => {
  const [engagements, setEngagements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchEngagements();
  }, []);

  const fetchEngagements = async () => {
    try {
      // Avoid composite index requirement by filtering then sorting client-side
      const q = query(
        collection(db, 'client_engagements'),
        where('isVisible', '==', true)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setEngagements(data);
    } catch (error) {
      console.error('Error fetching client engagements:', error);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (engagement) => {
    setSelectedClient(engagement);
    setIsDialogOpen(true);
  };

  const closeDetails = () => {
    setIsDialogOpen(false);
    setSelectedClient(null);
  };

  if (loading) {
    return (
      <section className="client-engagements-area pt-120 pb-90" style={{ background: '#f9fafb' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="section-title mb-60">
                <h2>Loading...</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (engagements.length === 0) {
    return null; // Don't render if no visible engagements
  }

  return (
    <section className="client-engagements-area pt-120 pb-90" style={{ background: '#f9fafb' }}>
      <div className="container">
        {/* Section Header */}
        <div className="row">
          <div className="col-12 text-center">
            <div className="section-title mb-60">
              <span className="section-subtitle" style={{ color: '#667eea', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Past Engagements
              </span>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1a202c', marginTop: '12px' }}>
                Companies We've Worked With
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '16px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Representative list of past project engagements and collaborations
              </p>
            </div>
          </div>
        </div>

        {/* Engagements Grid (Cards with View details) */}
        <div className="row">
          {engagements.map((engagement) => (
            <div key={engagement.id} className="col-xl-4 col-lg-6 col-md-6 mb-30">
              <ClientEngagementCard engagement={engagement} onViewDetails={openDetails} />
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="row mt-60">
          <div className="col-12">
            <div
              style={{
                background: '#fef3c7',
                border: '1px solid #fcd34d',
                borderRadius: '8px',
                padding: '16px 24px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '13px', color: '#92400e', margin: 0, fontStyle: 'italic' }}>
                <strong>Note:</strong> Company names are mentioned solely to describe past project engagements. 
                Listings do not imply endorsement, partnership, or ongoing relationship. 
                All work performed within the scope of specific project contracts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Dialog */}
      <ClientDetailsDialog isOpen={isDialogOpen} onClose={closeDetails} client={selectedClient} />
    </section>
  );
};

export default ClientEngagements;
