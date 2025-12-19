import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Import logo for proper Vite bundling
import logoDark from '../../assets/img/logo/logo 3-bg-dark.png';

/**
 * Modern Footer Component
 * Clean, professional footer with newsletter signup
 */
const ModernFooter = ({ onQuoteClick = null }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(''); // 'loading', 'success', 'error'
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscribeStatus('error');
      setSubscribeMessage('Please enter a valid email address');
      return;
    }

    setSubscribeStatus('loading');
    setSubscribeMessage('');

    try {
      // Check if email already exists
      const subscribersRef = collection(db, 'subscribedUsers');
      const q = query(subscribersRef, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setSubscribeStatus('error');
        setSubscribeMessage('This email is already subscribed');
        return;
      }

      // Add new subscriber
      await addDoc(subscribersRef, {
        email: email.toLowerCase(),
        subscribedAt: serverTimestamp(),
        status: 'active',
        source: 'footer',
      });

      setSubscribeStatus('success');
      setSubscribeMessage('Successfully subscribed! Thank you.');
      setEmail('');

      // Reset message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus('');
        setSubscribeMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscribeStatus('error');
      setSubscribeMessage('Failed to subscribe. Please try again.');
    }
  };

  const footerLinks = {
    services: [
      { label: 'Web App Development', path: '/services/web-development' },
      { label: 'Mobile App Development', path: '/services/mobile-app-development' },
      { label: 'AI-Powered Solutions', path: '/services/ai-solutions' },
      { label: 'MVP Development', path: '/services/mvp-development' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Products', path: '/products' },
      { label: 'Contact', path: '/contact' },
    ],
    resources: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Blog', path: '/blog' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
  };

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/solidevelectrosoft',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/solidevltd',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/solidevelectrosoft',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="var(--bg-dark)" strokeWidth="2"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="var(--bg-dark)" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/solidev-electrosoft-opc-private-limited/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer
      style={{
        background: 'var(--bg-dark)',
        color: 'var(--text-inverse)',
        paddingTop: 'var(--section-md)',
      }}
      className="modern-footer"
    >
      <div className="modern-container">
        {/* Top Section with CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-8)',
            paddingBottom: 'var(--space-12)',
            borderBottom: '1px solid var(--border-dark)',
          }}
          className="footer-top"
        >
          <div>
            <h3
              style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: '700',
                marginBottom: 'var(--space-4)',
                lineHeight: '1.2',
                color: '#ffffff',
              }}
            >
              Have a project in mind?
              <br />
              <span style={{ color: '#818cf8' }}>Let's work together.</span>
            </h3>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: '#9ca3af',
                marginBottom: 'var(--space-6)',
                maxWidth: '400px',
              }}
            >
              We'd love to hear about your project and explore how we can help bring your vision to life.
            </p>
            {onQuoteClick ? (
              <button
                onClick={onQuoteClick}
                className="modern-btn modern-btn-primary"
              >
                ✨ Chat with AI
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            ) : (
              <Link
                to="/contact"
                className="modern-btn modern-btn-primary"
              >
                ✨ Chat with AI
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            )}
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: '600',
                marginBottom: 'var(--space-3)',
                color: '#ffffff',
              }}
            >
              Stay Updated
            </h4>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: '#9ca3af',
                marginBottom: 'var(--space-4)',
              }}
            >
              Subscribe to our newsletter for tech insights and company updates.
            </p>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
              className="newsletter-form"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribeStatus === 'loading'}
                style={{
                  flex: 1,
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-inverse)',
                  fontSize: 'var(--text-sm)',
                  minHeight: '48px',
                  opacity: subscribeStatus === 'loading' ? 0.6 : 1,
                }}
              />
              <button
                type="submit"
                className="modern-btn modern-btn-primary"
                style={{ whiteSpace: 'nowrap' }}
                disabled={subscribeStatus === 'loading'}
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
              {subscribeMessage && (
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: subscribeStatus === 'success' ? '#10b981' : '#ef4444',
                    margin: 0,
                  }}
                >
                  {subscribeMessage}
                </p>
              )}
            </form>
          </div>
        </motion.div>

        {/* Main Footer Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-8)',
            padding: 'var(--space-12) 0',
          }}
          className="footer-links"
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="footer-brand">
            <Link to="/" style={{ display: 'inline-block', marginBottom: 'var(--space-4)' }}>
              <img 
                src={logoDark}
                alt="Solidev Electrosoft"
                style={{ height: '135px' }}
              />
            </Link>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: '#9ca3af',
                lineHeight: '1.7',
                maxWidth: '300px',
              }}
            >
              Transforming ideas into reality through innovative software solutions. Your trusted partner for web, mobile, and AI development.
            </p>
          </motion.div>

          {/* Services Links */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#ffffff',
                marginBottom: 'var(--space-4)',
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.services.map((link) => (
                <li key={link.path} style={{ marginBottom: 'var(--space-2)' }}>
                  <Link
                    to={link.path}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: '#9ca3af',
                      textDecoration: 'none',
                      transition: 'color var(--transition-default)',
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#ffffff',
                marginBottom: 'var(--space-4)',
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.company.map((link) => (
                <li key={link.path} style={{ marginBottom: 'var(--space-2)' }}>
                  <Link
                    to={link.path}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: '#9ca3af',
                      textDecoration: 'none',
                      transition: 'color var(--transition-default)',
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#ffffff',
                marginBottom: 'var(--space-4)',
              }}
            >
              Contact
            </h4>
            <address
              style={{
                fontStyle: 'normal',
                fontSize: 'var(--text-sm)',
                color: '#9ca3af',
                lineHeight: '1.7',
              }}
            >
              <p style={{ marginBottom: 'var(--space-2)' }}>
                Next57 Coworking, Cabin No - 11,<br />
                C205 Sm Heights Industrial Area<br />
                Phase 8b Mohali, 140308, India
              </p>
              <p style={{ marginBottom: 'var(--space-2)' }}>
                <a 
                  href="tel:+919115866828" 
                  style={{ color: '#9ca3af', textDecoration: 'none' }}
                  className="footer-link"
                >
                  +91-911 586 6828
                </a>
              </p>
              <p>
                <a 
                  href="mailto:admin@solidevelectrosoft.com"
                  style={{ color: '#9ca3af', textDecoration: 'none' }}
                  className="footer-link"
                >
                  admin@solidevelectrosoft.com
                </a>
              </p>
            </address>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-4)',
            padding: 'var(--space-6) 0',
            borderTop: '1px solid var(--border-dark)',
          }}
          className="footer-bottom"
        >
          {/* Social Links */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
            }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  transition: 'all var(--transition-default)',
                }}
                className="social-link"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: '#6b7280',
              textAlign: 'center',
            }}
          >
            © {currentYear} Solidev Electrosoft (OPC) Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .modern-footer {
          padding-top: var(--space-16);
        }
        
        .footer-link:hover {
          color: var(--text-inverse) !important;
        }
        
        .social-link:hover {
          background: var(--color-primary-500) !important;
          color: var(--text-inverse) !important;
        }
        
        /* Mobile optimizations */
        @media (max-width: 767px) {
          .modern-footer {
            padding-top: var(--space-12);
          }
          
          .footer-top {
            gap: var(--space-6) !important;
            padding-bottom: var(--space-8) !important;
          }
          
          .footer-top h3 {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
          }
          
          .footer-top p {
            font-size: 0.875rem !important;
            line-height: 1.6 !important;
          }
          
          .footer-brand {
            margin-bottom: var(--space-6);
          }
          
          .footer-brand img {
            height: 80px !important;
            margin-bottom: var(--space-3) !important;
          }
          
          .footer-brand p {
            font-size: 0.875rem !important;
            line-height: 1.6 !important;
            max-width: 100% !important;
          }
          
          .footer-links {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
            padding: var(--space-8) 0 !important;
          }
          
          .footer-links > div {
            width: 100%;
          }
          
          .footer-links h4 {
            font-size: 0.75rem !important;
            margin-bottom: var(--space-3) !important;
          }
          
          .footer-links ul li {
            margin-bottom: var(--space-2) !important;
          }
          
          .footer-links ul li a,
          .footer-links address {
            font-size: 0.875rem !important;
            line-height: 1.6 !important;
          }
          
          .footer-links address p {
            margin-bottom: var(--space-2) !important;
          }
          
          .footer-bottom {
            padding: var(--space-5) 0 !important;
            gap: var(--space-4) !important;
          }
          
          .footer-bottom p {
            font-size: 0.75rem !important;
            line-height: 1.5 !important;
            padding: 0 var(--space-2);
          }
        }
        
        @media (min-width: 480px) {
          .newsletter-form {
            flex-direction: row !important;
          }
        }
        
        @media (min-width: 768px) {
          .modern-footer {
            padding-top: var(--section-md);
          }
          
          .footer-top {
            grid-template-columns: 1fr 1fr !important;
          }
          
          .footer-links {
            grid-template-columns: 2fr 1fr 1fr 1fr !important;
          }
          
          .footer-bottom {
            flex-direction: row !important;
            justify-content: space-between !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default ModernFooter;
