import { useState } from 'react';
import emailService from '../../services/emailService';
import { trackContactFormSubmitted } from '../../utils/analytics';

const SEND_FAILED_MESSAGE =
  "Sorry, we couldn't send your query. Please WhatsApp or call us on +91 91158 66828.";

const FloatingMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', message }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false); // Close floating menu when modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitStatus(null);
  };

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // This form asks for a phone number only, so it is a call-back request.
      const result = await emailService.sendCallbackRequest({
        name: formData.get('name'),
        phone: formData.get('phone'),
        message: formData.get('message'),
      });

      if (result.success) {
        trackContactFormSubmitted('floating_menu');
        setSubmitStatus({ type: 'success', message: result.message });
        form.reset();
      } else {
        setSubmitStatus({ type: 'error', message: SEND_FAILED_MESSAGE });
      }
    } catch (error) {
      console.error('Query form submission error:', error);
      setSubmitStatus({ type: 'error', message: SEND_FAILED_MESSAGE });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Multi-Action Floating Menu */}
      <div className="floating-menu">
        {/* Main Toggle Button */}
        <button 
          className={`floating-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Open floating menu"
        >
          <i className="fas fa-plus"></i>
        </button>
        
        {/* Action Buttons */}
        <div className={`floating-menu-items ${isMenuOpen ? 'active' : ''}`}>
          {/* Call Button */}
          <a 
            href="tel:+919115866828" 
            className="floating-menu-item call-btn" 
            data-tooltip="Call us"
          >
            <i className="fas fa-phone"></i>
          </a>
          
          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/919115866828" 
            target="_blank" 
            rel="noopener noreferrer"
            className="floating-menu-item whatsapp-btn" 
            data-tooltip="WhatsApp us"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          
          {/* Query Button */}
          <button 
            className="floating-menu-item query-btn" 
            data-tooltip="Send Query"
            onClick={openModal}
          >
            <i className="fas fa-envelope"></i>
          </button>
        </div>
      </div>

      {/* Query Modal */}
      <div 
        className={`query-modal ${isModalOpen ? 'active' : ''}`}
        onClick={handleModalOverlayClick}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Send us a Query</h3>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form className="query-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="queryName">Name</label>
                <input type="text" id="queryName" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="queryPhone">Phone</label>
                <input type="tel" id="queryPhone" name="phone" required />
              </div>
              <div className="form-group">
                <label htmlFor="queryMessage">Message</label>
                <textarea id="queryMessage" name="message" rows="4" required></textarea>
              </div>
              {submitStatus && (
                <div
                  role={submitStatus.type === 'error' ? 'alert' : 'status'}
                  style={{
                    padding: 12,
                    marginBottom: 16,
                    borderRadius: 5,
                    textAlign: 'center',
                    backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: submitStatus.type === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                  }}
                >
                  {submitStatus.message}
                </div>
              )}
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Query'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingMenu;
