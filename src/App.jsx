import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import legacy pages (for backwards compatibility)
import { Home, About, Project, Contact, Faq } from './pages';

// Import modern pages
import { 
  ModernHome, 
  ModernContact,
  ModernAbout,
  ModernPortfolio,
  ModernProducts,
  ServicesPage,
  WebDevelopmentService,
  MobileAppService,
  AISolutionsService,
  MVPDevelopmentService
} from './pages';

// Import product and portfolio details pages
import ProductDetails from './pages/ProductDetails';
import PortfolioDetails from './pages/PortfolioDetails';

// Import admin components
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

// Import legacy CSS files
import './assets/css/bootstrap.css';
import './assets/css/meanmenu.css';
import './assets/css/animate.css';
import './assets/css/swiper-bundle.css';
import './assets/css/slick.css';
import './assets/css/backtotop.css';
import './assets/css/magnific-popup.css';
import './assets/css/nice-select.css';
import './assets/css/ui-icon.css';
import './styles/ai-assistant.css';
import './assets/css/font-awesome-pro.css';
import './assets/css/spacing.css';
import './assets/css/style.css';

// Import modern CSS
import './styles/modern.css';

// Import custom React app styles
import './components/styles/react-app.css';

// Feature flag: Set to true to use modern design, false for legacy
const USE_MODERN_DESIGN = true;

function App() {
  useEffect(() => {
    // Add Google Analytics scripts
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GT-KFNT9K9X';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.async = true;
    script2.src = 'https://www.googletagmanager.com/gtag/js?id=GT-MBLK2C2Q';
    document.head.appendChild(script2);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'GT-KFNT9K9X');
    gtag('config', 'GT-MBLK2C2Q');

    // Set document class
    document.documentElement.className = USE_MODERN_DESIGN ? '' : 'no-js';

    // Set current year for footer
    const currentYearElement = document.getElementById('CurrentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }

    return () => {
      // Cleanup scripts on unmount
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
    };
  }, []);

  // Choose components based on feature flag
  const HomePage = USE_MODERN_DESIGN ? ModernHome : Home;
  const ContactPage = USE_MODERN_DESIGN ? ModernContact : Contact;
  const AboutPage = USE_MODERN_DESIGN ? ModernAbout : About;
  const PortfolioPage = USE_MODERN_DESIGN ? ModernPortfolio : Project;

  return (
    <AuthProvider>
      <Router basename="/">
        <div className="App">
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about.html" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio.html" element={<PortfolioPage />} />
            <Route path="/project" element={<PortfolioPage />} />
            <Route path="/project.html" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact.html" element={<ContactPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/faq.html" element={<Faq />} />
            <Route path="/products" element={<ModernProducts />} />
            <Route path="/products.html" element={<ModernProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/portfolio/:id" element={<PortfolioDetails />} />
            
            {/* Services Routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services.html" element={<ServicesPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentService />} />
            <Route path="/services/mobile-app-development" element={<MobileAppService />} />
            <Route path="/services/ai-solutions" element={<AISolutionsService />} />
            <Route path="/services/mvp-development" element={<MVPDevelopmentService />} />

            {/* Legacy route aliases for SEO */}
            <Route path="/web-development" element={<WebDevelopmentService />} />
            <Route path="/mobile-development" element={<MobileAppService />} />
            <Route path="/ai-ml-solutions" element={<AISolutionsService />} />
            <Route path="/startup-mvp" element={<MVPDevelopmentService />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

