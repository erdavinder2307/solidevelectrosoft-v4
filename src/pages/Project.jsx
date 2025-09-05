import React, { useEffect } from 'react';

// Layout Components
import { Header, Footer } from '../components/layout';

// UI Components
import {
  PreLoader,
  BackToTop,
  MouseCursor,
  FloatingMenu,
} from '../components/ui';

// Sections
import Breadcrumb from '../components/sections/Breadcrumb';

const Project = () => {
  useEffect(() => {
    // Analytics helpers (gtag already added in App)
    const gtag = (...args) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args);
    };

    gtag('js', new Date());
    gtag('config', 'GT-KFNT9K9X');
    gtag('config', 'GT-MBLK2C2Q');

    // Document class
    document.documentElement.className = 'no-js';

    // Title and meta
    document.title = 'Portfolio - Web & Mobile App Development Projects by Solidev Electrosoft';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Explore our portfolio of successful web development, mobile app development, and software projects.';
    }

    // Canonical
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = 'https://solidevelectrosoft.com/project.html';
    } else {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = 'https://solidevelectrosoft.com/project.html';
      document.head.appendChild(canonical);
    }

    return () => {
      // noop for now
    };
  }, []);

  return (
    <div className="App">
      <PreLoader />
      <BackToTop />
      <MouseCursor />

      <Header />

      <Breadcrumb
        title="Our Projects"
        backgroundImage="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/work.webp"
      />

      <main>
        <div className="project-page-list pt-140 pb-90">
          <div className="container">
            <div className="row">
              {/* Project Item 1 */}
              <div className="col-lg-3 col-md-6 col-12">
                <div className="pj-list-item mb-50">
                  <div className="pj-list__img s1 project-min-height">
                    <figure>
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Dracra-tech.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/dracratech1.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/dracratech2.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/dracratech3.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/dracratech4.webp" alt="" />
                    </figure>
                  </div>
                </div>
                <span><a href="#">WEB DEVELOPING</a></span>
                <h4 className="pj-list__title">
                  <a href="/project-details">Core360</a>
                </h4>
              </div>

              {/* Project Item 2 */}
              <div className="col-lg-3 col-md-6 col-12">
                <div className="pj-list-item mb-50">
                  <div className="pj-list__img s1 project-min-height">
                    <figure>
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/brind.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/briind.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/briind1.webp" alt="" />
                    </figure>
                  </div>
                </div>
                <span><a href="#">SOCIAL NETWORKING APPLICATION</a></span>
                <h4 className="pj-list__title">
                  <a href="/project-details1">Briind</a>
                </h4>
              </div>

              {/* Project Item 3 */}
              <div className="col-lg-3 col-md-6 col-12">
                <div className="pj-list-item mb-50">
                  <div className="pj-list__img s1 project-min-height">
                    <figure>
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/fairway.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/fairway1.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/fairway2.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/fairway3.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/fairway4.webp" alt="" />
                    </figure>
                  </div>
                </div>
                <span><a href="#">MOBILE APPLICATION</a></span>
                <h4 className="pj-list__title">
                  <a href="/project-details2">Fairway First</a>
                </h4>
              </div>

              {/* Project Item 4 */}
              <div className="col-lg-3 col-md-6 col-12">
                <div className="pj-list-item mb-50">
                  <div className="pj-list__img s1 project-min-height">
                    <figure>
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/Lexisnexis.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/lexisnexis1.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/lexisnexis2.webp" alt="" />
                      <img loading="lazy" src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/project-image/lexisnexis3.webp" alt="" />
                    </figure>
                  </div>
                </div>
                <span><a href="#">WEB DEVELOPING</a></span>
                <h4 className="pj-list__title">
                  <a href="/project-details3">Lexis Convey</a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingMenu />
    </div>
  );
};

export default Project;
