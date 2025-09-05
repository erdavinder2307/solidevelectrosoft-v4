import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import { Home, About } from './pages';

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
    document.documentElement.className = 'no-js';

    // Set current year for footer
    const currentYearElement = document.getElementById('CurrentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about.html" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
