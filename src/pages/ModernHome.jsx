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
import CaseStudies from '../components/sections/CaseStudies';
import ModernTestimonials from '../components/sections/ModernTestimonials';
import CTABanner from '../components/sections/CTABanner';
import { FloatingCTA } from '../components/ui';
import AIProjectAssistant from '../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { db } from '../config/firebase';

/**
 * Modern Home Page
 * High-converting landing page with all modern sections
 */
const ModernHome = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [portfolioLoading, setPortfolioLoading] = useState(true);

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
        where('status', '==', 'completed'),
        orderBy('displayOrder', 'asc')
      );

      const snapshot = await getDocs(portfoliosQuery);
      const projects = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.projectName || 'Untitled Project',
          category: mapCategory(data.category),
          description: data.description || '',
          image: data.thumbnailUrl || (data.images && data.images[0]) || '',
          tags: data.technologies || [],
          link: '/portfolio',
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
    // SEO
    document.title = 'Solidev Electrosoft | Custom Software Development Company';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        'Transform your business with custom web apps, mobile apps, and AI solutions. ' +
        'Expert software development for startups and enterprises. Based in India, serving globally.'
      );
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.solidevelectrosoft.com/');

    // Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: 'Home',
        page_location: window.location.href,
        page_path: '/',
      });
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

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
            link: '/products',
          }}
        />

        {/* Social Proof - Client Logos */}
        <SocialProof 
          title="Trusted by innovative companies worldwide" 
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
        />

        {/* Our Work (Portfolios) */}
        <ModernPortfolio
          projects={portfolioProjects.length ? portfolioProjects.slice(0, 6) : null}
          showViewAll={!portfolioLoading}
        />

        {/* Case Studies */}
        <CaseStudies />

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
            link: '/products',
          }}
          compact
        />

        {/* Testimonials */}
        <ModernTestimonials />

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
    </>
  );
};

export default ModernHome;
