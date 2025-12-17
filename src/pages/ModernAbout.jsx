import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import SocialProof from '../components/sections/SocialProof';
import ModernTestimonials from '../components/sections/ModernTestimonials';
import CTABanner from '../components/sections/CTABanner';
import TechStack from '../components/sections/TechStack';
import { FloatingCTA } from '../components/ui';
import AIProjectAssistant from '../components/ai/AIProjectAssistant';

// Import team images
import team1 from '../assets/img/team/team1.png';
import team2 from '../assets/img/team/team2.png';
import team3 from '../assets/img/team/team3.png';
import team4 from '../assets/img/team/team4.png';
import team5 from '../assets/img/team/team5.png';
import team6 from '../assets/img/team/team6.png';
import team7 from '../assets/img/team/team7.png';
import team8 from '../assets/img/team/team8.png';

// Import individual team member images
import davinder from '../assets/img/team/davinder.png';
import anushka from '../assets/img/team/anushka.png';
import jagriti from '../assets/img/team/jagriti.png';
import nisha from '../assets/img/team/nisha.png';
import sheetal from '../assets/img/team/sheetal.png';

import { useAIAssistant } from '../hooks/useAIAssistant';

/**
 * Modern About Page
 * Clean, professional company introduction
 */
const ModernAbout = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  
  // Random team image for story section
  const teamImages = [team1, team2, team3, team4, team5, team6, team7, team8];
  const randomTeamImage = teamImages[Math.floor(Math.random() * teamImages.length)];
  
  useEffect(() => {
    // SEO
    document.title = 'About Solidev Electrosoft | Custom Software Development Company';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        'Learn about Solidev Electrosoft - a leading software development company since 2018. ' +
        'Expert team specializing in web, mobile, and AI solutions. Based in India, serving globally.'
      );
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.solidevelectrosoft.com/about');

    // Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: 'About',
        page_location: window.location.href,
        page_path: '/about',
      });
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: '13+', label: 'Years Shipping Software' },
    { number: '25+', label: 'Production Systems' },
    { number: '4', label: 'Core Industries' },
    { number: '100%', label: 'Maintained Code' },
  ];

  const values = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
      title: 'Production-Ready Delivery',
      description: 'Every system we build is architected for real-world use—secure, performant, and maintainable over years, not just months.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Domain Expertise',
      description: 'Deep experience in healthcare, legal tech, finance, and SaaS. We understand regulatory compliance, security, and industry-specific challenges.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: 'Long-Term Thinking',
      description: 'We build systems designed for evolution—maintainable architecture, documented code, and scalable infrastructure that grows with your business.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      title: 'Senior-Level Engineering',
      description: 'No junior experiments. Our team brings over a decade of hands-on delivery experience across complex, mission-critical systems.',
    },
  ];

  const team = [
    {
      name: 'Davinder Pal',
      role: 'Director & CTO',
      image: davinder,
      linkedin: 'https://www.linkedin.com/company/solidev-electrosoft-opc-private-limited/',
    },
    {
      name: 'Anushka',
      role: 'Sales & Finance',
      image: anushka,
      linkedin: 'https://www.linkedin.com/company/solidev-electrosoft-opc-private-limited/',
    },
    {
      name: 'Jagriti',
      role: 'Software Developer (Remote)',
      image: jagriti,
      linkedin: 'https://www.linkedin.com/company/solidev-electrosoft-opc-private-limited/',
    },
    {
      name: 'Nisha',
      role: 'Software Developer',
      image: nisha,
      linkedin: 'https://www.linkedin.com/company/solidev-electrosoft-opc-private-limited/',
    },
    {
      name: 'Sheetal',
      role: 'Software Developer',
      image: sheetal,
      linkedin: 'https://www.linkedin.com/company/solidev-electrosoft-opc-private-limited/',
    },
  ];

  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Angular', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: '.NET Core', category: 'Backend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Java', category: 'Backend' },
    { name: 'React Native', category: 'Mobile' },
    { name: 'Flutter', category: 'Mobile' },
    { name: 'Swift', category: 'Mobile' },
    { name: 'Kotlin', category: 'Mobile' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
              right: '-10%',
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
              style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
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
                About Us
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
                We Build Software That{' '}
                <span style={{ color: '#60a5fa' }}>Transforms Businesses</span>
              </h1>
              <p
                style={{
                  fontSize: '1.25rem',
                  color: '#9ca3af',
                  lineHeight: '1.7',
                  maxWidth: '700px',
                  margin: '0 auto 40px',
                }}
              >
                Since 2018, we've been helping startups and enterprises build innovative software solutions 
                that drive growth, improve efficiency, and delight users.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                maxWidth: '800px',
                margin: '0 auto',
              }}
              className="about-stats-grid"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: '#60a5fa',
                      marginBottom: '8px',
                    }}
                  >
                    {stat.number}
                  </div>
                  <div style={{ fontSize: '14px', color: '#9ca3af' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="modern-section-lg">
          <div className="modern-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '80px',
                alignItems: 'center',
              }}
              className="about-story-grid"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
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
                  Our Story
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: '700',
                    color: '#111827',
                    lineHeight: '1.2',
                    marginBottom: '24px',
                  }}
                >
                  Over a Decade of{' '}
                  <span style={{ color: '#3b82f6' }}>Real-World Engineering</span>
                </h2>
                <p
                  style={{
                    fontSize: '1.125rem',
                    color: '#6b7280',
                    lineHeight: '1.8',
                    marginBottom: '20px',
                  }}
                >
                  Since 2018, Solidev Electrosoft has been delivering production-grade software systems 
                  across healthcare, finance, legal tech, and SaaS. Our team brings 13+ years of combined 
                  hands-on experience building, shipping, and maintaining mission-critical applications.
                </p>
                <p
                  style={{
                    fontSize: '1.125rem',
                    color: '#6b7280',
                    lineHeight: '1.8',
                    marginBottom: '32px',
                  }}
                >
                  We specialize in complex, regulated industries where reliability matters. From 
                  Angular and React frontends to .NET Core and Python backends, we build with 
                  Azure and Firebase infrastructure—always production-ready, always maintainable.
                </p>
                <Link 
                  to="/contact" 
                  className="modern-btn modern-btn-primary"
                >
                  Work With Us
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'relative',
                }}
              >
                <img
                  src={randomTeamImage}
                  alt="Solidev Team"
                  style={{
                    width: '100%',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '-20px',
                    background: '#3b82f6',
                    color: '#ffffff',
                    padding: '24px 32px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>2018</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>Established</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
                Our Values
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
                What Drives Us Every Day
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.7' }}>
                Our core values guide every decision we make and every project we deliver.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
              }}
              className="values-grid"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    padding: '32px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease',
                  }}
                  className="value-card"
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3b82f6',
                      marginBottom: '20px',
                    }}
                  >
                    {value.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '12px',
                    }}
                  >
                    {value.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.7' }}>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="modern-section-lg">
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
                Our Team
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
                Meet the People Behind the Magic
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.7' }}>
                Our talented team brings together expertise from diverse backgrounds to deliver exceptional results.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px',
                maxWidth: '900px',
                margin: '0 auto',
              }}
              className="team-grid"
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    textAlign: 'center',
                    padding: '32px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease',
                  }}
                  className="team-card"
                >
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      margin: '0 auto 20px',
                      border: '4px solid #e5e7eb',
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '4px',
                    }}
                  >
                    {member.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#3b82f6', marginBottom: '16px' }}>
                    {member.role}
                  </p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '50%',
                      color: '#3b82f6',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Technologies Section */}
        <section 
          className="modern-section-lg"
          style={{ 
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          }}
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
                  background: 'rgba(59, 130, 246, 0.2)',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#60a5fa',
                  marginBottom: '16px',
                }}
              >
                Our Tech Stack
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.2',
                  marginBottom: '16px',
                }}
              >
                Technologies We Master
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#9ca3af', lineHeight: '1.7' }}>
                We stay ahead of the curve with the latest technologies and frameworks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '100px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#ffffff',
                    cursor: 'default',
                    transition: 'all 0.3s ease',
                  }}
                  className="tech-tag"
                >
                  {tech.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <SocialProof 
          title="Trusted by innovative companies worldwide" 
          variant="default"
        />

        {/* Tech Stack */}
        <TechStack />

        {/* Testimonials */}
        <ModernTestimonials />

        {/* CTA */}
        <CTABanner
          variant="gradient"
          title="Ready to Start Your Project?"
          subtitle="Let's discuss how we can help transform your ideas into reality."
          primaryCTA={{
            text: '✨ Chat with AI',
            link: '/contact',
          }}
          secondaryCTA={{
            text: 'View Our Work',
            link: '/products',
          }}
        />
      </main>
      <ModernFooter onQuoteClick={openAI} />
      <FloatingCTA onQuoteClick={openAI} />
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .about-story-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .values-grid {
            grid-template-columns: 1fr !important;
          }
          .team-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
          }
        }
        
        .value-card:hover {
          border-color: #3b82f6 !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        
        .team-card:hover {
          border-color: #3b82f6 !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        
        .tech-tag:hover {
          background: rgba(59, 130, 246, 0.2) !important;
          border-color: rgba(96, 165, 250, 0.5) !important;
        }
      `}</style>
    </>
  );
};

export default ModernAbout;
