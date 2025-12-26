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
import { FaMobileAlt, FaPalette, FaBell, FaMapMarkerAlt, FaCreditCard, FaLink, FaReact, FaApple } from 'react-icons/fa';
import { SiFlutter, SiKotlin } from 'react-icons/si';
import { useSEO } from '../../hooks/useSEO';
import { pageSEO } from '../../utils/seo';
import { getCommonSchemas, generateBreadcrumbSchema, generateServiceSchema } from '../../utils/structuredData';

/**
 * Mobile App Development Service Page
 */
const MobileAppService = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  
  // SEO Configuration
  useSEO({
    title: pageSEO.servicesMobileApp.title,
    description: pageSEO.servicesMobileApp.description,
    keywords: pageSEO.servicesMobileApp.keywords,
    canonical: pageSEO.servicesMobileApp.canonical,
    ogType: pageSEO.servicesMobileApp.ogType,
    schemas: [
      ...getCommonSchemas(),
      generateServiceSchema({
        name: 'Mobile App Development',
        description: 'Native and cross-platform mobile app development for iOS and Android. Expert React Native and Flutter development services.',
        offerings: [
          { name: 'Native iOS Apps', description: 'Swift-based native iOS applications' },
          { name: 'Native Android Apps', description: 'Kotlin-based native Android applications' },
          { name: 'React Native Apps', description: 'Cross-platform mobile apps using React Native' },
          { name: 'Flutter Apps', description: 'Beautiful cross-platform apps with Flutter' },
          { name: 'App Store Optimization', description: 'Launch and optimize your app on app stores' },
        ],
      }),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
        { name: 'Services', url: 'https://www.solidevelectrosoft.com/services' },
        { name: 'Mobile App Development', url: 'https://www.solidevelectrosoft.com/services/mobile-app-development' },
      ]),
    ],
  });

  const features = [
    {
      icon: FaMobileAlt,
      title: 'Native Performance',
      description: 'Apps that feel fast and responsive with native-like experiences',
    },
    {
      icon: FaPalette,
      title: 'Beautiful UI/UX',
      description: 'Intuitive interfaces following iOS and Android design guidelines',
    },
    {
      icon: FaBell,
      title: 'Push Notifications',
      description: 'Engage users with targeted notifications and updates',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location Services',
      description: 'GPS, geofencing, and location-based features',
    },
    {
      icon: FaCreditCard,
      title: 'In-App Payments',
      description: 'Secure payment integration with Stripe, PayPal, and more',
    },
    {
      icon: FaLink,
      title: 'Offline Support',
      description: 'Apps that work seamlessly even without internet connection',
    },
  ];

  const platforms = [
    {
      name: 'React Native',
      description: 'Build once, deploy to iOS and Android with near-native performance.',
      badge: 'Cross-Platform',
      icon: FaReact,
      bgGradient: 'linear-gradient(135deg, #61dafb 0%, #61dafb 100%)',
      badgeColor: '#61dafb',
      accentColor: '#087ea4',
    },
    {
      name: 'Flutter',
      description: 'Google\'s UI toolkit for beautiful, natively compiled applications.',
      badge: 'Cross-Platform',
      icon: SiFlutter,
      bgGradient: 'linear-gradient(135deg, #02569b 0%, #0ea5e9 100%)',
      badgeColor: '#0ea5e9',
      accentColor: '#02569b',
    },
    {
      name: 'Swift/SwiftUI',
      description: 'Native iOS development for maximum Apple ecosystem integration.',
      badge: 'iOS Native',
      icon: FaApple,
      bgGradient: 'linear-gradient(135deg, #000000 0%, #555555 100%)',
      badgeColor: '#ffffff',
      accentColor: '#000000',
    },
    {
      name: 'Kotlin',
      description: 'Modern Android development with Google\'s preferred language.',
      badge: 'Android Native',
      icon: SiKotlin,
      bgGradient: 'linear-gradient(135deg, #7f52ff 0%, #6b20a8 100%)',
      badgeColor: '#7f52ff',
      accentColor: '#6b20a8',
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
                that delight users and drive business growth. Need a{' '}
                <Link to="/services/web-development" style={{ color: 'var(--color-primary-400)', textDecoration: 'underline' }}>
                  backend API
                </Link>? Want{' '}
                <Link to="/services/ai-solutions" style={{ color: 'var(--color-primary-400)', textDecoration: 'underline' }}>
                  AI features
                </Link>? View our{' '}
                <Link to="/portfolio" style={{ color: 'var(--color-primary-400)', textDecoration: 'underline' }}>
                  mobile portfolio
                </Link>.
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
                {/* <div>
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
                </div> */}
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

            <div className="modern-grid-3" style={{ gap: 'var(--space-6)' }}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  style={{
                    padding: 'var(--space-8)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'all var(--transition-default)',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  className="feature-card-mobile"
                >
                  {(() => {
                    const Icon = feature.icon;
                    return (
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: 'var(--radius-lg)',
                          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 'var(--space-4)',
                          boxShadow: '0 8px 16px rgba(168, 85, 247, 0.2)',
                          margin: '0 auto var(--space-4)',
                        }}
                      >
                        <Icon size={28} color="#ffffff" />
                      </div>
                    );
                  })()}
                  <h3
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-2)',
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add CSS for hover effects */}
        <style>{`
          .feature-card-mobile:hover {
            border-color: #a855f7;
            box-shadow: 0 20px 40px rgba(168, 85, 247, 0.15);
          }
        `}</style>

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
              {platforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -12, transition: { duration: 0.3 } }}
                    className="platform-card"
                    style={{
                      background: 'var(--bg-primary)',
                      borderRadius: 'var(--radius-xl)',
                      padding: 'var(--space-8)',
                      border: '1px solid var(--border-light)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all var(--transition-default)',
                    }}
                  >
                    {/* Gradient accent background */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        opacity: 0.08,
                        background: platform.bgGradient,
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Icon Container */}
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: 'var(--radius-lg)',
                        background: platform.bgGradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 'var(--space-4)',
                        boxShadow: `0 12px 24px ${platform.accentColor}20`,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Icon size={32} color="#ffffff" />
                    </div>

                    {/* Badge */}
                    <div
                      style={{
                        display: 'inline-block',
                        padding: 'var(--space-1) var(--space-3)',
                        background: `${platform.badgeColor}15`,
                        color: platform.badgeColor,
                        fontSize: 'var(--text-xs)',
                        fontWeight: '700',
                        borderRadius: 'var(--radius-full)',
                        marginBottom: 'var(--space-4)',
                        border: `1px solid ${platform.badgeColor}30`,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {platform.badge}
                    </div>

                    {/* Content */}
                    <h3
                      style={{
                        fontSize: 'var(--text-xl)',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-3)',
                        lineHeight: 1.2,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {platform.name}
                    </h3>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 1.7,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {platform.description}
                    </p>

                    {/* Bottom accent line */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '3px',
                        width: '100%',
                        background: platform.bgGradient,
                        opacity: 0,
                        transition: 'opacity var(--transition-default)',
                      }}
                      className="platform-accent"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced hover styles */}
        <style>{`
          .platform-card:hover {
            border-color: var(--color-primary-500);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .platform-card:hover .platform-accent {
            opacity: 1;
          }
        `}</style>

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

        {/* Related Services */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Complete Your Digital Ecosystem
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto' }}>
                Complement your mobile app with our other services
              </p>
            </motion.div>

            <div className="modern-grid-3" style={{ gap: 'var(--space-6)' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/services/web-development"
                  style={{
                    display: 'block',
                    padding: 'var(--space-6)',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  className="related-service-card"
                >
                  <h3 className="modern-h4" style={{ marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
                    Web Application
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                    Build a web dashboard or admin panel to complement your mobile app
                  </p>
                  <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Learn More →</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/services/ai-solutions"
                  style={{
                    display: 'block',
                    padding: 'var(--space-6)',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  className="related-service-card"
                >
                  <h3 className="modern-h4" style={{ marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
                    AI Integration
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                    Add intelligent features like chatbots, recommendations, and predictions
                  </p>
                  <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Learn More →</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/portfolio"
                  style={{
                    display: 'block',
                    padding: 'var(--space-6)',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  className="related-service-card"
                >
                  <h3 className="modern-h4" style={{ marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
                    Mobile Apps We've Built
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                    See successful mobile apps we've delivered for clients worldwide
                  </p>
                  <span style={{ color: 'var(--primary)', fontWeight: '600' }}>View Portfolio →</span>
                </Link>
              </motion.div>
            </div>
          </div>

          <style>{`
            .related-service-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
              border-color: var(--primary);
            }
          `}</style>
        </section>

        <CTABanner
          variant="gradient"
          title="Ready to build your mobile app?"
          subtitle="Let's bring your app idea to life. Free consultation included."
          primaryCTA={{
            text: '✨ Chat with AI',
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
