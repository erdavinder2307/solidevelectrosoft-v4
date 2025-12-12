import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import ModernContactForm from '../components/ui/ModernContactForm';
import { FloatingCTA } from '../components/ui';

/**
 * Modern Contact Page
 * Optimized for lead conversion
 */
const ModernContact = () => {
  useEffect(() => {
    document.title = 'Contact Us | Get a Free Quote | Solidev Electrosoft';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch for a free consultation. Custom software development quotes within 24 hours. Web apps, mobile apps, AI solutions.');
    }
    window.scrollTo(0, 0);
  }, []);

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      value: 'info@solidev.in',
      link: 'mailto:info@solidev.in',
      description: 'We respond within 24 hours',
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '+91 911-586-6828',
      link: 'https://wa.me/919115866828',
      description: 'Quick response, anytime',
    },
    {
      icon: '📍',
      title: 'Visit Us',
      value: 'Hyderabad, India',
      link: 'https://maps.google.com/?q=Hyderabad,India',
      description: 'Schedule a meeting',
    },
  ];

  const faqs = [
    {
      question: 'How quickly can you start?',
      answer: 'For most projects, we can begin within 1-2 weeks after signing. Rush starts available for urgent projects.',
    },
    {
      question: 'What\'s your typical pricing?',
      answer: 'Pricing varies based on scope. MVPs start at $8K, custom apps from $15K-50K+. We provide detailed quotes after discovery.',
    },
    {
      question: 'Do you work with startups?',
      answer: 'Absolutely! We have special MVP packages designed for startups with limited budgets but big ambitions.',
    },
    {
      question: 'Can you sign an NDA?',
      answer: 'Yes, we sign NDAs before any detailed discussions. Your idea\'s confidentiality is protected.',
    },
  ];

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--bg-dark) 0%, #1a1a2e 100%)',
            padding: 'var(--space-24) 0 var(--space-12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)
              `,
            }}
          />

          <div className="modern-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="modern-badge"
              >
                Get in Touch
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-h1"
                style={{ color: 'white', marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}
              >
                Let's Build{' '}
                <span className="gradient-text">Together</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-neutral-400)',
                  lineHeight: 1.7,
                }}
              >
                Tell us about your project and get a free consultation. 
                We typically respond within a few hours during business days.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section style={{ padding: 'var(--space-12) 0', background: 'var(--bg-primary)', marginTop: '-var(--space-8)' }}>
          <div className="modern-container">
            <div className="modern-grid-3" style={{ gap: 'var(--space-6)' }}>
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    display: 'block',
                    padding: 'var(--space-6)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'all var(--transition-default)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>
                    {method.icon}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>
                    {method.title}
                  </h3>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
                    {method.value}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    {method.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-12)',
                alignItems: 'start',
              }}
            >
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ModernContactForm />
              </motion.div>

              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="modern-h3" style={{ marginBottom: 'var(--space-6)' }}>
                  Common Questions
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      style={{
                        padding: 'var(--space-4)',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-2)' }}>
                        {faq.question}
                      </h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Trust Indicators */}
                <div
                  style={{
                    marginTop: 'var(--space-8)',
                    padding: 'var(--space-6)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-4)' }}>
                    Why work with us?
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      '✓ 10+ years of experience',
                      '✓ 50+ successful projects',
                      '✓ Transparent communication',
                      '✓ Fixed-price options available',
                      '✓ Full code ownership',
                    ].map((item, i) => (
                      <li
                        key={i}
                        style={{
                          padding: 'var(--space-2) 0',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section
          style={{
            height: '300px',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-2)' }}>🗺️</div>
            <p>Interactive map coming soon</p>
            <a
              href="https://maps.google.com/?q=Hyderabad,India"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-primary-500)', fontSize: 'var(--text-sm)' }}
            >
              View on Google Maps →
            </a>
          </div>
        </section>
      </main>
      <ModernFooter />
      <FloatingCTA />
    </>
  );
};

export default ModernContact;
