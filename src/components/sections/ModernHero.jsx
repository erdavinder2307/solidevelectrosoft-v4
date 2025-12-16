import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Modern Hero Section
 * Clean, impactful hero with strong value proposition
 * Mobile-first responsive design
 */
const ModernHero = ({
  badge = "Transform Your Ideas Into Reality",
  headline = "Build Powerful",
  headlineHighlight = "Digital Products",
  headlineSuffix = "That Drive Growth",
  subheadline = "We partner with startups and enterprises to design, develop, and deploy world-class web and mobile applications. From MVPs to enterprise solutions.",
  primaryCTA = { text: "Get Free Consultation", link: "/contact" },
  secondaryCTA = { text: "View Our Work", link: "/products" },
  stats = [
    { value: "25+", label: "Projects Delivered" },
    { value: "2018", label: "Established Since" },
    { value: "13+", label: "Years in Industry" },
    { value: "99%", label: "Client Satisfaction" },
  ],
  backgroundImage = null,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      className="modern-bg-dark modern-bg-mesh"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Grid Pattern */}
      <div 
        className="modern-bg-grid"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Gradient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 133, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="modern-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            maxWidth: '900px',
            paddingTop: 'var(--space-32)',
            paddingBottom: 'var(--space-20)',
          }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-4)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-primary-300)',
                fontWeight: '500',
                marginBottom: 'var(--space-6)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--color-primary-400)',
                  animation: 'modern-pulse 2s infinite',
                }}
              />
              {badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'var(--text-6xl)',
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: '-0.025em',
              marginBottom: 'var(--space-6)',
            }}
          >
            <span style={{ color: 'var(--text-inverse)' }}>{headline} </span>
            <span
              className="modern-gradient-text"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary-400) 0%, #8b5cf6 50%, var(--color-primary-300) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {headlineHighlight}
            </span>
            <br />
            <span style={{ color: 'var(--text-inverse)' }}>{headlineSuffix}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'var(--text-xl)',
              lineHeight: '1.6',
              color: 'var(--color-neutral-400)',
              marginBottom: 'var(--space-10)',
              maxWidth: '600px',
            }}
          >
            {subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-16)',
            }}
            className="hero-cta-container"
          >
            {/* Primary CTA - Can be button or link */}
            {primaryCTA.isButton ? (
              <button
                onClick={primaryCTA.onClick}
                className="modern-btn modern-btn-primary modern-btn-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%)',
                  boxShadow: '0 0 30px rgba(0, 133, 255, 0.3)',
                }}
              >
                {primaryCTA.text}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            ) : (
              <Link
                to={primaryCTA.link}
                className="modern-btn modern-btn-primary modern-btn-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%)',
                  boxShadow: '0 0 30px rgba(0, 133, 255, 0.3)',
                }}
              >
                {primaryCTA.text}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            )}
            <Link
              to={secondaryCTA.link}
              className="modern-btn modern-btn-secondary"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'var(--text-inverse)',
              }}
            >
              {secondaryCTA.text}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-8)',
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {stats.map((stat, index) => (
              <div key={index}>
                <div
                  style={{
                    fontSize: 'var(--text-4xl)',
                    fontWeight: '700',
                    color: 'var(--text-inverse)',
                    lineHeight: '1',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neutral-500)',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 'var(--space-8)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: '24px',
            height: '40px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8px',
          }}
        >
          <div
            style={{
              width: '4px',
              height: '8px',
              background: 'var(--color-primary-400)',
              borderRadius: 'var(--radius-full)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 480px) {
          .hero-cta-container {
            flex-direction: row !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ModernHero;
