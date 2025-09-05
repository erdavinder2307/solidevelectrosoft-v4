const Feature = () => {
  return (
    <div className="tp-feature-area position-relative">
      <div 
        className="tp-fe-bg d-none d-lg-block"
        style={{
          backgroundImage: "url(https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/coding.webp)"
        }}
      ></div>
      <div className="container-fluid p-0">
        <div className="row g-0 justify-content-end">
          <div className="col-xl-4 col-lg-12 tp-modify-width d-block">
            <div className="tp-section-title-sm-box tp-white-text grey-bg-3 hide-content">
            </div>
            <div className="tp-section-title-sm-box tp-white-text black-bg hide-content">
              <h3 className="tp-section-title-sm tp-white-text-sm mb-5">
                Unique & Modern Business Tips for Our Clients
              </h3>
              <p>
                Our vision reflects our passion for converting ideas into reality, and our goal of helping
                people and businesses achieve their full potential through innovative web development solutions.
              </p>
              <a className="tp-btn-sm" href="#">
                <span>
                  <svg width="36" height="8" viewBox="0 0 36 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M35.3536 4.35355C35.5488 4.15829 35.5488 3.84171 35.3536 3.64644L32.1716 0.464463C31.9763 0.269201 31.6597 0.269201 31.4645 0.464463C31.2692 0.659726 31.2692 0.976308 31.4645 1.17157L34.2929 4L31.4645 6.82842C31.2692 7.02369 31.2692 7.34027 31.4645 7.53553C31.6597 7.73079 31.9763 7.73079 32.1716 7.53553L35.3536 4.35355ZM4.37114e-08 4.5L35 4.5L35 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg width="36" height="8" viewBox="0 0 36 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M35.3536 4.35355C35.5488 4.15829 35.5488 3.84171 35.3536 3.64644L32.1716 0.464463C31.9763 0.269201 31.6597 0.269201 31.4645 0.464463C31.2692 0.659726 31.2692 0.976308 31.4645 1.17157L34.2929 4L31.4645 6.82842C31.2692 7.02369 31.2692 7.34027 31.4645 7.53553C31.6597 7.73079 31.9763 7.73079 32.1716 7.53553L35.3536 4.35355ZM4.37114e-08 4.5L35 4.5L35 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                View More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
