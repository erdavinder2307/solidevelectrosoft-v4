import React, { useEffect } from 'react';
import { Header, Footer } from '../components/layout';
import { 
  PreLoader, 
  BackToTop, 
  MouseCursor, 
  FloatingMenu 
} from '../components/ui';

// About page specific components
import Breadcrumb from '../components/sections/Breadcrumb';
import AboutDetails from '../components/sections/AboutDetails';
import Services from '../components/sections/Services';
import VideoSection from '../components/sections/VideoSection';
import Testimonials from '../components/sections/Testimonials';
import Clients from '../components/sections/Clients';
import ContactCTA from '../components/sections/ContactCTA';

// Import about page specific styles
import '../assets/css/about.css';

const About = () => {
  useEffect(() => {
    // Add Google Analytics
    const gtag = (...args) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args);
    };

    // Initialize gtag
    gtag('js', new Date());
    gtag('config', 'GT-KFNT9K9X');
    gtag('config', 'GT-MBLK2C2Q');

    // Conversion event
    gtag('event', 'conversion', {'send_to': 'GT-KFNT9K9X/MgRjCLiyz4EbEIWQz78_'});

    // Set document class
    document.documentElement.className = 'no-js';

    // Set page title and meta description
    document.title = 'About Solidev Electrosoft - Professional Web & Mobile App Development Company';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Learn about Solidev Electrosoft, a leading software development company established in 2018. Expert team specializing in .NET, Angular, React, Unity 3D, and mobile app development.';
    }

    // Add canonical URL
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = 'https://solidevelectrosoft.com/about.html';
    } else {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = 'https://solidevelectrosoft.com/about.html';
      document.head.appendChild(canonical);
    }

    // Add Open Graph meta tags
    const addMetaTag = (property, content) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.content = content;
      } else {
        const meta = document.createElement('meta');
        meta.property = property;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    addMetaTag('og:type', 'website');
    addMetaTag('og:url', 'https://solidevelectrosoft.com/about.html');
    addMetaTag('og:title', 'About Solidev Electrosoft - Professional Software Development');
    addMetaTag('og:description', 'Learn about Solidev Electrosoft, a leading software development company established in 2018. Expert team specializing in .NET, Angular, React, Unity 3D.');
    addMetaTag('og:image', 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/logo/logo.png');

    // Twitter meta tags
    addMetaTag('twitter:card', 'summary_large_image');
    addMetaTag('twitter:url', 'https://solidevelectrosoft.com/about.html');
    addMetaTag('twitter:title', 'About Solidev Electrosoft - Professional Software Development');
    addMetaTag('twitter:description', 'Learn about Solidev Electrosoft, a leading software development company established in 2018.');
    addMetaTag('twitter:image', 'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/logo/logo.png');

    return () => {
      // Cleanup meta tags if needed
    };
  }, []);

  return (
    <div className="App">
      {/* Pre Loader */}
      <PreLoader />

      {/* Back to Top */}
      <BackToTop />

      {/* Mouse Cursor */}
      <MouseCursor />

      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb 
        title="About us"
        backgroundImage="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/breadcrumb/breadcrumb-bg-2.webp"
      />

      {/* Main Content */}
      <main>
        {/* About Details Section */}
        <AboutDetails />

        {/* Services Section */}
        <Services />

        {/* Video Section */}
        <VideoSection />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Clients Section */}
        <Clients />

        {/* Contact CTA Section */}
        <ContactCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Menu */}
      <FloatingMenu />
    </div>
  );
};

export default About;
