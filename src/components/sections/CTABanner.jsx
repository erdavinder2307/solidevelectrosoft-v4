import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * CTA Banner Component
 * Reusable call-to-action section
 */
const CTABanner = ({
  variant = 'gradient', // 'gradient', 'dark', 'light'
  title = "Ready to Build Something Amazing?",
  subtitle = "Let's discuss your project and explore how we can help bring your vision to life.",
  primaryCTA = { text: "Get Free Consultation", link: "/contact" },
  secondaryCTA = { text: "View Our Work", link: "/portfolio" },
  showSecondary = true,
  compact = false,
}) => {
  const variantStyles = {
    gradient: {
      background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)',
      textColor: 'var(--text-inverse)',
      subtitleColor: 'rgba(255, 255, 255, 0.8)',
    },
    dark: {
      background: 'var(--bg-dark)',
      textColor: 'var(--text-inverse)',
      subtitleColor: 'var(--color-neutral-400)',
    },
    light: {
      background: 'var(--bg-secondary)',
      textColor: 'var(--text-primary)',
      subtitleColor: 'var(--text-secondary)',
    },
  };

  const styles = variantStyles[variant] || variantStyles.gradient;

  return (
    <section
      style={{
        background: styles.background,
        padding: compact ? 'var(--section-sm) 0' : 'var(--section-md) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      {variant === 'gradient' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30%',
              left: '-5%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      <div className="modern-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontSize: compact ? 'var(--text-3xl)' : 'var(--text-4xl)',
              fontWeight: '700',
              color: styles.textColor,
              marginBottom: 'var(--space-4)',
              lineHeight: '1.2',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: styles.subtitleColor,
              marginBottom: 'var(--space-8)',
              lineHeight: '1.6',
            }}
          >
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="cta-buttons"
          >
            <Link
              to={primaryCTA.link}
              className={`modern-btn ${variant === 'gradient' ? 'modern-btn-white' : 'modern-btn-primary'}`}
              style={{
                minWidth: '200px',
              }}
            >
              {primaryCTA.text}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            {showSecondary && (
              <Link
                to={secondaryCTA.link}
                className="modern-btn modern-btn-ghost"
                style={{
                  color: styles.textColor,
                  minWidth: '200px',
                }}
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 480px) {
          .cta-buttons {
            flex-direction: row !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CTABanner;
