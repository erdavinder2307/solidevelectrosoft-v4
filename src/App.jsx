import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import scroll restoration
import ScrollRestorationManager from './components/ScrollRestorationManager';

// Import analytics utility
import { initializeAnalytics, trackPageView } from './utils/analytics';

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
  MVPDevelopmentService,
  ModernBlog,
  BlogDetails,
} from './pages';

// Import product and portfolio details pages
import ProductDetails from './pages/ProductDetails';
import PortfolioDetails from './pages/PortfolioDetails';

// Import videos page
import Videos from './pages/Videos';

// Import search
import { SearchProvider } from './contexts/SearchContext';
import { SearchModal } from './components/search';

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
import './styles/search.css';
import './assets/css/font-awesome-pro.css';
import './assets/css/spacing.css';
import './assets/css/style.css';

// Import modern CSS
import './styles/modern.css';

// Import custom React app styles
import './components/styles/react-app.css';

// Feature flag: Set to true to use modern design, false for legacy
const USE_MODERN_DESIGN = true;

/**
 * RouteTracker Component
 * Tracks page_view events on route changes for SPA
 */
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // Defer by one tick so the incoming page's useEffect sets document.title first
    const timer = setTimeout(() => {
      trackPageView(location.pathname, document.title);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // GA scripts are loaded in index.html — no dynamic injection needed here.
    // Initialize analytics utility (sets app_name / app_version defaults).
    initializeAnalytics();

    // Set document class
    document.documentElement.className = USE_MODERN_DESIGN ? '' : 'no-js';

    // Set current year for footer
    const currentYearElement = document.getElementById('CurrentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  }, []);

  // Choose components based on feature flag
  const HomePage = USE_MODERN_DESIGN ? ModernHome : Home;
  const ContactPage = USE_MODERN_DESIGN ? ModernContact : Contact;
  const AboutPage = USE_MODERN_DESIGN ? ModernAbout : About;
  const PortfolioPage = USE_MODERN_DESIGN ? ModernPortfolio : Project;

  return (
    <AuthProvider>
      <SearchProvider>
      <Router basename="/">
        <div className="App">
          {/* Restore scroll position on back/forward navigation */}
          <ScrollRestorationManager />
          
          {/* Track page views on route changes */}
          <RouteTracker />
          {/* Global Search Modal */}
          <SearchModal />
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
            
            {/* Videos Routes */}
            <Route path="/videos" element={<Videos />} />
            <Route path="/videos.html" element={<Videos />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<ModernBlog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            
            {/* Services Routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services.html" element={<ServicesPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentService />} />
            <Route path="/services/mobile-app-development" element={<MobileAppService />} />
            <Route path="/services/ai-solutions" element={<AISolutionsService />} />
            <Route path="/services/mvp-development" element={<MVPDevelopmentService />} />

            {/* Legacy route aliases for SEO */}
            <Route path="/web-development" element={<WebDevelopmentService />} />
            <Route path="/mobile-app-development" element={<MobileAppService />} />
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
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;

