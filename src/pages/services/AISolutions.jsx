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
 * AI & Machine Learning Solutions Service Page
 */
const AISolutionsService = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  
  useEffect(() => {
    document.title = 'AI & Machine Learning Solutions | Solidev Electrosoft';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Transform your business with AI. Custom machine learning models, intelligent automation, chatbots, and predictive analytics solutions.');
    }
    window.scrollTo(0, 0);
  }, []);

  const solutions = [
    {
      icon: '🤖',
      title: 'Custom AI Chatbots',
      description: 'Intelligent conversational AI for customer support, sales, and internal operations',
      features: ['Natural Language Processing', '24/7 Customer Support', 'Multi-language Support', 'CRM Integration'],
    },
    {
      icon: '📊',
      title: 'Predictive Analytics',
      description: 'Data-driven insights to forecast trends, optimize operations, and reduce costs',
      features: ['Sales Forecasting', 'Demand Prediction', 'Risk Assessment', 'Customer Churn Analysis'],
    },
    {
      icon: '🔍',
      title: 'Computer Vision',
      description: 'Image and video analysis for quality control, security, and automation',
      features: ['Object Detection', 'Image Classification', 'OCR & Document Processing', 'Video Analytics'],
    },
    {
      icon: '⚡',
      title: 'Process Automation',
      description: 'Intelligent automation to streamline workflows and eliminate repetitive tasks',
      features: ['Document Processing', 'Data Entry Automation', 'Workflow Optimization', 'Email Classification'],
    },
  ];

  const useCases = [
    {
      industry: 'Healthcare',
      examples: ['Patient triage chatbots', 'Medical image analysis', 'Appointment scheduling AI'],
    },
    {
      industry: 'Finance',
      examples: ['Fraud detection', 'Credit scoring', 'Automated compliance'],
    },
    {
      industry: 'Retail',
      examples: ['Product recommendations', 'Inventory optimization', 'Dynamic pricing'],
    },
    {
      industry: 'Manufacturing',
      examples: ['Quality control', 'Predictive maintenance', 'Supply chain optimization'],
    },
  ];

  const technologies = [
    'TensorFlow', 'PyTorch', 'OpenAI API', 'Azure AI', 'AWS SageMaker',
    'Langchain', 'Hugging Face', 'Scikit-learn', 'Python', 'FastAPI',
  ];

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
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
                radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 40%),
                radial-gradient(circle at 70% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 40%)
              `,
            }}
          />

          {/* Animated particles effect */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  background: 'rgba(139, 92, 246, 0.5)',
                  borderRadius: '50%',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

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
                <span style={{ color: 'var(--color-primary-400)' }}>AI Solutions</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-badge"
                style={{ marginBottom: 'var(--space-4)', background: 'rgba(139, 92, 246, 0.2)', borderColor: 'rgba(139, 92, 246, 0.5)' }}
              >
                🧠 AI & Machine Learning
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
                Unlock the Power of{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Artificial Intelligence
                </span>
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
                From intelligent chatbots to predictive analytics, we help businesses 
                leverage AI to automate processes, gain insights, and create competitive 
                advantages.
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
                  Explore AI for Your Business
                  <span>→</span>
                </Link>
                <a
                  href="https://wa.me/919115866828?text=Hi,%20I'm%20interested%20in%20AI%20solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modern-btn modern-btn-outline modern-btn-lg"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  💬 Discuss Your Use Case
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                AI Solutions We Build
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Practical AI applications tailored to solve real business problems.
              </p>
            </motion.div>

            <div className="modern-grid-2" style={{ gap: 'var(--space-6)' }}>
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="modern-card"
                  style={{ padding: 'var(--space-8)' }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>
                    {solution.icon}
                  </div>
                  <h3 className="modern-h4" style={{ marginBottom: 'var(--space-2)' }}>
                    {solution.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                    {solution.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {solution.features.map((feature, i) => (
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases by Industry */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                AI Across Industries
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                We've implemented AI solutions across diverse industries.
              </p>
            </motion.div>

            <div className="modern-grid-4">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    padding: 'var(--space-6)',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <h3 className="modern-h5" style={{ marginBottom: 'var(--space-4)', color: 'var(--color-primary-500)' }}>
                    {useCase.industry}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {useCase.examples.map((example, i) => (
                      <li
                        key={i}
                        style={{
                          padding: 'var(--space-2) 0',
                          borderBottom: i < useCase.examples.length - 1 ? '1px solid var(--border-color)' : 'none',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}
            >
              <h2 className="modern-h3" style={{ marginBottom: 'var(--space-4)' }}>
                AI & ML Technologies We Use
              </h2>
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
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        <SocialProof title="Trusted by forward-thinking companies" />

        <CTABanner
          variant="dark"
          title="Ready to integrate AI into your business?"
          subtitle="Let's explore how AI can solve your specific challenges."
          primaryCTA={{
            text: 'Schedule AI Consultation',
            link: '/contact',
          }}
          secondaryCTA={{
            text: 'View Case Studies',
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

export default AISolutionsService;
