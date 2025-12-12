import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlaceholderImage } from '../ui/Placeholders';

/**
 * Case Studies Section
 * Featured case study previews with metrics
 */
const CaseStudies = ({
  badge = "Case Studies",
  title = "Success Stories",
  titleHighlight = "In Detail",
  subtitle = "Dive deep into how we helped businesses transform their ideas into successful digital products.",
  caseStudies = null,
}) => {
  // TODO: Replace with actual case study data
  const defaultCaseStudies = [
    {
      id: 'lexisnexis-conveyancing',
      client: 'LexisNexis',
      title: 'Modernizing Legal Conveyancing',
      description: 'How we helped LexisNexis transform their legacy conveyancing system into a modern, cloud-native platform.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/client/lexisnexis.webp',
      metrics: [
        { value: '40%', label: 'Faster Processing' },
        { value: '99.9%', label: 'Uptime' },
        { value: '60%', label: 'Cost Reduction' },
      ],
      tags: ['Legal Tech', 'Cloud Migration', '.NET Core'],
      link: '/case-studies/lexisnexis',
    },
    {
      id: 'fairway-mobile',
      client: 'Fairway Independent',
      title: 'Mobile-First Mortgage Experience',
      description: 'Building a seamless mobile experience for mortgage applications and customer communications.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/client/fairway-independent.webp',
      metrics: [
        { value: '4.8★', label: 'App Store Rating' },
        { value: '50K+', label: 'Active Users' },
        { value: '3x', label: 'Engagement Increase' },
      ],
      tags: ['FinTech', 'Mobile App', 'iOS & Android'],
      link: '/case-studies/fairway',
    },
  ];

  const caseStudyList = caseStudies || defaultCaseStudies;

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

        {/* Case Studies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          {caseStudyList.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={caseStudy.link}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  className="modern-card"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 'var(--space-6)',
                    padding: 'var(--space-6)',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      aspectRatio: '16/9',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      background: 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {caseStudy.image ? (
                      <img
                        src={caseStudy.image}
                        alt={caseStudy.client}
                        style={{
                          maxWidth: '60%',
                          maxHeight: '60%',
                          objectFit: 'contain',
                          filter: 'grayscale(100%)',
                          opacity: 0.7,
                          transition: 'all var(--transition-default)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'grayscale(0%)';
                          e.currentTarget.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'grayscale(100%)';
                          e.currentTarget.style.opacity = '0.7';
                        }}
                      />
                    ) : (
                      <PlaceholderImage width="60%" height="60%" />
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    {/* Client */}
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: '600',
                        color: 'var(--color-primary-500)',
                        marginBottom: 'var(--space-2)',
                        display: 'block',
                      }}
                    >
                      {caseStudy.client}
                    </span>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: 'var(--text-2xl)',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      {caseStudy.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        marginBottom: 'var(--space-6)',
                      }}
                    >
                      {caseStudy.description}
                    </p>

                    {/* Metrics */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 'var(--space-4)',
                        marginBottom: 'var(--space-6)',
                        paddingTop: 'var(--space-4)',
                        borderTop: '1px solid var(--border-light)',
                      }}
                    >
                      {caseStudy.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <div
                            style={{
                              fontSize: 'var(--text-2xl)',
                              fontWeight: '700',
                              color: 'var(--text-primary)',
                              lineHeight: '1',
                            }}
                          >
                            {metric.value}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-tertiary)',
                              marginTop: 'var(--space-1)',
                            }}
                          >
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--space-2)',
                      }}
                    >
                      {caseStudy.tags.map((tag, idx) => (
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
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            textAlign: 'center',
            marginTop: 'var(--space-10)',
          }}
        >
          <Link to="/case-studies" className="modern-btn modern-btn-secondary">
            View All Case Studies
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </motion.div>

        {/* Responsive Styles */}
        <style>{`
          @media (min-width: 768px) {
            .modern-card > div:first-child {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default CaseStudies;
