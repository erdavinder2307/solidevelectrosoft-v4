import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectLogo from '../components/ui/ProjectLogo';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { FaApple, FaGooglePlay, FaGlobe } from 'react-icons/fa';
import { db } from '../config/firebase';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import CTABanner from '../components/sections/CTABanner';
import { FloatingCTA, Disclaimer } from '../components/ui';
import AIProjectAssistant from '../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../utils/seo';
import { getCommonSchemas, generateBreadcrumbSchema } from '../utils/structuredData';

/**
 * Modern Portfolio Page
 * Showcase of all projects with filtering
 */
const ModernPortfolio = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryModal, setGalleryModal] = useState({ isOpen: false, project: null, currentIndex: 0 });

  // SEO Configuration
  useSEO({
    title: pageSEO.portfolio.title,
    description: pageSEO.portfolio.description,
    keywords: pageSEO.portfolio.keywords,
    canonical: pageSEO.portfolio.canonical,
    ogType: pageSEO.portfolio.ogType,
    schemas: [
      ...getCommonSchemas(),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
        { name: 'Portfolio', url: 'https://www.solidevelectrosoft.com/portfolio' },
      ]),
    ],
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const portfoliosQuery = query(
        collection(db, 'portfolios'),
        where('status', 'in', ['completed', 'in progress','in-progress']),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(portfoliosQuery);
      const portfoliosData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.projectName,
          category: mapCategory(data.category),
          type: data.category,
          description: data.description,
          image: data.logo || data.thumbnailUrl || (data.images && data.images[0]) || '',
          images: data.images || [],
          logo: data.logo || '',
          tags: data.technologies || [],
          client: data.client,
          year: String(data.year || extractYear(data.createdAt)),
          featured: data.featured || false,
          displayOrder: data.displayOrder || 0,
          status: data.status || 'completed',
          webAppUrl: data.webAppUrl || '',
          androidAppUrl: data.androidAppUrl || '',
          iosAppUrl: data.iosAppUrl || '',
        };
      });
      
      // Sort by displayOrder
      portfoliosData.sort((a, b) => a.displayOrder - b.displayOrder);
      
      setProjects(portfoliosData);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Map Firestore category to filter category
  const mapCategory = (firestoreCategory) => {
    const categoryMap = {
      'Web Application': 'web',
      'Mobile App': 'mobile',
      'Mobile Application': 'mobile',
      'Enterprise System': 'enterprise',
      'Legal Tech': 'enterprise',
      'AI/ML Solution': 'ai',
      'AI Integration': 'ai',
      'E-Commerce': 'web',
      'Healthcare': 'enterprise',
      'Financial Services': 'web',
      'SaaS Platform': 'web',
      'Social Platform': 'mobile',
    };
    return categoryMap[firestoreCategory] || 'web';
  };

  // Extract year from ISO date string
  const extractYear = (isoString) => {
    if (!isoString) return new Date().getFullYear().toString();
    return new Date(isoString).getFullYear().toString();
  };

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
    canonical.setAttribute('href', 'https://www.solidevelectrosoft.com/portfolio');

    // Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: 'Portfolio',
        page_location: window.location.href,
        page_path: '/portfolio',
      });
    }
  }, []);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'ai', label: 'AI/ML' },
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

  // Loading state
  if (loading) {
    return (
      <>
        <ModernHeader />
        <main>
          <section style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '48px',
                  height: '48px',
                  border: '4px solid #f3f4f6',
                  borderTopColor: '#3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <p style={{ marginTop: '20px', fontSize: '16px', color: '#6b7280' }}>
                Loading portfolio...
              </p>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </section>
        </main>
        <ModernFooter onQuoteClick={openAI} />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <ModernHeader />
        <main>
          <section style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
          }}>
            <div style={{ textAlign: 'center', maxWidth: '500px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚠️</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '12px' }}>
                Failed to Load Portfolio
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
                {error}
              </p>
              <button
                onClick={fetchPortfolios}
                style={{
                  padding: '12px 24px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            </div>
          </section>
        </main>
        <ModernFooter onQuoteClick={openAI} />
      </>
    );
  }

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
                Explore our collection of successful projects.{' '}
                <Link to="/services" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '600' }}>
                  See our services
                </Link>.
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
                      {/* Project Logo or Name-based Fallback */}
                      <Link
                        to={`/portfolio/${project.id}`}
                        style={{ textDecoration: 'none', display: 'block' }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            cursor: 'pointer',
                            background: '#f9fafb',
                            borderBottom: '1px solid #e5e7eb',
                            aspectRatio: '16/10',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <ProjectLogo
                            name={project.title}
                            logoUrl={project.logo || ''}
                            style={{ width: '45%', maxWidth: '200px' }}
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
                      </Link>

                      {/* Project Content */}
                      <div style={{ padding: '28px' }}>
                        {/* Type and Status Badges */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '12px',
                            flexWrap: 'wrap',
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
                          {/* Status Badge */}
                          <span
                            style={{
                              padding: '4px 12px',
                              background: project.status === 'in progress' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                              borderRadius: '100px',
                              fontSize: '11px',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              color: project.status === 'in progress' ? '#3b82f6' : '#22c55e',
                              letterSpacing: '0.5px',
                            }}
                          >
                            {project.status}
                          </span>
                        </div>

                        {/* Title */}
                        <Link
                          to={`/portfolio/${project.id}`}
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <h3
                            style={{
                              fontSize: '1.5rem',
                              fontWeight: '600',
                              color: '#111827',
                              marginBottom: '12px',
                              cursor: 'pointer',
                              transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#111827')}
                          >
                            {project.title}
                          </h3>
                        </Link>

                        {/* Description */}
                        <div style={{ marginBottom: '20px' }}>
                          <p
                            style={{
                              fontSize: '15px',
                              color: '#6b7280',
                              lineHeight: '1.7',
                              marginBottom: project.description && project.description.split(' ').length > 30 ? '8px' : '0',
                            }}
                          >
                            {project.description && project.description.split(' ').length > 30
                              ? project.description.split(' ').slice(0, 30).join(' ') + '...'
                              : project.description}
                          </p>
                          {project.description && project.description.split(' ').length > 30 && (
                            <Link
                              to={`/portfolio/${project.id}`}
                              style={{
                                display: 'inline-block',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#3b82f6',
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '0.8';
                                e.currentTarget.style.textDecoration = 'underline';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.textDecoration = 'none';
                              }}
                            >
                              Learn More →
                            </Link>
                          )}
                        </div>

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

                        {/* Gallery Button */}
                        {project.images && project.images.length > 0 && (
                          <button
                            onClick={() => setGalleryModal({ isOpen: true, project, currentIndex: 0 })}
                            style={{
                              width: '100%',
                              padding: '10px 14px',
                              borderRadius: '10px',
                              border: 'none',
                              background: '#8b5cf6',
                              color: '#ffffff',
                              fontSize: '13px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              marginBottom: '12px',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '0.9';
                              e.currentTarget.style.transform = 'scale(1.02)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '1';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                            View Gallery ({project.images.length})
                          </button>
                        )}

                        {/* App URL Buttons */}
                        {(project.webAppUrl || project.androidAppUrl || project.iosAppUrl) && (
                          <div style={{ 
                            display: 'flex', 
                            gap: '8px', 
                            flexWrap: 'wrap',
                            marginBottom: '20px',
                          }}>
                            {/* Web App Button */}
                            {project.webAppUrl && (
                              <a
                                href={project.webAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  flex: '1 1 auto',
                                  minWidth: 'calc(50% - 4px)',
                                  padding: '10px 14px',
                                  borderRadius: '10px',
                                  border: 'none',
                                  background: '#3b82f6',
                                  color: '#ffffff',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  textDecoration: 'none',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.opacity = '0.9';
                                  e.currentTarget.style.transform = 'scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.opacity = '1';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              >
                                <FaGlobe size={14} />
                                Web App
                              </a>
                            )}

                            {/* Android Button */}
                            {project.androidAppUrl && (
                              <a
                                href={project.androidAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  flex: '1 1 auto',
                                  minWidth: 'calc(50% - 4px)',
                                  padding: '10px 14px',
                                  borderRadius: '10px',
                                  border: 'none',
                                  background: '#34a853',
                                  color: '#ffffff',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  textDecoration: 'none',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.opacity = '0.9';
                                  e.currentTarget.style.transform = 'scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.opacity = '1';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              >
                                <FaGooglePlay size={14} />
                                Android
                              </a>
                            )}

                            {/* iOS Button */}
                            {project.iosAppUrl && (
                              <a
                                href={project.iosAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  flex: '1 1 auto',
                                  minWidth: 'calc(50% - 4px)',
                                  padding: '10px 14px',
                                  borderRadius: '10px',
                                  border: 'none',
                                  background: '#000000',
                                  color: '#ffffff',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  textDecoration: 'none',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.opacity = '0.9';
                                  e.currentTarget.style.transform = 'scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.opacity = '1';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              >
                                <FaApple size={14} />
                                iOS
                              </a>
                            )}
                          </div>
                        )}

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

            {/* Legal Disclaimer */}
            <Disclaimer variant="portfolio" style={{ marginTop: '24px' }} />
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
      <ModernFooter onQuoteClick={openAI} />
      <FloatingCTA onQuoteClick={openAI} />
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />

      {/* Gallery Modal */}
      {galleryModal.isOpen && galleryModal.project && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setGalleryModal({ isOpen: false, project: null, currentIndex: 0 })}
        >
          {/* Close Button */}
          <button
            onClick={() => setGalleryModal({ isOpen: false, project: null, currentIndex: 0 })}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            ×
          </button>

          {/* Image Counter */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '100px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {galleryModal.currentIndex + 1} / {galleryModal.project.images.length}
          </div>

          {/* Previous Button */}
          {galleryModal.currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGalleryModal(prev => ({ ...prev, currentIndex: prev.currentIndex - 1 }));
              }}
              style={{
                position: 'absolute',
                left: '20px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              ‹
            </button>
          )}

          {/* Next Button */}
          {galleryModal.currentIndex < galleryModal.project.images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGalleryModal(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
              }}
              style={{
                position: 'absolute',
                right: '20px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              ›
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <img
              src={galleryModal.project.images[galleryModal.currentIndex]}
              alt={`${galleryModal.project.title} - Image ${galleryModal.currentIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(90vh - 100px)',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              }}
            />
            <div
              style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              {galleryModal.project.title}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {galleryModal.project.images.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                maxWidth: '90%',
                overflowX: 'auto',
              }}
            >
              {galleryModal.project.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setGalleryModal(prev => ({ ...prev, currentIndex: idx }))}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: idx === galleryModal.currentIndex ? '2px solid #3b82f6' : '2px solid transparent',
                    opacity: idx === galleryModal.currentIndex ? 1 : 0.6,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = idx === galleryModal.currentIndex ? '1' : '0.6'}
                />
              ))}
            </div>
          )}
        </div>
      )}

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
