import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Modern Services Section
 * Clean grid layout with service cards
 */
const ModernServices = ({
  badge = "Core Capabilities",
  title = "Enterprise-Grade",
  titleHighlight = "Software Engineering",
  subtitle = "Proven delivery across healthcare, finance, legal tech, and SaaS. We build systems that scale, perform, and last.",
  services = null,
}) => {
  // Default services if not provided
  const defaultServices = [
    {
      id: 'web-development',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: "Web Application Development",
      description: "Production-ready web systems using Angular, React, .NET Core, and Python. Built for security, performance, and long-term maintenance.",
      features: ["Enterprise Portals", "SaaS Platforms", "Healthcare Systems", "Financial Applications"],
      link: "/services/web-development",
    },
    {
      id: 'mobile-development',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      ),
      title: "Mobile Application Development",
      description: "Native iOS/Android and cross-platform apps with Flutter. Designed for reliability and seamless user experience.",
      features: ["Native iOS & Android", "Flutter Cross-Platform", "Offline-First Architecture", "Payment Integration"],
      link: "/services/mobile-development",
    },
    {
      id: 'cloud-solutions',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>
      ),
      title: "Cloud & Infrastructure",
      description: "Scalable cloud architecture on Azure and Firebase. CI/CD pipelines, monitoring, and infrastructure as code.",
      features: ["Azure Cloud Services", "Firebase Backend", "DevOps & CI/CD", "CosmosDB & MongoDB"],
      link: "/services/cloud-solutions",
    },
    {
      id: 'mvp-development',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      title: "MVP & Product Development",
      description: "Rapid product development with senior-level engineering. Ship faster without compromising on quality or architecture.",
      features: ["Rapid Prototyping", "Scalable Foundation", "Production-Ready Code", "Technical Due Diligence"],
      link: "/services/mvp-packages",
    },
  ];

  const serviceList = services || defaultServices;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="modern-section-lg modern-bg-light">
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

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="modern-grid modern-grid-2"
          style={{ gap: 'var(--space-6)' }}
        >
          {serviceList.map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <Link
                to={service.link}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  height: '100%',
                }}
              >
                <div
                  className="modern-card"
                  style={{
                    height: '100%',
                    padding: 'var(--space-8)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--color-primary-50)',
                      color: 'var(--color-primary-500)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      marginBottom: 'var(--space-6)',
                      flex: 1,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Features */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: 'var(--space-1) var(--space-3)',
                          background: 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-tertiary)',
                          fontWeight: '500',
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Link Arrow */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      color: 'var(--color-primary-500)',
                      fontWeight: '500',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    Learn more
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            textAlign: 'center',
            marginTop: 'var(--space-12)',
          }}
        >
          <Link to="/services" className="modern-btn modern-btn-secondary">
            View All Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernServices;
