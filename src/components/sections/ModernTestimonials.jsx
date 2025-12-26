import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlaceholderAvatar } from '../ui/Placeholders';
import { fetchPublishedTestimonials } from '../../services/testimonialsService';

/**
 * Modern Testimonials Section
 * Clean card layout for testimonials
 */
const ModernTestimonials = ({
  badge = "Testimonials",
  title = "What Our Clients",
  titleHighlight = "Say About Us",
  subtitle = "Don't just take our word for it. Here's what our clients have to say about working with us.",
  testimonials = null,
}) => {
  const [loadedTestimonials, setLoadedTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (testimonials && Array.isArray(testimonials)) return; // external prop controls content
      try {
        setLoading(true);
        setError('');
        const data = await fetchPublishedTestimonials();
        if (!mounted) return;
        setLoadedTestimonials(data);
      } catch (err) {
        console.error('Testimonials load failed:', err);
        if (mounted) setError('');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [testimonials]);

  const testimonialList = testimonials || loadedTestimonials;

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

  const renderStars = (rating = 5) => {
    const r = Math.min(5, Math.max(0, Number(rating) || 5));
    return (
      <div role="img" aria-label={`${r} out of 5 stars`} style={{ display: 'inline-flex' }}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={i < r ? 'var(--color-warning)' : 'none'}
            stroke={i < r ? 'var(--color-warning)' : 'var(--border-default)'}
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
    );
  };

  if (loading && !testimonials) {
    return null; // Don't show loading UI unless Firestore fetch is running
  }

  if (!loading && testimonialList.length === 0) {
    return null; // Hide section entirely if no testimonials
  }

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
            {(() => {
              const words = String(titleHighlight).split(' ');
              const first = words[0] || '';
              const rest = words.slice(1).join(' ');
              return (
                <>
                  <span className="modern-text-brand">{first}</span>
                  {rest && (
                    <>
                      <br />
                      <span className="modern-text-brand">{rest}</span>
                    </>
                  )}
                </>
              );
            })()}
          </h2>
          <p className="modern-lead">{subtitle}</p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="modern-grid modern-grid-2"
          style={{ gap: 'var(--space-6)' }}
        >
          {testimonialList.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div
                className="modern-card"
                style={{
                  padding: 'var(--space-8)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-md)',
                  background: '#ffffff',
                }}
              >
                {/* Rating Stars */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {renderStars(testimonial.rating)}
                  <span style={{
                    marginLeft: 'var(--space-2)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)'
                  }}>
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* Quote */}
                <div
                  style={{
                    position: 'relative',
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    marginBottom: 'var(--space-6)',
                    flex: 1,
                  }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    style={{
                      position: 'absolute',
                      top: 'var(--space-4)',
                      right: 'var(--space-4)',
                      opacity: 0.15,
                      color: 'var(--text-brand, #2f66ff)'
                    }}
                  >
                    <path fill="currentColor" d="M7 6h5v6H9.5C8.12 12 7 13.12 7 14.5V18H3v-3.5C3 11.46 4.96 9.5 7 9.5V6zm10 0h5v6h-2.5c-1.38 0-2.5 1.12-2.5 2.5V18h-4v-3.5c0-3.04 1.96-5 4-5V6z"/>
                  </svg>
                  <blockquote
                    style={{
                      fontSize: 'var(--text-base)',
                      lineHeight: '1.7',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      background: 'transparent',
                      padding: 0,
                    }}
                  >
                    “{testimonial.testimonialText || testimonial.quote}”
                  </blockquote>
                </div>

                {/* Author */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--border-light)',
                  }}
                >
                  {testimonial.clientImageUrl ? (
                    <img
                      src={testimonial.clientImageUrl}
                      alt={testimonial.clientName}
                      loading="lazy"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-full)',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <PlaceholderAvatar name={testimonial.clientInitials || testimonial.clientName} size={48} />
                  )}
                  <div>
                    <div
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {testimonial.clientName || testimonial.author}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      {[testimonial.clientRole || testimonial.role, [testimonial.clientCompany, testimonial.country].filter(Boolean).join(', ')].filter(Boolean).join(' • ')}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernTestimonials;
