import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import CTABanner from '../components/sections/CTABanner';
import { FloatingCTA } from '../components/ui';

/**
 * Modern Portfolio Page
 * Showcase of all projects with filtering
 */
const ModernPortfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // SEO
    document.title = 'Portfolio | Solidev Electrosoft - Our Work';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        'Explore our portfolio of successful projects. Web applications, mobile apps, and AI solutions ' +
        'delivered for startups and enterprises worldwide.'
      );
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://solidev.in/portfolio');

    // Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: 'Portfolio',
        page_location: window.location.href,
        page_path: '/portfolio',
      });
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'ai', label: 'AI/ML' },
  ];

  const projects = [
    {
      id: 'core360',
      title: 'Core360',
      category: 'web',
      type: 'Web Application',
      description: 'Enterprise-grade web application built with modern technologies for streamlined business operations and workflow automation.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Dracra-tech.webp',
      tags: ['React', '.NET Core', 'SQL Server', 'Azure'],
      client: 'Dracra Technologies',
      year: '2023',
      featured: true,
    },
    {
      id: 'briind',
      title: 'Briind',
      category: 'mobile',
      type: 'Social Platform',
      description: 'Social networking application connecting communities and enabling meaningful interactions with real-time messaging.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/brind.webp',
      tags: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
      client: 'Briind Inc.',
      year: '2022',
      featured: true,
    },
    {
      id: 'fairway',
      title: 'Fairway First',
      category: 'mobile',
      type: 'Mobile Application',
      description: 'Mobile application for Fairway Independent Mortgage Corporation with seamless user experience and secure transactions.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/fairway.webp',
      tags: ['iOS', 'Android', 'Swift', 'Kotlin'],
      client: 'Fairway IMC',
      year: '2023',
      featured: true,
    },
    {
      id: 'lexis',
      title: 'Lexis Convey',
      category: 'enterprise',
      type: 'Legal Tech',
      description: 'Legal conveyancing platform for LexisNexis, streamlining property transactions and document management.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Lexisnexis.webp',
      tags: ['.NET', 'Angular', 'Azure', 'SQL Server'],
      client: 'LexisNexis',
      year: '2022',
      featured: true,
    },
    {
      id: 'ecommerce-platform',
      title: 'E-Commerce Platform',
      category: 'web',
      type: 'E-Commerce',
      description: 'Full-featured e-commerce solution with inventory management, payment processing, and analytics dashboard.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-1-v2.webp',
      tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      client: 'Retail Client',
      year: '2023',
      featured: false,
    },
    {
      id: 'healthcare-app',
      title: 'Healthcare Portal',
      category: 'enterprise',
      type: 'Healthcare',
      description: 'Patient management system with appointment scheduling, telemedicine, and electronic health records.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-2-v2.webp',
      tags: ['React', '.NET Core', 'Azure', 'HIPAA Compliant'],
      client: 'Healthcare Provider',
      year: '2023',
      featured: false,
    },
    {
      id: 'ai-chatbot',
      title: 'AI Customer Support',
      category: 'ai',
      type: 'AI/ML Solution',
      description: 'Intelligent chatbot powered by natural language processing for automated customer support.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-3-v2.webp',
      tags: ['Python', 'TensorFlow', 'Azure Bot Service', 'NLP'],
      client: 'Tech Startup',
      year: '2024',
      featured: false,
    },
    {
      id: 'fintech-app',
      title: 'FinTech Dashboard',
      category: 'web',
      type: 'Financial Services',
      description: 'Real-time financial analytics dashboard with trading insights and portfolio management.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/project/project-4-v2.webp',
      tags: ['React', 'Python', 'Redis', 'WebSocket'],
      client: 'Financial Services',
      year: '2023',
      featured: false,
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero Section */}
        <section 
          style={{
            paddingTop: '160px',
            paddingBottom: '80px',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Effects */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
            >
              <span 
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#60a5fa',
                  marginBottom: '24px',
                }}
              >
                Our Portfolio
              </span>
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.1',
                  marginBottom: '24px',
                }}
              >
                Projects That{' '}
                <span style={{ color: '#60a5fa' }}>Make an Impact</span>
              </h1>
              <p
                style={{
                  fontSize: '1.25rem',
                  color: '#9ca3af',
                  lineHeight: '1.7',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                We've helped startups and enterprises build products that users love. 
                Explore our collection of successful projects.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="modern-section-lg">
          <div className="modern-container">
            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '48px',
              }}
            >
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '100px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: activeFilter === filter.id ? '#3b82f6' : '#f3f4f6',
                    color: activeFilter === filter.id ? '#ffffff' : '#6b7280',
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '32px',
              }}
              className="portfolio-grid"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div
                      style={{
                        background: '#ffffff',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.3s ease',
                        height: '100%',
                      }}
                      className="portfolio-card"
                    >
                      {/* Project Image */}
                      <div
                        style={{
                          aspectRatio: '16/10',
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                          }}
                          className="portfolio-image"
                        />
                        {project.featured && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '16px',
                              right: '16px',
                              padding: '6px 16px',
                              background: '#3b82f6',
                              borderRadius: '100px',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#ffffff',
                            }}
                          >
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Project Content */}
                      <div style={{ padding: '28px' }}>
                        {/* Type Badge */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '12px',
                          }}
                        >
                          <span
                            style={{
                              padding: '4px 12px',
                              background: 'rgba(59, 130, 246, 0.1)',
                              borderRadius: '100px',
                              fontSize: '12px',
                              fontWeight: '500',
                              color: '#3b82f6',
                            }}
                          >
                            {project.type}
                          </span>
                          <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                            {project.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '12px',
                          }}
                        >
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p
                          style={{
                            fontSize: '15px',
                            color: '#6b7280',
                            lineHeight: '1.7',
                            marginBottom: '20px',
                          }}
                        >
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginBottom: '20px',
                          }}
                        >
                          {project.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              style={{
                                padding: '4px 10px',
                                background: '#f3f4f6',
                                borderRadius: '6px',
                                fontSize: '12px',
                                color: '#6b7280',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Client */}
                        <div
                          style={{
                            paddingTop: '16px',
                            borderTop: '1px solid #e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                            Client: <strong style={{ color: '#374151' }}>{project.client}</strong>
                          </span>
                          <Link
                            to={`/portfolio/${project.id}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#3b82f6',
                              textDecoration: 'none',
                            }}
                          >
                            View Details
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  color: '#6b7280',
                }}
              >
                <p style={{ fontSize: '1.125rem' }}>No projects found in this category.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Process Section */}
        <section 
          className="modern-section-lg"
          style={{ background: '#f9fafb' }}
        >
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}
            >
              <span 
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#3b82f6',
                  marginBottom: '16px',
                }}
              >
                Our Process
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '700',
                  color: '#111827',
                  lineHeight: '1.2',
                  marginBottom: '16px',
                }}
              >
                How We Bring Ideas to Life
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.7' }}>
                Our proven development process ensures successful project delivery every time.
              </p>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '32px',
              }}
              className="process-grid"
            >
              {[
                { step: '01', title: 'Discovery', desc: 'We dive deep into your requirements and business goals.' },
                { step: '02', title: 'Design', desc: 'Creating intuitive UI/UX that users love.' },
                { step: '03', title: 'Development', desc: 'Building with clean, scalable code.' },
                { step: '04', title: 'Delivery', desc: 'Launching and ongoing support.' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    textAlign: 'center',
                    padding: '32px 24px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div
                    style={{
                      fontSize: '3rem',
                      fontWeight: '700',
                      color: '#3b82f6',
                      opacity: 0.3,
                      marginBottom: '16px',
                    }}
                  >
                    {item.step}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTABanner
          variant="gradient"
          title="Have a Project in Mind?"
          subtitle="Let's discuss how we can bring your vision to life with our expertise."
          primaryCTA={{
            text: 'Start Your Project',
            link: '/contact',
          }}
          secondaryCTA={{
            text: 'Schedule a Call',
            link: 'https://wa.me/919115866828',
            external: true,
          }}
        />
      </main>
      <ModernFooter />
      <FloatingCTA />

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: 1fr !important;
            max-width: 600px;
            margin: 0 auto;
          }
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 640px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px;
            margin: 0 auto;
          }
        }
        
        .portfolio-card:hover {
          border-color: #3b82f6 !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }
        
        .portfolio-card:hover .portfolio-image {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};

export default ModernPortfolio;
