import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaGlobe, FaCheck } from 'react-icons/fa';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import { db } from '../config/firebase';

/**
 * Portfolio Details Page
 * Detailed view of a portfolio project with all information
 */
const PortfolioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (e) => setIsMobile(e.matches);
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const docSnap = await getDoc(doc(db, 'portfolios', id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProject({
          id: docSnap.id,
          title: data.projectName,
          description: data.description,
          category: data.category,
          logo: data.logo || '',
          thumbnailUrl: data.thumbnailUrl || '',
          images: data.images || [],
          technologies: data.technologies || [],
          client: data.client || '',
          year: data.createdAt ? new Date(data.createdAt).getFullYear().toString() : new Date().getFullYear().toString(),
          status: data.status || 'completed',
          webAppUrl: data.webAppUrl || '',
          androidAppUrl: data.androidAppUrl || '',
          iosAppUrl: data.iosAppUrl || '',
          features: data.features || [],
          challenges: data.challenges || '',
          solution: data.solution || '',
          results: data.results || [],
        });
      } else {
        setError('Project not found');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Solidev Electrosoft`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', project.description || '');
      }
    }
  }, [project]);

  if (loading) {
    return (
      <>
        <ModernHeader />
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              width: '48px',
              height: '48px',
              border: '4px solid #f3f4f6',
              borderTopColor: '#667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
        <ModernFooter />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <ModernHeader />
        <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>❌ {error || 'Project not found'}</h2>
          <button
            onClick={() => navigate('/portfolio')}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            ← Back to Portfolio
          </button>
        </div>
        <ModernFooter />
      </>
    );
  }

  const images = project.images || [];
  const technologies = project.technologies || [];
  const features = project.features || [];
  const results = project.results || [];
  const currentImage = images[selectedImage];
  const mainImage = project.logo || project.thumbnailUrl || (images.length > 0 ? images[0] : '');

  return (
    <>
      <ModernHeader />
      <main style={{ background: '#ffffff', paddingTop: '80px' }}>
        {/* Project Hero Section */}
        <section style={{ padding: 'clamp(24px, 6vw, 48px) 16px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(24px, 4vw, 40px)',
                alignItems: 'start',
              }}
            >
              {/* Left: Logo and Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: isMobile ? 'center' : 'left' }}
              >
                {/* Project Logo */}
                <div
                  style={{
                    width: 'clamp(96px, 18vw, 120px)',
                    height: 'clamp(96px, 18vw, 120px)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: isMobile ? '0 auto 24px' : '0 0 24px 0',
                    border: '2px solid #e5e7eb',
                  }}
                >
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: project.logo ? 'contain' : 'cover' }}
                    />
                  ) : (
                    <div style={{ fontSize: '48px', color: '#9ca3af' }}>📁</div>
                  )}
                </div>

                {/* Title and Category */}
                <h1 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                  {project.title}
                </h1>
                <p style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', color: '#667eea', fontWeight: '500', marginBottom: '16px' }}>
                  {project.category}
                </p>

                {/* Client and Year */}
                <div style={{ marginBottom: '24px' }}>
                  {project.client && (
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                      <strong>Client:</strong> {project.client}
                    </p>
                  )}
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    <strong>Year:</strong> {project.year}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    background: project.status === 'completed' ? '#dcfce7' : '#fef3c7',
                    color: project.status === 'completed' ? '#166534' : '#92400e',
                    marginBottom: '24px',
                    marginLeft: isMobile ? 'auto' : 0,
                    marginRight: isMobile ? 'auto' : 0,
                  }}
                >
                  {project.status}
                </span>

                {/* Action Buttons */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '12px',
                    alignItems: 'stretch',
                  }}
                >
                  {/* Web App Button */}
                  {project.webAppUrl && (
                    <a
                      href={project.webAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: '#667eea',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <FaGlobe size={16} />
                      Open Web App
                    </a>
                  )}

                  {/* Android Button */}
                  {project.androidAppUrl && (
                    <a
                      href={project.androidAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: '#34a853',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <FaGooglePlay size={16} />
                      Google Play
                    </a>
                  )}

                  {/* iOS Button */}
                  {project.iosAppUrl && (
                    <a
                      href={project.iosAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: '#000000',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <FaApple size={16} />
                      App Store
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Right: Images - Full Width 16:9 */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                {images.length > 0 ? (
                  <>
                    {/* Main Image - 16:9 Ratio */}
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '16/9',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#f3f4f6',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <img
                        src={currentImage || images[0]}
                        alt={`${project.title} screenshot ${selectedImage + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    {/* Thumbnail Strip */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        overflowX: 'auto',
                        paddingBottom: '8px',
                        scrollbarWidth: 'thin',
                      }}
                    >
                      {images.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          style={{
                            flex: '0 0 88px',
                            width: '88px',
                            height: '52px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: selectedImage === idx ? '3px solid #667eea' : '2px solid #e5e7eb',
                            background: '#f3f4f6',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            padding: '0',
                          }}
                          onMouseEnter={(e) => {
                            if (selectedImage !== idx) {
                              e.currentTarget.style.borderColor = '#d1d5db';
                            }
                          }}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${idx + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '16px',
                      background: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      fontSize: '14px',
                    }}
                  >
                    No images available
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section
          style={{
            padding: 'clamp(24px, 6vw, 48px) 16px',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            background: '#f9fafb',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              About This Project
            </h2>
            <p
              style={{
                fontSize: 'clamp(14px, 3.6vw, 15px)',
                color: '#4b5563',
                lineHeight: '1.8',
                maxWidth: '800px',
              }}
            >
              {project.description}
            </p>
          </div>
        </section>

        {/* Features Section */}
        {features.length > 0 && (
          <section style={{ padding: 'clamp(24px, 6vw, 48px) 16px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                Key Features
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '14px',
                      borderRadius: '10px',
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                    }}
                  >
                    <div style={{ color: '#667eea', marginTop: '2px' }}>
                      <FaCheck size={16} />
                    </div>
                    <p style={{ fontSize: '14px', color: '#4b5563', margin: '0' }}>{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenge & Solution */}
        {(project.challenges || project.solution) && (
          <section
            style={{
              padding: 'clamp(24px, 6vw, 48px) 16px',
              borderTop: '1px solid #e5e7eb',
              background: '#f9fafb',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '32px',
                }}
              >
                {project.challenges && (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                      The Challenge
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.7' }}>{project.challenges}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                      Our Solution
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.7' }}>{project.solution}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        {results.length > 0 && (
          <section style={{ padding: 'clamp(24px, 6vw, 48px) 16px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                Results & Impact
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                {results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '14px',
                      borderRadius: '10px',
                      background: '#dcfce7',
                      border: '1px solid #86efac',
                    }}
                  >
                    <div style={{ color: '#166534', marginTop: '2px' }}>
                      <FaCheck size={16} />
                    </div>
                    <p style={{ fontSize: '14px', color: '#166534', margin: '0', fontWeight: '500' }}>{result}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technologies Section */}
        {technologies.length > 0 && (
          <section
            style={{
              padding: 'clamp(24px, 6vw, 48px) 16px',
              borderTop: '1px solid #e5e7eb',
              background: '#f9fafb',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                Technologies Used
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '18px',
                      background: '#667eea',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <ModernFooter />
    </>
  );
};

export default PortfolioDetails;
