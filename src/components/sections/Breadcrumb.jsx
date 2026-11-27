import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ title, backgroundImage, headingTag: Heading = 'h3' }) => {
  return (
    <section 
      className="breadcrumb__area include-bg"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center 25%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div 
              className="breadcrumb__content text-center p-relative z-index-1"
             
            >
              <Heading className="breadcrumb__title" style={{ marginBottom: '0px' }}>{title}</Heading>
              <div className="breadcrumb__list">
                <span><a href="#"></a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
