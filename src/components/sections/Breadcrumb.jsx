import React from 'react';

const Breadcrumb = ({ title, backgroundImage }) => {
  return (
    <section 
      className="breadcrumb__area include-bg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div 
              className="breadcrumb__content text-center p-relative z-index-1"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.6) 100%)',
                padding: '40px 60px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'inline-block',
                margin: '0 auto'
              }}
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
