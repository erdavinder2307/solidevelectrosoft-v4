import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import ModernHero from '../components/sections/ModernHero';
import SocialProof from '../components/sections/SocialProof';
import ModernServices from '../components/sections/ModernServices';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ModernPortfolio from '../components/sections/ModernPortfolio';
import ProductsSection from '../components/sections/ProductsSection';
import ModernTestimonials from '../components/sections/ModernTestimonials';
import CTABanner from '../components/sections/CTABanner';
import FeaturedVideos from '../components/sections/FeaturedVideos';
import { FloatingCTA, SmartImage } from '../components/ui';
import AIProjectAssistant from '../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { db } from '../config/firebase';
import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../utils/seo';
import { getCommonSchemas, generateBreadcrumbSchema } from '../utils/structuredData';

/**
 * Modern Home Page
 * High-converting landing page with all modern sections
 */
const ModernHome = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [galleryModal, setGalleryModal] = useState({ isOpen: false, product: null, currentIndex: 0 });

  // SEO Configuration
  useSEO({
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    keywords: pageSEO.home.keywords,
    canonical: pageSEO.home.canonical,
    ogType: pageSEO.home.ogType,
    schemas: [
      ...getCommonSchemas(),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
      ]),
    ],
  });

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

  const fetchPortfolioProjects = async () => {
    try {
      setPortfolioLoading(true);
      const portfoliosQuery = query(
        collection(db, 'portfolios'),
        where('status', 'in', ['completed', 'in progress', 'in-progress'])
      );

      const snapshot = await getDocs(portfoliosQuery);
      const projects = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.projectName || 'Untitled Project',
          category: mapCategory(data.category),
          description: data.description || '',
          image: data.logo || data.thumbnailUrl || (data.images && data.images[0]) || '',
          isLogo: Boolean(data.logo),
          status: data.status || 'completed',
          tags: data.technologies || [],
          link: `/portfolio/${doc.id}`,
          displayOrder: data.displayOrder || 0,
        };
      });

      projects.sort((a, b) => a.displayOrder - b.displayOrder);
      setPortfolioProjects(projects);
    } catch (error) {
      console.error('Error fetching portfolio projects:', error);
    } finally {
      setPortfolioLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioProjects();
  }, []);

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero Section with AI CTA */}
        <ModernHero 
          primaryCTA={{
            text: '✨ Chat with AI Assistant',
            onClick: openAI,
            isButton: true,
          }}
          secondaryCTA={{
            text: 'View Our Work',
            link: '/portfolio',
          }}
        />

        {/* Social Proof - Past Client Engagements (Text-only) */}
        <SocialProof 
          title="Representative past client engagements" 
          variant="default"
        />

        {/* Services Overview */}
        <ModernServices />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Our Products */}
        <ProductsSection 
          maxProducts={6}
          showFilter={false}
          showViewAll={true}
          onViewScreenshots={(product) => setGalleryModal({ isOpen: true, product, currentIndex: 0 })}
        />

        {/* Our Work (Portfolios) */}
        <ModernPortfolio
          projects={portfolioProjects.length ? portfolioProjects.slice(0, 6) : null}
          showViewAll={!portfolioLoading}
        />

        {/* Case Studies temporarily hidden */}

        {/* Mid-page CTA */}
        <CTABanner
          variant="gradient"
          title="Need a System That Actually Works?"
          subtitle="Senior engineering team with 13+ years building production software. Let's discuss your project."
          primaryCTA={{
            text: '✨ Chat with AI Assistant',
            onClick: openAI,
            isButton: true,
          }}
          secondaryCTA={{
            text: 'View Our Work',
            link: '/portfolio',
          }}
          compact
        />

        {/* Testimonials */}
        <ModernTestimonials />
{/* Featured Videos */}
<FeaturedVideos 
  limit={4} 
  showViewAll={true}
  title="Learn from Our Videos"
  description="Watch tutorials, demos, and technical walkthroughs to understand our solutions better"
/>


        {/* Final CTA */}
        <CTABanner
          variant="dark"
          title="Ship Production Software Faster"
          subtitle="Healthcare, finance, legal tech, SaaS—we've built it. Let's discuss what you need built next."
          primaryCTA={{
            text: '✨ Start with AI Assistant',
            onClick: openAI,
            isButton: true,
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
      
      {/* AI Project Requirements Assistant */}
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />

      {/* Gallery Modal */}
      {galleryModal.isOpen && galleryModal.product && galleryModal.product.screenshots && (
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
          onClick={() => setGalleryModal({ isOpen: false, product: null, currentIndex: 0 })}
        >
          {/* Close Button */}
          <button
            onClick={() => setGalleryModal({ isOpen: false, product: null, currentIndex: 0 })}
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
            {galleryModal.currentIndex + 1} / {galleryModal.product.screenshots.length}
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
          {galleryModal.currentIndex < galleryModal.product.screenshots.length - 1 && (
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
            <SmartImage
              src={galleryModal.product.screenshots[galleryModal.currentIndex].url || galleryModal.product.screenshots[galleryModal.currentIndex]}
              alt={`${galleryModal.product.title || galleryModal.product.name} - Screenshot ${galleryModal.currentIndex + 1}`}
              aspectRatio={null}
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
              {galleryModal.product.title || galleryModal.product.name}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {galleryModal.product.screenshots.length > 1 && (
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
              {galleryModal.product.screenshots.map((screenshot, idx) => {
                const imgUrl = screenshot.url || screenshot;
                return (
                  <div
                    key={idx}
                    onClick={() => setGalleryModal(prev => ({ ...prev, currentIndex: idx }))}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = idx === galleryModal.currentIndex ? '1' : '0.6'}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: idx === galleryModal.currentIndex ? '2px solid #667eea' : '2px solid transparent',
                      opacity: idx === galleryModal.currentIndex ? 1 : 0.6,
                      transition: 'all 0.2s',
                      overflow: 'hidden',
                    }}
                  >
                    <SmartImage
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      aspectRatio={1}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ModernHome;
