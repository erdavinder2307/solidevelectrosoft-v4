import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import ModernContactForm from '../components/ui/ModernContactForm';
import { FloatingCTA } from '../components/ui';
import AIProjectAssistant from '../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../hooks/useAIAssistant';
import emailService from '../services/emailService';

/**
 * Modern Contact Page
 * Optimized for lead conversion
 */
const ModernContact = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  
  // Handle contact form submission
  const handleContactFormSubmit = async (formData) => {
    try {
      const result = await emailService.sendContactFormEmail(formData);
      if (!result.success) {
        throw new Error(result.message || 'Failed to send email');
      }
      return result;
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw error;
    }
  };

  useEffect(() => {
    document.title = 'Contact Us | Get a Free Quote | Solidev Electrosoft';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch for a free consultation. Custom software development quotes within 24 hours. Web apps, mobile apps, AI solutions.');
    }
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://solidev.in/contact');

    // Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: 'Contact',
        page_location: window.location.href,
        page_path: '/contact',
      });
    }
    
    window.scrollTo(0, 0);
  }, []);

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      value: 'admin@solidevelectrosoft.com',
      link: 'mailto:admin@solidevelectrosoft.com',
      description: '24-hour response guarantee',
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '+91 911-586-6828',
      link: 'https://wa.me/919115866828',
      description: 'Instant messaging available',
    },
    {
      icon: '📍',
      title: 'Office',
      value: 'Next57 Coworking, Cabin No - 11,  C205 Sm Heights Industrial Area Phase 8b Mohali, 140308',
      link: 'https://maps.app.goo.gl/Hur73ibm9hw9Koqw9',
      description: 'Schedule a site visit',
    },
  ];

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project duration depends on complexity. MVPs take 4-8 weeks, custom apps 8-16 weeks. We provide detailed timelines after discovery phase.',
    },
    {
      question: 'What\'s your development process?',
      answer: 'We follow agile methodology: Discovery → Design → Development → Testing → Launch. Regular sprints with bi-weekly demos for transparency.',
    },
    {
      question: 'Do you offer ongoing support?',
      answer: 'Yes, we provide 3-6 months free support post-launch. Extended maintenance packages available for long-term partnership.',
    },
    {
      question: 'What technologies do you specialize in?',
      answer: 'React, Node.js, .NET Core, Python, React Native, Flutter, AWS, Azure. We choose the best stack for your specific needs.',
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

        {/* Contact Methods - Improved */}
        <section style={{ padding: 'var(--space-12) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--space-8)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-2)' }}>
                Get in Touch
              </h2>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Multiple ways to reach us. Choose what works best for you.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', maxWidth: '900px', margin: '0 auto' }}>
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 'var(--space-6)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-default)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Accent Bar */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #3b82f6, #0ea5e9)',
                    }}
                  />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                    <div
                      style={{
                        fontSize: '2rem',
                        minWidth: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: 'var(--radius-lg)',
                        flexShrink: 0,
                        marginTop: 'var(--space-2)',
                      }}
                    >
                      {method.icon}
                    </div>

                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: 'var(--space-1)', marginTop: 0 }}>
                        {method.title}
                      </h3>
                      <div style={{ fontWeight: '600', color: 'var(--color-primary-500)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)', wordBreak: 'break-word' }}>
                        {method.value}
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                        {method.description}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section - Enhanced with AI */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Ready to Share Your Vision?
              </h2>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Use our smart form or chat with AI to clarify your project requirements
              </p>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: 'var(--space-12)',
                alignItems: 'start',
                maxWidth: '1100px',
                margin: '0 auto',
              }}
              className="contact-form-layout"
            >
              {/* Traditional Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                    📋 Project Details
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', margin: 0 }}>
                    Fill out the form with your project specifics
                  </p>
                </div>
                <ModernContactForm onSubmit={handleContactFormSubmit} />
              </motion.div>

              {/* AI-Powered Assistance */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-6)',
                }}
              >
                {/* AI Chat Section */}
                <div
                  style={{
                    padding: 'var(--space-6)',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--color-primary-500)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Accent */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-50px',
                      right: '-50px',
                      width: '200px',
                      height: '200px',
                      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--color-primary-500)', marginBottom: 'var(--space-2)', marginTop: 0 }}>
                      ✨ Chat with AI
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
                      Not sure about your project scope? Let Claude help you think through your requirements, budget, and timeline. Our AI assistant will guide you to make better decisions.
                    </p>

                    <button
                      onClick={openAI}
                      style={{
                        width: '100%',
                        padding: 'var(--space-4)',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all var(--transition-default)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <span>💬 Start AI Consultation</span>
                    </button>
                  </div>
                </div>

                {/* Benefits */}
                <div
                  style={{
                    padding: 'var(--space-6)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: 'var(--space-4)', marginTop: 0, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span>🎯</span> AI Helps You With:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {[
                      'Clarifying project scope & requirements',
                      'Estimating realistic timelines',
                      'Choosing the right technology stack',
                      'Budget planning & optimization',
                      'Identifying potential risks early',
                    ].map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--color-primary-500)', fontWeight: '700', flexShrink: 0 }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Stats */}
                <div
                  style={{
                    padding: 'var(--space-4)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
                    Typical consultation time
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary-500)' }}>
                    10-15 minutes
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs & Trust Section */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: 'var(--space-12)',
              }}
            >
              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="modern-h3" style={{ marginBottom: 'var(--space-6)' }}>
                  Common Questions
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      style={{
                        padding: 'var(--space-4)',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)',
                        transition: 'all var(--transition-default)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-primary-500)';
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.background = 'var(--bg-secondary)';
                      }}
                    >
                      <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '600', marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
                        {faq.question}
                      </h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div
                  style={{
                    padding: 'var(--space-8)',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--color-primary-500)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: '700', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-primary-500)', marginTop: 0 }}>
                    <span>✨</span>
                    Why Choose Us?
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {[
                      { icon: '📅', text: '13+ years of industry experience' },
                      { icon: '🎯', text: '25+ successful projects delivered' },
                      { icon: '🌍', text: '30+ happy clients worldwide' },
                      { icon: '⚡', text: '24-hour response guarantee' },
                      { icon: '💬', text: 'Transparent communication & pricing' },
                      { icon: '🔓', text: 'Full code ownership for you' },
                    ].map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                          fontWeight: '500',
                        }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 'auto', paddingTop: 'var(--space-6)', borderTop: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0, textAlign: 'center' }}>
                      Let's build something amazing together! 🚀
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Our Office Location
              </h2>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Visit us in Mohali, India. We'd love to meet and discuss your next project over a cup of coffee.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                maxWidth: '100%',
                height: 'auto',
              }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13731.343759315005!2d76.8203578!3d30.6385809!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391029cfc1a83da5%3A0xd1ab166dd3a9a716!2sSolidev%20Electrosoft%20Private%20Limited!5e0!3m2!1sen!2sin!4v1684382188874!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 'none', display: 'block' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <ModernFooter />
      <FloatingCTA onQuoteClick={openAI} />
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .modern-grid-3 {
            grid-template-columns: 1fr !important;
          }

          .contact-form-layout {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
        }

        @media (max-width: 768px) {
          .modern-grid-3 {
            grid-template-columns: 1fr !important;
            gap: var(--space-4) !important;
          }

          .contact-form-layout {
            grid-template-columns: 1fr !important;
          }

          [style*="grid-template-columns: repeat(auto-fit"]  {
            grid-template-columns: 1fr !important;
          }

          iframe {
            height: 300px !important;
          }
        }

        @media (max-width: 640px) {
          [style*="grid-template-columns: repeat(auto-fit"]  {
            gap: var(--space-6) !important;
          }

          iframe {
            height: 250px !important;
          }

          .modern-h1 {
            font-size: 1.75rem !important;
          }

          .contact-form-layout {
            gap: var(--space-6) !important;
          }
        }
      `}</style>
    </>
  );
};

export default ModernContact;
