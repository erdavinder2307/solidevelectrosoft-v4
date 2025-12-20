import React from 'react';
import { motion } from 'framer-motion';
import { PlaceholderLogo } from '../ui/Placeholders';

/**
 * Social Proof / Client Logos Section
 * Showcase trusted clients
 */
const SocialProof = ({
  title = "Trusted by innovative companies",
  clients = null,
  variant = 'default', // 'default', 'dark', 'minimal'
}) => {
  const clientLogos = {
    lexisnexis: new URL('../../assets/img/client/lexisnexis.webp', import.meta.url).href,
    nineam: new URL('../../assets/img/client/9am-software-sol.png', import.meta.url).href,
    airvolution: new URL('../../assets/img/client/airvolution.svg', import.meta.url).href,
    edify: new URL('../../assets/img/client/edify.webp', import.meta.url).href,
    fairway: new URL('../../assets/img/client/fairway-independent.webp', import.meta.url).href,
    spirensavvy: new URL('../../assets/img/client/spirensavvy.png', import.meta.url).href,
  };

  const defaultClients = [
    { name: 'LexisNexis', logo: clientLogos.lexisnexis },
    { name: '9am Software Solutions', logo: clientLogos.nineam },
    { name: 'Airvolution', logo: clientLogos.airvolution },
    { name: 'Edify', logo: clientLogos.edify },
    { name: 'Fairway Independent', logo: clientLogos.fairway },
    { name: 'Spire N Savvy', logo: clientLogos.spirensavvy },
  ];

  const clientList = clients || defaultClients;

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

        {/* Client Logos */}
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
            gap: 'var(--space-8)',
          }}
        >
          {clientList.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {client.logo ? (
                <div
                  style={{
                    width: '140px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-2)',
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: variant === 'dark' ? 'brightness(0) invert(1) opacity(0.6)' : 'grayscale(100%) opacity(0.6)',
                      transition: 'all var(--transition-default)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = variant === 'dark' ? 'brightness(0) invert(1) opacity(1)' : 'grayscale(0%) opacity(1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = variant === 'dark' ? 'brightness(0) invert(1) opacity(0.6)' : 'grayscale(100%) opacity(0.6)';
                    }}
                  />
                </div>
              ) : (
                <PlaceholderLogo name={client.name} width={100} height={40} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
