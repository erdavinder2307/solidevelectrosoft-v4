import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ClientDetailsDialog from '../ui/ClientDetailsDialog';
import { Disclaimer } from '../ui';

/**
 * Social Proof Section (Text-only)
 * Displays visible client engagements from Firestore
 */
const SocialProof = ({
  title = "Representative past client engagements",
  variant = 'default', // 'default', 'dark', 'minimal'
}) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Avoid composite index requirements: filter then sort client-side
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

  const variantStyles = {
    default: {
      background: 'var(--bg-secondary)',
      titleColor: 'var(--text-tertiary)',
    },
    dark: {
      background: 'var(--bg-dark)',
      titleColor: 'var(--color-neutral-500)',
    },
    minimal: {
      background: 'transparent',
      titleColor: 'var(--text-tertiary)',
    },
  };

  const styles = variantStyles[variant] || variantStyles.default;

  const openDetails = (client) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const closeDetails = () => {
    setIsDialogOpen(false);
    setSelectedClient(null);
  };

  return (
    <section
      style={{
        background: styles.background,
        padding: 'var(--space-12) 0',
      }}
    >
      <div className="modern-container">
        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-sm)',
            color: styles.titleColor,
            marginBottom: 'var(--space-8)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: '500',
          }}
        >
          {title}
        </motion.p>

        {/* Client Names (Text-only) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-6)',
            rowGap: 'var(--space-6)',
          }}
        >
          {loading ? (
            <span style={{ color: styles.titleColor }}>Loading...</span>
          ) : (
            clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
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
                    cursor: 'pointer',
                  }}
                  role="button"
                  aria-haspopup="dialog"
                  aria-label={`View engagement details for ${client.companyName}`}
                  tabIndex={0}
                  onClick={() => openDetails(client)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openDetails(client);
                    }
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
                  {client.engagementType === 'via_partner' && client.partnerName ? (
                    <span style={{
                      marginLeft: 6,
                      color: '#6b7280',
                      fontWeight: 600,
                    }}>
                      (via {client.partnerName})
                    </span>
                  ) : null}
                </span>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Legal Disclaimer */}
        <Disclaimer variant="clients" style={{ marginTop: 'var(--space-8)' }} color={styles.titleColor} />
      </div>
      {/* Details Dialog */}
      <ClientDetailsDialog isOpen={isDialogOpen} onClose={closeDetails} client={selectedClient} />
    </section>
  );
};

export default SocialProof;
