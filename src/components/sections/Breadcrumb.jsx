import React from 'react';

const Breadcrumb = ({ title, backgroundImage }) => {
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
              <h3 className="breadcrumb__title" style={{ marginBottom: '0px' }}>{title}</h3>
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
