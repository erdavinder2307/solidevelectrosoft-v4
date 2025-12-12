import React from 'react';
import { motion } from 'framer-motion';
import { PlaceholderAvatar } from '../ui/Placeholders';

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
  // Using existing testimonial data
  const defaultTestimonials = [
    {
      id: 1,
      quote: "The work has been completed in smooth process and delivered the high quality software. He has multiple coding skills. Highly recommend to others.",
      author: "Naga Vankadari",
      role: "Project Manager",
      company: "USA",
      rating: 5,
      avatar: null, // TODO: Add actual avatar
    },
    {
      id: 2,
      quote: "As per customer our work was great and relevant to their product. With regard of appreciation client increased per hour rate after six months of commitment.",
      author: "Prabhakaran S",
      role: "Technical Lead",
      company: "Edify Technologies, Dacra Tech Core360",
      rating: 5,
      avatar: null,
    },
    {
      id: 3,
      quote: "As per customer our work is excellent and provided them value. Code quality is great and meeting deadlines for work.",
      author: "Ngwenze Ayanda",
      role: "Development Manager",
      company: "LexisNexis, South Africa",
      rating: 5,
      avatar: null,
    },
    {
      id: 4,
      quote: "The work has been completed in smooth process and delivered the high quality software. He has multiple coding skills. Highly recommend to others.",
      author: "Nagaraju Bittu",
      role: "Business Owner",
      company: "USA",
      rating: 4,
      avatar: null,
    },
  ];

  const testimonialList = testimonials || defaultTestimonials;

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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? 'var(--color-warning)' : 'none'}
        stroke={i < rating ? 'var(--color-warning)' : 'var(--border-default)'}
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ));
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
            <motion.div key={testimonial.id} variants={cardVariants}>
              <div
                className="modern-card"
                style={{
                  padding: 'var(--space-8)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Rating Stars */}
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-1)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote
                  style={{
                    fontSize: 'var(--text-base)',
                    lineHeight: '1.7',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    flex: 1,
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  "{testimonial.quote}"
                </blockquote>

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
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-full)',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <PlaceholderAvatar name={testimonial.author} size={48} />
                  )}
                  <div>
                    <div
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {testimonial.author}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      {testimonial.role} • {testimonial.company}
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
