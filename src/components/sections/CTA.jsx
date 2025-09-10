const CTA = () => {
  return (
    <div className="tp-cta-area">
      <div className="container">
        <div className="tp-cta-wrapper pt-105 pb-120">
          <div className="row align-items-center justify-content-evenly">
            <div className="col-lg-4" style={{ minHeight: '320px' }}>
              <div className="tp-about-right p-relative" style={{ minHeight: '180px' }}>
                <div className="about-img text-md-end">
                  {/* Image can be added here if needed */}
                </div>
                <div className="tp-about-info text-center grey-bg-4">
                  <h3>2018</h3>
                  <h4>Established</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="tp-section-wrapper">
                <span className="tp-section-subtitle mb-25">Gain Your Business Success</span>
                <h2 className="tp-section-title">
                  From strategy to delivery, we are here to make sure your business
                  endeavor succeeds. Trust Our Experts.
                </h2>
              </div>
            </div>
          </div>
        </div>
        
        {/* Line separator */}
        <div className="tp-border-line d-block mb-140">
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CTA;
