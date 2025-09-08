import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const isAboutPage = location.pathname === '/about' || location.pathname === '/about.html';

  return (
    <>
      {/* Header */}
      <header>
        <div 
          id="header-sticky" 
          className={`header__area header__transparent ${isAboutPage ? 'pl-110 pr-110' : ''} ${isSticky ? 'header-sticky-active' : ''}`}
        >
          <div className="header__main" id="header-sticky">
            <div className={isAboutPage ? 'container-fluid' : 'container'}>
              <div className="row align-items-center">
                <div className="col-lg-2 col-md-4 col-7">
                  <div className="logo">
                    <Link to="/">
                      <img 
                        loading="lazy"
                        src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/logo/logo.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-7 col-md-4 d-none d-md-block">
                  <div className="main-menu text-center">
                    <nav id="mobile-menu">
                      <ul>
                        <li className={location.pathname === '/' ? 'active' : ''}>
                          <Link to="/">Home</Link>
                        </li>
                        <li className={isAboutPage ? 'active' : ''}>
                          <Link to="/about">About us</Link>
                        </li>
                        <li className="">
                          <a href="project.html">Portfolio</a>
                        </li>
                        <li className="">
                          <a href="contact.html">Contacts</a>
                        </li>
                        <li className="">
                          <a href="faq.html">FAQ</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-5">
                  <div className="header__main_right d-flex justify-content-end align-items-center">
                    <div className="tp-header-search-icons normal-search mr-80 p-relative">
                      <div className="search-btn-wrap">
                        <button 
                          className="button-search-toggle position-relative"
                          onClick={toggleSearch}
                        >
                          <i className={`header_search-${isSearchOpen ? 'close' : 'button'} text-white far fa-${isSearchOpen ? 'times' : 'search'}`}></i>
                        </button>
                        <div className={`tp-search-form p-relative ${isSearchOpen ? 'active' : ''}`}>
                          <form action="#">
                            <input type="text" placeholder="Search ..." />
                            <button type="submit" className="search-submit-icon">
                              <i className="far fa-search"></i>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="tp-bar-icon">
                      <a href="#" className="offcanvas-toggle-btn" onClick={toggleOffcanvas}>
                        <i className="fal fa-bars"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Offcanvas Area */}
      <div 
        className={`offcanvas__area off-canvas-bg ${isOffcanvasOpen ? 'opened' : ''}`}
        data-background="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/Sidearea-bg-img.webp"
      >
        <div className="offcanvas_area-logo">
          <span className="offcanvas__close-btn">
            <a href="#" onClick={closeOffcanvas}>
              <i className="fal fa-times"></i>
            </a>
          </span>
        </div>
        <div className="offcanvas-content">
          <div className="offcanvas-subtitle">
            <span>ELEVATE YOUR BUSINESS WITH</span>
          </div>
          <div className="offcanvas-logo pb-30 pt-30">
            <img 
              loading="lazy" 
              src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/logo/logo.png"
              alt=""
            />
          </div>
          <div className="offcanva-details">
            <p>Limitless customization options & Elementor compatibility let anyone create a beautiful Website with
               Valiance.</p>
          </div>
          <div className="offcanva-btn">
            {/* Button content can be added here if needed */}
          </div>
        </div>
        <div className="tp-mobile-menu"></div>
        <div className="tp-footer__widget pb-30 offcanvas-ct-info">
          <h3 className="tp-footer__widget-title">Get in touch</h3>
          <ul>
            <li>
              <a href="#">Soho 419P, 4th Floor, Block A, Chandigarh Citi Center, VIP Road, Zirakpur, 140603, India</a>
            </li>
            <li><a href="tel:+919115866828">+91-978 066 6828</a></li>
            <li>
              <a target="_blank" href="mailto:admin@solidevelectrosoft.com">admin@solidevelectrosoft.com</a>
            </li>
            <li><span> Office Hours: 9AM - 6PM </span></li>
            <li><span> Monday - Friday</span></li>
          </ul>
        </div>
      </div>
      <div className={`body-overlay ${isOffcanvasOpen ? 'opened' : ''}`} onClick={closeOffcanvas}></div>
    </>
  );
};

export default Header;
