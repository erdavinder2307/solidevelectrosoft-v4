import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlaceholderImage } from '../ui/Placeholders';
import ProjectLogo from '../ui/ProjectLogo';

/**
 * Modern Portfolio Section
 * Showcase projects with modern card layout
 */
const ModernPortfolio = ({
  badge = "Our Work",
  title = "Projects That",
  titleHighlight = "Make an Impact",
  subtitle = "We've helped startups and enterprises build products that users love. Here are some of our recent success stories.",
  projects = null,
  showViewAll = true,
}) => {
  // Default projects using existing data
  const defaultProjects = [
    {
      id: 'core360',
      title: 'Core360',
      category: 'Web Application',
      description: 'Enterprise-grade web application built with modern technologies for streamlined business operations.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Dracra-tech.webp',
      tags: ['React', '.NET Core', 'SQL Server'],
      link: '/portfolio/core360',
    },
    {
      id: 'briind',
      title: 'Briind',
      category: 'Social Platform',
      description: 'Social networking application connecting communities and enabling meaningful interactions.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/brind.webp',
      tags: ['React Native', 'Node.js', 'MongoDB'],
      link: '/portfolio/briind',
    },
    {
      id: 'fairway',
      title: 'Fairway First',
      category: 'Mobile Application',
      description: 'Mobile application for Fairway Independent Mortgage Corporation with seamless user experience.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/fairway.webp',
      tags: ['iOS', 'Android', 'Swift'],
      link: '/portfolio/fairway',
    },
    {
      id: 'lexis',
      title: 'Lexis Convey',
      category: 'Legal Tech',
      description: 'Legal conveyancing platform for LexisNexis, streamlining property transactions.',
      image: 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Lexisnexis.webp',
      tags: ['.NET', 'Angular', 'Azure'],
      link: '/portfolio/lexis',
    },
  ];

  const projectList = projects || defaultProjects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="modern-section-lg modern-bg-dark modern-bg-mesh">
      <div className="modern-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto var(--space-16)',
          }}
        >
          <span 
            className="modern-label modern-mb-4" 
            style={{ 
              display: 'block',
              color: 'var(--color-primary-400)',
            }}
          >
            {badge}
          </span>
          <h2 
            className="modern-h2 modern-mb-4"
            style={{ color: 'var(--text-inverse)' }}
          >
            {title}{' '}
            <span style={{ color: 'var(--color-primary-400)' }}>{titleHighlight}</span>
          </h2>
          <p 
            className="modern-lead"
            style={{ color: 'var(--color-neutral-400)' }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="modern-grid modern-grid-2"
          style={{ gap: 'var(--space-6)' }}
        >
          {projectList.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Link
                to={project.link}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  height: '100%',
                }}
              >
                <div
                  className="modern-card-dark"
                  style={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    transition: 'all var(--transition-default)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Project Logo (image or name-based) in fixed media area */}
                  <div
                    style={{
                      aspectRatio: '16/10',
                      background: 'var(--color-neutral-800)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <ProjectLogo
                      name={project.title}
                      logoUrl={project.isLogo ? project.image : null}
                      style={{ width: '45%', maxWidth: '200px' }}
                    />
                  </div>

                  {/* Project Content */}
                  <div style={{ padding: 'var(--space-6)' }}>
                    {/* Category Badge */}
                    <span
                      style={{
                        display: 'inline-block',
                        padding: 'var(--space-1) var(--space-3)',
                        background: 'rgba(0, 133, 255, 0.1)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '500',
                        color: 'var(--color-primary-400)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: 'var(--text-xl)',
                        fontWeight: '600',
                        color: 'var(--text-inverse)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Description with Learn More */}
                    {(() => {
                      const words = (project.description || '').split(' ');
                      const isTruncated = words.length > 30;
                      const preview = isTruncated ? words.slice(0, 30).join(' ') + '...' : project.description;
                      return (
                        <div style={{ marginBottom: 'var(--space-4)' }}>
                          <p
                            style={{
                              fontSize: 'var(--text-sm)',
                              color: 'var(--color-neutral-400)',
                              lineHeight: '1.6',
                              marginBottom: isTruncated ? 'var(--space-2)' : '0',
                            }}
                          >
                            {preview}
                          </p>
                          {isTruncated && (
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 500,
                                color: 'var(--color-primary-400)',
                                textDecoration: 'none',
                              }}
                            >
                              Learn More →
                            </span>
                          )}
                        </div>
                      );
                    })()}

                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--space-2)',
                      }}
                    >
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: 'var(--space-1) var(--space-2)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-neutral-500)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              textAlign: 'center',
              marginTop: 'var(--space-12)',
            }}
          >
            <Link 
              to="/portfolio" 
              className="modern-btn modern-btn-white"
            >
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ModernPortfolio;
