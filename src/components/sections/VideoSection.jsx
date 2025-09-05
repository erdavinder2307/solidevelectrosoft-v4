import React from 'react';

const VideoSection = () => {
  return (
    <div className="row">
      <video controls className="col-md-8">
        <source
          src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/about/Introduction-Video-Upwork.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="col-lg-4 offset-12 col-md-4 col-12">
        <div className="tp-feaure-ct-box black-bg">
          <div className="tp-slider-text tp-ct-position d-inline-block">
            <span className="mb-25 d-inline-block">Make your new business plan a success!</span>
            <h3 className="tp-slider-title mb-25">Make your <br /> Business Boom</h3>

            <a href="contact.html" className="tp-slider-btn" tabIndex="-1">
              <span>
                <svg width="53" height="8" viewBox="0 0 53 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M52.3536 4.35356C52.5488 4.15829 52.5488 3.84171 52.3536 3.64645L49.1716 0.464469C48.9763 0.269207 48.6597 0.269207 48.4645 0.464469C48.2692 0.659731 48.2692 0.976314 48.4645 1.17158L51.2929 4L48.4645 6.82843C48.2692 7.02369 48.2692 7.34027 48.4645 7.53554C48.6597 7.7308 48.9763 7.7308 49.1716 7.53554L52.3536 4.35356ZM-3.11023e-08 4.5L52 4.5L52 3.5L3.11023e-08 3.5L-3.11023e-08 4.5Z"
                    fill="currentColor"
                  />
                </svg>
                <svg width="53" height="8" viewBox="0 0 53 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M52.3536 4.35356C52.5488 4.15829 52.5488 3.84171 52.3536 3.64645L49.1716 0.464469C48.9763 0.269207 48.6597 0.269207 48.4645 0.464469C48.2692 0.659731 48.2692 0.976314 48.4645 1.17158L51.2929 4L48.4645 6.82843C48.2692 7.02369 48.2692 7.34027 48.4645 7.53554C48.6597 7.7308 48.9763 7.7308 49.1716 7.53554L52.3536 4.35356ZM-3.11023e-08 4.5L52 4.5L52 3.5L3.11023e-08 3.5L-3.11023e-08 4.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
