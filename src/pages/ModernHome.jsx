import React, { useEffect } from 'react';
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

/**
 * Modern Home Page
 * High-converting landing page with all modern sections
 */
const ModernHome = () => {
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
    canonical.setAttribute('href', 'https://solidev.in/');

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

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero Section */}
        <ModernHero />

        {/* Social Proof - Client Logos */}
        <SocialProof 
          title="Trusted by innovative companies worldwide" 
          variant="default"
        />

        {/* Services Overview */}
        <ModernServices />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Portfolio Showcase */}
        <ModernPortfolio />

        {/* Case Studies */}
        <CaseStudies />

        {/* Our Products */}
        <ProductsSection 
          maxProducts={6}
          showFilter={false}
          showViewAll={true}
        />

        {/* Mid-page CTA */}
        <CTABanner
          variant="gradient"
          title="Ready to build something great?"
          subtitle="Let's turn your vision into reality. Free consultation for qualified projects."
          primaryCTA={{
            text: 'Request a Quote',
            link: '/contact',
          }}
          secondaryCTA={{
            text: 'View Our Work',
            link: '/portfolio',
          }}
          compact
        />

        {/* Testimonials */}
        <ModernTestimonials />

        {/* Final CTA */}
        <CTABanner
          variant="dark"
          title="Let's Build Your Next Big Thing"
          subtitle="From startups to enterprise — we have the expertise to deliver. Get started today."
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
    </>
  );
};

export default ModernHome;
