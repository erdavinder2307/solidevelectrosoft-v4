import { useEffect } from 'react';

// Layout Components
import { Header, Footer } from './components/layout';

// Section Components
import { 
  Hero, 
  About, 
  CTA, 
  Gallery, 
  Team, 
  Feature, 
  Testimonials, 
  Clients, 
  ContactCTA 
} from './components/sections';

// UI Components
import { 
  PreLoader, 
  BackToTop, 
  MouseCursor, 
  FloatingMenu 
} from './components/ui';

// Import CSS files (these should be available in src/assets/css/)
import './assets/css/bootstrap.css';
import './assets/css/meanmenu.css';
import './assets/css/animate.css';
import './assets/css/swiper-bundle.css';
import './assets/css/slick.css';
import './assets/css/backtotop.css';
import './assets/css/magnific-popup.css';
import './assets/css/nice-select.css';
import './assets/css/ui-icon.css';
import './assets/css/font-awesome-pro.css';
import './assets/css/spacing.css';
import './assets/css/style.css';

// Import custom React app styles
import './components/styles/react-app.css';

function App() {
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

    // Set page title
    document.title = 'Solidev Electrosoft Pvt. Ltd. - Convert Ideas Into Reality';

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'home page';
    }
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

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* CTA Section */}
        <CTA />

        {/* Gallery Section */}
        <Gallery />

        {/* Team Section */}
        <Team />

        {/* Feature Section */}
        <Feature />

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
}

export default App;
