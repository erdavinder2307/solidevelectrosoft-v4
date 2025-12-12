import React from 'react';
import { motion } from 'framer-motion';

/**
 * Why Choose Us Section
 * Highlights company strengths and differentiators
 */
const WhyChooseUs = ({
  badge = "Why Choose Us",
  title = "Partner With a Team That",
  titleHighlight = "Delivers Results",
  subtitle = "We combine technical expertise with business acumen to deliver solutions that not only work—but work for your business.",
  features = null,
}) => {
  const defaultFeatures = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: "Fast Delivery",
      description: "We follow agile methodologies to deliver your project on time, every time. Quick iterations mean faster time to market.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: "Secure & Reliable",
      description: "Security is built into every line of code. We follow industry best practices to protect your data and users.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "Dedicated Team",
      description: "Get a dedicated team of experts who understand your business and are committed to your project's success.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      title: "Scalable Solutions",
      description: "Build once, scale infinitely. Our architecture decisions are made with your future growth in mind.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: "24/7 Support",
      description: "Round-the-clock support for your applications. We're always here when you need us, no matter the timezone.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      ),
      title: "Client Satisfaction",
      description: "98% client satisfaction rate. We don't just meet expectations—we exceed them consistently.",
    },
  ];

  const featureList = features || defaultFeatures;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="modern-section-lg">
      <div className="modern-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto var(--space-16)',
          }}
        >
          <span className="modern-label modern-mb-4" style={{ display: 'block' }}>
            {badge}
          </span>
          <h2 className="modern-h2 modern-mb-4">
            {title}{' '}
            <span className="modern-text-brand">{titleHighlight}</span>
          </h2>
          <p className="modern-lead">{subtitle}</p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="modern-grid modern-grid-3"
          style={{ gap: 'var(--space-8)' }}
        >
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-primary-50)',
                  color: 'var(--color-primary-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
