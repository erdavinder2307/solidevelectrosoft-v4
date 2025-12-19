import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModernHeader from '../../components/layout/ModernHeader';
import ModernFooter from '../../components/layout/ModernFooter';
import CTABanner from '../../components/sections/CTABanner';
import SocialProof from '../../components/sections/SocialProof';
import { FloatingCTA } from '../../components/ui';
import { IconBox } from '../../components/ui/Placeholders';
import AIProjectAssistant from '../../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import { FaRocket, FaMobileAlt, FaLock, FaCloud, FaSyncAlt, FaChartBar } from 'react-icons/fa';

/**
 * Web Development Service Page
 * Detailed service page for web application development
 */
const WebDevelopmentService = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  
  useEffect(() => {
    document.title = 'Custom Web Application Development | Solidev Electrosoft';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Transform your business with custom web applications. React, Node.js, cloud-native solutions built for scale and performance.');
    }
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: FaRocket,
      title: 'High-Performance Apps',
      description: 'Lightning-fast load times with optimized code and modern frameworks',
    },
    {
      icon: FaMobileAlt,
      title: 'Responsive Design',
      description: 'Seamless experience across all devices and screen sizes',
    },
    {
      icon: FaLock,
      title: 'Enterprise Security',
      description: 'Bank-grade security with encryption and compliance standards',
    },
    {
      icon: FaCloud,
      title: 'Cloud-Native',
      description: 'Scalable architecture built for the cloud from day one',
    },
    {
      icon: FaSyncAlt,
      title: 'CI/CD Pipeline',
      description: 'Automated testing and deployment for rapid iterations',
    },
    {
      icon: FaChartBar,
      title: 'Analytics Built-in',
      description: 'Track user behavior and make data-driven decisions',
    },
  ];

  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: '.NET', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements, define the scope, and create a detailed project roadmap.',
    },
    {
      step: '02',
      title: 'UI/UX Design',
      description: 'Our designers create intuitive interfaces with user experience at the core.',
    },
    {
      step: '03',
      title: 'Development',
      description: 'Agile development with regular sprints, demos, and continuous feedback integration.',
    },
    {
      step: '04',
      title: 'Testing & QA',
      description: 'Rigorous testing including unit, integration, and end-to-end tests.',
    },
    {
      step: '05',
      title: 'Deployment',
      description: 'Seamless deployment with zero downtime and comprehensive monitoring.',
    },
    {
      step: '06',
      title: 'Support & Maintenance',
      description: 'Ongoing support, updates, and performance optimization.',
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to build a web application?',
      answer: 'Timeline varies based on complexity. Simple applications: 4-8 weeks. Medium complexity: 8-16 weeks. Enterprise solutions: 16+ weeks. We provide detailed estimates after discovery.',
    },
    {
      question: 'What technologies do you recommend?',
      answer: 'We recommend based on your specific needs. React/Next.js for dynamic UIs, Node.js for real-time features, .NET for enterprise integrations. We always choose the right tool for the job.',
    },
    {
      question: 'Do you provide post-launch support?',
      answer: 'Yes! We offer flexible support packages including bug fixes, feature updates, security patches, and performance optimization. Most clients choose our monthly retainer plans.',
    },
    {
      question: 'Can you work with our existing systems?',
      answer: 'Absolutely. We specialize in integrating with existing databases, APIs, and enterprise systems. Our team has experience with legacy system modernization and data migration.',
    },
  ];

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--bg-dark) 0%, #1a1a2e 100%)',
            padding: 'var(--space-24) 0 var(--space-16)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)
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
                <span style={{ color: 'var(--color-primary-400)' }}>Web Development</span>
              </motion.div>

              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-badge"
                style={{ marginBottom: 'var(--space-4)' }}
              >
                🌐 Web Application Development
              </motion.span>

              {/* Title */}
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
                Build{' '}
                <span className="gradient-text">Powerful</span>{' '}
                Web Applications
              </motion.h1>

              {/* Description */}
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
                From complex enterprise portals to sleek customer-facing applications, 
                we craft web solutions that drive results. Modern technology, 
                scalable architecture, exceptional user experience.
              </motion.p>

              {/* CTAs */}
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
                  Start Your Project
                  <span>→</span>
                </Link>
                <a
                  href="https://wa.me/919115866828?text=Hi,%20I'm%20interested%20in%20web%20development%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modern-btn modern-btn-outline modern-btn-lg"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  💬 WhatsApp Us
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Why Choose Our Web Development
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Every application we build is crafted with performance, security, and scalability in mind.
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
                  }}
                  className="feature-card-enhanced"
                >
                  {(() => {
                    const Icon = feature.icon;
                    return (
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: 'var(--radius-lg)',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 'var(--space-4)',
                          boxShadow: '0 8px 16px rgba(59, 130, 246, 0.2)',
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
          .feature-card-enhanced:hover {
            border-color: #3b82f6;
            box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
          }
        `}</style>

        {/* Technology Stack */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Technology Stack
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                We use industry-leading technologies to build robust, scalable applications.
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
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Our Development Process
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                A proven methodology that delivers results on time, every time.
              </p>
            </motion.div>

            <div className="modern-grid-2" style={{ gap: 'var(--space-6)' }}>
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-6)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-3xl)',
                      fontWeight: '700',
                      color: 'var(--color-primary-500)',
                      opacity: 0.3,
                      lineHeight: 1,
                    }}
                  >
                    {step.step}
                  </span>
                  <div>
                    <h3 className="modern-h5" style={{ marginBottom: 'var(--space-2)' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <SocialProof title="Trusted by industry leaders" />

        {/* FAQ Section */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    padding: 'var(--space-6)',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                >
                  <h3 className="modern-h5" style={{ marginBottom: 'var(--space-2)' }}>
                    {faq.question}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTABanner
          variant="gradient"
          title="Ready to build your web application?"
          subtitle="Let's discuss your project and create something amazing together."
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

export default WebDevelopmentService;
