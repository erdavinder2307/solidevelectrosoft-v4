import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import CTABanner from '../components/sections/CTABanner';
import SocialProof from '../components/sections/SocialProof';
import { FloatingCTA } from '../components/ui';
import AIProjectAssistant from '../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../hooks/useAIAssistant';

/**
 * Services Landing Page
 * Overview of all services with links to detail pages
 */
const Services = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  useEffect(() => {
    document.title = 'Our Services | Web, Mobile, AI Development | Solidev Electrosoft';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Full-stack software development services. Custom web apps, mobile apps, AI solutions, and MVP development for startups and enterprises.');
    }
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: '🌐',
      title: 'Web Application Development',
      description: 'Custom web applications built with modern frameworks. From enterprise portals to customer-facing platforms.',
      features: ['React / Next.js / Vue', 'Node.js / .NET / Python', 'Cloud-native architecture', 'API development'],
      link: '/services/web-development',
      color: '#3b82f6',
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile apps for iOS and Android. Beautiful, performant, user-friendly.',
      features: ['React Native / Flutter', 'Native iOS (Swift)', 'Native Android (Kotlin)', 'App Store optimization'],
      link: '/services/mobile-app-development',
      color: '#8b5cf6',
    },
    {
      icon: '🧠',
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by AI. Chatbots, analytics, computer vision, and automation.',
      features: ['Custom AI chatbots', 'Predictive analytics', 'Computer vision', 'Process automation'],
      link: '/services/ai-solutions',
      color: '#06b6d4',
    },
    {
      icon: '🚀',
      title: 'MVP Development',
      description: 'Launch your startup faster with our fixed-price MVP packages. From idea to market in weeks.',
      features: ['Fixed-price packages', '4-8 week delivery', 'Full source code ownership', 'Scale-ready architecture'],
      link: '/services/mvp-development',
      color: '#22c55e',
    },
  ];

  const additionalServices = [
    { name: 'UI/UX Design', icon: '🎨' },
    { name: 'Cloud Migration', icon: '☁️' },
    { name: 'DevOps & CI/CD', icon: '⚙️' },
    { name: 'API Development', icon: '🔗' },
    { name: 'Database Design', icon: '🗄️' },
    { name: 'Security Audits', icon: '🔒' },
    { name: 'Performance Optimization', icon: '⚡' },
    { name: 'Maintenance & Support', icon: '🛠️' },
  ];

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--bg-dark) 0%, #1a1a2e 100%)',
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
                radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)
              `,
            }}
          />

          <div className="modern-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="modern-badge"
              >
                Our Services
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-h1"
                style={{ color: 'white', marginTop: 'var(--space-4)', marginBottom: 'var(--space-6)' }}
              >
                End-to-End{' '}
                <span className="gradient-text">Software Development</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-neutral-400)',
                  lineHeight: 1.7,
                }}
              >
                From concept to deployment, we build digital solutions that drive business growth. 
                Expert team, proven methodologies, exceptional results.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Services Grid */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <div className="modern-grid-2" style={{ gap: 'var(--space-8)' }}>
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={service.link}
                    style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                  >
                    <div
                      className="modern-card"
                      style={{
                        height: '100%',
                        padding: 'var(--space-8)',
                        transition: 'all var(--transition-default)',
                        borderTop: `3px solid ${service.color}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      }}
                    >
                      <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>
                        {service.icon}
                      </div>

                      <h2 className="modern-h3" style={{ marginBottom: 'var(--space-3)' }}>
                        {service.title}
                      </h2>

                      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.7 }}>
                        {service.description}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 'var(--space-2)',
                          marginBottom: 'var(--space-6)',
                        }}
                      >
                        {service.features.map((feature, i) => (
                          <span
                            key={i}
                            style={{
                              padding: 'var(--space-1) var(--space-3)',
                              background: 'var(--bg-tertiary)',
                              borderRadius: 'var(--radius-full)',
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          color: service.color,
                          fontWeight: '600',
                        }}
                      >
                        Learn More
                        <span>→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Additional Capabilities
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Beyond our core services, we offer specialized expertise across the software development lifecycle.
              </p>
            </motion.div>

            <div className="modern-grid-4">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  style={{
                    padding: 'var(--space-6)',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
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
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '600' }}>
                    {service.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Our Process
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                A proven methodology that delivers results predictably and efficiently.
              </p>
            </motion.div>

            <div className="modern-grid-4">
              {[
                { step: '01', title: 'Discover', desc: 'Understand your goals, users, and requirements' },
                { step: '02', title: 'Design', desc: 'Create wireframes, prototypes, and architecture' },
                { step: '03', title: 'Develop', desc: 'Build with agile sprints and continuous feedback' },
                { step: '04', title: 'Deploy', desc: 'Launch, monitor, and iterate based on data' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <div
                    style={{
                      fontSize: 'var(--text-5xl)',
                      fontWeight: '700',
                      color: 'var(--color-primary-500)',
                      opacity: 0.2,
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 className="modern-h4" style={{ marginBottom: 'var(--space-2)' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SocialProof />

        <CTABanner
          variant="gradient"
          title="Ready to start your project?"
          subtitle="Let's discuss your requirements and find the best solution for your business."
          primaryCTA={{
            text: '✨ Chat with AI Assistant',
            onClick: openAI,
            isButton: true,
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

export default Services;
