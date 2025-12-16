import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModernHeader from '../../components/layout/ModernHeader';
import ModernFooter from '../../components/layout/ModernFooter';
import CTABanner from '../../components/sections/CTABanner';
import SocialProof from '../../components/sections/SocialProof';
import { FloatingCTA } from '../../components/ui';
import AIProjectAssistant from '../../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../../hooks/useAIAssistant';

/**
 * Mobile App Development Service Page
 */
const MobileAppService = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  
  useEffect(() => {
    document.title = 'Mobile App Development | iOS & Android | Solidev Electrosoft';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Build native and cross-platform mobile apps for iOS and Android. React Native, Flutter experts delivering high-performance mobile solutions.');
    }
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: '📱',
      title: 'Native Performance',
      description: 'Apps that feel fast and responsive with native-like experiences',
    },
    {
      icon: '🎨',
      title: 'Beautiful UI/UX',
      description: 'Intuitive interfaces following iOS and Android design guidelines',
    },
    {
      icon: '🔔',
      title: 'Push Notifications',
      description: 'Engage users with targeted notifications and updates',
    },
    {
      icon: '📍',
      title: 'Location Services',
      description: 'GPS, geofencing, and location-based features',
    },
    {
      icon: '💳',
      title: 'In-App Payments',
      description: 'Secure payment integration with Stripe, PayPal, and more',
    },
    {
      icon: '🔗',
      title: 'Offline Support',
      description: 'Apps that work seamlessly even without internet connection',
    },
  ];

  const platforms = [
    {
      name: 'React Native',
      description: 'Build once, deploy to iOS and Android with near-native performance.',
      badge: 'Cross-Platform',
    },
    {
      name: 'Flutter',
      description: 'Google\'s UI toolkit for beautiful, natively compiled applications.',
      badge: 'Cross-Platform',
    },
    {
      name: 'Swift/SwiftUI',
      description: 'Native iOS development for maximum Apple ecosystem integration.',
      badge: 'iOS Native',
    },
    {
      name: 'Kotlin',
      description: 'Modern Android development with Google\'s preferred language.',
      badge: 'Android Native',
    },
  ];

  const appTypes = [
    'E-commerce Apps',
    'Social Media Apps',
    'Healthcare Apps',
    'Fintech Apps',
    'On-Demand Services',
    'Education Apps',
    'Fitness & Wellness',
    'Enterprise Apps',
  ];

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            padding: 'var(--space-24) 0 var(--space-16)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
              `,
            }}
          />

          <div className="modern-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '800px' }}>
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-6)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-neutral-500)',
                }}
              >
                <Link to="/" style={{ color: 'var(--color-neutral-500)', textDecoration: 'none' }}>
                  Home
                </Link>
                <span>/</span>
                <Link to="/services" style={{ color: 'var(--color-neutral-500)', textDecoration: 'none' }}>
                  Services
                </Link>
                <span>/</span>
                <span style={{ color: 'var(--color-primary-400)' }}>Mobile App Development</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-badge"
                style={{ marginBottom: 'var(--space-4)' }}
              >
                📱 Mobile App Development
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="modern-h1"
                style={{
                  color: 'white',
                  marginBottom: 'var(--space-6)',
                  lineHeight: 1.1,
                }}
              >
                Mobile Apps That{' '}
                <span className="gradient-text">Users Love</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-neutral-400)',
                  marginBottom: 'var(--space-8)',
                  lineHeight: 1.7,
                }}
              >
                From startup MVPs to enterprise solutions, we build iOS and Android apps 
                that delight users and drive business growth. Native performance, 
                beautiful design, seamless experience.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                }}
              >
                <Link to="/contact" className="modern-btn modern-btn-primary modern-btn-lg">
                  Start Your App Project
                  <span>→</span>
                </Link>
                <a
                  href="https://wa.me/919115866828?text=Hi,%20I'm%20interested%20in%20mobile%20app%20development"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modern-btn modern-btn-outline modern-btn-lg"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  💬 WhatsApp Us
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-8)',
                  marginTop: 'var(--space-10)',
                  paddingTop: 'var(--space-8)',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: 'white' }}>
                    50+
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    Apps Delivered
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: 'white' }}>
                    4.8★
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    Average App Rating
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: 'white' }}>
                    1M+
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    Users Served
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Full-Featured Mobile Apps
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Every feature your users expect, built with performance and security in mind.
              </p>
            </motion.div>

            <div className="modern-grid-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="modern-card"
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>
                    {feature.icon}
                  </div>
                  <h3 className="modern-h5" style={{ marginBottom: 'var(--space-2)' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Choose Your Platform
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                We recommend the best technology based on your requirements and budget.
              </p>
            </motion.div>

            <div className="modern-grid-2" style={{ gap: 'var(--space-6)' }}>
              {platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="modern-card"
                >
                  <span
                    style={{
                      display: 'inline-block',
                      padding: 'var(--space-1) var(--space-2)',
                      background: 'var(--color-primary-100)',
                      color: 'var(--color-primary-700)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: '600',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {platform.badge}
                  </span>
                  <h3 className="modern-h4" style={{ marginBottom: 'var(--space-2)' }}>
                    {platform.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {platform.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* App Types */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Apps for Every Industry
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                We have experience building apps across diverse industries.
              </p>
            </motion.div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 'var(--space-3)',
              }}
            >
              {appTypes.map((type, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  style={{
                    padding: 'var(--space-3) var(--space-5)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {type}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        <SocialProof title="Trusted by innovative companies" />

        <CTABanner
          variant="gradient"
          title="Ready to build your mobile app?"
          subtitle="Let's bring your app idea to life. Free consultation included."
          primaryCTA={{
            text: 'Get Free Consultation',
            link: '/contact',
          }}
          secondaryCTA={{
            text: 'View Portfolio',
            link: '/portfolio',
          }}
        />
      </main>
      <ModernFooter />
      <FloatingCTA onQuoteClick={openAI} />
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />
    </>
  );
};

export default MobileAppService;
