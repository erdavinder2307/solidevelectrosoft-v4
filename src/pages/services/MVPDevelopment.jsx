import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModernHeader from '../../components/layout/ModernHeader';
import ModernFooter from '../../components/layout/ModernFooter';
import CTABanner from '../../components/sections/CTABanner';
import { FloatingCTA } from '../../components/ui';
import AIProjectAssistant from '../../components/ai/AIProjectAssistant';
import { FaRocket, FaBullseye, FaChartLine, FaCrown, FaLock, FaCode, FaArrowUp, FaLightbulb, FaRegClipboard, FaCompass, FaCubes } from 'react-icons/fa';
import { useAIAssistant } from '../../hooks/useAIAssistant';

/**
 * MVP Development & Startup Packages Service Page
 */
const MVPDevelopmentService = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  
  useEffect(() => {
    document.title = 'MVP Development for Startups | Solidev Electrosoft';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Launch your startup faster with our MVP development packages. From idea to market in 4-8 weeks. Fixed-price packages for web and mobile MVPs.');
    }
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      name: 'Idea Validation',
      price: '$99',
      duration: 'One-time',
      ideal: 'Test your idea',
      icon: FaLightbulb,
      bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      accentColor: '#f59e0b',
      shadowColor: '#f59e0b20',
      tier: 'entry',
      features: [
        'AI-assisted idea discussion',
        'Problem & solution clarity',
        'High-level feasibility check',
        'Feature brainstorming',
        'Basic guidance & next steps',
      ],
      notIncluded: [
        'Coding or development',
        'Production-ready output',
        'App delivery',
      ],
      disclaimer: 'This plan focuses on idea clarity, not development.',
      ctaText: 'Validate My Idea',
      ctaAction: 'contact',
      popular: false,
    },
    {
      name: 'Idea to Prototype',
      price: '$499',
      duration: 'One-time',
      ideal: 'Turn idea into design',
      icon: FaRegClipboard,
      bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      accentColor: '#8b5cf6',
      shadowColor: '#8b5cf620',
      tier: 'entry',
      features: [
        'Everything in Idea Validation',
        'Structured requirements document',
        'Feature prioritization',
        'Tech stack recommendation',
        'Clickable wireframe/prototype',
        'Rough cost & timeline estimate',
      ],
      notIncluded: [
        'Development or coding',
        'Deployment',
      ],
      disclaimer: 'Outputs are designs and planning documents, not production code.',
      ctaText: 'Create Prototype',
      ctaAction: 'contact',
      popular: false,
    },
    {
      name: 'Founder Kickstart',
      price: '$1,499',
      duration: '2-4 weeks',
      ideal: 'Launch your first MVP',
      icon: FaRocket,
      bgGradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
      accentColor: '#06b6d4',
      shadowColor: '#06b6d420',
      tier: 'core',
      features: [
        'Limited-scope MVP development',
        'Core screens only (3-5)',
        'Basic user authentication',
        'Web or mobile app',
        'Deployment & hosting',
        'Direct support',
      ],
      notIncluded: [
        'Payment integration',
        'Complex features',
        'Admin dashboard',
      ],
      disclaimer: null,
      ctaText: 'Start My MVP',
      ctaAction: 'contact',
      popular: true,
    },
    {
      name: 'Startup MVP',
      price: 'Starting from $5,000',
      duration: '6-8 weeks',
      ideal: 'Build a scalable product',
      icon: FaCubes,
      bgGradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      accentColor: '#10b981',
      shadowColor: '#10b98120',
      tier: 'premium',
      features: [
        'Full MVP with core features',
        'Web + Mobile (React Native)',
        'User authentication + roles',
        'Payment integration',
        'Database & backend setup',
        '2-3 third-party integrations',
        'Cloud deployment',
      ],
      notIncluded: [
        'Custom AI features',
        'Enterprise scale',
      ],
      disclaimer: 'Final pricing after discovery call based on scope.',
      ctaText: 'Build My Product',
      ctaAction: 'contact',
      popular: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      duration: '8-12+ weeks',
      ideal: 'Large-scale solutions',
      icon: FaCrown,
      bgGradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      accentColor: '#ec4899',
      shadowColor: '#ec489920',
      tier: 'premium',
      features: [
        'Full platform (Web + iOS + Android)',
        'Advanced features & integrations',
        'Custom AI/ML capabilities',
        'Advanced security & compliance',
        'Dedicated project manager',
        'Priority support & SLA',
        'Documentation & training',
        'Auto-scaling infrastructure',
      ],
      notIncluded: [],
      disclaimer: null,
      ctaText: 'Request Custom Proposal',
      ctaAction: 'contact',
      popular: false,
    },
  ];

  const process = [
    {
      week: 'Week 1',
      title: 'Discovery & Design',
      description: 'Requirements analysis, user stories, wireframes, and tech stack decisions.',
    },
    {
      week: 'Week 2-3',
      title: 'Core Development',
      description: 'Backend setup, database design, authentication, and main features.',
    },
    {
      week: 'Week 3-4',
      title: 'Frontend & Integration',
      description: 'UI implementation, API integration, and third-party services.',
    },
    {
      week: 'Week 4+',
      title: 'Testing & Launch',
      description: 'QA testing, bug fixes, deployment, and launch support.',
    },
  ];

  const whyUs = [
    {
      title: 'Fixed Price, No Surprises',
      description: 'Know exactly what you\'re paying upfront. No hidden costs or scope creep surprises.',
      icon: FaLock,
      bgGradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      accentColor: '#10b981',
      shadowColor: '#10b98120',
    },
    {
      title: 'Startup DNA',
      description: 'We understand the startup journey. Lean methodologies, rapid iterations, and strategic pivots built into every project.',
      icon: FaRocket,
      bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      accentColor: '#f59e0b',
      shadowColor: '#f59e0b20',
    },
    {
      title: 'Code You Own',
      description: 'Full source code ownership from day one. Switch developers anytime.',
      icon: FaCode,
      bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      accentColor: '#8b5cf6',
      shadowColor: '#8b5cf620',
    },
    {
      title: 'Future-Ready Architecture',
      description: 'Built to scale. When you grow, your tech stack won\'t hold you back.',
      icon: FaArrowUp,
      bgGradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
      accentColor: '#06b6d4',
      shadowColor: '#06b6d420',
    },
  ];

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
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
                radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)
              `,
            }}
          />

          <div className="modern-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="modern-badge"
                style={{ marginBottom: 'var(--space-4)', background: 'rgba(34, 197, 94, 0.2)', borderColor: 'rgba(34, 197, 94, 0.5)' }}
              >
                🚀 MVP Development for Startups
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-h1"
                style={{
                  color: 'white',
                  marginBottom: 'var(--space-6)',
                  lineHeight: 1.1,
                }}
              >
                From Idea to{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Market
                </span>{' '}
                in Weeks
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-neutral-400)',
                  marginBottom: 'var(--space-8)',
                  lineHeight: 1.7,
                }}
              >
                Start validating your idea today for just $99. Whether you're exploring a concept 
                or building a full-scale MVP, we have a plan to help you move forward with confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 'var(--space-4)',
                }}
              >
                <a href="#packages" className="modern-btn modern-btn-primary modern-btn-lg">
                  View MVP Packages
                  <span>↓</span>
                </a>
                <a
                  href="https://wa.me/919115866828?text=Hi,%20I'm%20a%20startup%20founder%20interested%20in%20MVP%20development"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modern-btn modern-btn-outline modern-btn-lg"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  💬 Chat With Us
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 'var(--space-8)',
                  marginTop: 'var(--space-10)',
                  paddingTop: 'var(--space-8)',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'white' }}>
                    20+
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    Startups Launched
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'white' }}>
                    4-8 Weeks
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    Avg. Time to Launch
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'white' }}>
                    $5M+
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    Raised by Our Clients
                  </div>
                </div> */}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Packages */}
        <section id="packages" style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Plans for Every Stage
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                Start with idea validation, grow to a fully-fledged product. Each plan is designed to help you move to the next stage with clarity and confidence.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', alignItems: 'stretch' }}>
              {packages.map((pkg, index) => {
                const Icon = pkg.icon;
                const isEntryTier = pkg.tier === 'entry';
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -12, transition: { duration: 0.3 } }}
                    className="package-card"
                    style={{
                      padding: 'var(--space-8)',
                      background: pkg.popular ? 'var(--bg-dark)' : (isEntryTier ? 'var(--bg-secondary)' : 'var(--bg-secondary)'),
                      borderRadius: 'var(--radius-xl)',
                      border: pkg.popular ? `2px solid ${pkg.accentColor}` : `1px solid var(--border-light)`,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      boxShadow: `0 4px 12px ${pkg.shadowColor}`,
                      cursor: 'pointer',
                      transition: 'all var(--transition-default)',
                    }}
                  >
                    {/* Gradient accent background */}
                    <div
                      style={{
                        position: 'absolute',
                        top: -40,
                        right: -40,
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        opacity: 0.08,
                        background: pkg.bgGradient,
                        pointerEvents: 'none',
                      }}
                    />

                    {pkg.popular && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-12px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          padding: 'var(--space-1) var(--space-4)',
                          background: pkg.accentColor,
                          color: 'white',
                          fontSize: 'var(--text-xs)',
                          fontWeight: '600',
                          borderRadius: 'var(--radius-full)',
                          textTransform: 'uppercase',
                          zIndex: 10,
                        }}
                      >
                        Most Popular
                      </span>
                    )}

                    {/* Icon Container */}
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--radius-lg)',
                        background: pkg.bgGradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 'var(--space-4)',
                        boxShadow: `0 12px 24px ${pkg.shadowColor}`,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Icon size={28} color="#ffffff" />
                    </div>

                    {/* Package Info */}
                    <div style={{ marginBottom: 'var(--space-6)', position: 'relative', zIndex: 1 }}>
                      <span
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: pkg.popular ? `${pkg.accentColor}cc` : 'var(--text-tertiary)',
                          textTransform: 'uppercase',
                          fontWeight: '600',
                        }}
                      >
                        {pkg.ideal}
                      </span>
                      <h3
                        className="modern-h4"
                        style={{
                          marginBottom: 'var(--space-2)',
                          color: pkg.popular ? 'white' : 'var(--text-primary)',
                          marginTop: 'var(--space-2)',
                        }}
                      >
                        {pkg.name}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
                        <span
                          style={{
                            fontSize: 'var(--text-3xl)',
                            fontWeight: '700',
                            color: pkg.popular ? 'white' : 'var(--text-primary)',
                            lineHeight: 1.1,
                          }}
                        >
                          {pkg.price}
                        </span>
                        <span
                          style={{
                            color: pkg.popular ? 'var(--color-neutral-400)' : 'var(--text-tertiary)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: '500',
                          }}
                        >
                          {pkg.duration}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        marginBottom: 'var(--space-4)',
                        flex: 1,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {pkg.features.map((feature, i) => (
                        <li
                          key={i}
                          style={{
                            padding: 'var(--space-2) 0',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--space-2)',
                            fontSize: 'var(--text-sm)',
                            color: pkg.popular ? 'var(--color-neutral-300)' : 'var(--text-secondary)',
                            lineHeight: 1.5,
                          }}
                          className="feature-item"
                        >
                          <span
                            style={{
                              color: pkg.accentColor,
                              fontWeight: '600',
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {pkg.notIncluded.map((feature, i) => (
                        <li
                          key={`not-${i}`}
                          style={{
                            padding: 'var(--space-2) 0',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--space-2)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-neutral-500)',
                            textDecoration: 'line-through',
                            opacity: 0.5,
                            lineHeight: 1.5,
                          }}
                        >
                          <span style={{ flexShrink: 0 }}>✗</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Disclaimer */}
                    {pkg.disclaimer && (
                      <p
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-neutral-500)',
                          fontStyle: 'italic',
                          marginBottom: 'var(--space-4)',
                          padding: 'var(--space-3)',
                          background: pkg.popular ? 'rgba(0,0,0,0.2)' : 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius-lg)',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        {pkg.disclaimer}
                      </p>
                    )}

                    <a
                      href="/contact"
                      className={`modern-btn ${pkg.popular ? 'modern-btn-primary' : 'modern-btn-outline'}`}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1,
                        textDecoration: 'none',
                        ...(pkg.popular ? {} : { borderColor: pkg.accentColor, color: pkg.accentColor }),
                      }}
                    >
                      {pkg.ctaText}
                    </a>

                    {/* Bottom accent border */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '4px',
                        width: '100%',
                        background: pkg.bgGradient,
                        opacity: pkg.popular ? 1 : 0,
                        transition: 'opacity var(--transition-default)',
                      }}
                      className="package-accent"
                    />
                  </motion.div>
                );
              })}            </div>

            {/* Enhanced hover styles */}
            <style>{`
              .package-card:hover {
                border-color: var(--color-primary-500);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
              }

              .package-card:hover .package-accent {
                opacity: 1;
              }

              .package-card:hover .feature-item {
                color: inherit;
              }
            `}</style>

            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                marginTop: 'var(--space-8)',
                padding: 'var(--space-6)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
              }}
            >
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                <strong>Not sure which plan is right for you?</strong>
              </p>
              <a href="/contact" className="modern-btn modern-btn-outline" style={{ borderColor: 'var(--color-primary-500)', color: 'var(--color-primary-500)' }}>
                Schedule Free Consultation
              </a>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                How It Works
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                A streamlined process designed for speed without sacrificing quality.
              </p>
            </motion.div>

            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    gap: 'var(--space-6)',
                    paddingBottom: index < process.length - 1 ? 'var(--space-8)' : 0,
                    position: 'relative',
                  }}
                >
                  {/* Timeline line */}
                  {index < process.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '47px',
                        top: '60px',
                        bottom: 0,
                        width: '2px',
                        background: 'var(--border-color)',
                      }}
                    />
                  )}

                  <div
                    style={{
                      width: '96px',
                      height: '48px',
                      background: 'var(--color-primary-500)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: 'white', fontWeight: '600', fontSize: 'var(--text-sm)' }}>
                      {step.week}
                    </span>
                  </div>

                  <div>
                    <h3 className="modern-h5" style={{ marginBottom: 'var(--space-2)' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Why Startups Choose Us
              </h2>
            </motion.div>

            <div className="modern-grid-2" style={{ gap: 'var(--space-6)' }}>
              {whyUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="benefit-card"
                    style={{
                      padding: 'var(--space-6)',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-xl)',
                      border: `1px solid var(--border-light)`,
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: `0 4px 12px ${item.shadowColor}`,
                      cursor: 'pointer',
                      transition: 'all var(--transition-default)',
                    }}
                  >
                    {/* Gradient accent background */}
                    <div
                      style={{
                        position: 'absolute',
                        top: -30,
                        right: -30,
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        opacity: 0.08,
                        background: item.bgGradient,
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Icon Container */}
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--radius-lg)',
                        background: item.bgGradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 'var(--space-4)',
                        boxShadow: `0 12px 24px ${item.shadowColor}`,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Icon size={28} color="#ffffff" />
                    </div>

                    {/* Content */}
                    <h3
                      className="modern-h5"
                      style={{
                        marginBottom: 'var(--space-2)',
                        color: 'var(--text-primary)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        marginBottom: 0,
                        position: 'relative',
                        zIndex: 1,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Left accent border */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '4px',
                        background: item.bgGradient,
                        opacity: 0,
                        transition: 'opacity var(--transition-default)',
                      }}
                      className="benefit-accent"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Enhanced hover styles */}
          <style>{`
            .benefit-card:hover {
              border-color: var(--color-primary-500);
              box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
            }

            .benefit-card:hover .benefit-accent {
              opacity: 1;
            }
          `}</style>
        </section>

        <CTABanner
          variant="gradient"
          title="Ready to launch your MVP?"
          subtitle="Book a free 30-minute strategy call. Let's turn your idea into reality."
          primaryCTA={{
            text: 'Book Free Strategy Call',
            link: '/contact',
          }}
          secondaryCTA={{
            text: 'View Our Work',
            link: '/products',
          }}
        />
      </main>
      <ModernFooter />
      <FloatingCTA onQuoteClick={openAI} />
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />
    </>
  );
};

export default MVPDevelopmentService;
